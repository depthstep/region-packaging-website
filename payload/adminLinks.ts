import type { Field, Payload, PayloadRequest } from 'payload'
import { globalName, idOf, labelOf, obj, rowName, sectionName, words } from './activityLog'

/**
 * Admin helpers for finding things: every place a photo or file is used, and the item a log entry
 * is about. Places are named the same way as in the Activity log, e.g.
 * "Page sections › Printing & finishing › Printing methods › Row 1 (Digital printing) › Photo".
 */

type Doc = Record<string, unknown>

export type Use = {
  /** e.g. "Category: Custom Mailer Boxes" */
  item: string
  href: string
  places: string[]
  /** Only in a saved draft, so not on the website yet. */
  draftOnly: boolean
}

// Lists and logs that point at files but are not content on the website.
const NOT_CONTENT = (slug: string) => slug.startsWith('payload-') || ['media', 'artwork', 'activity-log', 'claude-log'].includes(slug)

const pointsAtMedia = (relationTo: unknown) => (Array.isArray(relationTo) ? relationTo.includes('media') : relationTo === 'media')

/** Whether any field could hold a photo or file, so lists without one are never read. */
function canHoldMedia(fields: Field[]): boolean {
  return fields.some((f) => {
    if (f.type === 'upload' || f.type === 'relationship') return pointsAtMedia(f.relationTo)
    if (f.type === 'richText') return true
    if (f.type === 'tabs') return f.tabs.some((t) => canHoldMedia(t.fields))
    if (f.type === 'blocks') return f.blocks.some((b) => canHoldMedia(b.fields))
    if ('fields' in f && Array.isArray(f.fields)) return canHoldMedia(f.fields)
    return false
  })
}

/** Photos placed inside article text. */
function inText(node: unknown, id: string): boolean {
  const n = obj(node)
  if (n.type === 'upload' && (n.relationTo ?? 'media') === 'media' && String(idOf(n.value)) === id) return true
  const kids = (n.children ?? obj(n.root).children) as unknown[] | undefined
  return Array.isArray(kids) && kids.some((k) => inText(k, id))
}

function scan(fields: Field[], data: Doc, path: string[], id: string, out: string[]) {
  for (const f of fields) {
    if (f.type === 'ui' || f.type === 'join') continue
    if (f.type === 'tabs') {
      for (const tab of f.tabs) {
        const name = 'name' in tab ? tab.name : undefined
        const title = typeof tab.label === 'string' ? tab.label : name ? words(name) : ''
        scan(tab.fields, name ? obj(data[name]) : data, title ? [...path, title] : path, id, out)
      }
      continue
    }
    if (f.type === 'row' || f.type === 'collapsible' || (f.type === 'group' && !('name' in f && f.name))) {
      scan(f.fields, data, path, id, out)
      continue
    }
    if (!('name' in f) || !f.name) continue
    const label = labelOf(f)
    const value = data[f.name]
    if (f.type === 'group') scan(f.fields, obj(value), [...path, label], id, out)
    else if (f.type === 'array' || f.type === 'blocks') {
      ;((value as Doc[]) ?? []).forEach((row, i) => {
        const rowFields = f.type === 'array' ? f.fields : (f.blocks.find((b) => b.slug === row.blockType)?.fields ?? [])
        const name = rowName(row)
        scan(rowFields, row, [...path, `${label} › Row ${i + 1}${name ? ` (${name})` : ''}`], id, out)
      })
    } else if ((f.type === 'upload' || f.type === 'relationship') && pointsAtMedia(f.relationTo)) {
      const list = Array.isArray(value) ? value : [value]
      if (list.some((v) => String(idOf(idOf(v))) === id)) out.push([...path, label].join(' › '))
    } else if (f.type === 'richText' && inText(value, id)) out.push(`${[...path, label].join(' › ')} (in the text)`)
  }
}

const adminRoute = (payload: Payload) => payload.config.routes.admin || '/admin'
const titleOf = (doc: Doc, useAsTitle?: string) => String(doc[useAsTitle ?? ''] ?? doc.title ?? doc.name ?? doc.filename ?? doc.email ?? `#${doc.id}`)

/**
 * Every page, product and setting that uses this photo or file. Reads what is on the website, plus
 * saved drafts, so a photo added to a draft shows up before it is published. Uses the viewer's own
 * access, so nobody sees items they could not open anyway.
 */
export async function findMediaUsage(payload: Payload, req: PayloadRequest, mediaId: string | number): Promise<Use[]> {
  const id = String(mediaId)
  const uses: Use[] = []
  const base = adminRoute(payload)
  const opts = { depth: 0, overrideAccess: false, req, user: req.user } as const

  for (const c of payload.config.collections) {
    if (NOT_CONTENT(c.slug) || !canHoldMedia(c.fields)) continue
    const singular = typeof c.labels?.singular === 'string' ? c.labels.singular : words(c.slug)
    const found = new Map<string, Use>()
    const look = async (draft: boolean) => {
      const { docs } = await payload.find({ collection: c.slug as 'media', pagination: false, draft, ...opts })
      for (const doc of docs as unknown as Doc[]) {
        const places: string[] = []
        scan(c.fields, doc, [], id, places)
        const key = String(doc.id)
        if (!places.length || found.has(key)) continue
        // A record that was never published is only a draft, wherever it was read from.
        found.set(key, { item: `${singular}: ${titleOf(doc, c.admin?.useAsTitle)}`, href: `${base}/collections/${c.slug}/${key}`, places, draftOnly: draft || doc._status === 'draft' })
      }
    }
    await look(false)
    if (c.versions?.drafts) await look(true)
    uses.push(...found.values())
  }

  for (const g of payload.config.globals) {
    if (!canHoldMedia(g.fields)) continue
    for (const draft of g.versions?.drafts ? [false, true] : [false]) {
      const doc = obj(await payload.findGlobal({ slug: g.slug as never, draft, ...opts }).catch(() => null))
      const places: string[] = []
      scan(g.fields, doc, [], id, places)
      if (places.length) {
        uses.push({ item: globalName(g), href: `${base}/globals/${g.slug}`, places, draftOnly: draft })
        break
      }
    }
  }
  return uses
}

export type LogTarget = { href?: string; note?: string }

/**
 * The admin address of the item an Activity log entry is about, or why there isn't one. The list
 * column has no request to check access with; only admins can open the log, so it checks directly.
 */
export async function logEntryTarget(payload: Payload, req: PayloadRequest | null, entry: Doc): Promise<LogTarget | null> {
  const section = String(entry.section ?? '')
  const base = adminRoute(payload)
  const g = payload.config.globals.find((x) => globalName(x) === section)
  if (g) return { href: `${base}/globals/${g.slug}` }
  const c = payload.config.collections.find((x) => sectionName(x.labels, x.slug) === section)
  const recordId = entry.recordId
  if (!c || recordId === undefined || recordId === null || recordId === '') return null
  const exists = await payload.findByID({ collection: c.slug as 'media', id: recordId as string, depth: 0, draft: true, disableErrors: true, ...(req ? { req, overrideAccess: false, user: req.user } : { overrideAccess: true }) })
  if (!exists) return { note: entry.action === 'deleted' ? 'This item was deleted.' : 'This item has since been deleted.' }
  return { href: `${base}/collections/${c.slug}/${recordId}` }
}

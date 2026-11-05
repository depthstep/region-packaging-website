import { diffChars } from 'diff'
import type { CollectionConfig, Field, GlobalConfig, PayloadRequest } from 'payload'

/**
 * Records every change staff make in the admin, down to the character. Each save compares the old
 * and new record field by field, including rows inside lists and the text of articles. Entries can
 * only be written here: nobody can edit or delete them, not even admins.
 *
 * Only saves made by a logged-in person are logged, so customers' enquiries and scripts are left out.
 */

/** `=` unchanged, `+` added, `-` removed, `~` a long unchanged stretch, shortened to a count. */
export type Segment = ['=' | '+' | '-' | '~', string]
export type Change = { field: string; segments: Segment[] }

type Doc = Record<string, unknown>
type Ctx = { req: PayloadRequest; out: Change[] }

/** Claude's own login. Everything it does goes in a separate log from the team's. */
export const CLAUDE_LOGIN = 'claude@regionpackaging.com'

const isAdmin = ({ req }: { req: { user?: unknown } }) => (req.user as { role?: string } | null | undefined)?.role === 'admin'

export const ActivityLog: CollectionConfig = {
  slug: 'activity-log',
  labels: { singular: 'Activity entry', plural: 'Activity log' },
  admin: {
    useAsTitle: 'summary',
    defaultColumns: ['createdAt', 'user', 'action', 'section', 'item', 'summary'],
    group: 'Settings',
    hidden: ({ user }) => (user as { role?: string } | null | undefined)?.role !== 'admin',
    description: 'Every change the team made in the admin. Open an entry to see exactly which characters changed. Entries cannot be edited or deleted.',
  },
  defaultSort: '-createdAt',
  access: { read: isAdmin, create: () => false, update: () => false, delete: () => false },
  fields: [
    { name: 'user', label: 'Login', type: 'text', index: true, admin: { position: 'sidebar' } },
    {
      name: 'action',
      type: 'select',
      index: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Created', value: 'created' },
        { label: 'Updated', value: 'updated' },
        { label: 'Deleted', value: 'deleted' },
        { label: 'Code deployed', value: 'deployed' },
      ],
    },
    { name: 'section', type: 'text', index: true, admin: { position: 'sidebar' } },
    { name: 'item', type: 'text', admin: { position: 'sidebar' } },
    { name: 'recordId', label: 'Record ID', type: 'text', admin: { position: 'sidebar' } },
    { name: 'link', label: 'Full code changes (GitHub)', type: 'text', admin: { position: 'sidebar' } },
    { name: 'summary', type: 'text' },
    {
      name: 'changes',
      type: 'json',
      admin: { components: { Field: '/components/admin/ActivityChanges#ActivityChanges' } },
    },
  ],
}

/** The same log for changes made by Claude: its admin login and the code updates it deploys. */
export const ClaudeLog: CollectionConfig = {
  ...ActivityLog,
  slug: 'claude-log',
  labels: { singular: 'Claude change', plural: "Claude's changes" },
  admin: {
    ...ActivityLog.admin,
    description: 'Everything Claude changed: edits made with its own login, and code updates it deployed. Team edits are in the Activity log.',
  },
}

// Bookkeeping that isn't content: login counters, password internals, and values worked out on read.
const SKIP = new Set([
  'id', 'createdAt', 'updatedAt', 'url', 'thumbnailURL', 'sizes', 'hash', 'salt', 'sessions',
  'loginAttempts', 'lockUntil', 'resetPasswordToken', 'resetPasswordExpiration', '_verified', '_verificationToken',
])

const words = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase())
const labelOf = (f: { label?: unknown; name?: string }) => (typeof f.label === 'string' && f.label ? f.label : f.name ? words(f.name) : '')
const obj = (v: unknown): Doc => (v && typeof v === 'object' ? (v as Doc) : {})
const idOf = (v: unknown) => (v && typeof v === 'object' ? ((v as Doc).value ?? (v as Doc).id) : v)

/** Shows an item's name rather than its database number, e.g. the file name of a photo. */
async function nameOf(ref: unknown, relationTo: string | string[], ctx: Ctx) {
  const poly = ref && typeof ref === 'object' && 'relationTo' in (ref as Doc)
  const collection = (poly ? (ref as Doc).relationTo : relationTo) as string
  const id = idOf(idOf(ref))
  if (id === null || id === undefined || id === '') return ''
  try {
    const doc = obj(await ctx.req.payload.findByID({ collection: collection as 'media', id: id as number, depth: 0, req: ctx.req, disableErrors: true }))
    const name = doc.title ?? doc.name ?? doc.filename ?? doc.email
    return name ? `${name} (#${id})` : `#${id}`
  } catch {
    return `#${id}`
  }
}

/** Article text as plain text with simple marks, so a bold word or a changed link shows up too. */
export function richTextToText(value: unknown): string {
  const marks: [number, string, string][] = [[1, '**', '**'], [2, '_', '_'], [4, '~~', '~~'], [8, '<u>', '</u>'], [16, '`', '`'], [32, '<sub>', '</sub>'], [64, '<sup>', '</sup>']]
  const inline = (nodes: unknown): string => (Array.isArray(nodes) ? nodes.map(node).join('') : '')
  const node = (n: Doc): string => {
    switch (n.type) {
      case 'text':
        return marks.reduce((t, [bit, a, b]) => (Number(n.format) & bit ? a + t + b : t), String(n.text ?? ''))
      case 'linebreak':
        return '\n'
      case 'tab':
        return '\t'
      case 'link':
      case 'autolink': {
        const f = obj(n.fields)
        const target = f.linkType === 'internal' ? `page #${idOf(idOf(f.doc))}` : String(f.url ?? '')
        return `[${inline(n.children)}](${target}${f.newTab ? ', opens in a new tab' : ''})`
      }
      default:
        return inline(n.children)
    }
  }
  const block = (n: Doc, depth = 0): string => {
    switch (n.type) {
      case 'heading':
        return `${'#'.repeat(Number(String(n.tag).slice(1)) || 1)} ${inline(n.children)}`
      case 'quote':
        return `> ${inline(n.children)}`
      case 'list':
        return ((n.children as Doc[]) ?? []).map((c, i) => block({ ...c, marker: n.listType === 'number' ? `${i + 1}.` : '-' }, depth)).join('\n')
      case 'listitem': {
        const kids = (n.children as Doc[]) ?? []
        const nested = kids.find((c) => c.type === 'list')
        if (nested) return block(nested, depth + 1)
        return `${'  '.repeat(depth)}${n.marker ?? '-'} ${inline(kids)}`
      }
      case 'upload':
        return `[image #${idOf(n.value)}]`
      case 'horizontalrule':
        return '---'
      default:
        return n.children ? inline(n.children) : `[${String(n.type)}]`
    }
  }
  return ((obj(obj(value).root).children as Doc[]) ?? []).map((n) => block(n)).join('\n\n')
}

/** Alignment and indent of each block in an article, which its plain text can't show. */
const richTextLayout = (value: unknown) =>
  ((obj(obj(value).root).children as Doc[]) ?? []).map((n) => `Alignment: ${n.format || 'default'}, indent: ${Number(n.indent) || 0}`)

/** Splits two texts into what stayed, went and arrived, one character at a time. */
export function diffText(before: string, after: string): Segment[] {
  if (!before) return [['+', after]]
  if (!after) return [['-', before]]
  const parts = diffChars(before, after, { timeout: 1500 }) as { added?: boolean; removed?: boolean; value: string }[] | undefined
  const segments: Segment[] = parts
    ? parts.map((p) => [p.added ? '+' : p.removed ? '-' : '=', p.value])
    : wholeChange(before, after) // Almost entirely rewritten: the comparison gave up, so show the changed middle.
  return segments.flatMap((s, i) => shorten(s, i === 0, i === segments.length - 1))
}

function wholeChange(before: string, after: string): Segment[] {
  let start = 0
  while (start < before.length && before[start] === after[start]) start++
  let end = 0
  while (end < before.length - start && end < after.length - start && before.at(-1 - end) === after.at(-1 - end)) end++
  const out: Segment[] = [
    ['=', before.slice(0, start)],
    ['-', before.slice(start, before.length - end)],
    ['+', after.slice(start, after.length - end)],
    ['=', before.slice(before.length - end)],
  ]
  return out.filter(([, v]) => v)
}

/** Keeps a little text either side of each change and counts the rest, so long articles stay readable. */
function shorten(seg: Segment, first: boolean, last: boolean): Segment[] {
  const keep = 60
  const [type, text] = seg
  if (type !== '=' || text.length <= keep * 2) return [seg]
  const head = first ? '' : text.slice(0, keep)
  const tail = last ? '' : text.slice(-keep)
  const hidden = text.length - head.length - tail.length
  if (hidden <= 0) return [seg]
  return [
    ...(head ? ([['=', head]] as Segment[]) : []),
    ['~', `${hidden.toLocaleString('en-US')} unchanged characters`],
    ...(tail ? ([['=', tail]] as Segment[]) : []),
  ]
}

async function valueText(f: Field, value: unknown, ctx: Ctx): Promise<string> {
  if (f.type === 'checkbox') return value ? 'Yes' : 'No'
  if (value === null || value === undefined || value === '') return ''
  if (f.type === 'richText') return richTextToText(value)
  if (f.type === 'relationship' || f.type === 'upload') {
    const list = Array.isArray(value) ? value : [value]
    return (await Promise.all(list.map((v) => nameOf(v, f.relationTo as string | string[], ctx)))).join(', ')
  }
  if (Array.isArray(value)) return value.join(', ')
  return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

const add = (ctx: Ctx, field: string, before: string, after: string) => {
  if (before !== after) ctx.out.push({ field, segments: diffText(before, after) })
}

/** For values that are swapped rather than typed, such as a photo: old and new in full reads better. */
const addWhole = (ctx: Ctx, field: string, before: string, after: string) => {
  if (before === after) return
  ctx.out.push({ field, segments: [...(before ? ([['-', before]] as Segment[]) : []), ...(after ? ([['+', after]] as Segment[]) : [])] })
}

const TYPED = new Set(['text', 'textarea', 'richText', 'email', 'code', 'json'])

const rowName = (row: Doc) => {
  const t = [row.title, row.name, row.label, row.question, row.heading, row.text].find((v) => typeof v === 'string' && v)
  return t ? String(t).slice(0, 50) : ''
}

/** Compares rows by their ID, so moving a row reads as a move rather than every row changing. */
async function walkRows(label: string, before: Doc[], after: Doc[], fieldsFor: (row: Doc) => Field[], ctx: Ctx) {
  const key = (r: Doc, i: number) => String(r.id ?? i)
  const oldRows = new Map(before.map((r, i) => [key(r, i), r]))
  const newKeys = new Set(after.map(key))
  for (const [i, row] of after.entries()) {
    const old = oldRows.get(key(row, i))
    const name = rowName(row)
    const here = `${label} › Row ${i + 1}${name ? ` (${name})` : ''}`
    await walk(fieldsFor(row), old ?? {}, row, old ? [here] : [`${here} [new row]`], ctx)
  }
  for (const [i, row] of before.entries()) {
    if (newKeys.has(key(row, i))) continue
    const name = rowName(row)
    await walk(fieldsFor(row), row, {}, [`${label} › Row ${i + 1}${name ? ` (${name})` : ''} [row removed]`], ctx)
  }
  const kept = before.filter((r, i) => newKeys.has(key(r, i)))
  const moved = after.filter((r, i) => oldRows.has(key(r, i)))
  const order = (rows: Doc[]) => rows.map((r, i) => rowName(r) || `Row ${i + 1}`).join('\n')
  if (kept.map(key).join() !== moved.map(key).join()) addWhole(ctx, `${label} › Row order`, order(kept), order(moved))
}

async function walk(fields: Field[], before: Doc, after: Doc, path: string[], ctx: Ctx): Promise<void> {
  for (const f of fields) {
    if (f.type === 'ui' || f.type === 'join') continue
    if (f.type === 'tabs') {
      for (const tab of f.tabs) {
        const name = 'name' in tab ? tab.name : undefined
        const title = typeof tab.label === 'string' ? tab.label : name ? words(name) : ''
        const here = title ? [...path, title] : path
        await walk(tab.fields, name ? obj(before[name]) : before, name ? obj(after[name]) : after, here, ctx)
      }
      continue
    }
    if (f.type === 'row' || f.type === 'collapsible') {
      await walk(f.fields, before, after, path, ctx)
      continue
    }
    if (!('name' in f) || !f.name) {
      if (f.type === 'group') await walk(f.fields, before, after, path, ctx)
      continue
    }
    if (SKIP.has(f.name) || ('virtual' in f && f.virtual)) continue
    const label = [...path, labelOf(f)].join(' › ')
    const b = before[f.name]
    const a = after[f.name]
    if (f.type === 'group') await walk(f.fields, obj(b), obj(a), [...path, labelOf(f)], ctx)
    else if (f.type === 'array') await walkRows(label, (b as Doc[]) ?? [], (a as Doc[]) ?? [], () => f.fields, ctx)
    else if (f.type === 'blocks')
      await walkRows(label, (b as Doc[]) ?? [], (a as Doc[]) ?? [], (row) => f.blocks.find((x) => x.slug === row.blockType)?.fields ?? [], ctx)
    else {
      const oldText = await valueText(f, b, ctx)
      const newText = await valueText(f, a, ctx)
      ;(TYPED.has(f.type) ? add : addWhole)(ctx, label, oldText, newText)
      if (f.type === 'richText') {
        const oldLayout = richTextLayout(b)
        const newLayout = richTextLayout(a)
        // When blocks were added or removed the text comparison already shows it.
        if (oldLayout.length === newLayout.length) oldLayout.forEach((l, i) => addWhole(ctx, `${label} › Block ${i + 1} layout`, l, newLayout[i]))
      }
    }
  }
}

function summarise(action: string, changes: Change[]) {
  const count = (type: string) => changes.reduce((n, c) => n + c.segments.reduce((m, [t, v]) => m + (t === type ? v.length : 0), 0), 0)
  const names = [...new Set(changes.map((c) => c.field.split(' › ').pop()!))]
  const list = names.slice(0, 4).join(', ') + (names.length > 4 ? ` and ${names.length - 4} more` : '')
  if (action !== 'updated') return `${action === 'created' ? 'Created' : 'Deleted'} (${changes.length} fields)`
  return `${changes.length} ${changes.length === 1 ? 'field' : 'fields'} changed: ${list} (+${count('+')} / -${count('-')} characters)`
}

async function record(req: PayloadRequest, entry: { action: 'created' | 'updated' | 'deleted'; section: string; item: string; recordId?: unknown }, changes: Change[]) {
  if (entry.action === 'updated' && !changes.length) return
  await req.payload.create({
    collection: ((req.user as { email?: string }).email === CLAUDE_LOGIN ? 'claude-log' : 'activity-log') as 'users',
    req,
    overrideAccess: true,
    data: {
      user: (req.user as { email?: string }).email,
      action: entry.action,
      section: entry.section,
      item: entry.item,
      recordId: entry.recordId === undefined ? undefined : String(entry.recordId),
      summary: `${req.context.isRestoringVersion ? 'Restored an earlier version. ' : ''}${summarise(entry.action, changes)}`,
      changes,
    } as never,
  })
}

const sectionName = (labels: unknown, slug: string) => {
  const plural = obj(labels).plural
  return typeof plural === 'string' ? plural : words(slug)
}
const itemName = (doc: Doc, title: unknown, fallback: string) =>
  String(doc[String(title)] ?? doc.title ?? doc.name ?? doc.filename ?? doc.email ?? fallback).slice(0, 200)

/** A failed log entry is reported in the server log but never stops someone saving their work. */
const guarded = async (task: () => Promise<void>) => {
  try {
    await task()
  } catch (err) {
    console.error('[activity log] could not record a change', err)
  }
}

export const withActivityLog = (c: CollectionConfig): CollectionConfig => ({
  ...c,
  hooks: {
    ...c.hooks,
    afterChange: [
      ...(c.hooks?.afterChange ?? []),
      async ({ collection, doc, previousDoc, operation, req, data }) => {
        if (!req.user) return doc
        await guarded(async () => {
          const ctx: Ctx = { req, out: [] }
          await walk(collection.fields, operation === 'create' ? {} : previousDoc, doc, [], ctx)
          if (obj(req.data).password || obj(data).password) ctx.out.push({ field: 'Password', segments: [['+', 'Password changed (the password itself is never recorded)']] })
          await record(
            req,
            { action: operation === 'create' ? 'created' : 'updated', section: sectionName(collection.labels, collection.slug), item: itemName(doc, collection.admin?.useAsTitle, `#${doc.id}`), recordId: doc.id },
            ctx.out,
          )
        })
        return doc
      },
    ],
    afterDelete: [
      ...(c.hooks?.afterDelete ?? []),
      async ({ collection, doc, req }) => {
        if (!req.user) return doc
        await guarded(async () => {
          const ctx: Ctx = { req, out: [] }
          await walk(collection.fields, doc, {}, [], ctx)
          await record(req, { action: 'deleted', section: sectionName(collection.labels, collection.slug), item: itemName(doc, collection.admin?.useAsTitle, `#${doc.id}`), recordId: doc.id }, ctx.out)
        })
        return doc
      },
    ],
  },
})

export const withGlobalActivityLog = (g: GlobalConfig): GlobalConfig => ({
  ...g,
  hooks: {
    ...g.hooks,
    afterChange: [
      ...(g.hooks?.afterChange ?? []),
      async ({ global, doc, previousDoc, req }) => {
        if (!req.user) return doc
        await guarded(async () => {
          const ctx: Ctx = { req, out: [] }
          // Restoring a version hands over the version record, with the page inside it.
          const current = req.context.isRestoringVersion && doc.version ? doc.version : doc
          await walk(global.fields, previousDoc, current, [], ctx)
          const name = typeof global.label === 'string' ? global.label : words(global.slug)
          await record(req, { action: 'updated', section: name, item: name }, ctx.out)
        })
        return doc
      },
    ],
  },
})

import type { Field } from 'payload'
import { isParagraphList } from '../../payload/fields'
import type { Img } from '../types'

type Raw = Record<string, unknown>
const isObj = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v)

/** Ids are prefixed with their collection ("categories:3") so related links can mix products and categories. */
export const cmsId = (collection: string, id: unknown) => `${collection}:${id}`

function image(v: unknown): Img | undefined {
  if (!isObj(v) || typeof v.url !== 'string') return undefined // not uploaded yet: the site shows a labelled placeholder
  const alt = typeof v.alt === 'string' ? v.alt : ''
  // Payload prefixes uploads with the site URL; keep them site-relative so next/image treats them as local.
  const src = v.url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/)/, '')
  return { src, alt, label: alt || String(v.filename ?? 'Image'), width: (v.width as number) ?? undefined, height: (v.height as number) ?? undefined }
}

function relation(relationTo: string | string[], v: unknown): string | undefined {
  if (v == null) return undefined
  if (Array.isArray(relationTo)) {
    // Polymorphic: { relationTo, value } where value is an id or a populated doc.
    if (!isObj(v)) return undefined
    const value = isObj(v.value) ? v.value.id : v.value
    return value == null ? undefined : cmsId(String(v.relationTo), value)
  }
  return cmsId(relationTo, isObj(v) ? v.id : v)
}


function value(f: Field, v: unknown): unknown {
  switch (f.type) {
    case 'upload':
      if ('hasMany' in f && f.hasMany) return ((v as unknown[]) ?? []).map(image).filter(Boolean)
      return image(v)
    case 'relationship':
      if (f.hasMany) return ((v as unknown[]) ?? []).map((x) => relation(f.relationTo, x)).filter(Boolean)
      return relation(f.relationTo, v)
    case 'array': {
      const rows = (v as Raw[]) ?? []
      if (isParagraphList(f.fields)) return rows.map((r) => r.paragraph).filter(Boolean)
      return rows.map((r) => fromFields(f.fields, r))
    }
    case 'group':
      return 'name' in f ? fromFields(f.fields, isObj(v) ? v : {}) : undefined
    case 'text':
      if (f.hasMany) return (v as string[]) ?? []
      return v ?? undefined
    default:
      return v ?? undefined
  }
}

/**
 * Turns a Payload document into the plain shapes in lib/types.ts by walking its field config:
 * uploads become { src, alt, label, width, height }, paragraph lists become string[],
 * relationships become prefixed id strings, and empty values are left out.
 */
export function fromFields(fields: Field[], doc: Raw | undefined): Raw {
  const out: Raw = {}
  for (const f of fields) {
    if (f.type === 'tabs') {
      for (const tab of f.tabs) {
        if ('name' in tab && tab.name) out[tab.name] = fromFields(tab.fields, isObj(doc?.[tab.name]) ? (doc[tab.name] as Raw) : {})
        else Object.assign(out, fromFields(tab.fields, doc))
      }
    } else if (f.type === 'row' || f.type === 'collapsible') {
      Object.assign(out, fromFields(f.fields, doc))
    } else if ('name' in f) {
      const v = value(f, doc?.[f.name])
      if (v !== undefined) out[f.name] = v
    }
  }
  return out
}

import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from './env'

const builder = createImageUrlBuilder({ projectId: projectId || 'unset', dataset })

type Raw = Record<string, unknown>
const isObj = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v)

/**
 * Turns raw Sanity documents into the plain shapes in lib/types.ts:
 * image fields become { src, alt, label, width, height }, slugs become strings,
 * references become id strings, and Sanity bookkeeping keys (_key, _type...) are dropped.
 * Images without an uploaded asset are removed, so the site shows its labelled placeholder.
 */
export function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize).filter((v) => v !== undefined)
  if (!isObj(value)) return value

  if (value._type === 'image' || (isObj(value.asset) && typeof value.asset._ref === 'string')) {
    const ref = isObj(value.asset) ? (value.asset._ref as string | undefined) : undefined
    if (!ref) return undefined
    const [, , dims] = ref.split('-') // image-<id>-<w>x<h>-<ext>
    const [width, height] = (dims || '').split('x').map(Number)
    const alt = typeof value.alt === 'string' ? value.alt : ''
    return { src: builder.image(value).auto('format').url(), alt, label: alt || 'Image', width, height }
  }
  if (value._type === 'slug') return value.current
  if (typeof value._ref === 'string') return value._ref

  const out: Raw = {}
  for (const [k, v] of Object.entries(value)) {
    if (k === '_id') out.id = v
    else if (!k.startsWith('_')) out[k] = normalize(v)
  }
  return out
}

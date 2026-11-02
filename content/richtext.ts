// Tiny builders for Payload rich text (Lexical JSON), used by the starter blog content.
// The seed uploads the images and stores the same structure in the database.
import type { Img, RichText, RichTextNode } from '../lib/types.ts'

type Inline = string | RichTextNode
const base = { direction: 'ltr', format: '', indent: 0, version: 1 }
const text = (t: string, format = 0): RichTextNode => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })
const inline = (parts: Inline[]) => parts.map((p) => (typeof p === 'string' ? text(p) : p))

export const b = (t: string) => text(t, 1)
export const a = (t: string, url: string): RichTextNode => ({ ...base, type: 'link', version: 3, fields: { url, newTab: false, linkType: 'custom' }, children: [text(t)] })
export const p = (...parts: Inline[]): RichTextNode => ({ ...base, type: 'paragraph', textFormat: 0, children: inline(parts) })
export const h2 = (t: string): RichTextNode => ({ ...base, type: 'heading', tag: 'h2', children: [text(t)] })
export const h3 = (t: string): RichTextNode => ({ ...base, type: 'heading', tag: 'h3', children: [text(t)] })
export const ul = (...items: (Inline | Inline[])[]): RichTextNode => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((it, i) => ({ ...base, type: 'listitem', value: i + 1, children: inline([it].flat()) })),
})
export const image = (img: Img): RichTextNode => ({ type: 'upload', relationTo: 'media', value: img, fields: null, format: '', version: 3 })
export const doc = (...children: RichTextNode[]): RichText => ({ root: { ...base, type: 'root', children } })

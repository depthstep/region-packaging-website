// Builds seed/seed.ndjson for `npm run seed:import` from the same local content the site
// previews with (content/*.ts), so the CMS starts with exactly what you saw locally.
// Photos in /public are uploaded as Sanity image assets; placeholders are left empty.
//
// Run: npm run seed:build   (Node 22+, uses --experimental-strip-types)

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { categories, products } from '../content/catalog.ts'
import { home, posts, reviews, settings } from '../content/site.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36)}`

const isImg = (v: Record<string, unknown>) => 'label' in v && 'alt' in v && !('href' in v)
const ref = (id: string) => ({ _type: 'reference', _ref: id, _key: key() })

/** Converts plain content into Sanity document values. */
function toSanity(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map(toSanity)
      .filter((v) => v !== undefined)
      .map((v) => (v && typeof v === 'object' && !Array.isArray(v) ? { _key: key(), ...v } : v))
  }
  if (value === '') return undefined
  if (!value || typeof value !== 'object') return value
  const obj = value as Record<string, unknown>
  if (isImg(obj)) {
    if (typeof obj.src !== 'string' || !obj.src.startsWith('/')) return undefined
    const file = pathToFileURL(join(root, 'public', obj.src)).href
    return { _type: 'image', _sanityAsset: `image@${file}`, alt: obj.alt || undefined }
  }
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    const conv = toSanity(v)
    if (conv !== undefined && !(Array.isArray(conv) && conv.length === 0)) out[k] = conv
  }
  return out
}

const slug = (current: string) => ({ _type: 'slug', current })
const docs: Record<string, unknown>[] = []

docs.push({ _id: 'siteSettings', _type: 'siteSettings', ...(toSanity(settings) as object) })

const { industries, blog, ...restHome } = home
docs.push({
  _id: 'homePage',
  _type: 'homePage',
  ...(toSanity(restHome) as object),
  industries: toSanity({
    ...industries,
    tabs: industries.tabs.map(({ categoryId, ...t }) => ({ ...t, ...(categoryId ? { category: { _type: 'reference', _ref: categoryId } } : {}) })),
  }),
  blog: toSanity({ ...blog, postIds: undefined, posts: blog.postIds.map(ref) }),
})

for (const c of categories) {
  const { id, slug: s, relatedIds, ...rest } = c
  docs.push({ _id: id, _type: 'category', ...(toSanity(rest) as object), slug: slug(s), visible: true, ...(relatedIds?.length ? { related: relatedIds.map(ref) } : {}) })
}
for (const p of products) {
  const { id, slug: s, categoryIds, relatedIds, ...rest } = p
  docs.push({
    _id: id,
    _type: 'product',
    ...(toSanity(rest) as object),
    slug: slug(s),
    status: 'live',
    categories: categoryIds.map(ref),
    ...(relatedIds?.length ? { related: relatedIds.map(ref) } : {}),
  })
}
reviews.forEach((r, i) => {
  const { id, ...rest } = r
  docs.push({ _id: id, _type: 'review', ...(toSanity(rest) as object), order: i + 1 })
})
posts.forEach((p, i) => {
  const { id, slug: s, ...rest } = p
  // Spread the dates so "latest" order matches the design's left-to-right order.
  docs.push({ _id: id, _type: 'post', ...(toSanity(rest) as object), slug: slug(s), publishedAt: new Date(Date.UTC(2026, 0, 30 - i)).toISOString() })
})

const out = join(root, 'seed', 'seed.ndjson')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log(`Wrote ${docs.length} documents to ${out}`)

// Loads the starter content from content/*.ts into an empty Payload database, uploading the
// photos and icons from public/ into Media. Run once on a new server: `npm run seed`.
// It stops if categories already exist, so it can't duplicate or overwrite editors' work.
import fs from 'fs'
import path from 'path'
import type { Field, Payload } from 'payload'
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import * as catalog from '../content/catalog.ts'
import * as site from '../content/site.ts'
import * as blog from '../content/blog.ts'
import { paperWeight } from '../content/paper-weight.ts'
import { isParagraphList } from '../payload/fields.ts'
import { AboutPage, ArtworkPage, PaperWeightPage, BlogCategories, BlogPage, BlogTopics, Categories, HomePage, Pages, Posts, Products, Reviews, SiteSettings } from '../payload/schema.ts'
import type { Img } from '../lib/types.ts'

type Raw = Record<string, unknown>
const isObj = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v)

const payload: Payload = await getPayload({ config })
const publicDir = path.resolve(process.cwd(), 'public')

/** Seed id (e.g. "category-custom-mailer-boxes") → Payload collection + id. */
const ids = new Map<string, { relationTo: 'categories' | 'products' | 'posts' | 'blog-categories' | 'blog-topics'; value: number | string }>()

const media = new Map<string, number | string>()
async function upload(img: unknown) {
  if (!isObj(img) || typeof img.src !== 'string') return undefined // placeholder: no photo yet
  const src = img.src as string
  if (!media.has(src)) {
    const doc = await payload.create({ collection: 'media', data: { alt: (img as Img).alt || '' }, filePath: path.join(publicDir, src) })
    media.set(src, doc.id)
  }
  return media.get(src)
}

/** Rich text: upload images inside it and store their Media ids. */
async function richText(node: unknown): Promise<unknown> {
  if (Array.isArray(node)) return Promise.all(node.map(richText))
  if (!isObj(node)) return node
  const out: Raw = { ...node }
  if (node.type === 'upload') Object.assign(out, { value: await upload(node.value), id: crypto.randomUUID() })
  if (Array.isArray(node.children)) out.children = await richText(node.children)
  if (isObj(node.root)) out.root = await richText(node.root)
  return out
}

/** The reverse of lib/cms/normalize.ts: site content shapes → Payload data, driven by the same fields. */
async function toPayload(fields: Field[], data: Raw | undefined): Promise<Raw> {
  const out: Raw = {}
  for (const f of fields) {
    if (f.type === 'tabs') {
      for (const tab of f.tabs) Object.assign(out, await toPayload(tab.fields, data))
      continue
    }
    if (f.type === 'row' || f.type === 'collapsible') {
      Object.assign(out, await toPayload(f.fields, data))
      continue
    }
    if (!('name' in f)) continue
    const v = data?.[f.name]
    if (v == null) continue
    if (f.type === 'upload') {
      out[f.name] = 'hasMany' in f && f.hasMany ? (await Promise.all((v as unknown[]).map(upload))).filter(Boolean) : await upload(v)
    } else if (f.type === 'relationship') {
      const ref = (id: unknown) => {
        const hit = ids.get(String(id))
        if (!hit) return undefined
        return Array.isArray(f.relationTo) ? hit : hit.value
      }
      out[f.name] = f.hasMany ? (v as unknown[]).map(ref).filter(Boolean) : ref(v)
    } else if (f.type === 'array') {
      const rows = v as unknown[]
      out[f.name] = isParagraphList(f.fields) ? rows.map((paragraph) => ({ paragraph })) : await Promise.all(rows.map((r) => toPayload(f.fields, r as Raw)))
    } else if (f.type === 'group') {
      out[f.name] = await toPayload(f.fields, v as Raw)
    } else if (f.type === 'richText') {
      out[f.name] = await richText(v)
    } else {
      out[f.name] = v
    }
  }
  return out
}

const existing = await payload.count({ collection: 'categories' })
if (existing.totalDocs > 0) {
  console.log(`Database already has ${existing.totalDocs} categories; nothing seeded.`)
  process.exit(0)
}

// Categories and products first (their related links are filled in once every id exists).
for (const c of catalog.categories) {
  const { relatedIds, ...rest } = c
  const doc = await payload.create({ collection: 'categories', data: (await toPayload(Categories.fields, { ...rest, visible: true })) as never })
  ids.set(c.id, { relationTo: 'categories', value: doc.id })
}
for (const p of catalog.products) {
  const { relatedIds, categoryIds, ...rest } = p
  const doc = await payload.create({
    collection: 'products',
    data: (await toPayload(Products.fields, { ...rest, categories: categoryIds, status: 'live' })) as never,
  })
  ids.set(p.id, { relationTo: 'products', value: doc.id })
}
for (const item of [...catalog.categories, ...catalog.products]) {
  if (!item.relatedIds?.length) continue
  const target = ids.get(item.id)!
  const related = item.relatedIds.map((id) => ids.get(id)).filter(Boolean)
  await payload.update({ collection: target.relationTo as 'categories' | 'products', id: target.value, data: { related } as never })
}

for (const [i, r] of site.reviews.entries()) {
  await payload.create({ collection: 'reviews', data: (await toPayload(Reviews.fields, { ...r, order: i })) as never })
}
for (const [i, c] of blog.blogCategories.entries()) {
  const doc = await payload.create({ collection: 'blog-categories', data: (await toPayload(BlogCategories.fields, { ...c, order: i })) as never })
  ids.set(c.id, { relationTo: 'blog-categories', value: doc.id })
}
for (const [i, tp] of blog.blogTopics.entries()) {
  const doc = await payload.create({ collection: 'blog-topics', data: (await toPayload(BlogTopics.fields, { ...tp, order: i })) as never })
  ids.set(tp.id, { relationTo: 'blog-topics', value: doc.id })
}
for (const post of blog.posts) {
  const data = await toPayload(Posts.fields, { ...post, category: post.categoryId, topics: post.topicIds } as unknown as Raw)
  const doc = await payload.create({ collection: 'posts', data: data as never })
  ids.set(post.id, { relationTo: 'posts', value: doc.id })
}
for (const page of site.pages) {
  await payload.create({ collection: 'pages', data: (await toPayload(Pages.fields, page as unknown as Raw)) as never })
}
await payload.updateGlobal({ slug: 'blog-page', data: (await toPayload(BlogPage.fields, blog.blogPage as unknown as Raw)) as never })

const home = site.home
await payload.updateGlobal({
  slug: 'home-page',
  data: (await toPayload(HomePage.fields, {
    ...home,
    industries: { ...home.industries, tabs: home.industries.tabs.map(({ categoryId, ...t }) => ({ ...t, category: categoryId })) },
    blog: { ...home.blog, posts: home.blog.postIds },
  } as unknown as Raw)) as never,
})
await payload.updateGlobal({ slug: 'artwork-page', data: (await toPayload(ArtworkPage.fields, site.artwork as unknown as Raw)) as never })
await payload.updateGlobal({ slug: 'paper-weight-page', data: (await toPayload(PaperWeightPage.fields, paperWeight as unknown as Raw)) as never })
await payload.updateGlobal({ slug: 'about-page', data: (await toPayload(AboutPage.fields, site.about as unknown as Raw)) as never })
await payload.updateGlobal({ slug: 'site-settings', data: (await toPayload(SiteSettings.fields, site.settings as unknown as Raw)) as never })

console.log(
  `Seeded ${catalog.categories.length} categories, ${catalog.products.length} sub-products, ${site.reviews.length} reviews, ${blog.posts.length} posts and ${media.size} images.`,
)
process.exit(0)

import { cache } from 'react'
import * as seedCatalog from '@/content/catalog'
import * as seedSite from '@/content/site'
import { cmsId, fromFields } from './cms/normalize'
import type { Card, Category, HomePage, PageContent, Product, SiteData, SiteSettings } from './types'

/** The Payload database is only used when one is configured; otherwise the site runs from content/*.ts. */
export const cmsEnabled = !!process.env.DATABASE_URI

const seed: SiteData = {
  settings: seedSite.settings,
  home: seedSite.home,
  categories: seedCatalog.categories,
  products: seedCatalog.products,
  reviews: seedSite.reviews,
  posts: seedSite.posts,
}

const pageDefaults = <T extends Partial<PageContent>>(doc: T) => ({ ...doc, highlights: doc.highlights ?? [], gallery: doc.gallery ?? [] })

// Empty shapes the CMS singletons are merged onto, so a field an editor leaves blank
// renders as "hidden" rather than crashing or showing seed copy.
const emptySettings: SiteSettings = {
  socials: [],
  menuPromo: {},
  resourcesMenu: [],
  stats: [],
  trustedBrands: [],
  google: { score: '', label: '', countText: '' },
  trustStrip: [],
  formDefaults: { material: [], size: [], printing: [], productionSpeed: [], quantity: [], design: [] },
  productDefaults: {},
  cta: {},
  footer: { columns: [], legal: [] },
  reviewsSection: {},
  contact: { topics: [] },
}
const emptyHome: HomePage = {
  hero: { heading: '', slides: [] },
  chooseBox: { cards: [] },
  steps: { steps: [] },
  industries: { tabs: [], defaultCards: [] },
  quantity: { body: [], features: [] },
  design: { body: [], bullets: [] },
  eco: {},
  logo: { body: [], bullets: [] },
  sample: {},
  faq: { items: [] },
  blog: { postIds: [] },
}

/** One level deep: each top-level object keeps its empty defaults for keys the CMS lacks. */
function mergeOnto<T extends object>(base: T, doc: Record<string, unknown> | undefined): T {
  const out = { ...base } as Record<string, unknown>
  for (const [k, v] of Object.entries(doc ?? {})) {
    const b = out[k]
    out[k] = b && typeof b === 'object' && !Array.isArray(b) && v && typeof v === 'object' ? { ...b, ...v } : v
  }
  return out as T
}

type RawHome = Record<string, Record<string, unknown> | undefined> & {
  industries?: { tabs?: { category?: string }[] }
  blog?: { posts?: string[] }
}

function homeFromCms(doc: RawHome): HomePage {
  const tabs = doc.industries?.tabs?.map(({ category, ...t }) => ({ ...t, categoryId: category, cards: (t as { cards?: Card[] }).cards ?? [] }))
  const { posts, ...blog } = doc.blog ?? {}
  return mergeOnto(emptyHome, { ...doc, industries: { ...doc.industries, ...(tabs ? { tabs } : {}) }, blog: { ...blog, postIds: posts ?? [] } })
}

/** Everything the site renders, read in one go through Payload's Local API (the catalogue is small). */
export const getSiteData = cache(async (): Promise<SiteData> => {
  if (!cmsEnabled) return seed
  const [{ getPayload }, { default: config }, schema] = await Promise.all([import('payload'), import('@payload-config'), import('@/payload/schema')])
  const payload = await getPayload({ config })
  const all = { depth: 1, pagination: false } as const
  const [settings, home, categories, products, reviews, posts] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'home-page', depth: 1 }),
    payload.find({ collection: 'categories', where: { visible: { not_equals: false } }, sort: 'order', ...all }),
    payload.find({ collection: 'products', where: { status: { not_equals: 'hidden' } }, sort: 'order', ...all }),
    payload.find({ collection: 'reviews', sort: 'order', ...all }),
    payload.find({ collection: 'posts', sort: '-publishedAt', ...all }),
  ])
  const doc =
    (collection: string, fields: Parameters<typeof fromFields>[0]) =>
    (d: { id: unknown }): Record<string, unknown> & { id: string } => ({ ...fromFields(fields, d as Record<string, unknown>), id: cmsId(collection, d.id) })
  // A global nobody has saved yet has no updatedAt: fall back to the seed so a fresh database still renders.
  const saved = (g: { updatedAt?: unknown }) => !!g.updatedAt
  return {
    settings: saved(settings) ? mergeOnto(emptySettings, fromFields(schema.SiteSettings.fields, settings as unknown as Record<string, unknown>)) : seed.settings,
    home: saved(home) ? homeFromCms(fromFields(schema.HomePage.fields, home as unknown as Record<string, unknown>) as RawHome) : seed.home,
    categories: categories.docs
      .map(doc('categories', schema.Categories.fields))
      .map(({ related, ...c }) => pageDefaults({ ...c, relatedIds: (related as string[]) ?? [] }) as Category),
    products: products.docs
      .map(doc('products', schema.Products.fields))
      .map(({ categories, related, ...p }) => pageDefaults({ ...p, categoryIds: (categories as string[]) ?? [], relatedIds: (related as string[]) ?? [] }) as Product),
    reviews: reviews.docs.map(doc('reviews', schema.Reviews.fields)) as unknown as SiteData['reviews'],
    posts: posts.docs.map(doc('posts', schema.Posts.fields)) as unknown as SiteData['posts'],
  }
})

export const groupLabel = (kind: Category['kind']) => (kind === 'industry' ? 'Boxes By Industry' : 'Custom Boxes')

export function productsIn(data: SiteData, categoryId: string) {
  return data.products.filter((p) => p.categoryIds.includes(categoryId))
}

export function findCategory(data: SiteData, slug: string) {
  return data.categories.find((c) => c.slug === slug)
}

export function findProduct(data: SiteData, category: Category, slug: string) {
  return productsIn(data, category.id).find((p) => p.slug === slug)
}

export function hrefFor(data: SiteData, item: Category | Product) {
  if ('kind' in item) return `/${item.slug}`
  const cat = data.categories.find((c) => c.id === item.categoryIds[0])
  return cat ? `/${cat.slug}/${item.slug}` : '/products'
}

/** A category or product as a card (explore grid, related carousel, industry tabs). */
export function toCard(data: SiteData, item: Category | Product, linkLabel: string): Card {
  return {
    title: item.title,
    text: item.cardText ?? item.shortDescription,
    linkLabel,
    href: hrefFor(data, item),
    image: item.cardImage ?? item.gallery[0],
  }
}

export function resolveRelated(data: SiteData, ids: string[]) {
  const all: (Category | Product)[] = [...data.categories, ...data.products]
  return ids.map((id) => all.find((x) => x.id === id)).filter((x): x is Category | Product => !!x)
}

import { cache } from 'react'
import * as seedCatalog from '@/content/catalog'
import * as seedSite from '@/content/site'
import { client } from './sanity/client'
import { CMS_TAG } from './sanity/env'
import { normalize } from './sanity/normalize'
import type { Card, Category, HomePage, PageContent, Product, SiteData, SiteSettings } from './types'

const SITE_QUERY = `{
  "settings": *[_id == "siteSettings"][0],
  "home": *[_id == "homePage"][0],
  "categories": *[_type == "category" && visible != false] | order(order asc),
  "products": *[_type == "product" && status != "hidden"] | order(order asc),
  "reviews": *[_type == "review"] | order(order asc),
  "posts": *[_type == "post"] | order(publishedAt desc)
}`

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

/** Everything the site renders, fetched in one cached query (the catalogue is small). */
export const getSiteData = cache(async (): Promise<SiteData> => {
  if (!client) return seed
  const raw = await client.fetch(SITE_QUERY, {}, { next: { tags: [CMS_TAG], revalidate: 3600 } })
  const d = normalize(raw) as Partial<Record<keyof SiteData, unknown>>
  return {
    // A singleton that doesn't exist yet falls back to the seed so a fresh dataset still renders.
    settings: d.settings ? mergeOnto(emptySettings, d.settings as Record<string, unknown>) : seed.settings,
    home: d.home ? homeFromCms(d.home as RawHome) : seed.home,
    categories: ((d.categories as (Category & { related?: string[] })[]) ?? []).map(
      ({ related, ...c }) => pageDefaults({ ...c, relatedIds: related ?? [] }) as Category,
    ),
    products: ((d.products as (Product & { categories?: string[]; related?: string[] })[]) ?? []).map(
      ({ categories, related, ...p }) => pageDefaults({ ...p, categoryIds: categories ?? [], relatedIds: related ?? [] }) as Product,
    ),
    reviews: (d.reviews as SiteData['reviews']) ?? [],
    posts: (d.posts as SiteData['posts']) ?? [],
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

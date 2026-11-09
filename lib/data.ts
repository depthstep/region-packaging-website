import { cache } from 'react'
import * as seedCatalog from '@/content/catalog'
import * as seedSite from '@/content/site'
import * as seedBlog from '@/content/blog'
import { cmsId, fromFields } from './cms/normalize'
import type { AboutPage, ArtworkPage, BlogCategory, BlogPage, BlogPost, Card, Category, HomePage, PageContent, PageIntroText, Product, SiteData, SiteSettings } from './types'

/** The Payload database is only used when one is configured; otherwise the site runs from content/*.ts. */
export const cmsEnabled = !!process.env.DATABASE_URI

/** Words in a rich-text article, for the read time. */
function wordCount(node: unknown): number {
  if (!node || typeof node !== 'object') return 0
  const n = node as { text?: unknown; children?: unknown[]; root?: unknown }
  const own = typeof n.text === 'string' ? n.text.split(/\s+/).filter(Boolean).length : 0
  return own + (n.children ?? []).reduce<number>((sum, c) => sum + wordCount(c), 0) + (n.root ? wordCount(n.root) : 0)
}

/** Read time (from the article unless set) and the "Category · N min read" card line. */
function finishPosts(posts: Omit<BlogPost, 'kicker'>[], categories: BlogCategory[]): BlogPost[] {
  return posts.map((p) => {
    const readMinutes = p.readMinutes ?? Math.max(1, Math.round(wordCount(p.body) / 200))
    const category = categories.find((c) => c.id === p.categoryId)
    return { ...p, readMinutes, kicker: [category?.title, `${readMinutes} min read`].filter(Boolean).join(' · ') }
  })
}

const seed: SiteData = {
  settings: seedSite.settings,
  home: seedSite.home,
  about: seedSite.about,
  artwork: seedSite.artwork,
  categories: seedCatalog.categories,
  products: seedCatalog.products,
  reviews: seedSite.reviews,
  posts: finishPosts(seedBlog.posts, seedBlog.blogCategories),
  blogCategories: seedBlog.blogCategories,
  blogTopics: seedBlog.blogTopics,
  blog: seedBlog.blogPage,
  pages: seedSite.pages,
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
  formDefaults: { style: [], finish: [], material: [], size: [], printing: [], productionSpeed: [], quantity: [], design: [] },
  subProductDefaults: { highlights: [], gallery: [] },
  pageIntros: {},
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
const emptyAbout: AboutPage = {
  hero: { photos: [] },
  mission: {},
  whoWeAre: { body: [], stats: [] },
  products: {},
  values: { items: [] },
}
const emptyBlog: BlogPage = { hero: {}, post: { help: {} } }
const emptyArtwork: ArtworkPage = {
  hero: {},
  formats: { items: [] },
  essentials: { items: [] },
  steps: { steps: [] },
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
  const [settings, home, about, artwork, blog, categories, products, reviews, posts, blogCategories, blogTopics, pages] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'home-page', depth: 1 }),
    payload.findGlobal({ slug: 'about-page', depth: 1 }),
    payload.findGlobal({ slug: 'artwork-page', depth: 1 }),
    payload.findGlobal({ slug: 'blog-page', depth: 1 }),
    payload.find({ collection: 'categories', where: { visible: { not_equals: false } }, sort: 'order', ...all }),
    payload.find({ collection: 'products', where: { status: { not_equals: 'hidden' } }, sort: 'order', ...all }),
    payload.find({ collection: 'reviews', sort: 'order', ...all }),
    payload.find({ collection: 'posts', sort: '-publishedAt', ...all }),
    payload.find({ collection: 'blog-categories', sort: 'order', ...all }),
    payload.find({ collection: 'blog-topics', sort: 'order', ...all }),
    payload.find({ collection: 'pages', sort: 'title', ...all }),
  ])
  const doc =
    (collection: string, fields: Parameters<typeof fromFields>[0]) =>
    (d: { id: unknown }): Record<string, unknown> & { id: string } => ({ ...fromFields(fields, d as Record<string, unknown>), id: cmsId(collection, d.id) })
  // A global nobody has saved yet has no updatedAt: fall back to the seed so a fresh database still renders.
  const saved = (g: { updatedAt?: unknown }) => !!g.updatedAt
  return {
    settings: saved(settings) ? mergeOnto(emptySettings, fromFields(schema.SiteSettings.fields, settings as unknown as Record<string, unknown>)) : seed.settings,
    home: saved(home) ? homeFromCms(fromFields(schema.HomePage.fields, home as unknown as Record<string, unknown>) as RawHome) : seed.home,
    artwork: saved(artwork) ? mergeOnto(emptyArtwork, fromFields(schema.ArtworkPage.fields, artwork as unknown as Record<string, unknown>)) : seed.artwork,
    about: saved(about) ? mergeOnto(emptyAbout, fromFields(schema.AboutPage.fields, about as unknown as Record<string, unknown>)) : seed.about,
    categories: categories.docs
      .map(doc('categories', schema.Categories.fields))
      .map(({ related, ...c }) => pageDefaults({ ...c, relatedIds: (related as string[]) ?? [] }) as Category),
    products: products.docs
      .map(doc('products', schema.Products.fields))
      .map(({ categories, related, ...p }) => pageDefaults({ ...p, categoryIds: (categories as string[]) ?? [], relatedIds: (related as string[]) ?? [] }) as Product),
    reviews: reviews.docs.map(doc('reviews', schema.Reviews.fields)) as unknown as SiteData['reviews'],
    pages: pages.docs.map(doc('pages', schema.Pages.fields)) as unknown as SiteData['pages'],
    ...(() => {
      const cats = blogCategories.docs.map(doc('blog-categories', schema.BlogCategories.fields)) as unknown as BlogCategory[]
      const list = posts.docs
        .map(doc('posts', schema.Posts.fields))
        .map(({ category, topics, ...p }) => ({ ...p, categoryId: category, topicIds: (topics as string[]) ?? [] })) as unknown as Omit<BlogPost, 'kicker'>[]
      return {
        posts: finishPosts(list, cats),
        blogCategories: cats,
        blogTopics: blogTopics.docs.map(doc('blog-topics', schema.BlogTopics.fields)) as unknown as SiteData['blogTopics'],
        blog: saved(blog) ? mergeOnto(emptyBlog, fromFields(schema.BlogPage.fields, blog as unknown as Record<string, unknown>)) : seed.blog,
      }
    })(),
  }
})

/** Page title + description from Site settings > Other pages. */
export function introMetadata(intro: PageIntroText | undefined, fallback: string) {
  return { title: intro?.seoTitle ? { absolute: intro.seoTitle } : intro?.heading || fallback, description: intro?.seoDescription }
}

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

/** The category a sub-product sits under for its breadcrumb and related boxes: the first one listed that is shown on the site. */
export function primaryCategory(data: SiteData, product: Product) {
  return product.categoryIds.map((id) => data.categories.find((c) => c.id === id)).find((c): c is Category => !!c)
}

/** Every category, sub-product and simple page is at your-domain/slug. */
export function hrefFor(data: SiteData, item: Category | Product) {
  if ('kind' in item) return `/${item.slug}`
  return primaryCategory(data, item) ? `/${item.slug}` : '/products'
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

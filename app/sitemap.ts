import type { MetadataRoute } from 'next'
import { noIndex } from '@/lib/asset'
import { getSiteData, hrefFor } from '@/lib/data'

export const dynamic = 'force-static'
export const revalidate = 3600

const STATIC_PATHS = ['/', '/about', '/contact', '/quote', '/products', '/blog', '/faqs', '/how-to-order', '/artwork-guidelines']

/** Every public page, refreshed whenever an editor saves (see payload/hooks.ts). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (noIndex) return []
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  const data = await getSiteData()
  const paths = [
    ...STATIC_PATHS,
    ...data.pages.map((p) => `/${p.slug}`),
    ...data.categories.map((c) => hrefFor(data, c)),
    ...data.products.map((p) => hrefFor(data, p)),
    ...data.blogCategories.map((c) => `/blog/category/${c.slug}`),
  ]
  return [
    ...paths.map((path) => ({ url: site + (path === '/' ? '' : path) })),
    ...data.posts.map((p) => ({ url: `${site}/blog/${p.slug}`, lastModified: p.publishedAt })),
  ]
}

import { getPublishedData, hrefFor } from '@/lib/data'

const STATIC_PATHS = ['/', '/about', '/contact', '/quote', '/products', '/blog', '/faqs', '/artwork-guidelines', '/paper-weight-chart']

/** Every public page's path, with each blog post's date. Used by the sitemap and the deploy warm-up. */
export async function publicPaths(): Promise<{ path: string; lastModified?: string }[]> {
  const data = await getPublishedData()
  return [
    ...[
      ...STATIC_PATHS,
      ...data.pages.map((p) => `/${p.slug}`),
      ...data.categories.map((c) => hrefFor(data, c)),
      ...data.products.map((p) => hrefFor(data, p)),
      ...data.blogCategories.map((c) => `/blog/category/${c.slug}`),
    ].map((path) => ({ path })),
    ...data.posts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.publishedAt })),
  ]
}

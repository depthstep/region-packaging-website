import type { MetadataRoute } from 'next'
import { noIndex } from '@/lib/asset'
import { publicPaths } from '@/lib/sitePaths'

export const dynamic = 'force-static'
export const revalidate = 3600

/** Every public page, refreshed whenever an editor saves (see payload/hooks.ts). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (noIndex) return []
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  return (await publicPaths()).map(({ path, lastModified }) => ({ url: site + (path === '/' ? '' : path), ...(lastModified ? { lastModified } : {}) }))
}

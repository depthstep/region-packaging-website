import type { MetadataRoute } from 'next'
import { noIndex } from '@/lib/asset'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  if (noIndex) return { rules: { userAgent: '*', disallow: '/' } }
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  return {
    // Uploaded photos live under /api/media, so that part of /api stays open.
    rules: { userAgent: '*', allow: ['/', '/api/media/'], disallow: ['/admin', '/api/'] },
    sitemap: `${site}/sitemap.xml`,
  }
}

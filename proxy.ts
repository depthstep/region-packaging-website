import { NextResponse, type NextRequest } from 'next/server'
import { WATERMARK_STYLE } from '@/lib/watermarkUrls'

/**
 * Photo watermark: when someone opens an uploaded photo's address in the browser (pasted,
 * bookmarked, shared, or found with "Inspect" in developer tools), they are sent to the watermarked
 * copy. Admins who are logged in still get the original. The site's own image requests are not
 * page visits, so the clean photos on the pages are unaffected.
 *
 * Two kinds of address are covered:
 *  - The original file, /api/media/file/<name>. Marked "do not store" so Cloudflare and browsers
 *    never keep a clean copy under that address and hand it out later.
 *  - The resized copies the pages show, /_next/image?url=/api/media/file/<name>&w=..&q=..
 *    These stay cached by Cloudflare (they make the site fast). Caddy on the server adds
 *    "Vary: Accept, Sec-Fetch-Dest" to them (Next.js fixes its own Vary to Accept), so browsers and
 *    Cloudflare keep the copy shown on a page apart from one opened as a page, and the latter
 *    always comes here and is sent to the watermarked copy.
 *
 * Search engines are never redirected: their crawlers don't open photos as page visits, and are
 * also recognised by name, so Google Images keeps the clean photos.
 */
const PHOTO = /\.(jpe?g|png|webp)$/i
const UPLOAD = '/api/media/file/'
const CRAWLER = /googlebot|google-inspectiontool|googleother|bingbot|duckduckbot|yandex|baiduspider|applebot|slurp|facebookexternalhit|twitterbot|linkedinbot|pinterest/i

const toWatermark = (to: string, request: NextRequest) => {
  const res = NextResponse.redirect(new URL(to, request.url), 307)
  res.headers.set('Cache-Control', 'no-store')
  res.headers.set('Vary', 'Sec-Fetch-Dest')
  return res
}

export function proxy(request: NextRequest) {
  const isPageVisit = request.headers.get('sec-fetch-dest') === 'document'
  const exempt = request.cookies.has('payload-token') || CRAWLER.test(request.headers.get('user-agent') ?? '')
  const { pathname, searchParams } = request.nextUrl

  if (pathname === '/_next/image') {
    const src = searchParams.get('url') ?? ''
    if (!src.startsWith(UPLOAD) || !PHOTO.test(src)) return NextResponse.next()
    if (isPageVisit && !exempt) {
      const wm = `/api/media/wm/${WATERMARK_STYLE}/${src.slice(UPLOAD.length)}`
      const to = new URLSearchParams({ url: wm, w: searchParams.get('w') ?? '1080', q: searchParams.get('q') ?? '75' })
      return toWatermark(`/_next/image?${to}`, request)
    }
    return NextResponse.next()
  }

  const file = pathname.split('/').pop() ?? ''
  if (isPageVisit && !exempt && PHOTO.test(file)) return toWatermark(`/api/media/wm/${WATERMARK_STYLE}/${file}`, request)
  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}

export const config = {
  matcher: ['/api/media/file/:path*', '/_next/image'],
}

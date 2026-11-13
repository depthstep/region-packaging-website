import { NextResponse, type NextRequest } from 'next/server'

/**
 * Photo watermark, file addresses: when someone opens an uploaded photo's own address in the
 * browser (pasted, bookmarked or shared), they are sent to the watermarked copy. Admins who are
 * logged in still get the original. The site's own image requests are not page visits, so the
 * clean photos on the pages are unaffected.
 *
 * These responses are marked "do not store" so Cloudflare and browsers never keep a clean copy
 * under the same address and hand it out later.
 */
export function proxy(request: NextRequest) {
  const file = request.nextUrl.pathname.split('/').pop() ?? ''
  const isPageVisit = request.headers.get('sec-fetch-dest') === 'document'
  const isAdmin = request.cookies.has('payload-token')
  if (isPageVisit && !isAdmin && /\.(jpe?g|png|webp)$/i.test(file)) {
    const to = new URL(`/api/media/wm/${file}`, request.url)
    const res = NextResponse.redirect(to, 307)
    res.headers.set('Cache-Control', 'no-store')
    return res
  }
  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}

export const config = {
  matcher: '/api/media/file/:path*',
}

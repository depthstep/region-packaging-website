import { withBase } from './asset'

/**
 * Photo watermark: which images are protected and the addresses involved.
 * Visitors see the clean photo; anything that saves or opens the photo gets the watermarked copy.
 * Only photos uploaded through the admin (/api/media/file/...) are protected, never SVG icons or logos.
 */
const UPLOAD = '/api/media/file/'
/**
 * The watermark's look. Change it whenever the look changes: the style is part of every
 * watermarked address, so no stored copy (server, Cloudflare or browser) can show an old look.
 */
export const WATERMARK_STYLE = 'v3'
const WATERMARKED = `/api/media/wm/${WATERMARK_STYLE}/`

export function isProtected(src?: string): src is string {
  return !!src && src.startsWith(UPLOAD) && /\.(jpe?g|png|webp)$/i.test(src)
}

/** The watermarked copy at a display size, for the invisible layer over each photo. */
export function watermarkedUrl(src: string, width = 1080) {
  return withBase(`/_next/image?url=${encodeURIComponent(WATERMARKED + src.slice(UPLOAD.length))}&w=${width}&q=75`)
}

/** A sharp, light copy of the clean photo for the zoom (the full-size original is not sent). */
export function zoomUrl(src: string) {
  return withBase(`/_next/image?url=${encodeURIComponent(src)}&w=1920&q=90`)
}

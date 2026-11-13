import { watermarked } from '@/lib/watermark'
import { WATERMARK_STYLE } from '@/lib/watermarkUrls'

// The watermarked copy of an uploaded photo. This is what visitors get when they save, drag,
// long-press or open a photo, or paste a photo's file address into the browser.
// An address with an old style sends the visitor on to the current one.
export async function GET(req: Request, { params }: { params: Promise<{ style: string; file: string }> }) {
  const { style, file } = await params
  if (style !== WATERMARK_STYLE) {
    return new Response(null, { status: 307, headers: { Location: new URL(`/api/media/wm/${WATERMARK_STYLE}/${file}`, req.url).toString(), 'Cache-Control': 'no-store' } })
  }
  const found = await watermarked(decodeURIComponent(file))
  if (!found) return new Response('Not found', { status: 404 })
  return new Response(new Uint8Array(found.body), {
    headers: {
      'Content-Type': found.type,
      'Content-Disposition': `inline; filename="${file.replace(/"/g, '')}"`,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

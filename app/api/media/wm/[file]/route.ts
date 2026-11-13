import { watermarked } from '@/lib/watermark'

// The watermarked copy of an uploaded photo (RP logo strips). This is what visitors get when they
// save, drag, long-press or open a photo, or paste a photo's file address into the browser.
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
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

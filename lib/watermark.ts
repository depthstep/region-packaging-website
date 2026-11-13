import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { MARK_BOX, MARK_PATHS, WORD_BOX, WORD_PATHS } from './watermarkLogo'

/**
 * Stamps a photo with the RP watermark (see overlay below). Copies are made the first time they
 * are asked for and kept in
 * <uploads>/media-watermarked-<style>; a new or replaced upload gets a fresh copy automatically.
 * The original upload is never changed.
 */
/** Change this when the watermark's look changes, so every photo gets a fresh copy in the new style. */
const STYLE = 'v2'

const uploads = () => path.resolve(process.env.UPLOADS_DIR || path.resolve(process.cwd(), 'uploads'))

function overlay(width: number, height: number) {
  // Stock-photo style, flat white with no shadow: large diagonal "REGION PACKAGING" wordmarks,
  // spaced out and staggered, plus a regular grid of small RP hexagon icons in between.
  const parts: string[] = []
  const wordW = Math.round(width / 4.2)
  const wordScale = wordW / WORD_BOX.width
  const colGap = width / 2.4
  const rowGap = height / 2.7
  for (let row = -1; row <= 3; row++) {
    for (let col = -1; col <= 3; col++) {
      const x = col * colGap + (row % 2 ? colGap / 2 : 0) + colGap * 0.15
      const y = row * rowGap + rowGap * 0.45
      parts.push(
        `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(-30) scale(${wordScale.toFixed(3)}) translate(${-WORD_BOX.x} 0)">${WORD_PATHS}</g>`,
      )
    }
  }
  const markH = Math.max(18, Math.round(width / 40))
  const markScale = markH / MARK_BOX.height
  const gridX = width / 7
  const gridY = height / 5.5
  for (let y = gridY / 2; y < height; y += gridY) {
    for (let x = gridX / 2; x < width; x += gridX) {
      parts.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${markScale.toFixed(3)})">${MARK_PATHS}</g>`)
    }
  }
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><g fill="#ffffff" fill-opacity="0.5">${parts.join('')}</g></svg>`,
  )
}

/** The watermarked copy of an upload, made on first request. Returns undefined if there is no such photo. */
export async function watermarked(file: string): Promise<{ body: Buffer; type: string } | undefined> {
  const name = path.basename(file)
  if (name !== file || !/\.(jpe?g|png|webp)$/i.test(name)) return undefined
  const source = path.join(uploads(), 'media', name)
  const cached = path.join(uploads(), `media-watermarked-${STYLE}`, name)
  const stat = await fs.stat(source).catch(() => undefined)
  if (!stat) return undefined
  const type = /\.png$/i.test(name) ? 'image/png' : /\.webp$/i.test(name) ? 'image/webp' : 'image/jpeg'
  const done = await fs.stat(cached).catch(() => undefined)
  if (done && done.mtimeMs >= stat.mtimeMs) return { body: await fs.readFile(cached), type }

  const img = sharp(source).rotate()
  const { width = 1600, height = 1200 } = await img.metadata()
  let out = img.composite([{ input: overlay(width, height), top: 0, left: 0 }])
  out = type === 'image/png' ? out.png() : type === 'image/webp' ? out.webp({ quality: 85 }) : out.jpeg({ quality: 85, mozjpeg: true })
  const body = await out.toBuffer()
  await fs.mkdir(path.dirname(cached), { recursive: true })
  await fs.writeFile(cached, body)
  return { body, type }
}

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { LOGO_PATHS, LOGO_VIEWBOX } from './watermarkLogo'

/**
 * Stamps a photo with repeating diagonal strips of the RP logo (white with a soft dark edge, so it
 * shows on light and dark photos). Copies are made the first time they are asked for and kept in
 * <uploads>/media-watermarked; a new or replaced upload gets a fresh copy automatically.
 * The original upload is never changed.
 */
const uploads = () => path.resolve(process.env.UPLOADS_DIR || path.resolve(process.cwd(), 'uploads'))

function overlay(width: number, height: number) {
  // Logo width is about a fifth of the photo; rows of logos run diagonally across it.
  const logoW = Math.max(120, Math.round(width / 5))
  const scale = logoW / LOGO_VIEWBOX.width
  const logoH = Math.round(LOGO_VIEWBOX.height * scale)
  const gapX = Math.round(logoW * 0.55)
  const gapY = Math.round(logoH * 2.2)
  const tileW = logoW + gapX
  const tileH = logoH + gapY
  // Every other strip is shifted by half a logo, so the strips read as a woven pattern.
  const logo = (x: number, y: number) =>
    `<g transform="translate(${x} ${y}) scale(${scale})"><g fill="#000" fill-opacity="0.35" transform="translate(1.2 1.2)">${LOGO_PATHS}</g><g fill="#fff" fill-opacity="0.55">${LOGO_PATHS}</g></g>`
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <pattern id="strip" width="${tileW}" height="${tileH * 2}" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
          ${logo(0, 0)}${logo(Math.round(tileW / 2), tileH)}${logo(Math.round(tileW / 2) - tileW, tileH)}
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#strip)" opacity="0.9"/>
    </svg>`,
  )
}

/** The watermarked copy of an upload, made on first request. Returns undefined if there is no such photo. */
export async function watermarked(file: string): Promise<{ body: Buffer; type: string } | undefined> {
  const name = path.basename(file)
  if (name !== file || !/\.(jpe?g|png|webp)$/i.test(name)) return undefined
  const source = path.join(uploads(), 'media', name)
  const cached = path.join(uploads(), 'media-watermarked', name)
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

'use client'

import { useState } from 'react'
import { watermarkedUrl } from '@/lib/watermarkUrls'

const EMPTY = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * An invisible copy of the photo, laid exactly over the visible one. Right-click "Save image",
 * "Open image in new tab", "Copy image address", dragging and long-press on phones all act on
 * this layer, so they get the watermarked copy (RP logo strips) while visitors see the clean photo.
 * It only loads when the pointer or a finger reaches the photo, so pages stay as fast as before,
 * and search engines (which do not hover) keep indexing the clean photo.
 */
export function WatermarkGuard({ src, alt }: { src: string; alt: string }) {
  const [armed, setArmed] = useState(false)
  const arm = () => setArmed(true)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="media__guard"
      src={armed ? watermarkedUrl(src) : EMPTY}
      alt={alt}
      aria-hidden="true"
      data-wm={watermarkedUrl(src)}
      decoding="async"
      onPointerEnter={arm}
      onTouchStart={arm}
      onFocus={arm}
      onContextMenu={arm}
    />
  )
}

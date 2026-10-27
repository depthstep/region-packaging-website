import Image from 'next/image'
import type { Img } from '@/lib/types'

type Props = {
  img?: Img
  /** Shown on the placeholder when no image has been supplied yet. */
  fallback: string
  sizes: string
  className?: string
  priority?: boolean
}

/** Fills its (positioned, sized) parent with an image, or a clearly labelled placeholder. */
export function Media({ img, fallback, sizes, className = '', priority }: Props) {
  if (!img?.src) {
    return (
      <div className={`media media--placeholder ${className}`} role="img" aria-label={`Placeholder: ${img?.label || fallback}`}>
        <span className="media__tag">Placeholder</span>
        <span className="media__label">{img?.label || fallback}</span>
        <span className="media__hint">Replace in CMS</span>
      </div>
    )
  }
  return (
    <div className={`media ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
    </div>
  )
}

/** A small icon image, or a dashed placeholder box of the same size. */
export function Icon({ img, size = 40, label = 'Icon' }: { img?: Img; size?: number; label?: string }) {
  if (!img?.src)
    return (
      <span className="icon-placeholder" style={{ width: size, height: size }} title={`Placeholder: ${img?.label || label}`}>
        icon
      </span>
    )
  // Icons are small SVGs; next/image adds nothing here.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={img.src} alt={img.alt} width={size} height={size} className="icon" style={{ width: size, height: size }} />
}

'use client'

import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { withBase } from '@/lib/asset'
import type { Img } from '@/lib/types'
import { Minus, Plus } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'

/** The zoom never goes past this, and never below MIN even for a small photo. */
const MAX_SCALE = 3
const MIN_SCALE = 1.6

/**
 * Product photos with a thumbnail strip.
 * Zoom works like Amazon's: on a computer, moving the mouse over the photo shows the spot
 * under the pointer enlarged. On phones the + button zooms in and a finger drag looks around.
 *
 * Quality: the zoom uses the full-size original and enlarges it only as far as the photo has
 * real detail for this screen (one photo pixel per screen pixel), so it is never stretched and
 * blurry. Larger originals automatically allow a deeper zoom. The original starts loading when
 * the pointer comes near, and the zoom only shows once it has fully loaded.
 */
export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const list = images.length ? images : [{ alt: '', label: `${title} photo` }]
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [scale, setScale] = useState(2)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const box = useRef<HTMLDivElement>(null)
  const current = list[index]
  const src = current.src ? withBase(current.src) : undefined
  const canZoom = !!src
  const ready = !!src && loaded[src]
  const active = canZoom && (zoom || hover)

  /** Fetch the full-size photo once; the zoom appears when it is in. */
  const preload = () => {
    if (!src || loaded[src] !== undefined) return
    setLoaded((l) => ({ ...l, [src]: false }))
    const img = new window.Image()
    img.onload = () => setLoaded((l) => ({ ...l, [src]: true }))
    img.src = src
  }

  // How far to enlarge: as far as the photo's real detail allows on this screen.
  useEffect(() => {
    const fit = () => {
      const w = box.current?.clientWidth
      if (!w) return
      const natural = current.width ?? 1600
      const s = natural / (w * (window.devicePixelRatio || 1))
      setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, s)))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [current.width])

  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const clamp = (v: number) => Math.min(100, Math.max(0, v))
    setPos({ x: clamp(((e.clientX - r.left) / r.width) * 100), y: clamp(((e.clientY - r.top) / r.height) * 100) })
  }
  // Hover zoom only for a real mouse or trackpad; touch uses the + / - buttons.
  const isMouse = (e: PointerEvent) => e.pointerType === 'mouse'

  return (
    <div className="gallery" onPointerEnter={preload}>
      <div
        ref={box}
        className={`gallery__main ${active ? 'is-zoomed' : ''} ${active && !ready ? 'is-loading' : ''}`}
        onPointerEnter={(e) => {
          if (isMouse(e) && canZoom) {
            preload()
            follow(e)
            setHover(true)
          }
        }}
        onPointerLeave={(e) => isMouse(e) && setHover(false)}
        onPointerMove={(e) => (isMouse(e) || zoom) && follow(e)}
        onPointerDown={(e) => zoom && follow(e)}
      >
        <Media img={current} fallback={`${title} photo`} sizes="(max-width: 900px) 100vw, 630px" priority />
        {active && ready && (
          <div
            className="gallery__lens"
            aria-hidden="true"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: `${scale * 100}%`,
              backgroundPosition: `${pos.x}% ${pos.y}%`,
            }}
          />
        )}
        {canZoom && (
          <div className="gallery__zoom">
            <button
              type="button"
              onClick={() => {
                preload()
                setZoom(true)
              }}
              disabled={zoom}
              aria-label="Zoom in"
            >
              <Plus />
            </button>
            <button type="button" onClick={() => setZoom(false)} disabled={!zoom} aria-label="Zoom out">
              <Minus />
            </button>
          </div>
        )}
      </div>
      {list.length > 1 && (
        <ul className="gallery__thumbs">
          {list.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                className={i === index ? 'is-active' : ''}
                onClick={() => {
                  setIndex(i)
                  setZoom(false)
                }}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
              >
                <Media img={img} fallback={`Image ${i + 1}`} sizes="140px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

'use client'

import { useState, type PointerEvent } from 'react'
import { withBase } from '@/lib/asset'
import type { Img } from '@/lib/types'
import { Minus, Plus } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'

/** How much the zoom enlarges the photo. */
const SCALE = 2.5

/**
 * Product photos with a thumbnail strip.
 * Zoom works like Amazon's: on a computer, moving the mouse over the photo shows the spot
 * under the pointer enlarged. On phones the + button zooms in and a finger drag looks around.
 * The zoomed view uses the full-size original, so it stays sharp.
 */
export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const list = images.length ? images : [{ alt: '', label: `${title} photo` }]
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const current = list[index]
  const canZoom = !!current.src
  const active = canZoom && (zoom || hover)

  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const clamp = (v: number) => Math.min(100, Math.max(0, v))
    setPos({ x: clamp(((e.clientX - r.left) / r.width) * 100), y: clamp(((e.clientY - r.top) / r.height) * 100) })
  }
  // Hover zoom only for a real mouse or trackpad; touch uses the + / - buttons.
  const isMouse = (e: PointerEvent) => e.pointerType === 'mouse'

  return (
    <div className="gallery">
      <div
        className={`gallery__main ${active ? 'is-zoomed' : ''}`}
        onPointerEnter={(e) => {
          if (isMouse(e) && canZoom) {
            follow(e)
            setHover(true)
          }
        }}
        onPointerLeave={(e) => isMouse(e) && setHover(false)}
        onPointerMove={(e) => (isMouse(e) || zoom) && follow(e)}
        onPointerDown={(e) => zoom && follow(e)}
      >
        <Media img={current} fallback={`${title} photo`} sizes="(max-width: 900px) 100vw, 630px" priority />
        {active && (
          <div
            className="gallery__lens"
            aria-hidden="true"
            style={{
              backgroundImage: `url("${withBase(current.src!)}")`,
              backgroundSize: `${SCALE * 100}%`,
              backgroundPosition: `${pos.x}% ${pos.y}%`,
            }}
          />
        )}
        {canZoom && (
          <div className="gallery__zoom">
            <button type="button" onClick={() => setZoom(true)} disabled={zoom} aria-label="Zoom in">
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

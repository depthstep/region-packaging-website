'use client'

import { useState } from 'react'
import type { Img } from '@/lib/types'
import { Minus, Plus } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'

export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const list = images.length ? images : [{ alt: '', label: `${title} photo` }]
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const current = list[index]
  return (
    <div className="gallery">
      <div className={`gallery__main ${zoom ? 'is-zoomed' : ''}`}>
        <Media img={current} fallback={`${title} photo`} sizes="(max-width: 900px) 100vw, 630px" priority />
        {current.src && (
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

'use client'

import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { withBase } from '@/lib/asset'
import type { Img } from '@/lib/types'
import { Media } from '@/components/ui/Media'

/** The zoom never goes past this, and never below MIN even for a small photo. */
const MAX_SCALE = 3
const MIN_SCALE = 1.6

/**
 * Product photos with a thumbnail strip.
 * Zoom works like Amazon's: on a computer, moving the mouse over the photo shows the spot
 * under the pointer enlarged. On phones and tablets a tap zooms in, a drag looks around and
 * another tap zooms out (no zoom buttons, as requested).
 *
 * Quality: the zoom uses the full-size original and enlarges it only as far as the photo has
 * real detail for this screen (one photo pixel per screen pixel), so it is never stretched and
 * blurry. Larger originals automatically allow a deeper zoom. On computers the full-size photo
 * loads with the page (then the other gallery photos, one at a time), so the zoom is ready before
 * the mouse arrives. On phones it loads on the first tap, to spare mobile data.
 * The zoom only shows once the full-size photo has fully loaded.
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
  const lastPointer = useRef('mouse')
  const current = list[index]
  const src = current.src ? withBase(current.src) : undefined
  const canZoom = !!src
  const ready = !!src && loaded[src]
  const active = canZoom && (zoom || hover)

  /** Fetch a full-size photo once; the zoom appears when it is in. */
  const started = useRef(new Set<string>())
  const fetchFull = (url: string | undefined, then?: () => void, low = false) => {
    if (!url || started.current.has(url)) return then?.()
    started.current.add(url)
    setLoaded((l) => ({ ...l, [url]: false }))
    const img = new window.Image()
    img.decoding = 'async'
    if (low) img.fetchPriority = 'low'
    img.onload = () => {
      setLoaded((l) => ({ ...l, [url]: true }))
      then?.()
    }
    img.onerror = () => then?.()
    img.src = url
  }
  const preload = () => fetchFull(src)

  // Computers: once the page has finished loading and the browser is idle, fetch the shown
  // photo's full-size version, then the others one at a time, at low priority, so nothing the
  // visitor sees or clicks waits for them. Skipped when the visitor has "data saver" on.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return
    const rest = list.map((i) => (i.src ? withBase(i.src) : undefined)).filter((u) => u && u !== src)
    const next = () => {
      const url = rest.shift()
      if (url) fetchFull(url, next, true)
    }
    let idle: number | undefined
    const start = () => {
      const run = () => fetchFull(src, next, true)
      idle = typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(run, { timeout: 3000 }) : window.setTimeout(run, 500)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (idle !== undefined) (typeof window.cancelIdleCallback === 'function' ? window.cancelIdleCallback(idle) : window.clearTimeout(idle))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

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
    <div className="gallery">
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
        onPointerDown={(e) => {
          lastPointer.current = e.pointerType
          if (zoom) follow(e)
        }}
        onClick={(e) => {
          // Phones and tablets: a tap zooms in at that spot, another tap zooms out.
          if (lastPointer.current === 'mouse' || !canZoom) return
          const r = e.currentTarget.getBoundingClientRect()
          setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
          preload()
          setZoom((z) => !z)
        }}
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

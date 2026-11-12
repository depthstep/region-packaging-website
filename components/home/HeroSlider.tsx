'use client'

import { useEffect, useState } from 'react'
import type { Img } from '@/lib/types'
import { Chevron } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'

const EVERY_MS = 5000

/**
 * The home page banner photos. They move on by themselves every few seconds; the
 * slideshow pauses while the pointer is over it or a button has focus, and stays
 * still for visitors whose device asks for reduced motion.
 */
export function HeroSlider({ slides }: { slides: Img[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length)

  useEffect(() => {
    if (slides.length < 2 || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length)
    }, EVERY_MS)
    return () => window.clearInterval(t)
  }, [slides.length, paused])

  return (
    <div
      className="hero__slider"
      aria-roledescription="carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div key={i} className={`hero__slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
          <Media img={s} fallback={`Hero slide ${i + 1}`} sizes="(max-width: 900px) 100vw, 575px" priority={i === 0} />
        </div>
      ))}
      {slides.length > 1 && (
        <div className="hero__arrows">
          <button type="button" className="arrow-btn" onClick={() => go(-1)} aria-label="Previous slide">
            <Chevron dir="left" size={16} />
          </button>
          <button type="button" className="arrow-btn" onClick={() => go(1)} aria-label="Next slide">
            <Chevron dir="right" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

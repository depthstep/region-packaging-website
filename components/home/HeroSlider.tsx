'use client'

import { useState } from 'react'
import type { Img } from '@/lib/types'
import { Chevron } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'

export function HeroSlider({ slides }: { slides: Img[] }) {
  const [index, setIndex] = useState(0)
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length)
  return (
    <div className="hero__slider" aria-roledescription="carousel">
      {slides.map((s, i) => (
        <div key={i} className="hero__slide" hidden={i !== index} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
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

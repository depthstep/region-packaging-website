'use client'

import { useRef } from 'react'
import type { Card, SectionHeading } from '@/lib/types'
import { PhotoCard } from '@/components/ui/Cards'
import { Chevron } from '@/components/ui/glyphs'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function RelatedCarousel({ heading, cards }: { heading?: SectionHeading; cards: Card[] }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 3 + 10), behavior: 'smooth' })
  }
  return (
    <section className="section section--rule">
      <div className="container">
        <SectionHeader
          {...heading}
          align="left"
          aside={
            cards.length > 3 && (
              <div className="carousel-arrows">
                <button type="button" className="arrow-btn" onClick={() => scroll(-1)} aria-label="Previous products">
                  <Chevron dir="left" size={14} />
                </button>
                <button type="button" className="arrow-btn" onClick={() => scroll(1)} aria-label="More products">
                  <Chevron dir="right" size={14} />
                </button>
              </div>
            )
          }
        />
        <div className="carousel" ref={track}>
          {cards.map((c) => (
            <div key={c.href ?? c.title} className="carousel__item">
              <PhotoCard card={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

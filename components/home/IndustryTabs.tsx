'use client'

import { useEffect, useRef, useState } from 'react'
import type { Card } from '@/lib/types'
import { PhotoCard } from '@/components/ui/Cards'

/**
 * Home page "Custom boxes by industry". The buttons stay pinned at the top of the screen while
 * the visitor scrolls through the cards, so they can switch industry without scrolling back up.
 * On phones and tablets they sit in one row that swipes sideways.
 */
export function IndustryTabs({ tabs }: { tabs: { label: string; cards: Card[] }[] }) {
  const [active, setActive] = useState(0)
  const [stuck, setStuck] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  // A marker just above the bar: once it has scrolled past the top, the bar is pinned.
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-top')) || 0
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < top + 1), { rootMargin: `-${top + 1}px 0px 0px 0px` })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function choose(i: number) {
    setActive(i)
    // Keep the chosen button in view in the sideways row (without moving the page).
    const r = row.current
    const btn = r?.children[i] as HTMLElement | undefined
    if (r && btn && r.scrollWidth > r.clientWidth) r.scrollTo({ left: btn.offsetLeft - (r.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' })
    // Scrolled down into the cards: go back to the first card of the new industry.
    const b = bar.current?.getBoundingClientRect()
    const p = panel.current?.getBoundingClientRect()
    if (b && p && p.top < b.bottom) window.scrollTo({ top: window.scrollY + p.top - b.bottom - 16, behavior: 'smooth' })
  }

  return (
    <>
      <div ref={sentinel} className="industry-tabs__sentinel" aria-hidden="true" />
      <div ref={bar} className={`industry-tabs ${stuck ? 'is-stuck' : ''}`}>
        <div ref={row} className="industry-tabs__row" role="tablist" aria-label="Industries">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              id={`industry-tab-${i}`}
              aria-selected={i === active}
              aria-controls="industry-panel"
              className="industry-tab"
              onClick={() => choose(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div ref={panel} className="grid-3 industry-panel" role="tabpanel" id="industry-panel" aria-labelledby={`industry-tab-${active}`}>
        {tabs[active]?.cards.slice(0, 3).map((c) => (
          <PhotoCard key={c.title} card={c} />
        ))}
      </div>
    </>
  )
}

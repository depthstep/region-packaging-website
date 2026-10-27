'use client'

import { useState } from 'react'
import type { Card } from '@/lib/types'
import { PhotoCard } from '@/components/ui/Cards'

export function IndustryTabs({ tabs }: { tabs: { label: string; cards: Card[] }[] }) {
  const [active, setActive] = useState(0)
  return (
    <>
      <div className="pill-row industry-tabs" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            id={`industry-tab-${i}`}
            aria-selected={i === active}
            aria-controls="industry-panel"
            className="pill"
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid-3" role="tabpanel" id="industry-panel" aria-labelledby={`industry-tab-${active}`}>
        {tabs[active]?.cards.slice(0, 3).map((c) => (
          <PhotoCard key={c.title} card={c} />
        ))}
      </div>
    </>
  )
}

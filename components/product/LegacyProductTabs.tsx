'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { withBase } from '@/lib/asset'

type Tab = { id: string; label: string; icon: string; content: ReactNode }

/**
 * Tabs for industry sub-product pages. Every panel is in the page HTML (search engines read
 * them all); only the active one is shown. A link to #specs, #faq … opens that tab.
 */
export function LegacyProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1)
      if (tabs.some((t) => t.id === id)) {
        setActive(id)
        bar.current?.scrollIntoView({ block: 'start' })
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [tabs])

  function select(id: string) {
    setActive(id)
    history.replaceState(null, '', `#${id}`)
    // Keep the tab bar in view when switching from far down a long panel.
    if (bar.current && bar.current.getBoundingClientRect().top < 0) bar.current.scrollIntoView({ block: 'start' })
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
    if (next === null) return
    e.preventDefault()
    const t = tabs[(next + tabs.length) % tabs.length]
    select(t.id)
    document.getElementById(`tab-${t.id}`)?.focus()
  }

  return (
    <div className="ptabs">
      <div className="ptabs__bar" ref={bar}>
        <div className="container ptabs__list" role="tablist" aria-label="Product details">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              className="ptabs__tab"
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="ptabs__icon" style={{ ['--icon' as string]: `url(${withBase(t.icon)})` }} aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((t) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={active !== t.id} className="ptabs__panel">
          {t.content}
        </div>
      ))}
    </div>
  )
}

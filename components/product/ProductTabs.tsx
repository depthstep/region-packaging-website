'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type TabItem = { id: string; label: string; icon?: ReactNode; content: ReactNode }

/** Arrow keys move between tabs, as screen-reader users expect. */
function useTabs(tabs: TabItem[], onSelect?: (id: string) => void) {
  const [active, setActive] = useState(tabs[0]?.id)
  function select(id: string) {
    setActive(id)
    onSelect?.(id)
  }
  function onKey(e: React.KeyboardEvent, i: number) {
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
    if (next === null) return
    e.preventDefault()
    const t = tabs[(next + tabs.length) % tabs.length]
    select(t.id)
    document.getElementById(`tab-${t.id}`)?.focus()
  }
  const button = (t: TabItem, i: number, className: string) => (
    <button
      key={t.id}
      id={`tab-${t.id}`}
      type="button"
      role="tab"
      aria-selected={active === t.id}
      aria-controls={`panel-${t.id}`}
      tabIndex={active === t.id ? 0 : -1}
      className={className}
      onClick={() => select(t.id)}
      onKeyDown={(e) => onKey(e, i)}
    >
      {t.icon}
      {t.label}
    </button>
  )
  return { active, setActive, button }
}

/**
 * The sticky tab bar on product pages (Overview, Specifications, Sustainability & Why Us, FAQ).
 * Every panel is in the page HTML, so search engines read them all; only the active one shows.
 * A link to #panel-specs, #panel-faq … opens that tab.
 */
export function ProductTabs({ tabs }: { tabs: TabItem[] }) {
  const bar = useRef<HTMLDivElement>(null)
  const { active, setActive, button } = useTabs(tabs, (id) => {
    history.replaceState(null, '', `#panel-${id}`)
    // Keep the tab bar in view when switching from far down a long panel.
    if (bar.current && bar.current.getBoundingClientRect().top < 0) bar.current.scrollIntoView({ block: 'start' })
  })

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#(panel-)?/, '')
      if (tabs.some((t) => t.id === id)) {
        setActive(id)
        bar.current?.scrollIntoView({ block: 'start' })
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [tabs, setActive])

  return (
    <>
      <div className="pdp-tabbar" id="tabs" ref={bar}>
        <div className="container">
          <div className="pdp-tabs__track" role="tablist" aria-label="Product details">
            {tabs.map((t, i) => button(t, i, 'pdp-tab'))}
          </div>
        </div>
      </div>
      {tabs.map((t) => (
        <div key={t.id} className="pdp-panel" role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id}>
          {t.content}
        </div>
      ))}
    </>
  )
}

/** The pill tabs inside the options section (Material, Printing, Finishes, Add-ons). */
export function OptionTabs({ tabs, label }: { tabs: TabItem[]; label: string }) {
  const { active, button } = useTabs(tabs)
  return (
    <>
      <div className="pill-row mp-tabs" role="tablist" aria-label={label}>
        {tabs.map((t, i) => button(t, i, 'pill mp-tab'))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} className="mp-panel" role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id}>
          {t.content}
        </div>
      ))}
    </>
  )
}

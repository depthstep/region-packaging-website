'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Img, Link as NavLink } from '@/lib/types'
import { withBase } from '@/lib/asset'
import { ButtonLink } from '@/components/ui/Button'
import { Chevron } from '@/components/ui/glyphs'
import { Icon } from '@/components/ui/Media'

export type MenuGroup = {
  label: string
  columns: { heading: string; href: string; items: { title: string; href: string; icon?: Img }[] }[]
}

type Props = { groups: MenuGroup[]; resources: NavLink[]; phone?: string; phoneHref: string }

/** The round blue menu button: four dots, turned 45° when the menu is open (the design's close state). */
function MenuDots({ open }: { open?: boolean }) {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" aria-hidden="true" className={`menu-dots ${open ? 'menu-dots--open' : ''}`}>
      <circle cx="18.5" cy="18.5" r="18.5" fill="var(--blue)" />
      <g className="menu-dots__dots" fill="var(--sky)">
        <circle cx="14.3" cy="14.3" r="1.83" />
        <circle cx="22.7" cy="14.3" r="1.83" />
        <circle cx="14.3" cy="22.7" r="1.83" />
        <circle cx="22.7" cy="22.7" r="1.83" />
      </g>
    </svg>
  )
}

/** Phone and tablet navigation: a menu button that opens a drawer from the right. */
export function MobileMenu({ groups, resources, phone, phoneHref }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close after navigating, on Escape, and stop the page behind from scrolling while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  return (
    <>
      <button type="button" className="menu-btn" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
        <MenuDots />
      </button>
      <div className={`drawer-overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div id="mobile-menu" className={`drawer ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="drawer__head">
          <p className="drawer__title">Menu</p>
          <button type="button" className="menu-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <MenuDots open />
          </button>
        </div>

        <nav aria-label="Mobile" className="drawer__nav">
          {groups.map((g) => (
            <details key={g.label} className="drawer__group">
              <summary>
                {g.label} <Chevron />
              </summary>
              {g.columns.map((c) => (
                <div key={c.href} className="drawer__col">
                  <p className="drawer__heading">
                    <Link href={c.href}>{c.heading}</Link>
                  </p>
                  <ul>
                    {c.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="drawer__link">
                          <Icon img={item.icon} size={36} label={item.title} />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </details>
          ))}
          {resources.length > 0 && (
            <details className="drawer__group">
              <summary>
                Resources <Chevron />
              </summary>
              <ul className="drawer__plain">
                {resources.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </nav>

        <ButtonLink href="/quote" variant="outline" className="drawer__quote">
          Get a Quote
        </ButtonLink>
        {phone && (
          <a href={phoneHref} className="phone drawer__phone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase('/icons/phone.svg')} alt="" width={22} height={22} />
            {phone}
          </a>
        )}
        <form action={withBase('/products')} role="search" className="search drawer__search">
          <label className="sr-only" htmlFor="mobile-search">
            Search products
          </label>
          <input id="mobile-search" name="q" type="search" placeholder="Search products..." />
          <button type="submit" aria-label="Search">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase('/icons/search.svg')} alt="" width={16} height={16} />
          </button>
        </form>
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { Chevron } from '@/components/ui/glyphs'

type Item = { label: string; href: string }

/**
 * A "View all" button that opens a short list instead of leaving the page:
 * categories under "Choose your box", articles under "Guides & ideas".
 * The last line always links to the full listing.
 */
export function ViewAllMenu({ label, items, all, className = '' }: { label: string; items: Item[]; all: Item; className?: string }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const outside = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        box.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div className={`viewall ${open ? 'is-open' : ''} ${className}`} ref={box}>
      <button type="button" className="btn btn--outline btn--sm viewall__button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {label} <Chevron dir="down" size={14} />
      </button>
      <ul className="viewall__menu" id={id} hidden={!open}>
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} onClick={() => setOpen(false)}>
              {i.label}
            </Link>
          </li>
        ))}
        <li className="viewall__all">
          <Link href={all.href} onClick={() => setOpen(false)}>
            {all.label} →
          </Link>
        </li>
      </ul>
    </div>
  )
}

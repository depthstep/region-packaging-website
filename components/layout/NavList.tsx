'use client'

import type { MouseEvent, ReactNode } from 'react'

/**
 * The menus open on hover or focus, and clicking a link leaves both true, so the open menu would
 * sit over the new page. Clicking a link hides it until the pointer has left that menu item.
 */
export function NavList({ children }: { children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement
    const item = target.closest<HTMLElement>('.nav__item')
    if (!item) return
    // Touch screens have no pointer to leave, so tapping the menu's button opens it again.
    if (!target.closest('a')) return item.classList.remove('is-dismissed')
    item.classList.add('is-dismissed')
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    item.addEventListener('mouseleave', () => item.classList.remove('is-dismissed'), { once: true })
  }
  return (
    <ul className="nav" onClick={onClick}>
      {children}
    </ul>
  )
}

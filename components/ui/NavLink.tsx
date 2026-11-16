import Link from 'next/link'
import type { ComponentProps } from 'react'

/**
 * A menu or footer link. Links to a spot on a page (like "/#how-it-works") are plain links, so the
 * browser always scrolls there smoothly, also when the visitor is already on that page.
 */
export function NavLink({ href, ...props }: Omit<ComponentProps<'a'>, 'href'> & { href: string }) {
  if (href.includes('#')) return <a href={href} {...props} />
  return <Link href={href} {...props} />
}

import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'sky' | 'light' | 'outline-light'
type Props = { href: string; variant?: Variant; size?: 'md' | 'sm'; children: ReactNode; className?: string }

export function ButtonLink({ href, variant = 'primary', size = 'md', children, className = '' }: Props) {
  return (
    <Link href={href} className={`btn btn--${variant} btn--${size} ${className}`}>
      {children}
    </Link>
  )
}

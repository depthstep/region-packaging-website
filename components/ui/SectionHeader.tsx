import type { ReactNode } from 'react'
import type { SectionHeading } from '@/lib/types'

type Props = SectionHeading & { align?: 'center' | 'left'; as?: 'h1' | 'h2'; aside?: ReactNode; className?: string }

/** Eyebrow + uppercase heading + subtext, used at the top of most sections. */
export function SectionHeader({ eyebrow, heading, text, align = 'center', as: H = 'h2', aside, className = '' }: Props) {
  if (!heading) return null
  return (
    <header className={`section-header section-header--${align} ${className}`}>
      <div className="section-header__copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <H>{heading}</H>
        {text && <p className="section-header__text">{text}</p>}
      </div>
      {aside}
    </header>
  )
}

export function Paragraphs({ items, className = 'prose' }: { items?: string[]; className?: string }) {
  if (!items?.length) return null
  return (
    <div className={className}>
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

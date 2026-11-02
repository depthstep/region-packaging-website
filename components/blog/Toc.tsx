'use client'

import { useEffect, useState } from 'react'

/** "Contents" box: links to the article's headings and highlights the one being read. */
export function Toc({ heading, items }: { heading: string; items: { id: string; text: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id)
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setCurrent(top.target.id)
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])
  if (!items.length) return null
  return (
    <nav className="post-toc" aria-label={heading}>
      <p className="post-toc__title">{heading}</p>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={current === i.id ? 'location' : undefined}>
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

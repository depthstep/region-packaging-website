// Small UI glyphs drawn inline so they pick up currentColor.
type P = { size?: number; className?: string }

export const ArrowRight = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowUpRight = ({ size = 20, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Chevron = ({ size = 12, className, dir = 'down' }: P & { dir?: 'down' | 'left' | 'right' }) => {
  const rotate = { down: 0, left: 90, right: -90 }[dir]
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const Plus = ({ size = 14, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const Minus = ({ size = 14, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const Star = ({ size = 16, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
    <path fill="var(--star)" d="m10 1.5 2.6 5.5 6 .8-4.4 4.1 1.1 6L10 15l-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
  </svg>
)

export const Stars = ({ count = 5, size = 16 }: { count?: number; size?: number }) => (
  <span className="stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} size={size} />
    ))}
  </span>
)

export const Check = ({ size = 18, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.2" />
    <path d="m5.5 9.2 2.3 2.3 4.7-4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Social = ({ name, size = 18 }: { name: string; size?: number }) => {
  const key = name.toLowerCase()
  if (key.includes('linkedin'))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.93 1.3-1.93 2.64V21h-4z" />
      </svg>
    )
  if (key === 'x' || key.includes('twitter'))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.2h1.7L7.4 4.73H5.58z" />
      </svg>
    )
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.95v2.25H8v3h2.5V21z" />
    </svg>
  )
}

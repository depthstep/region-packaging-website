'use client'

import { useField } from '@payloadcms/ui'
import type { CSSProperties } from 'react'
import type { Change } from '@/payload/activityLog'

const box: CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 4,
  padding: '10px 12px',
  marginTop: 6,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  lineHeight: 1.6,
}
const added: CSSProperties = { background: 'rgba(34, 197, 94, 0.35)' }
const removed: CSSProperties = { background: 'rgba(239, 68, 68, 0.35)', textDecoration: 'line-through' }
const skipped: CSSProperties = { color: 'var(--theme-elevation-500)', fontStyle: 'italic' }

/** Shows an activity entry's changes: green text was added, red struck-through text was removed. */
export function ActivityChanges({ path }: { path?: string }) {
  const { value } = useField<Change[] | string>({ path: path ?? 'changes' })
  const changes: Change[] = typeof value === 'string' ? JSON.parse(value) : (value ?? [])

  return (
    <div className="field-type" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 4 }}>What changed</h3>
      <p style={{ margin: '0 0 16px' }}>
        <span style={added}>Green</span> was added and <span style={removed}>red</span> was removed. Everything else stayed the same.
      </p>
      {!changes.length && <p>No field changes were recorded.</p>}
      {changes.map((c, i) => (
        <div key={i} style={{ marginBottom: 18 }}>
          <strong>{c.field}</strong>
          <div style={box}>
            {c.segments.map(([type, text], j) => (
              <span key={j} style={type === '+' ? added : type === '-' ? removed : type === '~' ? skipped : undefined}>
                {type === '~' ? ` [${text}] ` : text}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

import Link from 'next/link'
import type { UIFieldServerProps } from 'payload'
import { findMediaUsage } from '@/payload/adminLinks'

const muted = { color: 'var(--theme-elevation-500)' }

/** On a photo or file in Media: every page, product and setting that uses it, with a link to each. */
export async function MediaUsage({ id, payload, req }: UIFieldServerProps) {
  if (id === undefined || id === null || id === '') return null
  const uses = await findMediaUsage(payload, req, id)
  const live = uses.filter((u) => !u.draftOnly)
  const drafts = uses.filter((u) => u.draftOnly)

  return (
    <div className="field-type" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 4 }}>Used on</h3>
      {!uses.length && <p style={muted}>This file is not used on any page, product or setting.</p>}
      <UseList uses={live} />
      {drafts.length > 0 && (
        <>
          <p style={{ margin: '16px 0 4px', fontWeight: 600 }}>In saved drafts only (not on the website yet)</p>
          <UseList uses={drafts} />
        </>
      )}
    </div>
  )
}

function UseList({ uses }: { uses: { item: string; href: string; places: string[] }[] }) {
  if (!uses.length) return null
  return (
    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
      {uses.map((u) => (
        <li key={u.href} style={{ marginBottom: 8 }}>
          <Link href={u.href}>{u.item}</Link>
          {u.places.map((p) => (
            <div key={p} style={muted}>
              {p}
            </div>
          ))}
        </li>
      ))}
    </ul>
  )
}

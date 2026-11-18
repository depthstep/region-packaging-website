import Link from 'next/link'
import type { DefaultServerCellComponentProps, UIFieldServerProps } from 'payload'
import { logEntryTarget } from '@/payload/adminLinks'

/** On an Activity log entry: a link straight to the page, product, file or setting it is about. */
export async function OpenLogItem({ data, payload, req }: UIFieldServerProps) {
  const target = await logEntryTarget(payload, req, data ?? {})
  if (!target) return null
  return (
    <div className="field-type" style={{ marginBottom: 16 }}>
      {target.href ? (
        <Link href={target.href} className="btn btn--style-secondary btn--size-small" style={{ margin: 0 }}>
          Open this item
        </Link>
      ) : (
        <p style={{ color: 'var(--theme-elevation-500)', margin: 0 }}>{target.note}</p>
      )}
    </div>
  )
}

/** The same link as a column in the Activity log list. */
export async function OpenLogItemCell({ rowData, payload }: DefaultServerCellComponentProps) {
  const target = await logEntryTarget(payload, null, rowData ?? {})
  if (!target?.href) return target?.note ? <span style={{ color: 'var(--theme-elevation-500)' }}>Deleted</span> : null
  return <Link href={target.href}>Open</Link>
}

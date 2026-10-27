'use client'

import { useState } from 'react'

export function CopyCode({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="coupon__code">
      <span>{code}</span>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch {
            /* clipboard blocked: the code is visible to copy by hand */
          }
        }}
      >
        {copied ? 'Copied' : label}
      </button>
    </div>
  )
}

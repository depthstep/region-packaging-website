'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/** Redraws the preview each time the editor beside it autosaves. */
export function RefreshPreview() {
  const router = useRouter()
  const [origin, setOrigin] = useState('')
  useEffect(() => setOrigin(window.location.origin), [])
  return origin ? <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} /> : null
}

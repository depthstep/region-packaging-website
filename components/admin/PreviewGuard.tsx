'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Draft mode lasts for the browser session, so any normal page closes it: editors only see drafts in the preview panel. */
export function PreviewGuard() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/preview') return
    fetch('/api/preview/exit', { method: 'POST' }).then(() => window.location.reload())
  }, [pathname])
  return null
}

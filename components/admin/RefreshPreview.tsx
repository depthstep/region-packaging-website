'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const HOLD_MS = 2000

/** Redraws the preview each time the editor beside it autosaves, without losing the reader's place. */
export function RefreshPreview() {
  const router = useRouter()
  const [origin, setOrigin] = useState('')
  const holdUntil = useRef(0)

  // The page can change height as it redraws and photos load, so the position is held briefly
  // rather than set once. Scrolling by hand ends the hold straight away.
  const hold = (y: number) => {
    holdUntil.current = Date.now() + HOLD_MS
    const step = () => {
      if (Date.now() > holdUntil.current) return
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, behavior: 'instant' })
      requestAnimationFrame(step)
    }
    step()
  }

  useEffect(() => {
    setOrigin(window.location.origin)
    const key = `preview-scroll${window.location.search}`
    const read = () => {
      try {
        return Number(sessionStorage.getItem(key)) || 0
      } catch {
        return 0
      }
    }
    const save = () => {
      if (Date.now() < holdUntil.current) return
      try {
        sessionStorage.setItem(key, String(window.scrollY))
      } catch {
        // Storage can be blocked: the position just won't survive a reload.
      }
    }
    const release = () => {
      holdUntil.current = 0
    }
    window.history.scrollRestoration = 'manual'
    const saved = read()
    if (saved) hold(saved)
    window.addEventListener('scroll', save, { passive: true })
    for (const e of ['wheel', 'touchmove', 'keydown', 'mousedown']) window.addEventListener(e, release, { passive: true })
    return () => {
      window.removeEventListener('scroll', save)
      for (const e of ['wheel', 'touchmove', 'keydown', 'mousedown']) window.removeEventListener(e, release)
    }
  }, [])

  const refresh = () => {
    const y = window.scrollY
    router.refresh()
    hold(y)
  }

  return origin ? <RefreshRouteOnSave refresh={refresh} serverURL={origin} /> : null
}

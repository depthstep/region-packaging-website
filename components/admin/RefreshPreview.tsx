'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const HOLD_MS = 2000
const TEXT_TAGS = 'h1, h2, h3, h4, h5, p, li, td, th, dt, dd, summary, a, button, label, figcaption, span'

// Spaces are ignored because a heading split over two lines has none where the lines meet.
const clean = (s: string) => s.replace(/\s+/g, '').toLowerCase()

/** The smallest element holding this text. Long text is matched on its opening words, as it may still be changing. */
function findText(root: ParentNode, text: string) {
  const needle = clean(text).slice(0, 60)
  if (needle.length < 2) return null
  const hits = [...root.querySelectorAll<HTMLElement>(TEXT_TAGS)].filter((el) => clean(el.textContent ?? '').includes(needle))
  // Closed dropdown menus are in the page but out of sight. Closed tabs can be opened.
  const usable = hits.filter((el) => !el.closest('.mega, .dropdown, .drawer'))
  return usable.sort((a, b) => (a.textContent?.length ?? 0) - (b.textContent?.length ?? 0))[0] ?? null
}

/** The field's section, from its marker or else its headings, then the field's own text inside it. */
function locate(text: string, hints: string[], path: string[]) {
  let section: HTMLElement | null = null
  for (const part of path) {
    section = document.querySelector<HTMLElement>(`[data-section~="${CSS.escape(part)}"]`)
    if (section) break
  }
  for (const hint of section ? [] : hints) {
    const hit = hint.length >= 4 ? findText(document, hint) : null
    if (hit) {
      section = hit.closest('section') ?? hit
      break
    }
  }
  if (section) return (text && findText(section, text)) || section
  return text ? findText(document, text) : null
}

function reveal(el: HTMLElement) {
  const panel = el.closest<HTMLElement>('[role="tabpanel"][hidden]')
  if (panel) document.getElementById(panel.id.replace('panel-', 'tab-'))?.click()
  const details = el.closest('details')
  if (details) details.open = true
}

/** Highlights one element at a time. Each new highlight clears the last, so none can get stuck. */
let clearFlash: (() => void) | null = null
function flash(el: HTMLElement) {
  clearFlash?.()
  const { outline, outlineOffset, borderRadius } = el.style
  el.style.outline = '3px solid #8bb6ff'
  el.style.outlineOffset = '6px'
  el.style.borderRadius = '6px'
  el.dataset.previewFlash = ''
  const clear = () => {
    Object.assign(el.style, { outline, outlineOffset, borderRadius })
    delete el.dataset.previewFlash
    clearTimeout(timer)
    clearFlash = null
  }
  const timer = setTimeout(clear, 1400)
  clearFlash = clear
}

/** Redraws the preview on each autosave without losing the reader's place, and follows the field being edited. */
export function RefreshPreview() {
  const router = useRouter()
  const [origin, setOrigin] = useState('')
  const holdUntil = useRef(0)
  // Set while a field has nothing to show yet: a new section only exists after the next redraw.
  const waiting = useRef<{ text: string; hints: string[]; path: string[] } | null>(null)

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

  const follow = (text: string, hints: string[], path: string[]) => {
    const el = locate(text, hints, path)
    waiting.current = el ? null : { text, hints, path }
    if (!el) return
    holdUntil.current = 0
    reveal(el)
    // The tab needs a moment to open before there's anywhere to scroll to.
    requestAnimationFrame(() => {
      // Instant, as anything else moving on the page can interrupt a smooth scroll part way.
      el.scrollIntoView({ block: 'center', behavior: 'instant' })
      flash(el)
    })
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
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== 'rp-preview-follow') return
      const strings = (v: unknown) => (Array.isArray(v) ? v.map(String) : [])
      follow(String(e.data.text ?? ''), strings(e.data.hints), strings(e.data.path))
    }
    window.history.scrollRestoration = 'manual'
    const saved = read()
    if (saved) hold(saved)
    window.addEventListener('scroll', save, { passive: true })
    window.addEventListener('message', onMessage)
    for (const e of ['wheel', 'touchmove', 'keydown', 'mousedown']) window.addEventListener(e, release, { passive: true })
    return () => {
      window.removeEventListener('scroll', save)
      window.removeEventListener('message', onMessage)
      for (const e of ['wheel', 'touchmove', 'keydown', 'mousedown']) window.removeEventListener(e, release)
    }
    // follow and hold only touch refs, so the first render's copies stay correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refresh = () => {
    const y = window.scrollY
    router.refresh()
    hold(y)
    if (waiting.current) {
      const { text, hints, path } = waiting.current
      setTimeout(() => follow(text, hints, path), 1200)
    }
  }

  return origin ? <RefreshRouteOnSave refresh={refresh} serverURL={origin} /> : null
}

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
  // The phone menu copies the main one. Dropdown menus can be opened, but the page itself comes first.
  const usable = hits.filter((el) => !el.closest('.drawer'))
  const inMenu = (el: HTMLElement) => (el.closest('.mega, .dropdown') ? 1 : 0)
  return usable.sort((a, b) => inMenu(a) - inMenu(b) || (a.textContent?.length ?? 0) - (b.textContent?.length ?? 0))[0] ?? null
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
  if (section) return (text && (findText(section, text) || findText(document, text))) || section
  return text ? findText(document, text) : null
}

/** Site-wide fields show up on other pages, so the preview opens the page the field belongs to. */
function viewFor(path: string[]) {
  const type = new URLSearchParams(window.location.search).get('type')
  const [top, sub] = path
  if (type === 'blog-page') return top === 'post' ? 'post' : ''
  if (type !== 'site-settings') return ''
  if (top === 'pageIntros') return ({ products: 'products', faqs: 'faqs', howToOrder: 'how-to-order', quote: 'quote', sample: 'sample' } as Record<string, string>)[sub] ?? ''
  return ({ productDefaults: 'category', formDefaults: 'category', trustStrip: 'category', subProductDefaults: 'sub-product', contact: 'contact' } as Record<string, string>)[top] ?? ''
}

function reveal(el: HTMLElement) {
  document.querySelectorAll('.is-preview-open').forEach((m) => m.classList.remove('is-preview-open'))
  if (el.closest('.mega, .dropdown') || el.matches('.nav__item')) el.closest('.nav__item')?.classList.add('is-preview-open')
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

const onScreen = (el: HTMLElement) => {
  const b = el.getBoundingClientRect()
  return b.width > 0 && b.bottom > 0 && b.top < window.innerHeight
}

/** The one piece of text on the page that is exactly this field, so typing can change it straight away. */
function textOf(el: HTMLElement | null, text: string) {
  const node = el?.childNodes.length === 1 ? el.firstChild : null
  return node?.nodeType === Node.TEXT_NODE && clean(node.nodeValue ?? '') === clean(text) ? (node as Text) : null
}

type Target = { text: string; hints: string[]; path: string[] }

const NOTE_STYLE = {
  position: 'fixed',
  left: '50%',
  bottom: 24,
  transform: 'translateX(-50%)',
  zIndex: 1000,
  width: 'max-content',
  maxWidth: 'calc(100% - 32px)',
  padding: '12px 18px',
  borderRadius: 10,
  background: '#0b2a6b',
  color: '#fff',
  fontSize: 15,
  lineHeight: 1.4,
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
} as const

/** Redraws the preview on each autosave without losing the reader's place, and follows the field being edited. */
export function RefreshPreview() {
  const router = useRouter()
  const [origin, setOrigin] = useState('')
  const holdUntil = useRef(0)
  // Set while a field has nothing to show yet: a new section only exists after the next redraw.
  const waiting = useRef<Target | null>(null)
  // The text being typed into, changed straight away rather than after the autosave and redraw.
  const live = useRef<{ node: Text; text: string; at: number } | null>(null)
  const watcher = useRef<MutationObserver | null>(null)
  const opening = useRef<string | null>(null)
  const [note, setNote] = useState('')
  const noteTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const say = (text: string) => {
    setNote(text)
    clearTimeout(noteTimer.current)
    if (text) noteTimer.current = setTimeout(() => setNote(''), 6000)
  }

  const track = (node: Text | null, text: string) => {
    watcher.current?.disconnect()
    live.current = node ? { node, text, at: 0 } : null
    if (!node) return
    // A redraw can bring back an autosave from a few letters ago. Keep what was typed on screen.
    watcher.current = new MutationObserver(() => {
      const l = live.current
      if (l && Date.now() - l.at < 2500 && node.nodeValue !== l.text) node.nodeValue = l.text
    })
    watcher.current.observe(node, { characterData: true })
  }

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

  // The redraw has no finished signal, so look again a few times for what it should have brought in.
  const retry = () => {
    for (const ms of [800, 2000, 4000, 7000]) {
      setTimeout(() => {
        if (waiting.current) follow(waiting.current.text, waiting.current.hints, waiting.current.path)
      }, ms)
    }
  }

  const follow = (text: string, hints: string[], path: string[]) => {
    const view = viewFor(path)
    const url = new URL(window.location.href)
    if (view !== (url.searchParams.get('view') ?? '')) {
      waiting.current = { text, hints, path }
      // The address only changes once the new page arrives. Asking again meanwhile would pile up requests.
      if (opening.current === view) return
      opening.current = view
      setTimeout(() => {
        if (opening.current === view) opening.current = null
      }, 8000)
      track(null, '')
      say('')
      if (view) url.searchParams.set('view', view)
      else url.searchParams.delete('view')
      router.replace(url.pathname + url.search, { scroll: false })
      retry()
      return
    }
    opening.current = null
    const el = locate(text, hints, path)
    waiting.current = el ? null : { text, hints, path }
    track(textOf(el, text), text)
    say(el ? '' : "This doesn't appear on this page right now.")
    if (!el) return
    holdUntil.current = 0
    reveal(el)
    // The tab needs a moment to open before there's anywhere to scroll to.
    requestAnimationFrame(() => {
      // Instant, as anything else moving on the page can interrupt a smooth scroll part way.
      el.scrollIntoView({ block: 'center', behavior: 'instant' })
      flash(el)
      if (!onScreen(el)) say('This part of the page is hidden at this preview size. Change the size above the preview to Desktop to see it.')
    })
  }

  const type = (text: string, hints: string[], path: string[]) => {
    const l = live.current
    if (!l?.node.isConnected) {
      // Nothing on the page to change yet, so it's shown once the redraw brings it in.
      waiting.current = { text, hints, path }
      return
    }
    l.text = text
    l.at = Date.now()
    l.node.nodeValue = text
    const el = l.node.parentElement
    if (!el) return
    if (!onScreen(el)) {
      holdUntil.current = 0
      el.scrollIntoView({ block: 'center', behavior: 'instant' })
    }
    flash(el)
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
      if (e.origin !== window.location.origin) return
      const strings = (v: unknown) => (Array.isArray(v) ? v.map(String) : [])
      const args = [String(e.data?.text ?? ''), strings(e.data?.hints), strings(e.data?.path)] as const
      if (e.data?.type === 'rp-preview-type') return type(...args)
      if (e.data?.type !== 'rp-preview-follow') return
      if (!e.data.note) return follow(...args)
      waiting.current = null
      track(null, '')
      say(String(e.data.note))
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
    retry()
  }

  return (
    <>
      {origin && <RefreshRouteOnSave refresh={refresh} serverURL={origin} />}
      {note && (
        <div data-preview-note role="status" style={NOTE_STYLE}>
          {note}
        </div>
      )}
    </>
  )
}

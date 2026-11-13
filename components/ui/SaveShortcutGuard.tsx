'use client'

import { useEffect } from 'react'

/**
 * Ctrl + S / Cmd + S ("Save page"): every protected photo on the page switches to its
 * watermarked copy before the browser saves, so the saved page holds watermarked photos.
 * The clean photos come back when the save window closes (the page gets focus again), or
 * after a minute at the latest. Saving from the browser's own menu can't be detected.
 */
export function SaveShortcutGuard() {
  useEffect(() => {
    let swapped: { img: HTMLImageElement; src: string; srcset: string; sizes: string }[] = []
    let timer: number | undefined
    const restore = () => {
      for (const s of swapped) {
        s.img.srcset = s.srcset
        s.img.sizes = s.sizes
        s.img.src = s.src
      }
      swapped = []
      window.clearTimeout(timer)
      window.removeEventListener('focus', restore)
    }
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 's' || swapped.length) return
      document.querySelectorAll<HTMLImageElement>('img.media__guard[data-wm]').forEach((guard) => {
        const wm = guard.dataset.wm!
        guard.src = wm
        const shown = guard.parentElement?.querySelector<HTMLImageElement>('img:not(.media__guard)')
        if (!shown) return
        swapped.push({ img: shown, src: shown.getAttribute('src') ?? '', srcset: shown.getAttribute('srcset') ?? '', sizes: shown.getAttribute('sizes') ?? '' })
        shown.removeAttribute('srcset')
        shown.src = wm
      })
      // The save window takes focus; when it closes, the page gets focus back.
      window.setTimeout(() => window.addEventListener('focus', restore), 0)
      timer = window.setTimeout(restore, 60000)
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      restore()
    }
  }, [])
  return null
}

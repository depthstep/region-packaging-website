'use client'

import { useEffect, type ReactNode } from 'react'

const TITLES = ['heading', 'title', 'question', 'name', 'missionHeading', 'visionHeading', 'formHeading']

const valueOf = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value?.trim() ?? ''

/** What the field holds, then the headings around it, closest first. An empty field still finds its section. */
function clues(fieldId: string) {
  const parts = fieldId.replace(/^field-/, '').split('__')
  const hints: string[] = []
  for (let i = parts.length - 1; i >= 1; i--) {
    const prefix = parts.slice(0, i).join('__')
    for (const t of TITLES) {
      const v = valueOf(`field-${prefix}__${t}`)
      if (v && !hints.includes(v)) hints.push(v)
    }
  }
  return hints
}

/** Tells the preview beside the editor which part of the page was clicked into. */
export function PreviewFollow({ children }: { children: ReactNode }) {
  useEffect(() => {
    let last = { id: '', at: 0 }
    const send = (e: Event) => {
      const frame = document.querySelector('iframe')?.contentWindow
      const el = e.target as HTMLElement | null
      if (!frame || !el?.closest) return
      const editor = el.closest('[data-lexical-editor]')
      const field = el.closest<HTMLElement>('[id^="field-"]') ?? el.closest<HTMLElement>('.field-type')?.querySelector<HTMLElement>('[id^="field-"]')
      if (!field && !editor) return
      const text = editor
        ? (el.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote')?.textContent ?? '')
        : ((field as HTMLInputElement).value ?? '')
      // One click is both a focus and a click: only the first one counts.
      const now = Date.now()
      const id = field?.id ?? 'article'
      if (id === last.id && now - last.at < 400) return
      last = { id, at: now }
      const path = field ? field.id.replace(/^field-/, '').split('__') : []
      frame.postMessage({ type: 'rp-preview-follow', text: String(text).trim(), path, hints: field ? clues(field.id) : [] }, window.location.origin)
    }
    document.addEventListener('focusin', send)
    document.addEventListener('click', send)
    return () => {
      document.removeEventListener('focusin', send)
      document.removeEventListener('click', send)
    }
  }, [])
  return <>{children}</>
}

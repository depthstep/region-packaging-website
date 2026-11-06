'use client'

import { useEffect, type ReactNode } from 'react'

const TITLES = ['heading', 'title', 'question', 'name', 'missionHeading', 'visionHeading', 'formHeading']

/** Fields that never appear on the page itself. The preview says where they go instead of doing nothing. */
const ELSEWHERE: Record<string, string> = {
  seoTitle: 'This is the title Google shows in its results. It isn\'t shown on the page.',
  seoDescription: 'This is the description Google shows in its results. It isn\'t shown on the page.',
  cardText: 'This shows on the small card for this page, on category pages and in "Related products". It isn\'t on this page.',
  cardImage: 'This shows on the small card for this page, on category pages and in "Related products". It isn\'t on this page.',
  menuIcon: 'This shows in the website\'s menu at the top, when the menu is opened.',
  slug: 'This is the end of the page\'s web address. It isn\'t shown on the page.',
  order: 'This sets the position in lists. It isn\'t shown on the page.',
  status: 'This sets whether the page is on the website. It isn\'t shown on the page.',
  visible: 'This sets whether the page is on the website. It isn\'t shown on the page.',
  kind: 'This sets which menu the category sits under. It isn\'t shown on the page.',
  menuLabel: 'This shows in the website\'s menu at the top, when the menu is opened.',
  categories: 'This sets which category page lists this. It isn\'t shown on the page.',
}

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

/** What the preview needs to know about the field this event came from. */
function describe(el: HTMLElement) {
  const editor = el.closest('[data-lexical-editor]')
  const field = el.closest<HTMLElement>('[id^="field-"]') ?? el.closest<HTMLElement>('.field-type')?.querySelector<HTMLElement>('[id^="field-"]')
  if (!field && !editor) return null
  const text = editor ? (window.getSelection()?.anchorNode?.parentElement?.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote')?.textContent ?? el.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote')?.textContent ?? '') : ((field as HTMLInputElement).value ?? '')
  const path = field ? field.id.replace(/^field-/, '').split('__') : []
  return {
    id: field?.id ?? 'article',
    message: {
      text: String(text).trim(),
      path,
      hints: field ? clues(field.id) : [],
      note: path.length === 1 ? ELSEWHERE[path[0].split('-')[0]] : undefined,
    },
  }
}

/** Tells the preview beside the editor which field was clicked into, and what is being typed there. */
export function PreviewFollow({ children }: { children: ReactNode }) {
  useEffect(() => {
    let last = { id: '', at: 0 }
    const post = (type: string, message: object) => document.querySelector('iframe')?.contentWindow?.postMessage({ type, ...message }, window.location.origin)
    const follow = (e: Event) => {
      const el = e.target as HTMLElement | null
      const found = el?.closest ? describe(el) : null
      if (!found) return
      // One click is both a focus and a click: only the first one counts.
      const now = Date.now()
      if (found.id === last.id && now - last.at < 400) return
      last = { id: found.id, at: now }
      post('rp-preview-follow', found.message)
    }
    const typed = (e: Event) => {
      const el = e.target as HTMLElement | null
      // The article editor handles typing itself, so it only shows up as key presses.
      if (e.type === 'keyup' && !el?.closest?.('[data-lexical-editor]')) return
      const found = el?.closest ? describe(el) : null
      if (found && !found.message.note) post('rp-preview-type', found.message)
    }
    document.addEventListener('focusin', follow)
    document.addEventListener('click', follow)
    document.addEventListener('input', typed)
    document.addEventListener('keyup', typed)
    return () => {
      document.removeEventListener('focusin', follow)
      document.removeEventListener('click', follow)
      document.removeEventListener('input', typed)
      document.removeEventListener('keyup', typed)
    }
  }, [])
  return <>{children}</>
}

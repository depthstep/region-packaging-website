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
  topics: 'This sets which topic the article is filed under on the blog page.',
  href: 'This is where the link goes. The address itself isn\'t shown on the page.',
}

// Fields product pages don't show (category pages still do), by their place in the form.
const NOT_ON_PRODUCT_PAGES: Record<string, string> = {
  printing__eyebrow: "Product pages don't show this. The options section uses the Materials heading instead.",
  printing__heading: "Product pages don't show this. The options section uses the Materials heading instead.",
  printing__text: "Product pages don't show this. The options section uses the Materials heading instead.",
  printing__image: "Product pages don't show this photo. It is only used on category pages.",
  printing__methodsHeading: "Product pages don't show this. The Printing tab label is used instead.",
  printing__finishesHeading: "Product pages don't show this. The Finishes tab label is used instead.",
  benefits__items: "Product pages don't show the benefit cards, only the heading and paragraphs. They are used on category pages.",
  useCases__pills: "Product pages don't show these tags, only the heading and the text under them. They are used on category pages.",
  specs__stockSizesHeading: "Product pages don't show the sizes table. It is used on category pages.",
  specs__stockSizes: "Product pages don't show the sizes table. It is used on category pages.",
  highlights: "Product pages don't show these. They are used on category pages.",
  materials__items__badge: "Product pages don't show this tag. It is used on category pages.",
  tabs__materials: "Product pages don't use this tab any more. The options section has its own tabs below.",
}

/** The note for a field product pages leave out, when a product (or its defaults) is being edited. */
function productNote(path: string[]) {
  const onProduct = window.location.pathname.includes('/collections/products/') || path[0] === 'subProductDefaults'
  if (!onProduct) return undefined
  const key = path.filter((p) => !/^\d+$/.test(p)).join('__').replace(/^subProductDefaults__/, '')
  const hit = Object.keys(NOT_ON_PRODUCT_PAGES).find((k) => key === k || key.startsWith(k + '__'))
  return hit && NOT_ON_PRODUCT_PAGES[hit]
}

const BLOCKS = 'p, h1, h2, h3, h4, h5, h6, li, blockquote'

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
  const anchor = window.getSelection()?.anchorNode
  const caret = anchor instanceof Element ? anchor : anchor?.parentElement
  // The paragraph the cursor is in, which the click itself may not have landed on.
  const block = editor ? (el.closest(BLOCKS) ?? (editor.contains(caret ?? null) ? caret?.closest(BLOCKS) : null) ?? null) : null
  const text = editor ? (block?.textContent ?? '') : ((field as HTMLInputElement).value ?? '')
  const path = field ? field.id.replace(/^field-/, '').split('__') : ['body']
  return {
    id: field?.id ?? 'article',
    editor: !!editor,
    block,
    message: {
      text: String(text).trim(),
      path,
      hints: field ? clues(field.id) : [],
      note: productNote(path) ?? ELSEWHERE[path[path.length - 1]?.split('-')[0]],
    },
  }
}

/** Tells the preview beside the editor which field was clicked into, and what is being typed there. */
export function PreviewFollow({ children }: { children: ReactNode }) {
  useEffect(() => {
    let last = { id: '', at: 0 }
    let paragraph: Element | null = null
    const post = (type: string, message: object) => document.querySelector('iframe')?.contentWindow?.postMessage({ type, ...message }, window.location.origin)
    const follow = (e: Event) => {
      const el = e.target as HTMLElement | null
      const found = el?.closest ? describe(el) : null
      if (!found) return
      // The article editor gets focus before it knows which paragraph was clicked, so it waits for the click.
      if (found.editor && e.type === 'focusin') return
      // One click is both a focus and a click: only the first one counts.
      const now = Date.now()
      if (found.id === last.id && now - last.at < 400) return
      last = { id: found.id, at: now }
      paragraph = found.block
      post('rp-preview-follow', found.message)
    }
    const typed = (e: Event) => {
      const el = e.target as HTMLElement | null
      // The article editor handles typing itself, so it only shows up as key presses.
      if (e.type === 'keyup' && !el?.closest?.('[data-lexical-editor]')) return
      const found = el?.closest ? describe(el) : null
      if (!found || found.message.note) return
      // Arrow keys and Enter move to another paragraph. That's a move, and must not overwrite the last one.
      if (found.editor && found.block !== paragraph) {
        paragraph = found.block
        if (found.message.text) post('rp-preview-follow', found.message)
        return
      }
      post('rp-preview-type', found.message)
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

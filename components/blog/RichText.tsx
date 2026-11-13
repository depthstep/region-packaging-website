import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { withBase } from '@/lib/asset'
import type { Img, RichText as RichTextDoc, RichTextNode } from '@/lib/types'
import { isProtected } from '@/lib/watermarkUrls'
import { WatermarkGuard } from '@/components/ui/WatermarkGuard'

// Renders Payload rich text (Lexical JSON) as plain HTML. Covers what the editor offers for
// articles: headings, paragraphs, lists, quotes, links, bold/italic/underline and images.

const plain = (n: RichTextNode): string => (n.text ?? '') + (n.children ?? []).map(plain).join('')

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** h2/h3 headings with the ids the renderer gives them, for the "Contents" box. */
export function headingsOf(doc?: RichTextDoc) {
  return (doc?.root.children ?? []).filter((n) => n.type === 'heading' && (n.tag === 'h2' || n.tag === 'h3')).map((n) => ({ id: slugify(plain(n)), text: plain(n), level: n.tag }))
}

const FORMAT = { bold: 1, italic: 2, strike: 4, underline: 8, code: 16 }

function text(n: RichTextNode, key: number) {
  const f = typeof n.format === 'number' ? n.format : 0
  let out: ReactNode = n.text
  if (f & FORMAT.code) out = <code>{out}</code>
  if (f & FORMAT.strike) out = <s>{out}</s>
  if (f & FORMAT.underline) out = <u>{out}</u>
  if (f & FORMAT.italic) out = <em>{out}</em>
  if (f & FORMAT.bold) out = <strong>{out}</strong>
  return <span key={key}>{out}</span>
}

function linkHref(n: RichTextNode) {
  const f = n.fields ?? {}
  if (f.linkType === 'internal' && f.doc && typeof f.doc === 'object') {
    const d = (f.doc as { value?: { slug?: string } }).value
    return d?.slug ? `/blog/${d.slug}` : '#'
  }
  return f.url || '#'
}

function children(n: RichTextNode) {
  return (n.children ?? []).map(node)
}

function node(n: RichTextNode, key: number): ReactNode {
  switch (n.type) {
    case 'text':
      return text(n, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return n.children?.length ? <p key={key}>{children(n)}</p> : null
    case 'heading': {
      const Tag = (['h2', 'h3', 'h4'].includes(n.tag ?? '') ? n.tag : 'h2') as 'h2' | 'h3' | 'h4'
      return (
        <Tag key={key} id={slugify(plain(n))}>
          {children(n)}
        </Tag>
      )
    }
    case 'list':
      return n.listType === 'number' ? <ol key={key}>{children(n)}</ol> : <ul key={key}>{children(n)}</ul>
    case 'listitem':
      return <li key={key}>{children(n)}</li>
    case 'quote':
      return <blockquote key={key}>{children(n)}</blockquote>
    case 'link':
    case 'autolink': {
      const href = linkHref(n)
      const external = /^https?:\/\//.test(href)
      return external || href.startsWith('#') ? (
        <a key={key} href={href} {...(n.fields?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children(n)}
        </a>
      ) : (
        <Link key={key} href={href}>
          {children(n)}
        </Link>
      )
    }
    case 'upload': {
      const img = n.value as Img | undefined
      if (!img?.src) return null
      return (
        <figure key={key} className="rich-text__image">
          <Image src={withBase(img.src)} alt={img.alt} width={img.width ?? 1200} height={img.height ?? 900} sizes="(max-width: 900px) 100vw, 750px" />
          {isProtected(img.src) && <WatermarkGuard src={img.src} alt={img.alt} />}
        </figure>
      )
    }
    case 'horizontalrule':
      return <hr key={key} />
    default:
      return n.children ? <span key={key}>{children(n)}</span> : null
  }
}

export function RichText({ doc, className = '' }: { doc?: RichTextDoc; className?: string }) {
  if (!doc?.root.children?.length) return null
  return <div className={`rich-text ${className}`}>{doc.root.children.map(node)}</div>
}

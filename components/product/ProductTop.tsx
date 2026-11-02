import Link from 'next/link'
import type { Category, FormOptions, Img, SiteData } from '@/lib/types'
import { groupLabel } from '@/lib/data'
import { Check, Star } from '@/components/ui/glyphs'
import { Icon } from '@/components/ui/Media'
import { Gallery } from './Gallery'
import { QuoteForm } from './QuoteForm'

type Props = {
  data: SiteData
  title: string
  category: Category
  /** True on the category page itself (breadcrumb ends at the category). */
  isCategory: boolean
  ratingText?: string
  shortDescription?: string
  highlights: string[]
  gallery: Img[]
  options: FormOptions
  fields?: (keyof FormOptions)[]
  /** Industry sub-product pages use larger trust-strip icons. */
  trustIconSize?: number
}

/** Breadcrumb, sticky gallery + quote card, and the trust strip: the top of every product page. */
export function ProductTop({ data, title, category, isCategory, ratingText, shortDescription, highlights, gallery, options, fields, trustIconSize = 30 }: Props) {
  const { settings } = data
  const d = settings.productDefaults
  return (
    <>
      <section className="product-top">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">{groupLabel(category.kind)}</Link> /{' '}
            {isCategory ? (
              <span aria-current="page">{category.title}</span>
            ) : (
              <>
                <Link href={`/${category.slug}`}>{category.title}</Link> / <span aria-current="page">{title}</span>
              </>
            )}
          </nav>
          <div className="product-top__grid">
            <div className="product-top__gallery">
              <Gallery images={gallery} title={title} />
            </div>
            <div className="quote-card" id="quote">
              <h1>{title}</h1>
              {(ratingText || settings.google.score) && (
                <p className="quote-card__rating">
                  <Star size={16} /> {ratingText || `${settings.google.score} based (${settings.google.countText.replace(/\D+/g, '')} reviews)`}
                </p>
              )}
              {shortDescription && <p className="quote-card__desc">{shortDescription}</p>}
              {highlights.length > 0 && (
                <ul className="quote-card__checks">
                  {highlights.map((h) => (
                    <li key={h}>
                      <Check /> {h}
                    </li>
                  ))}
                </ul>
              )}
              <QuoteForm product={title} options={options} fields={fields} sampleLinkLabel={d.sampleLinkLabel} note={d.formNote} />
            </div>
          </div>
        </div>
      </section>

      {settings.trustStrip.length > 0 && (
        <section className="trust-strip">
          <ul className="container trust-strip__list">
            {settings.trustStrip.map((t) => (
              <li key={t.title}>
                <span className="trust-strip__icon">
                  <Icon img={t.icon} size={trustIconSize} label={t.title} />
                </span>
                {t.title}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

import Link from 'next/link'
import type { Card, Category, FormOptions, PageContent, Product, SiteData, TitleText } from '@/lib/types'
import { groupLabel, resolveRelated, toCard } from '@/lib/data'
import { FeatureCard, PhotoCard } from '@/components/ui/Cards'
import { Check, Star } from '@/components/ui/glyphs'
import { Icon, Media } from '@/components/ui/Media'
import { Paragraphs, SectionHeader } from '@/components/ui/SectionHeader'
import { CtaSection } from '@/components/sections/CtaSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { Gallery } from './Gallery'
import { QuoteForm } from './QuoteForm'
import { RelatedCarousel } from './RelatedCarousel'

type Props = {
  data: SiteData
  page: Category | Product
  category: Category
  /** Sub-products listed in "Explore styles" (category pages only). */
  explore: Product[]
  fallbackRelated: (Category | Product)[]
}

/** Page value, falling back to the generic default from Site settings for headings and card lists. */
function withDefaults<T extends { heading?: string; eyebrow?: string; text?: string }, K extends string>(
  own: (T & Partial<Record<K, TitleText[]>>) | undefined,
  def: (Partial<T> & Partial<Record<K, TitleText[]>>) | undefined,
  listKey: K,
) {
  const list = own?.[listKey]?.length ? own[listKey] : def?.[listKey]
  if (!list?.length) return undefined
  return { ...def, ...own, heading: own?.heading || def?.heading, eyebrow: own?.eyebrow || def?.eyebrow, text: own?.text || def?.text, [listKey]: list } as T &
    Record<K, TitleText[]>
}

function formOptions(page: PageContent, defaults: FormOptions): FormOptions {
  const own = page.formOptions ?? {}
  const pick = (k: keyof FormOptions) => (own[k]?.length ? own[k]! : defaults[k])
  return {
    material: pick('material'),
    size: pick('size'),
    printing: pick('printing'),
    productionSpeed: pick('productionSpeed'),
    quantity: pick('quantity'),
    design: pick('design'),
  }
}

export function ProductTemplate({ data, page, category, explore, fallbackRelated }: Props) {
  const { settings } = data
  const d = settings.productDefaults
  const isCategory = page.id === category.id
  const howToOrder = withDefaults(page.howToOrder, d.howToOrder, 'steps')
  const pricing = withDefaults(page.pricing, d.pricing, 'cards')
  const whyUs = withDefaults(page.whyUs, d.whyUs, 'cards')
  const faqs = page.faqs?.items?.length ? { ...d.faqs, ...page.faqs } : d.faqs
  const related = resolveRelated(data, page.relatedIds ?? [])
  const relatedCards: Card[] = (related.length ? related : fallbackRelated).map((r) => toCard(data, r, 'Explore Product'))

  return (
    <>
      {/* 1-2. Gallery + quote form */}
      <section className="product-top">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">{groupLabel(category.kind)}</Link> /{' '}
            {isCategory ? (
              <span aria-current="page">{category.title}</span>
            ) : (
              <>
                <Link href={`/${category.slug}`}>{category.title}</Link> / <span aria-current="page">{page.title}</span>
              </>
            )}
          </nav>
          <div className="product-top__grid">
            <div className="product-top__gallery">
              <Gallery images={page.gallery} title={page.title} />
            </div>
            <div className="quote-card" id="quote">
              <h1>{page.title}</h1>
              {(page.ratingText || settings.google.score) && (
                <p className="quote-card__rating">
                  <Star size={16} /> {page.ratingText || `${settings.google.score} based (${settings.google.countText.replace(/\D+/g, '')} reviews)`}
                </p>
              )}
              {page.shortDescription && <p className="quote-card__desc">{page.shortDescription}</p>}
              {page.highlights.length > 0 && (
                <ul className="quote-card__checks">
                  {page.highlights.map((h) => (
                    <li key={h}>
                      <Check /> {h}
                    </li>
                  ))}
                </ul>
              )}
              <QuoteForm product={page.title} options={formOptions(page, settings.formDefaults)} sampleLinkLabel={d.sampleLinkLabel} note={d.formNote} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust strip */}
      {settings.trustStrip.length > 0 && (
        <section className="trust-strip">
          <ul className="container trust-strip__list">
            {settings.trustStrip.map((t) => (
              <li key={t.title}>
                <span className="trust-strip__icon">
                  <Icon img={t.icon} size={30} label={t.title} />
                </span>
                {t.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. Explore styles (category pages list their sub-products) */}
      {explore.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow={page.explore?.eyebrow || d.exploreEyebrow}
              heading={page.explore?.heading || `Explore Our ${page.title} Styles & Options`}
              text={page.explore?.text}
            />
            <div className="grid-3 card-grid">
              {explore.map((p) => (
                <PhotoCard key={p.id} card={toCard(data, p, 'Customize Now')} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Overview */}
      {page.overview?.heading && (
        <section className="section section--beige">
          <div className="container overview">
            <div className="overview__images">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`rounded-media overview__img overview__img--${i}`}>
                  <Media img={page.overview!.images?.[i]} fallback={`Overview photo ${i + 1}`} sizes={i === 0 ? '590px' : '290px'} />
                </div>
              ))}
            </div>
            <div>
              <SectionHeader eyebrow={page.overview.eyebrow} heading={page.overview.heading} text={page.overview.text} align="left" className="section-header--tight" />
              <Paragraphs items={page.overview.body} className="prose prose--sm" />
            </div>
          </div>
        </section>
      )}

      {/* 6. Benefits */}
      {page.benefits?.heading && (
        <section className="section">
          <div className="container split quantity">
            <div>
              <SectionHeader eyebrow={page.benefits.eyebrow} heading={page.benefits.heading} text={page.benefits.text} align="left" />
              <Paragraphs items={page.benefits.body} className="prose prose--sm" />
            </div>
            {(page.benefits.items?.length ?? 0) > 0 && (
              <div className="grid-2">
                {page.benefits.items.map((b) => (
                  <FeatureCard key={b.title} item={b} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Specs + stock sizes */}
      {page.specs?.heading && (
        <section className="section section--rule" id="specs">
          <div className="container">
            <SectionHeader eyebrow={page.specs.eyebrow} heading={page.specs.heading} text={page.specs.text} />
            {(page.specs.rows?.length ?? 0) > 0 && (
              <dl className="spec-table">
                {page.specs.rows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {(page.specs.stockSizes?.length ?? 0) > 0 && (
              <>
                <h3 className="sizes__heading">{page.specs.stockSizesHeading || 'Popular Stock Sizes'}</h3>
                <div className="sizes">
                  <table>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Dimensions (in)</th>
                        <th>Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.specs.stockSizes.map((s) => (
                        <tr key={s.size}>
                          <td>{s.size}</td>
                          <td>{s.dimensions}</td>
                          <td>{s.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {page.specs.note && <p className="note">{page.specs.note}</p>}
          </div>
        </section>
      )}

      {/* 8. Materials */}
      {page.materials?.heading && (
        <section className="section section--beige" id="materials">
          <div className="container">
            <SectionHeader eyebrow={page.materials.eyebrow} heading={page.materials.heading} text={page.materials.text} />
            <div className="grid-3">
              {(page.materials.items ?? []).map((m) => (
                <div key={m.name} className="material">
                  <div className="material__image">
                    <Media img={m.image} fallback={`${m.name} photo`} sizes="380px" />
                    {m.badge && <span className="material__badge">{m.badge}</span>}
                  </div>
                  <h4>{m.name}</h4>
                  <p>{m.description}</p>
                </div>
              ))}
            </div>
            {page.materials.note && <p className="note">{page.materials.note}</p>}
          </div>
        </section>
      )}

      {/* 9. Printing & finishing */}
      {page.printing?.heading && (
        <section className={`section section--beige printing ${page.materials?.heading ? 'printing--joined' : ''}`}>
          <div className="container">
            <div className="split printing__top">
              <div>
                <SectionHeader eyebrow={page.printing.eyebrow} heading={page.printing.heading} align="left" className="section-header--tight" />
                <Paragraphs items={page.printing.body} className="prose prose--sm" />
              </div>
              <div className="rounded-media printing__image">
                <Media img={page.printing.image} fallback="Printing & finishing photo" sizes="600px" />
              </div>
            </div>
            <div className="split printing__lists">
              {[
                { title: page.printing.methodsHeading, items: page.printing.methods },
                { title: page.printing.finishesHeading, items: page.printing.finishes },
              ].map((col, i) =>
                col.items?.length ? (
                  <div key={i}>
                    {col.title && <h4 className="printing__list-title">{col.title}</h4>}
                    <ul className="dot-list dot-list--compact">
                      {col.items.map((m) => (
                        <li key={m.name}>
                          <h4>{m.name}</h4>
                          <p>{m.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* 10. Industries & use cases */}
      {page.useCases?.heading && (
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow={page.useCases.eyebrow} heading={page.useCases.heading} text={page.useCases.text} />
            <ul className="pill-row use-cases">
              {(page.useCases.pills ?? []).map((p) => (
                <li key={p} className="pill">
                  {p}
                </li>
              ))}
            </ul>
            {page.useCases.note && <p className="note">{page.useCases.note}</p>}
          </div>
        </section>
      )}

      {/* 11. How to order */}
      {howToOrder && (
        <section className="section section--rule">
          <div className="container">
            <SectionHeader eyebrow={howToOrder.eyebrow} heading={howToOrder.heading} text={howToOrder.text} />
            <ol className="order-steps">
              {howToOrder.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="order-steps__num">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            {page.howToOrder?.note && <p className="note">{page.howToOrder.note}</p>}
          </div>
        </section>
      )}

      {/* 12. Pricing */}
      {pricing && (
        <section className="pricing">
          {page.pricing?.image?.src && (
            <div className="pricing__bg" aria-hidden="true">
              <Media img={page.pricing.image} fallback="" sizes="100vw" />
            </div>
          )}
          <div className="container pricing__inner">
            <div>
              {pricing.eyebrow && <p className="pricing__eyebrow">{pricing.eyebrow}</p>}
              <h2>{pricing.heading}</h2>
              {pricing.text && <p className="pricing__lead">{pricing.text}</p>}
              <Paragraphs items={page.pricing?.body} className="prose prose--sm" />
            </div>
            <ul className="pricing__cards">
              {pricing.cards.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 13. Why choose us */}
      {whyUs && (
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow={whyUs.eyebrow} heading={whyUs.heading} text={whyUs.text} />
            <div className="grid-3 why-us">
              {whyUs.cards.map((c) => (
                <div key={c.title} className="why-us__card">
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            {page.whyUs?.note && <p className="note">{page.whyUs.note}</p>}
          </div>
        </section>
      )}

      {/* 14. Reviews */}
      <div className="section--rule">
        <ReviewsSection settings={settings} reviews={data.reviews} />
      </div>

      {/* 15. Related products */}
      {relatedCards.length > 0 && <RelatedCarousel heading={d.relatedHeading} cards={relatedCards} />}

      {/* 16-17. FAQ + CTA */}
      <FaqSection section={faqs} rule />
      <CtaSection cta={settings.cta} />
    </>
  )
}

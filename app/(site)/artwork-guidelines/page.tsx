import type { Metadata } from 'next'
import { Fragment } from 'react'
import { getSiteData } from '@/lib/data'
import { withBase } from '@/lib/asset'
import type { Img } from '@/lib/types'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { artwork } = await getSiteData()
  return { title: artwork.seoTitle ? { absolute: artwork.seoTitle } : 'Artwork Guidelines', description: artwork.seoDescription }
}

function CardIcon({ img }: { img?: Img }) {
  if (!img?.src) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={withBase(img.src)} alt={img.alt} className="art-card__icon" />
}

const Arrow = () => (
  <svg className="art-steps__arrow" width="72" height="12" viewBox="0 0 72 12" fill="none" aria-hidden="true">
    <path d="M0 6h70M65 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

export default async function ArtworkGuidelinesPage() {
  const { artwork: a, settings } = await getSiteData()
  return (
    <>
      <section className="art-hero">
        <div className="container art-hero__inner">
          <div className="art-hero__title">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase('/brand/art-hero-frame.svg')} alt="" className="art-hero__frame" />
            <h1>{a.hero.heading || 'Artwork guidelines'}</h1>
          </div>
          {a.hero.text && <p className="art-hero__text">{a.hero.text}</p>}
          {/* Shown as in the design; it only downloads once a guide PDF is uploaded in the admin. */}
          {a.hero.guide?.src ? (
            <a href={withBase(a.hero.guide.src)} className="btn btn--sky btn--md art-hero__btn" download>
              {a.hero.buttonLabel || 'Download the full guide'}
            </a>
          ) : (
            <button type="button" className="btn btn--sky btn--md art-hero__btn" aria-disabled="true">
              {a.hero.buttonLabel || 'Download the full guide'}
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase('/brand/art-dieline.svg')} alt="Flat dieline of a mailer box with the Region Packaging logo" className="art-hero__dieline" />
          {a.hero.dielineText && <p className="art-hero__text">{a.hero.dielineText}</p>}
        </div>
      </section>

      {a.formats.items.length > 0 && (
        <section className="section art-formats">
          <div className="container">
            <SectionHeader heading={a.formats.heading} text={a.formats.text} />
            <ul className="art-grid art-grid--5">
              {a.formats.items.map((f) => (
                <li key={f.title} className="art-card art-card--beige">
                  <CardIcon img={f.icon} />
                  <h3>{f.title}</h3>
                  {f.text && <p>{f.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {a.essentials.items.length > 0 && (
        <section className="section section--rule art-essentials">
          <div className="container">
            <SectionHeader heading={a.essentials.heading} text={a.essentials.text} />
            <ul className="art-grid art-grid--4">
              {a.essentials.items.map((e) => (
                <li key={e.title} className="art-card art-card--outline">
                  <div className="art-card__media">{e.icon?.src ? <CardIcon img={e.icon} /> : <span className="art-card__text-icon">{e.iconText}</span>}</div>
                  <h3>{e.title}</h3>
                  {e.text && <p>{e.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {a.steps.steps.length > 0 && (
        <section className="section section--rule art-steps">
          <div className="container">
            <SectionHeader heading={a.steps.heading} text={a.steps.text} />
            <ol className="art-steps__list">
              {a.steps.steps.map((s, i) => (
                <Fragment key={s.title}>
                  {i > 0 && <li className="art-steps__sep" aria-hidden="true"><Arrow /></li>}
                  <li className="art-steps__step">
                    <span className="art-steps__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.title}</h3>
                    {s.text && <p>{s.text}</p>}
                  </li>
                </Fragment>
              ))}
            </ol>
            {a.steps.note && <p className="art-steps__note">{a.steps.note}</p>}
          </div>
        </section>
      )}

      <CtaSection cta={settings.cta} />
    </>
  )
}

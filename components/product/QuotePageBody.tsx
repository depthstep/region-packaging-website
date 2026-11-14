'use client'

import { useSearchParams } from 'next/navigation'
import type { FormOptions, SiteSettings } from '@/lib/types'
import { QuoteForm } from './QuoteForm'

type Props = {
  choices: string[]
  options: FormOptions
  formNote?: string
  ctaText?: string
  sampleLinkLabel?: string
  intros: SiteSettings['pageIntros']
  page: SiteSettings['quotePage']
}

/** /quote reads ?type=sample and ?product= in the browser so the page itself stays static. */
export function QuotePageBody(props: Props) {
  const params = useSearchParams()
  return <QuoteBody {...props} type={params.get('type')} product={params.get('product') || undefined} />
}

/** Figma 787:248: heading and reasons on the left, the inquiry form on the right. */
export function QuoteBody({ choices, options, formNote, ctaText, sampleLinkLabel, intros, page, type, product }: Props & { type?: string | null; product?: string }) {
  const sample = type === 'sample'
  const intro = sample ? intros.sample : intros.quote
  return (
    <section data-section="intro pageIntros quotePage" className="quote-hero">
      <div className="container quote-hero__inner">
        <div className="quote-hero__copy">
          {page.eyebrow && <p className="eyebrow">{page.eyebrow}</p>}
          <h1>{intro?.heading || (sample ? 'Request Free Sample' : 'Get a Quote')}</h1>
          {(intro?.text || (sample ? formNote : ctaText)) && <p className="quote-hero__text">{intro?.text || (sample ? formNote : ctaText)}</p>}
          {page.points.length > 0 && (
            <ul className="quote-points">
              {page.points.map((p) => (
                <li key={p.title}>
                  <h2>{p.title}</h2>
                  {p.text && <p>{p.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="quote-card quote-hero__card">
          <p className="quote-form__heading quote-page__heading">Tell us about your packaging needs!</p>
          <QuoteForm
            productChoices={product ? undefined : choices}
            product={product}
            options={options}
            note={formNote}
            sampleLinkLabel={sample ? undefined : sampleLinkLabel}
            defaultMessage={sample ? 'I would like to request a free sample pack.' : undefined}
          />
        </div>
      </div>
    </section>
  )
}

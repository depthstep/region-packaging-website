'use client'

import { useSearchParams } from 'next/navigation'
import type { FormOptions, SiteSettings } from '@/lib/types'
import { PageIntro } from '@/components/layout/PageIntro'
import { QuoteForm } from './QuoteForm'

type Props = { choices: string[]; options: FormOptions; formNote?: string; ctaText?: string; intros: SiteSettings['pageIntros'] }

/** /quote reads ?type=sample and ?product= in the browser so the page itself stays static. */
export function QuotePageBody(props: Props) {
  const params = useSearchParams()
  return <QuoteBody {...props} type={params.get('type')} product={params.get('product') || undefined} />
}

export function QuoteBody({ choices, options, formNote, ctaText, intros, type, product }: Props & { type?: string | null; product?: string }) {
  const sample = type === 'sample'
  const intro = sample ? intros.sample : intros.quote
  return (
    <>
      <PageIntro title={intro?.heading || (sample ? 'Request Free Sample' : 'Get a Quote')} text={intro?.text || (sample ? formNote : ctaText)} />
      <section className="section section--tight">
        <div className="container quote-page">
          <div className="quote-card">
            <p className="quote-form__heading quote-page__heading">Tell us about your packaging needs!</p>
            <QuoteForm
              productChoices={product ? undefined : choices}
              product={product}
              options={options}
              note={formNote}
              defaultMessage={sample ? 'I would like to request a free sample pack.' : undefined}
            />
          </div>
        </div>
      </section>
    </>
  )
}

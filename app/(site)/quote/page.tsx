import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { QuoteForm } from '@/components/product/QuoteForm'

export const metadata: Metadata = { title: 'Get a Quote' }

type Props = { searchParams: Promise<{ type?: string; product?: string }> }

export default async function QuotePage({ searchParams }: Props) {
  const { type, product } = await searchParams
  const data = await getSiteData()
  const { settings } = data
  const sample = type === 'sample'
  const choices = [...data.categories.map((c) => c.title), ...data.products.map((p) => p.title)]
  return (
    <>
      <PageIntro
        title={sample ? 'Request Free Sample' : 'Get a Quote'}
        text={sample ? settings.productDefaults.formNote : settings.cta.text}
      />
      <section className="section section--tight">
        <div className="container quote-page">
          <div className="quote-card">
            <p className="quote-form__heading quote-page__heading">Tell us about your packaging needs!</p>
            <QuoteForm
              productChoices={product ? undefined : choices}
              product={product}
              options={settings.formDefaults}
              note={settings.productDefaults.formNote}
              defaultMessage={sample ? 'I would like to request a free sample pack.' : undefined}
            />
          </div>
        </div>
      </section>
    </>
  )
}

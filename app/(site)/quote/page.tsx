import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSiteData, introMetadata } from '@/lib/data'
import { QuoteBody, QuotePageBody } from '@/components/product/QuotePageBody'

export async function generateMetadata(): Promise<Metadata> {
  return introMetadata((await getSiteData()).settings.pageIntros.quote, 'Get a Quote')
}

export default async function QuotePage() {
  const data = await getSiteData()
  const { settings } = data
  const props = {
    choices: [...data.categories.map((c) => c.title), ...data.products.map((p) => p.title)],
    options: settings.formDefaults,
    formNote: settings.productDefaults.formNote,
    ctaText: settings.cta.text,
    intros: settings.pageIntros,
  }
  return (
    <Suspense fallback={<QuoteBody {...props} />}>
      <QuotePageBody {...props} />
    </Suspense>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSiteData } from '@/lib/data'
import { QuoteBody, QuotePageBody } from '@/components/product/QuotePageBody'

export const metadata: Metadata = { title: 'Get a Quote' }

export default async function QuotePage() {
  const data = await getSiteData()
  const { settings } = data
  const props = {
    choices: [...data.categories.map((c) => c.title), ...data.products.map((p) => p.title)],
    options: settings.formDefaults,
    formNote: settings.productDefaults.formNote,
    ctaText: settings.cta.text,
  }
  return (
    <Suspense fallback={<QuoteBody {...props} />}>
      <QuotePageBody {...props} />
    </Suspense>
  )
}

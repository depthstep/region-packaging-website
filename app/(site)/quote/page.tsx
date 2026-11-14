import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSiteData, introMetadata } from '@/lib/data'
import { QuoteBody, QuotePageBody } from '@/components/product/QuotePageBody'
import { quoteProps } from '@/components/product/quoteProps'

export async function generateMetadata(): Promise<Metadata> {
  return introMetadata((await getSiteData()).settings.pageIntros.quote, 'Get a Quote')
}

export default async function QuotePage() {
  const props = quoteProps(await getSiteData())
  return (
    <Suspense fallback={<QuoteBody {...props} />}>
      <QuotePageBody {...props} />
    </Suspense>
  )
}

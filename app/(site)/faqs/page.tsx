import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { FaqList } from '@/components/sections/FaqSection'

export const revalidate = 3600
export const metadata: Metadata = { title: 'FAQs' }

export default async function FaqsPage() {
  const { home, settings } = await getSiteData()
  const faqs = home.faq.items.length ? home.faq : settings.productDefaults.faqs
  return (
    <>
      <PageIntro title={faqs?.heading || 'FAQs'} crumb="FAQs" />
      <section className="section section--tight">
        <div className="container narrow">
          <FaqList items={faqs?.items ?? []} />
        </div>
      </section>
    </>
  )
}

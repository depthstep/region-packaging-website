import type { Metadata } from 'next'
import { getSiteData, introMetadata } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { FaqList } from '@/components/sections/FaqSection'

export const revalidate = 3600
export async function generateMetadata(): Promise<Metadata> {
  return introMetadata((await getSiteData()).settings.pageIntros.faqs, 'FAQs')
}

export default async function FaqsPage() {
  const { home, settings } = await getSiteData()
  const intro = settings.pageIntros.faqs
  const faqs = home.faq.items.length ? home.faq : settings.productDefaults.faqs
  return (
    <>
      <PageIntro title={intro?.heading || faqs?.heading || 'FAQs'} text={intro?.text} crumb="FAQs" />
      <section className="section section--tight">
        <div className="container narrow">
          <FaqList items={faqs?.items ?? []} />
        </div>
      </section>
    </>
  )
}

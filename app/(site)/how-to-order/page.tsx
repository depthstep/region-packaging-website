import type { Metadata } from 'next'
import { getSiteData, introMetadata } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { Steps } from '@/components/home/HomeSections'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600
export async function generateMetadata(): Promise<Metadata> {
  return introMetadata((await getSiteData()).settings.pageIntros.howToOrder, 'How To Order')
}

export default async function HowToOrderPage() {
  const { home, settings } = await getSiteData()
  return (
    <>
      <PageIntro title={settings.pageIntros.howToOrder?.heading || 'How To Order'} text={settings.pageIntros.howToOrder?.text} />
      <Steps s={home.steps} />
      <CtaSection cta={settings.cta} />
    </>
  )
}

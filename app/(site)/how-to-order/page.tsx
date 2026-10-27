import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { Steps } from '@/components/home/HomeSections'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600
export const metadata: Metadata = { title: 'How To Order' }

export default async function HowToOrderPage() {
  const { home, settings } = await getSiteData()
  return (
    <>
      <PageIntro title="How To Order" />
      <Steps s={home.steps} />
      <CtaSection cta={settings.cta} />
    </>
  )
}

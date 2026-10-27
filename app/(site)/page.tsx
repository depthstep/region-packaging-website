import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { CtaSection } from '@/components/sections/CtaSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import {
  AnyQuantity,
  BlogTeasers,
  ChooseBox,
  DesignForYou,
  Eco,
  Hero,
  Industries,
  SamplePack,
  Steps,
  TrustedBy,
  WithYourLogo,
} from '@/components/home/HomeSections'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getSiteData()
  return { title: { absolute: home.seoTitle || 'Region Packaging' }, description: home.seoDescription }
}

export default async function HomePage() {
  const data = await getSiteData()
  const { home, settings } = data
  return (
    <>
      <Hero hero={home.hero} stats={settings.stats} />
      <TrustedBy settings={settings} />
      <ChooseBox s={home.chooseBox} />
      <Steps s={home.steps} />
      <Industries s={home.industries} data={data} />
      <AnyQuantity s={home.quantity} />
      <DesignForYou s={home.design} />
      <Eco s={home.eco} />
      <WithYourLogo s={home.logo} />
      <ReviewsSection settings={settings} reviews={data.reviews} />
      <SamplePack s={home.sample} />
      <FaqSection section={home.faq} />
      <BlogTeasers s={home.blog} data={data} />
      <CtaSection cta={settings.cta} />
    </>
  )
}

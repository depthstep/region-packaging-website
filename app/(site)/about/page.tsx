import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteData } from '@/lib/data'
import { withBase } from '@/lib/asset'
import type { Img } from '@/lib/types'
import { ButtonLink } from '@/components/ui/Button'
import { Media } from '@/components/ui/Media'
import { Paragraphs, SectionHeader } from '@/components/ui/SectionHeader'
import { BlogTeasers, ChooseBox } from '@/components/home/HomeSections'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getSiteData()
  return { title: about.seoTitle ? { absolute: about.seoTitle } : 'About Us', description: about.seoDescription }
}

/** Icons keep their own proportions (they are not square), so no fixed width/height here. */
function AboutIcon({ img }: { img?: Img }) {
  if (!img?.src) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={withBase(img.src)} alt={img.alt} className="about-icon" />
}

export default async function AboutPage() {
  const data = await getSiteData()
  const { about, home, settings } = data
  const { hero, mission: m, whoWeAre: w, values } = about
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__inner">
          <nav className="breadcrumb about-hero__crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <span aria-current="page">About Us</span>
          </nav>
          <div className="about-hero__copy">
            <h1>{hero.heading || 'About Us'}</h1>
            {hero.text && <p>{hero.text}</p>}
            {hero.button?.label && <ButtonLink href={hero.button.href}>{hero.button.label}</ButtonLink>}
          </div>
          <div className="about-hero__photos">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`about-hero__photo about-hero__photo--${i + 1}`}>
                <Media img={hero.photos[i]} fallback={`Hero photo ${i + 1}`} sizes="(max-width: 900px) 50vw, 290px" priority={i === 0} />
              </div>
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase('/brand/badge-delivery.svg')} alt="" className="about-hero__badge" width={154} height={154} />
          </div>
        </div>
      </section>

      {(m.missionHeading || m.visionHeading) && (
        <section className="section about-mv">
          <div className="container about-mv__grid">
            <div className="about-mv__card">
              <AboutIcon img={m.missionIcon} />
              <h2>{m.missionHeading}</h2>
              {m.missionText && <p>{m.missionText}</p>}
            </div>
            <div className="about-mv__photo">
              <Media img={m.photo} fallback="Factory photo" sizes="(max-width: 900px) 100vw, 420px" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/brand/logo-mark-white.svg')} alt="" className="about-mv__mark" width={99} height={109} />
            </div>
            <div className="about-mv__card">
              <AboutIcon img={m.visionIcon} />
              <h2>{m.visionHeading}</h2>
              {m.visionText && <p>{m.visionText}</p>}
            </div>
          </div>
        </section>
      )}

      {w.heading && (
        <section className="section section--rule about-who">
          <div className="container">
            <div className="about-who__grid">
              <div>
                <SectionHeader eyebrow={w.eyebrow} heading={w.heading} align="left" className="about-who__header" />
                <Paragraphs items={w.body} className="prose about-who__body" />
              </div>
              <div className="about-who__photo">
                <Media img={w.image} fallback="Who we are photo" sizes="(max-width: 900px) 100vw, 590px" />
              </div>
            </div>
            {w.stats.length > 0 && (
              <ul className="about-stats">
                {w.stats.map((s) => (
                  <li key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <div className="about-products">
        <ChooseBox s={{ ...home.chooseBox, ...about.products }} />
      </div>

      {values.items.length > 0 && (
        <section className="section section--beige about-values">
          <div className="container">
            <SectionHeader eyebrow={values.eyebrow} heading={values.heading} text={values.text} />
            <ul className="about-values__grid">
              {values.items.map((v) => (
                <li key={v.title}>
                  <div className="about-values__icon">
                    <AboutIcon img={v.icon} />
                  </div>
                  <h3>{v.title}</h3>
                  {v.text && <p>{v.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BlogTeasers s={home.blog} data={data} rule={false} />
      <CtaSection cta={settings.cta} />
    </>
  )
}

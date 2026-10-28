import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { withBase } from '@/lib/asset'
import { telHref } from '@/components/layout/Header'
import { Media } from '@/components/ui/Media'
import { ButtonLink } from '@/components/ui/Button'
import { ContactForm } from '@/components/contact/ContactForm'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Questions about a box, an order or artwork? Call, email or send Region Packaging a message.',
}

export default async function ContactPage() {
  const { settings } = await getSiteData()
  const c = settings.contact
  return (
    <>
      <section className="contact-hero">
        <Media img={c.image} fallback="Contact banner photo" sizes="100vw" className="contact-hero__media" priority />
        <div className="container contact-hero__copy">
          <h1>{c.heading || 'Contact Us'}</h1>
          {c.text && <p>{c.text}</p>}
        </div>
      </section>

      <section className="contact">
        <div className="container contact__grid">
          <div className="contact__info">
            {settings.phone && (
              <div className="contact__item">
                <h2>{c.callLabel || 'Call Us'}</h2>
                <a href={telHref(settings.phone)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase('/icons/phone.svg')} alt="" width={24} height={24} />
                  {settings.phone}
                </a>
              </div>
            )}
            {settings.email && (
              <div className="contact__item">
                <h2>{c.emailLabel || 'Email us'}</h2>
                <a href={`mailto:${settings.email}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase('/icons/mail.svg')} alt="" width={24} height={24} />
                  {settings.email}
                </a>
              </div>
            )}
            {c.card?.heading && (
              <div className="contact__card">
                <h2>{c.card.heading}</h2>
                {c.card.text && <p>{c.card.text}</p>}
                {c.card.button?.label && (
                  <ButtonLink href={c.card.button.href} variant="sky" size="sm">
                    {c.card.button.label}
                  </ButtonLink>
                )}
              </div>
            )}
          </div>

          <div className="contact__form">
            <h2>{c.formHeading || 'Send us a message'}</h2>
            {c.formText && <p className="contact__form-text">{c.formText}</p>}
            <ContactForm topics={c.topics} buttonLabel={c.buttonLabel} />
          </div>
        </div>
      </section>
    </>
  )
}

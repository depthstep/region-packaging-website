import Image from 'next/image'
import { withBase } from '@/lib/asset'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'
import { Social } from '@/components/ui/glyphs'
import { telHref } from './Header'

export function Footer({ settings }: { settings: SiteSettings }) {
  const f = settings.footer
  return (
    <footer className="site-footer">
      <div className="container footer__top">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase('/brand/logo.svg')} alt="Region Packaging" width={157} height={52} className="footer__logo" />
          {f.blurb && <p>{f.blurb}</p>}
          {settings.phone && (
            <a href={telHref(settings.phone)} className="footer__contact">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/icons/phone-white.svg')} alt="" width={20} height={20} />
              {settings.phone}
            </a>
          )}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="footer__contact">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/icons/mail-white.svg')} alt="" width={20} height={20} />
              {settings.email}
            </a>
          )}
        </div>
        {f.columns.map((col) => (
          <div key={col.title} className="footer__col">
            <p className="footer__heading">{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer__newsletter">
          <p className="footer__heading">{f.newsletterTitle}</p>
          <p>{f.newsletterText}</p>
          {/* Newsletter sign-up is not connected to an email service yet. */}
          <form className="newsletter" aria-label="Newsletter (not active yet)">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input id="newsletter-email" type="email" placeholder={f.newsletterPlaceholder} disabled title="Not active yet" />
            <button type="button" className="btn btn--sky btn--sm" aria-disabled="true" title="Not active yet">
              {f.newsletterButton}
            </button>
          </form>
        </div>
      </div>
      <div className="footer__rule" />
      <div className="container footer__middle">
        <div>
          <p className="footer__heading">{f.followLabel}</p>
          <ul className="socials">
            {settings.socials.map((s) => (
              <li key={s.label}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <Social name={s.label} />
                  </a>
                ) : (
                  <span aria-label={`${s.label} (link not set)`} title="Add the link in Site settings">
                    <Social name={s.label} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {f.paymentLogos?.src && (
          <div>
            <p className="footer__heading">{f.paymentsLabel}</p>
            <Image src={withBase(f.paymentLogos.src)} alt={f.paymentLogos.alt} width={244} height={30} className="footer__payments" />
          </div>
        )}
      </div>
      <div className="footer__rule" />
      <div className="container footer__bottom">
        <p>{f.copyright}</p>
        <ul>
          {f.legal.map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

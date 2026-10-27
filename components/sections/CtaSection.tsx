import type { SiteSettings } from '@/lib/types'
import { ButtonLink } from '@/components/ui/Button'
import { CopyCode } from './CopyCode'

export function CtaSection({ cta }: { cta: SiteSettings['cta'] }) {
  if (!cta.heading) return null
  return (
    <section className="section section--beige cta">
      <div className="container cta__inner">
        <div className="cta__copy">
          <h2>{cta.heading}</h2>
          {cta.text && <p>{cta.text}</p>}
          <div className="button-row">
            {cta.primary && <ButtonLink href={cta.primary.href}>{cta.primary.label}</ButtonLink>}
            {cta.secondary && (
              <ButtonLink href={cta.secondary.href} variant="outline">
                {cta.secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
        {cta.coupon && (
          <div className="coupon-wrap">
            <div className="coupon">
              <p className="coupon__amount">{cta.coupon.amount}</p>
              <p className="coupon__label">{cta.coupon.label}</p>
              <CopyCode code={cta.coupon.code} label={cta.coupon.buttonLabel} />
            </div>
            <p className="coupon__note">{cta.coupon.note}</p>
          </div>
        )}
      </div>
    </section>
  )
}

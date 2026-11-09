import type { SiteSettings } from '@/lib/types'
import { ButtonLink } from '@/components/ui/Button'

export function CtaSection({ cta }: { cta: SiteSettings['cta'] }) {
  if (!cta.heading) return null
  return (
    <section data-section="cta" className="section section--beige cta">
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
      </div>
    </section>
  )
}

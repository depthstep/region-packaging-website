import type { SiteData } from '@/lib/types'

/** What the /quote page (and its admin preview) passes to QuoteBody. */
export function quoteProps({ settings }: SiteData) {
  return {
    formNote: settings.productDefaults.formNote,
    ctaText: settings.cta.text,
    sampleLinkLabel: settings.productDefaults.sampleLinkLabel,
    intros: settings.pageIntros,
    page: settings.quotePage,
  }
}

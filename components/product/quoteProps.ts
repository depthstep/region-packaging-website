import type { SiteData } from '@/lib/types'

/** What the /quote page (and its admin preview) passes to QuoteBody. */
export function quoteProps({ categories, products, settings }: SiteData) {
  return {
    choices: [...categories.map((c) => c.title), ...products.map((p) => p.title)],
    options: settings.formDefaults,
    formNote: settings.productDefaults.formNote,
    ctaText: settings.cta.text,
    sampleLinkLabel: settings.productDefaults.sampleLinkLabel,
    intros: settings.pageIntros,
    page: settings.quotePage,
  }
}

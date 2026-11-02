import type { Category, PageContent, Product, SectionHeading, SiteData } from '@/lib/types'
import { FeatureCard } from '@/components/ui/Cards'
import { Media } from '@/components/ui/Media'
import { Paragraphs, SectionHeader } from '@/components/ui/SectionHeader'
import { SamplePack } from '@/components/home/HomeSections'
import { CtaSection } from '@/components/sections/CtaSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ProductTabs } from './ProductTabs'
import { ProductTop } from './ProductTop'
import { formOptions } from './ProductTemplate'

// Industry sub-product pages (e.g. /custom-cosmetic-boxes/cream-boxes), from the Figma
// "Sub-Products Pages" design: the shared top, then the details in five tabs.
// Each section uses the product's own content, or Site settings > Sub-product pages when empty.

const FIELDS = ['style', 'size', 'finish', 'productionSpeed', 'quantity', 'design'] as const

/** The product's section if it has a heading, else the default, with {product} filled in. */
function pick<T extends SectionHeading>(own: T | undefined, def: T | undefined, product: string): T | undefined {
  const s = own?.heading ? own : def
  if (!s?.heading) return undefined
  const fill = (v?: string) => v?.replace(/\{product\}/gi, product)
  return { ...s, heading: fill(s.heading), text: fill(s.text) }
}

export function SubProductTemplate({ data, page, category }: { data: SiteData; page: Product; category: Category }) {
  const { settings, home } = data
  const def = settings.subProductDefaults
  const name = page.title
  const s: Partial<PageContent> = {
    overview: pick(page.overview, def.overview, name),
    benefits: pick(page.benefits, def.benefits, name),
    useCases: pick(page.useCases, def.useCases, name),
    specs: pick(page.specs, def.specs, name),
    materials: pick(page.materials, def.materials, name),
    printing: pick(page.printing, def.printing, name),
    whyUs: pick(page.whyUs?.cards?.length ? page.whyUs : undefined, def.whyUs, name),
  }
  const faqs = page.faqs?.items?.length ? { ...settings.productDefaults.faqs, ...page.faqs } : settings.productDefaults.faqs
  const label = def.tabs ?? {}

  const overview = (
    <>
      {s.overview && (
        <section className="section sub-sec">
          <div className="container split sub-overview">
            <div>
              <SectionHeader eyebrow={s.overview.eyebrow} heading={s.overview.heading} text={s.overview.text} align="left" className="section-header--tight" />
              <Paragraphs items={s.overview.body} className="prose prose--sm" />
            </div>
            <div className="rounded-media sub-overview__image">
              <Media img={s.overview.images?.[0]} fallback="Overview photo" sizes="(max-width: 900px) 100vw, 585px" />
            </div>
          </div>
        </section>
      )}
      {s.benefits && (
        <section className="section section--rule sub-sec">
          <div className="container split sub-benefits">
            <div>
              <SectionHeader eyebrow={s.benefits.eyebrow} heading={s.benefits.heading} text={s.benefits.text} align="left" />
              <Paragraphs items={s.benefits.body} className="prose prose--sm" />
            </div>
            {(s.benefits.items?.length ?? 0) > 0 && (
              <div className="grid-2 sub-benefits__cards">
                {s.benefits.items.map((b) => (
                  <FeatureCard key={b.title} item={b} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {s.useCases && (
        <section className="section section--rule sub-sec">
          <div className="container">
            <SectionHeader eyebrow={s.useCases.eyebrow} heading={s.useCases.heading} text={s.useCases.text} />
            <ul className="pill-row use-cases">
              {(s.useCases.pills ?? []).map((p) => (
                <li key={p} className="pill">
                  {p}
                </li>
              ))}
            </ul>
            {s.useCases.note && <p className="note">{s.useCases.note}</p>}
          </div>
        </section>
      )}
    </>
  )

  const specs = s.specs && (
    <section className="section sub-sec">
      <div className="container">
        <SectionHeader eyebrow={s.specs.eyebrow} heading={s.specs.heading} text={s.specs.text} />
        {(s.specs.rows?.length ?? 0) > 0 && (
          <dl className="spec-table">
            {s.specs.rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {s.specs.note && <p className="note">{s.specs.note}</p>}
      </div>
    </section>
  )

  const materials = (
    <>
      {s.materials && (
        <section className="section sub-sec">
          <div className="container">
            <SectionHeader eyebrow={s.materials.eyebrow} heading={s.materials.heading} text={s.materials.text} />
            <div className="grid-3">
              {(s.materials.items ?? []).map((m) => (
                <div key={m.name} className="material">
                  <div className="material__image">
                    <Media img={m.image} fallback={`${m.name} photo`} sizes="(max-width: 900px) 100vw, 380px" />
                    {m.badge && <span className="material__badge">{m.badge}</span>}
                  </div>
                  <h3>{m.name}</h3>
                  <p>{m.description}</p>
                </div>
              ))}
            </div>
            {s.materials.note && <p className="note">{s.materials.note}</p>}
          </div>
        </section>
      )}
      {s.printing && (
        <section className="section section--rule sub-sec printing">
          <div className="container">
            <div className="split printing__top">
              <div>
                <SectionHeader eyebrow={s.printing.eyebrow} heading={s.printing.heading} align="left" className="section-header--tight" />
                <Paragraphs items={s.printing.body} className="prose prose--sm" />
              </div>
              <div className="rounded-media printing__image">
                <Media img={s.printing.image} fallback="Printing & finishing photo" sizes="(max-width: 900px) 100vw, 590px" />
              </div>
            </div>
            <div className="split printing__lists">
              {[
                { title: s.printing.methodsHeading, items: s.printing.methods },
                { title: s.printing.finishesHeading, items: s.printing.finishes },
              ].map((col, i) =>
                col.items?.length ? (
                  <div key={i}>
                    {col.title && <h3 className="printing__list-title">{col.title}</h3>}
                    <ul className="dot-list dot-list--compact">
                      {col.items.map((m) => (
                        <li key={m.name}>
                          <h4>{m.name}</h4>
                          <p>{m.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )

  const why = (
    <>
      {s.whyUs && (
        <section className="section sub-sec">
          <div className="container">
            <SectionHeader eyebrow={s.whyUs.eyebrow} heading={s.whyUs.heading} text={s.whyUs.text} />
            <div className="grid-3 why-us">
              {s.whyUs.cards.map((c) => (
                <div key={c.title} className="why-us__card">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            {s.whyUs.note && <p className="note">{s.whyUs.note}</p>}
          </div>
        </section>
      )}
      <div className="sub-sample">
        <SamplePack s={home.sample} />
      </div>
    </>
  )

  const tabs = [
    { id: 'overview', label: label.overview || 'Overview', icon: '/icons/sub-tab-overview.svg', content: overview },
    { id: 'specs', label: label.specs || 'Specs', icon: '/icons/sub-tab-specs.svg', content: specs },
    { id: 'materials', label: label.materials || 'Materials & Finishes', icon: '/icons/sub-tab-materials.svg', content: materials },
    { id: 'why-us', label: label.why || 'Sustainability & Why Us', icon: '/icons/sub-tab-why.svg', content: why },
    { id: 'faq', label: label.faq || 'FAQ', icon: '/icons/sub-tab-faq.svg', content: <FaqSection section={faqs} /> },
  ].filter((t) => t.content)

  return (
    <div className="sub-page">
      <ProductTop
        data={data}
        title={page.title}
        category={category}
        isCategory={false}
        ratingText={page.ratingText}
        shortDescription={page.shortDescription || def.shortDescription}
        highlights={page.highlights.length ? page.highlights : def.highlights}
        gallery={page.gallery.length ? page.gallery : def.gallery}
        options={formOptions(page, settings.formDefaults)}
        fields={[...FIELDS]}
        trustIconSize={37}
      />
      <ProductTabs tabs={tabs} />
      <CtaSection cta={settings.cta} />
    </div>
  )
}

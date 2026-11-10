import type { Category, OptionCard, PageContent, Product, SectionHeading, SiteData } from '@/lib/types'
import { Media } from '@/components/ui/Media'
import { Paragraphs, SectionHeader } from '@/components/ui/SectionHeader'
import { FaqSection } from '@/components/sections/FaqSection'
import { OptionTabs, ProductTabs, type TabItem } from './ProductTabs'
import { ProductTop } from './ProductTop'
import { formOptions, mergeFaqs } from './ProductTemplate'

// Every product page (e.g. /black-mailer-boxes, /cream-boxes): the shared top, a construction
// section, four tabs (Overview, Specifications, Sustainability & Why Us, FAQ), then the options
// section with its own tabs (Material, Printing, Finishes, Add-ons).
// Each section uses the product's own content, or Site settings > Sub-product pages when empty.

const FIELDS = ['style', 'finish', 'productionSpeed', 'quantity'] as const

/** The product's section if it has a heading, else the default, with {product} filled in. */
function pick<T extends { heading?: string; text?: string }>(own: T | undefined, def: T | undefined, product: string): T | undefined {
  const s = own?.heading ? own : def
  if (!s?.heading) return undefined
  const fill = (v?: string) => v?.replace(/\{product\}/gi, product)
  return { ...s, heading: fill(s.heading), text: fill(s.text) }
}

/** Short, rounded icons for the tab bar (drawn with lines, so they take the tab's colour). */
const icon = (paths: string[]) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
)
const ICONS = {
  overview: icon(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 11v5M12 7.5v.5']),
  specs: icon(['M4 6h16M4 12h16M4 18h10']),
  why: icon(['M5 19c0-8 6-14 15-14-1 9-6 15-15 14Z', 'M5 19 13 11']),
  faq: icon(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M9.5 9.2a2.6 2.6 0 0 1 5 .8c0 1.8-2.5 2.3-2.5 3.8M12 17v.3']),
}

const clean = (list: (string | undefined)[]) => list.filter((x): x is string => !!x)

/** A centred block inside the Overview tab: small label, heading, then paragraphs. */
function OverviewBlock({ s, paragraphs, field, first = false }: { s?: SectionHeading; paragraphs: string[]; field: string; first?: boolean }) {
  if (!s) return null
  const body = (
    <>
      <SectionHeader eyebrow={s.eyebrow} heading={s.heading} />
      <Paragraphs items={paragraphs} className="prose prose--sm pdp-ovc__text" />
    </>
  )
  return first ? body : <div data-section={field} className="pdp-ovc__block">{body}</div>
}

function OptionGrid({ items, note }: { items: OptionCard[]; note?: string }) {
  return (
    <>
      <div className="mp-grid">
        {items.map((m) => (
          <div key={m.name} className="material">
            <div className="material__image">
              <Media img={m.image} fallback={`${m.name} photo`} sizes="(max-width: 900px) 50vw, 290px" />
              {m.badge && <span className="material__badge">{m.badge}</span>}
            </div>
            <h4>{m.name}</h4>
            <p>{m.description}</p>
          </div>
        ))}
      </div>
      {note && <p className="note">{note}</p>}
    </>
  )
}

export function SubProductTemplate({ data, page, category }: { data: SiteData; page: Product; category: Category }) {
  const { settings } = data
  const def = settings.subProductDefaults
  const name = page.title
  const s: Partial<PageContent> = {
    construction: pick(page.construction, def.construction, name),
    overview: pick(page.overview, def.overview, name),
    benefits: pick(page.benefits, def.benefits, name),
    useCases: pick(page.useCases, def.useCases, name),
    specs: pick(page.specs, def.specs, name),
    sustainability: pick(page.sustainability, def.sustainability, name),
    whyUs: pick(page.whyUs?.cards?.length ? page.whyUs : undefined, def.whyUs, name),
    materials: pick(page.materials, def.materials, name),
    printing: pick(page.printing, def.printing, name),
  }
  // Photo spots the product hasn't filled show its own gallery photos, so each page shows its own box.
  const own = page.gallery
  if (s.construction && !page.construction?.image && own.length > 1) s.construction = { ...s.construction, image: own[4] ?? own[0] }
  if (s.overview && !page.overview?.images?.length && own.length > 1) s.overview = { ...s.overview, images: own.slice(1, 4) }
  const addons = page.addons?.items?.length ? page.addons : def.addons
  const faqs = mergeFaqs(settings.productDefaults.faqs, page.faqs)
  const label = def.tabs ?? {}

  const construction = s.construction && (
    <section data-section="construction" className="section">
      <div className="container split pdp-detail">
        <div className="rounded-media pdp-detail__img">
          <Media img={s.construction.image} fallback="Construction photo" sizes="(max-width: 900px) 100vw, 600px" />
        </div>
        <div>
          <SectionHeader eyebrow={s.construction.eyebrow} heading={s.construction.heading} text={s.construction.text} align="left" className="section-header--tight" />
          <Paragraphs items={s.construction.body ?? []} className="prose prose--sm" />
          {(s.construction.list?.length ?? 0) > 0 && (
            <ul className="dot-list dot-list--compact pdp-points">
              {s.construction.list.map((p) => (
                <li key={p.title}>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )

  const overview = s.overview && (
    <section data-section="overview" className="section pdp-ovc">
      <div className="container">
        <OverviewBlock s={s.overview} paragraphs={clean([s.overview.text, ...(s.overview.body ?? [])])} field="overview" first />
        {(s.overview.images?.length ?? 0) > 0 && (
          <div className="pdp-ovc__imgs">
            {s.overview.images.slice(0, 3).map((img, i) => (
              <div key={i} className="rounded-media">
                <Media img={img} fallback="Overview photo" sizes="(max-width: 700px) 50vw, 390px" />
              </div>
            ))}
          </div>
        )}
        <OverviewBlock s={s.benefits} paragraphs={clean([s.benefits?.text, ...(s.benefits?.body ?? [])])} field="benefits" />
        <OverviewBlock s={s.useCases} paragraphs={clean([s.useCases?.text, s.useCases?.note])} field="useCases" />
      </div>
    </section>
  )

  const specs = s.specs && (
    <section data-section="specs" className="section" id="specs">
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

  const eco = s.sustainability
  const why = (eco || s.whyUs) && (
    <>
      {eco && (
        <section data-section="sustainability" className="eco-wrap pdp-eco" id="eco">
          <div className="container">
            <div className="eco">
              <div className="eco__copy">
                {eco.eyebrow && <p className="eco__eyebrow">{eco.eyebrow}</p>}
                <h2>{eco.heading}</h2>
                {eco.text && <p>{eco.text}</p>}
              </div>
              <div className="eco__badge">
                <Media img={eco.badge} fallback="FSC badge" sizes="150px" />
              </div>
            </div>
          </div>
        </section>
      )}
      {s.whyUs && (
        <section data-section="whyUs" className="section pdp-why">
          <div className="container">
            <SectionHeader eyebrow={s.whyUs.eyebrow} heading={s.whyUs.heading} text={s.whyUs.text} />
            <div className="grid-3 why-us">
              {s.whyUs.cards.map((c) => (
                <div key={c.title} className="why-us__card">
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            {s.whyUs.note && <p className="note">{s.whyUs.note}</p>}
          </div>
        </section>
      )}
    </>
  )

  const tabs = [
    { id: 'overview', label: label.overview || 'Overview', icon: ICONS.overview, content: overview },
    { id: 'specs', label: label.specs || 'Specifications', icon: ICONS.specs, content: specs },
    { id: 'eco', label: label.why || 'Sustainability & Why Us', icon: ICONS.why, content: why },
    { id: 'faq', label: label.faq || 'FAQ', icon: ICONS.faq, content: <FaqSection section={faqs} /> },
  ].filter((t) => t.content) as TabItem[]

  // The options section: the materials heading on top, then one tab per kind of option.
  const options = [
    { id: 'material', label: label.optionMaterial || 'Material', field: 'materials', items: s.materials?.items, note: s.materials?.note },
    { id: 'printing', label: label.optionPrinting || 'Printing', field: 'printing', items: s.printing?.methods, note: s.printing?.body?.join(' ') },
    { id: 'finishes', label: label.optionFinishes || 'Finishes', field: 'printing', items: s.printing?.finishes, note: s.printing?.finishesNote },
    { id: 'addons', label: label.optionAddons || 'Add-ons', field: 'addons', items: addons?.items, note: addons?.note },
  ]
    .filter((o) => o.items?.length)
    .map((o) => ({ id: o.id, label: o.label, content: <div data-section={o.field}><OptionGrid items={o.items!} note={o.note} /></div> }))

  return (
    <>
      <ProductTop
        data={data}
        title={page.title}
        category={category}
        isCategory={false}
        ratingText={page.ratingText}
        shortDescription={page.shortDescription || def.shortDescription}
        highlights={[]}
        badges={page.badges?.length ? page.badges : (def.badges ?? [])}
        gallery={page.gallery.length ? page.gallery : def.gallery}
        options={formOptions(page, settings.formDefaults)}
        fields={[...FIELDS]}
      />
      {construction}
      {tabs.length > 0 && <ProductTabs tabs={tabs} />}
      {options.length > 0 && (
        <section data-section="materials" className="section section--beige" id="materials">
          <div className="container">
            {s.materials && <SectionHeader eyebrow={s.materials.eyebrow} heading={s.materials.heading} text={s.materials.text} />}
            <OptionTabs tabs={options} label="Box options" />
          </div>
        </section>
      )}
    </>
  )
}

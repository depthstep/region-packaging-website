import type { OptionCard, PageContent, PageOptions, SiteSettings } from '@/lib/types'
import { Media } from '@/components/ui/Media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { OptionTabs } from './ProductTabs'

/** Stacked sheets: the thickness line on material cards. */
const Layers = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 3 2 8l10 5 10-5-10-5Z" fill="currentColor" />
    <path d="m2 12 10 5 10-5M2 16l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
)

/** One tab's cards: photo, name, text, then the optional thickness line and label (material tags are not shown here). */
function OptionGrid({ items, note }: { items: OptionCard[]; note?: string }) {
  return (
    <>
      <div className="mp-grid">
        {items.map((m) => (
          <div key={m.name} className="material">
            <div className="material__image">
              <Media img={m.image} fallback={`${m.name} photo`} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 290px" />
            </div>
            <h4>{m.name}</h4>
            <p>{m.description}</p>
            {m.spec && (
              <p className="material__spec">
                <Layers />
                {m.spec}
              </p>
            )}
            {m.tag && <span className="material__tag">{m.tag}</span>}
          </div>
        ))}
      </div>
      {note && <p className="note">{note}</p>}
    </>
  )
}

/**
 * The options section on box pages and category pages: the materials heading on top, then one
 * tab per kind of option (Material, Printing, Finishes, Add-ons). Tabs with no cards are left out.
 * Site settings > Product page defaults > Option cards gives every page the same cards: a tab
 * with shared cards uses them (without the page's own note) instead of the page's.
 * `underTabBar` is true on box pages, where the page's own tab bar is pinned above these buttons.
 */
export function OptionsSection({
  materials,
  printing,
  addons,
  shared = {},
  labels = {},
  underTabBar = false,
}: {
  materials?: PageContent['materials']
  printing?: PageContent['printing']
  addons?: PageContent['addons']
  shared?: PageOptions
  labels?: SiteSettings['subProductDefaults']['tabs']
  underTabBar?: boolean
}) {
  const label = labels ?? {}
  const own = (list: OptionCard[] | undefined, note: string | undefined, common: OptionCard[] | undefined) =>
    common?.length ? { items: common, note: undefined } : { items: list, note }
  const options = [
    { id: 'material', label: label.optionMaterial || 'Material', field: 'materials', ...own(materials?.items, materials?.note, shared.materials) },
    { id: 'printing', label: label.optionPrinting || 'Printing', field: 'printing', ...own(printing?.methods, printing?.body?.join(' '), shared.printing) },
    { id: 'finishes', label: label.optionFinishes || 'Finishes', field: 'printing', ...own(printing?.finishes, printing?.finishesNote, shared.finishes) },
    { id: 'addons', label: label.optionAddons || 'Add-ons', field: 'addons', ...own(addons?.items, addons?.note, shared.addons) },
  ]
    .filter((o) => o.items?.length)
    .map((o) => ({ id: o.id, label: o.label, content: <div data-section={o.field}><OptionGrid items={o.items!} note={o.note} /></div> }))
  if (!options.length) return null
  return (
    <section data-section="materials" className={`section section--beige ${underTabBar ? '' : 'options--alone'}`} id="materials">
      <div className="container">
        {materials?.heading && <SectionHeader eyebrow={materials.eyebrow} heading={materials.heading} text={materials.text} />}
        <OptionTabs tabs={options} label="Box options" />
      </div>
    </section>
  )
}

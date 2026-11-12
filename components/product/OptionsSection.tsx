import type { OptionCard, PageContent, SiteSettings } from '@/lib/types'
import { Media } from '@/components/ui/Media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { OptionTabs } from './ProductTabs'

/** One tab's cards: photo, name and text (material tags are not shown here). */
function OptionGrid({ items, note }: { items: OptionCard[]; note?: string }) {
  return (
    <>
      <div className="mp-grid">
        {items.map((m) => (
          <div key={m.name} className="material">
            <div className="material__image">
              <Media img={m.image} fallback={`${m.name} photo`} sizes="(max-width: 900px) 50vw, 290px" />
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

/**
 * The options section on box pages and category pages: the materials heading on top, then one
 * tab per kind of option (Material, Printing, Finishes, Add-ons). Tabs with no cards are left out.
 * `underTabBar` is true on box pages, where the page's own tab bar is pinned above these buttons.
 */
export function OptionsSection({
  materials,
  printing,
  addons,
  labels = {},
  underTabBar = false,
}: {
  materials?: PageContent['materials']
  printing?: PageContent['printing']
  addons?: PageContent['addons']
  labels?: SiteSettings['subProductDefaults']['tabs']
  underTabBar?: boolean
}) {
  const label = labels ?? {}
  const options = [
    { id: 'material', label: label.optionMaterial || 'Material', field: 'materials', items: materials?.items, note: materials?.note },
    { id: 'printing', label: label.optionPrinting || 'Printing', field: 'printing', items: printing?.methods, note: printing?.body?.join(' ') },
    { id: 'finishes', label: label.optionFinishes || 'Finishes', field: 'printing', items: printing?.finishes, note: printing?.finishesNote },
    { id: 'addons', label: label.optionAddons || 'Add-ons', field: 'addons', items: addons?.items, note: addons?.note },
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

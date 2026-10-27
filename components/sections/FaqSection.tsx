import type { Faq, SectionHeading } from '@/lib/types'
import { Plus } from '@/components/ui/glyphs'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function FaqList({ items }: { items: Faq[] }) {
  // The design shows the second question open; questions without an answer yet stay closed.
  const openIndex = items.findIndex((f) => f.answer)
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <details key={f.question} className="faq" open={i === openIndex}>
          <summary>
            <span>{f.question}</span>
            <Plus className="faq__icon" />
          </summary>
          {f.answer ? <p className="faq__answer">{f.answer}</p> : <p className="faq__answer placeholder-text">[Placeholder] Answer to be added in the CMS.</p>}
        </details>
      ))}
    </div>
  )
}

export function FaqSection({ section, id = 'faq', rule = false }: { section?: SectionHeading & { items: Faq[] }; id?: string; rule?: boolean }) {
  if (!section?.items?.length) return null
  return (
    <section className={`section ${rule ? 'section--rule' : ''}`} id={id}>
      <div className="container split split--faq">
        <SectionHeader eyebrow={section.eyebrow} heading={section.heading} text={section.text} align="left" />
        <FaqList items={section.items} />
      </div>
    </section>
  )
}

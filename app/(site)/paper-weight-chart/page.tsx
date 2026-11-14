import type { Metadata } from 'next'
import Image from 'next/image'
import { getSiteData } from '@/lib/data'
import { withBase } from '@/lib/asset'
import { ButtonLink } from '@/components/ui/Button'
import { Media } from '@/components/ui/Media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FaqList } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { WeightConverter } from '@/components/paper-weight/WeightConverter'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { paperWeight: p } = await getSiteData()
  return { title: p.seoTitle ? { absolute: p.seoTitle } : 'Paper Weight Chart', description: p.seoDescription }
}

/** Figma 799:2. Every section hides itself when its heading (or list) is emptied in the admin. */
export default async function PaperWeightChartPage() {
  const { paperWeight: p, settings } = await getSiteData()
  const { hero, measures, converter, chart, glance, boxes, faq } = p
  return (
    <>
      <section data-section="hero measures converter" className="pw-top">
        <div className="container">
          <div data-section="hero" className="pw-hero">
            <div className="pw-hero__copy">
              <h1>{hero.heading || 'Paper weight chart'}</h1>
              {hero.text && <p>{hero.text}</p>}
              <div className="button-row">
                {hero.converterLabel && converter.heading && <ButtonLink href="#converter">{hero.converterLabel}</ButtonLink>}
                {hero.chartLabel && chart.rows.length > 0 && (
                  <ButtonLink href="#chart" variant="outline">
                    {hero.chartLabel}
                  </ButtonLink>
                )}
              </div>
            </div>
            <div className="pw-hero__photo">
              <Media img={hero.image} fallback="Board samples" sizes="(max-width: 900px) 100vw, 480px" priority />
            </div>
          </div>

          {hero.scale.length > 0 && (
            <div className="pw-scale">
              <div className="pw-scale__bar" aria-hidden="true" />
              <ol>
                {hero.scale.map((s) => (
                  <li key={s.gsm}>
                    <strong>{s.gsm}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {measures.heading && (
            <div data-section="measures" className="pw-block">
              <SectionHeader eyebrow={measures.eyebrow} heading={measures.heading} text={measures.text} />
              <ul className="pw-measures">
                {measures.cards.map((c) => (
                  <li key={c.code}>
                    <span className="pw-measures__code">{c.code}</span>
                    <h3>{c.title}</h3>
                    {c.text && <p>{c.text}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {converter.heading && (
            <div data-section="converter" className="pw-block">
              <div className="pw-conv" id="converter">
                <div className="pw-conv__intro">
                  {converter.image?.src && <Image src={withBase(converter.image.src)} alt="" fill sizes="(max-width: 900px) 100vw, 600px" className="pw-conv__photo" />}
                  <div className="pw-conv__copy">
                    {converter.eyebrow && <p className="eyebrow">{converter.eyebrow}</p>}
                    <h2>{converter.heading}</h2>
                    {converter.text && <p>{converter.text}</p>}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase('/brand/logo.svg')} alt="" width={124} height={41} className="pw-conv__logo" />
                </div>
                <WeightConverter note={converter.note} />
              </div>
            </div>
          )}
        </div>
      </section>

      {chart.rows.length > 0 && (
        <section data-section="chart" className="section pw-chart" id="chart">
          <div className="container">
            <SectionHeader eyebrow={chart.eyebrow} heading={chart.heading} text={chart.text} />
            <div className="pw-table pw-table--wide">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Points</th>
                    <th scope="col">Text stock</th>
                    <th scope="col">Uncoated board</th>
                    <th scope="col">C1S</th>
                    <th scope="col">C2S</th>
                    <th scope="col">Thickness</th>
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((r) => (
                    <tr key={r.pt}>
                      <th scope="row">{r.pt}</th>
                      <td>{r.text}</td>
                      <td>{r.uncoated}</td>
                      <td>{r.c1s}</td>
                      <td>{r.c2s}</td>
                      <td>{r.thickness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {chart.note && <p className="pw-chart__note">{chart.note}</p>}

            {chart.poundsRows.length > 0 && (
              <>
                <header className="pw-chart__sub">
                  {chart.poundsHeading && <h3>{chart.poundsHeading}</h3>}
                  {chart.poundsText && <p>{chart.poundsText}</p>}
                </header>
                <div className="pw-table">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Pounds</th>
                        <th scope="col">Text stock</th>
                        <th scope="col">Cover stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chart.poundsRows.map((r) => (
                        <tr key={r.lb}>
                          <th scope="row">{r.lb}</th>
                          <td>{r.text}</td>
                          <td>{r.cover}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {(glance.bars.length > 0 || boxes.heading) && (
        <section data-section="glance boxes" className="section section--beige pw-beige">
          <div className="container">
            {glance.bars.length > 0 && (
              <div data-section="glance">
                <SectionHeader eyebrow={glance.eyebrow} heading={glance.heading} text={glance.text} className="pw-wide-header" />
                <div className="pw-glance">
                  <p className="pw-glance__ends" aria-hidden="true">
                    <span>Light</span>
                    <span>Heavy</span>
                  </p>
                  <ol>
                    {glance.bars.map((b, i, all) => {
                      // Bars grow from about 12% to 72% of the row, lightest first, as drawn in the design.
                      const t = all.length > 1 ? i / (all.length - 1) : 1
                      const width = 12 + 60 * Math.pow(t, 1.1)
                      return (
                        <li key={b.gsm} style={{ ['--w' as string]: `${width.toFixed(1)}%`, ['--mix' as string]: `${Math.round(t * 100)}%` }}>
                          <span className="pw-glance__bar" aria-hidden="true" />
                          <span className="pw-glance__label">
                            <strong>{b.gsm}</strong>
                            <span>{b.label}</span>
                          </span>
                        </li>
                      )
                    })}
                  </ol>
                  {glance.note && <p className="pw-glance__note">{glance.note}</p>}
                </div>
              </div>
            )}

            {boxes.heading && (
              <div data-section="boxes" className={glance.bars.length > 0 ? 'pw-boxes pw-boxes--rule' : 'pw-boxes'}>
                <SectionHeader eyebrow={boxes.eyebrow} heading={boxes.heading} text={boxes.text} className="pw-wide-header" />
                {boxes.photos.length > 0 && (
                  <ul className="pw-boxes__photos">
                    {boxes.photos.map((ph, i) => (
                      <li key={i}>
                        <Media img={ph.image?.src ? { ...ph.image, alt: ph.image.alt || ph.label } : ph.image} fallback={ph.label} sizes="(max-width: 640px) 50vw, 285px" />
                      </li>
                    ))}
                  </ul>
                )}
                {boxes.flutes.length > 0 && (
                  <div className="pw-flutes">
                    {boxes.fluteHeading && <h3>{boxes.fluteHeading}</h3>}
                    <ul>
                      {boxes.flutes.map((f) => (
                        <li key={f.title}>
                          <strong>{f.title}</strong>
                          <span>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {faq.items.length > 0 && (
        <section data-section="faq" className="section pw-faq">
          <div className="container">
            <SectionHeader eyebrow={faq.eyebrow} heading={faq.heading} text={faq.text} />
            <FaqList items={faq.items} />
          </div>
        </section>
      )}

      <CtaSection cta={settings.cta} />
    </>
  )
}

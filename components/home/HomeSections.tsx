import Image from 'next/image'
import { withBase } from '@/lib/asset'
import type { HomePage, SiteData } from '@/lib/types'
import { productsIn, toCard } from '@/lib/data'
import { ButtonLink } from '@/components/ui/Button'
import { FeatureCard, PhotoCard } from '@/components/ui/Cards'
import { Star } from '@/components/ui/glyphs'
import { Icon, Media } from '@/components/ui/Media'
import { Paragraphs, SectionHeader } from '@/components/ui/SectionHeader'
import { HeroSlider } from './HeroSlider'
import { IndustryTabs } from './IndustryTabs'

export function Hero({ hero, stats }: { hero: HomePage['hero']; stats: SiteData['settings']['stats'] }) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          {hero.ratingText && (
            <p className="hero__rating">
              <Star size={18} /> {hero.ratingText}
            </p>
          )}
          <h1>{hero.heading}</h1>
          {hero.intro && <p className="hero__intro">{hero.intro}</p>}
          {hero.cta && <ButtonLink href={hero.cta.href}>{hero.cta.label}</ButtonLink>}
          {stats.length > 0 && (
            <dl className="hero__stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <HeroSlider slides={hero.slides.length ? hero.slides : [{ alt: '', label: 'Hero photo' }]} />
      </div>
    </section>
  )
}

export function TrustedBy({ settings }: { settings: SiteData['settings'] }) {
  if (!settings.trustedBrands.length) return null
  return (
    <section className="trusted">
      <div className="container trusted__inner">
        <p className="trusted__heading">{settings.trustedHeading}</p>
        <ul className="trusted__logos">
          {settings.trustedBrands.map((b) => (
            <li key={b.name}>
              {b.logo?.src ? (
                <Image src={withBase(b.logo.src)} alt={b.name} width={b.logo.width ?? 160} height={b.logo.height ?? 40} className="trusted__logo" />
              ) : (
                <span className="trusted__name">{b.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ChooseBox({ s }: { s: HomePage['chooseBox'] }) {
  if (!s.cards.length) return null
  return (
    <section className="section choose-box" id="products">
      <div className="container">
        <SectionHeader
          eyebrow={s.eyebrow}
          heading={s.heading}
          text={s.text}
          align="left"
          aside={s.button && <ButtonLink href={s.button.href} variant="outline" size="sm">{s.button.label}</ButtonLink>}
        />
        <div className="grid-3 card-grid">
          {s.cards.map((c) => (
            <PhotoCard key={c.title} card={c} />
          ))}
        </div>
        {/* On phones the button sits under the cards (Figma mobile). */}
        {s.button && (
          <ButtonLink href={s.button.href} variant="outline" size="sm" className="choose-box__more">
            {s.button.label}
          </ButtonLink>
        )}
      </div>
    </section>
  )
}

export function Steps({ s }: { s: HomePage['steps'] }) {
  if (!s.steps.length) return null
  return (
    <section className="section section--beige">
      <div className="container">
        <SectionHeader eyebrow={s.eyebrow} heading={s.heading} text={s.text} />
        <ol className="steps">
          {s.steps.map((step) => (
            <li key={step.title}>
              <Icon img={step.icon} size={100} label={step.title} />
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Industries({ s, data }: { s: HomePage['industries']; data: SiteData }) {
  if (!s.tabs.length) return null
  // A tab shows its own cards, else the products of its linked category, else the default cards.
  const tabs = s.tabs.map((t) => {
    if (t.cards?.length) return { label: t.label, cards: t.cards }
    const fromCategory = t.categoryId ? productsIn(data, t.categoryId).map((p) => toCard(data, p, 'Customize Now')) : []
    return { label: t.label, cards: fromCategory.length ? fromCategory : s.defaultCards }
  })
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={s.eyebrow} heading={s.heading} text={s.text} />
        <IndustryTabs tabs={tabs} />
        {s.note && <p className="note">{s.note}</p>}
      </div>
    </section>
  )
}

export function AnyQuantity({ s }: { s: HomePage['quantity'] }) {
  return (
    <section className="section section--rule">
      <div className="container split quantity">
        <div>
          <SectionHeader eyebrow={s.eyebrow} heading={s.heading} text={s.text} align="left" />
          <Paragraphs items={s.body} className="prose prose--sm" />
        </div>
        {s.features.length > 0 && (
          <div className="grid-2">
            {s.features.map((f) => (
              <FeatureCard key={f.title} item={f} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function DesignForYou({ s }: { s: HomePage['design'] }) {
  return (
    <section className="design-for-you" id="design">
      <div className="container design__inner">
        <div className="design__art">
          <Media img={s.image} fallback="Dieline illustration" sizes="(max-width: 900px) 100vw, 466px" />
        </div>
        <div className="design__panel">
          {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
          <h2>{s.heading}</h2>
          {s.lead && <p className="design__lead">{s.lead}</p>}
          <Paragraphs items={s.body} className="design__body" />
          <ul className="dot-list dot-list--white">
            {s.bullets.map((b) => (
              <li key={b.title}>
                <h4>{b.title}</h4>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
          {s.button && (
            <ButtonLink href={s.button.href} variant="outline" size="sm">
              {s.button.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  )
}

export function Eco({ s }: { s: HomePage['eco'] }) {
  if (!s.heading) return null
  const [before, after] = s.body && s.linkText && s.body.includes(s.linkText) ? s.body.split(s.linkText) : [s.body, undefined]
  return (
    <section className="eco-wrap" id="eco">
      <div className="container">
        <div className="eco">
          <div className="eco__copy">
            {s.eyebrow && <p className="eco__eyebrow">{s.eyebrow}</p>}
            <h2>{s.heading}</h2>
            <p>
              {before}
              {after !== undefined && (
                <>
                  {s.linkHref ? <a href={s.linkHref}>{s.linkText}</a> : <strong className="eco__link">{s.linkText}</strong>}
                  {after}
                </>
              )}
            </p>
          </div>
          <div className="eco__badge">
            <Media img={s.badge} fallback="FSC badge" sizes="150px" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function WithYourLogo({ s }: { s: HomePage['logo'] }) {
  return (
    <section className="section section--beige">
      <div className="container split split--media">
        <div>
          <SectionHeader eyebrow={s.eyebrow} heading={s.heading} align="left" className="section-header--tight" />
          {s.lead && <p className="lead">{s.lead}</p>}
          <Paragraphs items={s.body} className="prose prose--sm logo__body" />
          <ul className="dot-list">
            {s.bullets.map((b) => (
              <li key={b.title}>
                <h4>{b.title}</h4>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-media rounded-media--logo">
          <Media img={s.image} fallback="Branded boxes photo" sizes="(max-width: 900px) 100vw, 650px" />
        </div>
      </div>
    </section>
  )
}

export function SamplePack({ s }: { s: HomePage['sample'] }) {
  if (!s.heading) return null
  return (
    <section className="section sample-wrap">
      <div className="container">
        <div className="sample">
          <div className="sample__copy">
            {s.eyebrow && <p className="sample__eyebrow">{s.eyebrow}</p>}
            <h2>{s.heading}</h2>
            {s.text && <p>{s.text}</p>}
            {s.button && (
              <ButtonLink href={s.button.href} variant="outline-light" size="sm">
                {s.button.label}
              </ButtonLink>
            )}
            {s.note && <p className="sample__note">{s.note}</p>}
          </div>
          <div className="sample__image">
            <Media img={s.image} fallback="Sample pack photo" sizes="(max-width: 900px) 100vw, 404px" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function BlogTeasers({ s, data, rule = true }: { s: HomePage['blog']; data: SiteData; rule?: boolean }) {
  const picked = s.postIds.length ? s.postIds.map((id) => data.posts.find((p) => p.id === id)).filter((p) => !!p) : data.posts
  const posts = picked.slice(0, 3)
  if (!posts.length) return null
  return (
    <section className={`section ${rule ? 'section--rule' : ''}`}>
      <div className="container">
        <SectionHeader eyebrow={s.eyebrow} heading={s.heading} text={s.text} />
        <div className="grid-3 card-grid">
          {posts.map((p) => (
            <PhotoCard
              key={p.id}
              card={{ title: p.title, kicker: p.kicker, linkLabel: s.linkLabel, href: `/blog/${p.slug}`, image: p.image }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

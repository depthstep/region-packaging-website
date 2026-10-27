import Link from 'next/link'
import { withBase } from '@/lib/asset'
import type { Category, SiteData } from '@/lib/types'
import { productsIn } from '@/lib/data'
import { ArrowRight, Chevron } from '@/components/ui/glyphs'
import { Icon } from '@/components/ui/Media'
import { ButtonLink } from '@/components/ui/Button'

const telHref = (phone?: string) => `tel:${(phone || '').replace(/[^\d+]/g, '')}`

function MegaMenu({ label, cats, data }: { label: string; cats: Category[]; data: SiteData }) {
  const promo = data.settings.menuPromo
  return (
    <li className="nav__item">
      <button type="button" className="nav__trigger" aria-haspopup="true">
        {label} <Chevron />
      </button>
      <div className="mega">
        <div className="container mega__inner">
          <div className={`mega__columns ${cats.length > 3 ? 'mega__columns--dense' : ''}`} style={{ ['--cols' as string]: cats.length }}>
            {cats.map((c) => (
              <div key={c.id} className="mega__col">
                <p className="mega__heading">
                  <Link href={`/${c.slug}`}>{c.menuLabel || c.title.replace(/^Custom /, '')}</Link>
                </p>
                <ul>
                  {productsIn(data, c.id).map((p) => (
                    <li key={p.id}>
                      <Link href={`/${c.slug}/${p.slug}`} className="mega__link">
                        <Icon img={p.menuIcon ?? c.menuIcon} size={cats.length > 3 ? 32 : 40} label={p.title} />
                        <span>{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/${c.slug}`} className="mega__explore">
                  Explore {c.title.replace(/^Custom /, '').toLowerCase()} <ArrowRight />
                </Link>
              </div>
            ))}
          </div>
          {promo.title && (
            <div className="mega__promo">
              <p className="mega__promo-title">{promo.title}</p>
              {promo.text && <p>{promo.text}</p>}
              {promo.buttonLabel && (
                <ButtonLink href={promo.href || '/products'} variant="sky" size="sm">
                  {promo.buttonLabel}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export function Header({ data }: { data: SiteData }) {
  const { settings, categories } = data
  const boxes = categories.filter((c) => c.kind !== 'industry')
  const industries = categories.filter((c) => c.kind === 'industry')
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          {settings.announcement && (
            <p className="topbar__promo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/icons/sparkle.svg')} alt="" width={18} height={18} />
              {settings.announcement}
            </p>
          )}
          <div className="topbar__actions">
            <form action={withBase('/products')} role="search" className="search">
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <input id="site-search" name="q" type="search" placeholder="Search products..." />
              <button type="submit" aria-label="Search">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase('/icons/search.svg')} alt="" width={16} height={16} />
              </button>
            </form>
            {/* Cart is shown as designed but not wired up (quote-only site, no accounts). */}
            <span className="topbar__cart" aria-label="Cart (not active)" title="Not active yet">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/icons/cart.svg')} alt="" width={38} height={38} />
            </span>
          </div>
        </div>
      </div>
      <div className="mainbar">
        <div className="container mainbar__inner">
          <Link href="/" className="logo" aria-label="Region Packaging home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase('/brand/logo.svg')} alt="Region Packaging" width={157} height={52} />
          </Link>
          <nav aria-label="Main">
            <ul className="nav">
              <MegaMenu label="Custom Boxes" cats={boxes} data={data} />
              <MegaMenu label="Boxes By Industry" cats={industries} data={data} />
              <li className="nav__item nav__item--small">
                <button type="button" className="nav__trigger" aria-haspopup="true">
                  Resources <Chevron />
                </button>
                <ul className="dropdown">
                  {settings.resourcesMenu.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
          {settings.phone && (
            <a href={telHref(settings.phone)} className="phone">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/icons/phone.svg')} alt="" width={22} height={22} />
              {settings.phone}
            </a>
          )}
          <ButtonLink href="/quote" variant="outline" className="mainbar__quote">
            Get a Quote
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}

export { telHref }

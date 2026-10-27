import type { Metadata } from 'next'
import { getSiteData, groupLabel, productsIn, toCard } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { PhotoCard } from '@/components/ui/Cards'
import { ButtonLink } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'All Products' }

type Props = { searchParams: Promise<{ q?: string }> }

export default async function ProductsPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const data = await getSiteData()
  const query = q.trim().toLowerCase()

  if (query) {
    const hits = [...data.categories, ...data.products].filter((x) => x.title.toLowerCase().includes(query))
    return (
      <>
        <PageIntro title={`Search: “${q.trim()}”`} crumb="Search" text={`${hits.length} result${hits.length === 1 ? '' : 's'}`} />
        <section className="section section--tight">
          <div className="container">
            {hits.length ? (
              <div className="grid-3 card-grid">
                {hits.map((h) => (
                  <PhotoCard key={h.id} card={toCard(data, h, 'Customize Now')} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No products match that search.</p>
                <ButtonLink href="/products" variant="outline" size="sm">
                  View All Products
                </ButtonLink>
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageIntro title="All Products" />
      {data.categories.map((c) => (
        <section key={c.id} className="section section--tight section--rule">
          <div className="container">
            <header className="section-header section-header--left">
              <div className="section-header__copy">
                <p className="eyebrow">{groupLabel(c.kind)}</p>
                <h2>{c.title}</h2>
              </div>
              <ButtonLink href={`/${c.slug}`} variant="outline" size="sm">
                View {c.title}
              </ButtonLink>
            </header>
            <div className="grid-3 card-grid card-grid--4">
              {productsIn(data, c.id).map((p) => (
                <PhotoCard key={p.id} card={toCard(data, p, 'Customize Now')} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

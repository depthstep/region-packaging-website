import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSiteData, groupLabel, introMetadata, productsIn, toCard } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { PhotoCard } from '@/components/ui/Cards'
import { ButtonLink } from '@/components/ui/Button'
import { ProductSearch } from '@/components/product/ProductSearch'

export async function generateMetadata(): Promise<Metadata> {
  return introMetadata((await getSiteData()).settings.pageIntros.products, 'All Products')
}

export default async function ProductsPage() {
  const data = await getSiteData()
  const intro = data.settings.pageIntros.products
  const cards = [...data.categories, ...data.products].map((x) => ({ id: x.id, ...toCard(data, x, 'Customize Now') }))

  const listing = (
    <>
      <PageIntro title={intro?.heading || 'All Products'} text={intro?.text} />
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

  return (
    <Suspense fallback={listing}>
      <ProductSearch cards={cards}>{listing}</ProductSearch>
    </Suspense>
  )
}

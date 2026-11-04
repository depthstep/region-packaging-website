import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCategory, getSiteData, productsIn } from '@/lib/data'
import { RichText } from '@/components/blog/RichText'
import { PageIntro } from '@/components/layout/PageIntro'
import { ProductTemplate } from '@/components/product/ProductTemplate'

export const revalidate = 3600

type Params = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const { categories, pages } = await getSiteData()
  return [...categories, ...pages].map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params
  const data = await getSiteData()
  const cat = findCategory(data, category)
  if (!cat) {
    const page = data.pages.find((p) => p.slug === category)
    return page ? { title: page.seoTitle ? { absolute: page.seoTitle } : page.title, description: page.seoDescription || page.intro } : {}
  }
  return { title: { absolute: cat.seoTitle || `${cat.title} | Region Packaging` }, description: cat.seoDescription || cat.shortDescription }
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params
  const data = await getSiteData()
  const cat = findCategory(data, category)
  if (!cat) {
    // Not a category: a text page from Content > Simple pages.
    const page = data.pages.find((p) => p.slug === category)
    if (!page) notFound()
    return (
      <>
        <PageIntro title={page.title} text={page.intro} />
        <section className="section section--tight">
          <div className="container narrow">
            <RichText doc={page.body} />
          </div>
        </section>
      </>
    )
  }
  const siblings = data.categories.filter((c) => c.kind === cat.kind && c.id !== cat.id).slice(0, 6)
  return <ProductTemplate data={data} page={cat} category={cat} explore={productsIn(data, cat.id)} fallbackRelated={siblings} />
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCategory, getSiteData, primaryCategory, productsIn } from '@/lib/data'
import type { Category, Product, SiteData } from '@/lib/types'
import { RichText } from '@/components/blog/RichText'
import { PageIntro } from '@/components/layout/PageIntro'
import { ProductTemplate } from '@/components/product/ProductTemplate'
import { SubProductTemplate } from '@/components/product/SubProductTemplate'

export const revalidate = 3600

// Categories, sub-products and simple pages all live at your-domain/slug.
// The admin stops two of them from sharing a slug (payload/fields.ts).
type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { categories, products, pages } = await getSiteData()
  return [...categories, ...products, ...pages].map((x) => ({ slug: x.slug }))
}

type Hit = { type: 'category'; cat: Category } | { type: 'product'; prod: Product; cat: Category } | { type: 'page'; page: SiteData['pages'][number] }

function find(data: SiteData, slug: string): Hit | undefined {
  const cat = findCategory(data, slug)
  if (cat) return { type: 'category', cat }
  const prod = data.products.find((p) => p.slug === slug)
  const prodCat = prod && primaryCategory(data, prod)
  if (prod && prodCat) return { type: 'product', prod, cat: prodCat }
  const page = data.pages.find((p) => p.slug === slug)
  return page ? { type: 'page', page } : undefined
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const data = await getSiteData()
  const hit = find(data, slug)
  if (!hit) return {}
  if (hit.type === 'category') {
    const { cat } = hit
    return { title: { absolute: cat.seoTitle || `${cat.title} | Region Packaging` }, description: cat.seoDescription || cat.shortDescription }
  }
  if (hit.type === 'product') {
    const { prod, cat } = hit
    return {
      title: { absolute: prod.seoTitle || `${prod.title} | Region Packaging` },
      description: prod.seoDescription || prod.shortDescription || cat.shortDescription || (cat.kind === 'industry' ? data.settings.subProductDefaults.shortDescription : undefined),
    }
  }
  const { page } = hit
  return { title: page.seoTitle ? { absolute: page.seoTitle } : page.title, description: page.seoDescription || page.intro }
}

export default async function SlugPage({ params }: Params) {
  const { slug } = await params
  const data = await getSiteData()
  const hit = find(data, slug)
  if (!hit) notFound()

  if (hit.type === 'category') {
    const { cat } = hit
    const siblings = data.categories.filter((c) => c.kind === cat.kind && c.id !== cat.id).slice(0, 6)
    return <ProductTemplate data={data} page={cat} category={cat} explore={productsIn(data, cat.id)} fallbackRelated={siblings} />
  }

  if (hit.type === 'product') {
    const { prod, cat } = hit
    // Pages under "Boxes By Industry" use the tabbed sub-product design.
    if (cat.kind === 'industry') return <SubProductTemplate data={data} page={prod} category={cat} />
    const siblings = productsIn(data, cat.id).filter((p) => p.id !== prod.id)
    return <ProductTemplate data={data} page={prod} category={cat} explore={[]} fallbackRelated={siblings} />
  }

  // A text page from Content > Simple pages.
  const { page } = hit
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

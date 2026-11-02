import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCategory, findProduct, getSiteData, productsIn } from '@/lib/data'
import { ProductTemplate } from '@/components/product/ProductTemplate'
import { SubProductTemplate } from '@/components/product/SubProductTemplate'

export const revalidate = 3600

type Params = { params: Promise<{ category: string; product: string }> }

export async function generateStaticParams() {
  const data = await getSiteData()
  return data.categories.flatMap((c) => productsIn(data, c.id).map((p) => ({ category: c.slug, product: p.slug })))
}

async function load(params: Params['params']) {
  const { category, product } = await params
  const data = await getSiteData()
  const cat = findCategory(data, category)
  const prod = cat && findProduct(data, cat, product)
  return { data, cat, prod }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { data, cat, prod } = await load(params)
  if (!cat || !prod) return {}
  return {
    title: { absolute: prod.seoTitle || `${prod.title} | Region Packaging` },
    description: prod.seoDescription || prod.shortDescription || cat.shortDescription || (cat.kind === 'industry' ? data.settings.subProductDefaults.shortDescription : undefined),
  }
}

export default async function ProductPage({ params }: Params) {
  const { data, cat, prod } = await load(params)
  if (!cat || !prod) notFound()
  // Pages under "Boxes By Industry" use the tabbed sub-product design.
  if (cat.kind === 'industry') return <SubProductTemplate data={data} page={prod} category={cat} />
  const siblings = productsIn(data, cat.id).filter((p) => p.id !== prod.id)
  return <ProductTemplate data={data} page={prod} category={cat} explore={[]} fallbackRelated={siblings} />
}

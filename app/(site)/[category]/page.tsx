import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCategory, getSiteData, productsIn } from '@/lib/data'
import { ProductTemplate } from '@/components/product/ProductTemplate'

export const revalidate = 3600

type Params = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const { categories } = await getSiteData()
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params
  const cat = findCategory(await getSiteData(), category)
  if (!cat) return {}
  return { title: { absolute: cat.seoTitle || `${cat.title} | Region Packaging` }, description: cat.seoDescription || cat.shortDescription }
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params
  const data = await getSiteData()
  const cat = findCategory(data, category)
  if (!cat) notFound()
  const siblings = data.categories.filter((c) => c.kind === cat.kind && c.id !== cat.id).slice(0, 6)
  return <ProductTemplate data={data} page={cat} category={cat} explore={productsIn(data, cat.id)} fallbackRelated={siblings} />
}

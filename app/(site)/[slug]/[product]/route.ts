import { getSiteData, hrefFor } from '@/lib/data'

// Sub-products used to live at /category/product. They now live at /product, so old
// links (and anything search engines saved) are sent on with a permanent redirect.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; product: string }> }) {
  const { product } = await params
  const data = await getSiteData()
  const prod = data.products.find((p) => p.slug === product)
  // Unknown box: a temporary hop to /product, which shows the site's own "page not found" page.
  if (!prod) return new Response(null, { status: 307, headers: { Location: `/${encodeURIComponent(product)}` } })
  return new Response(null, { status: 308, headers: { Location: hrefFor(data, prod) } })
}

import type { Metadata } from 'next'
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { RefreshPreview } from '@/components/admin/RefreshPreview'
import { getSiteData } from '@/lib/data'
import { parsePreview, PREVIEW_COOKIE } from '@/lib/preview'
import CategoryPage from '../[category]/page'
import ProductPage from '../[category]/[product]/page'
import AboutPage from '../about/page'
import ArtworkPage from '../artwork-guidelines/page'
import BlogPage from '../blog/page'
import BlogPostPage from '../blog/[slug]/page'
import HomePage from '../page'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Preview', robots: { index: false, follow: false } }

type Props = { searchParams: Promise<{ type?: string; id?: string }> }

function Hint({ text }: { text: string }) {
  return (
    <section className="section">
      <div className="container narrow">
        <p>{text}</p>
      </div>
    </section>
  )
}

/** Renders the page being edited with its draft content, through the same templates as the real site. */
export default async function PreviewPage({ searchParams }: Props) {
  const { type = '', id = '' } = await searchParams
  const target = parsePreview((await cookies()).get(PREVIEW_COOKIE)?.value)
  // Another tab may have ended this preview or be previewing a different page.
  if (!(await draftMode()).isEnabled || target?.type !== type || target.id !== id) redirect(`/api/preview?type=${type}&id=${id}`)

  const data = await getSiteData()
  const has = (list: { id: string }[]) => list.find((d) => d.id === `${type}:${id}`)
  const page = async () => {
    switch (type) {
      case 'categories': {
        const cat = has(data.categories) as (typeof data.categories)[number] | undefined
        return cat ? <CategoryPage params={Promise.resolve({ category: cat.slug })} /> : <Hint text="Start typing on the left and your page will appear here." />
      }
      case 'pages': {
        const doc = has(data.pages) as (typeof data.pages)[number] | undefined
        return doc ? <CategoryPage params={Promise.resolve({ category: doc.slug })} /> : <Hint text="Start typing on the left and your page will appear here." />
      }
      case 'products': {
        const prod = has(data.products) as (typeof data.products)[number] | undefined
        const cat = prod && data.categories.find((c) => prod.categoryIds.includes(c.id))
        if (!prod) return <Hint text="Start typing on the left and your page will appear here." />
        if (!cat) return <Hint text="Choose a category on the left to see this page." />
        return <ProductPage params={Promise.resolve({ category: cat.slug, product: prod.slug })} />
      }
      case 'posts': {
        const post = has(data.posts) as (typeof data.posts)[number] | undefined
        return post ? <BlogPostPage params={Promise.resolve({ slug: post.slug })} /> : <Hint text="Start typing on the left and your article will appear here." />
      }
      case 'about-page':
        return <AboutPage />
      case 'artwork-page':
        return <ArtworkPage />
      case 'blog-page':
        return <BlogPage />
      default:
        return <HomePage />
    }
  }
  return (
    <>
      <RefreshPreview />
      {await page()}
    </>
  )
}

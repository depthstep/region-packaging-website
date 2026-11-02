import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteData } from '@/lib/data'
import { PostCard } from '@/components/blog/PostCard'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600
type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { blogCategories } = await getSiteData()
  return blogCategories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const cat = (await getSiteData()).blogCategories.find((c) => c.slug === slug)
  return cat ? { title: `${cat.title} | Blog`, description: cat.description } : {}
}

/** "View all" for one blog category. */
export default async function BlogCategoryPage({ params }: Params) {
  const { slug } = await params
  const { blogCategories, posts, settings, blog } = await getSiteData()
  const cat = blogCategories.find((c) => c.slug === slug)
  if (!cat) notFound()
  const list = posts.filter((p) => p.categoryId === cat.id)
  return (
    <>
      <section className="blog-hero blog-hero--small">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/blog">{blog.hero.heading || 'Blog'}</Link> / <span aria-current="page">{cat.title}</span>
          </nav>
          <h1>{cat.title}</h1>
          {cat.description && <p>{cat.description}</p>}
        </div>
      </section>
      <section className="section blog-sections">
        <div className="container">
          {list.length ? (
            <div className="grid-3 blog-grid blog-grid--rows">
              {list.map((p) => (
                <PostCard key={p.id} post={p} category={cat} />
              ))}
            </div>
          ) : (
            <p className="blog-empty">No articles in this category yet.</p>
          )}
        </div>
      </section>
      <CtaSection cta={settings.cta} />
    </>
  )
}

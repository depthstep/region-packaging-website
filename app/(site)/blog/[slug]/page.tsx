import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteData } from '@/lib/data'
import { Media } from '@/components/ui/Media'
import { Paragraphs } from '@/components/ui/SectionHeader'

export const revalidate = 3600
type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { posts } = await getSiteData()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = (await getSiteData()).posts.find((p) => p.slug === slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params
  const post = (await getSiteData()).posts.find((p) => p.slug === slug)
  if (!post) notFound()
  return (
    <article className="section section--tight">
      <div className="container article">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/blog">Blogs</Link> / <span aria-current="page">{post.title}</span>
        </nav>
        {post.kicker && <p className="photo-card__kicker">{post.kicker}</p>}
        <h1>{post.title}</h1>
        <div className="rounded-media article__image">
          <Media img={post.image} fallback="Blog photo" sizes="(max-width: 900px) 100vw, 800px" priority />
        </div>
        {post.body?.length ? (
          <Paragraphs items={post.body} />
        ) : (
          <p className="placeholder-text">[Placeholder] Article text to be added in the CMS.</p>
        )}
      </div>
    </article>
  )
}

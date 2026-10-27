import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { PageIntro } from '@/components/layout/PageIntro'
import { PhotoCard } from '@/components/ui/Cards'

export const revalidate = 3600
export const metadata: Metadata = { title: 'Blogs' }

export default async function BlogIndex() {
  const { posts, home } = await getSiteData()
  return (
    <>
      <PageIntro title={home.blog.heading || 'Blogs'} crumb="Blogs" text={home.blog.text} />
      <section className="section section--tight">
        <div className="container grid-3 card-grid">
          {posts.map((p) => (
            <PhotoCard key={p.id} card={{ title: p.title, kicker: p.kicker, linkLabel: home.blog.linkLabel, href: `/blog/${p.slug}`, image: p.image }} />
          ))}
        </div>
      </section>
    </>
  )
}

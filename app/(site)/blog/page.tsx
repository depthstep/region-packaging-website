import type { Metadata } from 'next'
import { getSiteData } from '@/lib/data'
import { BlogIndex } from '@/components/blog/BlogIndex'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { blog } = await getSiteData()
  return { title: blog.seoTitle ? { absolute: blog.seoTitle } : 'Blog', description: blog.seoDescription }
}

export default async function BlogPage() {
  const { blog, posts, blogCategories, blogTopics, settings } = await getSiteData()
  return (
    <>
      <section data-section="hero" className="blog-hero">
        <div className="container">
          <h1>{blog.hero.heading || 'Blog'}</h1>
          {blog.hero.text && <p>{blog.hero.text}</p>}
        </div>
      </section>
      <BlogIndex page={blog} posts={posts} categories={blogCategories} topics={blogTopics} />
      <CtaSection cta={settings.cta} />
    </>
  )
}

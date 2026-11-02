import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteData } from '@/lib/data'
import { withBase } from '@/lib/asset'
import type { BlogPost } from '@/lib/types'
import { telHref } from '@/components/layout/Header'
import { PostCard, postDate } from '@/components/blog/PostCard'
import { RichText, headingsOf } from '@/components/blog/RichText'
import { Toc } from '@/components/blog/Toc'
import { ButtonLink } from '@/components/ui/Button'
import { Social } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CtaSection } from '@/components/sections/CtaSection'

export const revalidate = 3600
type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { posts } = await getSiteData()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = (await getSiteData()).posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.publishedAt, images: post.image?.src ? [post.image.src] : undefined },
  }
}

/** Same category first, then the newest others. */
function related(all: BlogPost[], post: BlogPost) {
  const others = all.filter((p) => p.id !== post.id)
  return [...others.filter((p) => p.categoryId === post.categoryId), ...others.filter((p) => p.categoryId !== post.categoryId)].slice(0, 3)
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const { posts, blogCategories, blog, settings } = await getSiteData()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()
  const cat = blogCategories.find((c) => c.id === post.categoryId)
  const toc = headingsOf(post.body)
  const help = blog.post.help
  const more = related(posts, post)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author || 'Region Packaging' },
    image: post.image?.src,
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="post-hero">
        <div className="container post-hero__grid">
          <div className="post-hero__copy">
            {cat && (
              <Link href={`/blog/category/${cat.slug}`} className="post-hero__cat">
                {cat.title}
              </Link>
            )}
            <h1>{post.title}</h1>
            {post.excerpt && <p className="post-hero__excerpt">{post.excerpt}</p>}
            <div className="post-author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase('/brand/logo-mark-blue.svg')} alt="" width={34} height={34} className="post-author__avatar" />
              <div>
                <p className="post-author__name">{post.author || 'Region Packaging'}</p>
                <p className="post-author__meta">
                  {[post.publishedAt && `Published: ${postDate(post.publishedAt)}`, post.readMinutes && `${post.readMinutes}min read`].filter(Boolean).join(' · ')}
                </p>
              </div>
            </div>
          </div>
          <div className="post-hero__media">
            <Media img={post.image} fallback="Article photo" sizes="(max-width: 900px) 100vw, 545px" priority />
          </div>
        </div>
      </section>

      <section className="post-body">
        <div className="container post-body__grid">
          <article className="post-article">
            {post.body?.root.children?.length ? (
              <RichText doc={post.body} />
            ) : (
              <p className="placeholder-text">[Placeholder] Article text to be added in the CMS.</p>
            )}
          </article>
          <aside className="post-aside">
            <Toc heading={blog.post.tocHeading || 'Contents'} items={toc} />
            {help.heading && (
              <div className="post-help">
                <p className="post-help__title">{help.heading}</p>
                {help.text && <p className="post-help__text">{help.text}</p>}
                {settings.phone && (
                  <>
                    {help.phoneLabel && <p className="post-help__label">{help.phoneLabel}</p>}
                    <a href={telHref(settings.phone)} className="post-help__phone">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={withBase('/icons/phone-white.svg')} alt="" width={20} height={20} />
                      {settings.phone}
                    </a>
                  </>
                )}
                {help.button?.label && (
                  <ButtonLink href={help.button.href} variant="sky" size="sm">
                    {help.button.label}
                  </ButtonLink>
                )}
              </div>
            )}
            {settings.socials.length > 0 && (
              <div className="post-follow">
                <p className="post-follow__title">{blog.post.followLabel || 'Follow us'}</p>
                <ul>
                  {settings.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.url || '#'} aria-label={s.label} target={s.url ? '_blank' : undefined} rel="noopener noreferrer">
                        <Social name={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section section--rule post-more">
          <div className="container">
            <SectionHeader
              eyebrow={blog.post.relatedEyebrow}
              heading={blog.post.relatedHeading || 'Keep reading'}
              align="left"
              aside={
                blog.post.relatedButton?.label && (
                  <ButtonLink href={blog.post.relatedButton.href} variant="outline" size="sm">
                    {blog.post.relatedButton.label}
                  </ButtonLink>
                )
              }
            />
            <div className="grid-3 blog-grid">
              {more.map((p) => (
                <PostCard key={p.id} post={p} category={blogCategories.find((c) => c.id === p.categoryId)} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaSection cta={settings.cta} />
    </>
  )
}

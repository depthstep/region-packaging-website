import Link from 'next/link'
import type { BlogCategory, BlogPost } from '@/lib/types'
import { ArrowUpRight } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'

export const postDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : ''

/** "Region Packaging · 9min read · May 21, 2025" */
export function PostMeta({ post }: { post: BlogPost }) {
  const parts = [post.author || 'Region Packaging', post.readMinutes ? `${post.readMinutes}min read` : '', postDate(post.publishedAt)].filter(Boolean)
  return (
    <p className="post-meta">
      {parts.map((p, i) => (
        <span key={i}>{p}</span>
      ))}
    </p>
  )
}

export function PostCard({ post, category }: { post: BlogPost; category?: BlogCategory }) {
  return (
    <article className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card__link">
        <div className="post-card__media">
          <Media img={post.image} fallback={`${post.title} photo`} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 381px" />
        </div>
        {category && (
          <p className="post-card__cat">
            {category.title} <ArrowUpRight size={16} className="post-card__arrow" />
          </p>
        )}
        <h3>{post.title}</h3>
      </Link>
      <PostMeta post={post} />
    </article>
  )
}

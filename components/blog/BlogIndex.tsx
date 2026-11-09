'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { BlogCategory, BlogPage, BlogPost, BlogTopic } from '@/lib/types'
import { Chevron } from '@/components/ui/glyphs'
import { Media } from '@/components/ui/Media'
import { PostCard, PostMeta } from './PostCard'

type Props = { page: BlogPage; posts: BlogPost[]; categories: BlogCategory[]; topics: BlogTopic[] }

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M11.8 11.8 9.1 9.1m0 0a4.9 4.9 0 1 0-6.9-6.9 4.9 4.9 0 0 0 6.9 6.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/**
 * Everything below the banner on /blog: featured posts (hovering a title swaps the photo),
 * search, topic filters and one section per category. All posts are in the server HTML;
 * search and topics only hide what does not match.
 */
export function BlogIndex({ page, posts, categories, topics }: Props) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<string | null>(null)
  const featured = useMemo(() => {
    const picked = posts.filter((p) => p.featured)
    return (picked.length ? picked : posts).slice(0, 4)
  }, [posts])
  const [active, setActive] = useState(0)
  const catOf = (p: BlogPost) => categories.find((c) => c.id === p.categoryId)

  const q = query.trim().toLowerCase()
  const visible = posts.filter((p) => (!topic || p.topicIds.includes(topic)) && (!q || [p.title, p.excerpt, catOf(p)?.title].some((s) => s?.toLowerCase().includes(q))))
  const lead = featured[active] ?? featured[0]

  return (
    <>
      <section data-section="searchPlaceholder" className="section blog-featured">
        <div className="container">
          <header className="blog-featured__head">
            <h2>{q ? `Results for “${query.trim()}”` : page.featuredHeading || 'Featured posts'}</h2>
            <form className="blog-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="blog-search">
                Search the blog
              </label>
              <input id="blog-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={page.searchPlaceholder || 'Search articles'} />
              <SearchIcon />
            </form>
          </header>

          {q ? (
            visible.length ? (
              <div className="grid-3 blog-grid">
                {visible.map((p) => (
                  <PostCard key={p.id} post={p} category={catOf(p)} />
                ))}
              </div>
            ) : (
              <p className="blog-empty">No articles match that search yet.</p>
            )
          ) : (
            lead && (
              <div className="blog-featured__grid">
                <Link href={`/blog/${lead.slug}`} className="blog-featured__media" tabIndex={-1} aria-hidden="true">
                  <Media img={lead.image} fallback="Featured post photo" sizes="(max-width: 900px) 100vw, 652px" priority />
                </Link>
                <ul className="blog-featured__list">
                  {featured.map((p, i) => (
                    <li key={p.id} className={i === active ? 'is-active' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                      {catOf(p) && <p className="post-card__cat">{catOf(p)!.title}</p>}
                      <h3>
                        <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <PostMeta post={p} />
                      <span className="blog-featured__dot" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>

      {!q && (
        <section className="section section--rule blog-sections">
          <div className="container">
            {topics.length > 0 && (
              <div className="blog-topics" role="group" aria-label="Filter by topic">
                {topics.map((t) => (
                  <button key={t.id} type="button" className={`blog-topic ${topic === t.id ? 'is-active' : ''}`} aria-pressed={topic === t.id} onClick={() => setTopic(topic === t.id ? null : t.id)}>
                    {t.title}
                  </button>
                ))}
              </div>
            )}
            {categories.map((c) => {
              const inCat = visible.filter((p) => p.categoryId === c.id)
              if (!inCat.length) return null
              return (
                <section key={c.id} className="blog-cat" aria-labelledby={`cat-${c.slug}`}>
                  <h2 id={`cat-${c.slug}`}>{c.title}</h2>
                  {c.description && <p className="blog-cat__text">{c.description}</p>}
                  <div className="grid-3 blog-grid">
                    {inCat.slice(0, 3).map((p) => (
                      <PostCard key={p.id} post={p} category={c} />
                    ))}
                  </div>
                  <Link href={`/blog/category/${c.slug}`} className="blog-view-all">
                    {page.viewAllLabel || 'View all'}
                    <Chevron size={10} />
                  </Link>
                </section>
              )
            })}
            {topic && !categories.some((c) => visible.some((p) => p.categoryId === c.id)) && <p className="blog-empty">No articles on this topic yet.</p>}
          </div>
        </section>
      )}
    </>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import type { Card } from '@/lib/types'
import { PageIntro } from '@/components/layout/PageIntro'
import { PhotoCard } from '@/components/ui/Cards'
import { ButtonLink } from '@/components/ui/Button'

type Props = { cards: (Card & { id: string })[]; children: React.ReactNode }

/** Shows search results for ?q= (filtered in the browser), otherwise the full product listing passed as children. */
export function ProductSearch({ cards, children }: Props) {
  const q = (useSearchParams().get('q') || '').trim()
  if (!q) return children

  const query = q.toLowerCase()
  const hits = cards.filter((c) => c.title.toLowerCase().includes(query))
  return (
    <>
      <PageIntro title={`Search: “${q}”`} crumb="Search" text={`${hits.length} result${hits.length === 1 ? '' : 's'}`} />
      <section className="section section--tight">
        <div className="container">
          {hits.length ? (
            <div className="grid-3 card-grid">
              {hits.map((h) => (
                <PhotoCard key={h.id} card={h} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products match that search.</p>
              <ButtonLink href="/products" variant="outline" size="sm">
                View All Products
              </ButtonLink>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

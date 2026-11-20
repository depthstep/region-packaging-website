import type { Review, SiteSettings } from '@/lib/types'
import { ReviewCard } from '@/components/ui/Cards'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function ReviewsSection({ settings, reviews }: { settings: SiteSettings; reviews: Review[] }) {
  if (!reviews.length) return null
  const { reviewsSection } = settings
  return (
    <section data-section="reviewsSection" className="section" id="reviews">
      <div className="container">
        <SectionHeader {...reviewsSection} />
        {/* The Google rating bar was removed from the whole site (SEO team, 20 Nov 2026). */}
        <div className="grid-3 reviews-grid">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Review, SiteSettings } from '@/lib/types'
import { GoogleG, ReviewCard } from '@/components/ui/Cards'
import { Stars } from '@/components/ui/glyphs'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function ReviewsSection({ settings, reviews }: { settings: SiteSettings; reviews: Review[] }) {
  if (!reviews.length) return null
  const { google, reviewsSection } = settings
  return (
    <section className="section" id="reviews">
      <div className="container">
        <SectionHeader {...reviewsSection} />
        <div className="rating-bar">
          <GoogleG />
          <span className="rating-bar__score">{google.score}</span>
          <div>
            <Stars size={26} />
            <p>
              <strong>{google.label}</strong> · {google.countText}
            </p>
          </div>
          {reviewsSection.buttonLabel &&
            (google.reviewUrl ? (
              <a className="btn btn--outline btn--sm rating-bar__button" href={google.reviewUrl} target="_blank" rel="noreferrer">
                {reviewsSection.buttonLabel}
              </a>
            ) : (
              <span className="btn btn--outline btn--sm rating-bar__button" aria-disabled="true" title="Add the Google review link in Site settings">
                {reviewsSection.buttonLabel}
              </span>
            ))}
        </div>
        <div className="grid-3 reviews-grid">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import type { Card, IconItem, Review } from '@/lib/types'
import { ArrowRight, Stars } from './glyphs'
import { Icon, Media } from './Media'

/** Photo card with title, text and an "Explore ... →" link (Choose your box, Explore styles, Related). */
export function PhotoCard({ card, headingLevel = 'h3' }: { card: Card; headingLevel?: 'h3' | 'h4' }) {
  const H = headingLevel
  const body = (
    <>
      <div className="photo-card__image">
        <Media img={card.image} fallback={`${card.title} photo`} sizes="(max-width: 900px) 100vw, 380px" />
      </div>
      {card.kicker && <p className="photo-card__kicker">{card.kicker}</p>}
      <H className="photo-card__title">{card.title}</H>
      {card.text && <p className="photo-card__text">{card.text}</p>}
      {card.linkLabel && (
        <span className="text-link">
          {card.linkLabel} <ArrowRight />
        </span>
      )}
    </>
  )
  return card.href ? (
    <Link href={card.href} className="photo-card">
      {body}
    </Link>
  ) : (
    <div className="photo-card">{body}</div>
  )
}

/** Beige rounded card with an icon, title and text. */
export function FeatureCard({ item }: { item: IconItem }) {
  return (
    <div className="feature-card">
      <Icon img={item.icon} size={32} label={item.title} />
      <h4>{item.title}</h4>
      {item.text && <p>{item.text}</p>}
    </div>
  )
}

const GoogleG = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/google-g.png" alt="Google" width={24} height={24} className="google-g" />
)

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review-card">
      <div className="review-card__head">
        <div className="review-card__avatar">
          <Media img={review.avatar} fallback="Avatar" sizes="48px" />
        </div>
        <div>
          <p className="review-card__name">{review.name}</p>
          {review.role && <p className="review-card__role">{review.role}</p>}
        </div>
        <GoogleG />
      </div>
      <p className="review-card__meta">
        <Stars count={review.rating} size={18} />
        {review.dateText && <span>· {review.dateText}</span>}
      </p>
      <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
      {review.source && <figcaption>{review.source}</figcaption>}
    </figure>
  )
}

export { GoogleG }

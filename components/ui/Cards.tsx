import Link from 'next/link'
import { withBase } from '@/lib/asset'
import type { Card, IconItem, Review } from '@/lib/types'
import { ArrowRight, Stars } from './glyphs'
import { Icon, Media } from './Media'

/** Photo card with title, text and an "Explore ... →" link (Choose your box, Explore styles, Related).
 *  On hover (Figma): the photo fades under a beige layer with a box icon and a ↗ arrow in the corner.
 *  Article cards (with a kicker line) show the layer and arrow without the box icon. */
export function PhotoCard({ card, headingLevel = 'h3' }: { card: Card; headingLevel?: 'h3' | 'h4' }) {
  const H = headingLevel
  const body = (
    <>
      <div className="photo-card__image">
        <Media img={card.image} fallback={`${card.title} photo`} sizes="(max-width: 900px) 100vw, 380px" />
        {card.href && (
          <span className="photo-card__hover" aria-hidden="true">
            {!card.kicker && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withBase('/icons/step-choose-box.svg')} alt="" width={100} height={100} className="photo-card__icon" />
            )}
            <svg className="photo-card__arrow" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M5 17 17 5M8 5h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
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
  <img src={withBase('/icons/google-g.png')} alt="Google" width={24} height={24} className="google-g" />
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

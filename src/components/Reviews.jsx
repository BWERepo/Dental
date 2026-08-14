import { business } from '../config/business'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './Reviews.css'

/** Five stars, filled up to the score. Half marks round to the nearest star. */
function Stars({ score, tone = 'light' }) {
  const filled = Math.round(score)

  return (
    <span className={`stars stars--${tone}`} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((position) => (
        <Icon key={position} name="star" className={position <= filled ? 'is-on' : 'is-off'} />
      ))}
    </span>
  )
}

/**
 * Renders nothing unless there are reviews in `reviews.items`. Every quote here
 * is invented for the prototype, which is why the section wears a Sample chip
 * and never claims to be quoting Google or any other platform.
 */
export default function Reviews() {
  const { reviews, rating } = business

  if (!reviews?.items?.length) return null

  return (
    <section className="section section--neutral" id="reviews">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={5}
            eyebrow={reviews.eyebrow}
            heading={reviews.heading}
            align="center"
          />
        </Reveal>

        {rating && (
          <Reveal delay={60}>
            <div className="reviews__rating">
              <Stars score={rating.score} />
              <p className="reviews__rating-text">
                <strong>{rating.score.toFixed(1)}</strong>
                <span>
                  from {rating.count} {rating.sourceLabel}
                </span>
              </p>
              {rating.sample && <SampleChip label="Sample rating" />}
            </div>
          </Reveal>
        )}

        <div className="reviews__grid">
          {reviews.items.map((item, index) => (
            <Reveal key={item.name} delay={index * 70}>
              <figure className="review">
                <Stars score={5} />
                <blockquote className="review__quote">{item.quote}</blockquote>
                <figcaption className="review__by">
                  <span className="review__name">{item.name}</span>
                  {item.context && <span className="review__context">{item.context}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {reviews.sample && (
          <Reveal>
            <p className="reviews__note">
              <SampleChip />
              These reviews are written for this demonstration. They are not real patients and did
              not come from any review platform.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

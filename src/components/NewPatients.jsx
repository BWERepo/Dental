import { business } from '../config/business'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './NewPatients.css'

/**
 * The conversion block directly under the hero: the offer, the answer for
 * people without insurance, and the nudge to book. One card is `featured`,
 * which is what stops three equal cards reading as a price list.
 */
export default function NewPatients() {
  const { newPatients } = business

  if (!newPatients?.cards?.length) return null

  return (
    <section className="section new-patients" id="new-patients">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={1}
            eyebrow={newPatients.eyebrow}
            heading={newPatients.heading}
            intro={newPatients.intro}
          />
        </Reveal>

        <div className="new-patients__grid">
          {newPatients.cards.map((card, index) => (
            <Reveal key={card.id} delay={index * 80}>
              <article
                className={`np-card ${card.featured ? 'np-card--featured grain' : ''}`.trim()}
              >
                <p className="np-card__kicker">
                  {card.kicker}
                  {card.sample && <SampleChip tone={card.featured ? 'dark' : 'light'} />}
                </p>

                <h3 className="np-card__title">{card.title}</h3>

                {card.price && (
                  <p className="np-card__price">
                    <span className="np-card__price-value">{card.price}</span>
                    {card.priceNote && (
                      <span className="np-card__price-note">{card.priceNote}</span>
                    )}
                  </p>
                )}

                <p className="np-card__detail">{card.detail}</p>

                <Button
                  href={card.ctaHref || '#book'}
                  variant={card.featured ? 'onBrand' : 'secondary'}
                  icon={card.ctaHref ? 'arrow' : 'calendar'}
                  className="np-card__cta"
                >
                  {card.cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="new-patients__hours">
            <Icon name="clock" />
            {business.hoursSummary} · {business.hours[0]?.time}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

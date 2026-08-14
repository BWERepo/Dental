import { business } from '../config/business'
import Button from './ui/Button'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <img
          src={business.hero.image}
          alt={business.hero.imageAlt}
          fetchPriority="high"
          width="1600"
          height="1067"
        />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            {business.city} · {business.type}
          </p>

          <h1 className="hero__title">{business.hero.heading}</h1>

          <p className="hero__supporting">{business.hero.supporting}</p>

          <div className="hero__actions">
            <Button href={`tel:${business.phoneLink}`}>{business.primaryCta}</Button>
            <Button href="#contact" variant="onDark">
              {business.secondaryCta}
            </Button>
          </div>

          <p className="hero__trust">
            <span>{business.hoursSummary}</span>
            <span className="hero__trust-dot" aria-hidden="true" />
            <span>{business.address}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

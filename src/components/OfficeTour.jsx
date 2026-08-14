import { business } from '../config/business'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './OfficeTour.css'

/**
 * A look around before you arrive. Items marked `span: 'wide'` in the config
 * take two columns, which is what keeps the grid from reading as a contact
 * sheet of identical stock photographs.
 */
export default function OfficeTour() {
  const { officeTour } = business

  if (!officeTour?.areas?.length) return null

  return (
    <section className="section office-tour" id="tour">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={7}
            eyebrow={officeTour.eyebrow}
            heading={officeTour.heading}
            intro={officeTour.intro}
          />
        </Reveal>

        <div className="office-tour__grid">
          {officeTour.areas.map((area, index) => (
            <Reveal
              key={area.title}
              delay={index * 70}
              className={`office-tour__cell ${
                area.span === 'wide' ? 'office-tour__cell--wide' : ''
              }`.trim()}
            >
              <figure className="tour-card">
                <div className="tour-card__media">
                  <img src={area.image} alt={area.alt} loading="lazy" width="1200" height="800" />
                </div>
                <figcaption className="tour-card__body">
                  <h3 className="tour-card__title">{area.title}</h3>
                  <p className="tour-card__detail">{area.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="office-tour__cta">
            <Button href="#book" icon="calendar">
              {officeTour.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

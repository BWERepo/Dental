import { business } from '../config/business'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './WhyChooseUs.css'

export default function WhyChooseUs() {
  const { eyebrow, heading, points } = business.whyChooseUs

  if (!points.length) return null

  return (
    <section className="section" id="why">
      <div className="container">
        <Reveal>
          <SectionHeading index={3} eyebrow={eyebrow} heading={heading} />
        </Reveal>

        <div className="why__grid">
          {points.map((point, index) => (
            <Reveal key={point.label} delay={index * 80}>
              <div className="why__item">
                <span className="why__number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="why__label">{point.label}</h3>
                <p className="why__detail">{point.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

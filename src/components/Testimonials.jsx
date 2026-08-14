import { business } from '../config/business'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './Testimonials.css'

/**
 * Renders nothing at all unless real reviews have been added to
 * `testimonials` in src/config/business.js. No invented quotes, no filler.
 */
export default function Testimonials() {
  const { testimonials } = business

  if (!testimonials.length) return null

  return (
    <section className="section section--neutral" id="reviews">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="In patients’ words" heading="What people tell us" align="center" />
        </Reveal>

        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <Reveal key={item.quote.slice(0, 32)} delay={index * 90}>
              <figure className="testimonial">
                <blockquote className="testimonial__quote">“{item.quote}”</blockquote>
                {item.name && <figcaption className="testimonial__name">{item.name}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

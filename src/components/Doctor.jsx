import { business } from '../config/business'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './Doctor.css'

/**
 * Meet the dentist.
 *
 * When `doctor.image` is empty the portrait slot becomes a designed monogram
 * instead of a photograph. That is deliberate: attaching a stock photograph of
 * a real person to an invented name and an invented CV is the one shortcut a
 * prototype must not take.
 */
export default function Doctor() {
  const { doctor } = business

  if (!doctor?.name) return null

  return (
    <section className="section doctor" id="dentist">
      <div className="container doctor__grid">
        <Reveal className="doctor__portrait-col">
          <figure className="doctor__portrait">
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.imageAlt} loading="lazy" />
            ) : (
              <div className="doctor__monogram grain" aria-hidden="true">
                <span>{doctor.initials}</span>
              </div>
            )}

            <figcaption className="doctor__plate">
              <span className="doctor__plate-name">{doctor.name}</span>
              <span className="doctor__plate-role">{doctor.credentialLine}</span>
              {doctor.sample && <SampleChip label="Sample dentist" />}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="doctor__body" delay={80}>
          <SectionHeading index={4} eyebrow={doctor.eyebrow} heading={doctor.heading} />

          {doctor.quote && <blockquote className="doctor__quote">{doctor.quote}</blockquote>}

          {doctor.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="doctor__text">
              {paragraph}
            </p>
          ))}

          {doctor.credentials?.length > 0 && (
            <dl className="doctor__credentials">
              {doctor.credentials.map((item) => (
                <div key={item.label}>
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
          )}

          <Button href="#book" icon="calendar" className="doctor__cta">
            {doctor.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

import { business } from '../config/business'
import { directionsHref, smsHref, telHref, whatsappHref } from '../lib/contact'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './Contact.css'

export default function Contact() {
  const { cta } = business

  /*
   * Every way to reach the practice, in the order we want them tried. A
   * channel that is not filled in in the config simply is not in this list.
   */
  const actions = [
    telHref && {
      id: 'call',
      href: telHref,
      icon: 'phone',
      title: 'Call the practice',
      detail: business.phoneDisplay,
    },
    smsHref() && {
      id: 'sms',
      href: smsHref(),
      icon: 'sms',
      title: 'Text us',
      detail: 'Answered during opening hours',
    },
    whatsappHref() && {
      id: 'whatsapp',
      href: whatsappHref(),
      icon: 'whatsapp',
      title: 'WhatsApp',
      detail: 'Send a photo if something looks wrong',
      external: true,
    },
    business.email && {
      id: 'email',
      href: `mailto:${business.email}`,
      icon: 'mail',
      title: 'Email',
      detail: business.email,
    },
    directionsHref && {
      id: 'visit',
      href: directionsHref,
      icon: 'pin',
      title: 'Visit',
      detail: business.address,
      external: true,
    },
  ].filter(Boolean)

  return (
    <section className="section section--neutral" id="contact">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={12}
            eyebrow="Get in touch"
            heading="Reach us however suits you"
            intro="Call during opening hours and you will usually speak to someone straight away. Prefer to type? Text or WhatsApp us and we reply the same working day."
          />
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__details">
            <div className="contact__actions">
              {actions.map((action) => (
                <a
                  key={action.id}
                  className={`contact__action contact__action--${action.id}`}
                  href={action.href}
                  {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="contact__action-icon">
                    <Icon name={action.icon} />
                  </span>
                  <span className="contact__action-text">
                    <strong>{action.title}</strong>
                    {action.detail}
                  </span>
                  <Icon name="arrow" className="contact__action-arrow" />
                </a>
              ))}
            </div>

            {directionsHref && (
              <Button href={directionsHref} variant="secondary" external className="btn--block">
                {cta.directions}
              </Button>
            )}
          </Reveal>

          {/* --- Hours ------------------------------------------------------ */}
          <Reveal className="contact__hours" delay={80}>
            <h3 className="contact__hours-title">
              <Icon name="clock" />
              Opening hours
            </h3>

            <dl>
              {business.hours.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>

            <div className="contact__hours-cta">
              <p>Outside these hours, send a message and we will pick it up first thing.</p>
              <Button href="#book" icon="calendar" className="btn--block">
                {cta.book}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { business } from '../config/business'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './Contact.css'

const icons = {
  phone: 'M4.5 3h3l1.5 4-2 1.2a11 11 0 0 0 4.8 4.8L13 11l4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A13.5 13.5 0 0 1 3 4.7 1.5 1.5 0 0 1 4.5 3Z',
  mail: 'M3 5.5h14v9H3v-9Zm0 .5 7 5 7-5',
  chat: 'M3.5 15.5 4.6 12A6.4 6.4 0 1 1 8 15.4l-4.5.1Z',
  pin: 'M10 2.8a5 5 0 0 1 5 5c0 3.5-5 9.4-5 9.4s-5-5.9-5-9.4a5 5 0 0 1 5-5Zm0 3.4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Z',
}

function Icon({ name }) {
  return (
    <svg className="contact__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d={icons[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')

  const directionsHref =
    business.mapsLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            heading="Book a visit"
            intro="Call during opening hours and you will usually speak to someone straight away."
          />
        </Reveal>

        <div className="contact__grid">
          {/* --- Details ---------------------------------------------------- */}
          <Reveal className="contact__details">
            <div className="contact__actions">
              <a className="contact__action" href={`tel:${business.phoneLink}`}>
                <Icon name="phone" />
                <span>
                  <strong>Call the practice</strong>
                  {business.phoneDisplay}
                </span>
              </a>

              {business.whatsapp && (
                <a
                  className="contact__action"
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="chat" />
                  <span>
                    <strong>WhatsApp</strong>
                    Message us
                  </span>
                </a>
              )}

              <a className="contact__action" href={`mailto:${business.email}`}>
                <Icon name="mail" />
                <span>
                  <strong>Email</strong>
                  {business.email}
                </span>
              </a>

              <a
                className="contact__action"
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="pin" />
                <span>
                  <strong>Visit</strong>
                  {business.address}
                </span>
              </a>
            </div>

            <div className="contact__hours">
              <h3 className="contact__hours-title">Opening hours</h3>
              <dl>
                {business.hours.map((row) => (
                  <div key={row.days}>
                    <dt>{row.days}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Button href={directionsHref} variant="secondary" external className="btn--block">
              Get directions
            </Button>
          </Reveal>

          {/* --- Form ------------------------------------------------------- */}
          <Reveal className="contact__form-wrap" delay={80}>
            {sent ? (
              <div className="contact__sent" role="status">
                <h3>Thanks{name ? `, ${name.split(' ')[0]}` : ''}.</h3>
                <p>
                  This form is not connected to email yet, so nothing has been sent. Call{' '}
                  <a href={`tel:${business.phoneLink}`}>{business.phoneDisplay}</a> or email{' '}
                  <a href={`mailto:${business.email}`}>{business.email}</a> and we will pick it up
                  straight away.
                </p>
                <Button variant="secondary" onClick={() => setSent(false)}>
                  Back to the form
                </Button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" required />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="message">What do you need?</label>
                  <textarea id="message" name="message" rows="4" />
                </div>

                <Button type="submit" className="btn--block">
                  Send message
                </Button>
                <p className="contact__note">
                  Prefer to talk? Call {business.phoneDisplay} during opening hours.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

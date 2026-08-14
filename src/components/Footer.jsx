import { business } from '../config/business'
import { smsHref, telHref, whatsappHref } from '../lib/contact'
import Button from './ui/Button'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { finalCta, cta } = business

  return (
    <footer className="footer grain">
      {/* The closing panel lifts up over the section above it, so the page
          ends on the booking ask rather than on small print. */}
      <div className="container">
        <div className="footer__cta grain">
          <div className="footer__cta-copy">
            <h2 className="footer__cta-heading">{finalCta.heading}</h2>
            <p>{finalCta.text}</p>
            {finalCta.supporting && <p className="footer__cta-supporting">{finalCta.supporting}</p>}
          </div>

          <div className="footer__cta-actions">
            <Button href="#book" variant="onBrand" icon="calendar">
              {cta.book}
            </Button>
            {whatsappHref() ? (
              <Button href={whatsappHref()} variant="onDark" icon="whatsapp" external>
                {cta.whatsapp}
              </Button>
            ) : (
              smsHref() && (
                <Button href={smsHref()} variant="onDark" icon="sms">
                  {cta.text}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__name">{business.name}</p>
          <p className="footer__tagline">{business.tagline}</p>
        </div>

        <div className="footer__block">
          <h2 className="footer__title">Contact</h2>
          <ul>
            {telHref && (
              <li>
                <a href={telHref}>{business.phoneDisplay}</a>
              </li>
            )}
            {smsHref() && (
              <li>
                <a href={smsHref()}>{business.cta.text}</a>
              </li>
            )}
            {whatsappHref() && (
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  {business.cta.whatsapp}
                </a>
              </li>
            )}
            {business.email && (
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
            )}
          </ul>
        </div>

        <div className="footer__block">
          <h2 className="footer__title">Find us</h2>
          <p className="footer__text">{business.address}</p>
        </div>

        <div className="footer__block">
          <h2 className="footer__title">Hours</h2>
          <ul>
            {business.hours.map((row) => (
              <li key={row.days}>
                <span>{row.days}</span>
                <span className="footer__time">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {business.name}
        </p>
        <p>{business.city}</p>
      </div>
    </footer>
  )
}

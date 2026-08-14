import { business } from '../config/business'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__name">{business.name}</p>
          <p className="footer__tagline">{business.tagline}</p>
        </div>

        <div className="footer__block">
          <h2 className="footer__title">Contact</h2>
          <ul>
            <li>
              <a href={`tel:${business.phoneLink}`}>{business.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
            {business.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
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

import './ServiceCard.css'

/**
 * Large image card used in the services grid. The whole card is a link down to
 * the contact section, so tapping any service goes somewhere useful.
 */
export default function ServiceCard({ title, description, image, alt }) {
  return (
    <a className="service-card" href="#contact">
      <div className="service-card__media">
        <img src={image} alt={alt} loading="lazy" width="800" height="600" />
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__text">{description}</p>
        <span className="service-card__link">
          Ask about this
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path
              d="M4 10h11M11 5.5 15.5 10 11 14.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  )
}

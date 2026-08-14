import Icon from './Icon'
import './ServiceCard.css'

/**
 * Large image card used in the services grid. The whole card is a link to the
 * booking section, so tapping any service goes somewhere useful.
 */
export default function ServiceCard({ title, description, image, alt, icon, urgent, index }) {
  return (
    <a className={`service-card ${urgent ? 'service-card--urgent' : ''}`} href="#book">
      <div className="service-card__media">
        <img src={image} alt={alt} loading="lazy" width="800" height="600" />
        {index != null && (
          <span className="service-card__index" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
        )}
        {icon && (
          <span className="service-card__badge" aria-hidden="true">
            <Icon name={icon} />
          </span>
        )}
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__text">{description}</p>
        <span className="service-card__link">
          Book this
          <Icon name="arrow" />
        </span>
      </div>
    </a>
  )
}

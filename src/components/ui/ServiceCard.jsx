import Icon from './Icon'
import './ServiceCard.css'

/**
 * Large image card used in the services grid. The whole card is a link to that
 * service's own page, so tapping a service goes somewhere that answers the
 * question rather than straight to a booking form.
 */
export default function ServiceCard({
  title,
  description,
  image,
  alt,
  icon,
  urgent,
  index,
  href = '#book',
  cta = 'Learn more',
}) {
  return (
    <a className={`service-card ${urgent ? 'service-card--urgent' : ''}`} href={href}>
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
          {cta}
          <Icon name="arrow" />
        </span>
      </div>
    </a>
  )
}

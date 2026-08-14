import { business } from '../config/business'
import { directionsHref, smsHref, telHref, whatsappHref } from '../lib/contact'
import Button from './ui/Button'
import Icon from './ui/Icon'
import './Hero.css'

/**
 * A split hero: the words get their own dark ground on the left, the portrait
 * keeps its full height on the right.
 *
 * This is deliberate rather than decorative. A portrait cropped into a wide
 * full-bleed band turns into a giant head with nowhere clean for the headline —
 * the type ends up sitting on a cheek. Giving the photograph its own column
 * lets it stay a portrait and lets the copy sit on a solid colour, which is
 * also the only way the contrast is guaranteed rather than lucky.
 */
export default function Hero() {
  const { cta, hero } = business

  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__pane grain">
          <div className="hero__content">
            <p className="hero__eyebrow">
              {business.city} · {business.type}
            </p>

            <h1 className="hero__title">{hero.heading}</h1>

            <p className="hero__supporting">{hero.supporting}</p>

            <div className="hero__actions">
              <Button href="#book" icon="calendar">
                {cta.book}
              </Button>
              {telHref && (
                <Button href={telHref} variant="onDark" icon="phone">
                  {cta.call}
                </Button>
              )}
            </div>

            {/* The quiet, one-tap alternatives for anyone who would rather not
                speak to a person. Each only renders if it is configured. */}
            {(smsHref() || whatsappHref()) && (
              <p className="hero__channels">
                <span className="hero__channels-label">or message us</span>
                {smsHref() && (
                  <a className="hero__channel" href={smsHref()}>
                    <Icon name="sms" />
                    {cta.text}
                  </a>
                )}
                {whatsappHref() && (
                  <a
                    className="hero__channel hero__channel--whatsapp"
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" />
                    {cta.whatsapp}
                  </a>
                )}
              </p>
            )}

            {hero.trustLine?.length > 0 && (
              <ul className="hero__proof">
                {hero.trustLine.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="hero__media">
          <img
            src={hero.image}
            alt={hero.imageAlt}
            style={hero.imageFocus ? { objectPosition: hero.imageFocus } : undefined}
            fetchPriority="high"
            width="1280"
            height="676"
          />

          {/* --- Glass card: the three things people scan a clinic site for --
              It floats on the photograph on desktop and drops below it on a
              phone, where there is no room to overlay anything. */}
          <aside className="hero__card">
            <p className="hero__card-label">{hero.cardLabel}</p>

            <dl className="hero__card-hours">
              {business.hours.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>

            {directionsHref && (
              <a
                className="hero__card-link"
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="pin" />
                <span>{business.address}</span>
                <Icon name="arrow" className="hero__card-arrow" />
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}

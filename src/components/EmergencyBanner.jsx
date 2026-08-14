import { business } from '../config/business'
import { telHref } from '../lib/contact'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import './EmergencyBanner.css'

/**
 * A slim interruption in the middle of the page for the one visitor who is not
 * browsing: somebody in pain right now. Warm, not violet, so it reads as
 * urgent without becoming another promotional block.
 */
export default function EmergencyBanner() {
  const { emergency } = business

  if (!emergency?.heading || !telHref) return null

  return (
    <section className="emergency" aria-labelledby="emergency-heading">
      <div className="container">
        <Reveal className="emergency__inner grain">
          <span className="emergency__mark" aria-hidden="true">
            <Icon name="emergency" />
          </span>

          <div className="emergency__copy">
            <h2 className="emergency__heading" id="emergency-heading">
              {emergency.heading}
            </h2>
            <p className="emergency__detail">{emergency.detail}</p>
          </div>

          <Button href={telHref} variant="onBrand" icon="phone" className="emergency__cta">
            {emergency.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

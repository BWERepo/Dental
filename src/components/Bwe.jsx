import { business } from '../config/business'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import './Bwe.css'

/**
 * The only part of the site that is about the agency rather than the practice.
 * It sits at the very bottom, after the visitor has seen everything, and it
 * doubles as the plain-English statement that this practice is not real.
 */
export default function Bwe() {
  const { bwe, isPrototype, prototypeNote } = business

  if (!bwe?.heading) return null

  return (
    <section className="section bwe" id="bwe">
      <div className="container">
        <Reveal>
          <div className="bwe__panel grain">
            <div className="bwe__copy">
              <p className="bwe__tab">{bwe.tabLabel}</p>
              <h2 className="bwe__heading">{bwe.heading}</h2>
              <p className="bwe__intro">{bwe.intro}</p>

              <div className="bwe__actions">
                <Button href={bwe.ctaHref} variant="onBrand" icon="spark" external>
                  {bwe.cta}
                </Button>
                <Button href={bwe.secondaryHref} variant="onDark" external>
                  {bwe.secondary}
                </Button>
              </div>
            </div>

            <ul className="bwe__bullets">
              {bwe.bullets.map((bullet) => (
                <li key={bullet}>
                  <Icon name="check" />
                  {bullet}
                </li>
              ))}
            </ul>

            <p className="bwe__closing">{bwe.closing}</p>
          </div>
        </Reveal>

        {isPrototype && (
          <Reveal>
            <p className="bwe__notice">{prototypeNote}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

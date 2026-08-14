import { business } from '../config/business'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './Financing.css'

/**
 * Payment options. The monthly figure is illustrative arithmetic, not an offer
 * of credit, and it carries a Sample chip saying exactly that.
 */
export default function Financing() {
  const { financing } = business

  if (!financing?.options?.length) return null

  return (
    <section className="section section--glow financing" id="financing">
      <div className="container financing__grid">
        <Reveal className="financing__intro">
          <SectionHeading
            index={9}
            eyebrow={financing.eyebrow}
            heading={financing.heading}
            intro={financing.intro}
          />

          {financing.example && (
            <div className="financing__example grain">
              <p className="financing__example-amount">{financing.example.amount}</p>
              <p className="financing__example-detail">{financing.example.detail}</p>
              <p className="financing__example-note">
                {financing.sample && <SampleChip tone="dark" />}
                {financing.example.note}
              </p>
            </div>
          )}

          <Button href="#book" icon="calendar" className="financing__cta">
            {financing.cta}
          </Button>
        </Reveal>

        <Reveal className="financing__options" delay={80}>
          <ul>
            {financing.options.map((option) => (
              <li key={option.title}>
                <span className="financing__tick" aria-hidden="true">
                  <Icon name="check" />
                </span>
                <div>
                  <h3 className="financing__option-title">{option.title}</h3>
                  <p className="financing__option-detail">{option.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

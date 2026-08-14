import { useState } from 'react'
import { business } from '../config/business'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import { telHref } from '../lib/contact'
import './Insurance.css'

const NO_INSURANCE = '__none__'

/**
 * The insurance checker.
 *
 * It looks up nothing. Selecting a provider returns the wording from the config
 * with the name dropped in, and says so underneath — a prototype must not tell
 * somebody their plan is accepted when no such practice exists.
 */
export default function Insurance() {
  const { insurance } = business
  const [selected, setSelected] = useState(null)

  if (!insurance?.providers?.length) return null

  const message =
    selected === NO_INSURANCE
      ? insurance.noneResult
      : selected
        ? insurance.result.replace('{provider}', selected)
        : null

  return (
    <section className="section insurance" id="insurance">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={8}
            eyebrow={insurance.eyebrow}
            heading={insurance.heading}
            intro={insurance.intro}
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="insurance__panel">
            <div className="insurance__providers" role="group" aria-label="Choose your insurer">
              {insurance.providers.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className={`insurance__provider ${selected === provider ? 'is-selected' : ''}`}
                  aria-pressed={selected === provider}
                  onClick={() => setSelected(provider)}
                >
                  {provider}
                </button>
              ))}

              <button
                type="button"
                className={`insurance__provider insurance__provider--none ${
                  selected === NO_INSURANCE ? 'is-selected' : ''
                }`}
                aria-pressed={selected === NO_INSURANCE}
                onClick={() => setSelected(NO_INSURANCE)}
              >
                {insurance.noInsuranceLabel}
              </button>
            </div>

            {/* Announced politely, so a screen reader hears the answer without
                being interrupted mid-sentence. */}
            <div className="insurance__result" role="status" aria-live="polite">
              {message ? (
                <>
                  <span className="insurance__result-mark" aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  <div>
                    <p className="insurance__result-text">{message}</p>
                    <p className="insurance__result-note">
                      {insurance.sample && <SampleChip />}
                      {insurance.note}
                    </p>
                  </div>
                </>
              ) : (
                <p className="insurance__result-placeholder">
                  Pick your insurer above and the answer appears here.
                </p>
              )}
            </div>

            <div className="insurance__actions">
              <Button href="#book" icon="calendar">
                {insurance.cta}
              </Button>
              {telHref && (
                <Button href={telHref} variant="secondary" icon="phone">
                  {business.phoneDisplay}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

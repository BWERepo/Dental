import { useEffect, useState } from 'react'
import { business } from '../config/business'
import { smsHref, telHref, whatsappHref } from '../lib/contact'
import { usePanel } from '../lib/ui-state'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Modal from './ui/Modal'
import './TextUsWidget.css'

/**
 * "Text our office" — pick a topic and the message is written for you.
 *
 * Texting only works on a device with a messaging app, so on desktop the
 * sms: link is replaced with the number and a WhatsApp alternative rather than
 * a dead button.
 */
export default function TextUsWidget() {
  const { smsWidget } = business
  const { open, onClose } = usePanel('text')
  const [topic, setTopic] = useState(smsWidget.options[0]?.id ?? '')
  const [canText, setCanText] = useState(true)

  useEffect(() => {
    // Coarse pointer is the honest test for "has a messaging app", far more
    // reliable than sniffing the user agent string.
    const query = window.matchMedia('(hover: none) and (pointer: coarse)')
    const sync = () => setCanText(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  if (!business.sms) return null

  const chosen = smsWidget.options.find((option) => option.id === topic)
  const href = smsHref(chosen?.message ?? business.messagePrefill)

  return (
    <Modal open={open} onClose={onClose} labelledBy="text-widget-title" className="text-widget">
      <span className="text-widget__mark" aria-hidden="true">
        <Icon name="sms" />
      </span>

      <h2 id="text-widget-title" className="text-widget__title">
        {smsWidget.heading}
      </h2>
      <p className="text-widget__intro">{smsWidget.intro}</p>

      <div className="text-widget__options" role="radiogroup" aria-label={smsWidget.heading}>
        {smsWidget.options.map((option) => (
          <label key={option.id} className="text-widget__option">
            <input
              type="radio"
              name="text-topic"
              value={option.id}
              checked={topic === option.id}
              onChange={() => setTopic(option.id)}
            />
            <span>
              {option.label}
              <Icon name="check" className="text-widget__tick" />
            </span>
          </label>
        ))}
      </div>

      {canText ? (
        <Button href={href} icon="sms" className="btn--block" onClick={onClose}>
          {smsWidget.cta}
        </Button>
      ) : (
        <div className="text-widget__desktop">
          <p className="text-widget__note">{smsWidget.desktopNote}</p>
          <div className="text-widget__desktop-actions">
            {telHref && (
              <Button href={telHref} variant="soft" icon="phone">
                {business.phoneDisplay}
              </Button>
            )}
            {whatsappHref(chosen?.message) && (
              <Button
                href={whatsappHref(chosen?.message)}
                variant="whatsapp"
                icon="whatsapp"
                external
                onClick={onClose}
              >
                {business.cta.whatsapp}
              </Button>
            )}
          </div>
        </div>
      )}

      <p className="text-widget__legal">
        Messages go to the practice’s own number. This prototype does not run a messaging service.
      </p>
    </Modal>
  )
}

import { business } from '../config/business'
import { smsHref, telHref, whatsappHref } from '../lib/contact'
import { usePanel } from '../lib/ui-state'
import Icon from './ui/Icon'
import './ContactDock.css'

/**
 * The always-there way to reach the practice: a bar across the bottom of the
 * screen on phones, and a small floating stack in the corner on desktop.
 * Each channel only appears if it is filled in in src/config/business.js.
 *
 * "Text" opens the topic picker rather than jumping straight to a blank
 * message — a visitor who has to compose the message themselves usually
 * doesn't.
 */
export default function ContactDock() {
  const { onOpen } = usePanel('text')

  const items = [
    telHref && { id: 'call', href: telHref, icon: 'phone', label: business.cta.call },
    smsHref() && { id: 'sms', icon: 'sms', label: business.cta.text, onClick: onOpen },
    whatsappHref() && {
      id: 'whatsapp',
      href: whatsappHref(),
      icon: 'whatsapp',
      label: business.cta.whatsapp,
      external: true,
    },
    // Absolute, because the dock also renders on service pages where there is
    // no #book section to jump to.
    { id: 'book', href: '/#book', icon: 'calendar', label: 'Book' },
  ].filter(Boolean)

  // A dock holding only the Book link is just clutter next to the header.
  if (items.length < 2) return null

  return (
    <div className="dock" role="group" aria-label="Contact the practice">
      {items.map((item) =>
        item.onClick ? (
          <button
            key={item.id}
            type="button"
            className={`dock__item dock__item--${item.id}`}
            aria-label={item.label}
            onClick={item.onClick}
          >
            <Icon name={item.icon} />
            <span className="dock__label">{item.label}</span>
          </button>
        ) : (
          <a
            key={item.id}
            className={`dock__item dock__item--${item.id}`}
            href={item.href}
            // The label is a hover tooltip on desktop, so name the link outright.
            aria-label={item.label}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon name={item.icon} />
            <span className="dock__label">{item.label}</span>
          </a>
        ),
      )}
    </div>
  )
}

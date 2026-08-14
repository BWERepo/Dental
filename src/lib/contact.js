import { business } from '../config/business'

/*
 * One place that knows how to build every "reach us" link, so the phone, text,
 * WhatsApp and email buttons behave identically wherever they appear.
 * Anything the config leaves empty returns null, and the caller hides it.
 */

export const telHref = business.phoneLink ? `tel:${business.phoneLink}` : null

/**
 * `sms:` with a prefilled message.
 * The odd `?&body=` is deliberate: iOS wants `&`, Android wants `?`, and this
 * form is the one both of them accept.
 */
export function smsHref(body = business.messagePrefill) {
  if (!business.sms) return null
  return body ? `sms:${business.sms}?&body=${encodeURIComponent(body)}` : `sms:${business.sms}`
}

export function whatsappHref(text = business.messagePrefill) {
  if (!business.whatsapp) return null
  const base = `https://wa.me/${business.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function mailtoHref(subject = '', body = '') {
  if (!business.email) return null
  const query = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ]
    .filter(Boolean)
    .join('&')
  return query ? `mailto:${business.email}?${query}` : `mailto:${business.email}`
}

export const directionsHref =
  business.mapsLink ||
  (business.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`
    : null)

/**
 * The messaging channels that are switched on, in the order we like to offer
 * them. Used by the booking form's "how should we confirm?" choice and by the
 * floating contact bar.
 */
export function activeChannels() {
  return [
    business.phoneLink && { id: 'call', label: 'Phone call', short: business.cta.call },
    business.sms && { id: 'sms', label: 'Text message', short: business.cta.text },
    business.whatsapp && { id: 'whatsapp', label: 'WhatsApp', short: business.cta.whatsapp },
    business.email && { id: 'email', label: 'Email', short: 'Email' },
  ].filter(Boolean)
}

import { business } from '../config/business'

/*
 * Document head + structured data.
 *
 * A NOTE ON THE PROTOTYPE
 * `business.seo.noindex` is true while this is a demonstration, and it does two
 * things: it emits a robots noindex tag, and it downgrades the structured data
 * to a plain WebSite rather than a Dentist/LocalBusiness. Publishing
 * LocalBusiness markup for a practice that does not exist would put a fake
 * dentist, a fake address and a fake 4.9 rating into search results and map
 * products. Set noindex to false only once the practice is real.
 */

function upsertMeta(selector, attributes) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value))
  return tag
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
  return tag
}

/** The JSON-LD graph. Deliberately minimal while this is a prototype. */
export function structuredData() {
  const url = window.location.origin

  if (business.seo.noindex) {
    // A demonstration site describes itself as a website and nothing more.
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${business.name} (demonstration prototype)`,
      url,
      description: business.prototypeNote,
    }
  }

  // The shape a real practice would publish once the content is genuine.
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: business.name,
    url,
    telephone: business.phoneLink,
    email: business.email,
    address: { '@type': 'PostalAddress', streetAddress: business.address },
    openingHours: business.hours
      .filter((row) => !/closed/i.test(row.time))
      .map((row) => `${row.days} ${row.time}`),
    medicalSpecialty: 'Dentistry',
    availableService: business.services.map((service) => ({
      '@type': 'MedicalProcedure',
      name: service.name,
      description: service.short,
    })),
  }
}

/**
 * Write the head for a given page. Called once on mount and again whenever the
 * route changes, so title and description follow the visitor.
 */
export function applySeo({ title, description, path = '/' } = {}) {
  const fullTitle = title
    ? `${title} — ${business.name}`
    : `${business.name} — ${business.seo.titleSuffix}`

  document.title = fullTitle

  const desc = description || business.seo.description
  const url = `${window.location.origin}${path}`

  upsertMeta('meta[name="description"]', { name: 'description', content: desc })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: desc })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: business.seo.ogImage })
  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: desc })
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: business.seo.ogImage,
  })

  upsertLink('canonical', url)

  if (business.seo.noindex) {
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, nofollow' })
  }

  let script = document.head.querySelector('script[type="application/ld+json"]')
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData())
}

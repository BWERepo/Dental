/*
 * A very small client-side router — about forty lines instead of a dependency.
 *
 * The site is one long home page plus a detail page per service, so a full
 * routing library would cost more in bundle size than it saves in code. The
 * Cloudflare Worker already serves index.html for unknown paths
 * (`not_found_handling: single-page-application` in wrangler.jsonc), so deep
 * links to /services/<slug> work on a cold load, not just on in-app clicks.
 *
 * Matching is kept free of React and of the DOM so it can be tested directly.
 */

export const HOME = 'home'
export const SERVICE = 'service'
export const NOT_FOUND = 'notFound'

/** Build the canonical path for a service. */
export const servicePath = (slug) => `/services/${slug}`

/** Strip trailing slashes but keep the root as '/'. */
export function normalisePath(pathname) {
  const clean = String(pathname || '/').replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

/**
 * Turn a pathname into a route descriptor.
 * `knownSlugs` is passed in so an unrecognised service 404s properly rather
 * than rendering an empty page.
 */
export function matchRoute(pathname, knownSlugs = []) {
  const path = normalisePath(pathname)

  if (path === '/') return { name: HOME }

  const match = path.match(/^\/services\/([A-Za-z0-9-]+)$/)
  if (match) {
    const slug = match[1].toLowerCase()
    if (knownSlugs.length === 0 || knownSlugs.includes(slug)) {
      return { name: SERVICE, slug }
    }
  }

  return { name: NOT_FOUND }
}

/**
 * Should the router handle this click, or should the browser?
 * Returns the destination path when the router should take it, otherwise null.
 * New tabs, downloads, external hosts and modified clicks are all left alone.
 */
export function resolveLinkTarget(anchor, { origin } = {}) {
  if (!anchor) return null

  const href = anchor.getAttribute('href')
  if (!href) return null

  // Let the browser deal with anything that is not a plain in-page navigation.
  if (anchor.target && anchor.target !== '_self') return null
  if (anchor.hasAttribute('download')) return null
  if (href.startsWith('#')) return null
  if (/^(mailto:|tel:|sms:|https?:\/\/)/i.test(href) && !href.startsWith(origin)) return null

  let url
  try {
    url = new URL(href, origin)
  } catch {
    return null
  }

  if (url.origin !== origin) return null

  return { pathname: url.pathname, hash: url.hash }
}

/**
 * True for a click that the browser should own (new tab, etc.).
 * Coerced to a real boolean: a synthetic event may simply omit the modifier
 * properties, and this should answer false rather than undefined.
 */
export const isModifiedClick = (event) =>
  Boolean(
    event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey,
  )

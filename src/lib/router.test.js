import { describe, expect, it } from 'vitest'
import {
  HOME,
  NOT_FOUND,
  SERVICE,
  isModifiedClick,
  matchRoute,
  normalisePath,
  resolveLinkTarget,
  servicePath,
} from './router'

const SLUGS = ['family-dentistry', 'cosmetic-dentistry', 'invisalign']
const ORIGIN = 'https://dental.businesswebexpress.com'

/** Minimal stand-in for an <a>, so these tests need no DOM. */
const anchor = (attrs = {}) => ({
  target: attrs.target ?? '',
  getAttribute: (name) => (name in attrs ? attrs[name] : null),
  hasAttribute: (name) => name in attrs,
})

describe('normalisePath', () => {
  it('keeps the root as /', () => {
    expect(normalisePath('/')).toBe('/')
    expect(normalisePath('')).toBe('/')
  })

  it('strips trailing slashes', () => {
    expect(normalisePath('/services/invisalign/')).toBe('/services/invisalign')
    expect(normalisePath('/services/invisalign///')).toBe('/services/invisalign')
  })
})

describe('matchRoute', () => {
  it('matches the home page', () => {
    expect(matchRoute('/', SLUGS)).toEqual({ name: HOME })
  })

  it('matches a known service', () => {
    expect(matchRoute('/services/invisalign', SLUGS)).toEqual({
      name: SERVICE,
      slug: 'invisalign',
    })
  })

  it('matches a known service with a trailing slash', () => {
    expect(matchRoute('/services/invisalign/', SLUGS).name).toBe(SERVICE)
  })

  it('is case-insensitive on the slug', () => {
    expect(matchRoute('/services/Invisalign', SLUGS).slug).toBe('invisalign')
  })

  it('404s an unknown service rather than rendering an empty page', () => {
    expect(matchRoute('/services/teeth-lasers', SLUGS)).toEqual({ name: NOT_FOUND })
  })

  it('404s an unrelated path', () => {
    expect(matchRoute('/about-us', SLUGS)).toEqual({ name: NOT_FOUND })
  })

  it('404s a nested path under services', () => {
    expect(matchRoute('/services/invisalign/pricing', SLUGS)).toEqual({ name: NOT_FOUND })
  })

  it('servicePath round-trips through matchRoute', () => {
    SLUGS.forEach((slug) => {
      expect(matchRoute(servicePath(slug), SLUGS)).toEqual({ name: SERVICE, slug })
    })
  })
})

describe('resolveLinkTarget', () => {
  it('takes an internal path', () => {
    expect(resolveLinkTarget(anchor({ href: '/services/invisalign' }), { origin: ORIGIN })).toEqual({
      pathname: '/services/invisalign',
      hash: '',
    })
  })

  it('keeps the hash so /#book still scrolls', () => {
    expect(resolveLinkTarget(anchor({ href: '/#book' }), { origin: ORIGIN })).toEqual({
      pathname: '/',
      hash: '#book',
    })
  })

  it('leaves plain anchors to the browser', () => {
    expect(resolveLinkTarget(anchor({ href: '#services' }), { origin: ORIGIN })).toBeNull()
  })

  it('leaves tel, sms and mailto alone', () => {
    expect(resolveLinkTarget(anchor({ href: 'tel:+18655550142' }), { origin: ORIGIN })).toBeNull()
    expect(resolveLinkTarget(anchor({ href: 'sms:+18655550142' }), { origin: ORIGIN })).toBeNull()
    expect(resolveLinkTarget(anchor({ href: 'mailto:a@b.com' }), { origin: ORIGIN })).toBeNull()
  })

  it('leaves external hosts alone', () => {
    expect(resolveLinkTarget(anchor({ href: 'https://wa.me/18655550142' }), { origin: ORIGIN })).toBeNull()
    expect(resolveLinkTarget(anchor({ href: 'https://businesswebexpress.com' }), { origin: ORIGIN })).toBeNull()
  })

  it('leaves new tabs and downloads alone', () => {
    expect(resolveLinkTarget(anchor({ href: '/services/invisalign', target: '_blank' }), { origin: ORIGIN })).toBeNull()
    expect(resolveLinkTarget(anchor({ href: '/report.pdf', download: '' }), { origin: ORIGIN })).toBeNull()
  })

  it('handles a missing anchor or href', () => {
    expect(resolveLinkTarget(null, { origin: ORIGIN })).toBeNull()
    expect(resolveLinkTarget(anchor({}), { origin: ORIGIN })).toBeNull()
  })

  it('takes an absolute URL on our own origin', () => {
    expect(resolveLinkTarget(anchor({ href: `${ORIGIN}/services/invisalign` }), { origin: ORIGIN })).toEqual({
      pathname: '/services/invisalign',
      hash: '',
    })
  })
})

describe('isModifiedClick', () => {
  const click = (over = {}) => ({ defaultPrevented: false, button: 0, ...over })

  it('passes a plain left click through', () => {
    expect(isModifiedClick(click())).toBe(false)
  })

  it('ignores middle and right clicks', () => {
    expect(isModifiedClick(click({ button: 1 }))).toBe(true)
  })

  it('ignores modifier clicks that open new tabs', () => {
    expect(isModifiedClick(click({ metaKey: true }))).toBe(true)
    expect(isModifiedClick(click({ ctrlKey: true }))).toBe(true)
    expect(isModifiedClick(click({ shiftKey: true }))).toBe(true)
  })

  it('ignores an already-handled event', () => {
    expect(isModifiedClick(click({ defaultPrevented: true }))).toBe(true)
  })
})

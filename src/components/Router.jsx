import { useCallback, useEffect, useMemo, useState } from 'react'
import { RouterContext } from '../lib/router-context'
import { isModifiedClick, matchRoute, resolveLinkTarget } from '../lib/router'

/**
 * Owns the current location and intercepts in-app link clicks.
 *
 * Anything the router should not own — new tabs, tel:/sms:/mailto:, external
 * hosts, modified clicks, plain #anchors — falls through to the browser
 * untouched, so the existing one-page anchor navigation keeps working exactly
 * as it did.
 */
export default function Router({ knownSlugs = [], children }) {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }))

  const navigate = useCallback((pathname, hash = '') => {
    const target = `${pathname}${hash}`
    if (target !== `${window.location.pathname}${window.location.hash}`) {
      window.history.pushState({}, '', target)
    }
    setLocation({ pathname, hash })
  }, [])

  // Back and forward buttons.
  useEffect(() => {
    const onPopState = () => {
      setLocation({ pathname: window.location.pathname, hash: window.location.hash })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // One delegated listener rather than a custom <Link> everywhere, so plain
  // <a href="/services/…"> in any component just works.
  useEffect(() => {
    const onClick = (event) => {
      if (isModifiedClick(event)) return

      const anchor = event.target.closest?.('a')
      const target = resolveLinkTarget(anchor, { origin: window.location.origin })
      if (!target) return

      event.preventDefault()
      navigate(target.pathname, target.hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  // Scroll handling on navigation: jump to the anchor if there is one,
  // otherwise go to the top the way a real page load would.
  useEffect(() => {
    if (location.hash) {
      // Wait a frame so the destination section has actually rendered.
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location])

  const value = useMemo(
    () => ({
      location,
      route: matchRoute(location.pathname, knownSlugs),
      navigate,
    }),
    [location, knownSlugs, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

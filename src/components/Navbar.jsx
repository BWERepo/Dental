import { useEffect, useRef, useState } from 'react'
import { business } from '../config/business'
import { smsHref, telHref, whatsappHref } from '../lib/contact'
import { servicePath } from '../lib/router'
import Button from './ui/Button'
import Icon from './ui/Icon'
import './Navbar.css'

/**
 * A nav link may name a config array in `children` ("services"), which lists
 * that array underneath it in the menu panel. Anything without a `slug` is
 * skipped — the sub-items jump to a card's id, so an entry with no id to jump
 * to has nowhere to go.
 */
function submenuFor(link) {
  const items = link.children ? business[link.children] : null
  return Array.isArray(items) ? items.filter((item) => item?.slug && item?.name) : null
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef(null)
  const { cta } = business

  const primaryLinks = business.navLinks.filter((link) => link.primary)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)

      // The reading-progress line is written straight to the element rather
      // than held in state, so scrolling never re-renders the header.
      if (progressRef.current) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Close the panel on Escape or a click outside it, and stop the page
  // scrolling behind it.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onPointerDown = (event) => {
      if (!event.target?.closest?.('.navbar')) setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a className="navbar__brand" href="/">
          {business.shortName}
          <span className="navbar__brand-dot" aria-hidden="true" />
        </a>

        {/* Four evenly weighted labels. Everything else is behind the menu. */}
        <nav className="navbar__links" aria-label="Main">
          {primaryLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__cta">
          {telHref && (
            <a className="navbar__phone" href={telHref}>
              <Icon name="phone" />
              {business.phoneDisplay}
            </a>
          )}
          <Button href="/#book" icon="calendar">
            {cta.book}
          </Button>
        </div>

        <button
          className="navbar__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={`navbar__bars ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <span className="navbar__progress" ref={progressRef} aria-hidden="true" />

      <div id="site-menu" className={`navbar__panel ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <div className="navbar__panel-inner">
          <nav aria-label="All sections">
            {business.navLinks.map((link) => {
              const sub = submenuFor(link)

              return (
                <div key={link.href} className="navbar__panel-group">
                  <a href={link.href} onClick={close}>
                    {link.label}
                  </a>

                  {/* No toggle: the panel scrolls, so the list just sits open. */}
                  {sub?.length > 0 && (
                    <ul className="navbar__panel-sub">
                      {sub.map((item) => (
                        <li key={item.slug}>
                          <a href={servicePath(item.slug)} onClick={close}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>

          <Button href="/#book" icon="calendar" className="btn--block" onClick={close}>
            {cta.book}
          </Button>

          <div className="navbar__panel-channels">
            {telHref && (
              <Button href={telHref} variant="soft" icon="phone" onClick={close}>
                {cta.call}
              </Button>
            )}
            {smsHref() && (
              <Button href={smsHref()} variant="soft" icon="sms" onClick={close}>
                {cta.text}
              </Button>
            )}
            {whatsappHref() && (
              <Button href={whatsappHref()} variant="whatsapp" icon="whatsapp" external onClick={close}>
                {cta.whatsapp}
              </Button>
            )}
          </div>

          <p className="navbar__panel-note">{business.address}</p>
        </div>
      </div>
    </header>
  )
}

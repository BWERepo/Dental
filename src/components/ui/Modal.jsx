import { useCallback, useEffect, useRef } from 'react'
import Icon from './Icon'
import './Modal.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * An accessible dialog: focus moves in on open and returns to whatever opened
 * it on close, Tab is trapped inside, Escape and a click on the backdrop both
 * dismiss it, and the page behind stops scrolling.
 */
export default function Modal({ open, onClose, labelledBy, className = '', children }) {
  const panelRef = useRef(null)
  const returnFocusRef = useRef(null)

  const focusables = useCallback(
    () => Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []),
    [],
  )

  useEffect(() => {
    if (!open) return undefined

    returnFocusRef.current = document.activeElement
    const items = focusables()
    ;(items[0] ?? panelRef.current)?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const current = focusables()
      if (current.length === 0) return

      const first = current[0]
      const last = current[current.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      // Hand focus back to the trigger, so keyboard users do not get dropped
      // at the top of the document.
      returnFocusRef.current?.focus?.()
    }
  }, [open, onClose, focusables])

  if (!open) return null

  return (
    <div
      className="modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`modal__panel ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={panelRef}
        tabIndex={-1}
      >
        <button className="modal__close" type="button" onClick={onClose}>
          <span className="sr-only">Close</span>
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  )
}

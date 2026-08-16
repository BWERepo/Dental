import { useState } from 'react'
import './Accordion.css'

/**
 * Accessible accordion, shared by the home FAQ and every service page.
 *
 * Each question is a real <button> inside a heading, carrying aria-expanded
 * and aria-controls, and the panel is hidden rather than merely collapsed —
 * so keyboard and screen-reader users get the same behaviour as everyone else.
 *
 * `idPrefix` keeps the generated ids unique when more than one accordion is on
 * a page.
 */
export default function Accordion({ items, idPrefix = 'faq', headingLevel = 3, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  if (!items?.length) return null

  const Heading = `h${headingLevel}`

  return (
    <div className="faq__list">
      {items.map((item, index) => {
        const open = openIndex === index
        const panelId = `${idPrefix}-panel-${index}`
        const buttonId = `${idPrefix}-button-${index}`

        return (
          <div className={`faq__item ${open ? 'is-open' : ''}`} key={item.question}>
            <Heading>
              <button
                type="button"
                id={buttonId}
                className="faq__question"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                {item.question}
                <span className="faq__sign" aria-hidden="true" />
              </button>
            </Heading>

            <div id={panelId} className="faq__answer" role="region" aria-labelledby={buttonId} hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

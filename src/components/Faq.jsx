import { useState } from 'react'
import { business } from '../config/business'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './Faq.css'

export default function Faq() {
  const { faq } = business
  const [openIndex, setOpenIndex] = useState(0)

  if (!faq.length) return null

  return (
    <section className="section section--neutral" id="faq">
      <div className="container faq__inner">
        <Reveal>
          <SectionHeading eyebrow="Before you come in" heading="Questions we get asked" />
        </Reveal>

        <Reveal delay={60}>
          <div className="faq__list">
            {faq.map((item, index) => {
              const open = openIndex === index
              return (
                <div className={`faq__item ${open ? 'is-open' : ''}`} key={item.question}>
                  <h3>
                    <button
                      type="button"
                      className="faq__question"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                    >
                      {item.question}
                      <span className="faq__sign" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`faq-panel-${index}`} className="faq__answer" hidden={!open}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

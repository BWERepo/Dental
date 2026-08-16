import { business } from '../config/business'
import Accordion from './ui/Accordion'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import './Faq.css'

export default function Faq() {
  const { faq } = business

  if (!faq.length) return null

  return (
    <section className="section section--neutral" id="faq">
      <div className="container faq__inner">
        <Reveal>
          <SectionHeading
            index={10}
            eyebrow="Before you come in"
            heading="Questions we get asked"
          />
        </Reveal>

        <Reveal delay={60}>
          <Accordion items={faq} idPrefix="faq" />
        </Reveal>
      </div>
    </section>
  )
}

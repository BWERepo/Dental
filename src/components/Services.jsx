import { business } from '../config/business'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ServiceCard from './ui/ServiceCard'
import './Services.css'

export default function Services() {
  const { services, secondaryServices } = business

  if (!services.length) return null

  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            heading="Everyday dentistry, done properly"
            intro="Three things make up most of our week. Everything else is listed underneath."
          />
        </Reveal>

        <div className={`services__grid ${services.length < 3 ? 'services__grid--wide' : ''}`}>
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 90}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>

        {secondaryServices.length > 0 && (
          <Reveal>
            <div className="services__more">
              <p className="services__more-label">Also offered</p>
              <ul className="services__more-list">
                {secondaryServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

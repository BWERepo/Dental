import { useEffect } from 'react'
import { business } from '../config/business'
import { telHref } from '../lib/contact'
import { servicePath } from '../lib/router'
import { applySeo } from '../lib/seo'
import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import './ServicePage.css'

/**
 * The detail page for one service, at /services/<slug>.
 *
 * Every word comes from the matching entry in `business.services`, so adding a
 * service to the config adds a fully-formed page with no new markup.
 */
export default function ServicePage({ slug }) {
  const service = business.services.find((item) => item.slug === slug)
  const others = business.services.filter((item) => item.slug !== slug).slice(0, 3)

  useEffect(() => {
    if (!service) return
    applySeo({
      title: service.name,
      description: service.short,
      path: servicePath(service.slug),
    })
  }, [service])

  if (!service) return null

  return (
    <>
      {/* --- Hero ---------------------------------------------------------- */}
      <section className={`svc-hero grain ${service.urgent ? 'svc-hero--urgent' : ''}`}>
        <div className="svc-hero__media">
          <img
            src={service.image}
            alt={service.alt}
            fetchPriority="high"
            width="1600"
            height="1067"
          />
        </div>

        <div className="container svc-hero__inner">
          <nav className="svc-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/#services">Services</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </nav>

          <span className="svc-hero__mark" aria-hidden="true">
            <Icon name={service.icon} />
          </span>

          <p className="svc-hero__eyebrow">{service.name}</p>
          <h1 className="svc-hero__title">{service.headline}</h1>
          <p className="svc-hero__lede">{service.short}</p>

          <div className="svc-hero__actions">
            <Button href="/#book" icon="calendar">
              {business.cta.book}
            </Button>
            {telHref && (
              <Button href={telHref} variant="onDark" icon="phone">
                {business.cta.call}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* --- Overview + benefits -------------------------------------------- */}
      <section className="section">
        <div className="container svc-overview">
          <Reveal className="svc-overview__body">
            <SectionHeading eyebrow="The treatment" heading={`About ${service.name.toLowerCase()}`} />
            <p className="svc-overview__text">{service.overview}</p>

            {service.trademarkNote && (
              <p className="svc-overview__trademark">{service.trademarkNote}</p>
            )}
          </Reveal>

          <Reveal className="svc-benefits" delay={80}>
            <h2 className="svc-benefits__title">What you get</h2>
            <ul>
              {service.benefits.map((benefit) => (
                <li key={benefit}>
                  <Icon name="check" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --- Candidacy ------------------------------------------------------- */}
      <section className="section section--neutral">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Is it for you?"
              heading="You might be a good candidate if…"
            />
          </Reveal>

          <div className="svc-candidates">
            {service.candidates.map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <div className="svc-candidate">
                  <span className="svc-candidate__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- What to expect --------------------------------------------------- */}
      <section className="section section--glow">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Step by step" heading="What to expect" />
          </Reveal>

          <ol className="svc-steps">
            {service.whatToExpect.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <li className="svc-step">
                  <span className="svc-step__num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --- FAQ --------------------------------------------------------------- */}
      {service.faq?.length > 0 && (
        <section className="section section--neutral">
          <div className="container faq__inner">
            <Reveal>
              <SectionHeading eyebrow="Common questions" heading={`${service.name} questions`} />
            </Reveal>
            <Reveal delay={60}>
              <Accordion items={service.faq} idPrefix={`svc-${service.slug}`} />
            </Reveal>
          </div>
        </section>
      )}

      {/* --- Other services ----------------------------------------------------- */}
      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <SectionHeading eyebrow="Also at the practice" heading="Other treatments" />
            </Reveal>

            <div className="svc-others">
              {others.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <a className="svc-other" href={servicePath(item.slug)}>
                    <span className="svc-other__mark" aria-hidden="true">
                      <Icon name={item.icon} />
                    </span>
                    <span className="svc-other__body">
                      <strong>{item.name}</strong>
                      <span>{item.short}</span>
                    </span>
                    <Icon name="arrow" className="svc-other__arrow" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Closing CTA --------------------------------------------------------- */}
      <section className="section svc-cta-wrap">
        <div className="container">
          <div className="svc-cta grain">
            <div>
              <h2>{business.finalCta.heading}</h2>
              <p>{business.finalCta.text}</p>
            </div>
            <div className="svc-cta__actions">
              <Button href="/#book" variant="onBrand" icon="calendar">
                {business.cta.book}
              </Button>
              {telHref && (
                <Button href={telHref} variant="onDark" icon="phone">
                  {business.cta.call}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

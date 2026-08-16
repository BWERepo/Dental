import { useEffect } from 'react'
import { business } from '../config/business'
import { telHref } from '../lib/contact'
import { servicePath } from '../lib/router'
import { applySeo } from '../lib/seo'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import './NotFoundPage.css'

export default function NotFoundPage() {
  useEffect(() => {
    applySeo({ title: 'Page not found', description: 'That page does not exist.' })
  }, [])

  return (
    <section className="section notfound">
      <div className="container notfound__inner">
        <p className="notfound__code">404</p>
        <h1>That page has moved on.</h1>
        <p className="notfound__text">
          The link may be out of date. Everything the practice offers is a click away below, or
          call us and we will point you at the right thing.
        </p>

        <div className="notfound__actions">
          <Button href="/" icon="arrow">
            Back to the home page
          </Button>
          {telHref && (
            <Button href={telHref} variant="secondary" icon="phone">
              {business.phoneDisplay}
            </Button>
          )}
        </div>

        <ul className="notfound__links">
          {business.services.map((service) => (
            <li key={service.slug}>
              <a href={servicePath(service.slug)}>
                <Icon name={service.icon} />
                {service.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

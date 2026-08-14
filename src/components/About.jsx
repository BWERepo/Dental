import { business } from '../config/business'
import Reveal from './ui/Reveal'
import './About.css'

export default function About() {
  const { about, mapsLink, address } = business

  return (
    <section className="section section--neutral" id="about">
      <div className="container about__grid">
        <Reveal className="about__media">
          <img src={about.image} alt={about.imageAlt} loading="lazy" width="1200" height="1500" />
        </Reveal>

        <Reveal className="about__body" delay={80}>
          <p className="about__eyebrow">{about.eyebrow}</p>
          <h2 className="about__title">{about.heading}</h2>

          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="about__text">
              {paragraph}
            </p>
          ))}

          <a
            className="about__link"
            href={mapsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Kingston Pike
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path
                d="M4 10h11M11 5.5 15.5 10 11 14.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { business } from '../config/business'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './SmileGallery.css'

/*
 * These smiles are DRAWN, not photographed. Publishing real before/after
 * patient photography needs that patient's written consent, so a prototype
 * ships with illustrations and says so plainly.
 *
 * Each case is the same drawing with three dials turned: the shade of the
 * enamel, how far the teeth are rotated out of line, and how uneven their
 * widths are. That is what actually changes between a before and an after.
 */
const CASES = {
  makeover: {
    before: { shade: '#E3D2A8', crooked: 1, uneven: 1 },
    after: { shade: '#FCFCFF', crooked: 0, uneven: 0 },
  },
  whitening: {
    // Whitening changes the colour only — the teeth do not move.
    before: { shade: '#DFCB9C', crooked: 0.25, uneven: 0.25 },
    after: { shade: '#FCFCFF', crooked: 0.25, uneven: 0.25 },
  },
  alignment: {
    // Aligners move teeth; they do not bleach them.
    before: { shade: '#F0EAD8', crooked: 1.2, uneven: 0.8 },
    after: { shade: '#F6F5F2', crooked: 0, uneven: 0 },
  },
}

const TOOTH_COUNT = 8

/** One stylised smile: a dark mouth with a row of teeth across the top. */
function Smile({ shade, crooked = 0, uneven = 0, title }) {
  const teeth = Array.from({ length: TOOTH_COUNT }, (_, index) => {
    // -1 at the left corner, 0 in the middle, +1 at the right corner.
    const t = (index - (TOOTH_COUNT - 1) / 2) / ((TOOTH_COUNT - 1) / 2)
    const drift = index % 2 === 0 ? 1 : -1

    const width = 32 - Math.abs(t) * 9 - uneven * drift * 2.5
    const height = 46 - Math.abs(t) * 13
    // The bite line curves down towards the corners of the mouth.
    const bottom = 104 + t * t * 12
    const x = 160 + t * 106
    const angle = crooked * drift * (3 + Math.abs(t) * 4)

    return { key: index, x, width, height, bottom, angle }
  })

  return (
    <svg className="smile" viewBox="0 0 320 200" role="img" aria-label={title}>
      <defs>
        {/* The mouth opening. Teeth are clipped to it so nothing spills over
            the lips, however far a tooth is rotated. */}
        <clipPath id={`mouth-${shade.replace('#', '')}-${crooked}-${uneven}`}>
          <path d="M18 100Q160 14 302 100Q160 186 18 100Z" />
        </clipPath>
      </defs>

      <path d="M18 100Q160 14 302 100Q160 186 18 100Z" fill="#2C1020" />

      <g clipPath={`url(#mouth-${shade.replace('#', '')}-${crooked}-${uneven})`}>
        {teeth.map((tooth) => (
          <rect
            key={tooth.key}
            x={tooth.x - tooth.width / 2}
            y={tooth.bottom - tooth.height}
            width={tooth.width}
            height={tooth.height}
            rx="9"
            fill={shade}
            transform={`rotate(${tooth.angle} ${tooth.x} ${tooth.bottom})`}
          />
        ))}

        {/* A soft shadow inside the top lip, so the teeth sit in a mouth
            rather than floating on a dark background. */}
        <path d="M18 100Q160 14 302 100Q160 60 18 100Z" fill="rgba(0,0,0,0.28)" />
      </g>

      {/* The lips, drawn last so they sit over the teeth. */}
      <path
        d="M18 100Q160 14 302 100Q160 186 18 100Z"
        fill="none"
        stroke="#C2607A"
        strokeWidth="9"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Before and after in one frame, with a handle you drag across. */
function Compare({ item }) {
  const [position, setPosition] = useState(50)
  const dials = CASES[item.id] ?? CASES.makeover

  return (
    <div className="compare">
      <div className="compare__frame">
        <div className="compare__pane">
          <Smile {...dials.before} title={`${item.title} — ${item.beforeLabel}`} />
          <span className="compare__tag compare__tag--before">{item.beforeLabel}</span>
        </div>

        {/* The after is laid over the before and revealed from the left. */}
        <div
          className="compare__pane compare__pane--after"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Smile {...dials.after} title={`${item.title} — ${item.afterLabel}`} />
          <span className="compare__tag compare__tag--after">{item.afterLabel}</span>
        </div>

        <span className="compare__divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span className="compare__grip" />
        </span>

        {/* A real range input does the dragging. It is invisible, but it brings
            touch, mouse and arrow-key support with it, which a div cannot. */}
        <input
          className="compare__range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Reveal the ${item.afterLabel.toLowerCase()} result for ${item.title}`}
        />
      </div>

      <div className="compare__meta">
        <h3 className="compare__title">{item.title}</h3>
        <p className="compare__treatments">{item.treatments}</p>
      </div>
    </div>
  )
}

export default function SmileGallery() {
  const { smileGallery } = business

  if (!smileGallery?.cases?.length) return null

  return (
    <section className="section section--neutral" id="smile-gallery">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={6}
            eyebrow={smileGallery.eyebrow}
            heading={smileGallery.heading}
            intro={smileGallery.intro}
          />
        </Reveal>

        <div className="smile-gallery__grid">
          {smileGallery.cases.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <Compare item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="smile-gallery__note">
            {smileGallery.sample && <SampleChip label="Illustration" />}
            These are drawings of typical outcomes, not photographs of patients. Results differ from
            person to person.
          </p>
        </Reveal>

        <Reveal>
          <div className="smile-gallery__cta">
            <Button href="#book" icon="calendar">
              {smileGallery.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

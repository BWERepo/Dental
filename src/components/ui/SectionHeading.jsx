import './SectionHeading.css'

/**
 * The small uppercase eyebrow + H2 pairing used above every section,
 * so section openings are identical everywhere on the page.
 */
export default function SectionHeading({ eyebrow, heading, intro, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{heading}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}

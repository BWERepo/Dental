import './SectionHeading.css'

/**
 * The small uppercase eyebrow + H2 pairing used above every section,
 * so section openings are identical everywhere on the page.
 *
 * `index` adds the editorial section number ("01") in front of the eyebrow.
 */
export default function SectionHeading({ eyebrow, heading, intro, index, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <p className="section-heading__eyebrow">
          {index && <span className="section-heading__index">{String(index).padStart(2, '0')}</span>}
          {eyebrow}
        </p>
      )}
      <h2 className="section-heading__title">{heading}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}

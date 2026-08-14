import { business } from '../../config/business'
import './SampleChip.css'

/**
 * The visible "Sample" label that the config promises for anything carrying
 * `sample: true` — invented reviews, demonstration prices, made-up statistics.
 *
 * It renders nothing once `isPrototype` is turned off in the config, so a real
 * practice replacing the sample content does not have to hunt these down.
 *
 * tone: 'light' on pale backgrounds, 'dark' on the gradient panels.
 */
export default function SampleChip({ label = 'Sample', tone = 'light', className = '' }) {
  if (!business.isPrototype) return null

  return (
    <span className={`sample-chip sample-chip--${tone} ${className}`.trim()} title={business.prototypeNote}>
      {label}
    </span>
  )
}

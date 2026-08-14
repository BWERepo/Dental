/*
 * The site's whole icon set, in one file. Everything is drawn on a 20×20 grid
 * with a 1.5px stroke so the icons look like one family, and every icon takes
 * its colour from the text around it.
 *
 * WhatsApp is the exception: it is a brand mark, so it keeps its real shape.
 */

const strokeIcons = {
  phone: [
    'M4.5 3h3l1.5 4-2 1.2a11 11 0 0 0 4.8 4.8L13 11l4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A13.5 13.5 0 0 1 3 4.7 1.5 1.5 0 0 1 4.5 3Z',
  ],
  sms: ['M16.5 12.4a1.6 1.6 0 0 1-1.6 1.6H7.2L3.5 16.8V5.6A1.6 1.6 0 0 1 5.1 4h9.8a1.6 1.6 0 0 1 1.6 1.6Z', 'M7 9h.01', 'M10 9h.01', 'M13 9h.01'],
  mail: ['M3 5.5h14v9H3z', 'm3 6 7 5 7-5'],
  pin: [
    'M10 2.8a5 5 0 0 1 5 5c0 3.5-5 9.4-5 9.4s-5-5.9-5-9.4a5 5 0 0 1 5-5Z',
    'M10 6.2a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Z',
  ],
  calendar: ['M3.5 5.5h13v11h-13z', 'M3.5 9h13', 'M7 3.5v3', 'M13 3.5v3'],
  clock: ['M10 3.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Z', 'M10 6.4V10l2.6 1.6'],
  check: ['m4.5 10.4 3.4 3.4 7.6-7.9'],
  arrow: ['M4 10h11', 'M11 5.5 15.5 10 11 14.5'],
  spark: ['M10 3.2 11.6 8 16.4 10 11.6 12 10 16.8 8.4 12 3.6 10 8.4 8Z'],

  /* --- One per service, so each card carries its own mark ----------------- */
  // Two figures: the practice looks after the whole household.
  family: [
    'M7.4 4.1a2.05 2.05 0 1 1 0 4.1 2.05 2.05 0 0 1 0-4.1Z',
    'M3.1 16.6v-1.3a4.3 4.3 0 0 1 8.6 0v1.3',
    'M13.3 8.5a1.75 1.75 0 1 0 0-3.5',
    'M13.9 16.6v-1.5a3.9 3.9 0 0 0-1.1-2.7',
  ],
  // A star with a smaller companion — cosmetic work.
  sparkle: [
    'M8 3.1 9.3 6.6 12.8 8 9.3 9.3 8 12.8 6.7 9.3 3.2 8 6.7 6.6Z',
    'M14.6 12.1l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6Z',
  ],
  // A crown sitting on a threaded post.
  implant: [
    'M10 3.4c1.95 0 3.25 1.2 3.25 2.8 0 1-.5 1.65-1.15 2.15h-4.2C7.25 7.85 6.75 7.2 6.75 6.2c0-1.6 1.3-2.8 3.25-2.8Z',
    'M8.35 9.7h3.3',
    'M8.55 11.7h2.9',
    'M8.8 13.7h2.4',
    'M9.15 15.7h1.7',
  ],
  // The horseshoe arch of a clear aligner tray.
  aligner: [
    'M4.6 6.3c0 5.6 2.45 9.1 5.4 9.1s5.4-3.5 5.4-9.1',
    'M4.6 6.3c0-1.4 2.45-2.5 5.4-2.5s5.4 1.1 5.4 2.5',
    'M6.9 7c0 4.2 1.55 6.7 3.1 6.7S13.1 11.2 13.1 7',
  ],
  // A pulse line — something that needs looking at today.
  emergency: ['M2.8 10.4h3.15l1.6-3.7 2.7 6.7 1.8-3.9h3.15'],
  // Rays around a bright centre, for whitening.
  shine: [
    'M10 6.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Z',
    'M10 2.6v1.5',
    'M10 15.9v1.5',
    'M4.75 4.75 5.85 5.85',
    'M14.15 14.15l1.1 1.1',
    'M2.6 10h1.5',
    'M15.9 10h1.5',
    'M4.75 15.25 5.85 14.15',
    'M14.15 5.85l1.1-1.1',
  ],
}

// Solid marks. A review star has to read at 14px, where an outline turns to mush.
const filledIcons = {
  star: 'M10 2.6l2.32 4.7 5.18.76-3.75 3.65.885 5.16L10 14.44l-4.635 2.43.885-5.16L2.5 8.06l5.18-.76Z',
}

// Official WhatsApp glyph, drawn on its own 24×24 grid.
const whatsappPath =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413'

export default function Icon({ name, className = '' }) {
  const classes = `icon ${className}`.trim()

  if (name === 'whatsapp') {
    return (
      <svg className={classes} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={whatsappPath} fill="currentColor" />
      </svg>
    )
  }

  if (filledIcons[name]) {
    return (
      <svg className={classes} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d={filledIcons[name]} fill="currentColor" />
      </svg>
    )
  }

  const paths = strokeIcons[name]
  if (!paths) return null

  return (
    <svg className={classes} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

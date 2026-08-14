/*
 * ============================================================================
 * BUSINESS CONFIG — EDIT THIS FILE ONLY
 * ============================================================================
 * Everything on the website comes from this one file: text, colours, services,
 * images, hours and contact details. You do not need to touch any other file.
 *
 * HOW IT WORKS
 *  - Change the text between the 'quote marks' and save. The site updates.
 *  - Leave a value empty ('') and that piece disappears from the site cleanly.
 *    For example: no whatsapp number = no WhatsApp buttons anywhere.
 *  - `testimonials` is empty below, so the reviews section is not shown at all.
 *    Add real reviews to the list and the section appears automatically.
 *
 * NOTE ON THE SAMPLE CONTENT
 *  This is a prototype. The contact details, services, hours and selling points
 *  below are realistic SAMPLE content written to show the layout — replace them
 *  with the practice's real information before this goes live. The phone number
 *  uses the 555-01xx range, which is reserved for examples and is not a real
 *  number.
 * ============================================================================
 */

export const business = {
  /* --- Identity ---------------------------------------------------------- */
  name: 'Sample Dental Prototype',
  shortName: 'Sample Dental',
  type: 'Dental Clinic',
  tagline: 'Careful dentistry in West Knoxville.',
  city: 'Knoxville, TN',

  /* --- Contact ----------------------------------------------------------- */
  // `phoneDisplay` is what people read. `phoneLink` is what the phone dials.
  phoneDisplay: '(865) 555-0142',
  phoneLink: '+18655550142',
  email: 'hello@sampledental.com',
  // Add a number in international format (e.g. '18655550142') to switch the
  // WhatsApp buttons on. Left empty, WhatsApp is hidden everywhere.
  whatsapp: '',
  address: '4620 Kingston Pike, Suite 210, Knoxville, TN 37919',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=4620+Kingston+Pike+Suite+210+Knoxville+TN+37919',

  /* --- Calls to action --------------------------------------------------- */
  primaryCta: 'Call Now',
  secondaryCta: 'Contact Us',

  /* --- Opening hours ----------------------------------------------------- */
  hours: [
    { days: 'Monday – Thursday', time: '8:00 AM – 5:00 PM' },
    { days: 'Friday', time: '8:00 AM – 2:00 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  // Short version used in the hero trust line.
  hoursSummary: 'Open Mon – Fri',

  /* --- About ------------------------------------------------------------- */
  about: {
    eyebrow: 'About the practice',
    heading: 'A dental office that runs on time',
    paragraphs: [
      'We are a general and cosmetic dental practice on Kingston Pike, looking after families across West Knoxville. Most of what we do is everyday dentistry — cleanings, fillings, crowns — done carefully and without rush.',
      'You will get a written estimate before any treatment starts, and time to ask questions first. If something needs doing, we explain why. If it can wait, we tell you that too.',
    ],
    image:
      'https://images.unsplash.com/photo-1643660526741-094639fbe53a?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Treatment room at the practice with a blue dental chair',
  },

  /* --- Hero -------------------------------------------------------------- */
  hero: {
    heading: 'Dentistry that respects your time',
    supporting:
      'Same-day emergency appointments and straightforward general dentistry, five minutes from Bearden.',
    image:
      'https://images.unsplash.com/photo-1663755489920-5e09f66d011a?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Dental hygienist checking a relaxed patient in the treatment chair',
  },

  /* --- Main services (shown as large image cards) ------------------------ */
  services: [
    {
      title: 'General & Preventive',
      description:
        'Cleanings, exams, fillings and the routine care that keeps bigger work off the table.',
      image:
        'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dental team treating a patient during a routine appointment',
    },
    {
      title: 'Cosmetic Dentistry',
      description:
        'Whitening, bonding and veneers, planned around how your smile already looks.',
      image:
        'https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=1600&q=80',
      alt: 'Close-up of a natural, healthy smile',
    },
    {
      title: 'Dental Implants',
      description:
        'A permanent replacement for a missing tooth, planned from a digital scan.',
      image:
        'https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dental implant model on a consultation desk',
    },
  ],

  /* --- Secondary services (shown as a simple list under the cards) ------- */
  secondaryServices: [
    'Teeth Whitening',
    'Clear Aligners',
    'Crowns & Bridges',
    'Children’s Dentistry',
    'Emergency Care',
  ],

  /* --- Why choose us (kept to things that are actually true) ------------- */
  whyChooseUs: {
    eyebrow: 'Why patients stay',
    heading: 'Four things we get right',
    points: [
      {
        label: 'Same-day emergencies',
        detail: 'Call before noon and we will find you a slot that day.',
      },
      {
        label: 'Digital scans',
        detail: 'A small camera instead of putty trays and gagging.',
      },
      {
        label: 'Costs up front',
        detail: 'A written estimate before treatment begins. No surprises after.',
      },
      {
        label: 'Parking at the door',
        detail: 'Free lot on Kingston Pike, level access from the car park.',
      },
    ],
  },

  /* --- Testimonials ------------------------------------------------------
   * EMPTY ON PURPOSE. Never invent reviews. Add real ones like this:
   *   { quote: 'What the patient actually wrote.', name: 'First name L.' }
   * and the testimonials section will appear on the site by itself.
   * -------------------------------------------------------------------- */
  testimonials: [],

  /* --- FAQ --------------------------------------------------------------- */
  faq: [
    {
      question: 'Are you taking new patients?',
      answer:
        'Yes. Call us and we will book you a first appointment, usually within the same week.',
    },
    {
      question: 'What happens at a first visit?',
      answer:
        'An exam, a set of digital images, and a conversation about anything that needs attention. Nothing is treated on the day unless you want it to be.',
    },
    {
      question: 'Do you see children?',
      answer:
        'We do. Children are welcome for check-ups and cleanings, and we keep first visits short and easy.',
    },
    {
      question: 'What if I have a dental emergency?',
      answer:
        'Call the practice. If you reach us before noon on a working day, we will do our best to see you the same day.',
    },
  ],

  /* --- Navigation -------------------------------------------------------- */
  navLinks: [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Questions', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
}

/*
 * COLOURS
 * Change a value here and it changes everywhere on the site at once.
 * Keep the palette small — that is what makes it look expensive.
 */
export const theme = {
  brand: '#0F56C9', // primary blue — buttons, links
  brandDark: '#0A3A85', // pressed / hover state for the blue
  secondary: '#0A1F3C', // deep navy — hero overlay, footer
  accent: '#0FA8A0', // the single accent — eyebrows and small marks
  ink: '#0B1620', // near-black for headings and body text
  inkSoft: '#4A5D72', // secondary text
  bg: '#FBFCFE', // page background
  neutral: '#EDF2F8', // alternating section background
  line: '#DCE5EF', // borders and dividers
}

export default business

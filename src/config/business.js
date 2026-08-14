/*
 * ============================================================================
 * PRACTICE CONFIG — EDIT THIS FILE ONLY
 * ============================================================================
 * Every word, price, photograph, colour and phone number on this website comes
 * from this one file. To turn this prototype into a real practice's website you
 * edit this file and nothing else.
 *
 * HOW IT WORKS
 *  - Change the text between the 'quote marks' and save. The site updates.
 *  - Leave a value empty ('') and that piece disappears from the site cleanly.
 *    No whatsapp number = no WhatsApp buttons anywhere. No sms = no text
 *    buttons. Empty `reviews.items` = the reviews section does not render.
 *  - Anything carrying `sample: true` renders with a visible "Sample" chip, so
 *    a demonstration price or statistic can never be mistaken for a real claim.
 *
 * PROTOTYPE NOTICE
 *  This is a demonstration site built by Business Web Express. The practice,
 *  the dentist, the reviews, the offer, the financing example and the insurance
 *  results are all FICTIONAL. The phone number uses the 555-01xx range that is
 *  reserved for examples. Replace every one of them before this represents a
 *  real business. See `isPrototype` below.
 * ============================================================================
 */

export const business = {
  /* --- Identity ---------------------------------------------------------- */
  // Kept deliberately neutral: a dentist looking at this prototype should be
  // able to picture their own name here.
  name: 'Sample Dental',
  shortName: 'Sample Dental',
  type: 'Dental Clinic',
  tagline: 'Modern dentistry. Compassionate care.',
  city: 'Knoxville, TN',

  // Master switch for every "this is a demonstration" affordance on the site.
  // Set to false only when real content has replaced all of the sample data.
  isPrototype: true,
  prototypeNote:
    'Demonstration website. The practice, dentist, reviews, offers and insurance results shown here are fictional samples.',

  /* --- Contact ----------------------------------------------------------- */
  phoneDisplay: '(865) 555-0142',
  phoneLink: '+18655550142',
  email: 'hello@sampledental.com',
  sms: '+18655550142',
  whatsapp: '18655550142',
  address: '4620 Kingston Pike, Suite 210, Knoxville, TN 37919',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=4620+Kingston+Pike+Suite+210+Knoxville+TN+37919',

  // Empty strings are hidden. Real practices drop their profile URLs in here.
  socials: {
    facebook: '',
    instagram: '',
    google: '',
  },

  /* --- Calls to action --------------------------------------------------- */
  cta: {
    book: 'Book an Appointment',
    bookShort: 'Book Appointment',
    call: 'Call Now',
    text: 'Text Us',
    whatsapp: 'WhatsApp',
    directions: 'Get directions',
  },

  messagePrefill: 'Hi Sample Dental, I would like to book an appointment.',

  /* --- Opening hours ----------------------------------------------------- */
  hours: [
    { days: 'Monday – Thursday', time: '8:00 AM – 5:00 PM' },
    { days: 'Friday', time: '8:00 AM – 2:00 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  hoursSummary: 'Open Mon – Fri',

  /* --- Rating -----------------------------------------------------------
   * SAMPLE DATA. These numbers are invented for the demonstration and are
   * labelled as such everywhere they appear. Never present them as real.
   * -------------------------------------------------------------------- */
  rating: {
    score: 4.9,
    count: 327,
    sourceLabel: 'patient reviews',
    sample: true,
  },

  /* --- Hero -------------------------------------------------------------- */
  hero: {
    eyebrow: 'Knoxville, TN · Family & Cosmetic Dentistry',
    heading: 'A better dental experience starts with a smile.',
    supporting:
      'Modern dentistry, compassionate care, and appointments designed around your life — not the other way round.',
    trustLine: [
      'Accepting new patients',
      'Same-day emergency visits',
      'Most insurance accepted',
    ],
    /* A portrait, not a scene — the hero is a split layout, so this sits in a
     * tall panel beside the copy rather than behind it. `imageFocus` is the
     * object-position: portraits need the frame held near the top or the crop
     * eats the top of the head on short viewports.
     *
     * Stock photography of a real person. The alt text and the copy around it
     * deliberately never call her a patient and never imply she endorsed
     * anything — she did not, and this practice does not exist. */
    /* Served from our own /public rather than hotlinked: the original lived on
     * a signed CDN URL that can expire, and a hero that 404s is worse than a
     * plainer one that loads. Replacing the picture means dropping a new file
     * in public/ and changing this line. */
    image: '/hero-patient.jpg',
    imageAlt: 'A smiling woman sitting in a dental chair in a bright modern surgery',
    imageFocus: '42% center',
    cardLabel: 'At a glance',
  },

  /* --- New patients -----------------------------------------------------
   * The conversion block directly under the hero.
   * -------------------------------------------------------------------- */
  newPatients: {
    eyebrow: 'New patients welcome',
    heading: 'Your first visit should be easy.',
    intro:
      'No paperwork marathon, no surprise invoice, no waiting weeks for a slot. Here is exactly what to expect.',
    cards: [
      {
        id: 'offer',
        kicker: 'New patient special',
        title: 'Exam, X-rays and cleaning',
        price: '$99',
        priceNote: 'Normally $310',
        detail:
          'A full examination, a set of digital X-rays and a professional cleaning, in one visit.',
        cta: 'Book my first visit',
        featured: true,
        sample: true,
      },
      {
        id: 'insurance',
        kicker: 'No insurance?',
        title: 'No problem.',
        detail:
          'An in-house membership plan and flexible payment options mean cover is not what decides your care.',
        cta: 'See payment options',
        ctaHref: '#financing',
        sample: true,
      },
      {
        id: 'start',
        kicker: 'Ready to get started?',
        title: 'Book online in a minute.',
        detail:
          'Pick your service, your dentist and a time that suits you. No account, no card, no hold music.',
        cta: 'Book my first visit',
      },
    ],
  },

  /* --- Services ---------------------------------------------------------
   * Each service also generates its own page at /services/<slug>.
   * `image` is placeholder photography — swap for the practice's own.
   * -------------------------------------------------------------------- */
  services: [
    {
      slug: 'family-dentistry',
      name: 'Family Dentistry',
      headline: 'Care for every age, in one place',
      short:
        'Cleanings, exams, fillings and the routine care that keeps bigger work off the table.',
      icon: 'family',
      image:
        'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dental team treating a patient during a routine appointment',
      overview:
        'Most of what we do is everyday dentistry, done carefully and without rush. One practice looks after the whole household, from a toddler’s first check-up to a grandparent’s crown, which means one set of appointments and one team that knows your family.',
      benefits: [
        'Check-ups and cleanings that catch problems while they are still small',
        'Children seen from their first tooth, with short and friendly first visits',
        'Back-to-back family appointments so you make one trip, not four',
        'A written estimate before any treatment begins',
      ],
      candidates: [
        'You are due a check-up, or cannot remember your last one',
        'You want one practice for everyone in the house',
        'Your child is ready for their first dental visit',
      ],
      whatToExpect: [
        { title: 'A proper look', detail: 'An examination and digital images, with time to ask questions.' },
        { title: 'A clear plan', detail: 'What needs doing now, what can wait, and what each option costs.' },
        { title: 'The cleaning', detail: 'A thorough hygiene appointment, usually on the same visit.' },
      ],
      faq: [
        {
          question: 'How often should I come in?',
          answer:
            'Every six months suits most people. If your gums need closer attention we may suggest three or four monthly visits, and we will explain why.',
        },
        {
          question: 'At what age should my child first visit?',
          answer:
            'Around their first birthday, or when the first tooth appears. Early visits are short, friendly and mostly about getting comfortable in the chair.',
        },
      ],
    },
    {
      slug: 'cosmetic-dentistry',
      name: 'Cosmetic Dentistry',
      headline: 'Transform your smile',
      short:
        'Whitening, bonding and veneers, planned around how your smile already looks.',
      icon: 'sparkle',
      image:
        'https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?auto=format&fit=crop&w=1600&q=80',
      alt: 'Close-up of a natural, healthy smile',
      overview:
        'Cosmetic work should look like you on a good day, not like someone else entirely. We plan every case around your face, your bite and how your smile already moves, then show you the design before a single tooth is touched.',
      benefits: [
        'A digital preview of the result before treatment starts',
        'Options at every level, from whitening to a full smile design',
        'Natural-looking materials matched to your existing teeth',
        'Treatment sequenced so you always know what comes next',
      ],
      candidates: [
        'You dislike the colour, shape or spacing of your front teeth',
        'You have chips, wear or old fillings that no longer match',
        'You have an event coming up and want to look like yourself',
      ],
      whatToExpect: [
        { title: 'Consultation', detail: 'Photographs, a scan, and an honest conversation about what is realistic.' },
        { title: 'The design', detail: 'You see and approve the proposed result before any treatment.' },
        { title: 'The treatment', detail: 'Carried out in stages, with you checking each one.' },
      ],
      faq: [
        {
          question: 'Will it look obvious?',
          answer:
            'Not if it is planned properly. The aim is that people notice you look well, not that they notice your dentistry.',
        },
        {
          question: 'How long does it last?',
          answer:
            'It depends on the treatment and how you look after it. We will tell you the realistic lifespan of each option before you choose.',
        },
      ],
    },
    {
      slug: 'dental-implants',
      name: 'Dental Implants',
      headline: 'A replacement that feels like yours',
      short:
        'A permanent replacement for a missing tooth, planned from a digital scan.',
      icon: 'implant',
      image:
        'https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dental implant model on a consultation desk',
      overview:
        'An implant replaces the root of a missing tooth, so the replacement is anchored in bone rather than resting on the teeth around it. Planned from a 3D scan, placed precisely, and restored with a crown matched to the teeth beside it.',
      benefits: [
        'Nothing to take out, and nothing that clicks',
        'The neighbouring teeth are left untouched',
        'Planned from a 3D scan before anything is placed',
        'Bone is preserved where the tooth used to be',
      ],
      candidates: [
        'You are missing a tooth, or about to lose one',
        'You wear a denture that moves when you eat',
        'A bridge would mean cutting down healthy teeth',
      ],
      whatToExpect: [
        { title: 'The scan', detail: 'A 3D scan shows exactly how much bone is available and where.' },
        { title: 'Placement', detail: 'A single appointment under local anaesthetic, usually under an hour.' },
        { title: 'Healing', detail: 'A few months while it integrates, with a temporary in place.' },
        { title: 'The crown', detail: 'The final tooth, colour-matched and fitted.' },
      ],
      faq: [
        {
          question: 'Is it painful?',
          answer:
            'Placement is done under local anaesthetic and most people describe it as easier than an extraction. Discomfort afterwards is usually managed with ordinary painkillers.',
        },
        {
          question: 'How long does the whole process take?',
          answer:
            'Typically three to six months from placement to final crown, because the implant needs time to integrate with the bone.',
        },
      ],
    },
    {
      slug: 'invisalign',
      name: 'Invisalign®',
      headline: 'Straighten up, quietly',
      short:
        'Clear aligners that move your teeth without anyone needing to know.',
      icon: 'aligner',
      image:
        'https://images.unsplash.com/photo-1663755489920-5e09f66d011a?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dental hygienist checking a relaxed patient in the treatment chair',
      overview:
        'A series of clear, removable aligners moves your teeth a fraction at a time. You take them out to eat and to brush, and most people you meet will not notice you are wearing them.',
      benefits: [
        'Removable, so you eat and clean normally',
        'A digital plan showing the finish before you begin',
        'Fewer appointments than fixed braces for most cases',
        'Comfortable to wear, with no wires to tighten',
      ],
      candidates: [
        'Your teeth are crowded, spaced or have shifted over time',
        'You wore braces years ago and things have moved back',
        'You want straighter teeth without visible hardware',
      ],
      whatToExpect: [
        { title: 'The scan', detail: 'A digital scan instead of impression trays.' },
        { title: 'Your plan', detail: 'You see the projected movement, step by step, before starting.' },
        { title: 'The aligners', detail: 'Changed on a schedule, with short check-ins along the way.' },
        { title: 'Retention', detail: 'A retainer to hold the result once you are finished.' },
      ],
      faq: [
        {
          question: 'How long will it take?',
          answer:
            'Simple cases can finish in a few months; more complex ones take longer. You will be given a realistic estimate after the scan, not before.',
        },
        {
          question: 'How many hours a day do I wear them?',
          answer:
            'Around 20 to 22 hours. They come out to eat and to clean your teeth, and go straight back in.',
        },
      ],
      // Invisalign is a registered trademark of Align Technology, Inc. It is
      // named here only to describe the type of treatment offered.
      trademarkNote: 'Invisalign is a registered trademark of Align Technology, Inc.',
    },
    {
      slug: 'emergency-dentistry',
      name: 'Emergency Dentistry',
      headline: 'Seen today, not next week',
      short:
        'Toothache, a broken tooth or a lost crown — call before noon and we will find you a slot.',
      icon: 'emergency',
      image:
        'https://images.unsplash.com/photo-1663755785915-ef1748dda404?auto=format&fit=crop&w=1600&q=80',
      alt: 'Bright treatment room with daylight from a large window',
      overview:
        'Dental pain does not wait politely for an appointment. We hold slots every working day for people in trouble, and the first job is always to get you comfortable — the long-term plan can wait until you can think straight.',
      benefits: [
        'Same-day slots held every working day',
        'Pain dealt with first, decisions afterwards',
        'A clear price before treatment, even in an emergency',
        'Seen whether or not you are already a patient here',
      ],
      candidates: [
        'You are in pain, or have been kept awake by a tooth',
        'A tooth has broken, or a crown or filling has come out',
        'A tooth has been knocked out — call immediately',
      ],
      whatToExpect: [
        { title: 'Call us', detail: 'Phone rather than book online, so we can triage properly.' },
        { title: 'Get comfortable', detail: 'The immediate priority is stopping the pain.' },
        { title: 'Then decide', detail: 'Once you are out of pain we talk through the options.' },
      ],
      faq: [
        {
          question: 'I am not registered with you. Will you still see me?',
          answer:
            'Yes. Emergency slots are open to anyone, and being seen once does not oblige you to move practices.',
        },
        {
          question: 'A tooth has been knocked out. What should I do?',
          answer:
            'Hold it by the crown, not the root, keep it in milk or in your cheek, and call us immediately. Time matters a great deal here.',
        },
      ],
      urgent: true,
    },
    {
      slug: 'teeth-whitening',
      name: 'Teeth Whitening',
      headline: 'Brighter, without the guesswork',
      short:
        'Professionally supervised whitening that lifts the shade without wrecking your enamel.',
      icon: 'shine',
      image:
        'https://images.unsplash.com/photo-1663755781620-b9b8fdbdead5?auto=format&fit=crop&w=1600&q=80',
      alt: 'Modern treatment room with a dental chair',
      overview:
        'Supermarket whitening kits are weak, and the strong ones sold online are a gamble with your gums. Supervised whitening uses custom trays made from a scan of your teeth, so the gel goes where it should and nowhere else.',
      benefits: [
        'Custom trays, so the gel stays off your gums',
        'A recorded starting shade, so you can see the change',
        'Sensitivity managed rather than endured',
        'Top-up gel available without starting over',
      ],
      candidates: [
        'Your teeth have yellowed with age, coffee or red wine',
        'You have an event coming up in a few weeks',
        'A shop-bought kit did not do very much',
      ],
      whatToExpect: [
        { title: 'The check', detail: 'Whitening only works properly on healthy teeth and gums.' },
        { title: 'Your trays', detail: 'Made from a digital scan, fitted at a short appointment.' },
        { title: 'At home', detail: 'Wear as directed for a couple of weeks, with us checking in.' },
      ],
      faq: [
        {
          question: 'Will it make my teeth sensitive?',
          answer:
            'Some people get short-lived sensitivity. It settles, and there are gels and pastes that reduce it considerably.',
        },
        {
          question: 'Does it whiten crowns and fillings?',
          answer:
            'No. Whitening only lifts natural tooth. If you have crowns or fillings at the front, we will discuss the order to do things in.',
        },
      ],
    },
  ],

  /* --- Secondary services (a simple list under the service cards) --------- */
  secondaryServices: [
    'Crowns & Bridges',
    'Root Canal Treatment',
    'Dentures',
    'Gum Treatment',
    'Mouthguards',
    'Children’s Dentistry',
  ],

  /* --- The dentist -------------------------------------------------------
   * SAMPLE PERSON. Dr Carter is invented for this demonstration. Replace the
   * name, the words and the photography with the practice's own before use.
   * `image: ''` renders the designed monogram frame instead of a photograph,
   * which is deliberate — no real person's face is attached to a fake name.
   * -------------------------------------------------------------------- */
  doctor: {
    eyebrow: 'Meet your dentist',
    name: 'Dr. Emily Carter',
    initials: 'EC',
    credentialLine: 'DDS · General & Cosmetic Dentistry',
    heading: 'Advanced dentistry with a gentle touch.',
    quote:
      'My goal is simple: make every patient feel comfortable, informed and confident about their dental care.',
    bio: [
      'Dr. Carter has looked after families in West Knoxville for fifteen years, and still books the longest first appointments of anyone in the practice — because most dental anxiety comes from not knowing what is about to happen.',
      'She takes a conservative view of treatment. If something can be watched rather than drilled, she will tell you so, in writing.',
    ],
    credentials: [
      { value: '15+', label: 'Years in practice' },
      { value: 'Adv.', label: 'Cosmetic dentistry' },
      { value: 'Certified', label: 'Invisalign provider' },
      { value: 'Adv.', label: 'Implant dentistry' },
    ],
    cta: 'Meet Dr. Carter',
    image: '',
    imageAlt: '',
    sample: true,
  },

  /* --- Reviews -----------------------------------------------------------
   * SAMPLE REVIEWS. Every one of these is invented for the demonstration and
   * is labelled as such on the page. Never present invented reviews as real,
   * and never imply they came from Google or any other platform.
   * Replace with genuine, attributable reviews before launch.
   * -------------------------------------------------------------------- */
  reviews: {
    eyebrow: 'What patients say',
    heading: 'Patients love their smiles',
    sample: true,
    items: [
      {
        quote:
          'I have avoided dentists for eleven years. They got me in the same week, explained every single thing before they did it, and I did not need anything like the work I was braced for.',
        name: 'Marcus T.',
        context: 'New patient exam',
      },
      {
        quote:
          'My daughter actually asks when we are going back. Whatever they do with children, it works — the first visit was ten minutes and she got to hold the mirror.',
        name: 'Priya R.',
        context: 'Family dentistry',
      },
      {
        quote:
          'Cracked a molar on a Sunday. Called at eight on Monday morning and was in the chair by eleven. The price they quoted on the phone was the price I paid.',
        name: 'Denise W.',
        context: 'Emergency visit',
      },
      {
        quote:
          'The digital preview sold me. Seeing what my teeth would look like before agreeing to anything took the whole gamble out of it.',
        name: 'Jonathan A.',
        context: 'Cosmetic consultation',
      },
      {
        quote:
          'Six months of aligners and nobody at work noticed I was wearing them. The reception team booked my check-ins around my shifts without being asked twice.',
        name: 'Sofia M.',
        context: 'Clear aligners',
      },
    ],
  },

  /* --- Smile gallery -----------------------------------------------------
   * ILLUSTRATIVE ONLY. These are drawn diagrams, not photographs of patients.
   * Using real before/after patient photography requires that patient's
   * written consent, so the prototype ships with illustrations instead.
   * -------------------------------------------------------------------- */
  smileGallery: {
    eyebrow: 'Smile gallery',
    heading: 'See what’s possible',
    intro:
      'Drag the handle to compare. These are illustrations of typical outcomes, not photographs of patients.',
    cta: 'Explore smile transformations',
    sample: true,
    cases: [
      {
        id: 'makeover',
        title: 'Smile makeover',
        treatments: 'Porcelain veneers · Whitening · Cosmetic contouring',
        beforeLabel: 'Before',
        afterLabel: 'After',
      },
      {
        id: 'whitening',
        title: 'Whitening and contouring',
        treatments: 'Supervised whitening · Edge reshaping',
        beforeLabel: 'Before',
        afterLabel: 'After',
      },
      {
        id: 'alignment',
        title: 'Clear aligner treatment',
        treatments: 'Invisalign® · Retention',
        beforeLabel: 'Before',
        afterLabel: 'After',
      },
    ],
  },

  /* --- Insurance ---------------------------------------------------------
   * DEMONSTRATION ONLY. Selecting a provider returns sample wording. It does
   * not check any real plan, and the prototype practice is not in network
   * with anybody. Wire this to the practice's real participation list first.
   * -------------------------------------------------------------------- */
  insurance: {
    eyebrow: 'Insurance',
    heading: 'Do we accept your insurance?',
    intro:
      'Pick your provider and we will tell you what usually happens. Benefits vary plan by plan, so the office always verifies before you are treated.',
    providers: [
      'Delta Dental',
      'Cigna',
      'Aetna',
      'MetLife',
      'BlueCross BlueShield',
      'UnitedHealthcare',
      'Guardian',
      'Humana',
    ],
    result:
      'Good news — a practice like this one typically works with many PPO plans from {provider}. Contact the office to verify your exact benefits before your visit.',
    noneResult:
      'No insurance is not a problem. Ask the office about the membership plan and payment options.',
    noInsuranceLabel: 'I don’t have insurance',
    cta: 'Ask about insurance',
    note: 'Demonstration result. This prototype is not in network with any insurer.',
    sample: true,
  },

  /* --- Financing ---------------------------------------------------------
   * SAMPLE FIGURES. The monthly example is illustrative arithmetic, not an
   * offer of credit, and no lender is affiliated with this prototype.
   * -------------------------------------------------------------------- */
  financing: {
    eyebrow: 'Payment options',
    heading: 'Your smile. Your budget.',
    intro:
      'Treatment can be paired with a payment plan, so the right treatment is not decided by what is in your account this month.',
    example: {
      amount: 'From $99/month',
      detail: 'on treatment plans over $1,200',
      note: 'Sample financing example',
    },
    options: [
      {
        title: 'In-house membership',
        detail: 'A flat annual fee covering check-ups, cleanings and a discount on treatment.',
      },
      {
        title: 'Payment plans',
        detail: 'Spread the cost of larger treatment over monthly instalments.',
      },
      {
        title: 'Insurance billed directly',
        detail: 'We handle the paperwork and bill your insurer for you where we can.',
      },
      {
        title: 'Written estimates',
        detail: 'Every plan is costed in writing before anything begins. No surprises.',
      },
    ],
    cta: 'Explore payment options',
    sample: true,
  },

  /* --- Office tour ------------------------------------------------------- */
  officeTour: {
    eyebrow: 'Take a look around',
    heading: 'Designed around your comfort',
    intro:
      'Have a look before you arrive. Swap these for photographs of your own practice and this section does the same job for you.',
    cta: 'Take a look around',
    areas: [
      {
        title: 'Reception',
        detail: 'Somewhere you would not mind waiting, though you rarely will.',
        image:
          'https://images.unsplash.com/photo-1663755790576-61733ecaedb1?auto=format&fit=crop&w=1400&q=80',
        alt: 'Waiting room with upholstered armchairs, warm wood floors and pendant lights',
        span: 'wide',
      },
      {
        title: 'Treatment rooms',
        detail: 'Daylight, a screen you can see, and a chair that does not feel like a lab.',
        image:
          'https://images.unsplash.com/photo-1663755785915-ef1748dda404?auto=format&fit=crop&w=1200&q=80',
        alt: 'Treatment room with a large window and daylight',
      },
      {
        title: 'Technology',
        detail: 'Digital scanning and imaging, so no putty trays and far less guesswork.',
        image:
          'https://images.unsplash.com/photo-1663755781620-b9b8fdbdead5?auto=format&fit=crop&w=1200&q=80',
        alt: 'Modern dental treatment room with digital imaging equipment',
      },
      {
        title: 'Your visit',
        detail: 'Time to ask questions, and a written plan before anything starts.',
        image:
          'https://images.unsplash.com/photo-1663755489920-5e09f66d011a?auto=format&fit=crop&w=1400&q=80',
        alt: 'Hygienist checking a relaxed patient in the treatment chair',
        span: 'wide',
      },
    ],
  },

  /* --- About ------------------------------------------------------------- */
  about: {
    eyebrow: 'About the practice',
    heading: 'A dental office that runs on time',
    paragraphs: [
      'We are a general and cosmetic dental practice on Kingston Pike, looking after families across West Knoxville. Most of what we do is everyday dentistry — cleanings, fillings, crowns — done carefully and without rush.',
      'You will get a written estimate before any treatment starts, and time to ask questions first. If something needs doing, we explain why. If it can wait, we tell you that too.',
    ],
    // REPLACE THIS FIRST. A team photograph implicitly says "this is us", so
    // stock people are fine for a prototype and not fine for a real practice.
    image:
      'https://images.unsplash.com/photo-1663755780449-6811a482308e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'The practice team standing together in the waiting room, smiling',
    sample: true,
  },

  /* --- Why choose us ----------------------------------------------------- */
  whyChooseUs: {
    eyebrow: 'Why patients stay',
    heading: 'Four things we get right',
    points: [
      { label: 'Same-day emergencies', detail: 'Call before noon and we will find you a slot that day.' },
      { label: 'Digital scans', detail: 'A small camera instead of putty trays and gagging.' },
      { label: 'Costs up front', detail: 'A written estimate before treatment begins. No surprises after.' },
      { label: 'Parking at the door', detail: 'Free lot on Kingston Pike, level access from the car park.' },
    ],
  },

  /* --- Appointment scheduler --------------------------------------------
   * DEMONSTRATION SCHEDULER. The front end genuinely works; it simply is not
   * wired to a practice management system yet. Point `endpoint` at a real
   * booking API and the confirmation step will submit to it.
   * -------------------------------------------------------------------- */
  appointment: {
    eyebrow: 'Appointments',
    heading: 'Book in about a minute',
    intro:
      'Choose what you need, who you would like to see and when. We confirm every request the same working day.',
    endpoint: '',
    services: [
      { id: 'cleaning', label: 'Routine Cleaning', duration: '45 min' },
      { id: 'new-patient', label: 'New Patient Exam', duration: '60 min' },
      { id: 'emergency', label: 'Dental Emergency', duration: '30 min', urgent: true },
      { id: 'whitening', label: 'Teeth Whitening', duration: '45 min' },
      { id: 'invisalign', label: 'Invisalign Consultation', duration: '30 min' },
      { id: 'implant', label: 'Dental Implant Consultation', duration: '45 min' },
    ],
    providers: [
      { id: 'carter', name: 'Dr. Emily Carter', role: 'General & Cosmetic Dentistry', initials: 'EC' },
      { id: 'okafor', name: 'Dr. Daniel Okafor', role: 'Implants & Oral Surgery', initials: 'DO' },
      { id: 'nguyen', name: 'Dr. Hannah Nguyen', role: 'Family Dentistry & Orthodontics', initials: 'HN' },
      { id: 'any', name: 'No preference', role: 'First available appointment', initials: '—' },
    ],
    times: ['9:00 AM', '10:30 AM', '11:45 AM', '1:30 PM', '2:45 PM', '4:00 PM'],
    closedDays: [0, 6],
    maxDaysAhead: 120,
    note: 'Demonstration scheduler. Nothing is submitted and no appointment is reserved.',
    steps: ['Service', 'Dentist', 'Date', 'Time', 'Details', 'Confirm'],
    sample: true,
  },

  /* --- Emergency banner -------------------------------------------------- */
  emergency: {
    heading: 'Toothache or dental emergency?',
    detail: 'Same-day appointments available. Call the office and we will triage you straight away.',
    cta: 'Call now',
  },

  /* --- Text-us widget ---------------------------------------------------- */
  smsWidget: {
    label: 'Text our office',
    heading: 'What can we help with?',
    intro: 'Pick a topic and we will start the message for you.',
    options: [
      { id: 'appointment', label: 'I’d like to schedule an appointment', message: 'Hi, I would like to schedule an appointment.' },
      { id: 'emergency', label: 'I have a dental emergency', message: 'Hi, I have a dental emergency and need to be seen today.' },
      { id: 'insurance', label: 'I have an insurance question', message: 'Hi, I have a question about whether you work with my dental insurance.' },
      { id: 'invisalign', label: 'I’d like information about Invisalign', message: 'Hi, I would like some information about Invisalign treatment.' },
    ],
    cta: 'Continue by text',
    desktopNote:
      'Texting opens on a phone. On a computer, use the number below or send us a WhatsApp message.',
  },

  /* --- FAQ --------------------------------------------------------------- */
  faq: [
    {
      question: 'Are you accepting new patients?',
      answer:
        'Yes. Book online or call, and you will usually be seen within the same week. New patients get a longer first appointment so there is time to talk properly.',
    },
    {
      question: 'Do you accept my insurance?',
      answer:
        'Use the insurance checker on this page for a quick answer, then call the office to verify your exact benefits. Plans vary a great deal, even within the same insurer.',
    },
    {
      question: 'What should I expect during my first appointment?',
      answer:
        'An examination, a set of digital images, and a conversation about anything that needs attention. Nothing is treated on the day unless you want it to be, and you leave with a written plan.',
    },
    {
      question: 'Do you offer payment plans?',
      answer:
        'Yes. Larger treatment can be spread over monthly instalments, and there is an in-house membership plan for patients without insurance. Every plan is costed in writing first.',
    },
    {
      question: 'Can I get an emergency appointment?',
      answer:
        'We hold emergency slots every working day. Call rather than book online so we can triage you properly — if you reach us before noon we will do our best to see you the same day.',
    },
    {
      question: 'Do you offer treatment for anxious patients?',
      answer:
        'Yes, and it is more common than you would think. Tell us when you book. Longer appointments, a stop signal, and an explanation before every step make more difference than most people expect.',
    },
    {
      question: 'How often should I have a dental cleaning?',
      answer:
        'Every six months suits most people. If your gums need closer attention we may suggest three or four monthly visits, and we will explain exactly why rather than simply booking you in.',
    },
  ],

  /* --- Closing call to action -------------------------------------------- */
  finalCta: {
    heading: 'Ready to love your smile?',
    text: 'We’re welcoming new patients and would love to meet you.',
    supporting: 'Online scheduling · Same-day emergency visits · Flexible payment options',
  },

  /* --- Business Web Express -----------------------------------------------
   * The sales layer. This is the only part of the site that is about the
   * agency rather than the practice — keep it small and keep it tasteful.
   * -------------------------------------------------------------------- */
  bwe: {
    tabLabel: 'Want this for your practice?',
    heading: 'Imagine this website customised for your dental practice.',
    intro: 'Everything you have just clicked through, rebuilt around your practice.',
    bullets: [
      'Your logo and your colours',
      'Your dentists and your team',
      'Your services and your pricing',
      'Your real patient reviews',
      'Your photography, not stock',
      'Your appointment system, connected',
    ],
    closing: 'Built by Business Web Express. No upfront design fee. No obligation to buy.',
    cta: 'Build my free prototype',
    ctaHref: 'https://businesswebexpress.com/contact',
    secondary: 'Learn about Business Web Express',
    secondaryHref: 'https://businesswebexpress.com',
  },

  /* --- Navigation --------------------------------------------------------
   * `menuOnly: true` keeps a link out of the desktop header but still lists it
   * in the mobile menu. The header only has room for about eight links before
   * it starts squeezing the phone number and the Book button, so the sections
   * that matter least to a first-time visitor live in the menu instead.
   * ---------------------------------------------------------------------- */
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'New Patients', href: '/#new-patients' },
    { label: 'Services', href: '/#services', children: 'services' },
    { label: 'Dentist', href: '/#dentist' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Smile Gallery', href: '/#smile-gallery' },
    { label: 'Our Office', href: '/#tour', menuOnly: true },
    { label: 'Insurance', href: '/#insurance' },
    { label: 'Financing', href: '/#financing', menuOnly: true },
    { label: 'About', href: '/#about', menuOnly: true },
    { label: 'Contact', href: '/#contact' },
  ],

  /* --- SEO ---------------------------------------------------------------
   * Deliberately fictional. Do NOT publish real-world LocalBusiness data for
   * a prototype — search engines and map providers should not index a
   * practice that does not exist.
   * -------------------------------------------------------------------- */
  seo: {
    titleSuffix: 'Dentist in Knoxville, TN',
    description:
      'Sample Dental is a demonstration dental website by Business Web Express. Online booking, insurance answers, same-day emergency visits and a smile gallery — all sample content.',
    ogImage:
      'https://images.unsplash.com/photo-1663755787934-3742b0f5983a?auto=format&fit=crop&w=1200&q=80',
    // A prototype must not be indexed as though it were a real practice.
    noindex: true,
  },
}

// The spec's preferred name for this module. Same object, either import works.
export const practiceData = business

/*
 * COLOURS
 * Change a value here and it changes everywhere on the site at once.
 * Keep the palette small — that is what makes it look expensive.
 */
export const theme = {
  brand: '#0F766E', // deep teal — buttons, links
  brandDark: '#0B5A54', // pressed / hover state for the teal
  brandSoft: '#E6F4F1', // pale teal wash for chips and soft panels
  secondary: '#08312E', // near-black teal — footer, tooltips
  heroInk: '#14100E', // warm near-black — the hero's own ground
  accent: '#37D3B8', // bright aqua — glows and marks on DARK backgrounds only
  accentInk: '#0B7C72', // readable aqua for small text on LIGHT backgrounds
  gold: '#B8860B', // review stars on light backgrounds
  goldBright: '#FFC24B', // review stars on dark backgrounds
  ink: '#12201F', // near-black for headings and body text
  inkSoft: '#566360', // secondary text
  bg: '#FBFCFC', // page background
  neutral: '#F1F6F5', // alternating section background
  line: '#DDE8E6', // borders and dividers
  danger: '#C0483A', // emergency accents and form errors
}

/*
 * GRADIENTS
 * The "wow" layer. Every colour that white text sits on stays dark enough to
 * read, so the page has depth without becoming illegible. The bright aqua is
 * used for glow and decoration, never behind words.
 *
 * The hero is the exception. It carries no brand colour at all — a coloured
 * wash over a photograph tints skin tones, which reads cheap — and it is
 * graded WARM, because a cool grade over a clinic photo makes a dental
 * practice look like a lab.
 */
export const gradients = {
  brand: 'linear-gradient(120deg, #0F766E 0%, #12897C 55%, #159A84 100%)',
  brandHover: 'linear-gradient(120deg, #0B5A54 0%, #0E6E63 55%, #117D6B 100%)',
  accent: 'linear-gradient(120deg, #37D3B8 0%, #0F766E 100%)',
  hero:
    'linear-gradient(112deg, rgba(16,11,8,0.94) 0%, rgba(28,19,14,0.88) 36%, rgba(48,32,21,0.55) 66%, rgba(122,72,30,0.26) 100%)',
  panel: 'linear-gradient(150deg, #08312E 0%, #0D4B45 55%, #106157 100%)',
  warm: 'linear-gradient(135deg, #08312E 0%, #14554A 55%, #A85428 100%)',
}

export default business

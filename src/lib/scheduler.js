/*
 * Appointment scheduler logic, kept free of React so it can be tested directly.
 * The component in components/Booking.jsx renders these results; every rule
 * about what counts as a valid booking lives here.
 */

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const STEPS = [
  { id: 'service', label: 'Service' },
  { id: 'provider', label: 'Dentist' },
  { id: 'date', label: 'Date' },
  { id: 'time', label: 'Time' },
  { id: 'details', label: 'Details' },
  { id: 'confirm', label: 'Confirm' },
]

const pad = (value) => String(value).padStart(2, '0')

/** A Date -> 'YYYY-MM-DD', in LOCAL time. */
export const toInputDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/**
 * Read 'YYYY-MM-DD' as a LOCAL date. `new Date('2026-08-15')` is parsed as UTC,
 * which lands on the previous day for anyone west of Greenwich — which is
 * everyone this practice would ever see.
 */
export function parseInputDate(value) {
  const [year, month, day] = String(value).split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatLongDate(value) {
  return parseInputDate(value).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/** "Saturdays and Sundays" — used to explain why a date was rejected. */
export function closedDayNames(closedDays) {
  const names = [...closedDays]
    // Sunday is day 0, but it reads last in a week.
    .sort((a, b) => (a || 7) - (b || 7))
    .map((day) => `${DAY_NAMES[day]}s`)

  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/** The first and last day that may be requested. */
export function getDateBounds(maxDaysAhead, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const last = new Date(today)
  last.setDate(last.getDate() + maxDaysAhead)
  return { today, last, min: toInputDate(today), max: toInputDate(last) }
}

/**
 * Why a given day cannot be booked, or null if it can.
 * Returned as a reason rather than a boolean so the calendar and the validator
 * can both explain themselves in the same words.
 */
export function dayUnavailableReason(value, { today, last, closedDays = [] }) {
  if (!value) return 'empty'
  const date = parseInputDate(value)
  if (Number.isNaN(date.getTime())) return 'invalid'
  if (date < today) return 'past'
  if (last && date > last) return 'far'
  if (closedDays.includes(date.getDay())) return 'closed'
  return null
}

export const isDayAvailable = (value, bounds) => dayUnavailableReason(value, bounds) === null

/**
 * A six-row month grid starting on Sunday, the shape a calendar renders.
 * Always six rows so the calendar never changes height between months, which
 * would make the whole panel jump.
 */
export function monthGrid(year, month, bounds = {}) {
  const first = new Date(year, month, 1)
  const start = new Date(first)
  start.setDate(1 - first.getDay())

  const weeks = []
  const cursor = new Date(start)

  for (let week = 0; week < 6; week += 1) {
    const days = []
    for (let day = 0; day < 7; day += 1) {
      const value = toInputDate(cursor)
      days.push({
        value,
        day: cursor.getDate(),
        outside: cursor.getMonth() !== month,
        reason: dayUnavailableReason(value, bounds),
      })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(days)
  }

  return weeks
}

export function monthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Validate one step. Returns { field: message } — empty means the step passes.
 * Steps are validated one at a time so the visitor is never shown six errors
 * for a form they have only started.
 */
export function validateStep(stepId, form, { bounds, closedDays = [] } = {}) {
  const errors = {}

  if (stepId === 'service' && !form.service) {
    errors.service = 'Choose what you need so we book the right length of appointment.'
  }

  if (stepId === 'provider' && !form.provider) {
    errors.provider = 'Pick a dentist, or choose "No preference".'
  }

  if (stepId === 'date') {
    const reason = dayUnavailableReason(form.date, { ...bounds, closedDays })
    if (reason === 'empty') errors.date = 'Pick the day you would like to come in.'
    else if (reason === 'past') errors.date = 'That day has already passed.'
    else if (reason === 'far') errors.date = 'That is further ahead than we book. Try a nearer date.'
    else if (reason === 'closed') {
      errors.date = `We are closed on ${closedDayNames(closedDays)}. Please pick another day.`
    } else if (reason) errors.date = 'That date is not available.'
  }

  if (stepId === 'time' && !form.time) {
    errors.time = 'Choose a time that suits you.'
  }

  if (stepId === 'details') {
    if (!form.name?.trim()) errors.name = 'We need a name to put on the appointment.'
    if (!form.phone?.trim()) errors.phone = 'A phone number, so we can confirm the time.'
    if (form.contactBy === 'email' && !form.email?.trim()) {
      errors.email = 'Add an email address, or choose another way for us to reply.'
    }
  }

  return errors
}

/** True when every step up to and including `stepId` passes. */
export function stepsComplete(stepId, form, options) {
  const index = STEPS.findIndex((step) => step.id === stepId)
  return STEPS.slice(0, index + 1).every(
    (step) => Object.keys(validateStep(step.id, form, options)).length === 0,
  )
}

/**
 * Turn the answers into a message a human would send. Used for the confirmation
 * screen and for the text / WhatsApp / email hand-off.
 */
export function buildSummary(form, { services, providers, channels = [], prefill = '' }) {
  const service = services.find((item) => item.id === form.service)
  const provider = providers.find((item) => item.id === form.provider)
  const channel = channels.find((item) => item.id === form.contactBy)

  const details = [
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    form.email?.trim() && `Email: ${form.email.trim()}`,
    service && `Appointment: ${service.label} (${service.duration})`,
    provider && `Dentist: ${provider.name}`,
    form.date && `Preferred day: ${formatLongDate(form.date)}`,
    form.time && `Preferred time: ${form.time}`,
    form.newPatient && 'New patient: yes',
    form.notes?.trim() && `Notes: ${form.notes.trim()}`,
    channel && `Best way to reach me: ${channel.label}`,
  ].filter(Boolean)

  return {
    // Blank line between the greeting and the details, so the message reads
    // like something a person wrote rather than a form dump.
    summary: `${prefill}\n\n${details.join('\n')}`,
    service,
    provider,
    channel,
    dayLabel: form.date ? formatLongDate(form.date) : '',
  }
}

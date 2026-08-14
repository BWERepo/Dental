import { useMemo, useState } from 'react'
import { business } from '../config/business'
import { activeChannels, mailtoHref, smsHref, telHref, whatsappHref } from '../lib/contact'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './Booking.css'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const pad = (value) => String(value).padStart(2, '0')

const toInputDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/**
 * Read a YYYY-MM-DD value as a LOCAL date. `new Date('2026-08-15')` is parsed
 * as UTC, which lands on the wrong day for anyone west of Greenwich.
 */
function parseInputDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatLongDate(value) {
  return parseInputDate(value).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/** "Saturdays and Sundays" — used to explain why a date was rejected. */
function closedDayNames(closedDays) {
  const names = [...closedDays]
    // Sunday is day 0, but it reads last in a week.
    .sort((a, b) => (a || 7) - (b || 7))
    .map((day) => `${DAY_NAMES[day]}s`)

  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export default function Booking() {
  const { appointment, cta } = business
  const channels = useMemo(() => activeChannels(), [])

  const dateBounds = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const last = new Date(today)
    last.setDate(last.getDate() + appointment.maxDaysAhead)
    return { today, min: toInputDate(today), max: toInputDate(last) }
  }, [appointment.maxDaysAhead])

  const [form, setForm] = useState({
    service: appointment.services[0]?.id ?? '',
    provider: appointment.providers[0]?.id ?? '',
    date: '',
    time: appointment.times[0] ?? '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    newPatient: false,
    contactBy: channels[0]?.id ?? 'call',
  })
  const [errors, setErrors] = useState({})
  const [request, setRequest] = useState(null)
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)

  const chosenService = appointment.services.find((item) => item.id === form.service)

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous))
  }

  const validate = () => {
    const found = {}

    if (!form.name.trim()) found.name = 'We need a name to put on the appointment.'
    if (!form.phone.trim()) found.phone = 'A phone number, so we can confirm the time.'

    if (!form.date) {
      found.date = 'Pick the day you would like to come in.'
    } else {
      const chosen = parseInputDate(form.date)
      if (chosen < dateBounds.today) {
        found.date = 'That day has already passed.'
      } else if (appointment.closedDays.includes(chosen.getDay())) {
        found.date = `We are closed on ${closedDayNames(appointment.closedDays)}. Please pick another day.`
      }
    }

    if (form.contactBy === 'email' && !form.email.trim()) {
      found.email = 'Add an email address, or choose another way for us to reply.'
    }

    return found
  }

  const buildSummary = () => {
    const provider = appointment.providers.find((item) => item.id === form.provider)
    const channel = channels.find((item) => item.id === form.contactBy)

    const details = [
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() && `Email: ${form.email.trim()}`,
      chosenService && `Appointment: ${chosenService.label} (${chosenService.duration})`,
      provider && `Dentist: ${provider.name}`,
      `Preferred day: ${formatLongDate(form.date)}`,
      form.time && `Preferred time: ${form.time}`,
      form.newPatient && 'New patient: yes',
      form.notes.trim() && `Notes: ${form.notes.trim()}`,
      channel && `Best way to reach me: ${channel.label}`,
    ].filter(Boolean)

    // Blank line between the greeting and the details, so the message reads
    // like something a person wrote rather than a form dump.
    return {
      summary: `${business.messagePrefill}\n\n${details.join('\n')}`,
      channel,
      dayLabel: formatLongDate(form.date),
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Send focus to the first thing that needs fixing.
      document.getElementById(`booking-${Object.keys(found)[0]}`)?.focus()
      return
    }

    const built = buildSummary()
    setCopied(false)

    // With no endpoint configured the request is handed back to the visitor as
    // a ready-made message. Point `appointment.endpoint` at a real booking API
    // and the same details are posted to it instead.
    if (!appointment.endpoint) {
      setRequest({ ...built, submitted: false })
      return
    }

    setSending(true)
    try {
      const response = await fetch(appointment.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, summary: built.summary }),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setRequest({ ...built, submitted: true })
    } catch {
      // Never lose the visitor's typing because a server was unreachable —
      // fall back to the hand-off so they can still send it themselves.
      setRequest({ ...built, submitted: false, failed: true })
    } finally {
      setSending(false)
    }
  }

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(request.summary)
      setCopied(true)
    } catch {
      // Clipboard access can be blocked. The details are on screen to copy by
      // hand, so there is nothing to recover from here.
      setCopied(false)
    }
  }

  /* --- Confirmation --------------------------------------------------------
   * Nothing is stored anywhere, so instead of pretending the request was sent
   * we hand it straight to the visitor's phone as a ready-made message.
   * ---------------------------------------------------------------------- */
  const sendActions = useMemo(() => {
    if (!request) return []

    const subject = `Appointment request — ${form.name.trim()}`
    const all = [
      smsHref(request.summary) && {
        id: 'sms',
        href: smsHref(request.summary),
        label: 'Send by text',
        icon: 'sms',
      },
      whatsappHref(request.summary) && {
        id: 'whatsapp',
        href: whatsappHref(request.summary),
        label: 'Send on WhatsApp',
        icon: 'whatsapp',
        external: true,
      },
      mailtoHref(subject, request.summary) && {
        id: 'email',
        href: mailtoHref(subject, request.summary),
        label: 'Send by email',
        icon: 'mail',
      },
    ].filter(Boolean)

    // Whatever they said they preferred goes first, as the loud button.
    const preferred = all.filter((action) => action.id === form.contactBy)
    return [...preferred, ...all.filter((action) => action.id !== form.contactBy)]
  }, [request, form.contactBy, form.name])

  return (
    <section className="section section--glow booking" id="book">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={11}
            eyebrow={appointment.eyebrow}
            heading={appointment.heading}
            intro={appointment.intro}
          />
        </Reveal>

        <div className="booking__grid">
          {/* --- What we are going to ask for + the instant channels -------- */}
          <Reveal className="booking__aside">
            <ol className="booking__steps">
              {appointment.steps.map((step, index) => (
                <li key={step} className="booking__step">
                  <span className="booking__step-number">{index + 1}</span>
                  <h3 className="booking__step-label">{step}</h3>
                </li>
              ))}
            </ol>

            <div className="booking__instant">
              <p className="booking__instant-label">Rather not type it all out?</p>
              <div className="booking__instant-actions">
                {telHref && (
                  <Button href={telHref} variant="soft" icon="phone">
                    {business.phoneDisplay}
                  </Button>
                )}
                {smsHref() && (
                  <Button href={smsHref()} variant="soft" icon="sms">
                    {cta.text}
                  </Button>
                )}
                {whatsappHref() && (
                  <Button href={whatsappHref()} variant="whatsapp" icon="whatsapp" external>
                    {cta.whatsapp}
                  </Button>
                )}
              </div>
            </div>
          </Reveal>

          {/* --- The form -------------------------------------------------- */}
          <Reveal className="booking__form-wrap" delay={80}>
            {request ? (
              <div className="booking__done" role="status">
                <span className="booking__done-mark" aria-hidden="true">
                  <Icon name="check" />
                </span>

                <h3>
                  {request.submitted
                    ? `Request sent, ${form.name.trim().split(' ')[0]}.`
                    : `One tap left, ${form.name.trim().split(' ')[0]}.`}
                </h3>

                <p className="booking__done-text">
                  {request.submitted ? (
                    <>We have your request and will confirm {request.dayLabel}.</>
                  ) : (
                    <>
                      {request.failed
                        ? 'We could not reach the booking system just now, so nothing has been sent.'
                        : 'This prototype has no server behind it yet, so nothing has been sent.'}{' '}
                      Your request is written out below — send it to us the way you prefer and we
                      will confirm {request.dayLabel}.
                    </>
                  )}
                </p>

                {!request.submitted && (
                  <>
                    <pre className="booking__summary">{request.summary}</pre>

                    <div className="booking__done-actions">
                      {sendActions.map((action, index) => (
                        <Button
                          key={action.id}
                          href={action.href}
                          icon={action.icon}
                          external={action.external}
                          variant={
                            index === 0 ? (action.id === 'whatsapp' ? 'whatsapp' : 'primary') : 'soft'
                          }
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </>
                )}

                <div className="booking__done-footer">
                  {!request.submitted && (
                    <button type="button" className="booking__link" onClick={copySummary}>
                      {copied ? 'Copied' : 'Copy the details'}
                    </button>
                  )}
                  <button type="button" className="booking__link" onClick={() => setRequest(null)}>
                    Change something
                  </button>
                  {telHref && (
                    <a className="booking__link" href={telHref}>
                      Or call {business.phoneDisplay}
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form className="booking__form" onSubmit={handleSubmit} noValidate>
                {/* 1 — Service */}
                <fieldset className="booking__fieldset">
                  <legend>What do you need?</legend>
                  <div className="booking__pills">
                    {appointment.services.map((service) => (
                      <label
                        key={service.id}
                        className={`booking__pill ${service.urgent ? 'booking__pill--urgent' : ''}`}
                      >
                        <input
                          type="radio"
                          name="booking-service"
                          value={service.id}
                          checked={form.service === service.id}
                          onChange={update('service')}
                        />
                        <span>
                          <strong>{service.label}</strong>
                          {service.duration}
                        </span>
                      </label>
                    ))}
                  </div>
                  {chosenService?.urgent && telHref && (
                    <p className="booking__hint booking__hint--urgent">
                      In pain today? <a href={telHref}>Call {business.phoneDisplay}</a> instead — we
                      triage emergencies by phone.
                    </p>
                  )}
                </fieldset>

                {/* 2 — Dentist */}
                <fieldset className="booking__fieldset">
                  <legend>Who would you like to see?</legend>
                  <div className="booking__providers">
                    {appointment.providers.map((provider) => (
                      <label key={provider.id} className="booking__provider">
                        <input
                          type="radio"
                          name="booking-provider"
                          value={provider.id}
                          checked={form.provider === provider.id}
                          onChange={update('provider')}
                        />
                        <span className="booking__provider-body">
                          <span className="booking__provider-initials" aria-hidden="true">
                            {provider.initials}
                          </span>
                          <span>
                            <strong>{provider.name}</strong>
                            {provider.role}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* 3 — Date */}
                <div className="booking__field">
                  <label htmlFor="booking-date">Preferred day</label>
                  <input
                    id="booking-date"
                    type="date"
                    value={form.date}
                    min={dateBounds.min}
                    max={dateBounds.max}
                    onChange={update('date')}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'booking-date-error' : 'booking-date-hint'}
                  />
                  {errors.date ? (
                    <p className="booking__error" id="booking-date-error">
                      {errors.date}
                    </p>
                  ) : (
                    <p className="booking__hint" id="booking-date-hint">
                      Closed {closedDayNames(appointment.closedDays)}.
                    </p>
                  )}
                </div>

                {/* 4 — Time */}
                <fieldset className="booking__fieldset">
                  <legend>Preferred time</legend>
                  <div className="booking__pills booking__pills--tight">
                    {appointment.times.map((time) => (
                      <label key={time} className="booking__pill">
                        <input
                          type="radio"
                          name="booking-time"
                          value={time}
                          checked={form.time === time}
                          onChange={update('time')}
                        />
                        <span>
                          <strong>{time}</strong>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* 5 — Details */}
                <div className="booking__row">
                  <div className="booking__field">
                    <label htmlFor="booking-name">Your name</label>
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'booking-name-error' : undefined}
                    />
                    {errors.name && (
                      <p className="booking__error" id="booking-name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="booking__field">
                    <label htmlFor="booking-phone">Mobile number</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p className="booking__error" id="booking-phone-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="booking__field">
                  <label htmlFor="booking-email">Email (optional)</label>
                  <input
                    id="booking-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'booking-email-error' : undefined}
                  />
                  {errors.email && (
                    <p className="booking__error" id="booking-email-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="booking__field">
                  <label htmlFor="booking-notes">Anything we should know? (optional)</label>
                  <textarea
                    id="booking-notes"
                    rows="3"
                    value={form.notes}
                    onChange={update('notes')}
                  />
                </div>

                <label className="booking__check">
                  <input type="checkbox" checked={form.newPatient} onChange={update('newPatient')} />
                  <span>This is my first visit to the practice</span>
                </label>

                {channels.length > 1 && (
                  <fieldset className="booking__fieldset">
                    <legend>How should we confirm?</legend>
                    <div className="booking__pills booking__pills--tight">
                      {channels.map((channel) => (
                        <label key={channel.id} className="booking__pill">
                          <input
                            type="radio"
                            name="booking-contact"
                            value={channel.id}
                            checked={form.contactBy === channel.id}
                            onChange={update('contactBy')}
                          />
                          <span>
                            <strong>{channel.label}</strong>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* 6 — Confirm */}
                <Button type="submit" icon="calendar" className="btn--block" disabled={sending}>
                  {sending ? 'Sending…' : cta.book}
                </Button>

                <p className="booking__note">
                  {appointment.sample && <SampleChip />}
                  {appointment.note}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

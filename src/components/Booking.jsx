import { useEffect, useMemo, useRef, useState } from 'react'
import { business } from '../config/business'
import { activeChannels, mailtoHref, smsHref, telHref, whatsappHref } from '../lib/contact'
import {
  STEPS,
  buildSummary,
  closedDayNames,
  formatLongDate,
  getDateBounds,
  monthGrid,
  monthLabel,
  parseInputDate,
  validateStep,
} from '../lib/scheduler'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SampleChip from './ui/SampleChip'
import SectionHeading from './ui/SectionHeading'
import './Booking.css'

const WEEKDAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/**
 * The six-step appointment scheduler.
 *
 * The front end genuinely works — it validates one step at a time, refuses days
 * the practice is shut, and produces a real request at the end. What it does
 * not do is reserve anything, because no practice management system is wired up
 * yet. Point `appointment.endpoint` in the config at a real booking API and the
 * final step posts to it instead of handing the request back to the visitor.
 */
export default function Booking() {
  const { appointment } = business
  const channels = useMemo(() => activeChannels(), [])

  const bounds = useMemo(
    () => getDateBounds(appointment.maxDaysAhead),
    [appointment.maxDaysAhead],
  )

  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState({
    service: '',
    provider: '',
    date: '',
    time: '',
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
  const [view, setView] = useState(() => ({
    year: bounds.today.getFullYear(),
    month: bounds.today.getMonth(),
  }))

  const panelRef = useRef(null)
  const startedRef = useRef(false)

  const step = STEPS[stepIndex]
  const validateOptions = { bounds, closedDays: appointment.closedDays }

  // Move focus into the panel on each step change so keyboard and screen-reader
  // users land on the new content instead of staying on the button they pressed.
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true
      return
    }
    panelRef.current?.focus()
  }, [stepIndex, request])

  const set = (patch) => {
    setForm((previous) => ({ ...previous, ...patch }))
    setErrors((previous) => {
      const next = { ...previous }
      Object.keys(patch).forEach((key) => delete next[key])
      return next
    })
  }

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    set({ [field]: value })
  }

  /** Advance one step, or straight past it when a choice already answers it. */
  const goNext = () => {
    const found = validateStep(step.id, form, validateOptions)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStepIndex((index) => Math.min(index + 1, STEPS.length - 1))
  }

  const goBack = () => setStepIndex((index) => Math.max(index - 1, 0))

  /** Jump back to an earlier step from the rail. Forward jumps are not allowed. */
  const goTo = (index) => {
    if (index < stepIndex) {
      setErrors({})
      setStepIndex(index)
    }
  }

  /** Choosing an option moves the flow on by itself — one tap, not two. */
  const choose = (patch, { advance = true } = {}) => {
    set(patch)
    if (advance) {
      window.setTimeout(() => setStepIndex((index) => Math.min(index + 1, STEPS.length - 1)), 160)
    }
  }

  const shiftMonth = (delta) => {
    setView(({ year, month }) => {
      const next = new Date(year, month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  const weeks = useMemo(
    () => monthGrid(view.year, view.month, { ...bounds, closedDays: appointment.closedDays }),
    [view, bounds, appointment.closedDays],
  )

  const handleSubmit = async () => {
    // Re-check every step, in case something was edited after the fact.
    const found = STEPS.reduce(
      (all, item) => ({ ...all, ...validateStep(item.id, form, validateOptions) }),
      {},
    )
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstBad = STEPS.findIndex(
        (item) => Object.keys(validateStep(item.id, form, validateOptions)).length > 0,
      )
      if (firstBad >= 0) setStepIndex(firstBad)
      return
    }

    const built = buildSummary(form, {
      services: appointment.services,
      providers: appointment.providers,
      channels,
      prefill: business.messagePrefill,
    })

    setCopied(false)

    // With no endpoint configured the request is handed back to the visitor as
    // a ready-made message, so the booking still reaches the practice.
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
      // Never lose the visitor's typing because a server was unreachable.
      setRequest({ ...built, submitted: false, failed: true })
    } finally {
      setSending(false)
    }
  }

  const restart = () => {
    setRequest(null)
    setErrors({})
    setStepIndex(0)
    setForm((previous) => ({ ...previous, name: '', phone: '', email: '', notes: '' }))
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

    const preferred = all.filter((action) => action.id === form.contactBy)
    return [...preferred, ...all.filter((action) => action.id !== form.contactBy)]
  }, [request, form.contactBy, form.name])

  const chosen = {
    service: appointment.services.find((item) => item.id === form.service),
    provider: appointment.providers.find((item) => item.id === form.provider),
  }

  /* --- Confirmed ---------------------------------------------------------- */
  if (request) {
    return (
      <section className="section section--glow booking" id="book">
        <div className="container">
          <div className="booking__done" role="status" ref={panelRef} tabIndex={-1}>
            <span className="booking__done-mark" aria-hidden="true">
              <Icon name="check" />
            </span>

            <h2 className="booking__done-title">Appointment requested</h2>
            <p className="booking__done-text">
              {request.submitted
                ? `Thanks ${form.name.trim().split(' ')[0]} — your request is with the practice. We confirm every request the same working day.`
                : `Thanks ${form.name.trim().split(' ')[0]}. This demonstration has no booking system behind it, so nothing has been reserved — send the request below and it will reach a real inbox.`}
            </p>

            <dl className="booking__receipt">
              <div>
                <dt>Service</dt>
                <dd>{request.service?.label ?? '—'}</dd>
              </div>
              <div>
                <dt>Dentist</dt>
                <dd>{request.provider?.name ?? '—'}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{request.dayLabel}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{form.time}</dd>
              </div>
            </dl>

            <p className="booking__demo-note">
              <SampleChip />
              {appointment.note}
            </p>

            <div className="booking__done-actions">
              {sendActions.map((action, index) => (
                <Button
                  key={action.id}
                  href={action.href}
                  icon={action.icon}
                  external={action.external}
                  variant={index === 0 ? (action.id === 'whatsapp' ? 'whatsapp' : 'primary') : 'soft'}
                >
                  {action.label}
                </Button>
              ))}
            </div>

            <div className="booking__done-footer">
              <button type="button" className="booking__link" onClick={copySummary}>
                {copied ? 'Copied' : 'Copy the details'}
              </button>
              <button type="button" className="booking__link" onClick={restart}>
                Book another appointment
              </button>
              {telHref && (
                <a className="booking__link" href={telHref}>
                  Or call {business.phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* --- The wizard --------------------------------------------------------- */
  return (
    <section className="section section--glow booking" id="book">
      <div className="container">
        <Reveal>
          <SectionHeading
            index={5}
            eyebrow={appointment.eyebrow}
            heading={appointment.heading}
            intro={appointment.intro}
          />
        </Reveal>

        <div className="booking__shell">
          {/* --- Step rail ---------------------------------------------- */}
          <ol className="booking__rail" aria-label="Booking steps">
            {STEPS.map((item, index) => {
              const state =
                index === stepIndex ? 'current' : index < stepIndex ? 'done' : 'upcoming'
              return (
                <li key={item.id} className={`booking__rail-item is-${state}`}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    disabled={index >= stepIndex}
                    aria-current={index === stepIndex ? 'step' : undefined}
                  >
                    <span className="booking__rail-dot" aria-hidden="true">
                      {index < stepIndex ? <Icon name="check" /> : index + 1}
                    </span>
                    <span className="booking__rail-label">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* --- Panel --------------------------------------------------- */}
          <div className="booking__panel" ref={panelRef} tabIndex={-1} aria-labelledby="booking-step-title">
            <p className="booking__step-count" aria-hidden="true">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <span className="sr-only" aria-live="polite">
              Step {stepIndex + 1} of {STEPS.length}: {step.label}
            </span>

            {/* STEP 1 — service */}
            {step.id === 'service' && (
              <>
                <h3 id="booking-step-title">What do you need?</h3>
                <div className="booking__options" role="radiogroup" aria-label="Service">
                  {appointment.services.map((item) => (
                    <label
                      key={item.id}
                      className={`booking__option ${item.urgent ? 'booking__option--urgent' : ''}`}
                    >
                      <input
                        type="radio"
                        name="booking-service"
                        value={item.id}
                        checked={form.service === item.id}
                        onChange={() => choose({ service: item.id })}
                      />
                      <span>
                        <strong>{item.label}</strong>
                        <span className="booking__option-meta">{item.duration}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.service && <p className="booking__error">{errors.service}</p>}
              </>
            )}

            {/* STEP 2 — provider */}
            {step.id === 'provider' && (
              <>
                <h3 id="booking-step-title">Who would you like to see?</h3>
                <div className="booking__options" role="radiogroup" aria-label="Dentist">
                  {appointment.providers.map((item) => (
                    <label key={item.id} className="booking__option booking__option--provider">
                      <input
                        type="radio"
                        name="booking-provider"
                        value={item.id}
                        checked={form.provider === item.id}
                        onChange={() => choose({ provider: item.id })}
                      />
                      <span>
                        <span className="booking__avatar" aria-hidden="true">
                          {item.initials}
                        </span>
                        <span>
                          <strong>{item.name}</strong>
                          <span className="booking__option-meta">{item.role}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.provider && <p className="booking__error">{errors.provider}</p>}
              </>
            )}

            {/* STEP 3 — date */}
            {step.id === 'date' && (
              <>
                <h3 id="booking-step-title">Pick a day</h3>

                <div className="booking__calendar">
                  <div className="booking__calendar-head">
                    <button
                      type="button"
                      className="booking__calendar-nav"
                      onClick={() => shiftMonth(-1)}
                      aria-label="Previous month"
                    >
                      <Icon name="arrow" className="booking__calendar-prev" />
                    </button>
                    <p aria-live="polite">{monthLabel(view.year, view.month)}</p>
                    <button
                      type="button"
                      className="booking__calendar-nav"
                      onClick={() => shiftMonth(1)}
                      aria-label="Next month"
                    >
                      <Icon name="arrow" />
                    </button>
                  </div>

                  <div className="booking__calendar-weekdays" aria-hidden="true">
                    {WEEKDAY_INITIALS.map((initial, index) => (
                      <span key={`${initial}-${index}`}>{initial}</span>
                    ))}
                  </div>

                  <div className="booking__calendar-grid" role="grid">
                    {weeks.map((days, weekIndex) => (
                      <div className="booking__calendar-week" role="row" key={weekIndex}>
                        {days.map((day) => (
                          <button
                            key={day.value}
                            type="button"
                            role="gridcell"
                            className={`booking__day ${day.outside ? 'is-outside' : ''} ${
                              form.date === day.value ? 'is-selected' : ''
                            }`}
                            disabled={Boolean(day.reason)}
                            aria-label={parseInputDate(day.value).toLocaleDateString(undefined, {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                            aria-selected={form.date === day.value}
                            onClick={() => choose({ date: day.value })}
                          >
                            {day.day}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {errors.date ? (
                  <p className="booking__error">{errors.date}</p>
                ) : (
                  <p className="booking__hint">
                    Closed {closedDayNames(appointment.closedDays)}.
                  </p>
                )}
              </>
            )}

            {/* STEP 4 — time */}
            {step.id === 'time' && (
              <>
                <h3 id="booking-step-title">
                  Available on {form.date ? formatLongDate(form.date) : 'your chosen day'}
                </h3>
                <div className="booking__times" role="radiogroup" aria-label="Appointment time">
                  {appointment.times.map((time) => (
                    <label key={time} className="booking__time">
                      <input
                        type="radio"
                        name="booking-time"
                        value={time}
                        checked={form.time === time}
                        onChange={() => choose({ time })}
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
                <p className="booking__hint">
                  <SampleChip />
                  Sample availability. A live site shows the practice’s real open slots.
                </p>
                {errors.time && <p className="booking__error">{errors.time}</p>}
              </>
            )}

            {/* STEP 5 — details */}
            {step.id === 'details' && (
              <>
                <h3 id="booking-step-title">Your details</h3>

                <div className="booking__row">
                  <div className="booking__field">
                    <label htmlFor="booking-name">Full name</label>
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
                  <label htmlFor="booking-email">Email {form.contactBy === 'email' ? '' : '(optional)'}</label>
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

                {channels.length > 1 && (
                  <fieldset className="booking__fieldset">
                    <legend>How should we confirm?</legend>
                    <div className="booking__times booking__times--tight">
                      {channels.map((channel) => (
                        <label key={channel.id} className="booking__time">
                          <input
                            type="radio"
                            name="booking-contact"
                            value={channel.id}
                            checked={form.contactBy === channel.id}
                            onChange={update('contactBy')}
                          />
                          <span>{channel.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

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
              </>
            )}

            {/* STEP 6 — confirm */}
            {step.id === 'confirm' && (
              <>
                <h3 id="booking-step-title">Check and confirm</h3>

                <dl className="booking__receipt">
                  <div>
                    <dt>Service</dt>
                    <dd>{chosen.service?.label ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Dentist</dt>
                    <dd>{chosen.provider?.name ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{form.date ? formatLongDate(form.date) : '—'}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{form.time || '—'}</dd>
                  </div>
                  <div>
                    <dt>Name</dt>
                    <dd>{form.name || '—'}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{form.phone || '—'}</dd>
                  </div>
                </dl>

                <p className="booking__demo-note">
                  <SampleChip />
                  {appointment.note}
                </p>
              </>
            )}

            {/* --- Step controls ---------------------------------------- */}
            <div className="booking__controls">
              {stepIndex > 0 ? (
                <button type="button" className="booking__back" onClick={goBack}>
                  <Icon name="arrow" className="booking__back-icon" />
                  Back
                </button>
              ) : (
                <span />
              )}

              {step.id === 'confirm' ? (
                <Button type="button" icon="calendar" onClick={handleSubmit} disabled={sending}>
                  {sending ? 'Sending…' : 'Request this appointment'}
                </Button>
              ) : (
                <Button type="button" onClick={goNext}>
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

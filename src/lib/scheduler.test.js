import { describe, expect, it } from 'vitest'
import {
  buildSummary,
  closedDayNames,
  dayUnavailableReason,
  formatLongDate,
  getDateBounds,
  monthGrid,
  parseInputDate,
  stepsComplete,
  toInputDate,
  validateStep,
} from './scheduler'

const CLOSED = [0, 6] // Sunday and Saturday
const NOW = new Date(2026, 7, 17) // Monday 17 August 2026, local time
const BOUNDS = getDateBounds(120, NOW)
const OPTIONS = { bounds: BOUNDS, closedDays: CLOSED }

const validForm = {
  service: 'cleaning',
  provider: 'carter',
  date: '2026-08-18', // a Tuesday
  time: '10:30 AM',
  name: 'Dana Whitfield',
  phone: '(865) 555-0177',
  email: '',
  notes: '',
  newPatient: true,
  contactBy: 'sms',
}

describe('date handling', () => {
  it('parses YYYY-MM-DD in local time, not UTC', () => {
    // The bug this guards: new Date('2026-08-15') is UTC midnight, which is
    // 14 August for everyone west of Greenwich.
    const date = parseInputDate('2026-08-15')
    expect(date.getFullYear()).toBe(2026)
    expect(date.getMonth()).toBe(7)
    expect(date.getDate()).toBe(15)
  })

  it('round-trips through toInputDate', () => {
    expect(toInputDate(parseInputDate('2026-12-01'))).toBe('2026-12-01')
  })

  it('formats a long date without shifting the day', () => {
    expect(formatLongDate('2026-08-18')).toContain('18')
  })
})

describe('closedDayNames', () => {
  it('orders Sunday last and joins with "and"', () => {
    expect(closedDayNames([0, 6])).toBe('Saturdays and Sundays')
  })

  it('handles a single closed day', () => {
    expect(closedDayNames([3])).toBe('Wednesdays')
  })

  it('handles three closed days', () => {
    expect(closedDayNames([0, 6, 3])).toBe('Wednesdays, Saturdays and Sundays')
  })
})

describe('dayUnavailableReason', () => {
  const bounds = { ...BOUNDS, closedDays: CLOSED }

  it('accepts an open weekday inside the window', () => {
    expect(dayUnavailableReason('2026-08-18', bounds)).toBeNull()
  })

  it('rejects a day in the past', () => {
    expect(dayUnavailableReason('2026-08-16', bounds)).toBe('past')
  })

  it('rejects a closed day', () => {
    expect(dayUnavailableReason('2026-08-22', bounds)).toBe('closed') // Saturday
  })

  it('rejects a day beyond the booking window', () => {
    expect(dayUnavailableReason('2027-06-01', bounds)).toBe('far')
  })

  it('treats today as bookable', () => {
    expect(dayUnavailableReason('2026-08-17', bounds)).toBeNull()
  })
})

describe('monthGrid', () => {
  const weeks = monthGrid(2026, 7, { ...BOUNDS, closedDays: CLOSED })

  it('always returns six rows of seven, so the panel never changes height', () => {
    expect(weeks).toHaveLength(6)
    weeks.forEach((week) => expect(week).toHaveLength(7))
  })

  it('starts each row on a Sunday', () => {
    weeks.forEach((week) => {
      expect(parseInputDate(week[0].value).getDay()).toBe(0)
    })
  })

  it('marks days outside the displayed month', () => {
    const august = weeks.flat().filter((day) => !day.outside)
    expect(august).toHaveLength(31)
  })

  it('marks weekends unavailable', () => {
    const saturday = weeks.flat().find((day) => day.value === '2026-08-22')
    expect(saturday.reason).toBe('closed')
  })
})

describe('validateStep', () => {
  it('requires a service', () => {
    expect(validateStep('service', { ...validForm, service: '' }, OPTIONS)).toHaveProperty('service')
    expect(validateStep('service', validForm, OPTIONS)).toEqual({})
  })

  it('requires a provider', () => {
    expect(validateStep('provider', { ...validForm, provider: '' }, OPTIONS)).toHaveProperty(
      'provider',
    )
  })

  it('explains a weekend date in words', () => {
    const errors = validateStep('date', { ...validForm, date: '2026-08-22' }, OPTIONS)
    expect(errors.date).toContain('Saturdays and Sundays')
  })

  it('requires a time', () => {
    expect(validateStep('time', { ...validForm, time: '' }, OPTIONS)).toHaveProperty('time')
  })

  it('requires name and phone on the details step', () => {
    const errors = validateStep('details', { ...validForm, name: '  ', phone: '' }, OPTIONS)
    expect(errors).toHaveProperty('name')
    expect(errors).toHaveProperty('phone')
  })

  it('requires an email only when email is the chosen reply channel', () => {
    const asEmail = { ...validForm, contactBy: 'email', email: '' }
    expect(validateStep('details', asEmail, OPTIONS)).toHaveProperty('email')
    expect(validateStep('details', { ...asEmail, email: 'a@b.com' }, OPTIONS)).toEqual({})
  })

  it('passes a complete form at every step', () => {
    expect(stepsComplete('confirm', validForm, OPTIONS)).toBe(true)
  })

  it('fails stepsComplete when an earlier step is incomplete', () => {
    expect(stepsComplete('confirm', { ...validForm, service: '' }, OPTIONS)).toBe(false)
  })
})

describe('buildSummary', () => {
  const config = {
    services: [{ id: 'cleaning', label: 'Routine Cleaning', duration: '45 min' }],
    providers: [{ id: 'carter', name: 'Dr. Emily Carter' }],
    channels: [{ id: 'sms', label: 'Text message' }],
    prefill: 'Hi Sample Dental, I would like to book an appointment.',
  }

  it('puts a blank line between the greeting and the details', () => {
    const { summary } = buildSummary(validForm, config)
    expect(summary).toContain('appointment.\n\nName:')
  })

  it('includes every answered field', () => {
    const { summary } = buildSummary(validForm, config)
    expect(summary).toContain('Name: Dana Whitfield')
    expect(summary).toContain('Appointment: Routine Cleaning (45 min)')
    expect(summary).toContain('Dentist: Dr. Emily Carter')
    expect(summary).toContain('Preferred time: 10:30 AM')
    expect(summary).toContain('New patient: yes')
    expect(summary).toContain('Best way to reach me: Text message')
  })

  it('omits fields the visitor left blank', () => {
    const { summary } = buildSummary(validForm, config)
    expect(summary).not.toContain('Email:')
    expect(summary).not.toContain('Notes:')
  })

  it('returns the resolved service and provider for the confirmation screen', () => {
    const result = buildSummary(validForm, config)
    expect(result.service.label).toBe('Routine Cleaning')
    expect(result.provider.name).toBe('Dr. Emily Carter')
    expect(result.dayLabel).toContain('18')
  })
})

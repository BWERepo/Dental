# Sample Dental Prototype

A one-page website for a dental practice, built with React + Vite. Deployed to Cloudflare Workers at
**https://dental.businesswebexpress.com**.

> **This is a prototype.** The practice name, address, phone number, email, services, hours and
> selling points are realistic **sample content** written to demonstrate the layout. The phone number
> uses the 555-01xx range reserved for examples, so the call, text and WhatsApp buttons do not reach
> anyone. Replace all of it with the real practice's details before this represents an actual
> business.

## Editing the content

Everything a business owner would want to change lives in one file:

```
src/config/business.js
```

Business name, tagline, phone, text and WhatsApp numbers, email, address, opening hours, services,
images, FAQ answers, the appointment form's options and the colour palette are all in there. No other
file needs to be touched to rebrand the site.

Three behaviours worth knowing:

- Leave a value empty (`''`) and it disappears cleanly. `whatsapp: ''` removes every WhatsApp button;
  `sms: ''` removes every "Text us" button.
- `reviews.items: []` hides the reviews section entirely. The quotes shipped with the prototype are
  invented and labelled as samples — replace them with real, attributable ones, and never invent
  reviews of your own.
- `appointment.closedDays` stops people requesting a day nobody is at the practice.
- `isPrototype: false` removes every "Sample" chip at once. Only set it once real content has
  replaced the invented dentist, reviews, offer, financing example and insurance results.

## Contacting the practice

Four channels, each switched on or off from the config, each appearing in the same places:

| Channel  | Config key     | Link built                                    |
| -------- | -------------- | --------------------------------------------- |
| Phone    | `phoneLink`    | `tel:`                                        |
| Text     | `sms`          | `sms:` with a prefilled message                |
| WhatsApp | `whatsapp`     | `https://wa.me/…` with a prefilled message     |
| Email    | `email`        | `mailto:` with subject and body                |

Every one of these links is built in `src/lib/contact.js`, so the behaviour is identical in the
header, hero, booking section, contact section, footer and the floating contact bar.

The floating bar (`src/components/ContactDock.jsx`) is a row across the bottom of the screen on
phones and a small stack in the corner on desktop.

## Appointments

`src/components/Booking.jsx` is the appointment request form, and it asks for the six things listed
in `appointment.steps`: service, dentist, preferred day, preferred time, your details, and how you
want to be confirmed. It validates the date against `appointment.closedDays` and
`appointment.maxDaysAhead`, so nobody can request a day the practice is shut.

**There is no server behind it by default.** Rather than pretending a request was sent, the form
turns the answers into a written-out message and hands it to the visitor as a ready-to-send text,
WhatsApp message or email, with the channel they chose promoted to the main button.

Set `appointment.endpoint` to a URL and the form POSTs the request there instead, falling back to the
hand-off if that call fails — a visitor never loses what they typed because a server was down.

## Running it

```bash
npm install
```

```bash
npm run dev
```

The dev server honours a `PORT` environment variable and otherwise uses Vite's usual 5173.

```bash
npm run build
```

```bash
npm run preview
```

## Deploying

```bash
npm run build
```

```bash
npx wrangler deploy
```

Config lives in `wrangler.jsonc`. The Worker serves the static `dist/` folder and falls back to
`index.html` for unknown paths.

## Structure

```
src/
  config/business.js      all content, colours, gradients and image URLs
  lib/contact.js          builds every tel/sms/WhatsApp/email link
  components/             one file per section, each with its own CSS
  components/ui/          Button, Icon, SectionHeading, ServiceCard, SampleChip, Reveal
  styles/global.css       design tokens (spacing, radius, shadow, type) + base styles
```

Colours and gradients are defined in `business.js` and applied to the page as CSS custom properties
in `main.jsx` (`--c-*` for colours, `--g-*` for gradients), so the palette has a single source of
truth.

## Design notes

- Plain CSS only — no UI framework, no CSS-in-JS.
- The palette is deep teal through green, with a bright aqua used only for glow and marks. Both ends
  of the brand gradient stay dark enough for white text to pass AA, which is why the gradient never
  runs into the aqua behind words.
- Anything invented for the demonstration carries a `sample: true` in the config and renders a
  visible "Sample" chip through `components/ui/SampleChip.jsx`. The dentist has no photograph on
  purpose: a stock face attached to an invented name and CV is the one shortcut a prototype must not
  take, so the portrait slot draws her initials instead.
- The smile gallery is drawn, not photographed. Real before/after patient photography needs that
  patient's written consent, so the comparison sliders render parametric SVG smiles.
- `--c-accent` (bright aqua) is for **dark** backgrounds only. On light backgrounds use
  `--c-accentInk`, which is the readable version.
- Fonts: Sora (headings) and Inter (body), loaded from Google Fonts.
- Photography: Unsplash, referenced by URL.
- Motion — the hero's slow image drift, the scroll reveals, the hover transitions — is disabled under
  `prefers-reduced-motion`. The reading-progress line in the header stays, because it tracks the
  scroll position rather than animating on its own.

# Sample Dental Prototype

A one-page website for a dental practice, built with React + Vite. Deployed to Cloudflare Workers at
**https://dental.businesswebexpress.com**.

> **This is a prototype.** The practice name, address, phone number, email, services, hours and
> selling points are realistic **sample content** written to demonstrate the layout. The phone number
> uses the 555-01xx range reserved for examples. Replace all of it with the real practice's details
> before this represents an actual business.

## Editing the content

Everything a business owner would want to change lives in one file:

```
src/config/business.js
```

Business name, tagline, phone, email, address, opening hours, services, images, FAQ answers and the
colour palette are all in there. No other file needs to be touched to rebrand the site.

Two behaviours worth knowing:

- Leave a value empty (`''`) and it disappears cleanly. `whatsapp: ''` removes every WhatsApp button.
- `testimonials: []` hides the reviews section entirely. Add real quotes and the section appears.
  Do not invent reviews.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploying

```bash
npm run build
npx wrangler deploy
```

Config lives in `wrangler.jsonc`. The Worker serves the static `dist/` folder and falls back to
`index.html` for unknown paths.

## Structure

```
src/
  config/business.js      all content, colours and image URLs
  components/             one file per section, each with its own CSS
  components/ui/          Button, SectionHeading, ServiceCard, Reveal
  styles/global.css       design tokens (spacing, radius, shadow, type) + base styles
```

Colours are defined in `business.js` and applied to the page as CSS custom properties in
`main.jsx`, so the palette has a single source of truth.

## Notes

- Plain CSS only — no UI framework, no CSS-in-JS.
- Fonts: Sora (headings) and Inter (body), loaded from Google Fonts.
- Photography: Unsplash, referenced by URL.
- The contact form is front end only. It does not send anything; it tells the visitor to call or
  email instead. Wire it to a real endpoint before launch.

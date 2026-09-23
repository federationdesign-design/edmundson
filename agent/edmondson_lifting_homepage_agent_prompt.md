# Edmondson Lifting Ltd: Homepage Build Brief for Coding Agent

## 1. Context

Edmondson Lifting Ltd is a Manchester-area lifting and safety equipment specialist. The domain `edmondsonlifting.co.uk` currently serves a holding page. We are replacing it with a multipage Next.js site deployed on Vercel from the existing Git repository.

This brief covers **the homepage and the shared site shell only** (layout, header, footer, cookie consent, analytics wiring). Other pages will be briefed separately once the homepage is signed off.

The client has supplied a visual concept (`agent/reference/concept_home.png` and `agent/reference/concept_services.png`). Follow the concept's structure, colour use and hierarchy closely. It is the approved direction, not a loose mood board.

## 2. Ground rules

1. Next.js App Router, React 19, TypeScript. CSS Modules only: no Tailwind, no styled-components, no inline style blocks.
2. Relative imports only. Do not use the `@/` alias unless it is already configured in `tsconfig.json`.
3. UK English throughout. No em dashes anywhere, in copy, comments or commit messages.
4. Always `cat` or `grep` a file before editing it.
5. Work on a feature branch named `feature/homepage`. Never commit to `main`. Commit incrementally with real messages. Do not push; Steve pushes.
6. Always `git add public/` when new images are added, or they will 404 on Vercel.
7. Never invent content: no made-up addresses, company numbers, accreditation claims, testimonials, statistics or image paths. If an input is missing, insert a clearly named placeholder and log it in `PLACEHOLDERS.md` at the repo root.
8. Vertical space between two stacked elements belongs to one of them, never both. Compute the existing gap before adding padding or margin.
9. If `CLAUDE.md` or `AGENTS.md` already exists in the repo, append to it. Never replace it.

## 3. Brand tokens

Define these once in `app/globals.css` as custom properties and use nothing else for colour.

| Token | Value | Use |
|---|---|---|
| `--yellow` | `#fdc303` | Accents, primary buttons, icon tiles, active nav underline |
| `--black` | `#000000` | Dark section backgrounds, text on yellow |
| `--white` | `#ffffff` | Light section backgrounds, text on black |
| `--grey-dark` | `#1a1a1a` | Card and divider surfaces within dark sections only |
| `--grey-light` | `#f2f2f2` | The Industries band background |

Text on yellow is always black. Yellow text is only used on black backgrounds. Do not apply opacity or rgba to text.

**Typography:** headings in Roboto Condensed (700 and 800), body in Roboto (400 and 500), both via `next/font/google` with system fallbacks. Headings are uppercase as per the concept. Type is liquid: every size uses `clamp()` scaling with viewport width, with no fixed pixel sizes and no capped text measure on headings. Body copy keeps a comfortable line length (under 75 characters).

## 4. Shared shell

### 4.1 Header

- Two states:
  1. **Static header** at the top of the page, in normal document flow, overlaying the hero as in the concept: logo left, nav centre-right (Home, Services, Our Work, Contact), phone `0161 6370368` and email `sales@edmondsonlifting.co.uk` right, with yellow icons.
  2. **Sticky header** that is hidden on load and slides down into a fixed position once the user has scrolled past the static header. It is a compact version (reduced height, smaller logo) on a solid black background. It hides again when the user scrolls back to the top.
- Use an `IntersectionObserver` on a sentinel element, not a scroll listener.
- Respect `prefers-reduced-motion`: no slide animation, just show and hide.
- The active page link carries the yellow underline shown in the concept.
- Mobile (below 900px): logo plus a menu button opening a full-width panel. The phone number must remain a single tap on mobile (`tel:` link visible in the bar). Focus is trapped in the open panel and Escape closes it.
- Phone and email are `tel:` and `mailto:` links everywhere they appear.

### 4.2 Footer

- Matches the concept footer: black, copyright line left, phone and email right.
- Copyright year is generated dynamically, not hard-coded.
- Add links to `/cookies`, `/privacy` and `/terms`, plus a **Cookie settings** button that reopens the consent panel.
- Company number and registered office are placeholders logged in `PLACEHOLDERS.md` until supplied.

### 4.3 Route stubs

Create `/services`, `/our-work`, `/contact`, `/cookies`, `/privacy` and `/terms` as stub pages containing only the shared shell and an H1 with the page name, so no nav or footer link 404s. Log each in `PLACEHOLDERS.md`. Do not build their content.

## 5. Cookie consent (UK GDPR and PECR)

1. On first visit show a consent banner. **Accept all**, **Reject all** and **Manage preferences** must have equal visual prominence. No pre-ticked boxes.
2. Categories: **Strictly necessary** (always on, not toggleable) and **Analytics** (off by default).
3. Store the choice in a first-party cookie (`el_consent`) with a 12-month expiry, recording the categories and a timestamp.
4. No analytics script loads, and no non-essential cookie is set, before consent is given.
5. The footer **Cookie settings** button reopens the panel and allows consent to be withdrawn. Withdrawing analytics consent must stop tracking immediately and clear the `_ga` cookies.
6. The banner is keyboard operable, announced to screen readers, and does not block reading the page behind it.

## 6. Analytics and Search Console

Both are driven by environment variables so nothing is hard-coded.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag verification token |

- Load GA4 with `next/script` only after analytics consent. Implement Google Consent Mode v2 with all storage defaults set to `denied`, updated to `granted` for analytics on consent.
- If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is empty, GA does not load at all and nothing errors.
- Output the Search Console token through the root layout `metadata.verification.google` field. If the variable is empty, omit the tag.
- Create `.env.example` listing both variables with empty values and a one-line comment each. Do not create or edit `.env.local`.

## 7. Homepage sections

Build these sections in this order, matching the concept. Copy below is the corrected version of the concept text; use it exactly.

### 7.1 Hero

- Full-width dark image background (gantry crane image) with a left-weighted dark overlay so text stays legible.
- H1 over two lines: `LIFTING & SAFETY` in white, `EQUIPMENT` in yellow.
- Strapline: `BESPOKE SOLUTIONS | SAFETY | EFFICIENCY | RELIABILITY` (the pipes are visual separators, rendered as styled elements, not literal characters read by screen readers).
- Body: "We are lifting gear specialists with experience across a wide range of industries. Edmondson Lifting Ltd offers bespoke solutions tailored to the unique needs of each sector. Our team is dedicated to ensuring safety, efficiency and reliability in every project we undertake."
- Button: **Get in touch**, yellow with black text and a chevron, linking to `/contact`.

### 7.2 Your lifting and safety partner

- White background, text left, image right (yellow walkway), image bleeding to the right edge as in the concept.
- H2: `YOUR LIFTING & SAFETY PARTNER`.
- Body: "Whether you require loose lifting equipment or a fabricated runway system, we are happy to assist. Our comprehensive range of products and services means we can meet all your lifting needs, however complex or simple the project."

### 7.3 Our services

- Black textured background. H2: `OUR` white, `SERVICES` yellow.
- Eight items in a 4 by 2 grid on desktop with thin vertical dividers, 2 columns on tablet, 1 on mobile. Each item has a yellow square icon tile with a black line icon (inline SVG, drawn or from Lucide, never emoji), a title and a short description.

| Title | Description |
|---|---|
| Inspections & load tests | In house or on site, across England, Scotland and Wales. |
| Supply of lifting & safety equipment | Quality equipment for a safer workplace. |
| Repairs | Fast, reliable repairs for lifting and safety equipment. |
| Fabrication | Runways, swing arms and lifting apparatus, all installed by our team. |
| On-site maintenance | Keeping your site safe and operational. |
| Partition doors | Inspection and assessment of partition doors. |
| Vehicle ramps & tail lifts | Inspection and repairs on vehicle ramps, scissor tables and tail lifts. |
| 24 hour assistance | Always here when you need us. |

- Each item links to `/services`.

### 7.4 Industries we serve

- Light grey band. H2: `INDUSTRIES` black, `WE SERVE` yellow.
- Five items in a row with vertical dividers: Supermarket, Hospitality, Engineering, Transport, and many more. Black line icons above each label. Wraps to 3 then 2 columns on smaller screens.

### 7.5 Our qualifications and approvals

- Black background. H2: `OUR` white, `QUALIFICATIONS & APPROVALS` yellow.
- Seven logos with captions, divided by thin vertical rules: CABWI (Level 2 in confined spaces), PASMA (Tower training), IPAF (Operators), IPAF (Harness inspectors), SSIP (Approved), LOLER (Trained), LEEA (Full members of LEEA).
- Use the supplied logo files in `public/images/accreditations/`. If a logo is missing, render a neutral placeholder tile with the name and log it. Do not redraw or recreate any accreditation body's logo.
- Horizontal scroll inside its own container on mobile rather than squashing the logos.

### 7.6 Get in touch today

- Dark photographic band (engineer image) with overlay.
- Yellow phone icon, H2 `GET IN TOUCH TODAY` in yellow.
- Body: "For all enquiries or quotations, our friendly and capable sales staff are on hand to help with any form of enquiry."
- Two stacked buttons right: **Call 0161 6370368** (solid yellow, `tel:` link) and **Email us** (yellow outline, `mailto:` link).

## 8. Images

- All supplied images are in `public/images/`. Use `next/image` with explicit sizes and meaningful `alt` text describing the equipment shown.
- The hero image uses `priority`. Everything else lazy loads.
- If an expected image is missing, use a neutral dark placeholder at the correct aspect ratio and log it in `PLACEHOLDERS.md`. Do not source stock imagery.

## 9. SEO basics

- Root layout metadata: title template `%s | Edmondson Lifting Ltd`, homepage title `Lifting & Safety Equipment Specialists`, a meta description based on the hero body, Open Graph image from the hero, `metadataBase` of `https://edmondsonlifting.co.uk`.
- `app/sitemap.ts` and `app/robots.ts` covering all seven routes.
- `LocalBusiness` JSON-LD on the homepage using only the phone, email, name and URL. Address fields are omitted until supplied.

## 10. Accessibility

- One H1 per page, logical heading order, landmark elements, skip-to-content link.
- Visible keyboard focus on every interactive element (yellow outline on dark, black outline on light).
- All text meets WCAG 2.2 AA contrast. Check white on the hero overlay and grey body text in particular.

## 11. Verification before handing back

1. `./node_modules/.bin/tsc --noEmit` is clean.
2. `npm run build` succeeds. A local failure caused only by Google Fonts being unreachable is not a code failure; report it and continue.
3. Audit every module CSS file for bare `:global(.foo)` selectors with no local class (`grep -n ":global(\.[a-zA-Z-]*) *{" **/*.module.css`). Every hit must be compounded as `.localClass:global(.foo)`, or the Vercel build will fail.
4. Run `npm run dev` and take Playwright screenshots of the homepage at 390px, 1280px and 2800px, plus one screenshot with the sticky header visible after scrolling and one with the cookie banner open. Compare them against `agent/reference/concept_home.png`.
5. Confirm with the browser network panel that no Google Analytics request is made before consent.

## 12. Report back

Return a short report with:

- Files created and changed.
- The screenshot paths.
- The contents of `PLACEHOLDERS.md`.
- Any point where the concept could not be followed, and why.

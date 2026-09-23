# Edmondson Lifting Ltd: Services Page Build Brief for Coding Agent

## 1. Context

The homepage and shared shell are built and committed on `feature/homepage`. This brief replaces the `/services` stub with the full Services page.

The approved concept is `agent/reference/concept_services.png`. Follow its structure, colour use and hierarchy closely.

## 2. Ground rules

All ground rules in `agent/edmondson_lifting_homepage_agent_prompt.md` section 2 still apply. In addition:

1. Work on `feature/services`, branched from `feature/homepage`. If creating the branch is blocked, stop and ask Steve to run it.
2. Reuse the existing tokens, Header, Footer, icons, Button styles and section patterns. Do not create a second version of anything that already exists.
3. Do not change the homepage. If a shared component needs a change, make it, confirm the homepage still renders correctly, and report it.
4. Split-colour headings on light backgrounds follow the homepage solution (black text on a yellow highlight), not yellow text. Yellow text appears on black only.

## 3. Page sections

Build these sections in this order. Use the copy below exactly.

### 3.1 Hero

- Dark photographic background (yellow staircase image) with a left-weighted dark overlay.
- Small label in yellow: `OUR SERVICES & WORK`.
- H1 over two lines: `EXPERTISE. QUALITY.` in white, `ON TIME.` in yellow.
- Body: "From bespoke fabrication to on-site maintenance, we provide a complete range of lifting and safety solutions. Take a look at our services below and view examples of our recent work."
- Shorter than the homepage hero, as in the concept.

### 3.2 Our services

- White background. H2: `OUR SERVICES`, with `SERVICES` treated per rule 2.4.
- Two-column checklist on desktop, one column on mobile, each item with a yellow tick icon. Bold text is shown in bold.

Left column:

1. **Lifting equipment** inspections and load tests, in house or on site, across England, Scotland and Wales.
2. **Supply** of loose lifting and safety equipment.
3. **Repairs** of lifting and safety equipment.
4. **Fabrication** work for runways, swing arms and lifting apparatus, all installed by our team.
5. General on-site maintenance work to ensure site safety.

Right column:

1. Inspection of partition doors.
2. Inspection and repairs on vehicle ramps, scissor tables and tail lifts.
3. **24 hour** assistance.
4. CABWI Level 2 in confined spaces.
5. PASMA tower qualifications.
6. IPAF operators.
7. IPAF harness inspectors.
8. SSIP approved.
9. LOLER trained.
10. Full members of LEEA.

- The checklist is a real list (`ul`), with the tick icons hidden from screen readers.
- To the right, the **Safe, Reliable, Professional** banner as in the concept: a yellow pennant with a black and yellow hazard stripe along the top, a black hard hat icon, the three words stacked in black, and a black chevron base. Build it in CSS and inline SVG, not as an image. On mobile it sits below the list at a reduced size.

### 3.3 Our work

- Black textured background as used in the homepage services section. H2: `OUR` white, `WORK` yellow.
- Intro: "A selection of recent projects and installations carried out by our team."
- A 3 by 3 grid of photographs on desktop, 2 columns on tablet, 1 on mobile, with a thin light border as in the concept.
- Use the supplied photos in `public/images/`. Prepare web crops in `public/images/site/` as before, leaving the originals untouched. If fewer than nine usable photos exist, show only the usable ones and log the shortfall in `PLACEHOLDERS.md`. Do not repeat a photo to fill the grid.
- This grid is static for now. It will not connect to Google Drive; that belongs to the Our Work page.
- Each image has meaningful `alt` text describing the equipment shown.

### 3.4 Get a quotation

- Full-width yellow band.
- Black handshake icon left, H2 `GET A QUOTATION` in black.
- Body: "For all enquiries or quotations, our friendly and capable sales staff are on hand to help with any form of enquiry."
- Right: a black **Contact us** button with a mail icon linking to `/contact`, and below it the phone number `0161 6370368` in black with a phone icon, as a `tel:` link.

## 4. Metadata

- Page title `Services` (renders as `Services | Edmondson Lifting Ltd` through the existing template).
- A meta description based on the hero body.
- The sitemap already includes `/services`; leave it unchanged.

## 5. Verification before handing back

1. `./node_modules/.bin/tsc --noEmit`, lint and `npm run build` are clean.
2. The `:global` audit over all module CSS has no bare hits.
3. Playwright screenshots of `/services` at 390px, 1280px and 2800px, saved in `agent/screenshots/`, compared against `agent/reference/concept_services.png`.
4. axe reports no WCAG AA violations at 390px and 1280px, and there is no horizontal overflow at any width.
5. The homepage screenshots are retaken and show no change.

## 6. Commit and report

Commit incrementally on `feature/services`, including `git add public/`. Do not push.

Return a short report with files created and changed, screenshot paths, any change to shared components, the updated `PLACEHOLDERS.md` entries, and any point where the concept could not be followed, and why.

# Edmondson Lifting Ltd: Legal Pages Build Brief for Coding Agent

## 1. Context

The `/cookies`, `/privacy` and `/terms` routes are still stubs. Fill them by adapting the equivalent pages from the Lucy Hall Massage (LHM) site, a Federation Design build whose legal pages are already in use.

The LHM repository is cloned at `~/Sites/LHM`. Read it only. Do not change, commit to or push anything in that repository.

## 2. Ground rules

All ground rules in `agent/edmondson_lifting_homepage_agent_prompt.md` section 2 still apply. In addition:

1. Work on `feature/legal-pages`, branched from `feature/client-revisions`. If creating the branch is blocked, stop and ask Steve to run it.
2. Take the structure, headings and wording style from LHM. Take every fact from this brief and the Edmondson codebase. Never carry over an LHM fact that has not been confirmed for Edmondson.
3. Where a required fact is unknown, insert a clearly named placeholder such as `[DATA RETENTION PERIOD]` and log it in `PLACEHOLDERS.md`. Do not guess.

## 3. Facts for Edmondson

| Item | Value |
|---|---|
| Company | Edmondson Lifting Limited |
| Company number | 08144417 |
| Registered office | Unit 2, Wharf Street, Chadderton, Oldham, OL9 7PF |
| Contact for privacy matters | sales@edmondsonlifting.co.uk, 0161 637 0368 |
| Website | https://edmondsonlifting.co.uk |
| Hosting | Vercel |

Read the codebase to confirm how the site actually handles data. At the time of writing it does the following, and the pages must describe exactly this:

- **Contact form:** collects name, company, email, telephone, service and message. Sent by email to the sales team through Resend. Not stored in a database on the site. Lawful basis: legitimate interests in responding to the enquiry, or steps prior to a contract.
- **Analytics:** Google Analytics 4, loaded only after consent through the `el_consent` banner, with Consent Mode v2.
- **Cookies set:** `el_consent` (strictly necessary, 12 months, records the visitor's choices) and the GA4 cookies `_ga` and `_ga_*` (analytics, only with consent). Check the code and list every cookie actually set, with its purpose and duration, in a table on the Cookies page.
- **Gallery images:** served through the site's own image route from Google Drive. No Google cookies are set on visitors by this.
- **Google Maps:** a plain outbound link only. No map is embedded and no Maps cookies are set.
- **Third parties:** Vercel (hosting), Resend (email delivery), Google (Analytics). Note that these may process data outside the UK.

## 4. What to remove from the LHM text

Remove anything specific to LHM, including: health or treatment information and special category data, online booking and SimplyBook, Google Reviews, LinkedIn testimonials, corporate enquiry forms, payments, cancellations, and any LHM name, address, email or company details. After adapting, search all three pages for `Lucy`, `LHM`, `massage`, `treatment`, `booking`, `SimplyBook` and `review`, and confirm none remain.

## 5. Page requirements

- **Privacy:** who the controller is, what data is collected and why, the lawful basis, who it is shared with, international transfers, retention (placeholder unless the codebase or this brief states it), the visitor's UK GDPR rights, how to contact the company, and the right to complain to the ICO.
- **Cookies:** what cookies are, the table from section 3, how to change consent using the existing **Cookie settings** button (link or trigger it from the page), and how to control cookies in the browser.
- **Terms:** terms of use for the website only (acceptable use, accuracy of information, intellectual property, links to other sites, limitation of liability, governing law of England and Wales). Do not write terms of sale or service contracts.
- Each page shows a **Last updated** date of today's date.
- Use the existing short `PageHero` pattern or a simple text page, whichever LHM's pages most resemble, styled with the existing tokens. Body copy keeps a readable line length.
- Page titles `Privacy policy`, `Cookie policy` and `Terms of use`, each with a meta description.

## 6. Verification before handing back

1. `./node_modules/.bin/tsc --noEmit`, lint and `npm run build` are clean, and the `:global` audit has no bare hits.
2. The section 4 search returns nothing on the three pages.
3. Playwright screenshots of all three pages at 390px and 1280px in `agent/screenshots/`.
4. axe reports no WCAG AA violations, one H1 per page, and no horizontal overflow.

## 7. Commit and report

Commit on `feature/legal-pages`. Do not push.

Return a short report with the files changed, the LHM files used as sources, the full list of placeholders added, and any LHM section left out or changed, and why.

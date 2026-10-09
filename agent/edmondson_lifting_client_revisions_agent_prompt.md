# Edmondson Lifting Ltd: Client Revisions Round 1 Brief for Coding Agent

## 1. Context

The client has reviewed the preview and returned a list of changes. This brief covers those changes only. Do not make any other changes.

## 2. Ground rules

All ground rules in `agent/edmondson_lifting_homepage_agent_prompt.md` section 2 still apply. In addition:

1. Work on `feature/client-revisions`, branched from `feature/contact`. If creating the branch is blocked, stop and ask Steve to run it.
2. Contact details live in `lib/site.ts`. Make every contact change there, not in individual components.

## 3. Changes

### 3.1 Replace the text wordmark with the supplied logo

1. Steve has supplied the new logo at `public/images/brand/logo.svg`. It already contains the client's requested changes (the script E and the hook), so use it exactly as supplied. Do not redraw, recolour, retype or edit it.
2. Replace the text wordmark in the static header, the sticky header and the mobile menu with this file. Keep the existing link to the homepage and give the image the alt text `Edmondson Lifting Ltd`.
3. Size it to match the logo proportions in `agent/reference/concept_home.png`, with the sticky header using the compact size.
4. If the file is missing, stop and report. Do not fall back to the text wordmark or build a substitute.
5. Remove the logo entry from `PLACEHOLDERS.md`.

### 3.2 Correct the Google Maps link

1. The Open in Google Maps link on the Contact page currently searches for the address and lands on the wrong property.
2. Replace it with the exact link Steve gives in his message, stored as the Maps URL in `lib/site.ts`.
3. If Steve has not given a link, use a Google Maps search for `Edmondson Lifting Ltd, Unit 2, Wharf Street, Chadderton, Oldham, OL9 7PF`, and log in `PLACEHOLDERS.md` that the link needs checking.

### 3.3 Remove the mobile number

The mobile number `07541 175401` is no longer active. Remove it from `lib/site.ts`, the Contact page details panel, the homepage `LocalBusiness` JSON-LD and anywhere else it appears. Confirm with a search of the codebase that no instance of `07541` or `+447541` remains.

### 3.4 Remove the Our Work section from the Services page

Remove the Our Work grid section from `/services`. The Get a quotation band now follows the Our Services section directly. Do not change the shared `WorkGrid` component or the Our Work page.

### 3.5 Spelling check

Search the whole codebase, including metadata, alt text, JSON-LD and `.env.example`, for the misspelling `edmundson` in any case. Correct any instance in site content to `Edmondson`. Do not rename the repository, the Vercel project or any git remote; report those instead.

## 4. Verification before handing back

1. `./node_modules/.bin/tsc --noEmit`, lint and `npm run build` are clean, and the `:global` audit has no bare hits.
2. Playwright screenshots at 390px, 1280px and 2800px of the homepage (static and sticky header), `/services` and `/contact`, plus one of the mobile menu open, saved in `agent/screenshots/`.
3. axe reports no WCAG AA violations at 390px and 1280px on the pages changed, and there is no horizontal overflow at any width.
4. The Our Work page is unchanged.

## 5. Commit and report

Commit on `feature/client-revisions`, one commit per change in section 3. Do not push.

Return a short report covering each of the five changes, the screenshot paths, any remaining instances of `edmundson` outside site content, and any point where the brief could not be followed, and why.

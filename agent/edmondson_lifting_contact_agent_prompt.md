# Edmondson Lifting Ltd: Contact Page Build Brief for Coding Agent

## 1. Context

The homepage, Services and Our Work pages are built and committed on `feature/our-work`. This brief replaces the `/contact` stub with a contact page carrying an enquiry form sent through Resend, and the company's contact details.

There is no concept for this page. Build it from the existing patterns so it reads as part of the same site.

## 2. Ground rules

All ground rules in `agent/edmondson_lifting_homepage_agent_prompt.md` section 2 still apply. In addition:

1. Work on `feature/contact`, branched from `feature/our-work`. If creating the branch is blocked, stop and ask Steve to run it.
2. Reuse the existing tokens, `PageHero`, `Section.module.css`, Button variants and icons. Do not create a second version of anything that already exists.
3. The Resend API key is server-only. It must never be prefixed `NEXT_PUBLIC_`, and never appear in client bundles, logs or error messages.
4. Never log or store the content of an enquiry. Server logs may record that a send succeeded or failed, never the sender's details or message.

## 3. Contact details

These are supplied by the client. Put them in `lib/site.ts` as the single source, and use them everywhere they appear across the site.

| Field | Value |
|---|---|
| Email | `sales@edmondsonlifting.co.uk` |
| Office telephone | `0161 637 0368` (`tel:+441616370368`) |
| Mobile | `07541 175401` (`tel:+447541175401`) |
| Address | Unit 2, Wharf Street, Chadderton, Oldham, Lancashire, OL9 7PF |

- The office number was previously shown as `0161 6370368`. Update every instance across the site to the spaced form above, via `lib/site.ts`.
- Add the address and both telephone numbers to the `LocalBusiness` JSON-LD on the homepage.
- This is the trading address. Do not use it as the registered office in the footer. The company number and registered office stay as placeholders.
- Update `PLACEHOLDERS.md` to remove the address from the JSON-LD entry.

## 4. Page sections

### 4.1 Hero

- The short `PageHero` used on Services and Our Work, with a photo not already used as a hero.
- Small label in yellow: `CONTACT`.
- H1 over two lines: `GET IN TOUCH` in white, `TODAY.` in yellow.
- Body: "For all enquiries or quotations, our friendly and capable sales staff are on hand to help. Send us a message below or call the office."

### 4.2 Form and details

- White background. Two columns on desktop: the form on the left at roughly two thirds width, the details panel on the right. One column on mobile, with the details panel first so the phone numbers are reached without scrolling past the form.
- H2 above the form: `SEND US AN ENQUIRY`, with `ENQUIRY` treated with the black-on-yellow highlight.

**Details panel:** a black panel with yellow icons and white text, listing office telephone, mobile, email and address, each on its own line with a label. Telephone numbers and email are `tel:` and `mailto:` links. Under the address, an **Open in Google Maps** link opening a Google Maps search for the address in a new tab. Do not embed a map, as an embedded map sets third-party cookies before consent.

### 4.3 Form fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | Yes | `autocomplete="name"` |
| Company | text | No | `autocomplete="organization"` |
| Email | email | Yes | `autocomplete="email"` |
| Telephone | tel | No | `autocomplete="tel"` |
| Service | select | No | The eight homepage service titles, plus **Something else** |
| Message | textarea | Yes | 2,000 character limit, with a visible counter |

- Every field has a visible label. Required fields are marked in the label text, not by colour alone.
- Below the form, before the button: "We use the details you provide only to respond to your enquiry. See our [privacy policy](/privacy) for more information." No consent checkbox is needed, as the lawful basis is responding to the enquiry, and there is no marketing option.
- Submit button: **Send enquiry**, yellow with black text.

## 5. Sending with Resend

### 5.1 Environment variables

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | `sales@edmondsonlifting.co.uk` |
| `CONTACT_FROM_EMAIL` | `Edmondson Lifting Website <website@edmondsonlifting.co.uk>` |

Add all three to `.env.example` with empty values and a one-line comment each. Do not create or edit `.env.local`.

### 5.2 Behaviour

1. Submit through a server action or a route handler, using the official `resend` package.
2. Validate on the server regardless of any browser checks: required fields present, email format valid, field lengths capped, the service value one of the allowed options.
3. Send one plain-text and simple HTML email to `CONTACT_TO_EMAIL`, from `CONTACT_FROM_EMAIL`, with **Reply-To set to the enquirer's email** so sales can reply directly. Subject: `Website enquiry from {name}`. Escape every user value in the HTML version.
4. Do not send an acknowledgement email to the enquirer.

### 5.3 Spam protection

- A hidden honeypot field. If it is filled in, return the normal success response and send nothing.
- Reject submissions made less than three seconds after the form loaded, again with a normal success response.
- No third-party CAPTCHA.

### 5.4 Responses in the page

- **Success:** replace the form with a message: "Thank you. Your enquiry has been sent and a member of our team will be in touch shortly." Move focus to this message.
- **Validation errors:** show each error beside its field, list them in a summary at the top of the form, move focus to the summary, and keep everything the user typed.
- **Sending failure, or Resend not configured:** keep everything the user typed and show: "Your enquiry could not be sent. Please try again, or call the office on 0161 637 0368." The number is a `tel:` link. If any environment variable is missing, the page still renders normally; only submission fails, with this message.
- While sending, disable the button and change its text to **Sending**.

## 6. Metadata

- Page title `Contact`, and a meta description based on the hero body.
- The sitemap already includes `/contact`; leave it unchanged.

## 7. Verification before handing back

1. `./node_modules/.bin/tsc --noEmit`, lint and `npm run build` are clean, and the `:global` audit has no bare hits.
2. Test with the environment variables unset: the page renders and submission shows the failure message.
3. Test sending against a mocked Resend client: the correct to, from, reply-to and subject; HTML escaping of a message containing markup; honeypot and timing checks sending nothing.
4. Test every validation rule, including an over-length message and an invalid service value posted directly.
5. Confirm with a search of the build output that the API key does not appear in any client bundle, and that no server log line contains enquiry content.
6. Playwright screenshots of `/contact` at 390px, 1280px and 2800px, plus one showing validation errors and one showing the success message, saved in `agent/screenshots/`.
7. axe reports no WCAG AA violations at 390px and 1280px, including in the error and success states, and there is no horizontal overflow at any width.
8. Retake the homepage, Services and Our Work screenshots. The only permitted differences are the reformatted office number.

## 8. Commit and report

Commit incrementally on `feature/contact`. Do not push.

Return a short report with files created and changed, screenshot paths, whether sending was tested live or mocked, any change to shared components, the updated `PLACEHOLDERS.md` entries, and any point where the brief could not be followed, and why.

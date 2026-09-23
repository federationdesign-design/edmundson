# Placeholders

Content that was missing when the homepage was built. Each item is marked in code with a `PLACEHOLDER` comment and, where rendered, a `data-placeholder` attribute.

## Brand

| Item | Where | Current placeholder | Needed |
|---|---|---|---|
| Company logo | `components/Logo.tsx` (header, sticky header, mobile menu) | Company name set as a text wordmark in the brand fonts and colours | Logo artwork (SVG preferred) |

## Company details

| Item | Where | Current placeholder | Needed |
|---|---|---|---|
| Company number | `lib/site.ts` `COMPANY_NUMBER`, shown in footer | `[COMPANY NUMBER]` | Companies House number |
| Registered office | `lib/site.ts` `REGISTERED_OFFICE`, shown in footer | `[REGISTERED OFFICE ADDRESS]` | Full registered office address |
| Business address in JSON-LD | `app/page.tsx` `localBusiness` | Address fields omitted | Trading address, if it should appear in search results |

## Images

| Item | Where | Current placeholder | Needed |
|---|---|---|---|
| Engineer photograph for "Get in touch today" band | `components/home/ContactCta.tsx` | Neutral dark gradient background | Landscape photo of an engineer, at least 2400px wide |
| High resolution hero image | `public/images/site/hero-gantry-crane.jpg` | Supplied gantry photo `5925227a-...JPG` (900 x 1600 portrait), cropped by CSS | Landscape gantry crane photo, at least 2400px wide; the current file is soft on large screens |
| Separate IPAF Harness Inspectors logo | `components/home/Qualifications.tsx` | Same `IPAF.png` used for both IPAF entries | The harness inspector variant, if one exists |

## Route stubs

Each contains only the shared shell and an H1. Content to be briefed separately.

| Route | File |
|---|---|
| `/services` | `app/services/page.tsx` |
| `/our-work` | `app/our-work/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/cookies` | `app/cookies/page.tsx` (cookie policy text needed; the consent banner links here) |
| `/privacy` | `app/privacy/page.tsx` (privacy notice text needed) |
| `/terms` | `app/terms/page.tsx` (terms text needed) |

## Environment

| Variable | Status |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Not set. GA does not load until it is set in Vercel |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Not set. The verification meta tag is omitted until it is set in Vercel |

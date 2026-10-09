# Placeholders

Content that was missing when the homepage was built. Each item is marked in code with a `PLACEHOLDER` comment and, where rendered, a `data-placeholder` attribute.

## Images

| Item | Where | Current placeholder | Needed |
|---|---|---|---|
| Engineer photograph for "Get in touch today" band | `components/home/ContactCta.tsx` | Neutral dark gradient background | Landscape photo of an engineer, at least 2400px wide |
| High resolution hero image | `public/images/site/hero-gantry-crane.jpg` | Supplied gantry photo `5925227a-...JPG` (900 x 1600 portrait), cropped by CSS | Landscape gantry crane photo, at least 2400px wide; the current file is soft on large screens |
| Separate IPAF Harness Inspectors logo | `components/home/Qualifications.tsx` | Same `IPAF.png` used for both IPAF entries | The harness inspector variant, if one exists |
| Higher resolution Our Work photos | `components/services/OurWork.tsx` | `work-lifting-beam.jpg` (438px wide, from `image001.png`), `work-gantry-platform.jpg` and `work-access-ladder.jpg` (591px wide, cropped from phone screenshots `IMG_6491.PNG` and `IMG_6493.PNG`) | Original camera files; these three are soft on large and high-density screens |

## Environment

| Variable | Status |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Not set. GA does not load until it is set in Vercel |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Not set. The verification meta tag is omitted until it is set in Vercel |
| `GOOGLE_DRIVE_FOLDER_ID` | Not set. The Our Work gallery shows the nine local photos until it is set in Vercel |
| `GOOGLE_DRIVE_API_KEY` | Not set. Server-only; restrict it to the Drive API in Google Cloud. Never prefix it with `NEXT_PUBLIC_` |
| `RESEND_API_KEY` | Not set. Server-only. Until it and the two below are set in Vercel, the contact form shows its "could not be sent" message with the office number |
| `CONTACT_TO_EMAIL` | Not set. Expected: `sales@edmondsonlifting.co.uk` |
| `CONTACT_FROM_EMAIL` | Not set. Must be on a domain verified in Resend, e.g. `Edmondson Lifting Website <website@edmondsonlifting.co.uk>` |

## Our Work gallery: live Drive feed untested

No real Drive credentials were available, so the Drive path was tested against a mocked Drive API only (listing with pagination, JPEG, PNG and HEIC files, filtering, alt text, the image route, and the failure fallbacks). Once the two variables above are set in Vercel, check `/our-work` on the preview deployment shows the folder's photos. If it still shows the nine local photos, the Vercel function logs will contain a `[drive]` line saying why.

## Google Maps link needs checking

`MAPS_URL` in `lib/site.ts` (the Open in Google Maps link on the Contact page) is a Google Maps search for "Edmondson Lifting Ltd, Unit 2, Wharf Street, Chadderton, Oldham, OL9 7PF". The previous address-only search landed on the wrong property. Replace it with the exact link to the business listing or pin, then check it opens the right building.

## Contact form: live sending untested

Sending was tested against a mocked Resend API only (recipient, sender, Reply-To, subject, HTML escaping, spam checks and failures). Before launch, verify `edmondsonlifting.co.uk` as a sending domain in Resend (SPF and DKIM records in DNS), set the three variables above in Vercel, and send one real test enquiry from the preview deployment.

## Client instructions for the gallery folder

- **Adding photos:** upload them to the shared Google Drive gallery folder. JPEG, PNG, WebP and iPhone (HEIC) photos all work.
- **When they appear:** new photos show on the Our Work page within an hour, newest first. There is nothing else to do.
- **Captions:** to give a photo a caption, right-click it in Google Drive, choose **File information**, then **Details**, and type a short description of what the photo shows. This becomes the caption and the text read out to people using screen readers. Without one, a descriptive file name is used instead, such as "Loading bay handrail, Barton".
- **Removing photos:** delete the photo from the folder and it disappears from the website within an hour.
- **Keep it tidy:** only put finished, client-safe photos in this folder, as everything in it is shown publicly.

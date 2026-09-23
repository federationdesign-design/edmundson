# Edmondson Lifting Ltd: Our Work Page Build Brief for Coding Agent

## 1. Context

The homepage and Services page are built and committed on `feature/services`. This brief replaces the `/our-work` stub with a photo gallery that is fed from a Google Drive folder, so the client can add new project photos without a developer.

The gallery uses the same grid design as the Our Work section at the bottom of the Services page. There is no separate concept for this page; build it from the existing patterns described below.

## 2. Ground rules

All ground rules in `agent/edmondson_lifting_homepage_agent_prompt.md` section 2 still apply. In addition:

1. Work on `feature/our-work`, branched from `feature/services`. If creating the branch is blocked, stop and ask Steve to run it.
2. Reuse the existing tokens, `PhotoHero`, `Section.module.css`, Button variants, icons and the Services `Quotation` band. Do not create a second version of anything that already exists.
3. The Services page grid stays static, using the nine local crops. Extract the grid itself into a shared component that both pages use, and confirm the Services page is pixel-identical afterwards.
4. The Drive API key is server-only. It must never be exposed to the browser, never be prefixed `NEXT_PUBLIC_`, and never appear in client bundles, logs or error messages.

## 3. Environment variables

| Variable | Purpose |
|---|---|
| `GOOGLE_DRIVE_FOLDER_ID` | The ID of the client's shared gallery folder |
| `GOOGLE_DRIVE_API_KEY` | A Google Cloud API key restricted to the Drive API |

Add both to `.env.example` with empty values and a one-line comment each. If `.env.local` contains real values, use them for testing. Do not create or edit `.env.local`.

## 4. How the Drive feed works

### 4.1 Listing the photos

1. On the server, list the folder with the Drive API v3 `files.list` endpoint, using the API key. The folder is shared as "Anyone with the link: Viewer".
2. Query: files whose parent is the folder, whose MIME type is an image, and which are not trashed. Request only the fields needed: `id`, `name`, `description`, `mimeType`, `createdTime`, `imageMediaMetadata(width,height)`, `thumbnailLink`. Follow `nextPageToken` until every file is listed.
3. Order newest first by `createdTime`.
4. Cache the result with Next.js revalidation of **one hour**, so new photos appear within an hour of upload with no redeploy.

### 4.2 Serving the images

1. Serve every Drive image through a route handler at `/api/work-image/[id]`, which fetches the file server-side and streams it back. Do not link to Drive URLs from the browser, since they are unreliable and rate-limited.
2. The route only serves IDs present in the current folder listing. Any other ID returns 404, so the route cannot be used as an open proxy into Drive.
3. JPEG, PNG and WebP are fetched with `alt=media`. HEIC files (the iPhone default) are fetched through the file's `thumbnailLink` at a large size, which Drive returns as JPEG. If a HEIC file cannot be converted, skip it from the gallery rather than showing a broken tile.
4. Responses carry long cache headers (`public, max-age=86400, s-maxage=31536000, immutable`). A Drive file ID never changes its content, so this is safe.
5. The page renders these through `next/image`, so they are resized and optimised as with the local images.

### 4.3 Alt text

- Use the Drive file's **description** as the alt text when the client has filled it in.
- Otherwise use a readable version of the filename if it is descriptive (for example `Barton South side collapsible handrail`). Camera names such as `IMG_3583` are not descriptive; fall back to `Recent project by Edmondson Lifting`.

### 4.4 Fallback

If either environment variable is missing, or the Drive API fails or returns no usable images, show the nine local crops from `public/images/site/work-*.jpg` instead. The page must never show an error, an empty state or a broken image because of Drive. Log the failure server-side without the key.

## 5. Page sections

### 5.1 Hero

- The short `PhotoHero` used on the Services page, with a different photo from the gallery.
- Small label in yellow: `OUR WORK`.
- H1 over two lines: `BUILT, INSTALLED` in white, `AND INSPECTED.` in yellow.
- Body: "A selection of recent projects and installations carried out by our team, from bespoke fabrication to on-site inspections across England, Scotland and Wales."

### 5.2 Gallery

- Black textured background, as on the Services page. No H2 is needed beneath the hero.
- The shared grid: 3 columns on desktop, 2 on tablet, 1 on mobile, with the same thin light border.
- Show the first 24 photos, then a **Show more** button that reveals the next 24. The button disappears when everything is shown.
- Selecting a photo opens it larger in an accessible dialog: focus moves into it, Escape and a Close button close it, left and right arrow keys and on-screen buttons move between photos, and focus returns to the tile on close. The alt text shows as a caption.
- Respect `prefers-reduced-motion` in the dialog.

### 5.3 Get a quotation

- Reuse the Services `Quotation` band unchanged.

## 6. Metadata

- Page title `Our Work`, and a meta description based on the hero body.
- The sitemap already includes `/our-work`; leave it unchanged.

## 7. Verification before handing back

1. `./node_modules/.bin/tsc --noEmit`, lint and `npm run build` are clean, and the `:global` audit has no bare hits.
2. Test the fallback path with the environment variables unset.
3. Test the Drive path. If real values are in `.env.local`, test live. If not, test against a mocked `files.list` response and state clearly in the report that the live path is untested.
4. Confirm the image route returns 404 for an ID not in the folder.
5. Confirm with a search of the build output that the API key does not appear in any client bundle.
6. Playwright screenshots of `/our-work` at 390px, 1280px and 2800px, plus one with the dialog open, saved in `agent/screenshots/`.
7. axe reports no WCAG AA violations at 390px and 1280px, including with the dialog open, and there is no horizontal overflow at any width.
8. The homepage and Services screenshots are retaken and show no change.

## 8. Commit and report

Commit incrementally on `feature/our-work`, including `git add public/`. Do not push.

Return a short report with files created and changed, screenshot paths, whether the Drive path was tested live or mocked, any change to shared components, the updated `PLACEHOLDERS.md` entries, and any point where the brief could not be followed, and why.

Also add a short plain-English section to `PLACEHOLDERS.md` headed **Client instructions for the gallery folder**, covering: upload photos to the shared folder; new photos appear within an hour; adding a description to a file sets its caption and alt text; deleting a photo removes it within an hour.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Edmondson Lifting site

- Next.js App Router, React 19, TypeScript. CSS Modules only, relative imports only (no `@/` alias).
- Colours come only from the five tokens in `app/globals.css`. Text on yellow is black; yellow text only on black.
- Type sizes use the `--step-*` clamp scale in `app/globals.css`; no fixed pixel sizes.
- UK English, no em dashes in copy, comments or commit messages.
- Shared contact details, nav and routes live in `lib/site.ts`.
- Missing content is logged in `PLACEHOLDERS.md` and marked `PLACEHOLDER` in code. Never invent content.
- Cookie consent: `components/consent/`. GA4 only loads after analytics consent (Consent Mode v2, defaults denied).
- Web images derived from the supplied originals live in `public/images/site/`. Always `git add public/`.
- Work on feature branches; Steve pushes.

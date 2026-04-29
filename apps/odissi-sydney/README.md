# Odissi Sydney

Replacement for [odissisydney.com](https://www.odissisydney.com). Indian classical dance & music school — Nirmal Jena & Chitrita Mukerjee.

**Read first:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) — full app architecture, design system, content model.
**Source content:** [`CONTENT.md`](./CONTENT.md) — copy from the existing live site, captured for the rebuild.

## Run locally

```bash
# from repo root
bun install
bun run --filter odissi-sydney dev
```

The app runs at <http://localhost:3000>.

## Deploy

Vercel project: `odissi-sydney`. Root Directory: `apps/odissi-sydney`. See root `README.md` § "Deploy model".

## Status

Wave 1 (scaffold) complete. Next 16 + React 19 + Tailwind v4, design tokens (sandstone palette + Cormorant + Source Serif) wired in `src/app/globals.css`. The hello page renders the brand voice and tokens for sign-off.

Wave 2 (build) is a fan-out of focused agents — see root `ARCHITECTURE.md` § "Wave 2".

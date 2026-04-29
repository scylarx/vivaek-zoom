# Caldera

Sydney underground music events. *Welcome to Psydney.*

**Read first:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) — brand, audio system, 3D mandala, content model, accessibility.

## Run locally

```bash
# from repo root
bun install
bun run --filter caldera dev
```

The app runs at <http://localhost:3001> (Odissi runs on 3000; Caldera moves to 3001 to allow both in parallel).

## Deploy

Vercel project: `caldera`. Root Directory: `apps/caldera`. See root `README.md` § "Deploy model".

## Status

Wave 1 (scaffold) complete. Next 16 + React 19 + Tailwind v4, design tokens (void + neon palette, Bricolage / Inter / Geist Mono fonts, dark default with light-mode counterpart) wired in `src/app/globals.css`. The hello page renders a static SVG mandala placeholder and brand voice for sign-off.

Wave 3 (audio engine + 3D mandala + events) is a fan-out of focused agents — see root `ARCHITECTURE.md` § "Wave 3".

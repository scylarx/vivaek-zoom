# VivaekZoom

Two websites, one monorepo. Built for Vercel, designed in 2026.

| App | Path | Domain (TBC) | What it is |
|---|---|---|---|
| **Odissi Sydney** | `apps/odissi-sydney` | odissisydney.com (rebuild) | Nirmal Jena's Indian classical dance & music school — Sydney + Blue Mountains. Replacing the existing Weebly site. |
| **Caldera** | `apps/caldera` | TBC | "Welcome to Psydney" — Sydney underground/psytrance events, community-first, neurodivergent-safe, music-driven. |

These two brands share **nothing** in tone, audience, or aesthetic. They share a repo because that's cheaper to operate, not because they're related. Each ships independently to its own Vercel project.

---

## For my friend (the non-dev): how to use this repo

You don't need to know the code to ship work. You need three things:

1. **Read the architecture docs first.** They are the brief.
   - `ARCHITECTURE.md` (this directory) — how the monorepo works.
   - `apps/odissi-sydney/ARCHITECTURE.md` — what the parents' site is, how it should feel, what's already on the live site.
   - `apps/odissi-sydney/CONTENT.md` — the actual copy from the existing site, captured as source-of-truth.
   - `apps/caldera/ARCHITECTURE.md` — what Caldera is, the audio system design, the mandala, the visual identity.

2. **Talk to the agent in plain English.** Reference a specific file or section. "In `apps/caldera/ARCHITECTURE.md`, the audio section says X — let's add Y." Specifics beat vibes. The agent reads files, you read intent.

3. **One change at a time.** Run `pnpm dev` (after first-time setup below), look at what changed in the browser, decide if it's right. Don't merge five ideas into one prompt — small loops, fast feedback.

The architecture docs are written to brief any agent picking up the work cold. If something is unclear, that's a doc bug — fix the doc first, then the code.

---

## Tech stack (pinned, no legacy)

| Layer | Choice | Why |
|---|---|---|
| Toolchain | **Bun 1.2+** | Single tool: install, run, bundle, test. Replaces npm/yarn/pnpm + jest/vitest + ts-node + nodemon. `bun.lock` is committed. |
| Runtime (Vercel build/SSR) | Node 22 LTS | Vercel still runs Next.js builds and serverless functions on Node. Bun is the install tool; Node is the production runtime. |
| Monorepo orchestrator | Turborepo 2.5+ | Task graph + local + remote cache. Reads Bun workspaces natively. |
| Framework | **Next.js 16** | App Router only. Turbopack default for dev + build. PPR + `after()` available. |
| UI runtime | **React 19** | Server Components stable, `use()`, `useOptimistic`, ref-as-prop, React Compiler stable. |
| Compiler | React Compiler (stable) | Auto-memoization. No more manual `useMemo`/`useCallback`. |
| Language | TypeScript 5.7+ strict | `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` on. |
| Styling | **Tailwind CSS v4** | CSS-first config (`@theme`), Oxide engine, no `tailwind.config.js`. |
| Components | shadcn/ui (latest) | Copy-paste primitives, owned in-tree. |
| Animation | Motion (latest) + GSAP 3 + `@gsap/react` | Motion for component transitions; GSAP for scroll timelines on Caldera. |
| 3D (Caldera only) | react-three-fiber + drei + leva | Mandala. WebGL with mobile fallback. |
| Audio (Caldera only) | Howler.js + Zustand 5 | See `apps/caldera/ARCHITECTURE.md` §Audio. |
| Lint/format | Biome 2 | Single tool, fast. ESLint-Next rules layered only where Biome lacks coverage. |
| Tests | `bun test` | Native, fast, Jest-compatible API. No Vitest, no Jest. |
| Validation | Zod 4 | Runtime + type inference. |
| CMS | Sanity v3 | Both apps. Non-dev-friendly editing for parents and event content. |
| Email | Resend | Contact form delivery. |
| Deploy | Vercel | One project per app. Root Directory set per project. |

**Hard rules for any agent in this repo:**
- No npm. No pnpm. No yarn. **Bun only.** `bun install`, `bun add`, `bun run`, `bun test`. The lockfile is `bun.lock` and it is committed.
- No Pages Router. Ever. App Router only.
- No `forwardRef` boilerplate when ref-as-prop works (React 19).
- No manual memoization unless React Compiler explicitly bails out (verify with the compiler's healthcheck output).
- No `tailwind.config.js` — config lives in CSS via `@theme`.
- No `<img>`/`<a>` for internal — use `next/image` and `next/link`.
- No client components unless the file genuinely needs interactivity, browser APIs, or hooks. Default to Server Components.
- No "just install another library" without checking if Next/React 19 already provides it.
- No Vitest, Jest, ts-node, nodemon — Bun handles all of these natively.

---

## First-time setup

```bash
# 1. Install Bun (one-liner from https://bun.sh)
curl -fsSL https://bun.sh/install | bash
bun --version          # 1.2+ required

# 2. Install Node 22 (Vercel still uses it for Next runtime; we keep it on path)
#    Use fnm / nvm / volta — your call. .nvmrc pins to 22.

# 3. Install workspace deps
bun install

# 4. Run one app
bun run --filter odissi-sydney dev
bun run --filter caldera dev

# 5. Or run both in parallel via Turborepo
bun run dev
```

Apps were scaffolded in wave 1. See `apps/*/README.md` for per-app commands.

---

## Repo layout

```
.
├── README.md                        ← you are here
├── ARCHITECTURE.md                  ← monorepo-level architecture
├── package.json                     ← workspace root (Bun workspaces in `workspaces` field)
├── bun.lock                         ← committed; do not edit by hand
├── turbo.json                       ← Turborepo pipeline
├── tsconfig.base.json               ← shared TS config (apps extend this)
├── biome.json                       ← lint + format config
├── .nvmrc                           ← Node version pin (Vercel-side runtime)
├── .editorconfig
├── .gitignore
└── apps/
    ├── odissi-sydney/
    │   ├── ARCHITECTURE.md          ← READ THIS BEFORE TOUCHING THE APP
    │   ├── CONTENT.md               ← extracted copy from the live site
    │   └── (Next.js app — scaffolded in next wave)
    └── caldera/
        ├── ARCHITECTURE.md          ← READ THIS BEFORE TOUCHING THE APP
        └── (Next.js app — scaffolded in next wave)
```

There is intentionally no `packages/` directory yet. The apps share so little that premature shared packages would be overhead. When something genuinely needs sharing (a typography token, a Sanity client wrapper), extract it then.

---

## Deploy model

Two Vercel projects, one Git repo:

| Vercel Project | Root Directory | Branch | Domain |
|---|---|---|---|
| `odissi-sydney` | `apps/odissi-sydney` | `main` | `odissisydney.com` (cutover when ready) |
| `caldera` | `apps/caldera` | `main` | TBC |

Per-project Vercel settings:
- **Install Command**: `bun install --frozen-lockfile`
- **Build Command**: `cd ../.. && bun run turbo build --filter=<project-name>`
- **Output Directory**: `.next` (default; Vercel auto-detects)

Vercel auto-detects `bun.lock` and uses Bun for install. The Next.js build runs on Vercel's Node 22 runtime (Bun is install-only on Vercel today). Each app deploys only when its files change (Turborepo cache + Vercel ignored-build-step).

Preview deploys: every PR/branch gets a `*.vercel.app` URL per app.

---

## Working with agents on this repo

This repo is built to be worked on with Claude Code (or similar). Conventions:

- **Architecture docs are the contract.** Agents read them before touching code. If you change architectural intent, update the doc in the same PR.
- **No half-finished implementations.** If you can't complete a task, stop and report — don't leave stub functions or `// TODO: implement`.
- **No surprise dependencies.** New packages need a one-line justification in the PR description.
- **Test what you ship.** UI changes → run the dev server, click the feature, watch for regressions. Type-checking is necessary, not sufficient.

---

## Status

| Wave | What | Status |
|---|---|---|
| 0 — Planning | Pull existing Odissi content, write architecture docs, decide stack | ✓ Done |
| 1 — Scaffold | Next 16 + React 19 + Tailwind v4 apps with design tokens, hello-worlds running locally | ✓ Done |
| 2 — Odissi build | Sanity wire-up, IA, design system completion, content, contact, Vercel deploy | Next — fan out to agents |
| 3 — Caldera build | Sanity wire-up, audio system, 3D mandala, events, Vercel deploy | Next — fan out to agents |
| 4 — Cutover | Domain switch for odissisydney.com once parents approve | Pending |

After wave 1, each app's `ARCHITECTURE.md` is the brief for a fan-out of focused agents — one per concern (design system, content model, audio, 3D, contact, etc.) — running in parallel where the work doesn't intersect.

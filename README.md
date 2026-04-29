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
| Runtime | Node 22 LTS | Latest LTS at time of authoring; pinned via `.nvmrc`. |
| Package manager | pnpm 9 | Workspace support, fast, deterministic. |
| Monorepo | Turborepo 2 | Caches builds locally + remotely on Vercel. |
| Framework | **Next.js 16** | App Router only. Turbopack stable for dev + build. PPR + `after()` available. |
| UI runtime | **React 19** | Server Components stable, `use()`, `useOptimistic`, ref-as-prop, React Compiler stable. |
| Compiler | React Compiler (stable) | Auto-memoization. No more manual `useMemo`/`useCallback`. |
| Language | TypeScript 5.7+ strict | `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` on. |
| Styling | **Tailwind CSS v4** | CSS-first config (`@theme`), Oxide engine, no `tailwind.config.js`. |
| Components | shadcn/ui (latest) | Copy-paste primitives, owned in-tree. |
| Animation | Motion (latest) + GSAP 3 + `@gsap/react` | Motion for component transitions; GSAP for scroll timelines on Caldera. |
| 3D (Caldera only) | react-three-fiber + drei + leva | Mandala. WebGL with mobile fallback. |
| Audio (Caldera only) | Howler.js + Zustand 5 | See `apps/caldera/ARCHITECTURE.md` §Audio. |
| Lint/format | Biome 2 | Single tool, fast. ESLint-Next rules layered only where Biome lacks coverage. |
| Validation | Zod 4 | Runtime + type inference. |
| CMS | Sanity v3 | Both apps. Non-dev-friendly editing for parents and event content. |
| Email | Resend | Contact form delivery. |
| Deploy | Vercel | One project per app. Root Directory set per project. |

**Hard rules for any agent in this repo:**
- No Pages Router. Ever. App Router only.
- No `forwardRef` boilerplate when ref-as-prop works (React 19).
- No manual memoization unless React Compiler explicitly bails out (verify with the compiler's healthcheck output).
- No `tailwind.config.js` — config lives in CSS via `@theme`.
- No `<img>`/`<a>` for internal — use `next/image` and `next/link`.
- No client components unless the file genuinely needs interactivity, browser APIs, or hooks. Default to Server Components.
- No "just install another library" without checking if Next/React 19 already provides it.

---

## First-time setup

```bash
# 1. Install Node 22 (use fnm, nvm, or volta)
node --version  # should be v22.x

# 2. Install pnpm 9
corepack enable
corepack prepare pnpm@latest --activate

# 3. Install workspace deps (once apps are scaffolded)
pnpm install

# 4. Run a single app
pnpm --filter odissi-sydney dev
pnpm --filter caldera dev

# 5. Or run both via Turborepo
pnpm dev
```

Apps are not yet scaffolded — that's the next wave of work, after the architecture is approved. See `ARCHITECTURE.md` § "Next wave".

---

## Repo layout

```
.
├── README.md                        ← you are here
├── ARCHITECTURE.md                  ← monorepo-level architecture
├── package.json                     ← workspace root, scripts, dev tooling
├── pnpm-workspace.yaml              ← workspace globs
├── turbo.json                       ← Turborepo pipeline
├── tsconfig.base.json               ← shared TS config (apps extend this)
├── biome.json                       ← lint + format config
├── .nvmrc                           ← Node version pin
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

Vercel handles monorepo deploys natively — set "Root Directory" in project settings. Each app builds and deploys only when its files change (Turborepo + Vercel ignored-build-step integration).

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
| 0 — Planning | Pull existing Odissi content, write architecture docs, decide stack | ✓ Done (this commit) |
| 1 — Scaffold | `create-next-app` both apps, wire up Sanity, deploy hello-worlds to Vercel | Next |
| 2 — Odissi build | Implement IA, design system, content model, contact, deploy | Pending |
| 3 — Caldera build | Implement audio system, mandala, events, deploy | Pending |
| 4 — Cutover | Domain switch for odissisydney.com once parents approve | Pending |

The scope of this commit is **planning artefacts only**. No app code is written yet — that comes in wave 1, after the architecture is reviewed.

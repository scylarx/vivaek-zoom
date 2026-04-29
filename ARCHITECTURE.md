# Monorepo Architecture

Cross-cutting decisions for the whole repo. App-specific architecture lives in `apps/*/ARCHITECTURE.md`.

## Why a monorepo

Two apps with different audiences, different stacks-within-the-stack, different release cadences. They get a single repo for three reasons:

1. **One CI, one tooling chain.** Biome, TS config, Turborepo cache, Vercel CLI — set up once.
2. **Easy to extract later.** `git filter-repo --path apps/caldera` produces a standalone repo with full history if we ever split.
3. **Shared knowledge surface.** The architecture docs are next to each other; an agent reading one will incidentally see the other and avoid divergent patterns where convergence is cheap.

We are **not** sharing UI components between the apps. They have nothing to share — their design languages are intentionally opposite.

## Toolchain — Bun

The whole repo runs on **Bun 1.2+**. Bun is the package manager (`bun install`, `bun add`), the script runner (`bun run`), the test runner (`bun test`), and — where Next.js doesn't preempt it — the local runtime. We do not use npm, pnpm, yarn, Vitest, Jest, ts-node, or nodemon.

Why: Bun replaces five tools with one, runs each of them faster, and has native workspace support. The lockfile is `bun.lock` (text, deterministic, committed). Local dev install on this repo is sub-second after first run.

**Where Bun stops:** Vercel still builds and serves Next.js apps on Node 22 — Bun is the *install* tool on Vercel today, not the runtime. Locally you can run Next dev under Bun with `bun --bun next dev` if you want, but the canonical command is `bun run dev` which delegates to Node-on-Bun-PATH for parity with production.

## Workspaces

Bun workspaces are declared in the root `package.json`:

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

There is no separate `pnpm-workspace.yaml` / `bun-workspace.yaml` file — Bun reads from `package.json` directly. Each app has its own `package.json`, its own `next.config.ts`, its own `tsconfig.json` (extending `tsconfig.base.json`), its own dependencies. Filter to a single workspace with `bun run --filter <name> <script>`.

## Turborepo

`turbo.json` defines a build graph. Each app's `dev`, `build`, `lint`, `typecheck`, `test` are tasks. Turborepo:
- Caches outputs locally + remotely (Vercel Remote Cache).
- Skips builds for apps whose inputs didn't change (CI optimization).
- Runs tasks in parallel when no dependency exists between them.

## TypeScript

`tsconfig.base.json` is the source of truth for TS strictness. Apps extend it and add `paths` / `include`. Strict means *strict*:

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitOverride: true`
- `noFallthroughCasesInSwitch: true`
- `verbatimModuleSyntax: true` (matches Next 16 / TS 5.7 expectations)

Module resolution: `"bundler"` (Next.js 16 default).

## Tailwind v4

Each app has a single `app/globals.css` that imports Tailwind and defines its theme via `@theme`. There is **no `tailwind.config.js`** — Tailwind v4 config is CSS-first.

Each app's tokens (color, font, spacing, motion timing) are defined in CSS variables under `@theme`. This means the design system *is* the stylesheet — readable, no JS indirection.

## React Compiler

Enabled at the Next.js level (`experimental.reactCompiler: true` — note: by Next 16 GA this is on by default; verify in `next.config.ts`). Implications:

- **Do not** write `useMemo` / `useCallback` / `React.memo` proactively. The compiler handles memoization.
- If profiling shows a re-render issue, first check the compiler healthcheck output (`react-compiler-healthcheck`). Manual memoization is a last resort and must be commented with the reason.
- Pure render functions only. Side effects in render break the compiler's assumptions.

## Server Components by default

Every component is a Server Component until it can't be. A component becomes a Client Component (`"use client"`) only if it:
- Uses hooks (`useState`, `useEffect`, `useReducer`, custom hooks built on these)
- Uses browser-only APIs (`window`, `document`, `IntersectionObserver`, Web Audio)
- Uses event handlers (`onClick`, `onChange` — these can't cross the RSC boundary)
- Uses third-party libraries that internally do any of the above

For everything else — layout, content rendering, data fetching, metadata — Server Components are smaller bundles, faster TTFB, and don't ship JS.

## Data fetching

- **Reads**: in Server Components, directly. `await sanityClient.fetch(query)` in the component. No client-side fetching libraries (TanStack Query, SWR) unless there's a real-time / mutation reason.
- **Writes**: Server Actions. No API routes for form submissions.
- **Mutations triggered from client**: form action attribute pointing at a Server Action. `useFormStatus` for pending state, `useOptimistic` for optimistic UI.

## Lint & format

Biome 2. Single config (`biome.json`) at root, applied to both apps. Pre-commit hook runs `biome check --apply` on staged files via `lefthook` (lighter than husky, faster than lint-staged).

We use `eslint-config-next` only for Next-specific rules Biome doesn't cover (e.g. `<Image>` correctness). Run them in series in CI: Biome first, ESLint-Next as a follow-up scan.

## CI

GitHub Actions, two jobs in parallel per push/PR:

1. **Lint + typecheck** (Biome + `tsc --noEmit` per app via Turborepo)
2. **Build** (`bun run turbo build`, with Turborepo Remote Cache against Vercel)

The GitHub Actions runner installs Bun via [`oven-sh/setup-bun`](https://github.com/oven-sh/setup-bun) and runs `bun install --frozen-lockfile`. Node 22 is also installed on the runner because Next.js still expects it during build for some codepaths.

Vercel handles the actual deploy. The GH Actions check is a fast-fail gate.

## Vercel deploy model

Two projects in one Vercel team, both pointing at this repo:

- Project `odissi-sydney`: Root Directory = `apps/odissi-sydney`. Build command = `cd ../.. && bun run turbo build --filter=odissi-sydney`. Install command = `bun install --frozen-lockfile`.
- Project `caldera`: same shape, filter swapped.

Each has its own env vars, its own domain, its own preview URLs. Both share the Turborepo Remote Cache (auto-enabled on Vercel).

`vercel.json` is **not** required at root. Per-app config (if needed) lives in `apps/*/vercel.json`. Avoid it unless something can't be configured in the Vercel dashboard.

## Environment variables

Pattern per app:

- `apps/<app>/.env.local` — local secrets, gitignored
- `apps/<app>/.env.example` — committed template, no values
- Vercel dashboard — production + preview values

Sanity, Resend, and any analytics tokens live in env vars. **Never** in code, never in client bundles unless prefixed `NEXT_PUBLIC_` and verified non-sensitive.

## When to extract to `packages/*`

Today: never. The overhead of a shared package (separate `package.json`, build/watch step, version bumping in two places) is real.

Trigger to extract:
- Same code copy-pasted into both apps and modified in lock-step ≥ 3 times.
- A piece of logic that has its own test surface (Sanity client wrapper, email rendering, analytics dispatcher).

When extracted, the package goes in `packages/<name>` with its own `package.json`, exports declared, no build step (publish raw TS — Next 16 transpiles workspace packages by default).

## Wave 1 (scaffold) — done

Both apps were scaffolded directly (Next 16, React 19, Tailwind v4, Biome, Bun) without using `create-next-app` — the upstream generator still scaffolds outdated patterns (eslint, postcss config that conflicts with Tailwind v4 oxide, no React Compiler flag). Manual scaffolding gives a clean baseline.

Each app contains:
- `package.json` with Next 16 + React 19 + Tailwind v4 + the app-specific deps already pinned.
- `tsconfig.json` extending `../../tsconfig.base.json`.
- `next.config.ts` with React Compiler enabled, PPR set to `incremental`.
- `postcss.config.mjs` with `@tailwindcss/postcss`.
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` rendering the design-token system from each app's ARCHITECTURE.md.
- `.env.example` listing required env vars.

To run wave 1 locally:

```bash
bun install              # at repo root
bun run dev              # starts both dev servers via Turborepo
# or
bun run --filter odissi-sydney dev
bun run --filter caldera dev
```

## Wave 2 + 3 (build) — agent fan-out

Each app's `apps/<app>/ARCHITECTURE.md` is now the brief for a parallel fan-out of agents:

**Odissi Sydney** parallelisable concerns:
- Sanity Studio scaffold + content schemas (`class`, `location`, `person`, `testimonial`, `galleryItem`, `charityProgram`, `siteSettings`)
- Page implementation: `/`, `/classes`, `/guru`, `/charity`, `/contact`
- Design system completion (typography scale, motion presets, `motion-safe:` variants)
- Contact form via Resend + Server Action + React Email template
- SEO + structured data (`Person`, `Organization`, `Course`, `LocalBusiness`)

**Caldera** parallelisable concerns:
- Sanity Studio scaffold + content schemas (`event`, `artist`, `track`, `manifesto`, `siteSettings`) with rights-cleared gating
- Audio engine: Howler + Zustand player store + `<PlayerBar>` (mobile/desktop), unlock flow, sessionStorage persistence
- 3D mandala: R3F + drei + custom shader, beat-reactive uniforms, mobile fallback
- Section implementation: hero, manifesto, sound, events, community, promoters
- Light/dark + sensory-light modes, theme persistence
- Performance hardening: dynamic imports, lighthouse-ci budget, R2 audio pipeline

Agents in each fan-out get briefed with: the app's ARCHITECTURE.md, the relevant section to own, the success criteria from the doc, and an instruction to *flag gaps in the brief rather than guess*.

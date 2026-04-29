# Agent Runway

This repository is being prepared for a non-developer to learn modern agentic development by building two real sites with emotional stakes, public quality expectations, and deployable architecture.

The point is not to generate impressive text. The point is to create a working base where future agents can safely continue, notice gaps, make decisions explicit, and finish work instead of declaring completion because the surface looks plausible.

## Operating Standard

Every agent working here should behave like a careful senior product engineer, cultural researcher, designer, and implementation partner.

- Preserve user intent before optimizing implementation.
- Prefer concrete files, decisions, tests, screenshots, and deployable increments over abstract enthusiasm.
- Treat uncertainty as a task queue item, not as a reason to stall.
- After every meaningful commit-thought, ask: what is missing, what assumption did I just make, and what would fail in production?
- Do not flatten cultural, familial, community, accessibility, or neurodivergent-safety concerns into generic marketing copy.
- Do not claim a feature is done until it has been implemented, run, inspected, and documented.

## Current Project Shape

Use a monorepo while both products are being explored:

- `apps/odissi-sydney`: respectful rebuild of the existing Odissi Sydney presence.
- `apps/caldera`: Sydney niche music/community events site.
- `docs/adr`: durable architectural decisions.
- `docs/research`: research notes, source logs, and unresolved questions.

This keeps one shared workspace for learning, review, tooling, and future extraction. Each app can still deploy as an independent Vercel project with its own root directory, domain, environment variables, analytics, and preview deployments.

## Technology Baseline

As of April 30, 2026, use:

- Next.js 16 App Router.
- React 19.2 or current React 19 compatible release.
- TypeScript strict mode.
- Node 22 LTS unless a dependency forces otherwise.
- pnpm workspaces.
- Tailwind CSS v4 using CSS-first configuration.
- React Compiler enabled deliberately, measured, and documented.
- Turbopack as the default Next.js bundler.

Avoid old defaults:

- No Pages Router.
- No Next.js 14/15 assumptions.
- No Tailwind v3 config-first patterns unless a migration note explains why.
- No animation library sprawl.
- No generic component library look that erases the identity of either project.

Useful official references checked on this pass:

- Next.js 16 release: https://nextjs.org/blog/next-16
- Next.js 16 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- React 19.2 release: https://react.dev/blog/2025/10/01/react-19-2
- Tailwind CSS v4 release: https://tailwindcss.com/blog/tailwindcss-v4

## Agent Handoff Protocol

Before editing:

1. Read `README.md`, this file, the relevant app architecture file, and any ADRs.
2. Check for existing edits and do not overwrite work in progress.
3. State the specific files you intend to touch.

While working:

1. Keep changes small enough to verify.
2. Record source URLs when importing content.
3. Add screenshots or notes after UI verification.
4. Track unresolved questions in the relevant content or research file.

Before saying done:

1. Run the relevant checks.
2. Start the app if it has a frontend.
3. Inspect desktop and mobile.
4. Confirm copy, layout, accessibility, and performance basics.
5. Name anything not completed.

## Quality Bar

The bar is not "modern website". The bar is:

- Odissi Sydney feels like a thoughtful act of care from a son who understands the dignity of the work.
- Caldera feels like a living community signal, not an events poster converted into a web page.
- A non-developer can use the repo as a guided learning environment without feeling tricked by hidden complexity.
- Future agents can continue from clear artifacts rather than re-deriving intent.


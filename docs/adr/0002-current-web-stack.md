# ADR 0002: Current Web Stack

Status: proposed

Date: 2026-04-30

## Decision

Use a modern TypeScript web stack aligned with the current official framework direction:

- Next.js 16 App Router
- React 19.2 or the current React 19 release compatible with Next.js 16
- TypeScript strict mode
- Node 22 LTS for Vercel-side runtime
- Bun 1.2+ as the local toolchain (install, run, test); workspaces declared in root `package.json`. No npm/pnpm/yarn.
- Tailwind CSS v4
- Turbopack (default in Next 16 dev + build)
- React Compiler, enabled intentionally and verified
- Biome 2.4 for lint + format

## Framework Notes

Next.js 16 introduced stable Turbopack defaults, caching architecture changes, Cache Components, `proxy.ts` replacing middleware terminology, and stable React Compiler configuration support. React 19.2 adds newer React primitives such as `<Activity />`, `useEffectEvent`, and other framework-relevant improvements.

Official references:

- https://nextjs.org/blog/next-16
- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://react.dev/blog/2025/10/01/react-19-2
- https://tailwindcss.com/blog/tailwindcss-v4

## Defaults

- Use Server Components by default.
- Add Client Components only for interaction, browser APIs, animation, media, or 3D.
- Use Server Actions for form mutations where they simplify the app.
- Use CSS variables and Tailwind v4 `@theme` tokens for design systems.
- Use image optimization and explicit media dimensions.
- Use route-level metadata, OG images, and structured data from day one.

## Avoid

- Pages Router.
- Legacy `middleware.ts` assumptions when Next 16 `proxy.ts` is the appropriate boundary.
- Tailwind v3-style config as the primary token source.
- Blanket `use client` at layout/page boundaries.
- Animation that breaks reduced-motion expectations.


# ADR 0001: Monorepo First, Extract Later

Status: proposed

Date: 2026-04-30

## Context

The project contains two distinct products:

- Odissi Sydney, a culturally sensitive rebuild for an existing arts, teaching, and wellbeing presence.
- Caldera, a Sydney niche music and community events site.

They may later become separate repositories, but the immediate goal is rapid, careful learning and implementation with a non-developer collaborator.

## Decision

Start as a pnpm workspace monorepo:

- `apps/odissi-sydney`
- `apps/caldera`
- optional shared packages only when duplication becomes real

Deploy each app to Vercel as a separate project using its app directory as the Vercel root.

## Why

- One repo gives the learner a single mental model.
- Shared linting, formatting, types, and agent guidance reduce hidden setup work.
- Separate Vercel projects preserve independent deployment, domains, env vars, and preview URLs.
- Future extraction is practical once product boundaries are proven.

## Consequences

- Shared packages must not become a dumping ground.
- App identities must stay separate in design tokens, content, imagery, and tone.
- Cross-app abstractions require an explicit reason and preferably a small ADR.

## Extraction Trigger

Split an app into its own repo only when one of these becomes true:

- different teams or collaborators need different permissions;
- release cadence creates friction;
- dependencies diverge enough that installs/builds are noisy;
- one product needs private history or commercial separation.


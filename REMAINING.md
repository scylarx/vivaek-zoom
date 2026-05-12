# REMAINING

What's left before either site can go live, what's parked behind ecosystem decisions, and what I'd ask for next.

Last updated: 2026-05-12 (after the soft-launch deploy, Basin pivot, and DNS discovery).

The repo currently builds clean for both apps (`bun run typecheck`, `bun x biome check .`, `bun run build`). Nothing here is *broken*. These are gaps between "builds" and "ready for the people whose names are on the work."

---

## Hard launch blockers — need owner / family input

These can't be unblocked by code. They need a decision from Nirmal, Chitrita, or the Caldera owner.

### Odissi Sydney

- **Domain cutover.** `odissisydney.com` cuts over only after Nirmal and Chitrita see the live preview end-to-end and approve. Until then, the new site lives at https://odissi-sydney.vercel.app. **DNS access is no longer blocked** — Weebly's DNS panel can edit the A/CNAME records that route the domain (even though register.com is the underlying registrar). Runbook: see `## Domain cutover runbook` below.
- **~~Confirm contact email(s).~~** Done. Family confirmed `odcsydney@yahoo.com.au`; Basin form delivers there directly.
- **Photography rights / hotlinked images.** Four homepage images currently `src` from `https://www.odissisydney.com/uploads/...` (Weebly's CDN under the domain). The moment DNS cuts to Vercel, those URLs 404. Hard prerequisite for cutover. Path: (a) get rights confirmation from Rudolf Rindler for ongoing reuse, then (b) download the originals to `apps/odissi-sydney/public/images/` and update the `src` paths in `src/app/page.tsx`. Until both are done, **do not cut DNS**.
- **ALEG bank details.** BSB / account number are deliberately *not* rendered on the `/charity` page. Donate flow currently routes to the contact form. Before publishing bank details, confirm with Nirmal and Chitrita that they want them on the public page (vs. handled per-enquiry).
- **Gamilaroi Aboriginal Elder & Mentor — naming.** The existing site lists this partner role anonymously. The rebuild does the same. Confirm whether the family wants this person publicly named.
- **Photography rights.** `next/image` currently serves the four images directly from the existing `odissisydney.com` Weebly URLs. Once the domain cuts over, these URLs will break. We need either: (a) the original files (Rudolf Rindler is credited — confirm his licence covers reuse); or (b) commissioned new shoots; or (c) a transition plan.
- **Full NIDA / Gavin Robins testimonial.** The existing site truncates the quote. Before the testimonials surface ships in full, get the complete quote.
- **Class details.** Existing site doesn't list days, times, or pricing. Decide whether the rebuild surfaces those, or stays with "by enquiry."

### Caldera

- **Domain.** No production domain yet. Suggestions earlier: `caldera.fm`, `wearecaldera.com`, `psydney.au`. Owner's call. Until then, OG/canonical URLs reference `localhost:3001` via `NEXT_PUBLIC_SITE_URL` fallback.
- **Contact channels.** The site mentions "promoter contact" and "join the list" but the actual email addresses aren't rendered. The Sanity `siteSettings` schema has `promoterEmail` and `pressEmail` fields ready — fill them in once decided.
- **First rights-cleared track.** No native audio plays today. The `demoTracks` are deliberately external-only placeholders (SoundCloud / Spotify links, no `playbackUrl`). For the player to actually unlock and play, we need at least one track with: written rights from the artist, hosted MP3/AAC URL on R2 (or similar), and `rightsCleared: true` in Sanity. The `track` schema has a `rightsNotes` field to record where the permission came from.
- **Initial event.** The Events section currently shows a "TBA" placeholder card. As soon as the first night is locked, populate it via Sanity (or hardcode it in `page.tsx` as an interim, replace with Sanity later).
- **Ticketing partner.** Eventbrite / Humanitix / Resident Advisor / direct? Affects the per-event-page CTA shape and which fields the `event` schema needs to surface.
- **Community channel.** Discord / mailing list / both? Affects the Community section CTAs.

### Both apps

- **Sanity project + dataset.** `SANITY_PROJECT_ID` and `SANITY_DATASET` are blank in both `.env.example` files. Create the Sanity projects (free tier is fine), set the IDs locally + on Vercel, and the studios + queries come alive.
- **Vercel projects.** Two projects, one per app, both pointing at this repo. Set Root Directory per project (`apps/odissi-sydney`, `apps/caldera`). Install Command: `bun install --frozen-lockfile`. Build Command: `cd ../.. && bun run turbo build --filter=<project-name>`. See root `README.md` § "Deploy model".
- **Vercel Analytics enable.** Cookieless. No Google / Meta / Hotjar — both audiences value dignity.

---

## Domain cutover runbook

Procedure for flipping `odissisydney.com` from the old Weebly site to the new Vercel build. Don't start until **all** the prerequisites are green. The cutover itself is reversible (DNS rollback works), but the prerequisites are not.

### Prerequisites — do these before touching DNS

1. **Family approval to publish.** Nirmal and Chitrita have reviewed https://odissi-sydney.vercel.app end-to-end and signed off.
2. **Photography rights resolved.** See `Hard launch blockers → Photography rights` above. The four `https://www.odissisydney.com/uploads/...` image URLs in `apps/odissi-sydney/src/app/page.tsx` (lines 21/27/33/39 as of 2026-05-12) will 404 the instant DNS flips. Either (a) download originals to `apps/odissi-sydney/public/images/` and update the src paths, or (b) have a replacement source ready to swap in same-day.
3. **Final smoke test on `.vercel.app` URL.** Form submission, all sections load, no console errors, mobile and desktop. The .vercel.app and odissisydney.com behave identically once cut over — last chance to catch issues without users seeing them.
4. **Family knows the timing.** DNS propagation can be 5 minutes or 6 hours. Email forwarding (`contact@odissisydney.com` → `odcsydney@yahoo.com.au`) is on Google Workspace MX records — unaffected by the cutover — so they'll still receive normal emails throughout.

### Cutover steps

**Step 1 — add the domain in Vercel** (no traffic impact yet)

1. Vercel dashboard → `odissi-sydney` project → **Settings** → **Domains** → **Add**.
2. Enter `odissisydney.com`. Vercel registers it as a domain on the project but DNS still points to Weebly so nothing changes for visitors yet.
3. Vercel shows the DNS records needed:
   - For root (`odissisydney.com`): **A record** to `76.76.21.21` (Vercel's anycast).
   - Vercel may alternatively recommend an `ALIAS` / `ANAME` if the DNS provider supports it. Weebly probably doesn't — stick with the A record.
4. Add `www.odissisydney.com` similarly. Vercel will show a **CNAME** target like `cname.vercel-dns.com`.
5. Both domains will show "Invalid Configuration" — that's expected until DNS flips.

**Step 2 — change DNS in Weebly's panel**

Records currently on the domain (snapshot 2026-05-12):

| Type    | Host                   | Points to                                         | Action            |
|---------|------------------------|---------------------------------------------------|-------------------|
| A       | `@`                    | `199.34.228.159` (Weebly)                         | **CHANGE** → `76.76.21.21` |
| A       | `www`                  | `199.34.228.159` (Weebly)                         | **CHANGE** → `76.76.21.21` |
| A       | `*` (wildcard)         | `199.34.228.159` (Weebly)                         | **DELETE** — see note below |
| CNAME   | `7wdwa6lz3l2u`         | `gv-cjzk2hzhztwofh.dv.googlehosted.com`           | Keep — Google Workspace domain verification |
| HTTP302 | `mail`                 | `http://mail.google.com/a/odissisydney.com`       | Keep — webmail redirect for `mail.odissisydney.com` |
| MX (10) | `@`                    | `aspmx.l.google.com`                              | Keep — primary inbound mail |
| MX (20) | `@`                    | `alt1.aspmx.l.google.com`, `alt2.aspmx.l.google.com` | Keep |
| MX (30) | `@`                    | `aspmx{2,3,4,5}.googlemail.com`                   | Keep — fallback inbound |
| MX (10) | `resend`               | `feedback-smtp.ap-northeast-1.amazonses.com`      | Dormant. Safe to delete (we're not using Resend). Leaving it does no harm either. |

**Why delete the wildcard A `*` instead of changing it?** Today the wildcard catches every unspecified subdomain (`anything.odissisydney.com`) and routes to Weebly. After cutover, you don't want random subdomains silently serving the new site either — that's how confusing URLs get indexed by Google. Cleaner to just delete the wildcard so unknown subdomains 404 normally. If you ever need a wildcard later (e.g. preview deploys on `pr-*.odissisydney.com`), add it back consciously.

**Don't touch nameservers.** Leave them at `dns1.register.com` / `dns2.register.com` — those are register.com's DNS servers acting as the authoritative source. Weebly's panel pushes changes to them behind the scenes.

**Step 3 — wait and verify**

1. DNS propagation usually 5 min – 1 hour, occasionally longer. Check via `Resolve-DnsName odissisydney.com -Server 8.8.8.8` — when it returns `76.76.21.21`, the flip has taken.
2. Vercel auto-issues an SSL certificate via Let's Encrypt within minutes of DNS validating.
3. Visit `https://odissisydney.com` and `https://www.odissisydney.com`. Both should serve the new site with a green padlock.
4. Visit `https://odissi-sydney.vercel.app` — should still work; Vercel keeps the .vercel.app URL alive permanently as a backup share link.
5. Send a test email to `contact@odissisydney.com` from any external address — should land in `odcsydney@yahoo.com.au` (forwarding via Google Workspace MX, untouched by the cutover).
6. Submit the contact form on the new live site — should land in `odcsydney@yahoo.com.au` via Basin (untouched by the cutover).

### Rollback

If anything goes wrong:

1. In Weebly's DNS panel, change the A record for `@` back to `199.34.228.159` and the `www` CNAME back to whatever its original Weebly value was (write it down before changing it in step 2).
2. Save. Within propagation time, the old site is back.
3. The new build stays at `https://odissi-sydney.vercel.app` regardless — Vercel doesn't delete the .vercel.app URL on a domain detach.

### Post-cutover

- Remove the four hotlinked image URLs from `page.tsx` (already done in prerequisites) and from any caches — `next build` already inlines them.
- Confirm Google Search Console / Bing Webmaster pick up the new content (submit the sitemap at `https://odissisydney.com/sitemap.xml`).
- The old Weebly *editor* still exists for the family — they can choose to either delete the Weebly site, or keep it as a backup that isn't reachable via the domain. Either is fine; the domain isn't pointing at it anymore.

---

## Engineering follow-ups — we can resolve these

### Caldera

- **R3F v8 + React 19 incompatibility.** The WebGL mandala is parked behind a fallback because R3F v8 reads React internals that don't exist in React 19. The SVG fallback in `MandalaFallback.tsx` is intentionally rich (5 counter-rotating layers, breathing core, flowing dashes) so the parking isn't visible to users. Once **R3F v9 + drei v10** are stable on React 19, flip `apps/caldera/src/three/MandalaClient.tsx` back to dynamic-import the canvas; SVG stays as the universal fallback for reduced-motion / no-WebGL2 / SSR. Track upstream: r3f v9 alpha was published mid-2025; check release-notes for stability.
- **Spotify embed rendering in `PlayerBar`.** `source-resolution.ts` correctly returns `{ kind: 'spotify', embedUrl }` for Spotify-only tracks, but `PlayerBar` doesn't yet render the Spotify iframe in place of the scrubber. Implementation: when `currentTrack.sourceKind === 'spotify'`, swap the play/scrubber UI for an iframe + "Listen on Spotify" CTA.
- **Web Audio AnalyserNode → mandala intensity.** The mandala currently uses time-based sine-wave breathing as a proxy for amplitude reactivity. Real amplitude reactivity requires accessing Howler's audio element via `howl._sounds[0]?._node` and connecting through `AudioContext.createMediaElementSource()` → `AnalyserNode`. Cross-origin audio can block this; gate it on the `self-hosted` source kind only.
- **`ScrollSoundConductor`** (file exists, behaviour not wired into `page.tsx`). It's an `IntersectionObserver` per-track-section helper. Wire it into the events / tracks listings once Sanity returns real tracks tied to event sections.
- **Mandala WebGL fallback colour drift.** When R3F is re-enabled, the shader currently reads CSS custom properties via `getComputedStyle` and `THREE.Color.set()` doesn't natively parse `oklch()`. Falls back to hardcoded hex. Fix: render a hidden DOM element with `background-color: var(--color-neon-purple)`, read the resolved RGB via `getComputedStyle`, pass that.

### Odissi Sydney

- **`/classes`, `/guru`, `/testimonials` routes.** Currently each is a section on the homepage. As Sanity content fills out, give each its own route with deeper structure. The schemas already support it (`class.slug`, etc.). The homepage sections become summaries that link out.
- **Gallery.** Four images on the homepage in a translate-y-staggered grid. A dedicated `/gallery` page showing the full body of work (with photographer credit per image) when more imagery is approved.
- **~~Contact form delivery.~~** Done. Submissions go via Basin (`usebasin.com/f/85cb66252bf5`) → `odcsydney@yahoo.com.au`. Verified end-to-end 2026-05-12. Basin is the permanent choice (family is happy with it).
- **Structured data verification.** The `/charity` page emits `EducationalOrganization` JSON-LD with the ABN as `identifier`. Verify against Google Rich Results Test once the production URL is set.

### Both

- **Sanity webhook revalidation.** Once Sanity is live, configure a webhook → Next 16 `revalidateTag` so editor changes appear without redeploys. Pattern: each query attaches a `tag`, the webhook fires a Server Action that calls `revalidateTag('events')` etc.
- **Lighthouse CI budgets.** Caldera's perf budget (LCP < 2.5s, CLS < 0.05, total JS < 200KB gz) is documented in `apps/caldera/ARCHITECTURE.md` but not enforced. Add `lighthouse-ci.config.js` per app and run on PR previews.
- **Bundle analysis.** `next build --turbopack` already shows route sizes. Add `@next/bundle-analyzer` if any route surprises us once Sanity content is real.
- **GitHub Actions CI.** Two parallel jobs per push: lint+typecheck, build. Vercel handles deploys. Keep CI as a fast-fail gate, not the deploy mechanism.
- **Pre-commit hook.** Run Biome on staged files via `lefthook` (lighter than husky) — don't ship lint regressions.
- **Tests.** Currently zero. Bun's native test runner is available. Worth: a Server Action contact-form test (invokes `contactAction` with valid + invalid FormData), a Zustand store test for the player, an SVG snapshot test for the mandala. Skip e2e until there's something fragile to protect.

---

## Polish opportunities — good when there's time

### Caldera

- **Real RSVP form.** Currently the Community section says "join the list" but has no form. Add a Resend audiences integration with a Server Action.
- **`/events/[slug]` route.** Per-event detail page once `event` documents exist in Sanity. Schema is ready.
- **Audio source attribution surface.** When playing a SoundCloud or Spotify track, show the artist's external link prominently inside `PlayerBar`. Currently shown as small mono text in the desktop sidebar — make it more legible on mobile.
- **Empty-state copy on `/events`.** "Past events archive here" reads fine, but once one event has been held, the empty-past becomes wrong. Wire to a Sanity query so the empty-state hides automatically.
- **Sensory-light affordance discoverability.** Currently a small button in the header. First-time visitors may not notice it. Consider a one-time inline pill in the hero ("Sensory-light mode available — flip to calm") with dismissible state in localStorage.

### Odissi Sydney

- **Open Graph imagery.** `opengraph-image.tsx` exists (GPT-shipped). Verify the rendered output at `/opengraph-image` is dignified — hero typography, no AI-generated dance imagery, ideally a Konark panel or B&W Nirmal portrait. Iterate.
- **Print stylesheet.** Older audience may print class info or charity details. A minimal `@media print` block in `globals.css` with sensible margins, removed orbs, full-width content.
- **Australian formality of dates.** Once dates appear (class schedules, event dates), use DD/MM/YYYY format, never US-style.

---

## Decisions made — documented so future agents don't re-litigate

- **No npm / pnpm / yarn.** Bun only. `bun.lock` is committed.
- **No Pages Router.** App Router only.
- **No `tailwind.config.js`.** Tailwind v4 CSS-first config in `globals.css` `@theme`.
- **No manual memoization.** React Compiler is on; profiling is the only justification for a manual `useMemo`.
- **No tracking pixels.** Vercel Analytics only on both sites. Both audiences value dignity.
- **No bank details published on Odissi `/charity`** until family confirms.
- **No Bollywood-mimic fonts, no generic mandala backgrounds, no Om / paisley / Holi colours as decoration on Odissi.** Cultural respect is a hard rule, not a preference.
- **No autoplay-with-sound on Caldera.** Browser policies + audience composition (neurodivergent-aware) make this non-negotiable.
- **No invented brand content.** Odissi: no biographical claims about Nirmal beyond what's in `CONTENT.md`. Caldera: no fabricated artist names, event titles, or venues.
- **No meta-copy on user-facing pages** (lines that talk *about* the site to the team — "must," "in service of," "belongs near"). Architecture-doc voice belongs in architecture docs.

---

## What I'd ask Nirmal & Chitrita next (Odissi)

In this order:

1. Their reaction to the live preview at https://odissi-sydney.vercel.app — anything that reads wrong, anything missing.
2. Photography permissions: are the existing site's images cleared for ongoing reuse, do we need new shoots?
3. ALEG donations: should bank details be on `/charity` publicly, or kept per-enquiry?
4. Gamilaroi Elder: name publicly, or keep as the role-only attribution?
5. Full NIDA / Gavin Robins testimonial quote.
6. Class schedule: published, or "by enquiry" (we currently show "by enquiry" implicitly)?
7. Anything that's changed since the existing site was written that should be updated.

(Contact email is sorted — Basin → `odcsydney@yahoo.com.au`. Domain ownership is also sorted — registrant is Chitrita Mukerjee with `odcsydney@yahoo.com.au` as contact; renewal notices in mid-June 2026 will go straight to that inbox.)

## What I'd ask the Caldera owner next

In this order:

1. Domain.
2. The first event — when, where, lineup, accessibility notes. Even if internal-only, the page can show "first event coming soon" with a real date once committed.
3. The first track Caldera has rights to host. One is enough to unlock the audio engine.
4. Discord / mailing list / both?
5. Promoter + press email addresses.
6. Mandala signature shape — the SVG mandala is currently the universal fallback. Once the WebGL path can re-engage (R3F v9), the geometry can be art-directed more specifically. Reference imagery would help.

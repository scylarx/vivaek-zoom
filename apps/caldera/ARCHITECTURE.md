# Caldera — Architecture

> *Caldera is where music and community collide.* Welcome to Psydney.
>
> **Read before touching this app.** The bar is not "nice events website." The bar is *the page itself feels like the room*: warm strangers, low-light geometry, music that doesn't ask permission to be felt. This site is for the good people. Build it like one of them is going to find it at 2am and decide they belong.

---

## Agent briefing — what Caldera is

**Caldera** is a Sydney underground / psytrance-adjacent music events brand. The audience is community-first: promoters, artists, regular attendees, newcomers, and explicitly **neurodivergent humans who want a safe base to connect at**. The aesthetic is psychedelic but contained — *subtle crypto-degenerate*, neon-as-outline, dark-base with deliberate light-mode counterpart, geometric over figurative.

**Tone:** warm, internal, in-the-know without being cliquey. We use the word "we" a lot. Plain English. No marketing voice. No exclamation marks. Definitely no "Book your tickets now!" energy.

**Voice anchors (use these as North Stars):**
- "Welcome to Psydney."
- "Music and community collide."
- "Built for the good people."
- "A safe base to connect at." *(do not paraphrase this — it's from the brief)*

**Audience behaviour:**
- Most users land on **mobile**, often late, often after seeing an Instagram post that hooked them on a track.
- Desktop visitors are fewer but more deliberate — promoters, press, return community, people RSVPing for an event.
- Both modes need to feel like the same room. Don't ship a "good mobile, fine desktop" — ship two great experiences.

---

## Hard rules

- **No autoplay with sound.** Audio is muted on load. A persistent "Tap for sound" affordance unlocks playback on first user gesture. State persists for the session.
- **Respect `prefers-reduced-motion`.** The mandala stops rotating, neon pulses freeze, scroll-linked transitions become instant. This is non-negotiable — neurodivergent users are explicitly part of the audience.
- **One-pager.** Anchor-linked sections with scroll-spy. Routes only for `/events/[slug]` (per-event detail) and `/legal` (basic privacy / contact). No multi-page navigation chrome.
- **Light + dark mode.** Both are designed, not afterthoughts. Default = system preference, manual toggle persisted to `localStorage`.
- **Mobile-first.** Desktop is an enrichment of the mobile layout, not a separate design.
- **The mandala is geometric, not religious.** No appropriative iconography. Sacred geometry / psy-visual tradition (think Alex Grey lattice work, but restrained) — *not* a Tibetan thangka pastiche.
- **Performance budget is enforced.** 3D + audio is bandwidth-heavy. Lazy-load aggressively, code-split the WebGL canvas and audio engine, defer until after first paint.

---

## Information architecture (the one-pager)

```
/  (home — the whole site)
  ├── §hero          Mandala. Tagline. Single CTA: "What's on" → §events.
  ├── §manifesto     Two paragraphs. Who we are. Who this is for. Quiet, direct.
  ├── §sound         Track sections (each tied to an event/artist). Scroll-link → player.
  ├── §events        Upcoming events (cards). Past events (compact list, expandable).
  ├── §community     RSVP / mailing list / Discord / Instagram. "Get on the list" energy, not "subscribe!" energy.
  └── §promoters     For artists/promoters reaching out. Single email link + short pitch.

/events/[slug]       Per-event detail page (location, lineup, tickets, accessibility info)
/legal               Privacy, contact, who runs this
```

Persistent UI:
- **Player bar** — sticky bottom on `<md`, fixed sidebar on `>=lg`. Always present once a track is loaded.
- **Scroll-spy nav** — top-fixed, minimal (six dots / six labels). Hidden until first scroll on mobile to preserve the hero impact.
- **Theme toggle** — top-right icon, persisted.

---

## Visual identity

### Color tokens (OKLCH, defined in `@theme`)

```css
@theme {
  /* DARK (default) */
  --color-void:           oklch(8% 0.025 290);    /* #0A0612 — page bg */
  --color-panel:          oklch(11% 0.04 290);    /* #0F0820 — section bg */
  --color-panel-elevated: oklch(14% 0.045 290);   /* card bg, modals */
  --color-ink:            oklch(92% 0.005 280);   /* #E4E4E7 — primary text */
  --color-ink-muted:      oklch(70% 0.01 280);    /* #A1A1AA */
  --color-rule:           oklch(20% 0.025 285);   /* hairlines, borders */

  /* NEON ACCENTS — used as outlines + glows, NOT solid fills */
  --color-neon-purple:    oklch(67% 0.27 305);    /* #A855F7 — primary accent */
  --color-neon-blue:      oklch(63% 0.22 257);    /* #3B82F6 — secondary */
  --color-neon-green:     oklch(72% 0.18 162);    /* #10B981 — tertiary */
  --color-neon-soft:      color-mix(in oklch, var(--color-neon-purple) 60%, transparent);

  /* Functional */
  --color-bg:             var(--color-void);
  --color-bg-elevated:    var(--color-panel);
  --color-fg:             var(--color-ink);
  --color-fg-muted:       var(--color-ink-muted);
  --color-accent:         var(--color-neon-purple);
}

/* LIGHT mode — same palette, inverted base, neons desaturated */
[data-theme="light"] {
  --color-void:           oklch(98% 0.005 80);    /* #FAFAF7 — cream, NOT pure white */
  --color-panel:          oklch(95% 0.008 80);    /* #F4F4F1 */
  --color-panel-elevated: oklch(92% 0.01 80);
  --color-ink:            oklch(15% 0.01 280);
  --color-ink-muted:      oklch(40% 0.012 280);
  --color-rule:           oklch(85% 0.012 80);

  --color-neon-purple:    oklch(50% 0.22 305);    /* darker, less glow */
  --color-neon-blue:      oklch(48% 0.18 257);
  --color-neon-green:     oklch(50% 0.16 162);
}
```

**Usage rules:**
- Neons appear as **borders, glows, hairlines, single-letter glyphs, focus rings, scrubber fills, and the mandala shader's primary stops.** They almost never appear as solid backgrounds.
- The crypto-degenerate vibe comes from: monospace numerics in track titles + timecodes, hairline neon borders on cards, a CRT-scanline texture at ~2% opacity over the page (toggleable via the sensory-light mode), and small UI affordances like blinking-cursor-style separators.
- One CTA per section uses the neon at full saturation. Everything else uses the soft mix.

### Typography

```
Display (headings, hero, section titles): Bricolage Grotesque (variable, free)
Body (paragraphs, UI):                    Inter (variable, free)
Mono (timecodes, track titles, numerics): Geist Mono (variable, free)
```

Why these three:
- **Bricolage Grotesque** has personality (the rotational variants give the headings a hand-drawn warmth) without falling into "generic tech-startup grotesque." It carries the warmth the brand needs.
- **Inter** is the safe, readable choice for body. It pairs with everything.
- **Geist Mono** for numbers, track titles, and any "this is data" surfaces — leans into the crypto-degenerate cue without being a meme.

Self-hosted via `next/font/google`. No FOUT. No Google CDN tracking.

### Motion

Three layers:

1. **Ambient** — the mandala is always (slowly) moving when motion is allowed. A canvas-rendered low-amplitude noise drives slight color drift in the neon hairlines. ~60s rotation period. Respects `prefers-reduced-motion`.
2. **Reactive** — hover states, button presses, theme transitions. Motion (formerly Framer Motion) for these. 150-300ms easings.
3. **Scroll-linked** — track section transitions, parallax on the mandala, header collapse. GSAP 3 + ScrollTrigger via `@gsap/react`. Locked to scroll position, not time-based.

`prefers-reduced-motion: reduce` collapses all three to instant transitions. The mandala freezes in a canonical static composition.

---

## Audio system (the heart of the brand)

This is the technical centrepiece. Read carefully.

### Track source pipeline

There is no clean way to extract licensed audio from Instagram Reels via API. Don't try. The owner maintains a curated **Sanity collection** that mirrors what he's posting on IG:

```ts
track {
  title (string, required)
  artist (string, required)
  artistUrl (url, optional)              // Bandcamp / Soundcloud / artist site

  // Source — at least one must be set; resolution order is self-hosted > soundcloud > spotifyEmbed
  selfHostedAudio (file, optional)        // 128k AAC (.m4a) on Sanity → R2-mirrored
  soundcloudUrl (url, optional)
  spotifyTrackId (string, optional)       // for embed fallback only

  // Linkage
  instagramPostUrl (url, optional)        // the Reel/post this track was used in
  associatedEvent (reference, optional)   // ties the track to an event for scroll-link
  artwork (image, optional)               // falls back to event artwork or generated placeholder

  // Metadata
  durationMs (number, auto-extracted)
  rightsCleared (boolean)                 // editor must check this before track goes live
  rightsNotes (text, optional)            // who gave permission, when, terms
  addedAt (datetime, auto)
  orderRank (number)                      // editor-controlled sort
}
```

**Rights gate:** the `rightsCleared` boolean is enforced at runtime — tracks without it are not served to the client. The Sanity Studio surfaces a clear "this track will not play until rights are confirmed" warning. Self-hosting requires written permission; safer fallback path is SoundCloud widget (which streams from the artist's own SC account, so rights are with the platform) or Spotify embed (linked to the artist's own release).

### Playback engine

- **Howler.js** as the audio runtime. HTML5 Audio with Web Audio fallback. Sprite support, crossfading, robust seek.
- **Zustand** for the player store. Single source of truth for `currentTrack`, `queue`, `isPlaying`, `position`, `volume`, `unlocked`, `theme`.
- **`<PlayerProvider>`** is a thin Client Component mounted at the root layout. It holds the Howler instance, subscribes to the store, and handles preload of the next track when the current passes the 50% mark.
- **`<PlayerBar>`** is the visible UI. Sticky bottom on mobile, fixed sidebar on desktop. Same React component, Tailwind responsive variants. Custom scrubber bound to `howl.seek()` with `requestAnimationFrame` updates (no setInterval).

### Source resolution (per track, server-rendered)

```
selfHostedAudio (R2-mirrored)
  ↳ if absent: soundcloudUrl → SoundCloud Widget API (rendered in player bar)
    ↳ if absent: spotifyTrackId → Spotify embed iframe (player bar transforms into a "Listen on Spotify" affordance)
```

The first two run through the same Howler-backed UI. The third swaps the bar's scrubber for a Spotify iframe with a CTA — visually distinct so users know they're hopping out.

### Autoplay-on-scroll

Browser policy: **muted autoplay works; audible autoplay requires user gesture.** No way around that in 2026.

Pattern:
1. Page loads silent. The `<PlayerBar>` shows the track currently in view but is **muted** with a prominent "🔊 Tap for sound" pill.
2. First user tap anywhere in the player bar (or on the pill) unlocks audio. State written to `sessionStorage`.
3. From that point, scroll-linked track changes play seamlessly with sound. No further prompts.
4. Within-session navigation reads the unlock from `sessionStorage` so the affordance doesn't re-appear.

### Scroll-linking

Each `<TrackSection>` (a section block tied to a track in the CMS) uses `IntersectionObserver` with `threshold: 0.6`. On intersect, it dispatches `setTrack(id)` to the Zustand store. Debounced 400ms so fast scrolling doesn't thrash through tracks.

The current track also drives the mandala's primary color stop — when the track changes, the mandala shader interpolates its purple/blue/green weighting toward a per-track value (defined in CMS or auto-derived from artwork). This is the "the room reacts to the music" moment.

### Mobile data & performance

- 128 kbps AAC (`.m4a`) — ~2.5 MB per 3-min track, indistinguishable from MP3 320 on phone speakers.
- Cloudflare R2 + Cloudflare CDN. Free egress, ~$0.015/GB stored.
- `preload="none"` by default. Predictive preload of the *next* track only after the current passes 50% playback.
- HTTP range requests on by default → scrubbing works without downloading the full file.
- Howler JS itself is dynamically imported (`next/dynamic` with `ssr: false`) — the page is interactive before it hydrates.

### Licensing (do not skip this)

Self-hosting requires either:
1. The owner produced/owns the master, OR
2. Written permission from the rights holder for streaming on the Caldera domain, OR
3. A sync/master licence.

Streaming services (Spotify/Apple) **do not** grant redistribution rights — embedding their player is fine, downloading and re-serving is not. The CMS `rightsCleared` flag exists to prevent accidental publication. The owner's relationships with Sydney underground artists are the asset here — most will say yes to "can I host a 90-second clip on the Caldera site, full version links to your Bandcamp" via a friendly DM.

---

## The 3D mandala

The hero element. Literal interpretation: **caldera = volcanic crater viewed from above.** The mandala is concentric, rotational, and feels both like sacred geometry and a topographic ring system.

### Tech

- **react-three-fiber** + **@react-three/drei** + **leva** (for tuning, dev-only — strip in production).
- Custom GLSL fragment shader on a layered ring system. Three to five concentric ring meshes, each with a slightly different rotation speed (0.05 - 0.2 rad/s).
- The shader composites the three neon stops (purple/blue/green) with a noise-driven UV warp for organic motion. Stops shift weighting based on the active track (driven by Zustand → R3F via a uniform).
- A subtle 2D noise texture provides scanline / grain.

### Behaviour

- Idle (no audio yet): slow, regular rotation. Hypnotic, not aggressive.
- Track playing: subtle pulse on each beat. **Beat detection is optional and capped at low-amplitude** (we are not building Winamp visualisations — restraint). If implemented, use Web Audio's `AnalyserNode` on the player's output node, throttled to ~10Hz updates.
- Mouse parallax (desktop only): the mandala tilts ≤5° following the cursor. Capped, eased.
- Scroll: as the user scrolls past the hero, the mandala scales down and parks in the bottom-right of the viewport (or the sidebar on desktop) at 30% size, persisting through the rest of the page.

### Performance & fallback

- Target **60fps on a 2023 mid-range Android**. Drop ring count and disable noise warp adaptively if the rolling average drops below 50fps (measured via `performance.now()`).
- Mobile pixel ratio capped at 2 (not 3 — the visual difference is negligible; the cost is huge).
- **Fallback:** if `WebGL2RenderingContext` is unavailable, or the browser flags reduced-motion + reduced-data, render a static SVG mandala (same geometry, no shader). Same compositional silhouette.
- The R3F canvas is dynamically imported with `next/dynamic` and a Suspense boundary — first paint shows a CSS-rendered placeholder (a faint concentric SVG ring). The full canvas hydrates after.

### Reduced motion

`prefers-reduced-motion: reduce`:
- Rotation speed = 0.
- Beat-pulse disabled.
- Mouse parallax disabled.
- Composition holds at a canonical static frame, fully visible.

The mandala never disappears — it's the brand. It just stops moving.

---

## Content model (Sanity v3)

```
event
  ├── name (string)
  ├── slug (slug)
  ├── date (datetime)
  ├── doorTime (datetime)
  ├── venue (object): name, address, city, googleMapsUrl, accessibilityNotes
  ├── lineup (reference[] -> artist)
  ├── ticketUrl (url, optional)         // ticketing is external — we don't build a ticketing flow
  ├── description (portableText)
  ├── poster (image)
  ├── associatedTracks (reference[] -> track)
  ├── status: announced | onsale | soldout | past

artist
  ├── name
  ├── soundcloudUrl
  ├── spotifyUrl
  ├── instagramHandle
  ├── shortBio
  ├── portrait

track       // see Audio system above

manifesto (singleton)
  ├── tagline             // "Welcome to Psydney"
  ├── secondaryLine       // "Music and community collide"
  ├── body (portableText) // the manifesto text — short, no marketing voice
  ├── communityCallout    // RSVP / mailing-list copy

siteSettings (singleton)
  ├── socialLinks         // IG, Discord, mailing list signup
  ├── promoterEmail
  ├── pressEmail
  ├── footerCopy
```

---

## Accessibility (sensory-aware)

Designed for an audience that includes neurodivergent humans. Beyond WCAG AA (which is the floor):

- **Reduced-motion respected everywhere.** Mandala freezes, scroll animations become instant.
- **No surprise audio.** Mute-by-default + clear unlock is the default flow. Once unlocked, scroll-driven track changes still announce via a visible track pill before audio engages.
- **Sensory-light mode** — a toggle (next to the theme switch) that:
  - Stops mandala motion regardless of reduced-motion setting.
  - Disables CRT scanline overlay.
  - Drops neon glow filters to flat color.
  - Reduces audio default volume to 50%.
- **Predictable structure.** One-page anchor navigation. The user is never surprised by where they end up.
- **Plain language.** The manifesto and event copy uses short sentences and concrete words. No "vibes-only" copy that excludes people who haven't been before.
- **Captions** on any video (event recap clips). Audio descriptions where relevant.
- **Focus states** are highly visible — the neon palette is built to pull double duty as focus rings.
- **Touch targets** ≥ 44×44px on mobile.
- **Color contrast** — both modes pass AA on body and large text. Validated in CI via `pa11y` on the deployed preview.

---

## Performance budget

| Metric | Target | Notes |
|---|---|---|
| LCP | < 2.5s on 4G mobile | Looser than Odissi due to canvas. Hero text renders before mandala. |
| CLS | < 0.05 | Player bar reserves layout space from first paint. |
| INP | < 200ms | All scroll handlers debounced, mandala on rAF only. |
| First-paint JS | < 50KB gz | Mandala + audio engine deferred. |
| Total JS (idle) | < 200KB gz | Including R3F + Howler + Motion + GSAP. |
| Audio bandwidth | 128 kbps AAC | One track = ~2.5MB. Preload only the *next*, never the full queue. |

CI runs Lighthouse on Vercel preview deploys. Budgets enforced via `lighthouse-ci` config. Build fails if budgets regress.

---

## Email & forms

- RSVP / mailing list: collect via Resend audiences, server-rendered React Email confirmations. No re-marketing — the list is for event announcements only.
- Promoter contact: simple form → Resend → owner inbox. Honeypot, no Captcha.
- Privacy posture: minimal data collection (email + optional name). Stored in Resend, not in our DB. Documented on `/legal`.

---

## Tracking

Vercel Analytics only. Cookieless. Page-view + Web Vitals. **No** Meta Pixel, **no** Google Analytics, **no** Hotjar — the audience would clock these and bounce. If we ever need event-level attribution, do it server-side via first-party endpoints, not third-party scripts.

---

## Deploy

- Vercel project: `caldera`. Root Directory: `apps/caldera`.
- Environment: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `RESEND_API_KEY`, `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_PUBLIC_URL`, optional `SPOTIFY_CLIENT_ID` (for oEmbed metadata only).
- Cloudflare R2 bucket configured with Cloudflare CDN in front, public-read on the audio prefix only.
- Domain: TBC. Caldera owner to confirm.

---

## Out of scope for v1

- In-app ticketing (we link out to external — Eventbrite / Humanitix / direct).
- User accounts, profiles, comments, forums (the community lives on Discord; we link to it).
- Streaming a live event from the site (huge complexity; not asked for).
- Per-user "for you" track recommendations (this is a curated brand site, not Spotify).
- Multi-language support (single-language, English, with the implicit assumption of Sydney-AU context).

---

## Open questions to resolve before wave 3

1. **Domain** — what's the domain? `caldera.fm`? `wearecaldera.com`? `psydney.au`? Owner's call.
2. **Ticketing partner** — Eventbrite / Humanitix / Resident Advisor? Affects the per-event page CTA shape.
3. **Initial track catalogue** — 6-8 tracks the owner has rights to host directly is enough for launch. Identify them.
4. **Mandala signature shape** — geometric draft. We need 1-2 design references from the owner before the shader work starts (not "any psy mandala" — *the* Caldera mandala).
5. **Discord vs other community channel** — confirm where "the community" actually lives.
6. **Light mode adoption** — is the owner committed to maintaining it, or is dark-mode-only acceptable for v1? Affects scope.

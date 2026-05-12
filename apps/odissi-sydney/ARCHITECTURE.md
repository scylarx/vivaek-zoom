# Odissi Sydney — Architecture

> **Read before touching this app.** This site represents two living teachers and a registered Australian charity. Visual missteps don't read as cute mistakes; they read as not-knowing. The bar is *would Nirmal Jena's serious students recognise this as a respectful presentation of the Jena style of Odissi?*

---

## Agent briefing — what this site is

**Subject:** Nirmal Jena, master teacher of Odissi (Indian classical dance) and Indian classical vocal/instrumental music. Based in Sydney (Chifley) and the Blue Mountains (Hazelbrook). Teaches actors at the National Institute of Dramatic Art (NIDA). Co-runs an Australian DGR-status charity (Arts & Life Education Gurukul Ltd, "ALEG") with his partner Chitrita Mukerjee, providing free training to young people in financial hardship.

**Critical lineage detail.** Nirmal teaches the **Jena style of Odissi** — his father Guru Surendra Nath Jena's distinct family lineage. This is *not* the mainstream Kelucharan Mohapatra tradition that dominates Odissi outside India. The Jena style is characterised by deeper bends in basic positions, undulating body movement through continuous level changes, solo-performance focus over dance-dramas, and the exploration of *raudra* (anger) and *bibatsa* (disgust) as expressive sentiments. **Do not flatten the lineage.** Where the existing site says "Jena style" or names Surendra Nath Jena, that distinction stays.

**Audience (in priority order):**
1. Existing students (need class info, schedule, contact — practical).
2. Prospective serious students (need to feel the rigor, see Nirmal's lineage, understand what they're committing to).
3. Newcomers (need a warm, accessible entry point — Sydney parents, dancers from other forms, wellness-curious adults).
4. Press / institutions (need press kit material, performance history, contact).
5. Donors to ALEG (need the charity story, the program description, donation mechanism).

**Voice:** warm, scholarly, lineage-aware, non-commercial. Like a university arts program with genuine devotion. Not yoga-studio. Not academic-dry. Not commercial-urgent.

**Existing site:** https://www.odissisydney.com (Weebly). All current copy is captured in `CONTENT.md` as source-of-truth for the rebuild. We're not reinventing the messaging — we're giving it a presentation worthy of the work.

---

## Hard rules

- No generic "Indian-themed" decoration: no random `Om` symbols, no paisley borders, no mehendi flourishes, no Holi-bright color washes, no "Bollywood-mimic" Latin fonts (Samarkan etc.), no Nataraja imagery (that's Bharatanatyam/Tamil — not Odissi).
- No generic mandala backgrounds. Mandalas in this design context read as Tibetan/yoga-studio coding, not Odissi.
- No saffron-white-green color combinations (Indian flag coding — political, not classical).
- Where Sanskrit, Odia, or transliterated terms appear, they are correct, diacriticised (IAST: ā ī ū ṛ ṅ ṭ ḍ ṇ ś ṣ), and glossed at first use.
- Photography is real (Nirmal, Chitrita, students, performances). No stock "Indian dancer" imagery. No AI-generated dance imagery (will almost always render Bharatanatyam-Bollywood hybrids).
- WCAG **AA minimum, AAA on body text** (older audience demographic).
- `prefers-reduced-motion` is honoured everywhere. No tribhangi animations on entry.
- First Nations acknowledgment in the footer is preserved verbatim from the existing site, on every page.

---

## Information architecture

Mirroring the existing site's structure (which already maps cleanly to user intent):

```
/                                   Home — hero, what we do, lineage glimpse, primary CTA to classes
/about                              The school + the people (Nirmal, Chitrita, ALEG context)
/guru                               Guru Nirmal Jena — biography, lineage (incl. Surendra Nath Jena), the Jena style
/classes                            All offerings: Performance, Teacher Training, Daily Practice, Music for Meditation, Dance for Humanity
/classes/[slug]                     Per-class detail (optional; only if pages get heavy enough to warrant)
/gallery                            Performance + teaching photography. Editorial, restrained.
/testimonials                       Press quotes (SMH, NIDA), academic testimonials, student voices
/charity                            Arts & Life Education Gurukul Ltd — the program, who it serves, how to support
/contact                            Form + email + locations + class addresses
/blog                               Optional. Only build if Nirmal/Chitrita want to publish — otherwise omit.
```

The current site's `/learnclasses.html` becomes `/classes`. The current `/our-guru.html` becomes `/guru`. Everything else maps 1:1.

**Navigation:** Home, Classes, Guru, Charity, Gallery, Contact. (Press/Testimonials lives under Guru as a subsection, or is a small footer link. About is rolled into Guru + Charity — it currently overlaps with both.)

---

## Content model (Sanity v3)

Sanity is the CMS so Nirmal and Chitrita can edit class details, add press quotes, swap photos without touching code or talking to a developer. Schemas (TypeScript / `@sanity/types`):

```ts
// /sanity/schemas

class                    // performance training, teacher training, daily practice, music for meditation, dance for humanity
  ├── title (string)
  ├── slug (slug)
  ├── shortDescription (text, ≤180 chars)
  ├── fullDescription (portableText)
  ├── level (string[]): beginner | intermediate | advanced | open
  ├── ageGroups (string[]): children | youth | adults | seniors
  ├── locations (reference[] -> location)
  ├── pricing (text, optional — current site doesn't list prices)
  ├── prerequisites (text, optional)
  ├── heroImage (image with alt + photographer credit)
  ├── orderRank (number — for manual sort)

location
  ├── name (string)             // "Chifley, Sydney East"
  ├── shortName (string)        // "Sydney"
  ├── address (text)            // not necessarily public — visible per-location
  ├── travelNotes (text)        // "30 min from city, 15 min from airport"
  ├── coordinates (geopoint)

person                          // Nirmal, Chitrita, students who consent to bio
  ├── name (string)
  ├── role (string)
  ├── bio (portableText)
  ├── lineage (portableText, optional — used for Nirmal/Surendra Nath)
  ├── portrait (image)

testimonial
  ├── quote (text)
  ├── attribution (string)
  ├── source (string, optional)  // "Sydney Morning Herald", "NIDA"
  ├── kind (string): press | institution | student | academic
  ├── url (url, optional)
  ├── date (date, optional)

galleryItem
  ├── image (image with alt + photographer credit + caption)
  ├── category (string): performance | teaching | charity | portrait

charityProgram               // ALEG content
  ├── name (string)
  ├── description (portableText)
  ├── eligibility (portableText)
  ├── partners (reference[] -> partner)
  ├── donationDetails (object): bankBsb, bankAccount, abn, dgrNumber

siteSettings (singleton)
  ├── heroQuote (portableText)
  ├── contactEmails (string[])
  ├── socialLinks (link[])
  ├── firstNationsAcknowledgment (portableText — verbatim, preserved)
```

Image handling: every `image` in Sanity has alt text (required validation) and a photographer credit field. `next/image` with Sanity's image URL builder + LQIP placeholder.

---

## Design system

### Typography

CSS-first via `@theme` in `app/globals.css`. Font loading via `next/font/google` (self-hosted, no Google CDN tracking, no FOUT).

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display headings | **Cormorant Garamond** | 400, 500, 600 | Humanist serif. Reads as classical-scholarship-press. Italic for emphasis on Sanskrit/Odia terms. |
| Body | **Source Serif 4** | 400, 600 | Variable font. IAST diacritic support. Body min 18px, line-height 1.6. |
| Accent (Sanskrit/Odia script display) | **Noto Serif Devanagari** + **Noto Serif Odia** | 400, 600 | **Only when displaying actual script.** Never as decoration. |
| Functional UI (buttons, form labels) | Body font, smaller | — | We don't introduce a sans for utility. The site reads as a single voice. |

**Forbidden:** Trajan, Playfair Display (overused), Samarkan / "ethnic Latin" fonts, Papyrus.

### Color tokens

Anchored on Konark sandstone + temple-interior, not Bollywood/festival brights. All in OKLCH for predictable lightness mixing in Tailwind v4.

```css
@theme {
  /* Neutrals (Konark sandstone family) */
  --color-stone-cream:     oklch(91% 0.025 80);   /* #E8DCC4 — primary background, NOT pure white */
  --color-stone-warm:      oklch(78% 0.06 65);    /* #C89B6A — sandstone ochre */
  --color-stone-shadow:    oklch(20% 0.015 50);   /* #2A1F1A — near-black brown */

  /* Jewel accents (silk/temple, used sparingly — like a sari border) */
  --color-jewel-maroon:    oklch(36% 0.13 25);    /* #7A1F2B — banarasi maroon */
  --color-jewel-teal:      oklch(38% 0.07 220);   /* #1F4E5F — peacock teal, deep */
  --color-jewel-aubergine: oklch(28% 0.10 320);   /* #3D1F3D */

  /* Single CTA accent (alta-red — used for ONE thing per page max) */
  --color-alta:            oklch(46% 0.16 25);    /* #9B2C2C */

  /* Metallic */
  --color-tarakasi-silver: oklch(74% 0.005 90);   /* #B8B5A8 — Cuttack filigree silver, NOT yellow gold */

  /* Functional */
  --color-ink:             var(--color-stone-shadow);
  --color-ink-muted:       oklch(40% 0.015 50);
  --color-bg:              var(--color-stone-cream);
  --color-bg-elevated:     oklch(94% 0.018 80);
}
```

**Ratio:** ~70% sandstone neutrals, ~20% deep brown/aubergine, ~10% jewel accent. Test contrast on `--color-stone-cream` background (not white). Alta-red on stone-cream passes AA at 18px+.

**Forbidden:** any gradient that combines saffron + white + green; gold-on-maroon "wedding invite" combinations; bright Holi colors.

### Spacing & rhythm

Generous. This is editorial, not dashboard. Section vertical rhythm is large (`py-24` minimum on sections, `py-32+` on hero). Reading column max 65ch. Photography is allowed to bleed full-width.

### Motion

Minimal. Page transitions: fade only. Section entries: slow opacity + 8px upward translate, 600ms, ease-out, *triggered once on enter*. No looping animations. No parallax.

`prefers-reduced-motion`: every animation is opt-in via the `motion-safe:` Tailwind variant. Default is no motion.

### Iconography & motifs

**Use** (sparingly, as structural devices not decoration):
- Konark wheel (24-spoke chariot wheel) — could anchor the homepage hero or appear as a section divider. Drawn as a clean line illustration, not a photo.
- Lotus (Odisha state flower, Jagannath association) — single line illustration if used.
- Conch (śaṅkha, Jagannath) — same treatment.
- Mudra line drawings (e.g. *pataka*, *tripataka*, *ardhachandra*) with names — could illustrate the Classes page as a teaching gesture.
- Rekha deula silhouette (Lingaraja / Konark spire form) — as a section break or footer mark.

**Forbidden:** generic mandalas; paisley; mehendi-style flourishes; Om as decoration; Ganesha as a generic Indian motif; henna-script dividers; anjali-mudra hands as a wellness logo.

### Photography

- Real images of Nirmal, Chitrita, and consenting students.
- Editorial / natural light. Not flash-lit, not over-saturated.
- Performance photography: full-body, allow the tribhangi/chauka to read in the frame.
- Teaching photography: candid, classroom, hands and posture visible.
- Charity photography: dignified, never poverty-pity framing.

Reference for restraint: **Nrityagram** (nrityagram.org), **Darbar Festival** (darbar.org). The dance speaks; the chrome stays out of the way.

Source for v1: existing site's gallery (NIDA performance shots, Konark photography) + new shoots commissioned where gaps exist (portraits, location photography of Chifley + Hazelbrook studios).

---

## Page-by-page intent

### `/` (Home)

Goal: in 5 seconds, a visitor knows *who* this is, *what* tradition, *where* it happens, and *how* to get involved.

Layout:
1. **Hero** — Nirmal portrait or full-body tribhangi performance shot, full-bleed. Heading: the existing hero copy, set in Cormorant Garamond, large, single column. Single CTA: "See classes" → `/classes`.
2. **Lineage line** — one paragraph naming Surendra Nath Jena and the Jena style. Photo: Konark panel or B&W Nirmal portrait.
3. **What's offered** — five-card grid of class types. Each card: title, one-line description, link to `/classes`.
4. **Press / words from the field** — 2 testimonial quotes (SMH + NIDA), small typography, attribution clear.
5. **The charity** — short paragraph + CTA "Support Dance for Humanity" → `/charity`.
6. **Locations** — Chifley + Hazelbrook, with travel notes. Map optional (if used: muted style, not Google's default).
7. **Footer** — contact email, First Nations acknowledgment (verbatim), social links if any.

### `/classes`

Five class types as content blocks (not cards in a grid — give them room). Each: title, full description, level, location, prerequisites if any. End with a "How to enrol" panel pointing to `/contact`.

### `/guru`

This is the deepest, most respectful page. Long-form. Photo of Nirmal. Full biography. The Jena lineage explained: Surendra Nath Jena's contribution, the family transmission, what makes the style distinct. Performance history. NIDA work. Treat this like an artist's monograph chapter, not a marketing bio.

### `/charity`

ALEG mission. Who it serves. The Dance for Humanity program. Eligibility. Partners (NIDA, Ausdance NSW, Kurinji, Gamilaroi Aboriginal Elder & Mentor — preserve). Donation details: ABN, DGR status, bank details, tax-deductibility note. Form to express interest in being trained.

### `/contact`

Form: name, email, phone, message, "What are you reaching out about?" select (general / classes / charity / press / donation). Submit via Server Action → Basin (`usebasin.com`) → destination configured in the Basin dashboard. Reply-To is the submitter's email. Honeypot field for spam. No Captcha (friction > value at this scale).

---

## Accessibility

- WCAG 2.2 AA across the site. AAA contrast on body text.
- All images have meaningful alt text (sourced from Sanity). Decorative images use `alt=""`.
- Heading hierarchy is correct (`h1` once per page, no skipped levels).
- Forms: labels, error states, `aria-describedby` for hints.
- Keyboard navigation: every interactive element is reachable and visibly focused.
- `prefers-reduced-motion`: all animations disabled.
- `prefers-color-scheme`: this site is light-mode only — the sandstone palette doesn't translate to dark, and forcing a dark variant would feel like a different site. We'll set `color-scheme: light` and not provide a toggle.
- Australian date format (DD/MM/YYYY) wherever dates appear.
- IAST diacritics rendered as proper Unicode, never as images.

---

## SEO & metadata

- Per-page `generateMetadata` (Next 16) with descriptive titles.
- Structured data: `Person` (Nirmal Jena), `Organization` (Odissi Dance Company + ALEG), `Course` (per class), `LocalBusiness` (per location), `Review` (testimonials with attribution).
- Open Graph images per page, generated via `next/og` from a templated React component using the typography system.
- Sitemap + robots via `app/sitemap.ts` and `app/robots.ts`.
- Canonical domain: `https://www.odissisydney.com` (after cutover).

---

## Performance budget

- LCP < 2.0s on 4G mobile.
- CLS < 0.05.
- INP < 200ms.
- JS shipped to client < 90KB gzipped per page (this is achievable because most of the site is RSC).
- All images via `next/image` with `priority` only on the hero.

---

## Tracking & analytics

Vercel Analytics (privacy-respecting, cookieless). No Google Analytics, no Meta pixel, no Hotjar — the audience values dignity. If Nirmal/Chitrita want stats, Vercel's dashboard is enough.

---

## Email & forms

- Basin (`usebasin.com`) for contact-form delivery → family inbox. Service-agnostic `CONTACT_FORM_ENDPOINT` env var. Resend client + React Email template (`@react-email/components`) are parked in `src/lib/email/*` as unused code; safe to delete if the dormancy bothers you, but they're tree-shaken from the bundle so they cost nothing.
- Form state: `useFormStatus` for pending, server-side validation with Zod, errors returned to the form.

---

## Deploy

- Vercel project: `odissi-sydney`. Root Directory: `apps/odissi-sydney`.
- Environment: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `WEB3FORMS_ACCESS_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Domain cutover: only after Nirmal & Chitrita have reviewed the live preview and content end-to-end. Until then, the new site lives at a `*.vercel.app` URL.

---

## What this app intentionally does *not* have

- A blog, until Nirmal/Chitrita say they want one.
- An online booking calendar — current enrolment is by direct contact, and that's appropriate for the relationship-based teaching model.
- A pricing page — they don't lead with price, and that's a deliberate brand choice (not an oversight).
- Dark mode.
- Cookie banner (no tracking → no consent UI required under current ePrivacy interpretation; verify with AU Privacy Act once before launch).
- E-commerce / "shop" anything.
- Generic "Book a free class!" CTAs.

---

## Open questions to resolve before wave 2

1. Confirm contact email(s) with Nirmal/Chitrita — current site has redacted `[email protected]` placeholders.
2. Confirm whether `/blog` should ship in v1 or be deferred.
3. Photography: do we have rights to all current-site images, or do we need a new shoot?
4. Domain cutover timing: depends on parents' review pace — not on dev velocity.
5. Class schedule: current site doesn't list days/times. Worth surfacing if they want; if not, a "by enquiry" model.
6. ALEG donation flow: bank-transfer only (per current site) or add card via Stripe? Card adds complexity but lowers friction for international donors.

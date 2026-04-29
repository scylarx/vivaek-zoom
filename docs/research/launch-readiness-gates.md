# Launch Readiness Gates

Status: active guardrail

Date: 2026-04-30

These gates exist so future agents do not confuse an impressive preview with a public launch. A page may be beautiful and still not be launch-ready.

## Shared Gates

- `NEXT_PUBLIC_SITE_URL` is set to the final production domain in Vercel.
- `robots.txt` and `sitemap.xml` render on the deployed preview.
- Metadata, Open Graph, and structured data are validated against the deployed URL.
- Keyboard focus is visible and skip links work.
- Mobile and desktop screenshots have been inspected after the final build.
- `bun run lint`, `bun run typecheck`, and `bun run build` pass.
- No console errors on first load.
- No unconfirmed third-party tracking scripts.
- No personal contact details, donation details, or private addresses are published without explicit confirmation.

## Odissi Sydney Gates

- Nirmal Jena and Chitrita Mukerjee review all copy before domain cutover.
- Every lineage, guru, repertoire, partner, charity, and testimonial claim is traceable to the current site or family confirmation.
- Current-site images are either confirmed for reuse or replaced with approved/licensed assets.
- Rudolf Rindler photo credits are preserved where those images remain.
- Contact email(s) are confirmed.
- ALEG donation flow is confirmed before publishing bank details or adding card payments.
- First Nations acknowledgement is reviewed and preserved intentionally.
- No AI-generated dance imagery is used.

## Caldera Gates

- Final production domain replaces the local `NEXT_PUBLIC_SITE_URL`.
- Audio does not play with sound before user gesture.
- No Instagram audio is scraped, rehosted, or treated as rights-cleared.
- Every self-hosted track has rights notes and visible attribution.
- Sensory-light and reduced-motion modes are verified once implemented.
- Event pages include arrival, access, venue, safety, transport, and contact details.
- Mailing list or RSVP forms clearly state what data is collected and why.
- The 3D mandala has a static fallback and reduced-motion behavior.

## Hard Stop Conditions

Do not launch if any of these remain unresolved:

- unclear rights to audio or imagery;
- missing production domain;
- missing contact destination;
- donation details not approved by the family;
- inaccessible core navigation or player controls;
- unverified claims about lineage, charity status, partners, venues, or safety practices.


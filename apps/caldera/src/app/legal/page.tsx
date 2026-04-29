import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & contact",
  description:
    "What Caldera collects, how to reach us, and what you can expect when you give us your email.",
  alternates: { canonical: "/legal" },
};

export default function LegalPage() {
  return (
    <main id="main-content" className="relative min-h-dvh">
      <section className="px-5 pt-20 pb-12 sm:px-8 sm:pt-28 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-green]">
            caldera ╱╱ legal
          </p>
          <h1 className="mt-6 font-(family-name:--font-display) text-5xl font-semibold leading-[0.95] text-[--color-fg] sm:text-6xl">
            What we hold, how we hold it.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-[--color-fg-muted]">
            This page is plain English. If anything here is unclear, the right answer is for us to
            rewrite it, not for you to figure it out.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <article className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_72%,transparent)] p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-purple]">
              data we collect
            </p>
            <ul className="mt-5 space-y-3 text-base leading-[1.7] text-[--color-fg-muted]">
              <li>
                <span className="text-[--color-fg]">Mailing list</span> — your email and (optional)
                name, when you choose to give them. Stored with our email provider. We send event
                announcements only.
              </li>
              <li>
                <span className="text-[--color-fg]">Promoter / artist enquiries</span> — what you
                send us. Read by a human, replied to personally, never aggregated.
              </li>
              <li>
                <span className="text-[--color-fg]">Web analytics</span> — anonymous page views and
                Web Vitals via Vercel Analytics. No cookies. No third-party trackers. No Meta or
                Google tags.
              </li>
            </ul>
          </article>

          <article className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_72%,transparent)] p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-blue]">
              audio &amp; rights
            </p>
            <ul className="mt-5 space-y-3 text-base leading-[1.7] text-[--color-fg-muted]">
              <li>Audio plays only after you tap. Silent on load. Your tap is the consent.</li>
              <li>
                Tracks self-hosted by Caldera have explicit, written rights from the artist or
                rights holder.
              </li>
              <li>
                Spotify and SoundCloud links are discovery only — we never rehost or scrape audio
                from any platform.
              </li>
            </ul>
          </article>

          <article className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_72%,transparent)] p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-green]">
              your rights
            </p>
            <ul className="mt-5 space-y-3 text-base leading-[1.7] text-[--color-fg-muted]">
              <li>Email us to be removed from the list. We do it the same day.</li>
              <li>
                Email us for a copy of any personal data you&apos;ve given us. We send it back in
                plain text.
              </li>
              <li>
                Australian Privacy Act applies. Caldera is the data controller for anything you
                share with us.
              </li>
            </ul>
          </article>

          <article className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_72%,transparent)] p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-purple]">
              acknowledgement
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[--color-fg-muted]">
              Caldera holds events on the lands of the Gadigal, Wangal, and other Eora Nation
              peoples. We acknowledge their continuing connection to land, water, and culture, and
              pay respects to Elders past and present.
            </p>
          </article>
        </div>
      </section>

      <section className="px-5 pt-12 pb-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl border-t border-[--color-rule] pt-10">
          <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-fg-muted]">
            reach us
          </p>
          <p className="mt-5 max-w-2xl text-lg text-[--color-fg]">
            Email is the right channel. We respond personally. Specific addresses arrive on the site
            once the domain is set — for now, the homepage shows whatever is current.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 border border-[--color-neon-green] px-5 py-3 font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-green] hover:bg-[color-mix(in_oklch,var(--color-neon-green)_8%,transparent)]"
          >
            ← back to caldera
          </a>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { StructuredData } from "./structured-data";

export const metadata: Metadata = {
  title: "Arts & Life Education Gurukul — Dance for Humanity",
  description:
    "Arts & Life Education Gurukul Ltd (ALEG) is an Australian DGR-status charity founded by Nirmal Jena and Chitrita Mukerjee. Its Odissi: Dance for Humanity program provides free training in Odissi dance, music, and life skills to young people experiencing financial hardship.",
  alternates: {
    canonical: "/charity",
  },
  openGraph: {
    title: "Arts & Life Education Gurukul — Dance for Humanity",
    description:
      "Free and comprehensive training in Odissi dance and music, as well as life skills, for young people experiencing financial hardship. An Australian DGR-status charity.",
    url: "/charity",
  },
};

// Partners list — sourced from CONTENT.md and the existing site.
// The Gamilaroi Aboriginal Elder & Mentor is not named publicly on the existing site.
// FLAG: confirm whether this person wishes to be named before publishing.
const partners = [
  {
    name: "National Institute of Dramatic Art (NIDA)",
    detail: "Gavin Robins, Head of Movement",
  },
  {
    name: "Ausdance NSW",
    detail: null,
  },
  {
    name: "Kurinji",
    detail: "S. Shakthidharan, Director",
  },
  {
    // The existing site does not name this person publicly.
    // FLAG: confirm with Nirmal/Chitrita whether they wish to be named here
    // before publishing. Rendered as the existing site does.
    name: "Gamilaroi Aboriginal Elder & Mentor",
    detail: null,
  },
];

export default function CharityPage() {
  return (
    <main id="main-content" className="min-h-dvh">
      <StructuredData />

      {/* Navigation — minimal back-link */}
      <div className="border-b border-[--color-rule] bg-[color-mix(in_oklch,var(--color-bg)_92%,white)] px-5 py-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a
            href="/"
            className="font-(family-name:--font-display) text-2xl font-medium leading-none text-[--color-ink]"
          >
            Odissi Sydney
          </a>
          <a
            href="/#contact"
            className="border border-[--color-jewel-maroon] px-4 py-2 font-(family-name:--font-body) text-sm text-[--color-jewel-maroon] transition-colors hover:bg-[--color-jewel-maroon] hover:text-[--color-stone-cream]"
          >
            Enquire
          </a>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-teal]">
            Arts & Life Education Gurukul Ltd
          </p>
          <h1 className="mt-6 max-w-4xl font-(family-name:--font-display) text-4xl font-medium leading-[1.1] text-[--color-ink] sm:text-6xl">
            Dance for Humanity
          </h1>
          <p className="mt-6 max-w-2xl font-(family-name:--font-body) text-lg leading-[1.65] text-[--color-ink-muted] sm:text-xl">
            An Australian registered charity with Deductible Gift Recipient (DGR) status, founded by
            Nirmal Jena and Chitrita Mukerjee.
          </p>
        </div>
      </section>

      {/* Program description */}
      <section className="border-y border-[--color-rule] bg-[--color-bg-elevated] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-maroon]">
                The program
              </p>
              <h2 className="mt-5 font-(family-name:--font-display) text-3xl font-medium leading-tight text-[--color-ink] sm:text-4xl">
                Odissi: Dance for Humanity
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[--color-ink-muted]">
              <p>
                Odissi: Dance for Humanity is a unique arts and life skills education program for
                young people experiencing financial distress. The program provides free and
                comprehensive training in Odissi dance and music, as well as life skills, to young
                people faced with financial hardship.
              </p>
              <p>
                Nirmal and Chitrita are passionate about creativity, diversity, humanity and
                sustainability. This program is an expression of those values — serious, intensive
                training offered freely to those who could not otherwise access it.
              </p>
              <p>The program spans several years. It is not a workshop series.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it serves + What's taught */}
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Who it serves */}
            <div>
              <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-maroon]">
                Who it serves
              </p>
              <h2 className="mt-5 font-(family-name:--font-display) text-3xl font-medium leading-tight text-[--color-ink]">
                Young people who would otherwise go without.
              </h2>
              <ul className="mt-8 space-y-4 text-base leading-[1.65] text-[--color-ink-muted]">
                <li className="border-l border-[--color-rule] pl-5">
                  Young people, primary cohort age 18 and over, experiencing financial hardship
                </li>
                <li className="border-l border-[--color-rule] pl-5">
                  Those unable to access arts training for financial reasons
                </li>
                <li className="border-l border-[--color-rule] pl-5">
                  Participants from Australia and India
                </li>
                <li className="border-l border-[--color-rule] pl-5">
                  Those from disadvantaged backgrounds
                </li>
              </ul>
            </div>

            {/* What's taught */}
            <div>
              <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-maroon]">
                What&apos;s taught
              </p>
              <h2 className="mt-5 font-(family-name:--font-display) text-3xl font-medium leading-tight text-[--color-ink]">
                Classical training and practical skills, both.
              </h2>
              <ul className="mt-8 space-y-4 text-base leading-[1.65] text-[--color-ink-muted]">
                <li className="border-l border-[--color-rule] pl-5">
                  Professional instruction in Odissi Indian classical dance
                </li>
                <li className="border-l border-[--color-rule] pl-5">Vocal music and drums</li>
                <li className="border-l border-[--color-rule] pl-5">
                  Financial literacy and sustainable living
                </li>
                <li className="border-l border-[--color-rule] pl-5">
                  Arts and event management — sound, light, stage design
                </li>
                <li className="border-l border-[--color-rule] pl-5">
                  Cross-cultural communication, marketing, resilience, leadership
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="border-t border-[--color-rule] bg-[--color-bg-elevated] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-maroon]">
                How to apply
              </p>
              <h2 className="mt-5 font-(family-name:--font-display) text-3xl font-medium leading-tight text-[--color-ink] sm:text-4xl">
                Tell us your story.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[--color-ink-muted]">
              <p>
                To be considered for the program, you will need to demonstrate financial difficulty,
                a passion for Odissi, and a willingness to commit to long-term training.
              </p>
              <p>Referrals from relevant organisations are also accepted.</p>
              <a
                href="/#contact"
                className="mt-4 inline-flex w-fit border border-[--color-jewel-maroon] bg-[--color-jewel-maroon] px-6 py-3 font-(family-name:--font-body) text-base text-[--color-stone-cream] transition-colors hover:bg-transparent hover:text-[--color-jewel-maroon]"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-[--color-rule] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-ink-muted]">
            Partners
          </p>
          <h2 className="mt-5 font-(family-name:--font-display) text-3xl font-medium leading-tight text-[--color-ink] sm:text-4xl">
            Working with organisations that share the mission.
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="border border-[--color-rule] bg-[--color-bg-elevated] p-6"
              >
                <p className="font-(family-name:--font-display) text-xl font-medium text-[--color-ink]">
                  {partner.name}
                </p>
                {partner.detail ? (
                  <p className="mt-2 font-(family-name:--font-body) text-sm leading-[1.6] text-[--color-ink-muted]">
                    {partner.detail}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Donate */}
      <section className="border-t border-[--color-rule] bg-[--color-stone-shadow] px-5 py-16 text-[--color-stone-cream] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-tarakasi-silver]">
                Support the program
              </p>
              <h2 className="mt-5 font-(family-name:--font-display) text-3xl font-medium leading-tight sm:text-4xl">
                Donate to ALEG.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-[1.75] text-[color-mix(in_oklch,var(--color-stone-cream)_88%,transparent)]">
              <p>
                Donations to Arts &amp; Life Education Gurukul Ltd support the Dance for Humanity
                program directly.
              </p>
              <p>
                ALEG is a registered Australian charity with Deductible Gift Recipient (DGR) status.
                Donations of $2 or more are tax-deductible in Australia.
              </p>
              <p>ABN: 85 661 952 414</p>
              <p>
                To donate by Australian bank transfer, please contact us and we will provide the
                details directly.
                {/* NOTE: Bank BSB and account number are NOT published here.
                    Launch gate: "ALEG donation flow is confirmed before publishing bank details."
                    TODO: confirm with Nirmal/Chitrita before publishing. */}
              </p>
              <a
                href="/#contact"
                className="mt-2 inline-flex w-fit border border-[--color-stone-cream] px-6 py-3 font-(family-name:--font-body) text-base text-[--color-stone-cream] transition-colors hover:bg-[--color-stone-cream] hover:text-[--color-stone-shadow]"
              >
                Contact us about donating
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer acknowledgment */}
      <footer className="border-t border-[--color-rule] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-3xl font-(family-name:--font-body) text-sm leading-[1.7] text-[--color-ink-muted]">
            We acknowledge the Bidjigal, Gadigal, Dharug and Gundungurra peoples of the First
            Nations as the Traditional Custodians of the lands on which we teach, and pay our
            respects to Elders past and present.
          </p>
        </div>
      </footer>
    </main>
  );
}

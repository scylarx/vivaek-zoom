import { demoTracks } from "@/audio/demo-tracks";
import { QueueBootstrap } from "@/audio/QueueBootstrap";
import { ScrollSoundConductor } from "@/audio/ScrollSoundConductor";
import { sanityTrackToPlayerTrack } from "@/audio/track-model";
import { PlayerBar } from "@/components/PlayerBar";
import { SensoryToggle } from "@/components/SensoryToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UnlockSound } from "@/components/UnlockSound";
import { getTracksForHomepage } from "@/lib/sanity/queries";
import MandalaClient from "@/three/MandalaClient";

const signals = [
  {
    id: "001",
    title: "Sound",
    text: "Tracks Caldera vouches for. Tap once and the queue wakes. Skip, scrub, step out — never surprise audio.",
  },
  {
    id: "002",
    title: "Events",
    text: "Each gathering with enough detail to decide before you commit. Door, room, lineup, who's holding it.",
  },
  {
    id: "003",
    title: "Safe base",
    text: "Sensory load, transport, accessibility, consent — answered on every event page before you ask.",
  },
];

const nightProtocol = [
  "arrival map before you leave home",
  "clear door and set-time notes",
  "chill-space and sensory guidance",
  "consent and care expectations",
  "promoter contact that feels human",
];

const soundStages = [
  {
    id: "01",
    label: "silent",
    body: "The page loads quiet. The mandala moves without asking anything from you.",
    accent: "purple" as const,
  },
  {
    id: "02",
    label: "tap",
    body: "One gesture. The consent is yours. The player at the bottom of every scroll wakes up.",
    accent: "blue" as const,
  },
  {
    id: "03",
    label: "flowing",
    body: "The night's queue plays. Skip, scrub, step out anytime. The room stays open.",
    accent: "green" as const,
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Caldera",
      url: siteUrl,
      description:
        "Sydney niche music events, opt-in sound, and a safe-base community for the good people.",
      inLanguage: "en-AU",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Caldera",
      url: siteUrl,
      areaServed: "Sydney",
      description:
        "Community-first Sydney music events with sensory-aware arrival, sound, and safety information.",
    },
  ],
};

const accentToken: Record<"purple" | "blue" | "green", string> = {
  purple: "var(--color-neon-purple)",
  blue: "var(--color-neon-blue)",
  green: "var(--color-neon-green)",
};

async function getHomepageQueue() {
  if (!process.env.SANITY_PROJECT_ID) return demoTracks;

  try {
    const sanityTracks = await getTracksForHomepage();
    const playerTracks = sanityTracks
      .map(sanityTrackToPlayerTrack)
      .filter((track) => track !== null);
    return playerTracks.length > 0 ? playerTracks : demoTracks;
  } catch (error) {
    console.warn("[caldera/audio] Falling back to demo queue.", error);
    return demoTracks;
  }
}

export default async function HomePage() {
  const playerTracks = await getHomepageQueue();

  return (
    <main id="main-content" className="relative min-h-dvh overflow-hidden pb-32 lg:pb-40">
      <QueueBootstrap tracks={playerTracks} />
      <ScrollSoundConductor />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static, repo-owned content plus NEXT_PUBLIC_SITE_URL.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="caldera-glow caldera-glow-one" />
      <div className="caldera-glow caldera-glow-two" />
      <div className="caldera-glow caldera-glow-three" />

      {/* Header */}
      <header className="relative z-20 px-5 py-5 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a
            href="#top"
            className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.28em] text-[--color-fg]"
          >
            caldera
          </a>
          <div className="hidden items-center gap-7 font-(family-name:--font-mono) text-xs uppercase tracking-[0.18em] text-[--color-fg-muted] md:flex">
            <a href="#sound" className="transition-colors hover:text-[--color-neon-green]">
              Sound
            </a>
            <a href="#events" className="transition-colors hover:text-[--color-neon-blue]">
              Events
            </a>
            <a href="#community" className="transition-colors hover:text-[--color-neon-purple]">
              Community
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SensoryToggle />
            <UnlockSound />
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="relative z-10">
            <p className="max-w-full font-(family-name:--font-mono) text-xs uppercase leading-6 tracking-[0.2em] text-[--color-neon-green] sm:tracking-[0.28em]">
              Sydney sound · safe base · good people
            </p>
            <h1 className="mt-7 max-w-4xl break-words font-(family-name:--font-display) text-5xl font-semibold leading-[0.92] text-[--color-fg] sm:text-7xl lg:text-[8rem]">
              Welcome to <span className="caldera-gradient italic">Psydney</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-[--color-fg-muted] sm:text-xl">
              Music and community collide. For promoters, dancers, deep listeners, and anyone who
              wants to know how the night feels before they arrive.
            </p>
          </div>

          <div className="relative z-0 mx-auto w-full max-w-[34rem] lg:max-w-[42rem]">
            <div className="aspect-square w-full">
              <MandalaClient />
            </div>
          </div>
        </div>
      </section>

      {/* Three signals */}
      <section
        aria-label="What this site does"
        className="relative z-10 border-y border-[--color-rule] bg-[color-mix(in_oklch,var(--color-bg-elevated)_72%,transparent)] px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {signals.map((signal) => (
            <article
              key={signal.id}
              className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_72%,transparent)] p-5"
            >
              <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-purple]">
                {signal.id} / {signal.title}
              </p>
              <p className="mt-4 text-sm leading-[1.65] text-[--color-fg-muted]">{signal.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Anchor + What to expect */}
      <section className="relative z-10 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="event-slab border border-[--color-rule] p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-green]">
              next signal
            </p>
            <h2 className="mt-5 font-(family-name:--font-display) text-5xl font-semibold leading-[0.95] text-[--color-fg] sm:text-6xl">
              A night people can say yes to before they understand the whole scene.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {nightProtocol.map((item) => (
                <span
                  key={item}
                  className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-void)_52%,transparent)] px-4 py-3 text-sm text-[--color-fg-muted]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <aside className="border border-[--color-rule] bg-[--color-panel] p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-purple]">
              what to expect
            </p>
            <p className="mt-5 text-2xl leading-[1.35] text-[--color-fg]">
              Each event page tells you what the night feels like — door, music, energy, who&apos;s
              holding the room — so you can decide before you commit.
            </p>
            <p className="mt-6 text-sm leading-[1.7] text-[--color-fg-muted]">
              Tickets and links are below. The information that matters is the rest.
            </p>
          </aside>
        </div>
      </section>

      {/* Sound layer — three stages, replaces the static console mock */}
      <section id="sound" className="relative z-10 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-blue]">
                Sound layer
              </p>
              <h2 className="mt-5 font-(family-name:--font-display) text-4xl font-semibold leading-tight text-[--color-fg] sm:text-5xl">
                No surprise audio. The first tap is a threshold.
              </h2>
              <p className="mt-6 max-w-md text-base leading-[1.7] text-[--color-fg-muted]">
                The site never plays sound until you tell it to. Once you tap, the player at the
                bottom of every scroll holds the night&apos;s queue. You stay in control of the
                room.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-3">
              {soundStages.map((stage) => (
                <li
                  key={stage.id}
                  className="relative border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_82%,transparent)] p-5 sm:p-6"
                  style={{
                    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${accentToken[stage.accent]} 12%, transparent)`,
                  }}
                >
                  <p
                    className="font-(family-name:--font-mono) text-[0.65rem] uppercase tracking-[0.24em]"
                    style={{ color: accentToken[stage.accent] }}
                  >
                    stage {stage.id}
                  </p>
                  <p className="mt-3 font-(family-name:--font-display) text-2xl font-medium text-[--color-fg]">
                    {stage.label}
                  </p>
                  <p className="mt-4 text-sm leading-[1.65] text-[--color-fg-muted]">
                    {stage.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 flex items-center gap-3 border-t border-[--color-rule] pt-6 font-(family-name:--font-mono) text-[0.7rem] uppercase tracking-[0.24em] text-[--color-fg-muted]">
            <span aria-hidden="true">↓</span>
            <span>The player lives at the bottom of every scroll. Tap when you&apos;re ready.</span>
          </div>
        </div>
      </section>

      {/* Events — real card pattern (next event placeholder + past archive) */}
      <section
        id="events"
        className="relative z-10 border-y border-[--color-rule] bg-[color-mix(in_oklch,var(--color-bg-elevated)_60%,transparent)] px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-green]">
                Event pages
              </p>
              <h2 className="mt-4 font-(family-name:--font-display) text-4xl font-semibold text-[--color-fg] sm:text-5xl">
                The flyer is not enough.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-[1.65] text-[--color-fg-muted]">
              Each event page tells you the social details a flyer leaves out: what it feels like,
              how to arrive, where the chill space is, and who&apos;s holding the room.
            </p>
          </div>

          {/* Next event card — placeholder until Sanity has the first event */}
          <article className="mt-10 grid gap-6 border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_88%,transparent)] p-6 sm:p-8 lg:grid-cols-[200px_1fr_auto]">
            <div className="flex flex-col gap-2">
              <p className="font-(family-name:--font-mono) text-[0.65rem] uppercase tracking-[0.24em] text-[--color-neon-green]">
                next
              </p>
              <p className="font-(family-name:--font-display) text-4xl font-semibold leading-none text-[--color-fg]">
                TBA
              </p>
              <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.18em] text-[--color-fg-muted]">
                date holding
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-(family-name:--font-display) text-2xl font-medium leading-snug text-[--color-fg]">
                The first Caldera night is in the room being built.
              </p>
              <dl className="grid gap-3 font-(family-name:--font-mono) text-xs uppercase tracking-[0.16em] text-[--color-fg-muted] sm:grid-cols-2">
                <div className="flex items-baseline gap-3">
                  <dt className="w-20 shrink-0 text-[--color-neon-blue]">venue</dt>
                  <dd>Sydney — to be announced</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-20 shrink-0 text-[--color-neon-blue]">lineup</dt>
                  <dd>locked privately, shared close to the date</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-20 shrink-0 text-[--color-neon-blue]">door</dt>
                  <dd>set time + arrival map sent to the list</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-20 shrink-0 text-[--color-neon-blue]">access</dt>
                  <dd>chill-space, transport, sensory notes — on the page</dd>
                </div>
              </dl>
            </div>

            <a
              href="#community"
              className="self-start border border-[--color-neon-green] bg-[color-mix(in_oklch,var(--color-neon-green)_6%,transparent)] px-5 py-3 font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-green] transition-colors hover:bg-[color-mix(in_oklch,var(--color-neon-green)_14%,transparent)] lg:self-center"
            >
              get on the list →
            </a>
          </article>

          {/* Past events archive placeholder */}
          <div className="mt-6 border border-dashed border-[--color-rule] bg-transparent p-6 sm:p-8">
            <p className="font-(family-name:--font-mono) text-[0.65rem] uppercase tracking-[0.24em] text-[--color-fg-muted]">
              past archive
            </p>
            <p className="mt-3 max-w-2xl text-base leading-[1.7] text-[--color-fg-muted]">
              Past events archive here once we&apos;ve held them. We keep door-to-end notes so
              people who weren&apos;t there can still understand the room. The first one starts that
              record.
            </p>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="relative z-10 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-purple]">
              Community
            </p>
            <h2 className="mt-5 font-(family-name:--font-display) text-4xl font-semibold leading-tight text-[--color-fg] sm:text-5xl">
              The room cares who&apos;s in it.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.75] text-[--color-fg-muted]">
              Consent practice, sensory expectations, entry details, transport, and accessibility
              are on every event page — so you can arrive quietly, take the time you need, and still
              belong.
            </p>
          </div>

          <div className="grid gap-3 self-start font-(family-name:--font-mono) text-xs uppercase tracking-[0.18em]">
            <div className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_70%,transparent)] p-5">
              <p className="text-[--color-neon-green]">join the list</p>
              <p className="mt-3 normal-case tracking-normal text-[0.8rem] text-[--color-fg-muted]">
                Event announcements only. No re-marketing. Email channel arrives once the domain is
                set — for now, watch the homepage.
              </p>
            </div>
            <div className="border border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_70%,transparent)] p-5">
              <p className="text-[--color-neon-blue]">arriving new</p>
              <p className="mt-3 normal-case tracking-normal text-[0.8rem] text-[--color-fg-muted]">
                Read the event page first. The information that matters lives there. If something
                isn&apos;t answered, the page is wrong — tell us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promoters / artists */}
      <section className="relative z-10 border-t border-[--color-rule] bg-[color-mix(in_oklch,var(--color-panel)_60%,transparent)] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-purple]">
              Artists &amp; promoters
            </p>
            <h2 className="mt-4 max-w-2xl font-(family-name:--font-display) text-3xl font-semibold leading-tight text-[--color-fg] sm:text-4xl">
              Caldera reads every email. Tell us what you&apos;re holding and what you need.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[--color-fg-muted]">
            Who you are, where you&apos;ve played, what you&apos;re holding, what you need — sent to
            a human, replied to personally. The promoter contact lives on the homepage once the
            domain is set.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[--color-rule] bg-[--color-bg] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 font-(family-name:--font-mono) text-[0.7rem] uppercase tracking-[0.2em] text-[--color-fg-muted] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[--color-fg]">caldera ╱╱ psydney</span>
            <span>Sydney, Australia · built for the good people</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#sound" className="transition-colors hover:text-[--color-neon-green]">
              Sound
            </a>
            <a href="#events" className="transition-colors hover:text-[--color-neon-blue]">
              Events
            </a>
            <a href="#community" className="transition-colors hover:text-[--color-neon-purple]">
              Community
            </a>
            <a href="/legal" className="transition-colors hover:text-[--color-fg]">
              Legal
            </a>
            <span className="text-[--color-fg-muted]/60">©{new Date().getFullYear()}</span>
          </nav>
        </div>
      </footer>

      <PlayerBar />
    </main>
  );
}

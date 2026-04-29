const signals = [
  {
    id: "001",
    title: "Sound",
    text: "Opt-in audio, artist attribution, platform links, and native playback only where rights are clean.",
  },
  {
    id: "002",
    title: "Events",
    text: "Upcoming, past, and whispered-about gatherings with enough detail to feel oriented before arrival.",
  },
  {
    id: "003",
    title: "Safe base",
    text: "Neurodivergent-aware details: entry, sound intensity, chill space, transport, consent, and who to find.",
  },
];

const eventFrames = [
  "arrival clarity",
  "good people first",
  "no pressure to perform socially",
  "music as invitation",
  "promoters with care",
  "sensory-light path",
];

const nightProtocol = [
  "arrival map before you leave home",
  "clear door and set-time notes",
  "chill-space and sensory guidance",
  "consent and care expectations",
  "promoter contact that feels human",
];

const trackQueue = [
  { time: "00:00", label: "threshold", tone: "purple" },
  { time: "02:18", label: "deep room", tone: "blue" },
  { time: "06:44", label: "green signal", tone: "green" },
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

function StaticMandala() {
  const rings = [
    { r: 34, opacity: 0.95, color: "var(--color-neon-green)", dash: "0 0" },
    { r: 58, opacity: 0.8, color: "var(--color-neon-blue)", dash: "2 8" },
    { r: 88, opacity: 0.72, color: "var(--color-neon-purple)", dash: "1 7" },
    { r: 122, opacity: 0.48, color: "var(--color-neon-green)", dash: "5 5" },
    { r: 164, opacity: 0.3, color: "var(--color-neon-blue)", dash: "0 0" },
  ];
  const petals = Array.from({ length: 36 }, (_, i) => i * 10);
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      viewBox="-220 -220 440 440"
      role="img"
      aria-label="Rotating Caldera mandala in purple, blue, and green"
      className="mandala-rotate block aspect-square w-full"
    >
      <defs>
        <radialGradient id="mandala-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-neon-green)" stopOpacity="0.85" />
          <stop offset="48%" stopColor="var(--color-neon-blue)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-neon-purple)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="190" fill="url(#mandala-core)" opacity="0.36" />
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-96"
          rx="13"
          ry="78"
          fill="none"
          stroke="var(--color-neon-purple)"
          strokeOpacity="0.22"
          strokeWidth="1"
          transform={`rotate(${angle})`}
        />
      ))}
      {rings.map((ring) => (
        <circle
          key={ring.r}
          cx="0"
          cy="0"
          r={ring.r}
          fill="none"
          stroke={ring.color}
          strokeOpacity={ring.opacity}
          strokeWidth={1}
          strokeDasharray={ring.dash}
        />
      ))}
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="0"
          y1="-184"
          x2="0"
          y2="-42"
          stroke="var(--color-neon-blue)"
          strokeOpacity={0.2}
          strokeWidth={0.6}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle
        cx="0"
        cy="0"
        r="15"
        fill="var(--color-void)"
        stroke="var(--color-neon-green)"
        strokeWidth={1.5}
        strokeOpacity={0.95}
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" className="relative min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static, repo-owned content plus NEXT_PUBLIC_SITE_URL.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="caldera-glow caldera-glow-one" />
      <div className="caldera-glow caldera-glow-two" />

      <header className="relative z-20 px-5 py-5 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a
            href="#top"
            className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.28em] text-[--color-fg]"
          >
            caldera
          </a>
          <div className="hidden items-center gap-7 font-(family-name:--font-mono) text-xs uppercase tracking-[0.18em] text-[--color-fg-muted] md:flex">
            <a href="#sound" className="hover:text-[--color-neon-green]">
              Sound
            </a>
            <a href="#events" className="hover:text-[--color-neon-blue]">
              Events
            </a>
            <a href="#community" className="hover:text-[--color-neon-purple]">
              Community
            </a>
          </div>
          <a
            href="#sound"
            className="border border-[--color-neon-green] px-4 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.16em] text-[--color-neon-green] shadow-[0_0_24px_color-mix(in_oklch,var(--color-neon-green)_18%,transparent)]"
          >
            unlock sound
          </a>
        </nav>
      </header>

      <section id="top" className="relative px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="relative z-10">
            <p className="max-w-full font-(family-name:--font-mono) text-xs uppercase leading-6 tracking-[0.2em] text-[--color-neon-green] sm:tracking-[0.28em]">
              Sydney niche music / safe base
            </p>
            <h1 className="mt-7 max-w-4xl break-words font-(family-name:--font-display) text-5xl font-semibold leading-[0.92] text-[--color-fg] sm:text-7xl lg:text-[8rem]">
              Welcome to <span className="caldera-gradient italic">Psydney</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-[--color-fg-muted] sm:text-xl">
              A living signal for the good people: promoters, dancers, deep listeners, new friends,
              and neurodivergent humans who want somewhere warm to land before the night opens up.
            </p>
          </div>

          <div className="relative z-0 mx-auto w-full max-w-[34rem] lg:max-w-[42rem]">
            <StaticMandala />
          </div>
        </div>
      </section>

      <section className="border-y border-[--color-rule] bg-[color-mix(in_oklch,var(--color-bg-elevated)_72%,transparent)] px-5 py-10 sm:px-8 lg:px-10">
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

      <section className="px-5 py-20 sm:px-8 lg:px-10">
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
              why this matters
            </p>
            <p className="mt-5 text-2xl leading-[1.35] text-[--color-fg]">
              The site has to do social translation: turn a poster, a track, and a room full of
              strangers into enough trust for someone new to arrive.
            </p>
            <p className="mt-6 text-sm leading-[1.7] text-[--color-fg-muted]">
              That is the actual product. Tickets, feeds, embeds, and animations are in service of
              that trust.
            </p>
          </aside>
        </div>
      </section>

      <section id="sound" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-blue]">
              Sound layer
            </p>
            <h2 className="mt-5 font-(family-name:--font-display) text-4xl font-semibold leading-tight text-[--color-fg] sm:text-5xl">
              No surprise audio. The first tap is a threshold.
            </h2>
          </div>
          <div className="audio-console border border-[--color-rule] p-5 sm:p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-green]">
                  player state
                </p>
                <p className="mt-3 text-2xl font-medium text-[--color-fg]">
                  Consent-first mix rail
                </p>
                <p className="mt-2 max-w-xl text-sm leading-[1.6] text-[--color-fg-muted]">
                  Spotify, SoundCloud, and licensed local clips become one clear surface: play,
                  pause, skip, attribution, progress, and external listening.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.14em]">
                <span className="border border-[--color-neon-purple] px-3 py-2 text-center text-[--color-neon-purple]">
                  play
                </span>
                <span className="border border-[--color-neon-blue] px-3 py-2 text-center text-[--color-neon-blue]">
                  skip
                </span>
                <span className="border border-[--color-neon-green] px-3 py-2 text-center text-[--color-neon-green]">
                  save
                </span>
              </div>
            </div>
            <div className="mt-8 h-2 overflow-hidden border border-[--color-rule]">
              <div className="h-full w-2/5 bg-[linear-gradient(90deg,var(--color-neon-purple),var(--color-neon-blue),var(--color-neon-green))]" />
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {trackQueue.map((track) => (
                <div
                  key={track.time}
                  className="border border-[--color-rule] px-3 py-3 font-(family-name:--font-mono) text-xs uppercase tracking-[0.12em]"
                >
                  <span className={`track-dot track-dot-${track.tone}`} />
                  <span className="ml-2 text-[--color-fg-muted]">{track.time}</span>
                  <span className="ml-2 text-[--color-fg]">{track.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="border-y border-[--color-rule] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-green]">
                Event language
              </p>
              <h2 className="mt-4 font-(family-name:--font-display) text-4xl font-semibold text-[--color-fg] sm:text-5xl">
                The flyer is not enough.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-[1.65] text-[--color-fg-muted]">
              Each event page should answer the social questions people are too shy to ask: what it
              feels like, how to arrive, where to breathe, and who is holding the room.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {eventFrames.map((frame) => (
              <span
                key={frame}
                className="border border-[--color-rule] bg-[--color-panel] px-4 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.14em] text-[--color-fg-muted]"
              >
                {frame}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="font-(family-name:--font-mono) text-xs uppercase tracking-[0.24em] text-[--color-neon-purple]">
              Community protocol
            </p>
            <h2 className="mt-5 font-(family-name:--font-display) text-4xl font-semibold leading-tight text-[--color-fg] sm:text-5xl">
              Good people is not branding. It is an operating requirement.
            </h2>
          </div>
          <div className="border-l border-[--color-rule] pl-6 text-base leading-[1.75] text-[--color-fg-muted]">
            <p>
              The site should make care legible before anyone buys a ticket: consent, sensory
              expectations, entry details, transport, accessibility, and the social permission to
              arrive quietly and still belong.
            </p>
          </div>
        </div>
      </section>

      <aside className="sticky bottom-0 z-30 border-t border-[--color-rule] bg-[color-mix(in_oklch,var(--color-void)_88%,black)] px-5 py-3 backdrop-blur sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-(family-name:--font-mono) text-[0.68rem] uppercase tracking-[0.22em] text-[--color-neon-green]">
              tap once to enter the sound layer
            </p>
            <p className="mt-1 text-sm text-[--color-fg]">
              Now holding: threshold / rights-cleared queue
            </p>
          </div>
          <div className="flex items-center gap-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.14em]">
            <span className="border border-[--color-neon-purple] px-3 py-2 text-[--color-neon-purple]">
              pause
            </span>
            <span className="h-2 w-28 overflow-hidden border border-[--color-rule] sm:w-40">
              <span className="block h-full w-1/2 bg-[--color-neon-blue]" />
            </span>
            <span className="text-[--color-fg-muted]">02:18</span>
          </div>
        </div>
      </aside>
    </main>
  );
}

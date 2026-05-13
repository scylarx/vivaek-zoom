import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { siteUrl } from "@/app/seo";

const offerings = [
  {
    title: "Odissi dance",
    text: "A rigorous classical practice shaped by lineage, sculpture, rhythm, expressive storytelling, and years of patient refinement.",
  },
  {
    title: "Classical vocal training",
    text: "Voice training for students who want to deepen musicality, breath, listening, and the relationship between sound and devotion.",
  },
  {
    title: "Instrumental music",
    text: "Classical foundations taught with attention to tradition, discipline, and the living connection between music and movement.",
  },
];

const sourceImages = [
  {
    src: "/images/konark-panel-2.jpg",
    alt: "Konark temple sculptural panel",
    label: "Konark panel",
    className: "md:translate-y-10",
  },
  {
    src: "/images/img-6795.jpg",
    alt: "Students at the National Institute of Dramatic Art in Sydney, photo by Rudolf Rindler",
    label: "NIDA teaching",
    className: "",
  },
  {
    src: "/images/2021-03-26-n-n-354.jpg",
    alt: "Odissi teaching or performance moment at the National Institute of Dramatic Art in Sydney, photo by Rudolf Rindler",
    label: "Training",
    className: "md:translate-y-16",
  },
  {
    src: "/images/nirmal-b-w.jpg",
    alt: "Black and white portrait of Nirmal Jena",
    label: "Nirmal Jena",
    className: "md:translate-y-4",
  },
];

const classTypes = [
  "Music and dance performance training",
  "Teacher training",
  "Odissi dance as daily practice",
  "Music for meditation and kirtans",
  "Dance for Humanity free training",
];

const pricing = [
  {
    title: "One-on-one",
    price: "$65",
    cadence: "per hour",
    text: "Private tuition with Nirmal — pace, repertoire, and emphasis tailored to you.",
  },
  {
    title: "Group, up to three",
    price: "$100",
    cadence: "per hour, for the group",
    text: "Study with one or two others. Small enough for close correction, large enough to share rhythm and energy.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Odissi Sydney",
      url: `${siteUrl}/`,
      description:
        "Indian classical dance and vocal and instrumental music with master teacher Nirmal Jena in Sydney and the Blue Mountains.",
      founder: [
        {
          "@type": "Person",
          name: "Nirmal Jena",
        },
        {
          "@type": "Person",
          name: "Chitrita Mukerjee",
        },
      ],
      areaServed: ["Sydney", "Blue Mountains"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#nirmal-jena`,
      name: "Nirmal Jena",
      url: `${siteUrl}/`,
      image: `${siteUrl}/images/nirmal-b-w.jpg`,
      description:
        "Master teacher of Odissi Indian classical dance and Indian classical vocal and instrumental music.",
      parent: {
        "@type": "Person",
        name: "Guru Surendra Nath Jena",
      },
      worksFor: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "EducationalOrganization",
      name: "Arts & Life Education Gurukul Ltd",
      description:
        "Australian registered charity with DGR status founded by Nirmal Jena and Chitrita Mukerjee.",
      identifier: "ABN 85 661 952 414",
    },
  ],
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static, repo-owned content.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="relative z-10 border-b border-[--color-rule] bg-[color-mix(in_oklch,var(--color-bg)_92%,white)] px-5 py-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a
            href="#home"
            className="font-(family-name:--font-display) text-2xl font-medium leading-none text-[--color-ink]"
          >
            Odissi Sydney
          </a>
          <div className="hidden items-center gap-8 font-(family-name:--font-body) text-sm text-[--color-ink-muted] md:flex">
            <a href="#practice" className="hover:text-[--color-jewel-maroon]">
              Practice
            </a>
            <a href="#lineage" className="hover:text-[--color-jewel-maroon]">
              Origins
            </a>
            <a href="#classes" className="hover:text-[--color-jewel-maroon]">
              Classes
            </a>
            <a href="#contact" className="hover:text-[--color-jewel-maroon]">
              Contact
            </a>
          </div>
          <a
            href="#classes"
            className="border border-[--color-jewel-maroon] px-4 py-2 font-(family-name:--font-body) text-sm text-[--color-jewel-maroon] transition-colors hover:bg-[--color-jewel-maroon] hover:text-[--color-stone-cream]"
          >
            Enquire
          </a>
        </nav>
      </header>

      <section id="home" className="relative px-5 py-14 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="odissi-orb odissi-orb-maroon" />
        <div className="odissi-orb odissi-orb-teal" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-ink-muted]">
              Operating since 1989 · Sydney and the Blue Mountains
            </p>
            <h1 className="mt-7 max-w-4xl font-(family-name:--font-display) text-4xl font-medium leading-[1.05] text-[--color-ink] sm:text-6xl lg:text-7xl">
              Odissi Classical Dance &amp; Music School by{" "}
              <em className="not-italic text-[--color-jewel-maroon]">Nirmal Jena</em>.
            </h1>
            <p className="mt-7 max-w-2xl font-(family-name:--font-body) text-lg leading-[1.65] text-[--color-ink] sm:text-xl">
              Learn Indian classical dance, music, culture, and spirituality. Over thirty-seven
              years of teaching, Nirmal has guided more than 2,000 students through this rigorous
              lineage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#classes"
                className="inline-flex w-fit border border-[--color-jewel-maroon] bg-[--color-jewel-maroon] px-6 py-3 text-base text-[--color-stone-cream] transition-colors hover:bg-transparent hover:text-[--color-jewel-maroon]"
              >
                Explore classes
              </a>
              <a
                href="#lineage"
                className="inline-flex w-fit border border-[--color-rule] px-6 py-3 text-base text-[--color-ink] transition-colors hover:border-[--color-jewel-teal] hover:text-[--color-jewel-teal]"
              >
                The origins
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {sourceImages.map((image) => (
              <figure
                key={image.src}
                className={`group relative overflow-hidden border border-[--color-rule] bg-[--color-bg-elevated] ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={800}
                  className="aspect-[4/5] w-full object-cover grayscale-[18%] saturate-[0.82] transition duration-500 group-hover:grayscale-0 group-hover:saturate-100"
                  priority={image.label === "Nirmal Jena"}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklch,var(--color-stone-shadow)_84%,transparent))] px-3 pb-3 pt-10 font-(family-name:--font-body) text-xs uppercase tracking-[0.14em] text-[--color-stone-cream]">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-[--color-rule] pt-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="font-(family-name:--font-display) text-3xl italic leading-[1.3] text-[--color-jewel-aubergine] sm:text-4xl">
            A living tradition, taught with rigour, generosity, and devotion.
          </p>
          <p className="max-w-3xl font-(family-name:--font-body) text-base leading-[1.75] text-[--color-ink-muted]">
            Nirmal teaches the Jena style of Odissi — his father&apos;s distinct family lineage — at
            studios in eastern Sydney and the Blue Mountains, and to the actors at the National
            Institute of Dramatic Art. Students arrive as beginners, as serious performers, and as
            people seeking the practice itself.
          </p>
        </div>
      </section>

      <section
        id="practice"
        className="border-y border-[--color-rule] bg-[--color-bg-elevated] px-5 py-16 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-maroon]">
                The practice
              </p>
              <h2
                id="practice-heading"
                className="mt-5 font-(family-name:--font-display) text-4xl font-medium leading-tight text-[--color-ink] sm:text-5xl"
              >
                Three forms. One classical practice.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {offerings.map((offering) => (
                <article key={offering.title} className="border-l border-[--color-rule] pl-5">
                  <h3 className="font-(family-name:--font-display) text-2xl font-medium text-[--color-ink]">
                    {offering.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.65] text-[--color-ink-muted]">
                    {offering.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lineage" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="temple-panel min-h-[26rem] border border-[--color-rule] p-8 sm:p-10">
            <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-ink-muted]">
              Origins
            </p>
            <h2 className="mt-6 font-(family-name:--font-display) text-4xl font-medium leading-tight text-[--color-ink]">
              Recovered from temple stone, carried forward by family.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-[1.75] text-[--color-ink-muted]">
              <p>
                Odissi belongs to Odisha (Orissa), on the eastern coast of India. For centuries it
                lived inside temple worship, until colonial policy under the British Raj suppressed
                the temple-dance traditions that sustained it, and the form was very nearly lost.
              </p>
              <p>
                Nirmal&apos;s father, Guru Surendra Nath Jena, recovered it from the stone itself.
                In 1967 he travelled to the Sun Temple at Konark and studied the sculptural panels
                of its nata mandapa — the dance hall — reading each carved pose as a unit of
                movement and turning the iconography of the walls back into living dance. The Jena
                style of Odissi grew out of that act of reconstruction.
              </p>
              <p>
                The style is recognised for the depth of its basic positions, the undulating shape
                of its movement, and a solo-performance focus that explores the <em>raudra</em> and{" "}
                <em>bibatsa</em> sentiments where many Odissi traditions do not. Nirmal carries the
                lineage forward as his father&apos;s son and student, and through his own
                translations of his father&apos;s writing.
              </p>
            </div>
          </div>
          <figure className="self-end border-t border-[--color-rule] pt-8">
            <blockquote className="font-(family-name:--font-display) text-3xl italic leading-[1.35] text-[--color-ink] sm:text-4xl">
              &ldquo;Nirmal Jena&apos;s performance of Odissi dance was one of those rare delights
              when a solo performer gives so generously. This was painting, sculpture -- a whole
              culture -- coming to life.&rdquo;
            </blockquote>
            <figcaption className="mt-6 font-(family-name:--font-body) text-sm uppercase tracking-[0.14em] text-[--color-ink-muted]">
              Sydney Morning Herald
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="classes"
        className="border-y border-rule bg-bg-elevated px-5 py-10 text-ink sm:px-8 sm:py-12 lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-jewel-maroon">
            Classes and rates
          </p>
          <h2 className="mt-2 font-(family-name:--font-display) text-3xl font-medium leading-[1.1] text-ink sm:text-4xl">
            Choose how you&apos;d like to study.
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pricing.map((tier) => (
              <article
                key={tier.title}
                className="flex flex-col border border-rule bg-bg p-5"
              >
                <p className="font-(family-name:--font-body) text-xs uppercase tracking-[0.18em] text-jewel-maroon">
                  {tier.title}
                </p>
                <p className="mt-3 font-(family-name:--font-display) text-4xl font-medium leading-none text-ink">
                  {tier.price}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{tier.cadence}</p>
                <p className="mt-3 text-sm leading-[1.55] text-ink-muted">{tier.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-3 border border-jewel-teal/60 bg-jewel-teal/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-[1.55] text-ink sm:max-w-xl">
              <span className="font-(family-name:--font-body) uppercase tracking-[0.16em] text-jewel-teal">
                Complimentary intro ·
              </span>{" "}
              Your first 30-minute lesson is on us — meet Nirmal, try the practice, and ask any
              questions before you commit.
            </p>
            <a
              href="#contact"
              className="inline-flex w-fit shrink-0 border border-jewel-maroon bg-jewel-maroon px-5 py-2.5 text-sm text-stone-cream transition-colors hover:bg-transparent hover:text-jewel-maroon"
            >
              Enquire about a lesson
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {classTypes.map((type) => (
              <span
                key={type}
                className="border border-rule px-3 py-1.5 text-xs text-ink-muted"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[--color-rule] bg-[--color-bg-elevated] px-5 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-teal]">
              Arts & Life Education Gurukul Ltd
            </p>
            <h2 className="mt-5 font-(family-name:--font-display) text-4xl font-medium leading-tight text-[--color-ink] sm:text-5xl">
              Dance for Humanity. Free training, taught seriously.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-[1.75] text-[--color-ink-muted]">
            <p>
              Founded by Nirmal Jena and Chitrita Mukerjee, the Arts &amp; Life Education Gurukul is
              an Australian registered charity with DGR status. Its program supports young people
              experiencing financial hardship through Odissi dance, music, and life skills — over
              years, not weeks.
            </p>
            <p>
              Creativity, diversity, humanity, and sustainability are the values Nirmal and Chitrita
              work toward, in the school and through ALEG.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 border-t border-[--color-rule] pt-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-(family-name:--font-body) text-sm uppercase tracking-[0.2em] text-[--color-jewel-maroon]">
              Sydney and the Blue Mountains
            </p>
            <h2 className="mt-4 max-w-xl font-(family-name:--font-display) text-4xl font-medium leading-tight text-[--color-ink]">
              Reach out about classes, training, performance, or ALEG.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-[--color-ink-muted]">
              Tell us a little about what brings you here. Nirmal and Chitrita will reply
              personally.
            </p>
            <p className="mt-8 max-w-xl text-sm leading-[1.7] text-[--color-ink-muted]">
              We acknowledge the Bidjigal, Gadigal, Dharug and Gundungurra peoples of the First
              Nations as the Traditional Custodians of the lands on which we teach, and pay our
              respects to Elders past and present.
            </p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

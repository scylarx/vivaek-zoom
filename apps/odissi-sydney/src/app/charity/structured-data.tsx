// Server component — emits JSON-LD structured data for the /charity page.
// Schema: EducationalOrganization (ALEG).

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "NGO"],
  "@id": "https://www.odissisydney.com/charity#aleg",
  name: "Arts & Life Education Gurukul Ltd",
  alternateName: "ALEG",
  description:
    "Australian registered charity with DGR status providing free and comprehensive training in Odissi dance, music, and life skills to young people experiencing financial hardship.",
  url: "https://www.odissisydney.com/charity",
  identifier: {
    "@type": "PropertyValue",
    name: "ABN",
    value: "85 661 952 414",
  },
  foundingLocation: {
    "@type": "Place",
    name: "Sydney, Australia",
  },
  founder: [
    { "@type": "Person", name: "Nirmal Jena" },
    { "@type": "Person", name: "Chitrita Mukerjee" },
  ],
  knowsAbout: ["Odissi dance", "Indian classical music", "Arts education"],
  educationalProgramMode: "in-person",
  areaServed: "Australia",
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static, repo-owned content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

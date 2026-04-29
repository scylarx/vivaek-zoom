import { sanityClient } from "./client";
import type {
  HomepageData,
  SanityCharityProgram,
  SanityClass,
  SanityPerson,
  SanityTestimonial,
} from "./types";

// ─── GROQ fragments ──────────────────────────────────────────────────────────

const imageFields = `
  asset,
  hotspot,
  alt,
  photographer,
  caption
`;

const portableTextFields = `
  ...,
  _type,
  _key,
  children[] {
    ...,
    _type,
    _key
  },
  markDefs[] {
    ...,
    _type,
    _key
  }
`;

const locationFields = `
  _id,
  _type,
  name,
  shortName,
  address,
  travelNotes,
  coordinates
`;

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getHomepageData(): Promise<HomepageData> {
  const [settings, featuredTestimonials] = await Promise.all([
    sanityClient.fetch<HomepageData["settings"]>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0] {
        _id,
        _type,
        heroQuote[] { ${portableTextFields} },
        contactEmails,
        socialLinks,
        firstNationsAcknowledgment[] { ${portableTextFields} }
      }`,
    ),
    sanityClient.fetch<SanityTestimonial[]>(
      `*[_type == "testimonial" && featured == true] | order(_createdAt asc) {
        _id,
        _type,
        quote,
        attribution,
        source,
        kind,
        url,
        date,
        featured
      }`,
    ),
  ]);

  return {
    settings: settings ?? null,
    featuredTestimonials: featuredTestimonials ?? [],
  };
}

export async function getClasses(): Promise<SanityClass[]> {
  return sanityClient.fetch<SanityClass[]>(
    `*[_type == "class"] | order(orderRank asc) {
      _id,
      _type,
      title,
      slug,
      shortDescription,
      fullDescription[] { ${portableTextFields} },
      level,
      ageGroups,
      locations[]-> { ${locationFields} },
      pricing,
      prerequisites,
      heroImage { ${imageFields} },
      orderRank
    }`,
  );
}

export async function getClassBySlug(slug: string): Promise<SanityClass | null> {
  return sanityClient.fetch<SanityClass | null>(
    `*[_type == "class" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      shortDescription,
      fullDescription[] { ${portableTextFields} },
      level,
      ageGroups,
      locations[]-> { ${locationFields} },
      pricing,
      prerequisites,
      heroImage { ${imageFields} },
      orderRank
    }`,
    { slug },
  );
}

export async function getPersonById(id: string): Promise<SanityPerson | null> {
  return sanityClient.fetch<SanityPerson | null>(
    `*[_type == "person" && _id == $id][0] {
      _id,
      _type,
      name,
      role,
      bio[] { ${portableTextFields} },
      lineage[] { ${portableTextFields} },
      portrait { ${imageFields} }
    }`,
    { id },
  );
}

export async function getTestimonials(kind?: string): Promise<SanityTestimonial[]> {
  const filter = kind
    ? `*[_type == "testimonial" && kind == $kind] | order(_createdAt asc)`
    : `*[_type == "testimonial"] | order(kind asc, _createdAt asc)`;

  return sanityClient.fetch<SanityTestimonial[]>(
    `${filter} {
      _id,
      _type,
      quote,
      attribution,
      source,
      kind,
      url,
      date,
      featured
    }`,
    kind ? { kind } : {},
  );
}

export async function getCharityProgram(): Promise<SanityCharityProgram | null> {
  // NOTE: donationDetails is fetched but must NOT be rendered publicly.
  // The charity page renders only ABN, DGR status, and a "contact us" CTA for donations.
  // TODO: confirm with Nirmal/Chitrita before publishing bank details.
  return sanityClient.fetch<SanityCharityProgram | null>(
    `*[_type == "charityProgram" && _id == "charityProgram"][0] {
      _id,
      _type,
      name,
      description[] { ${portableTextFields} },
      eligibility[] { ${portableTextFields} },
      partners
    }`,
  );
}

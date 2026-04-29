// Sanity document types.
// These reflect the Sanity schemas in /sanity/schemas.
// Keep in sync when schemas change.

export type SanityImageAsset = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt: string;
  photographer?: string;
  caption?: string;
};

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  style?: string;
};

export type SanityLocation = {
  _id: string;
  _type: "location";
  name: string;
  shortName: string;
  address?: string;
  travelNotes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type SanityClass = {
  _id: string;
  _type: "class";
  title: string;
  slug: { current: string };
  shortDescription: string;
  fullDescription?: PortableTextBlock[];
  level?: string[];
  ageGroups?: string[];
  locations?: SanityLocation[];
  pricing?: string;
  prerequisites?: string;
  heroImage?: SanityImageAsset;
  orderRank?: number;
};

export type SanityPerson = {
  _id: string;
  _type: "person";
  name: string;
  role: string;
  bio: PortableTextBlock[];
  lineage?: PortableTextBlock[];
  portrait: SanityImageAsset;
};

export type SanityTestimonial = {
  _id: string;
  _type: "testimonial";
  quote: string;
  attribution: string;
  source?: string;
  kind: "press" | "institution" | "student" | "academic";
  url?: string;
  date?: string;
  featured?: boolean;
};

export type SanityGalleryItem = {
  _id: string;
  _type: "galleryItem";
  image: SanityImageAsset;
  category: "performance" | "teaching" | "charity" | "portrait";
  orderRank?: number;
};

export type SanityCharityProgram = {
  _id: string;
  _type: "charityProgram";
  name: string;
  description: PortableTextBlock[];
  eligibility?: PortableTextBlock[];
  partners?: string[];
  donationDetails?: {
    // NOTE: these fields must NOT be rendered publicly until
    // confirmed with Nirmal and Chitrita per launch gate.
    // TODO: confirm with Nirmal/Chitrita before publishing
    bankBsb?: string;
    bankAccount?: string;
    abn?: string;
    dgrNumber?: string;
  };
};

export type SanitySiteSettings = {
  _id: string;
  _type: "siteSettings";
  heroQuote?: PortableTextBlock[];
  contactEmails?: string[];
  socialLinks?: Array<{ label: string; url: string }>;
  firstNationsAcknowledgment?: PortableTextBlock[];
};

export type HomepageData = {
  settings: SanitySiteSettings | null;
  featuredTestimonials: SanityTestimonial[];
};

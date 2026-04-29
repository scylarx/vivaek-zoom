// Hand-typed interfaces matching the Sanity schemas.
// Keep in sync with apps/caldera/sanity/schemas/*.

export interface SanityImageAsset {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityPortableTextBlock {
  _type: "block";
  _key: string;
  style?: string;
  children: Array<{ _type: "span"; _key: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _type: string; _key: string; href?: string }>;
}

// ---------- Artist ----------

export interface SanityArtist {
  _id: string;
  _type: "artist";
  name: string;
  slug: SanitySlug;
  soundcloudUrl?: string;
  spotifyUrl?: string;
  instagramHandle?: string;
  shortBio?: SanityPortableTextBlock[];
  portrait?: SanityImageAsset;
}

// ---------- Track ----------

export interface SanityTrack {
  _id: string;
  _type: "track";
  title: string;
  /** Resolved artist document (expanded via GROQ join). */
  artist?: SanityArtist;
  /** Plain-text fallback when no artist document exists. */
  artistName?: string;
  selfHostedAudio?: {
    _type: "file";
    asset: { _ref: string; _type: "reference"; url?: string };
  };
  soundcloudUrl?: string;
  spotifyTrackId?: string;
  instagramPostUrl?: string;
  associatedEvent?: { _ref: string; _type: "reference" };
  artwork?: SanityImageAsset;
  durationMs?: number;
  rightsCleared: boolean;
  rightsNotes?: string;
  addedAt?: string;
  orderRank?: number;
}

// ---------- Venue (embedded object) ----------

export interface SanityVenue {
  name?: string;
  address?: string;
  city?: string;
  googleMapsUrl?: string;
  accessibilityNotes?: string;
}

// ---------- Event ----------

export type EventStatus = "announced" | "onsale" | "soldout" | "past";

export interface SanityEvent {
  _id: string;
  _type: "event";
  name: string;
  slug: SanitySlug;
  date: string;
  doorTime?: string;
  venue?: SanityVenue;
  lineup?: SanityArtist[];
  ticketUrl?: string;
  description?: SanityPortableTextBlock[];
  poster?: SanityImageAsset;
  associatedTracks?: SanityTrack[];
  status?: EventStatus;
}

// ---------- Manifesto (singleton) ----------

export interface SanityManifesto {
  _id: string;
  _type: "manifesto";
  tagline?: string;
  secondaryLine?: string;
  body?: SanityPortableTextBlock[];
  communityCallout?: string;
}

// ---------- SiteSettings (singleton) ----------

export interface SanitySocialLink {
  _key: string;
  platform?: "instagram" | "soundcloud" | "discord" | "bandcamp" | "residentadvisor" | "other";
  url?: string;
}

export interface SanitySiteSettings {
  _id: string;
  _type: "siteSettings";
  socialLinks?: SanitySocialLink[];
  promoterEmail?: string;
  pressEmail?: string;
  footerCopy?: SanityPortableTextBlock[];
}

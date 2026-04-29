import { sanityFetch } from "./client";
import type { SanityEvent, SanityManifesto, SanitySiteSettings, SanityTrack } from "./types";

// ---------- GROQ query strings ----------
// Rights gate: only tracks with rightsCleared == true are returned in any query.
// This is enforced here, not only in the studio.

export const eventsUpcomingQuery = `
  *[_type == "event" && status in ["announced", "onsale"] && date >= $now]
  | order(date asc) {
    _id,
    _type,
    name,
    slug,
    date,
    doorTime,
    venue,
    lineup[]-> { _id, _type, name, slug, soundcloudUrl, spotifyUrl, instagramHandle, portrait },
    ticketUrl,
    description,
    poster,
    associatedTracks[]->{ _id, _type, title, artistName, artist->{name}, rightsCleared, soundcloudUrl, spotifyTrackId, artwork, durationMs, orderRank }[rightsCleared == true],
    status
  }
` as const;

export const eventsPastQuery = `
  *[_type == "event" && (status == "past" || date < $now)]
  | order(date desc) {
    _id,
    _type,
    name,
    slug,
    date,
    status,
    poster
  }
` as const;

export const tracksForHomepageQuery = `
  *[_type == "track" && rightsCleared == true]
  | order(orderRank asc, addedAt desc) [0...20] {
    _id,
    _type,
    title,
    artistName,
    artist->{ _id, name, slug, soundcloudUrl, spotifyUrl, instagramHandle },
    selfHostedAudio { asset->{ url } },
    soundcloudUrl,
    spotifyTrackId,
    instagramPostUrl,
    associatedEvent->{ _id, name, slug },
    artwork,
    durationMs,
    rightsCleared,
    rightsNotes,
    orderRank
  }
` as const;

export const manifestoQuery = `
  *[_type == "manifesto"][0] {
    _id,
    _type,
    tagline,
    secondaryLine,
    body,
    communityCallout
  }
` as const;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    socialLinks,
    promoterEmail,
    pressEmail,
    footerCopy
  }
` as const;

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    date,
    doorTime,
    venue,
    lineup[]->{ _id, _type, name, slug, soundcloudUrl, spotifyUrl, instagramHandle, portrait, shortBio },
    ticketUrl,
    description,
    poster,
    associatedTracks[]->{ _id, _type, title, artistName, artist->{name}, rightsCleared, soundcloudUrl, spotifyTrackId, selfHostedAudio { asset->{ url } }, artwork, durationMs, orderRank }[rightsCleared == true],
    status
  }
` as const;

// ---------- Fetch helpers ----------

export async function getUpcomingEvents(now: string): Promise<SanityEvent[]> {
  return sanityFetch<SanityEvent[]>({
    query: eventsUpcomingQuery,
    params: { now },
    tags: ["event"],
  });
}

export async function getPastEvents(now: string): Promise<SanityEvent[]> {
  return sanityFetch<SanityEvent[]>({
    query: eventsPastQuery,
    params: { now },
    tags: ["event"],
  });
}

export async function getTracksForHomepage(): Promise<SanityTrack[]> {
  return sanityFetch<SanityTrack[]>({
    query: tracksForHomepageQuery,
    params: {},
    tags: ["track"],
  });
}

export async function getManifesto(): Promise<SanityManifesto | null> {
  return sanityFetch<SanityManifesto | null>({
    query: manifestoQuery,
    params: {},
    tags: ["manifesto"],
  });
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityFetch<SanitySiteSettings | null>({
    query: siteSettingsQuery,
    params: {},
    tags: ["siteSettings"],
  });
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  return sanityFetch<SanityEvent | null>({
    query: eventBySlugQuery,
    params: { slug },
    tags: ["event", `event:${slug}`],
  });
}

import type { Track } from "./store";

/**
 * Development/demo queue.
 *
 * These are intentionally external-only placeholders. They prove the player,
 * consent, queueing, and attribution UI without pretending Caldera has rights
 * to stream any artist's master. Real playback begins when Sanity returns
 * rights-cleared self-hosted audio URLs.
 */
export const demoTracks: Track[] = [
  {
    id: "caldera-threshold",
    title: "Threshold signal",
    artist: "Caldera",
    sourceKind: "soundcloud",
    externalUrl: "https://soundcloud.com/",
    durationMs: 138000,
    attribution: "Placeholder only. Replace with a rights-cleared artist source.",
    rightsNote: "External discovery link only; no audio is rehosted.",
  },
  {
    id: "caldera-deep-room",
    title: "Deep room note",
    artist: "Caldera",
    sourceKind: "spotify",
    externalUrl: "https://open.spotify.com/",
    embedUrl: "https://open.spotify.com/embed/",
    durationMs: 266000,
    attribution: "Placeholder only. Replace with a confirmed Spotify track id.",
    rightsNote: "Spotify embed/link only; no redistribution rights implied.",
  },
  {
    id: "caldera-green-signal",
    title: "Green signal",
    artist: "Caldera",
    sourceKind: "soundcloud",
    externalUrl: "https://soundcloud.com/",
    durationMs: 404000,
    attribution: "Placeholder only. Replace with a rights-cleared artist source.",
    rightsNote: "External discovery link only; no audio is rehosted.",
  },
];

import type { SanityTrack } from "@/lib/sanity/types";
import { resolveTrackSource } from "./source-resolution";
import type { Track } from "./store";

export function sanityTrackToPlayerTrack(track: SanityTrack): Track | null {
  if (!track.rightsCleared) return null;
  const source = resolveTrackSource(track);
  if (!source) return null;

  const artist = track.artist?.name ?? track.artistName ?? "Unknown artist";
  const base = {
    id: track._id,
    title: track.title,
    artist,
    durationMs: track.durationMs ?? 0,
    attribution: `${track.title} · ${artist}`,
    rightsNote: track.rightsNotes,
  };

  if (source.kind === "self-hosted") {
    return {
      ...base,
      sourceKind: source.kind,
      playbackUrl: source.playbackUrl,
      externalUrl: source.externalUrl,
    };
  }

  if (source.kind === "spotify") {
    return {
      ...base,
      sourceKind: source.kind,
      externalUrl: source.externalUrl,
      embedUrl: source.embedUrl,
    };
  }

  return {
    ...base,
    sourceKind: source.kind,
    externalUrl: source.externalUrl,
  };
}

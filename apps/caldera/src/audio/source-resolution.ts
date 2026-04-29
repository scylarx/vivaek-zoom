import type { SanityTrack } from "@/lib/sanity/types";

export type ResolvedSource =
  | { kind: "self-hosted"; playbackUrl: string; externalUrl?: string | undefined }
  | { kind: "soundcloud"; externalUrl: string }
  | { kind: "spotify"; externalUrl: string; embedUrl: string; trackId: string };

/**
 * Resolves the best available audio source for a track.
 * Priority: selfHostedAudio → soundcloudUrl → spotifyTrackId.
 * Returns null if none of the sources are available.
 */
export function resolveTrackSource(track: SanityTrack): ResolvedSource | null {
  const selfHostedUrl = track.selfHostedAudio?.asset?.url;
  if (selfHostedUrl) {
    return {
      kind: "self-hosted",
      playbackUrl: selfHostedUrl,
      externalUrl: track.soundcloudUrl ?? spotifyTrackUrl(track.spotifyTrackId),
    };
  }

  if (track.soundcloudUrl) {
    return { kind: "soundcloud", externalUrl: track.soundcloudUrl };
  }

  if (track.spotifyTrackId) {
    const trackId = track.spotifyTrackId;
    return {
      kind: "spotify",
      trackId,
      externalUrl: `https://open.spotify.com/track/${trackId}`,
      embedUrl: `https://open.spotify.com/embed/track/${trackId}`,
    };
  }

  return null;
}

function spotifyTrackUrl(trackId: string | undefined): string | undefined {
  return trackId ? `https://open.spotify.com/track/${trackId}` : undefined;
}

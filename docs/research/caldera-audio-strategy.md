# Caldera Audio Strategy

Status: research note

Date: 2026-04-30

## Product Intent

Caldera should feel musically alive, but the site must respect browser autoplay policy, platform terms, artist rights, mobile data, battery, and user comfort. Music should invite people in, not surprise-play at them.

## Recommendation

Build a consent-first audio layer:

- Silent animated/music-reactive visuals on first load.
- A clear play control near the hero and a persistent mini-player after interaction.
- Preview clips or licensed/full-rights audio controlled by Caldera.
- Spotify/Apple/SoundCloud/YouTube links or embeds for discovery, not hidden extraction.
- Track attribution visible and structured.

## Instagram Track Capture

Instagram post/Reel audio is not a reliable primary source for web playback. It is useful as a discovery source:

1. Maintain a content sheet of posts, event names, artists, and detected tracks.
2. Use manual confirmation or an approved music recognition workflow.
3. Match tracks to Spotify/Apple/SoundCloud/YouTube URLs.
4. Use platform embeds or deep links for full-track listening.
5. Use separately licensed snippets for native site playback.

Do not build a system that scrapes Instagram audio and re-hosts it without rights.

## Spotify Reality

Spotify Web Playback SDK can support rich playback, but it generally requires user authentication and Spotify Premium for full playback. Spotify embeds are much simpler, but visual and behavioral control is limited. Thirty-second previews are no longer broadly dependable as a public API assumption.

## Browser Autoplay Reality

Autoplay with sound is blocked or heavily restricted on modern browsers. The site should treat user intent as a design opportunity:

- first tap starts the audio world;
- scroll can crossfade, skip, or advance only after consent;
- reduced-motion and reduced-data users get a calmer version;
- all audio controls remain accessible by keyboard and screen reader.

## Implementation Shape

Create a small media model:

```ts
type Track = {
  id: string
  title: string
  artist: string
  source: 'licensed-local' | 'spotify' | 'soundcloud' | 'youtube' | 'apple'
  audioUrl?: string
  externalUrl: string
  artworkUrl?: string
  attribution: string
  eventIds: string[]
}
```

For native playback, use Web Audio or a proven React audio player only after the first user gesture. Keep the player persistent across sections, compact on mobile, and resilient when no audio can play.

## Open Questions

- Does Caldera own or have permission to host any mixes, snippets, or stems?
- Which Instagram account(s) and posts are the source of truth?
- Is the site primarily event discovery, community onboarding, artist archive, or all three?
- Should the player be ambient and optional, or central to the identity?


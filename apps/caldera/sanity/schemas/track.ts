import { defineField, defineType } from "sanity";

export const trackSchema = defineType({
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "reference",
      to: [{ type: "artist" }],
      description: "Link to an artist document, or use artistName below for an unlinked credit.",
    }),
    defineField({
      name: "artistName",
      title: "Artist name (plain text fallback)",
      type: "string",
      description: "Used when the artist does not have a document yet.",
    }),
    defineField({
      name: "selfHostedAudio",
      title: "Self-hosted audio file",
      type: "file",
      options: { accept: "audio/*" },
      description: "128k AAC (.m4a) preferred. Only upload when rights are confirmed.",
    }),
    defineField({
      name: "soundcloudUrl",
      title: "SoundCloud URL",
      type: "url",
      description: "Streams from the artist's own SoundCloud account.",
    }),
    defineField({
      name: "spotifyTrackId",
      title: "Spotify track ID",
      type: "string",
      description: "Embed fallback only — e.g. 4iV5W9uYEdYUVa79Axb7Rh",
    }),
    defineField({
      name: "instagramPostUrl",
      title: "Instagram post URL",
      type: "url",
      description: "The Reel or post where this track was first heard.",
    }),
    defineField({
      name: "associatedEvent",
      title: "Associated event",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "artwork",
      title: "Artwork",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      description: "Falls back to the associated event poster, then a generated placeholder.",
    }),
    defineField({
      name: "durationMs",
      title: "Duration (ms)",
      type: "number",
      description: "Auto-populated where possible.",
    }),
    defineField({
      name: "rightsCleared",
      title: "Rights cleared",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      description:
        "This track will not be served to visitors until rights are confirmed. Check only after written permission or verified self-ownership.",
    }),
    defineField({
      name: "rightsNotes",
      title: "Rights notes",
      type: "text",
      rows: 3,
      description: "Who gave permission, when, and on what terms.",
    }),
    defineField({
      name: "addedAt",
      title: "Added at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "orderRank",
      title: "Order rank",
      type: "number",
      description: "Lower numbers appear first. Editor-controlled sort order.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      artist: "artistName",
      artistRef: "artist.name",
      media: "artwork",
      cleared: "rightsCleared",
    },
    prepare({ title, artist, artistRef, media, cleared }) {
      const artistLabel =
        (artistRef as string | undefined) ?? (artist as string | undefined) ?? "—";
      return {
        title: `${cleared ? "" : "⚠ "}${title as string}`,
        subtitle: artistLabel,
        media,
      };
    },
  },
});

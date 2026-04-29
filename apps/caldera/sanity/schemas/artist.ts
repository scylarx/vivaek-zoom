import { defineField, defineType } from "sanity";

export const artistSchema = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "soundcloudUrl",
      title: "SoundCloud URL",
      type: "url",
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      description: "Without the @ — e.g. caldera_sydney",
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "portrait",
    },
  },
});

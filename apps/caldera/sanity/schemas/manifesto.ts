import { defineField, defineType } from "sanity";

export const manifestoSchema = defineType({
  name: "manifesto",
  title: "Manifesto",
  type: "document",
  // Singleton — only one document of this type should exist.
  // Enforced in the studio via __experimental_actions limiting to update only once created.
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: 'e.g. "Welcome to Psydney"',
    }),
    defineField({
      name: "secondaryLine",
      title: "Secondary line",
      type: "string",
      description: 'e.g. "Music and community collide"',
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      description: "Short manifesto text. Plain English, no marketing voice.",
    }),
    defineField({
      name: "communityCallout",
      title: "Community callout",
      type: "text",
      rows: 3,
      description: "RSVP / mailing-list copy. Direct and warm — no exclamation marks.",
    }),
  ],
  preview: {
    select: {
      title: "tagline",
      subtitle: "secondaryLine",
    },
  },
});

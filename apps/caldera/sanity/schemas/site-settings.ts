import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // Singleton — only one document of this type should exist.
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "SoundCloud", value: "soundcloud" },
                  { title: "Discord", value: "discord" },
                  { title: "Bandcamp", value: "bandcamp" },
                  { title: "Resident Advisor", value: "residentadvisor" },
                  { title: "Other", value: "other" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "promoterEmail",
      title: "Promoter contact email",
      type: "string",
      description: "For artists and promoters reaching out. Displayed on the site.",
    }),
    defineField({
      name: "pressEmail",
      title: "Press contact email",
      type: "string",
    }),
    defineField({
      name: "footerCopy",
      title: "Footer copy",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "promoterEmail",
    },
    prepare({ title }) {
      return { title: "Site settings", subtitle: title as string | undefined };
    },
  },
});

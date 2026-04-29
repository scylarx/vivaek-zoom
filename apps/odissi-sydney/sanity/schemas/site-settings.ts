import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // Singleton — only one document of this type should exist.
  // Enforce in the studio by hiding the "New" button via configuration.
  fields: [
    defineField({
      name: "heroQuote",
      title: "Hero quote",
      type: "array",
      of: [{ type: "block" }],
      description: "The principal statement at the top of the homepage.",
    }),
    defineField({
      name: "contactEmails",
      title: "Contact email addresses",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Email addresses that receive contact form submissions. Confirm with Nirmal and Chitrita before deploying.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "firstNationsAcknowledgment",
      title: "First Nations acknowledgment",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Preserved verbatim from the existing site. Any change to this text must be made by Nirmal or Chitrita, not by the development team. Current text acknowledges the Bidjigal, Gadigal, Dharug and Gundungurra peoples.",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return { title: "Site settings" };
    },
  },
});

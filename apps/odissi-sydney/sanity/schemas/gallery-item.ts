import { defineField, defineType } from "sanity";

export const galleryItemSchema = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "photographer",
          title: "Photographer credit",
          type: "string",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Performance", value: "performance" },
          { title: "Teaching", value: "teaching" },
          { title: "Charity", value: "charity" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Order rank",
      type: "number",
      description: "Lower numbers appear first within a category.",
    }),
  ],
  orderings: [
    {
      title: "Category, then order",
      name: "categoryOrderRank",
      by: [
        { field: "category", direction: "asc" },
        { field: "orderRank", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "image.alt",
      subtitle: "category",
      media: "image",
    },
  },
});

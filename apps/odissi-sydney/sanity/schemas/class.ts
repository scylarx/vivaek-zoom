import { defineField, defineType } from "sanity";

export const classSchema = defineType({
  name: "class",
  title: "Class",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "180 characters maximum — used in cards and previews.",
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: "fullDescription",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Open (all levels)", value: "open" },
        ],
      },
    }),
    defineField({
      name: "ageGroups",
      title: "Age groups",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Children", value: "children" },
          { title: "Youth", value: "youth" },
          { title: "Adults", value: "adults" },
          { title: "Seniors", value: "seniors" },
        ],
      },
    }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "location" }] }],
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "text",
      rows: 3,
      description: "Leave blank to show 'by enquiry'.",
    }),
    defineField({
      name: "prerequisites",
      title: "Prerequisites",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
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
      ],
    }),
    defineField({
      name: "orderRank",
      title: "Order rank",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "heroImage",
    },
  },
});

import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Event",
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
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "doorTime",
      title: "Door time",
      type: "datetime",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Venue name", type: "string" }),
        defineField({ name: "address", title: "Address", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),
        defineField({
          name: "accessibilityNotes",
          title: "Accessibility notes",
          type: "text",
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: "lineup",
      title: "Lineup",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "poster",
      title: "Poster",
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
    defineField({
      name: "associatedTracks",
      title: "Associated tracks",
      type: "array",
      of: [{ type: "reference", to: [{ type: "track" }] }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Announced", value: "announced" },
          { title: "On sale", value: "onsale" },
          { title: "Sold out", value: "soldout" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "announced",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "date",
    },
  },
});

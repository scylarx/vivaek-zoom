import { defineField, defineType } from "sanity";

export const locationSchema = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'e.g. "Chifley, Sydney East"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      description: 'e.g. "Sydney"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      description: "Full address. Control whether this appears publicly per class page.",
    }),
    defineField({
      name: "travelNotes",
      title: "Travel notes",
      type: "text",
      rows: 3,
      description: 'e.g. "30 minutes from city centre, 15 minutes from Sydney Airport."',
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "geopoint",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortName",
    },
  },
});

import { defineField, defineType } from "sanity";

// NOTE: donationDetails.bankBsb and donationDetails.bankAccount are stored in Sanity
// but MUST NOT be rendered publicly until confirmed with Nirmal and Chitrita.
// See docs/research/launch-readiness-gates.md: "ALEG donation flow is confirmed before publishing bank details."
// TODO: confirm with Nirmal/Chitrita before publishing

export const charityProgramSchema = defineType({
  name: "charityProgram",
  title: "Charity program (ALEG)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Program name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Program description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eligibility",
      title: "Eligibility",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Partner organisations. Keep attributions exactly as credited on the existing site.",
    }),
    defineField({
      name: "donationDetails",
      title: "Donation details",
      type: "object",
      description:
        "INTERNAL USE ONLY — do not surface these fields in public page code until confirmed with Nirmal and Chitrita (launch gate: ALEG donation flow confirmed).",
      fields: [
        defineField({
          name: "bankBsb",
          title: "BSB",
          type: "string",
          // TODO: confirm with Nirmal/Chitrita before publishing
        }),
        defineField({
          name: "bankAccount",
          title: "Account number",
          type: "string",
          // TODO: confirm with Nirmal/Chitrita before publishing
        }),
        defineField({
          name: "abn",
          title: "ABN",
          type: "string",
        }),
        defineField({
          name: "dgrNumber",
          title: "DGR number / endorsement",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "odissi-sydney",
  title: "Odissi Sydney",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: site settings
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            // Singleton: charity program
            S.listItem()
              .title("Charity program (ALEG)")
              .id("charityProgram")
              .child(S.document().schemaType("charityProgram").documentId("charityProgram")),
            S.divider(),
            S.documentTypeListItem("class").title("Classes"),
            S.documentTypeListItem("location").title("Locations"),
            S.documentTypeListItem("person").title("People"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("galleryItem").title("Gallery"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemas,
  },
});

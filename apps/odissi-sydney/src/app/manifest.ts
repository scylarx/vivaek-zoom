import type { MetadataRoute } from "next";
import { seo } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.name,
    short_name: seo.shortName,
    description: seo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: seo.colors.background,
    theme_color: seo.colors.background,
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

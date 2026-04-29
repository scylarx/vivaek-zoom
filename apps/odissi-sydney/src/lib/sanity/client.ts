import { createClient } from "@sanity/client";

// Server-only Sanity client.
// Never import this in client components — use it only in Server Components,
// Server Actions, or route handlers.

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

if (!projectId) {
  // Allow the app to start without a project ID during local dev / CI,
  // but log clearly so it isn't silently misconfigured.
  console.warn(
    "[sanity/client] SANITY_PROJECT_ID is not set. Sanity queries will fail until it is configured.",
  );
}

const readToken = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId: projectId ?? "",
  dataset,
  apiVersion,
  useCdn: true,
  // Read token: required for draft previews. Set in Vercel env vars.
  // Not required for published content.
  ...(readToken ? { token: readToken } : {}),
  perspective: "published",
});

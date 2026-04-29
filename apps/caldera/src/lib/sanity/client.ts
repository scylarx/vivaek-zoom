import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

if (!projectId) {
  // In dev without a project ID wired up, warn but don't throw so the app still renders.
  console.warn("[caldera/sanity] SANITY_PROJECT_ID is not set. Queries will return empty results.");
}

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  // Token is server-only — never passed to the client bundle.
  ...(process.env.SANITY_API_READ_TOKEN ? { token: process.env.SANITY_API_READ_TOKEN } : {}),
  perspective: "published",
  stega: false,
});

/**
 * Fetch helper that applies Next.js fetch tags for on-demand revalidation.
 * Use this via the query helpers in queries.ts rather than calling it directly.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags: string[];
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags },
  });
}

import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Note: React Compiler & cacheComponents (formerly PPR) opt-in are evaluated
  // in wave 2 once Sanity content is wired and we can profile real pages.
  // Enable via `reactCompiler: true` (top-level in Next 16) and
  // `cacheComponents: true` (replaces the old experimental.ppr) when ready.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.odissisydney.com" },
    ],
  },
};

export default config;

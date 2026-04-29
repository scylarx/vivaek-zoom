import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import { PlayerProvider } from "@/audio/PlayerProvider";
import "./globals.css";
import { seo, siteUrl } from "./seo";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: seo.name,
  authors: [{ name: seo.name, url: siteUrl }],
  creator: seo.name,
  publisher: seo.name,
  category: "Music events",
  keywords: seo.keywords,
  title: {
    default: seo.title,
    template: "%s · Caldera",
  },
  description: seo.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: seo.name,
    title: seo.ogTitle,
    description: seo.description,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: seo.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.shortDescription,
    images: ["/twitter-image"],
  },
  appleWebApp: {
    capable: true,
    title: seo.shortName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${bricolage.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-hydration: read theme + sensory preferences before paint to avoid flash. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: synchronous <head> script that reads localStorage to avoid theme flash
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}var s=localStorage.getItem('caldera-sensory');if(s==='light'){document.documentElement.setAttribute('data-sensory','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}

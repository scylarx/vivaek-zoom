import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Odissi Sydney — Nirmal Jena | Indian classical dance & music",
    template: "%s · Odissi Sydney",
  },
  description:
    "Authentic Indian classical dance and vocal and instrumental music with master teacher Nirmal Jena in Sydney and the Blue Mountains.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Odissi Sydney",
    title: "Odissi Sydney — Nirmal Jena",
    description:
      "Authentic Indian classical dance and vocal and instrumental music with master teacher Nirmal Jena in Sydney and the Blue Mountains.",
    images: [
      {
        url: "https://www.odissisydney.com/uploads/2/7/4/1/27417917/nirmal-b-w.jpg",
        width: 650,
        height: 433,
        alt: "Black and white portrait of Nirmal Jena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odissi Sydney — Nirmal Jena",
    description:
      "Indian classical dance, voice, and instrumental music in Sydney and the Blue Mountains.",
    images: ["https://www.odissisydney.com/uploads/2/7/4/1/27417917/nirmal-b-w.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${cormorant.variable} ${sourceSerif.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

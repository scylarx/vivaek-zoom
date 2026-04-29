import { ImageResponse } from "next/og";
import { seo } from "./seo";

export const alt = seo.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: seo.colors.background,
        color: seo.colors.foreground,
        fontFamily: "Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 48,
          border: `2px solid ${seo.colors.foreground}`,
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 420,
          height: 420,
          borderRadius: 420,
          background: seo.colors.maroon,
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -100,
          bottom: -130,
          width: 380,
          height: 380,
          borderRadius: 380,
          background: seo.colors.teal,
          opacity: 0.16,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px 96px",
          width: "72%",
        }}
      >
        <div
          style={{
            letterSpacing: 8,
            textTransform: "uppercase",
            fontSize: 24,
            color: seo.colors.teal,
            marginBottom: 36,
          }}
        >
          Sydney · Blue Mountains
        </div>
        <div style={{ fontSize: 84, lineHeight: 0.98, letterSpacing: -2 }}>
          Authentic Odissi and classical music with Nirmal Jena.
        </div>
        <div style={{ marginTop: 34, fontSize: 30, lineHeight: 1.35, color: seo.colors.maroon }}>
          Rigorous tradition. Transformative teaching. Living lineage.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          bottom: 78,
          display: "flex",
          color: seo.colors.foreground,
          fontSize: 26,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        Odissi Sydney
      </div>
    </div>,
    size,
  );
}

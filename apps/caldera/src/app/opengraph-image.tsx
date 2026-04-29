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
        fontFamily: "Inter, Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(8,5,16,1) 0%, rgba(8,5,16,0.94) 48%, rgba(65,16,109,0.58) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 85,
          width: 440,
          height: 440,
          borderRadius: 440,
          border: `3px solid ${seo.colors.blue}`,
          boxShadow: `0 0 70px ${seo.colors.purple}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 150,
          top: 155,
          width: 300,
          height: 300,
          borderRadius: 300,
          border: `3px dashed ${seo.colors.green}`,
          opacity: 0.78,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 260,
          top: 265,
          width: 80,
          height: 80,
          borderRadius: 80,
          border: `5px solid ${seo.colors.green}`,
          background: seo.colors.background,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "74px 84px",
          width: "68%",
          position: "relative",
        }}
      >
        <div
          style={{
            letterSpacing: 9,
            textTransform: "uppercase",
            fontSize: 22,
            color: seo.colors.green,
            marginBottom: 34,
          }}
        >
          Sydney niche music / safe base
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 106,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: -5,
          }}
        >
          <span>Welcome to</span>
          <span style={{ color: seo.colors.blue, fontStyle: "italic" }}>Psydney</span>
        </div>
        <div style={{ marginTop: 34, fontSize: 28, lineHeight: 1.36, color: "#c9c6d3" }}>
          Opt-in sound, good people, and neurodivergent-aware community care.
        </div>
      </div>
    </div>,
    size,
  );
}

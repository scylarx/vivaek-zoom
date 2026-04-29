import { ImageResponse } from "next/og";
import { seo } from "./seo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: seo.colors.background,
        color: seo.colors.foreground,
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 18,
          borderRadius: 180,
          border: `3px solid ${seo.colors.green}`,
        }}
      />
      <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: -6 }}>C</div>
    </div>,
    size,
  );
}

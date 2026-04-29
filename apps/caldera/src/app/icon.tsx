import { ImageResponse } from "next/og";
import { seo } from "./seo";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          inset: 46,
          borderRadius: 420,
          border: `5px solid ${seo.colors.blue}`,
          boxShadow: `0 0 54px ${seo.colors.purple}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 108,
          borderRadius: 300,
          border: `4px dashed ${seo.colors.green}`,
        }}
      />
      <div style={{ fontSize: 190, fontWeight: 800, letterSpacing: -10 }}>C</div>
    </div>,
    size,
  );
}

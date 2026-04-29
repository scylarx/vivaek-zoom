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
        color: seo.colors.maroon,
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 42,
          border: `6px solid ${seo.colors.maroon}`,
        }}
      />
      <div style={{ fontSize: 190, lineHeight: 1, letterSpacing: -12 }}>OS</div>
    </div>,
    size,
  );
}

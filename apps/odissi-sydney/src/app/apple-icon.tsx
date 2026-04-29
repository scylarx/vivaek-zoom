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
        color: seo.colors.maroon,
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ fontSize: 66, lineHeight: 1, letterSpacing: -5 }}>OS</div>
    </div>,
    size,
  );
}

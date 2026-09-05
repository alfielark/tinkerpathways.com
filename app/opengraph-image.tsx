import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: "monospace",
            color: "#3B82F6",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {SITE.charityNumber}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#000000",
            lineHeight: 1.05,
            marginTop: 16,
          }}
        >
          {SITE.name}
        </div>
        <div style={{ fontSize: 36, color: "#6B7280", marginTop: 16 }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}

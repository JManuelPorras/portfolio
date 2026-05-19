import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const runtime = "edge";
export const alt = `${content.identity.shortName} — ${content.identity.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const { identity } = content;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          color: "#fff",
          backgroundImage:
            "linear-gradient(135deg,#0B1A2D 0%,#15304D 40%,#1F3A5F 70%,#27517F 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            color: "#5CC8F5",
            textTransform: "uppercase",
          }}
        >
          {identity.location}
        </div>
        <div style={{ fontSize: 86, fontWeight: 800, marginTop: 16 }}>
          {identity.shortName}
        </div>
        <div style={{ fontSize: 38, color: "#DBE9F6", marginTop: 14 }}>
          {identity.title}
        </div>
        <div
          style={{
            marginTop: 40,
            height: 6,
            width: 260,
            background: "linear-gradient(90deg,#5CC8F5,#7C6DF2)",
            borderRadius: 4,
          }}
        />
        <div style={{ fontSize: 24, color: "#9FC6E8", marginTop: 36 }}>
          github.com/JManuelPorras
        </div>
      </div>
    ),
    size,
  );
}

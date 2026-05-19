import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 84,
          fontWeight: 800,
          color: "#fff",
          background:
            "linear-gradient(135deg,#1F3A5F 0%,#27517F 60%,#5CC8F5 100%)",
          fontFamily: "sans-serif",
        }}
      >
        JM
      </div>
    ),
    size,
  );
}

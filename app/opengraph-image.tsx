import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview on LinkedIn, Upwork, Slack and X. Built with ImageResponse so
 * it stays in sync with content/site.ts and ships no external assets — satori
 * supports flexbox only, no grid.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#fafafa",
            }}
          >
            {site.role}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 24,
              fontSize: 34,
              color: "#a1a1aa",
            }}
          >
            {site.stack.join("  ·  ")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #27272a",
            paddingTop: 28,
            fontSize: 25,
            color: "#a1a1aa",
          }}
        >
          <div style={{ display: "flex", maxWidth: "68%" }}>
            {site.valueProp}
          </div>
          <div style={{ display: "flex", flexShrink: 0, color: "#60a5fa" }}>
            {site.availability}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

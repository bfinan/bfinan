import React from "react";
import Link from "next/link";

export default function MicroPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2.2rem" }}>Micro (Mini Crossword)</h1>
      <p style={{ fontSize: "1.1rem", marginTop: "1rem", maxWidth: 600 }}>
        Placeholder: This will become a NYTimes mini-style crossword puzzle. For now, content is coming soon.
      </p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
          Back to home
        </Link>
      </p>
    </div>
  );
}

import React from "react";
import Link from "next/link";

export default function NowPage() {
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
      <h1 style={{ fontSize: "2.2rem" }}>What I'm Working On Now</h1>
      <div style={{ marginTop: "2rem", maxWidth: 600 }}>
        <li>
            Training for the <Link href="https://www.desmoinesmarathon.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", textDecoration: "underline" }}>Des Moines Marathon </Link>on October 19
        </li>
        <li>
            Polishing up <Link href="https://sokalink.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", textDecoration: "underline" }}>Sokalink</Link> and learning more about modern web development
        </li>
        <li>
            Testing out some software tools I haven't used before (Linear, Cursor, Vercel, Supabase, Claude Code)
        </li>
        <li>
            Working on a couple of other side projects
        </li>
        <li>
            Reading fiction with my book club - currently True Grit by Charles Portis
        </li>
        <li>
            Reading non-fiction, usually pop psychology books - currently "Never Split the Difference" by Chris Voss
        </li>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

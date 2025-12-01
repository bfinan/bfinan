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
      <h3 style={{ color: "#666" }}>updated 2025-12-01</h3>
      <div style={{ marginTop: "2rem", maxWidth: 600 }}>
        <li>
            Training for the <Link href="https://www.marathon.tokyo/en/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Tokyo Marathon</Link> on March 1
        </li>
        <li>
          Assembling my <Link href="https://docs.google.com/document/d/19QiG39nPI3nltA4SWrewXhPVZm5mbPobMRdxv24uoxs" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">itinerary for the Japan trip</Link>
        </li>
        <li>
            Polishing up <Link href="https://sokalink.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Sokalink</Link> and learning more about modern web development
        </li>
        <li>
            Testing out some software tools I haven't used before (Linear, Cursor, Vercel, Supabase)
        </li>
        <li>
            Working on a couple of other side projects
        </li>
        <li>
           Brushing up on Spanish
        </li>
        <li>
            Reading non-fiction, usually pop psychology books - currently "The Defining Decade" by Meg Jay
        </li>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

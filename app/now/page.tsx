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
      <h3 style={{ color: "#666" }}>updated 2025-01-01</h3>
      <div style={{ marginTop: "2rem", maxWidth: 600 }}>
        <li>
            Training for the <Link href="https://www.marathon.tokyo/en/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Tokyo Marathon</Link> on March 1
        </li>
        <li>
          Assembling my <Link href="https://docs.google.com/document/d/19QiG39nPI3nltA4SWrewXhPVZm5mbPobMRdxv24uoxs" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">itinerary for the Japan trip</Link>
        </li>
        <li>
          Working on my Kleros Fellowship project, <Link href="https://docs.google.com/document/d/1fwKC_P2cv28VKaOwNOHYWpIFeQW8dGt6JDrcpt4CQRA/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Curating Sources of AI-Generated Content</Link>
        </li>
        <li>
            Putting polish on <Link href="https://sokalink.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Sokalink</Link> and a couple other side projects
        </li>
        <li>
            Continuing to learn more about Cursor, Vercel, Supabase
        </li>
        <li>
           Brushing up on Spanish
        </li>
        <li>
          Trying to do more push-ups so that my arms don't atrophy from too much cardio
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

import React from "react";
import Link from "next/link";


export default function Home() {
  return (
    <div
      className="px-4 sm:px-6"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1 className="text-3xl sm:text-4xl">Brendan Finan</h1>
      <h2 className="px-2 sm:px-0 max-w-2xl" style={{ fontSize: "1.1rem" }}>I&apos;m a <Link href="/software" className="text-blue-600 dark:text-blue-400 underline">software developer</Link> and <Link href="/run" className="text-blue-600 dark:text-blue-400 underline">runner</Link>, currently based in Des Moines, Iowa.</h2>
      <p style={{ marginTop: "1rem" }}>
        Here&apos;s what I&apos;m working on{" "}
        <Link href="/now" className="text-blue-600 dark:text-blue-400 underline">
          now
        </Link>
        .
      </p>
      {/* Social links block */}
      <div style={{ marginTop: "2rem", fontSize: "1.1rem" }}>
        <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem", fontWeight: 500 }}>
          Find me on:
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 px-4">
          <a
            href="https://discordapp.com/users/223324579391733770"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Discord
          </a>
          <a
            href="https://twitter.com/brendanfinan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/brendan-finan-77a09ab3/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            LinkedIn
          </a>
          <a
            href="https://www.strava.com/athletes/52423920"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Strava
          </a>
          <a
            href="https://github.com/bfinan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            GitHub
          </a>
          <a
            href="https://manifold.markets/BrendanFinan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Manifold
          </a>
        </div>
      </div>
    </div>
  );
}

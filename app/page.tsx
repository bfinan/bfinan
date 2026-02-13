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
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-center w-full max-w-[42rem]">

        <div style={{ textAlign: "center", minWidth: 0 }}>
          <h1 className="text-3xl sm:text-4xl">Brendan Finan</h1>
          <h2 className="px-2 sm:px-0 max-w-2xl" style={{ fontSize: "1.1rem" }}>
            I&apos;m a <Link href="/software" className="text-blue-600 dark:text-blue-400 underline">software developer</Link> and <Link href="/run" className="text-blue-600 dark:text-blue-400 underline">runner</Link>, currently based in Des Moines, Iowa.
          </h2>
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
                href="https://brendanfinan.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Substack
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
              <a
                href="https://sokalink.com/bfinan.py"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Sokalink
              </a>
            </div>
            <div style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">
                Contact info
              </Link>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}

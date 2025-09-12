import React from "react";


export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem" }}>Brendan Finan&apos;s website</h1>
      <h2>I&apos;m a software developer and <a href="/run">runner</a>, currently based in Des Moines, Iowa.</h2>
      <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
        Here&apos;s what I&apos;m working on{" "}
        <a href="/now" style={{ color: "#0070f3", textDecoration: "underline" }}>
          now
        </a>
        .
      </p>
      {/* Social links block */}
      <div style={{ marginTop: "2rem", fontSize: "1.1rem" }}>
        <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem", fontWeight: 500 }}>
          Find me on:
        </div>
        <a
          href="https://discordapp.com/users/223324579391733770"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          Discord
        </a>
        <a
          href="https://twitter.com/brendanfinan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          Twitter
        </a>
        <a
          href="https://www.linkedin.com/in/brendan-finan-77a09ab3/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          LinkedIn
        </a>
        <a
          href="https://www.strava.com/athletes/52423920"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          Strava
        </a>
        <a
          href="https://github.com/bfinan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          GitHub
        </a>
                <a
          href="https://manifold.markets/BrendanFinan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          Manifold Markets
        </a>
      </div>
    </div>
  );
}

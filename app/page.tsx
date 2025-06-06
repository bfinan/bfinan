import React from "react";

export default function Home() {
  const showManifestMsg = new Date() < new Date("2025-07-31");
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
 
      {showManifestMsg && (
        <div>
          <p style={{ fontSize: "1.1rem" }}>
            If you&apos;re reading this, we probably met (or could meet!) at{" "}
            <a
              href="https://manifest.is"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              Manifest
            </a>
            .
          </p>
          <p style={{ fontSize: "1.1rem" }}>
            If we haven&apos;t met yet, here&apos;s a link to my {" "}
            <a
              href="https://www.writehaven.space/e/manifest-2025/profiles/brendan-finan"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
               Writehaven profile
            </a>. Hit me up if you want to chat!
          </p>
        </div>
      )}
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
          href="https://manifold.markets/BrendanFinan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          Manifold
        </a>
        <a
          href="mailto:brendanfinan@proton.me"
          style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "1.5rem" }}
        >
          Email
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
          LinkedIn (🤮)
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
      </div>
    </div>
  );
}

import React from "react";


export default function RunPage() {
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
      <h1 style={{ fontSize: "2.2rem" }}>Running</h1>
      <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
        Running info
      </p>
      {/* Example placeholder content */}
      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Recent Races</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>
          <li>Des Moines Half Marathon 2024 (coming soon!)</li>
          <li>Example 10K Race</li>
        </ul>
      </div>
      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Favorite Running Resources</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>
          <li>
            <a href="https://www.strava.com/athletes/52423920" target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", textDecoration: "underline" }}>
              My Strava Profile
            </a>
          </li>
          <li>
            <a href="#" style={{ color: "#0070f3", textDecoration: "underline" }}>
              Example Training Plan
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

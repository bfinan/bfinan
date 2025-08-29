import React from "react";

export default function PokerPage() {
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
      <h1 style={{ fontSize: "2.2rem" }}>Poker</h1>
      <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
        Welcome to my poker page! More content coming soon.
      </p>
      {/* Recommended Reading */}
      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.4rem" }}>Recommended Reading</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>
          <li>
            <a href="#" style={{ color: "#0070f3", textDecoration: "underline" }}>
              Example Poker Article 1
            </a>
          </li>
          <li>
            <a href="#" style={{ color: "#0070f3", textDecoration: "underline" }}>
              Example Poker Article 2
            </a>
          </li>
        </ul>
      </div>
      {/* Recommended Books */}
      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.4rem" }}>Recommended Books</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>
          <li>Example Poker Book 1</li>
          <li>Example Poker Book 2</li>
        </ul>
      </div>
    </div>
  );
}

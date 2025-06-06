import React from "react";

export default function About() {
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
      <h1 style={{ fontSize: "2rem" }}>About Brendan Finan</h1>
      <p style={{ fontSize: "1.1rem", maxWidth: 600 }}>
        Hi, I'm Brendan Finan. This is a placeholder for my bio and background. Here you'll eventually find more about my interests, work, and projects.
      </p>
    </div>
  );
}

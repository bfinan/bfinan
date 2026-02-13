import React from "react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "36rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Contact Info</h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Email
        </h2>
        <p style={{ marginTop: "0.5rem", lineHeight: 1.6 }}>
          If you&apos;re already on my personal website, I&apos;m probably interested in hearing from you!
        </p>
        <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
          Unfortunately due to the presence of automated spam bots, I can&apos;t put my email on here. My hunch is that you already have my email address or a way of contacting me. If you don&apos;t have my email address, you&apos;ll find it if you look hard enough.
        </p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Send me Anonymous Feedback
        </h2>
        <p style={{ marginTop: "0.5rem", lineHeight: 1.6 }}>
          You can also{" "}
          <Link href="https://www.admonymous.co/brendanfinan" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
            send me anonymous feedback anytime using Admonymous
          </Link>
          !
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

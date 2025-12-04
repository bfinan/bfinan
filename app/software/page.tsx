import React from "react";
import Link from "next/link";


export default function SoftwarePage() {
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
      <h1 style={{ fontSize: "2.2rem" }}>Software Development</h1>
      <div style={{ marginTop: "2rem", maxWidth: 900, width: "100%", padding: "0 1rem" }}>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <h2 style={{ fontSize: "1.5rem" }}>Join the <Link href="https://discord.gg/9bnnADkkY3" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Des Moines Tech Discord</Link></h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", marginTop: "1rem" }}>
              I'm building a new Discord server to discuss the tech industry and scene in Des Moines. 
              If you're interested in tech (not just software!), come <Link href="https://discord.gg/9bnnADkkY3" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">join us</Link> to learn more about events, 
              job opportunities, and projects happening in the Des Moines metro. All are welcome!
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <iframe 
              src="https://discord.com/widget?id=1431544009058160684&theme=dark" 
              width="350" 
              height="300" 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="w-full max-w-[350px] mx-auto md:mx-0"
              style={{ maxWidth: "350px" }}
            ></iframe>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Recent Projects</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>
          <li>
            <Link href="https://sokalink.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Sokalink
            </Link> - One-click social link sharing, feed, and browser extension
          </li>
          <li>
            <Link href="/project/pacer" className="text-blue-600 dark:text-blue-400 underline">
              Reading Pacer
            </Link> - Timer to help read at a consistent pace
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>My Development</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
          I'm a software developer by trade. The first language I learned was Python, and Python is still the language I use the most and recommend for beginners and experts alike. I also have professional experience with C#/.NET, Java, and Bash. You can read more about my experience on my <Link href="https://www.linkedin.com/in/brendan-finan-77a09ab3/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">LinkedIn</Link>.
        </p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

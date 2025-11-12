import React from "react";
import Link from "next/link";


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

        <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Des Moines Area Run Clubs</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>

           <li>
            <Link href="https://www.fleetfeet.com/s/desmoines/weekly%20runs/weekly-social-runs?srsltid=AfmBOorsE_Zn4EujvtD_RTCDSp8yOZqniPHlo3KcX4PsaqQcm4VFDbMY" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Fleet Feet Social Run
            </Link>
          </li>
          I highly recommend the Thursday Fleet Feet social run! This is the best way to meet other runners in the Des Moines area. <br />


          <li>
            <Link href="https://www.capitalstriders.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Capital Striders
            </Link>
            <br></br>
            This is the more "official" Des Moines running club. Great way to meet people to train and race with.
          </li>

          <li>
            <Link href="https://www.facebook.com/profile.php?id=100092743729094" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              515 Run Club
            </Link>
            <br></br>
          </li>

        </ul>
      </div>

        <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Recommended books</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>

          <li>
            <Link href="https://www.goodreads.com/book/show/146115.The_Complete_Book_of_Running" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              The Complete Book of Running by Jim Fixx
            </Link>
          <br></br> - famous book that kicked off the modern age of distance running. Contains a lot of good advice about how to get started
            
          </li>

          <li>
            <Link href="https://www.goodreads.com/book/show/41817453-the-rise-of-the-ultra-runners" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Rise of the Ultra Runners by Adharanand Finn
            </Link>
          <br></br> - The author falls down the rabbithole of ultra running. A fun vicarious read that gives insight into the appeal of ultra running

          </li>
        </ul>
      </div>


      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Recommended links</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>

          <li>
            <Link href="https://www.halhigdon.com/training/marathon-training/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Higdon's Marathon Training Plans
            </Link>
          </li>
          <li>
            <Link href="https://defy.org/hacks/calendarhack" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Marathon training plans with automatic calendar scheduling
            </Link>
          </li>
          <li>
            <Link href="https://runbundle.com/tools/weight-vs-pace-calculator" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Weight vs. Pace Calculator
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem", maxWidth: 500 }}>
        <h2 style={{ fontSize: "1.3rem" }}>My running</h2>
        <ul style={{ textAlign: "left", margin: "0 auto", fontSize: "1.1rem" }}>

          <li>
            <Link href="https://docs.google.com/spreadsheets/d/12TPmxvg2N7lU8ecoWOOf9fEJMlvpujgjFGp88pmrgwM/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              List of marathons I've done
            </Link>
          </li>
          <li>
            <Link href="https://www.strava.com/athletes/52423920" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              My Strava profile
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

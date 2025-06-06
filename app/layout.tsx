import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Brendan Finan",
  description: "Brendan Finan's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}

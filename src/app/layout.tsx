import type { Metadata } from "next";
import { Varela as Font } from "next/font/google";
import "./globals.css";

const font = Font({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Random Name Generator",
  description: "Generate a random unique names.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}

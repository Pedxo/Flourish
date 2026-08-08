import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flourish — design and creative collective",
  description: "Flourish is a design and creative collective for industries",
  icons: {
    icon: { url: "/logo.png", sizes: "32x32", type: "image/png" },
    shortcut: { url: "/logo.png", sizes: "32x32", type: "image/png" },
    apple: { url: "/logo.png", sizes: "32x32", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

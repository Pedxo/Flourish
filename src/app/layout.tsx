import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({ 
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: "Flourish- Design and creative collective for industries",
  description: "Flourish is a creative collective.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} antialiased selection:bg-black selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

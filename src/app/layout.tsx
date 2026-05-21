import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claudefun.syntaxskills.com"),
  title: "ClaudeFun | Fancy Claude configurations",
  description: "Fancy, useful, and funny Claude configuration packs by Syntax Skills.",
  openGraph: {
    title: "ClaudeFun",
    description: "Fancy and fun Claude configuration packs by Syntax Skills.",
    url: "https://claudefun.syntaxskills.com",
    siteName: "ClaudeFun",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

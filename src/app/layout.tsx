import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SmoothScrollInit from "@/components/SmoothScrollInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archidex | Premium Architecture & Construction",
  description:
    "Premium architecture and construction services. Building your vision with precision and excellence.",
  keywords: ["architecture", "construction", "premium", "design", "building"],
  authors: [{ name: "Archidex" }],
  openGraph: {
    title: "Archidex | Premium Architecture & Construction",
    description:
      "Premium architecture and construction services. Building your vision with precision and excellence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <SmoothScrollInit />
        <Navbar />
        <main className="pt-16 lg:pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

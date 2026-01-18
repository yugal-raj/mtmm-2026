import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mtmm2026.website"),
  title: "Modern Trends in Molecular Magnetism (MTMM)",
  description:"Official website of Modern Trends in Molecular Magnetism 2026 (MTMM 2026). Find event details, schedule, registration, speakers, and updates.",
  authors: [{ name: "Yugal Raj Deka", url:"https://github.com/yugal-raj" }],
  verification: {
    google: [
      "XSt2hBQFpBCyDOU3FCeXUsO02MxWuIPz_ED3kFXGcHM",
      "5X9-1mmrJmBeFFy0H75qGawr3SmJretsf_kYr6EaG7c"
    ]
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Modern Trends in Molecular Magnetism (MTMM)",
    description:
      "International conference on Modern Trends in Molecular Magnetism (MTMM 2026), hosted by Tezpur University, Assam, India.",
    url: "https://mtmm2026.website",
    siteName: "MTMM 2026",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white overflow-x-hidden overflow-y-hidden`}
      >
        <Navbar />
        <main className="overflow-y-auto">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}

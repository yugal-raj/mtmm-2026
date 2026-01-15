import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";
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
  title: "MTMM 2026 | Modern Trends in Molecular Magnetism 2026",
  description:"Official website of MTMM 2026 – Modern Trends in Molecular Magnetism 2026. Find event details, schedule, registration, speakers, and updates.",
  authors: [{ name: "Yugal Raj Deka", url:"https://github.com/yugal-raj" }],
  verification: {
    google: "XSt2hBQFpBCyDOU3FCeXUsO02MxWuIPz_ED3kFXGcHM"
  }
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

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
  title: "Modern Trends in Molecular Magetism",
  description: "International conference on Modern Trends in Molecular Magnetism, hosted by Tezpur University. Explore keynote talks, research presentations, and scientific discussions.",
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Analytics from "./components/analytics";
import Schema from "./components/schema";
import { Suspense } from "react";
import GoogleTagManager from './components/GoogleTagManager';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Sheets Master | Google Sheets Templates to Save Time & Stay Organized",
  description:
    "Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!",
  keywords:
    "google sheets templates, budget tracker, finance templates, productivity sheets, free templates, business templates",
  authors: [{ name: "Sheets Master" }],
  category: "Productivity",
  creator: "Sheets Master",
  publisher: "Sheets Master",
  alternates: {
    canonical: "https://sheetsmaster.co/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          property="og:title"
          content="Sheets Master | Google Sheets Templates to Save Time & Stay Organized"
        />
        <meta
          property="og:description"
          content="Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!"
        />
        <meta property="og:image" content="/preview-image.png" />
        <meta property="og:url" content="https://sheetsmaster.co/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sheets Master | Google Sheets Templates to Save Time & Stay Organized"
        />
        <meta
          name="twitter:description"
          content="Download Google Sheets templates for budgeting, finance, business, and productivity."
        />
        <meta name="twitter:image" content="/preview-image.png" />
        <Suspense fallback={null}>
          <Analytics />
          <Schema />
        </Suspense>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      > {/* ADD YOUR GTM COMPONENT HERE with your ID */}
        <GoogleTagManager gtmId="GTM-WGJVWFS5" />
        <Navbar />{" "}
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <main className="flex-grow">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}

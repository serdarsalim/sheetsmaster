import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AnalyticsWrapper from "./components/analytics-wrapper";
import SchemaWrapper from "./components/schema-wrapper";
import { Suspense } from "react";
import { ThemeProvider } from "./theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sheets Master | Google Sheets Templates to Save Time & Stay Organized",
  description: "Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!",
  keywords: "google sheets templates, budget tracker, finance templates, productivity sheets, free templates, business templates",
  authors: [{ name: "Sheets Master" }],
  category: "Productivity",
  creator: "Sheets Master",
  publisher: "Sheets Master",
  alternates: {
    canonical: "https://sheetsmaster.co/",
  },
  openGraph: {
    title: "Sheets Master | Google Sheets Templates to Save Time & Stay Organized",
    description: "Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!",
    url: "https://sheetsmaster.co/",
    siteName: "Sheets Master",
    images: [{
      url: "/preview-image.png",
      width: 1200,
      height: 630,
      alt: "Sheets Master - Google Sheets Templates"
    }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheets Master | Google Sheets Templates to Save Time & Stay Organized",
    description: "Download Google Sheets templates for budgeting, finance, business, and productivity.",
    images: ["/preview-image.png"],
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
        <Suspense fallback={null}>
          <AnalyticsWrapper />
          <SchemaWrapper />
        </Suspense>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
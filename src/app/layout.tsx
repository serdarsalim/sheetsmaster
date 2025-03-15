import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Analytics from "./components/analytics";
import Schema from "./components/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sheetsmaster.co'),
  title: {
    template: '%s | Sheets Master',
    default: 'Google Sheets Templates to Save Time & Stay Organized | Sheets Master',
  },
  description: 'Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!',
  keywords: 'google sheets templates, budget tracker, finance templates, productivity sheets, free templates, business templates',
  authors: [{ name: 'Sheets Master' }],
  category: 'Productivity',
  creator: 'Sheets Master',
  publisher: 'Sheets Master',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Sheets Master',
    title: 'Best in Class Google Sheets Templates for Personal Finance and more',
    description: 'Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!',
    images: [
      {
        url: '/preview-image.png',
        width: 1200,
        height: 630,
        alt: 'Sheets Master - Google Sheets Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Sheets Templates to Save Time & Stay Organized',
    description: 'Download Google Sheets templates for budgeting, finance, business, and productivity.',
    images: ['/preview-image.png'],
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
        <Schema />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from './components/navbar';
import Footer from "./components/footer";

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
  authors: [{ name: "Sheets Master" }], // Already correct
  category: "Productivity",
  creator: "Sheets Master", // Already correct
  publisher: "Sheets Master", // Already correct
  alternates: {
    canonical: "https://sheetsmaster.co/", // Update to new domain
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <meta property="og:title" content="Sheets Master | Google Sheets Templates to Save Time & Stay Organized" />
  <meta property="og:description" content="Download Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!" />
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

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-H753YXSDWD"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H753YXSDWD', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
       
        <Script
          id="schema-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Sheets Master Google Sheets Templates",
              description:
                "High-quality Google Sheets templates for budgeting, finance, business, and productivity",
              itemListElement: [
                {
                  "@type": "Product",
                  name: "Budget Tracker",
                  description:
                    "Manage your monthly budget and control your spending over multiple years",
                  offers: {
                    "@type": "Offer",
                    price: "20.00",
                    priceCurrency: "USD",
                  },
                },
                {
                  "@type": "Product",
                  name: "Subscription Tracker",
                  description:
                    "Track all your subscriptions and fixed expenses effortlessly",
                  offers: {
                    "@type": "Offer",
                    price: "10.00",
                    priceCurrency: "USD",
                  },
                },
             
              ],
            }),
          }}
        />

        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sheets Master", 
              url: "https://sheetsmaster.co",
              logo: "https://sheetsmaster.co/logo.png", 
              sameAs: [
                "https://youtube.com/@SheetsMAsterOfficial",
                "https://twitter.com/GSheetsMaster",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar /> 
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

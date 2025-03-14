import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Google Sheets Templates | Save Time & Stay Organized",
  description: "Download premium Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!",
  keywords: "google sheets templates, budget tracker, finance templates, productivity sheets, free templates, business templates",
  authors: [{ name: "Premium Sheets" }],
  category: "Productivity",
  creator: "Premium Sheets",
  publisher: "Premium Sheets",
  alternates: {
    canonical: "https://premiumsheets.netlify.app/",
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
        <meta property="og:title" content="Premium Google Sheets Templates | Save Time & Stay Organized" />
        <meta property="og:description" content="Download premium Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!" />
        <meta property="og:image" content="/preview-image.png" />
        <meta property="og:url" content="https://premiumsheets.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Google Sheets Templates | Save Time & Stay Organized" />
        <meta name="twitter:description" content="Download premium Google Sheets templates for budgeting, finance, business, and productivity." />
        <meta name="twitter:image" content="/preview-image.png" />

        

        {/* Google Analytics */}
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
  {/* Add Schema.org Product Data */}
  <Script
          id="schema-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Premium Google Sheets Templates",
              "description": "High-quality Google Sheets templates for budgeting, finance, business, and productivity",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Budget Tracker",
                  "description": "Manage your monthly budget and control your spending over multiple years",
                  "offers": {
                    "@type": "Offer",
                    "price": "20.00",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "Product",
                  "name": "Subscription Tracker",
                  "description": "Track all your subscriptions and fixed expenses effortlessly",
                  "offers": {
                    "@type": "Offer",
                    "price": "10.00",
                    "priceCurrency": "USD"
                  }
                }
                // Add more templates if desired
              ]
            })
          }}
        />

  {/* Add Organization Schema RIGHT HERE */}
  <Script
    id="schema-organization"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Premium Sheets",
        "url": "https://premiumsheets.netlify.app",
        "logo": "https://premiumsheets.netlify.app/logo.png",
        "sameAs": [
          "https://youtube.com/@PremiumSheets",
          "https://twitter.com/premiumgsheets"
        ]
      })
    }}
  />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
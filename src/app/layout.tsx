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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
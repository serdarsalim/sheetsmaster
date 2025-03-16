'use client';

import { Suspense } from 'react';
import Script from 'next/script';
import { useTemplates } from '../hooks/templateService';
import { usePathname } from 'next/navigation';

function SchemaContent() {
  const { templates } = useTemplates();
  const pathname = usePathname();
  
  // Function to convert relative URLs to absolute URLs
  const getAbsoluteUrl = (relativeUrl) => {
    // Base URL for the site
    const baseUrl = "https://sheetsmaster.co";
    
    // Check if the URL is already absolute
    if (!relativeUrl || relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
      return relativeUrl || `${baseUrl}/default-template.png`;
    }
    
    // Make sure relativeUrl starts with a slash
    const normalizedRelativeUrl = relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`;
    
    // Combine base URL with relative URL
    return `${baseUrl}${normalizedRelativeUrl}`;
  };
  
  // Create CollectionPage schema for template catalog
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Google Sheets Templates Collection | Sheets Master",
    "description": "Curated collection of high-quality Google Sheets templates for budgeting, finance, business, and productivity.",
    "url": "https://sheetsmaster.co",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": templates.map((template, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": template.name,
          "description": template.description,
          "image": getAbsoluteUrl(template.image),
          "applicationCategory": "SpreadsheetApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": template.isPaid ? template.price.replace(/[^0-9.]/g, '') : "0.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/OnlineOnly",
            "url": template.isPaid ? template.buyUrl : template.freeUrl
          }
        }
      }))
    }
  };

  // Organization schema for your brand
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sheets Master", 
    "url": "https://sheetsmaster.co",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sheetsmaster.co/logo.png",
      "width": "180",
      "height": "180"
    }, 
    "sameAs": [
      "https://youtube.com/@SheetsMAsterOfficial",
      "https://twitter.com/GSheetsMaster",
    ],
    "description": "Sheets Master provides high-quality Google Sheets templates to save time and stay organized."
  };

  // WebSite schema for better SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://sheetsmaster.co",
    "name": "Sheets Master",
    "description": "Google Sheets Templates to Save Time & Stay Organized",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sheetsmaster.co/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Add webpage schema for the current page
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `https://sheetsmaster.co${pathname}`,
    "name": pathname === "/" 
      ? "Sheets Master | Google Sheets Templates to Save Time & Stay Organized" 
      : `${pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2)} | Sheets Master`,
    "description": "Discover Google Sheets templates for budgeting, finance, business, and productivity. Save time and get organized today!",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Sheets Master",
      "url": "https://sheetsmaster.co"
    }
  };

  return (
    <>
      <Script
        id="schema-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema)
        }}
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema)
        }}
      />
    </>
  );
}

export default function Schema() {
  return (
    <Suspense fallback={null}>
      <SchemaContent />
    </Suspense>
  );
}
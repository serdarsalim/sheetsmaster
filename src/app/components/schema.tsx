'use client';

import Script from 'next/script';
import { useTemplates } from '../hooks/useTemplates'; 

export default function Schema() {
  const { templates } = useTemplates();
  
  // Create product schema items from templates
  const schemaItems = templates.map(template => ({
    "@type": "Product",
    "name": template.name,
    "description": template.description,
    "image": template.image,
    "offers": {
      "@type": "Offer",
      "price": template.isPaid ? template.price.replace(/[^0-9.]/g, '') : "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }));

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Sheets Master Google Sheets Templates",
    "description": "High-quality Google Sheets templates for budgeting, finance, business, and productivity",
    "itemListElement": schemaItems
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sheets Master", 
    "url": "https://sheetsmaster.co",
    "logo": "https://sheetsmaster.co/logo.png", 
    "sameAs": [
      "https://youtube.com/@SheetsMAsterOfficial",
      "https://twitter.com/GSheetsMaster",
    ]
  };

  return (
    <>
      <Script
        id="schema-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />

      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
    </>
  );
}
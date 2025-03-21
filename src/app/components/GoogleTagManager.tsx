import React from 'react';
import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId: string; // Your GTM ID: "GTM-WGJVWFS5"
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
  // Replace "GTM-WGJVWFS5" in your layout.tsx when using this component:
  // <GoogleTagManager gtmId="GTM-WGJVWFS5" />
  
  if (!gtmId) return null;

  return (
    <>
      {/* Google Tag Manager - Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Tag Manager - NoScript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
};

export default GoogleTagManager;
import { Suspense } from "react";
import HomeContent from "./components/home-content";
import { getTemplates } from "./lib/templates-server";
import Script from "next/script";

export default async function Home() {
  // Fetch templates on the server
  const templates = await getTemplates();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          content: "",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px), " +
            "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px 98%), " +
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px 98%)",
          backgroundSize: "5% 5%, 2% 2%, 100% 100%, 100% 100%",
          backgroundPosition: "0 0, 0 0, 5% 0, 0 5%",
        }}
      ></div>

      {/* Inject initial data into the page */}
      <Script
        id="initial-data"
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_DATA__ = ${JSON.stringify({
            templates,
          })};`,
        }}
        strategy="beforeInteractive"
      />

      {/* Wrap client-interactive content in Suspense */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </div>
  );
}
import { Suspense } from "react";
import AboutContent from "../components/about-content";

export const metadata = {
  title: 'About Sheets Master | Google Sheets Templates',
  description: 'Learn about Sheets Master, your source for high-quality Google Sheets templates for personal finances, productivity, and more.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Grid Background - Rendered on the server */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="w-full h-full grid grid-cols-12"
          style={{ gridTemplateRows: "repeat(24, 1fr)" }}
        >
          {Array.from({ length: 288 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-400 dark:border-gray-600"
            />
          ))}
        </div>
      </div>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <AboutContent />
      </Suspense>
    </div>
  );
}
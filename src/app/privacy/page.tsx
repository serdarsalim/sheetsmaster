"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 dark:bg-gray-900 shadow-md backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-white">Simplify Labs</h1>
          <div className="space-x-6">
            <a href="/" className="text-gray-300 hover:text-white transition">
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-white transition">
              About
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 min-h-[28vh] select-none">
        <motion.div
          className="relative z-10 max-w-4xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-extrabold tracking-tight"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-lg mt-6 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Last Updated: [Insert Date]
          </motion.p>
        </motion.div>

        <motion.div className="relative z-10 max-w-4xl text-left text-gray-800 dark:text-gray-300 space-y-6">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Information We Collect</h2>
            <p>
              We collect minimal data necessary for improving our services. This may include:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Contact information if you reach out to us (e.g., email address).</li>
              <li>Basic analytics data (e.g., site visits, downloads).</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
            <p>Your data is used for:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Providing customer support.</li>
              <li>Improving website performance.</li>
              <li>Sending occasional updates if you opt-in.</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Data Sharing & Third Parties</h2>
            <p>
              We do <strong>not</strong> sell, rent, or share your personal information. 
              Third-party tools (like analytics providers) may collect non-identifiable browsing data.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Your Data Protection Rights</h2>
            <p>You can request:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Access to your stored data.</li>
              <li>Data deletion upon request.</li>
              <li>To opt out of tracking (where applicable).</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Cookies & Tracking</h2>
            <p>
              We may use cookies for functionality and analytics. You can disable cookies via your browser settings.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of our services means you accept any changes.
            </p>
          </motion.section>

         
        </motion.div>
      </main>


      <footer className="mt-auto p-6 text-center bg-gray-100 text-gray-600 text-sm border-t border-gray-200">
  <div className="flex justify-center gap-4 mb-2">
    <a href="/" className="hover:text-gray-800 transition-colors">Home</a>
    <a href="/about" className="hover:text-gray-800 transition-colors">About</a>
    <a href="/terms" className="hover:text-gray-800 transition-colors">Terms of Service</a>
    <a href="/privacy" className="hover:text-gray-800 transition-colors">Privacy Policy</a>
  </div>
  <p>© {new Date().getFullYear()} Premium Sheets. All Rights Reserved.</p>
</footer>

    </div>
  );
}
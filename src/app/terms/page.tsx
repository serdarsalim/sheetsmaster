"use client";
import { motion } from "framer-motion";

export default function Terms() {
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
            Terms and Conditions
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. License & Usage Rights</h2>
            <p>Purchasing a premium template grants <strong>you</strong> a <strong>non-transferable, single-user license</strong>.</p>
            <ul className="list-disc list-inside mt-2">
              <li>You <strong>may not</strong> resell, redistribute, or share premium templates.</li>
              <li>Free templates can be shared but must not be resold or rebranded.</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. Restrictions on Distribution</h2>
            <p>
              You <strong>cannot</strong> upload, share, or distribute premium templates on forums, cloud storage, or social media.
              Additional licenses must be purchased for multiple users within a business.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Refund Policy</h2>
            <p>All sales are final due to the nature of digital products. If you experience technical issues, contact us for support.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Intellectual Property Rights</h2>
            <p>All templates and branding remain the <strong>intellectual property</strong> of Simplify Labs.</p>
            <p>Unauthorized reproduction, modification, or distribution is strictly prohibited.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Disclaimer & Liability</h2>
            <p>Templates are provided <strong>as-is</strong> without warranties.</p>
            <p>We are not responsible for any financial loss, errors, or damages caused by using our templates.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of our templates means you accept the latest version.</p>
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


"use client";
import { motion } from "framer-motion";

export default function About() {
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
          className="relative z-10 max-w-4xl mb-12" // Add margin-bottom here
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl font-extrabold tracking-tight"
            style={{
              fontFamily:
                "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.025em",
            }}
            whileHover={{
              scale: 1.03,
              textShadow: "0 0 12px rgba(255,255,255,0.25)",
              transition: { duration: 0.3 },
            }}
          >
            About Simplify Labs
          </motion.h1>

          <motion.p
            className="text-lg mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Simplify Labs is dedicated to providing high-quality, ready-to-use Google Sheets templates that help streamline your workflow and save you hours of setup time. Our templates are designed with both functionality and aesthetics in mind, ensuring that you can manage your tasks efficiently and effectively.
          </motion.p>

          <motion.p
            className="text-lg mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Our mission is to simplify your life by offering tools that enhance productivity, organization, and financial management. Whether you're tracking your budget, managing projects, or setting personal goals, our templates are here to support you every step of the way.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative z-10 max-w-4xl"
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
            Contact Us
          </motion.h1>

          <motion.p
            className="text-lg mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have questions? Reach out via email:
          </motion.p>

          <motion.a
            href="mailto:your-email@example.com"
            className="mt-4 inline-block text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            your-email@example.com
          </motion.a>
        </motion.div>
      </main>

      <footer className="relative z-10 p-6 text-center bg-gray-800 text-gray-300 text-sm border-t border-gray-700 mt-12">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a> 
          <a href="/about" className="hover:text-white transition-colors">
  Terms of Service
</a>
<a href="/about" className="hover:text-white transition-colors">
  Privacy Policy
</a>
          
        </div>
        <p>© {new Date().getFullYear()} Simplify Labs. All Rights Reserved.</p>
        <p className="mt-2">
          Professionally designed Google Sheets templates for your productivity needs.
        </p>
      </footer>
    </div>
  );
}
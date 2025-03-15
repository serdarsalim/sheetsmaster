"use client";

import { Suspense } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <NotFoundContent />
      </Suspense>
    </div>
  );
}

function NotFoundContent() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </motion.div>
    </main>
  );
}
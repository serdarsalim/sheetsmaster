import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Template {
  id: number;
  name: string;
  price: string;
  categories: string[];
  description: string;
  image: string;
  hasFreeVersion?: boolean;
  isPaid?: boolean;
  previewUrl?: string;
  buyUrl?: string;
  freeVersionUrl?: string;
  tutorialUrl?: string;
}

interface TemplateProps {
  template: Template | null;
  onClose: () => void;
  darkMode?: boolean; // New prop for dark mode
}

const Modal: React.FC<TemplateProps> = ({ template, onClose, darkMode = false }) => {
  if (!template) return null;

  const [activeTab, setActiveTab] = useState("overview");

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  const templateDetails = {
    features: [
      "Auto-calculating formulas",
      "Data visualization",
      "Secure = you own your data",
      "Customizable",
      "Mobile-friendly layout",
      "Print-ready reports",
    ],
    howToUse: [
      "Make a copy to your Google Drive",
      "Watch YouTube tutorial for setup",
      "Customize colors and other sections as needed",
    ],
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-gray-300 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col bg-white dark:bg-gray-800 ${darkMode ? 'dark' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {template.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{template.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-900 dark:text-gray-300 hover:text-indigo-300 dark:hover:text-indigo-200 transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-5 py-2 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            {["overview", "features"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium ${
                  activeTab === tab
                    ? "text-gray-900 dark:text-white border-b-2 border-indigo-500"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-white dark:bg-gray-800">
            {activeTab === "overview" && (
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full max-w-sm mx-auto aspect-[4/3] object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
                  />
                </div>

                {/* Template Overview Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Template Overview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    This premium {template.name} template is skillfully
                    developed from scratch. Preview it and watch our YouTube
                    video to learn more. The preview is read-only and does not
                    allow making copies. Purchase the premium version for full
                    access, lifetime usage, and free updates.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    How to Use This Template
                  </h3>
                  <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {templateDetails.howToUse.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="min-h-full">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {templateDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-500 dark:text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-300 dark:border-gray-700 p-6 flex flex-col sm:flex-row sm:justify-between items-center gap-3 bg-white dark:bg-gray-800">
            <span className="text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-0">
              {template.price}
            </span>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              {template.tutorialUrl && (
                <a
                  href={template.tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium text-center min-w-[90px]"
                >
                  Tutorial
                </a>
              )}
              {template.previewUrl && (
                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-center min-w-[90px]"
                >
                  Preview
                </a>
              )}
              {template.buyUrl && (
                <a
                  href={template.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium text-center min-w-[90px]"
                >
                  Buy on Ko-Fi
                </a>
              )}
              {template.freeVersionUrl && (
                <a
                  href={template.freeVersionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium text-center min-w-[90px]"
                >
                  Free
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ template, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

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
        className="fixed inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col bg-white" // Changed background color to white
          onClick={(e) => e.stopPropagation()}
        >
          {/* Shorter Header */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-300">
            <div>
              <span className="inline-block px-3 py-1 text-xs bg-green-500 text-white rounded-full font-medium">
                {template.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
                {template.name}
              </h2>
              <p className="text-gray-700 mt-1">{template.description}</p>
            </div>
            {/* Wider Close Button */}
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-indigo-300 transition-colors bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-2 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-300 bg-white">
            {["overview", "features"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium ${
                  activeTab === tab
                    ? "text-gray-900 border-b-2 border-indigo-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-white">
            {activeTab === "overview" && (
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Image (Narrower to fit text) */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full max-w-sm mx-auto aspect-[4/3] object-contain bg-gray-100 rounded-lg"
                  />
                </div>

                {/* Template Overview Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Template Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This premium {template.category} template is skillfully developed from scratch.
                    Preview it and watch our YouTube video to learn more. All templates come with one time purchase life time usage and free updates.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    How to Use This Template
                  </h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1">
                    {templateDetails.howToUse.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="min-h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {templateDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-300 p-6 flex flex-col sm:flex-row sm:justify-between items-center gap-3 bg-white">
            <span className="text-2xl font-bold text-red-500">
              {template.price}
            </span>
            <div className="flex space-x-3 w-full sm:w-auto">
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-medium text-center"
              >
                Preview
              </a>
              {template.isPaid && (
                <a
                  href={template.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-center"
                >
                  Buy on Ko-Fi
                </a>
              )}
              {template.hasFreeVersion && (
                <a
                  href={template.freeVersionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium text-center"
                >
                  Free Version
                </a>
              )}
              {!template.isPaid && !template.hasFreeVersion && (
                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium text-center"
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
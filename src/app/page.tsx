"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import Modal from "./modal"; // Import the Modal component
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Template } from "@/app/types/template";
import { loadTemplates } from "@/app/utils/loadTemplates";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Grid Background - This can stay outside the Suspense boundary */}
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

      {/* Wrap all client-interactive content in Suspense */}
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

// Create a client component for all the interactive parts
function HomeContent() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  // Load templates from CSV
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates from CSV:", error);
        // You could import fallback templates here if the CSV fails
        // import {fallbackTemplates} from './templates';
        // setTemplates(fallbackTemplates);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(templates, {
        keys: ["name", "description", "categories", "price"],
        threshold: 0.4,
      }),
    [templates]
  );

  const handleCategoryClick = (cat: string) => {
    setSelectedCategories((prev) => {
      if (cat === "all") return ["all"];
      const newCategories = prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev.filter((c) => c !== "all"), cat];
      return newCategories.length === 0 ? ["all"] : newCategories;
    });
  };

  const filteredTemplates = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : templates.filter(
        (t) =>
          selectedCategories.includes("all") ||
          selectedCategories.every((cat) =>
            t.categories.map((c) => c.toLowerCase()).includes(cat.toLowerCase())
          )
      );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  // Calculate stats for the stats section
  const totalTemplates = templates.length;
  const paidTemplates = templates.filter((t) => t.isPaid).length;

  const categoryCounts = templates.reduce((acc, template) => {
    template.categories.forEach((cat) => {
      const lowerCat = cat.toLowerCase();
      acc[lowerCat] = (acc[lowerCat] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {/* Hero Section */}
      <main
  id="home"
  className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-8 pb-8 min-h-[28vh] select-none max-w-6xl mx-auto -mt-4"
>
  {/* Background container - this creates the box */}
  <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-b-lg shadow-2xl overflow-hidden">
    {/* Gradient overlay */}
    <div className="absolute inset-0 hero-gradient" />
    {/* Grid pattern */}
    <div className="absolute inset-0 hero-background" />
  </div>

        {/* Single motion container that slides down from navbar */}
        <motion.div
          className="relative z-10 max-w-4xl w-full"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            type: "spring",
            stiffness: 60,
            damping: 15,
          }}
        >
          {/* Header content */}
          <div className="mt-12">

<div className="flex items-center justify-center gap-2">
  <motion.div
    className="transform"
    animate={{
      rotate: [0, 2, 0, -2, 0],
      y: [0, -2, 0, 2, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* SVG Spreadsheet Icon */}
    <svg 
      width="60" 
      height="60" 
      viewBox="0 0 60 60" 
      className="w-[80px] h-[60px] sm:w-[60px] sm:h-[60px] max-sm:-ml-1 sm:ml-0"
    >
      <rect x="5" y="5" width="50" height="50" rx="3" fill="#34A853" />
      <rect x="8" y="8" width="44" height="44" rx="2" fill="#FFFFFF" />
      <rect x="8" y="8" width="44" height="8" fill="#34A853" opacity="0.8" />
      <rect x="8" y="16" width="8" height="36" fill="#34A853" opacity="0.4" />
      <line x1="16" y1="20" x2="52" y2="20" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="16" y1="28" x2="52" y2="28" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="16" y1="36" x2="52" y2="36" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="16" y1="44" x2="52" y2="44" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="24" y1="16" x2="24" y2="52" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="32" y1="16" x2="32" y2="52" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="40" y1="16" x2="40" y2="52" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="48" y1="16" x2="48" y2="52" stroke="#E6E6E6" strokeWidth="1" />
      <text x="12" y="14" fill="white" fontFamily="Arial" fontSize="6" fontWeight="bold">A</text>
      <text x="20" y="14" fill="white" fontFamily="Arial" fontSize="6" fontWeight="bold">B</text>
      <text x="28" y="14" fill="white" fontFamily="Arial" fontSize="6" fontWeight="bold">C</text>
    </svg>
  </motion.div>

  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="text-4xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white max-sm:-ml-5 sm:ml-0"
    style={{
      fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
      letterSpacing: "-0.025em",
    }}
    whileHover={{
      scale: 1.02,
      transition: { duration: 0.3 },
    }}
  >
    Do more with Google Sheets
  </motion.h1>
</div>

            {/* Subtext */}
            <motion.div
              className="text-xl mb-4 mt-3 max-w-2xl mx-auto leading-relaxed shadow-sm p-3 rounded-lg bg-white/10 dark:bg-gray-800/30 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="relative z-10">
                <span className="font-semibold">Professional</span>{" "}
                <span>templates to</span>{" "}
                <span className="font-semibold">achieve</span>{" "}
                <span>your goals faster!</span>
              </p>

              <motion.span
                className="h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full block relative z-10"
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>

            {/* Feature bullets */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 mb-6 text-sm sm:text-base">
              {/* Feature bullets */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 mb-2 text-sm sm:text-base">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mr-2 text-blue-500 dark:text-blue-400">
                    ⚡️
                  </div>
                  <span>No setup required</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mr-2 text-green-500 dark:text-green-400">
                    👋
                  </div>
                  <span>Hand Curated</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="mr-2 text-purple-500 dark:text-purple-400">
                    🔄
                  </div>
                  <span>Regular Updates</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="mr-2 text-yellow-500 dark:text-yellow-400">
                    ✨
                  </div>
                  <span>Intuitive Designs</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Templates Section  */}
      <section id="templates" className="relative z-10 p-6 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="card-container dark:bg-gray-800"
        >
          <div className="flex flex-col items-center gap-2 mb-3">
            <p className="text-gray-700 dark:text-gray-300 text-center text-lg pb-2 font-medium tracking-wide">
              Find your perfect template 🫡
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
            {[
  { name: "all", count: totalTemplates },
  { name: "free", count: categoryCounts["free"] || 0 },
  { name: "productivity", count: categoryCounts["productivity"] || 0 },
  { name: "health", count: categoryCounts["health"] || 0 },
  { name: "business", count: categoryCounts["business"] || 0 },
].map(({ name, count }) => (
  <motion.button
    key={name}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => handleCategoryClick(name)}
    className={`
      px-2 sm:px-6 
      py-1.5 sm:py-2 
      rounded-lg 
      transition-all 
      duration-300 
      font-medium
      text-base sm:text-base
      min-w-[120px] sm:min-w-[120px]
      ${
        selectedCategories.includes(name)
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200"
      }
    `}
  >
    {name === "all" ? "All" : name.charAt(0).toUpperCase() + name.slice(1)} ({count})
  </motion.button>
))}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, description, or category..."
              className="w-full md:w-3/4 px-4 py-3 rounded-lg text-xs sm:text-base text-black dark:text-white mb-8 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.div
              animate={{ opacity: searchTerm ? 1 : 0 }}
              className="absolute right-20 top-3 cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm && (
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  ×
                </span>
              )}
            </motion.div>
          </div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 dark:text-gray-500">
                Loading templates...
              </p>
            </motion.div>
          ) : filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 dark:text-gray-500">
                No templates found matching your criteria. Try a different
                search term or category.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="card-animate flex flex-col h-full bg-slate-300 dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="relative">
                    <img
                      src={template.image}
                      className="card-img w-full h-48 object-cover"
                      alt={template.name}
                    />

                    {template && template.freeVersion && template.isPaid && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap">
                        Free Version Available
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
                    <div className="mb-3 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {template.categories
                          .filter((cat) => cat.toLowerCase() !== "free")
                          .map((cat) => (
                            <span
                              key={cat}
                              className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-900/60 text-indigo-200 dark:bg-indigo-700/60 dark:text-indigo-100"
                            >
                              {cat}
                            </span>
                          ))}
                      </div>

                      <div
                        className={`px-2 py-1 rounded-lg text-sm font-bold ${
                          !template.isPaid
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {template.price}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {template.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {selectedTemplate && (
        <Modal template={selectedTemplate} onClose={closeModal} />
      )}

      {/* How It Works Section with dark mode */}
      <section
        id="how-it-works"
        className="relative z-10 py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center section-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Cell Reference */}
              <div className="cell-reference dark:text-gray-500">A1:B10</div>

              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-blue-200">
                <span className="text-2xl text-blue-600 dark:text-blue-400">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Browse & Select
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find the perfect template for your needs from our curated
                collection.
              </p>

              {/* Formula Bar */}
              <div className="formula-bar bg-blue-100 dark:bg-blue-600"></div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center section-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Cell Reference */}
              <div className="cell-reference dark:text-gray-500">C1:D10</div>

              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600 dark:text-blue-400">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Preview & Purchase
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Preview the template functionality before deciding to use the
                free version or purchase the premium version.
              </p>

              {/* Formula Bar */}
              <div className="formula-bar bg-blue-100 dark:bg-blue-600"></div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center section-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Cell Reference */}
              <div className="cell-reference dark:text-gray-500">E1:F10</div>

              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600 dark:text-blue-400">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Copy & Customize
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make a copy to your Google Drive and start using it right away
                with your own data.
              </p>

              {/* Formula Bar */}
              <div className="formula-bar bg-blue-100 dark:bg-blue-600"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="relative z-10 py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 dark:text-white ">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {[
              {
                id: 1,
                question: "What is Sheets Master?",
                answer:
                  "Sheets Master offers a collection of high-quality Google Sheets templates designed to help you organize your life, track your finances, improve your productivity, and achieve your goals. Our templates are available in both free and premium versions. The free versions offer core functionality, while premium versions include additional features, advanced analytics, and more customization options.",
              },
              {
                id: 2,
                question: "How do I use these templates?",
                answer:
                  'Once you\'ve selected a template, click on the preview or access link. This will take you to a view-only Google Sheet. To use it, click "File" and "Make a copy" to save it to your own Google Drive. Then you can start customizing and using it immediately.',
              },
              {
                id: 3,
                question:
                  "What's the difference between free and paid versions?",
                answer:
                  "Free versions offer basic functionality to get you started. Paid versions include enhanced features like additional tracking options, advanced visualizations, customization flexibility, and more detailed analytics.",
              },
              {
                id: 4,
                question: "Can I customize these templates?",
                answer:
                  "Yes! Once you make a copy to your Google Drive, you can customize the templates however you wish. You can change colors, add/remove columns, and modify formulas to suit your specific needs.",
              },
              {
                id: 5,
                question:
                  "Why use Google Sheets instead of other spreadsheet applications?",
                answer:
                  "Google Sheets offers the perfect balance of power and accessibility. It's cloud-based, so you can access your data from any device, anywhere. It has powerful collaboration features that let multiple people work on the same document simultaneously. Plus, it's free for individual users, has excellent mobile apps, and integrates seamlessly with other Google services and third-party tools.",
              },
              {
                id: 6,
                question: "Is my data secure in Google Sheets?",
                answer:
                  "Yes. Google's data centers are among the most secure in the world. Additionally, you control access permissions—deciding exactly who can view or edit your sheets.",
              },
              {
                id: 7,
                question: "Who owns the data in my Google Sheets?",
                answer:
                  "You do! Google's Terms of Service clearly state that you retain ownership of any intellectual property rights that you hold in the content you create. When you use our templates in Google Sheets, you're creating your own copy that belongs entirely to you. We have no access to your data once you've made your copy of a template.",
              },
              {
                id: 8,
                question: "Do you offer refunds?",
                answer:
                  "Due to the digital nature of these products, we generally don't offer refunds. That's why we provide detailed previews of each template so you can see exactly what you're getting before purchasing.",
              },
            ].map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqId === faq.id ? "auto" : 0,
                    opacity: openFaqId === faq.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                  transition={{
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

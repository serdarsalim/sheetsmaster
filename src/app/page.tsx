"use client";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import Fuse from "fuse.js";
import Modal from "./modal"; // Import the Modal component
import type { Engine } from "@tsparticles/engine";
import React, {useMemo} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Template, loadTemplates, fallbackTemplates } from './templates'; // Import both Template type and loadTemplates function

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadStarsPreset(engine);
};

// Importing templates from the other file instead



export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
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

  // Set initial dark mode based on user preference - same as in your About page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setDarkMode(false);
      }
    }
  }, []);

  const fuse = useMemo(() => new Fuse(templates, {
    keys: ["name", "description", "categories", "price"],
    threshold: 0.4,
  }), [templates]);

  const handleCategoryClick = (cat: string) => {
    
    setSelectedCategories((prev) => {
      if (cat === "all") return ["all"];
      const newCategories = prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev.filter((c) => c !== "all"), cat];
      return newCategories.length === 0 ? ["all"] : newCategories;
    });

  
  };

  // Toggle dark mode function - same as in your About page
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newDarkMode = !prev;
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newDarkMode;
    });
  };
  
  const filteredTemplates = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : templates.filter((t) =>
        selectedCategories.includes("all") ||
        selectedCategories.every((cat) => 
          t.categories.map(c => c.toLowerCase()).includes(cat.toLowerCase())
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
  const freeTemplates = templates.filter(t => t.hasFreeVersion).length;
  const paidTemplates = templates.filter(t => t.isPaid).length;
  const categoryCounts = templates.reduce((acc, template) => {
    template.categories.forEach(cat => {
      if (cat.toLowerCase() !== "free") { // Ignore "free" category since we use hasFreeVersion
        acc[cat] = (acc[cat] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden`}>
      {/* Add this grid background div specifically for this page */}
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
    backgroundPosition: "0 0, 0 0, 5% 0, 0 5%"
  }}
></div>

      {/* Update Particles to work with dark mode */}
      <Particles
        options={{
          preset: "stars",
          background: { color: darkMode ? "#111827" : "transparent" },
          particles: {
            number: { value: darkMode ? 150 : 100 },
            size: { value: 3 },
            color: { value: darkMode ? "#ffffff" : "#00aced" },
            opacity: { value: darkMode ? 0.7 : 0.4 }
          },
        }}
        className="absolute inset-0"
      />

<nav className="top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
  <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
    {/* Logo and Title */}
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative h-10 w-10">
        <Image src="/logo.png" alt="Premium Sheets Logo" fill sizes="40px" className="object-contain" priority />
      </div>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Premium Sheets</h1>
    </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        {/* Navigation Links and Dark Mode Button */}
    <div className="hidden md:flex items-center space-x-6">
      <Link href="/#home" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
        Home
      </Link>
      <Link href="/#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
        How It Works
      </Link>
      <Link href="/#faq" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
        FAQ
      </Link>
      <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
        About
      </Link>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3 px-6 py-4 bg-white dark:bg-gray-800">
              <Link href="/#home" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link href="/#how-it-works" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link href="/#faq" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link href="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2"
              >
                <span>{darkMode ? "" : ""}</span>
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main id="home" className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 min-h-[28vh] select-none max-w-6xl mx-auto ">
        {/* Background with dark mode support */}
        <div className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden bg-gray-50 dark:bg-gray-800">
          <div className="absolute inset-0 gradient-bg dark:opacity-30" />

          {/* Grid Lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`h-${i}`} className="grid-line grid-line-horizontal" style={{ top: `${(i + 1) * 5}%` }} />
            ))}

            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`v-${i}`} className="grid-line grid-line-vertical" style={{ left: `${(i + 1) * 5}%` }} />
            ))}

            <div
              className="absolute h-px w-full bg-blue-500"
              style={{ top: "5%", opacity: 0.2 }}
            />
            <div
              className="absolute w-px h-full bg-blue-500"
              style={{ left: "5%", opacity: 0.2 }}
            />
          </div>
        </div>

        {/* Free Templates Badge */}
        <div className="absolute top-0 left-20 bg-green-600 text-white px-6 py-2 rounded-b-lg shadow-md text-sm font-medium">
          Free Templates Available!
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        <motion.div
  className="mb-4 flex items-center justify-center"
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <motion.div
    className="mr-3 text-green-300 transform -mt-10"
    animate={{ 
      rotate: [0, 2, 0, -2, 0],
      y: [0, -2, 0, 2, 0]
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Increased base size and made it even larger on mobile */}
    <img 
      src="/spreadsheet.png" 
      className="w-[145px] h-[85px] sm:w-[70px] sm:h-[70px]" 
      alt="Google Sheets Icon" 
    />
  </motion.div>

  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="text-4xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white -mt-10"
    style={{
      fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
      letterSpacing: "-0.025em",
    }}
    whileHover={{
      scale: 1.02,
      transition: { duration: 0.3 },
    }}
  >
    Premium Google Sheets Templates
  </motion.h1>
</motion.div>

          {/* Updated Subtext with dark mode support */}
          <motion.p
  className="text-xl mb-4 mt-5 max-w-2xl mx-auto leading-relaxed shadow-sm p-3 rounded-lg bg-white/10 dark:bg-gray-800/30 text-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <span className="font-semibold">Get</span>
  {' '}
  <span>the right template,</span>
  {' '}
  <span className="font-semibold">achieve</span>
  {' '}
  <span>your goals faster!</span>
</motion.p>
        </motion.div>
      </main>


      {/* Templates Section with dark mode support */}
      <section id="templates" className="relative z-10 p-6 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="card-container dark:bg-gray-800"  
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Browse Our Templates</h2>

          <div className="flex flex-col items-center gap-2 mb-3">
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
              Selecting multiple categories will show only templates that fit all of them.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3">
              <motion.button
                key="all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick("all")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategories.includes("all")
                    ? "bg-blue-500 font-semibold shadow-sm text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                All ({totalTemplates})
              </motion.button>
              {[
                { name: "productivity", count: categoryCounts['productivity'] || 0 },
                { name: "finances", count: categoryCounts['finances'] || 0 },
                { name: "health", count: categoryCounts['health'] || 0 },
                { name: "business", count: categoryCounts['business'] || 0 },
                { name: "free", count: freeTemplates }
              ].map(({ name, count }) => (
                <motion.button
                  key={name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(name)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategories.includes(name)
                      ? "bg-blue-500 font-semibold shadow-sm text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)} ({count})
                </motion.button>
              ))}
            </div>
          </div>

          

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, description, or category..."
              className="w-full md:w-3/4 px-4 py-3 rounded-lg text-xs sm:text-base text-black dark:text-white mb-8 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.div
              animate={{ opacity: searchTerm ? 1 : 0 }}
              className="absolute right-20 top-3 cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm && <span className="text-gray-500 dark:text-gray-400 text-lg">×</span>}
            </motion.div>
          </div>

          {filteredTemplates.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-400 dark:text-gray-500">
                No templates found matching your criteria. Try a different search term or category.
              </p>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
                    <img src={template.image} className="card-img w-full h-48 object-cover" alt={template.name} />
                    {template.hasFreeVersion && template.isPaid && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Free Version Available
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
                    <div className="mb-3 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {template.categories
                          .filter(cat => cat.toLowerCase() !== 'free')
                          .map((cat) => (
                            <span
                              key={cat}
                              className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-900/60 text-indigo-200 dark:bg-indigo-700/60 dark:text-indigo-100"
                            >
                              {cat}
                            </span>
                          ))}
                      </div>

                      <div className={`px-2 py-1 rounded-lg text-sm font-bold ${
                        !template.isPaid ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                      }`}>
                        {template.price}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{template.name}</h3>
                    <p className="text-gray-800 dark:text-gray-200">{template.description}</p>
                  
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {selectedTemplate && <Modal template={selectedTemplate} onClose={closeModal} darkMode={darkMode} />}

      {/* How It Works Section with dark mode */}
      <section id="how-it-works" className="relative z-10 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">How It Works</h2>
          
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
                <span className="text-2xl text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Browse & Select</h3>
              <p className="text-gray-600 dark:text-gray-300">Find the perfect template for your needs from our curated collection.</p>
              
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
                <span className="text-2xl text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Preview & Purchase</h3>
              <p className="text-gray-600 dark:text-gray-300">Preview the template functionality before deciding to use the free version or purchase the premium version.</p>
              
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
                <span className="text-2xl text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Copy & Customize</h3>
              <p className="text-gray-600 dark:text-gray-300">Make a copy to your Google Drive and start using it right away with your own data.</p>
              
              {/* Formula Bar */}
              <div className="formula-bar bg-blue-100 dark:bg-blue-600"></div>
      </motion.div>
    </div>
  </div>
</section>

<section id="faq" className="relative z-10 py-16 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 dark:text-white ">
      Frequently Asked Questions
    </h2>
    
    <div className="space-y-3">
      {[
        {
          id: 1,
          question: "What is Premium Sheets?",
          answer: "Premium Sheets offers a collection of high-quality Google Sheets templates designed to help you organize your life, track your finances, improve your productivity, and achieve your goals. Our templates are available in both free and premium versions. The free versions offer core functionality, while premium versions include additional features, advanced analytics, and more customization options."
        },
        {
          id: 2,
          question: "How do I use these templates?",
          answer: "Once you've selected a template, click on the preview or access link. This will take you to a view-only Google Sheet. To use it, click \"File\" and \"Make a copy\" to save it to your own Google Drive. Then you can start customizing and using it immediately."
        },
        {
          id: 3,
          question: "What's the difference between free and paid versions?",
          answer: "Free versions offer basic functionality to get you started. Paid versions include enhanced features like additional tracking options, advanced visualizations, customization flexibility, and more detailed analytics."
        },
        {
          id: 4,
          question: "Can I customize these templates?",
          answer: "Yes! Once you make a copy to your Google Drive, you can customize the templates however you wish. You can change colors, add/remove columns, and modify formulas to suit your specific needs."
        },
        {
          id: 5,
          question: "Why use Google Sheets instead of other spreadsheet applications?",
          answer: "Google Sheets offers the perfect balance of power and accessibility. It's cloud-based, so you can access your data from any device, anywhere. It has powerful collaboration features that let multiple people work on the same document simultaneously. Plus, it's free for individual users, has excellent mobile apps, and integrates seamlessly with other Google services and third-party tools."
        },
        {
          id: 6,
          question: "Is my data secure in Google Sheets?",
          answer: "Yes. Google's data centers are among the most secure in the world. Additionally, you control access permissions—deciding exactly who can view or edit your sheets."
        },
        {
          id: 7,
          question: "Who owns the data in my Google Sheets?",
          answer: "You do! Google's Terms of Service clearly state that you retain ownership of any intellectual property rights that you hold in the content you create. When you use our templates in Google Sheets, you're creating your own copy that belongs entirely to you. We have no access to your data once you've made your copy of a template."
        },
        {
          id: 8,
          question: "Do you offer refunds?",
          answer: "Due to the digital nature of these products, we generally don't offer refunds. That's why we provide detailed previews of each template so you can see exactly what you're getting before purchasing."
        }
      ].map((faq) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
        >
          <button
            onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
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
              opacity: openFaqId === faq.id ? 1 : 0
            }}
            className="overflow-hidden"
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2 }
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
    </div>
  );
}    

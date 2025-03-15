"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverCell, setHoverCell] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  // Animation variants for the grid cells
  const cellVariants = {
    hover: { scale: 1.05, backgroundColor: "rgba(167, 185, 214, 0.3)" },
    tap: { scale: 0.95 },
  };


  // Section IDs for navigation with Google Sheets colors
  const sections = [
    { id: "mission", title: "Our Mission", color: "green" },
    { id: "vision", title: "Our Vision", color: "blue" },
    { id: "founder", title: "About Founder", color: "red" },
    { id: "audience", title: "Who It's For", color: "yellow" },
    { id: "contact", title: "Get In Touch", color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Grid Background - Restored Google Sheets-like appearance */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div
          className="w-full h-full grid grid-cols-12"
          style={{ gridTemplateRows: "repeat(24, 1fr)" }}
        >
          {Array.from({ length: 288 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-gray-400 dark:border-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.001 }}
              whileHover={cellVariants.hover}
              whileTap={cellVariants.tap}
              onHoverStart={() => setHoverCell(i)}
              onHoverEnd={() => setHoverCell(null)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Navigation Drawer - Appears when menu button is clicked */}
      <motion.div
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform lg:hidden"
        initial={{ x: "-100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Page Sections</h2>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block py-2 px-4 rounded-md text-${section.color}-600 dark:text-${section.color}-400 hover:bg-${section.color}-50 dark:hover:bg-${section.color}-900/20`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

     

      {/* Side Navigation */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white dark:bg-gray-800 rounded-r-lg shadow-lg py-3 px-1">
          <ul className="space-y-3">
            {sections.map((section) => {
              // Determine color classes based on section
              let textColorClass = "";
              let hoverBgClass = "";
              let barColorClass = "";

              switch (section.color) {
                case "green":
                  textColorClass = "text-green-600 dark:text-green-400";
                  hoverBgClass = "hover:bg-green-50 dark:hover:bg-green-900/20";
                  barColorClass = "bg-green-500";
                  break;
                case "blue":
                  textColorClass = "text-blue-600 dark:text-blue-400";
                  hoverBgClass = "hover:bg-blue-50 dark:hover:bg-blue-900/20";
                  barColorClass = "bg-blue-500";
                  break;
                case "red":
                  textColorClass = "text-red-600 dark:text-red-400";
                  hoverBgClass = "hover:bg-red-50 dark:hover:bg-red-900/20";
                  barColorClass = "bg-red-500";
                  break;
                case "yellow":
                  textColorClass = "text-yellow-600 dark:text-yellow-400";
                  hoverBgClass =
                    "hover:bg-yellow-50 dark:hover:bg-yellow-900/20";
                  barColorClass = "bg-yellow-500";
                  break;
                case "purple":
                  textColorClass = "text-purple-600 dark:text-purple-400";
                  hoverBgClass =
                    "hover:bg-purple-50 dark:hover:bg-purple-900/20";
                  barColorClass = "bg-purple-500";
                  break;
                default:
                  textColorClass = "text-gray-600 dark:text-gray-400";
                  hoverBgClass = "hover:bg-gray-50 dark:hover:bg-gray-900/20";
                  barColorClass = "bg-gray-500";
              }

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex items-center p-2 rounded-lg ${textColorClass} ${hoverBgClass} transition-colors`}
                    aria-label={`Jump to ${section.title} section`}
                  >
                    <div
                      className={`w-2 h-8 ${barColorClass} rounded-full mr-2`}
                    ></div>
                    <span className="text-sm font-medium">{section.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-24 pt-32 min-h-screen lg:ml-2 pt-20 -mt-20">
        

        {/* Mission Statement */}
        <motion.div
          id="mission"
          className="w-full max-w-4xl mb-8 md:mb-12 -mt-15"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-green-300">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-green-500 dark:text-red-400 mb-4 md:mb-6"
              tabIndex={0}
            >
              What's Sheets Master?
            </motion.h1>

            <div className="prose prose-lg text-gray-700 dark:text-gray-300 max-w-none">
              <p>
                Sheets Master offers thoughtfully designed Google Sheets
                templates focused on productivity, health, personal finances,
                and project management. Instead of overwhelming you with
                options, we provide a carefully curated collection of templates
                that actually solve real problems. Each template is
                battle-tested and designed to help you focus on what matters
                most.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          id="vision"
          className="w-full max-w-4xl mb-8 md:mb-12 scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-blue-300 relative overflow-hidden">
            {/* Cell Reference */}
            <div className="absolute top-2 right-3 text-xs text-gray-400 font-mono">
              =#VALUE! (But actually priceless)
            </div>

            <motion.h2
              className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              tabIndex={0}
            >
              What can it become?
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-gray-700 dark:text-gray-300">
                Sheets Master is on a mission to become the definitive resource
                for high quality Google Sheets templates. We're building the
                foundation today by focusing on quality over quantity, with each
                template designed to solve specific challenges in personal
                productivity, finances, health tracking, and project management.
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                While our collection is currently small and focused, our vision
                is expansive: to create the most comprehensive, user-friendly
                library of Google Sheets templates available anywhere. Think of
                us as building the "Toolspedia for Google Sheets" — one
                excellent template at a time.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* About The Founder Section */}
        <motion.div
          id="founder"
          className="relative z-10 w-full max-w-4xl mb-8 md:mb-12 scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-red-300 relative overflow-hidden"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            {/* Cell Reference */}
            <div className="absolute top-2 right-3 text-xs text-gray-400 font-mono">
              A1:LOL
            </div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-red-500 dark:text-red-400 mb-4 md:mb-6"
              tabIndex={0}
            >
              Who is behind Sheets Master?
            </motion.h2>

            <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Hi Friend! I'm Serdar, the creator of Sheets Master. I believe deeply in the power of spreadsheets to transform how we approach our daily challenges. My mission is simple: create highly functional Google Sheets templates that actually solve real problems people face in their work and personal lives.",
                "Each template in our collection is one I've personally designed, tested, and refined. I'm not interested in quantity — I'm focused on creating templates that are intuitive, powerful, and immediately useful. Every formula is optimized, every layout is designed for clarity, and every template addresses a specific need.",
                "Sheets Master began with templates I built to solve my own challenges in productivity, health tracking, personal finance, and project management. Now I'm sharing them with you, along with detailed guides and walkthroughs. Have a spreadsheet problem you can't solve? Reach out — I'd love to help create the solution!",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                  }}
                >
                  <p className="text-gray-800 dark:text-gray-200">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Who Is This For Section */}
        <motion.div
          id="audience"
          className="w-full max-w-4xl mb-8 md:mb-12 scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-yellow-300 relative overflow-hidden">
            {/* Cell Reference */}
            <div className="absolute top-2 right-3 text-xs text-gray-400 font-mono">
              E1:G12
            </div>

            <motion.h2
              className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              tabIndex={0}
            >
              Who is Sheets Master for?
            </motion.h2>

            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div
                  className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg"
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                  }}
                >
                  <h3 className="font-bold text-lg mb-2">Professionals</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Who need effective systems for time management, project
                    tracking, and personal organization but don't have time to
                    build complex spreadsheets from scratch.
                  </p>
                </motion.div>

                <motion.div
                  className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg"
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                  }}
                >
                  <h3 className="font-bold text-lg  mb-2">
                    Personal Finance Enthusiasts
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Looking for better ways to budget, track expenses, plan
                    investments, or manage debt without complicated financial
                    software.
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <motion.div
                  className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg"
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                  }}
                >
                  <h3 className="font-bold text-lg  mb-2">
                    Health & Wellness Trackers
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Who want to monitor fitness progress, nutrition, habits, or
                    health metrics with customizable, data-driven tools.
                  </p>
                </motion.div>

                <motion.div
                  className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg"
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                  }}
                >
                  <h3 className="font-bold text-lg  mb-2">Project Managers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Seeking lightweight but powerful tools to plan projects,
                    assign tasks, track progress, and visualize outcomes without
                    enterprise-level complexity.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          id="contact"
          className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-purple-300 relative overflow-hidden scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Cell Reference */}
          <div className="absolute top-2 right-3 text-xs text-gray-400 font-mono">
            #REF! (Reach out to get this fixed)
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-purple-600 dark:text-purple-300 mb-4 md:mb-6"
            tabIndex={0}
          >
            Get In Touch
          </motion.h2>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-lg mb-4">
              Have a spreadsheet problem you need solved? Want to suggest a new
              template?
            </p>
            <p className="text-lg mb-6">
              I'd love to hear from you and potentially build exactly what you
              need.
            </p>

            <motion.a
              href="mailto:contact@sheetsmaster.co"
              className="inline-block text-lg font-semibold text-purple-600 dark:text-purple-400 hover:underline bg-purple-50 dark:bg-purple-900/30 px-6 py-3 rounded-lg mb-5"
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(234, 179, 8, 0.15)",
              }}
              aria-label="Send email to Sheets Master"
            >
              contact@sheetsmaster.co
            </motion.a>
          </motion.div>

          {/* Formula Bar Animation - Made more subtle */}
          <motion.div
            className="absolute bottom-2 left-2 right-2 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-2 text-xs font-mono text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            =HYPERLINK("mailto:contact@sheetsmaster.co","contact@sheetsmaster.co")
          </motion.div>

          
        </motion.div>
        {/* Floating Formula - Made more subtle */}
<motion.div
  className="absolute bottom-7 right-4 md:right-10 text-xs text-gray-500 dark:text-gray-400 font-mono hidden md:block"
  animate={{
    y: [0, 10, 0],
    opacity: [0.3, 0.6, 0.3],
  }}
  transition={{
    repeat: Infinity,
    duration: 6,
  }}
>
  =AYBASTIFORMULA(IF(ROW(A:A)=1,"Quality",IF(A:A="","",A:A&" Over Quantity")))
</motion.div>
      </main>

      
    </div>
  );
}

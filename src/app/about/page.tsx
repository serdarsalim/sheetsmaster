"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function About() {
  const [hoverCell, setHoverCell] = useState(null);
  
  // Animation variants for the grid cells
  const cellVariants = {
    hover: { scale: 1.05, backgroundColor: "rgba(167, 185, 214, 0.3)" },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="w-full h-full grid grid-cols-12 grid-rows-24">
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
      


      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Premium Sheets Logo" className="h-8 w-auto" />
            <h1 className="text-xl font-bold text-black">Premium Sheets</h1>
          </div>
          <div className="space-x-6">
            {["Home", "About"].map((item) => (
              <motion.a
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}                className="text-black hover:text-gray-600 transition font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-32 min-h-screen">
        {/* Floating Formula */}
        <motion.div
          className="absolute top-24 right-10 text-xs text-gray-500 dark:text-gray-400 font-mono"
          animate={{ 
            y: [0, 10, 0], 
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
          }}
        >
          =ARRAYFORMULA(IF(ROW(A:A)=1,"Premium",IF(A:A="","",A:A&" Sheets")))
        </motion.div>

        {/* About Section */}
        <motion.div
          className="relative z-10 max-w-4xl mb-12 perspective-1000"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-green-500 mb-12 relative overflow-hidden"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
          >
            {/* Cell Reference */}
            <div className="absolute top-2 right-3 text-xs text-gray-400 font-mono">A1:D15</div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-extrabold tracking-tight text-green-600 dark:text-green-400"
              style={{ fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" }}
              whileHover={{ scale: 1.03, textShadow: "0 0 12px rgba(74, 222, 128, 0.4)" }}
            >
              About Premium Sheets
            </motion.h1>

            <motion.div
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                "Hi there! My name is Serdar, and I'm the creator of Premium Sheets. This platform is your go-to resource for high-quality, ready-to-use Google Sheets templates that save you hours of work and spark inspiration for your own projects.",
                "I leverage the latest and most advanced Google Sheets formulas to ensure a seamless experience, helping you achieve your goals without frustration. Every template is designed with both functionality and aesthetics in mind, so you can work efficiently while enjoying a clean and intuitive interface.",
                "I aim to provide free versions and detailed YouTube walkthroughs for every Google Sheet I create, so keep checking in for new content! If you have a Google Sheets problem or an idea, reach out—I'd love to help solve it with you. And if one of my templates has made your life easier, I'd love to hear your feedback!"
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
                    backgroundColor: "rgba(74, 222, 128, 0.1)" 
                  }}
                >
                  <p className="text-gray-800 dark:text-gray-200">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 pb-16 border-t-4 border-indigo-500 relative overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
>
            {/* Cell Reference */}
            <div className="absolute top-2 right-3 text-xs text-gray-400 font-mono">F1:H8</div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              className="text-4xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400"
            >
              Contact Me
            </motion.h1>
            <div className="flex justify-center">
            <motion.p
              className="text-lg mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Have questions? Reach out via email 
            </motion.p>
           </div>

           <div className="flex justify-center">
  <motion.a
    href="mailto:premiumgsheets@gmail.com"
    className="mt-4 inline-block text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg"
    whileHover={{ 
      scale: 1.05, 
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)"
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1.2 }}
  >
    premiumgsheets@gmail.com 
  </motion.a>
</div>
            {/* Formula Bar Animation */}
            <motion.div
              className="absolute bottom-2 left-2 right-2 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-2 text-xs font-mono text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              =HYPERLINK("mailto:premiumgsheets@gmail.com","premiumgsheets@gmail.com") 
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Function Buttons */}
      
   {/* Footer */}
   <footer className="relative z-10 p-6 text-center bg-white text-black text-sm border-t border-gray-200">
  <div className="flex justify-center gap-4 mb-2">
    {["Home", "About", "Terms of Service", "Privacy Policy"].map((link) => (
      <motion.a
        key={link}
        href={
          link === "Home"
            ? "/"
            : link === "About"
            ? "/about"
            : link === "Terms of Service"
            ? "/terms"
            : "/privacy"
        }
        className="hover:text-gray-600 transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        {link}
      </motion.a>
    ))}
  </div>
  <p>© {new Date().getFullYear()} Premium Sheets. All Rights Reserved.</p>
</footer>
    </div>
  );
}
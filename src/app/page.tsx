"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import Fuse from "fuse.js";
import Modal from "./modal"; // Import the Modal component
import type { Engine } from "@tsparticles/engine";


const particlesInit = async (engine: Engine): Promise<void> => {
  await loadStarsPreset(engine);
};

const templates = [
  {
    id: 1,
    name: "Budget Tracker",
    price: "$20",
    category: "finances",
    description: "Manage your monthly budget and control your spending. Free version available.",
    image: "/budget_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
    
  },
  {
    id: 2,
    name: "Subscription Tracker",
    price: "$10",
    category: "finances",
    description: "Track all your subscriptions and fixed expenses effectively.",
    image: "/subscription_tracker.png",
    hasFreeVersion: false,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 3,
    name: "Net Worth Tracker",
    price: "$10",
    category: "finances",
    description: "Track your net worth over time and build wealth.",
    image: "/net_worth.png",
    hasFreeVersion: false,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
    
  },
  {
    id: 4,
    name: "Habit Tracker",
    price: "$5",
    category: "productivity",
    description:
      "Track all your tasks and improve your productivity. Free version available.",
    image: "/habit_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 5,
    name: "OKR Tracker",
    price: "Free",
    category: "productivity",
    description:
      "Set your personal or professional SMART goals and grow your success.",
    image: "/okr_tracker.png",
    hasFreeVersion: true,
    isPaid: false,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 6,
    name: "Color Palette",
    price: "Free",
    category: "productivity",
    description: "Copy the color codes for your next google sheets project.",
    image: "/color_palette.png",
    hasFreeVersion: true,
    isPaid: false,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 7,
    name: "Task Manager",
    price: "Free",
    category: "productivity",
    description: "Track tasks with a budget and timeline easily.",
    image: "/task_tracker.png",
    hasFreeVersion: true,
    isPaid: false,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 8,
    name: "Weight Loss Tracker",
    price: "$5",
    category: "lifestyle",
    description:
      "Built  to assist you lose weight easily over time effectively Free version available.",
    image: "/weight_loss.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 9,
    name: "Work Out Tracker",
    price: "$5",
    category: "lifestyle",
    description: "Plan your work out days and track your performance. Free version available.",
    image: "/workout_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
];

export default function Home() {
  const particlesInit = async (engine) => {
    await loadStarsPreset(engine);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fuse = new Fuse(templates, {
    keys: ["name", "description", "category", "price"],
    threshold: 0.4,
  });

  const filteredTemplates = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : templates.filter((t) => category === "all" || t.category === category);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
<Particles
  options={{
    preset: "stars",
    background: { color: "#0a0b1d" },
    particles: {
      number: { value: 100 },
      size: { value: 1 },
    },
  }}
  className="absolute inset-0"
/>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-gray-900">Simplify Labs</h1>
          <div className="space-x-6">
            <a href="#home" className="text-gray-700 hover:text-gray-900 transition">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-gray-900 transition">
              About
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 min-h-[28vh] select-none max-w-6xl mx-auto">
        <div className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(23, 30, 54, 0.95) 0%, rgba(45, 55, 90, 0.97) 30%, rgba(64, 81, 137, 0.95) 50%, rgba(41, 65, 113, 0.93) 70%, rgba(28, 40, 80, 0.95) 100%)",
              backgroundSize: "400% 400%",
              animation: "gradientFlow 20s ease infinite",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(120, 140, 200, 0.12) 0%, rgba(70, 90, 150, 0.04) 35%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(100, 120, 180, 0.1) 0%, rgba(50, 70, 120, 0.03) 40%, transparent 70%)",
              mixBlendMode: "screen",
              opacity: 0.7,
            }}
          />
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute h-px w-full bg-white"
                style={{
                  top: `${(i + 1) * 5}%`,
                  opacity: 0.05,
                }}
              />
            ))}

            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute w-px h-full bg-white"
                style={{
                  left: `${(i + 1) * 5}%`,
                  opacity: 0.05,
                }}
              />
            ))}

            <div
              className="absolute h-px w-full bg-white"
              style={{ top: "5%", opacity: 0.25 }}
            />
            <div
              className="absolute w-px h-full bg-white"
              style={{ left: "5%", opacity: 0.25 }}
            />
          </div>
        </div>

        <div className="absolute top-15 left-20 bg-green-500 text-white px-6 py-2 rounded-b-lg shadow-md text-sm font-medium">
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
              className="mr-3 text-green-300 transform"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <img
                src="/gsheet.png"
                width="42"
                height="42"
                alt="Google Sheets Icon"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className=" text-5xl font-extrabold tracking-tight text-white"
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
              Premium Google Sheets Templates
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-gray-100 text-lg mt-"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready-to-use, professionally designed templates to streamline your
            workflow and save hours of setup time.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3 text-sm mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              ⚙️ Automatic Calculations
            </motion.span>
            <motion.span
              className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              📊 Beautiful Dashboards
            </motion.span>
            <motion.span
              className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              📈 Data Visualization
            </motion.span>
            <motion.span
              className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              ⏳ Time-Saving Formulas
            </motion.span>
          </motion.div>
        </motion.div>
      </main>

      <section id="templates" className="relative z-10 p-6 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-300 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-6xl mx-auto"
        >
          <div>
            <p className="text-gray-900 text-center mb-3">
              Browse our collection of professional Google Sheets templates
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {["all", "productivity", "finances", "lifestyle"].map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    category === cat
                      ? "bg-indigo-600 font-semibold shadow-lg"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, description, or category..."
              className="w-1/2 px-4 py-3 rounded-lg text-black mb-8 bg-gray-100 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.div
              animate={{ opacity: searchTerm ? 1 : 0 }}
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm && <span className="text-gray-500 text-lg">×</span>}
            </motion.div>
          </div>

          {filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">
                No templates found matching your criteria. Try a different
                search term or category.
              </p>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gray-600 rounded-xl border border-gray-700 shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:border-indigo-500 cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="relative">
                    <img
                      src={template.image}
                      className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105 rounded-t-xl"
                      alt={template.name}
                    />
                  </div>
                  <div className="p-5 bg-gray-700 rounded-b-xl">
                    <div className="mb-3 flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-900/60 text-indigo-200">
                        {template.category}
                      </span>
                      <div className="px-2 py-1 bg-yellow-600 rounded-lg text-sm font-bold text-white">
                        {template.price}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{template.name}</h3>
                    <p className="text-gray-400">{template.description}</p>
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

      <footer className="relative z-10 p-6 text-center bg-gray-800 text-gray-300 text-sm border-t border-gray-700 mt-12">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/about" className="hover:text-white transition-colors">
            About
          </a>
        </div>
        <p>© {new Date().getFullYear()} Simplify Labs. All Rights Reserved.</p>
        <p className="mt-2">
          Professionally designed Google Sheets templates for your productivity
          needs.
        </p>
      </footer>
    </div>
  );
}
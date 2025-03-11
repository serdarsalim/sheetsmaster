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
    categories: ["finances","free"],
    description:
      "Manage your monthly budget and control your spending. Free version available.",
    image: "/budget_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://docs.google.com/spreadsheets/d/1EKIcdA8H20eUWCwS9zOtuCwGEqgiX_USIDIkKSHjp64/edit?gid=2061588169#gid=2061588169",
    buyUrl: "https://ko-fi.com/s/db49a65ceb",
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/1_2Yj5I2-KXI99EnwAIFB6qHcyRG-G0QkWXzplnonwGQ/edit?gid=2061588169#gid=2061588169",
    
  },
  {
    id: 2,
    name: "Subscription Tracker",
    price: "$10",
    categories: ["finances"],
    description: "Track all your subscriptions and fixed expenses effortlessly.",
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
    categories: ["finances"],
    description: "Track your net worth over time and build wealth. ",
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
    categories: ["productivity", "business","free"],
    description:
      "Track all your tasks and improve your productivity. Free version available.",
    image: "/habit_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://docs.google.com/spreadsheets/d/18vttrnt3Z5wrDJ0NPp6ajAboWakfMJVVOZf7pNKFiBg/edit?gid=1586535057#gid=1586535057",
    buyUrl: "https://ko-fi.com/s/e5c0f14d57",
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/1tgsoZOYktuH_pQtOu_orBRtk3WZuxTUAewho3JDCjoo/edit?gid=1586535057#gid=1586535057",
  },
  {
    id: 5,
    name: "OKR Tracker",
    price: "Free",
    categories: ["productivity","free"],
    description:
      "Set your personal or professional SMART goals and grow your success.",
    image: "/okr_tracker.png",
    hasFreeVersion: true,
    isPaid: false,
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/1QTiYA3ON4l2DTwfDujTghaOOKLmZMEUrKyEsDngwxNE/edit?gid=756461954#gid=756461954",
  },
  {
    id: 6,
    name: "Color Palette",
    price: "Free",
    categories: ["productivity","free"],
    description: "Copy the color codes for your next google sheets project.",
    image: "/color_palette.png",
    hasFreeVersion: true,
    isPaid: false,
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/1PZukfrlXbbKonfjmwQ423ucpsOFSkhBE65r2xl_xk_0/edit?gid=1634915#gid=1634915",
  },
  {
    id: 7,
    name: "Task Manager",
    price: "Free",
    categories: ["productivity","Free"],
    description: "Track tasks with a budget and timeline easily.",
    image: "/task_tracker.png",
    hasFreeVersion: true,
    isPaid: false,
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/15obNfu2GHG107if2Jpyrv4o1yCgelBqKL_R95lHObZE/edit?gid=290486793#gid=290486793",
  },
  {
    id: 8,
    name: "Weight Loss Tracker",
    price: "$5",
    categories: ["health", "free"],
    description:
      "Built to assist you lose weight easily over time. Free version available.",
    image: "/weight_loss.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://docs.google.com/spreadsheets/d/1ByPANkhI7RyLmFxKdlkMO_KJXUbE32TFH06mNqBdUgA/edit?gid=910630012#gid=910630012",
    buyUrl: "https://ko-fi.com/s/d21a52d720",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
  {
    id: 9,
    name: "Work Out Tracker",
    price: "$5",
    categories: ["free", "health"],
    description:
      "Plan your work out days and track your performance. Free version available.",
    image: "/workout_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://example.com/preview/budget-tracker",
    buyUrl: "https://example.com/buy/budget-tracker",
    freeVersionUrl: "https://example.com/free/budget-tracker",
  },
];

export default function Home() {
  const particlesInitHandler = async (engine: Engine) => {
    await loadStarsPreset(engine);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fuse = new Fuse(templates, {
    keys: ["name", "description", "categories", "price"],
    threshold: 0.4,
  });

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
  : templates.filter((t) =>
      selectedCategories.includes("all") ||
      selectedCategories.every((cat) => t.categories.includes(cat))
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

  const handleTemplateClick = (template: any) => {
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
    background: { color: "transparent" },
    particles: {
      number: { value: 100 },
      size: { value: 100 },
      color: { value: "#00aced" },
      opacity: { value: 0.9 }
    },
  }}
  className="absolute inset-0"
/>

<nav className="top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-80">
  <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
    
    {/* Logo and Title together */}
    <div className="flex items-center space-x-3">
      <img src="/logo.png" alt="Premium Sheets Logo" className="h-10 w-auto" /> 
      <h1 className="text-xl font-bold text-gray-900">Premium Sheets</h1>
    </div>

    {/* Navigation Links */}
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
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 min-h-[28vh] select-none max-w-6xl mx-auto">
        <div className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden">
        <div
  className="absolute inset-0"
  style={{
    background: "linear-gradient(to top left, #d4aaff 0%, #63bff0 50%, #a7d5ed 100%) no-repeat center/500% 500%",
    animation: "gradientFlow 20s ease infinite",
  }}
/>

<div className="absolute inset-0">
  {Array.from({ length: 20 }).map((_, i) => (
    <div
      key={`h-${i}`}
      className="absolute h-px w-full bg-blue-500"
      style={{
        top: `${(i + 1) * 5}%`,
        opacity: 0.1,
      }}
    />
  ))}

  {Array.from({ length: 20 }).map((_, i) => (
    <div
      key={`v-${i}`}
      className="absolute w-px h-full bg-blue-500"
      style={{
        left: `${(i + 1) * 5}%`,
        opacity: 0.1,
      }}
    />
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

        <div className="absolute top-0 left-20 bg-green-500 text-white px-6 py-2 rounded-b-lg shadow-md text-sm font-medium">
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
              <img src="/gsheet.png" width="50" height="50" alt="Google Sheets Icon" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-extrabold tracking-tight text-gray-800"
              style={{
                fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
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
            className="text-gray-700 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hand-curated, ready-to-use templates to help you achieve your goals and save hours of setup time.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3 text-sm mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
         <motion.span
  className="inline-flex items-center px-3 py-1 text-gray-600 bg-blue-50 border border-blue-100 rounded-full"
  // Remove the whileHover animation to prevent button-like interaction
>
  <span className="mr-1">⚙️</span> Automatic Calculations
</motion.span>
            <motion.span
              className="inline-flex items-center px-3 py-1 text-gray-600 bg-blue-50 border border-blue-100 rounded-full"
             
            >
              👩🏻‍💻 User Friendly
            </motion.span>
            <motion.span
              className="inline-flex items-center px-3 py-1 text-gray-600 bg-blue-50 border border-blue-100 rounded-full"
             
            >
              📈 Data Visualization
            </motion.span>
            <motion.span
              className="inline-flex items-center px-3 py-1 text-gray-600 bg-blue-50 border border-blue-100 rounded-full"
             
            >
              ⏳ Time-Saving Formulas
            </motion.span>
          </motion.div>
        </motion.div>
      </main>

                        {/* card container background */}


      <section id="templates" className="relative z-10 p-6 md:p-12 text-center">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
  transition={{ duration: 0.5 }}
  className="bg-[#FCFCF2] backdrop-blur-md rounded-xl p-6 shadow-xl max-w-6xl mx-auto"
  
>
          <div>
            <p className="text-gray-700 text-center mb-3">
              Browse our collection of professional Google Sheets templates
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {["all", "productivity", "finances", "health", "business", "free"].map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategories.includes(cat)
                       ? "bg-blue-500 font-semibold shadow-sm text-white"
  : "bg-gray-200 hover:bg-gray-400 text-gray-800"
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
              className="w-1/2 px-4 py-3 rounded-lg text-black mb-8 bg-gray-100 border border-gray-300 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.div
              animate={{ opacity: searchTerm ? 1 : 0 }}
              className="absolute right-20 top-3 cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm && <span className="text-gray-500 text-lg">×</span>}
            </motion.div>
          </div>

          {filteredTemplates.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-400">
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
                  className="card-animate flex flex-col h-full bg-slate-300 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="relative">
                    <img
                      src={template.image}
                      className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105 rounded-t-xl"
                      alt={template.name}
                    />
                  </div>

                        {/* Card Content */}

                  <div className="p-5 flex flex-col justify-between bg-white rounded-b-xl border-t border-gray-200">
                    <div className="mb-3 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {template.categories.map((cat) => (
                          <span
                            key={cat}
                            className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-900/60 text-indigo-200"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>


                        {/* Price label */}


                      <div className="px-2 py-1 bg-yellow-500 rounded-lg text-sm font-bold text-white">
                        {template.price}
                      </div>
                    </div>

                         {/* Card header and text */}

                    <h3 className="text-xl font-semibold mb-2 text-slate-800">{template.name}</h3>
                    <p className="text-gray-800">{template.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {selectedTemplate && <Modal template={selectedTemplate} onClose={closeModal} />}

      <footer className="relative mt-auto p-6 text-center bg-gray-100 text-gray-600 text-sm border-t border-gray-200">
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
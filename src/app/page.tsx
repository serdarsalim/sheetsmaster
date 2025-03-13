"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import Fuse from "fuse.js";
import Modal from "./modal"; // Import the Modal component
import type { Engine } from "@tsparticles/engine";
import React, {useMemo} from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface Template {
  id: number;
  name: string;
  price: string;
  categories: string[];
  description: string;
  image: string;
  hasFreeVersion: boolean;
  isPaid: boolean;
  previewUrl?: string;
  buyUrl?: string;
  freeVersionUrl?: string;
}

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadStarsPreset(engine);
};

const templates: Template[] = [
  {
    id: 1,
    name: "Budget Tracker",
    price: "$20",
    categories: ["finances","free"],
    description:
      "Manage your monthly budget and control your spending over multiple years.",
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
    previewUrl: "https://docs.google.com/spreadsheets/d/1y0MMoneThIIZdbmrr2sas21MOIjqYlqwgh7N-84i_QA/edit?gid=2061588169#gid=2061588169",
    buyUrl: "https://ko-fi.com/s/6441e917de",
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
    previewUrl: "https://docs.google.com/spreadsheets/d/1_XQgRBvtdYrL_Gi8im02SpeFqLXz4rKHfDKEe_enAps/edit?gid=1749557257#gid=1749557257",
    buyUrl: "https://ko-fi.com/s/9e1d1d3633",
  },
  {
    id: 4,
    name: "Habit Tracker",
    price: "$5",
    categories: ["productivity", "business","free"],
    description:
      "Track all your tasks and improve your productivity 3 months at a time.",
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
    categories: ["productivity","free", "business"],
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
    categories: ["productivity","free"],
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
      "Built to assist you lose and maintain your ideal weight.",
    image: "/weight_loss.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://docs.google.com/spreadsheets/d/1ByPANkhI7RyLmFxKdlkMO_KJXUbE32TFH06mNqBdUgA/edit?gid=910630012#gid=910630012",
    buyUrl: "https://ko-fi.com/s/d21a52d720",
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/1Mvj3Sme8YdZsk3KMHaDN8Il5xVghnLByqSKqROp0bJg/edit?gid=910630012#gid=910630012",
  },
  {
    id: 9,
    name: "Work Out Tracker",
    price: "$5",
    categories: ["free", "health"],
    description:
      "Plan your work out days and track your performance.",
    image: "/workout_tracker.png",
    hasFreeVersion: true,
    isPaid: true,
    previewUrl: "https://docs.google.com/spreadsheets/d/1ULuKXY9y3AGZXz7jeGO303pzX_JVuvev5MRJMKG_jOQ/edit?gid=1396586418#gid=1396586418",
    buyUrl: "https://ko-fi.com/s/a342a22913",
    freeVersionUrl: "https://docs.google.com/spreadsheets/d/1Yv_ZUlkEz_0c60W5Hvh5gL1IEvZEHhd7GuJHi88g1-o/edit?gid=990033680#gid=990033680",
  },
];

export default function Home() {

  const [openFaqId, setOpenFaqId] = useState<number | null>(null);


  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const particlesInitHandler = async (engine: Engine) => {
    await loadStarsPreset(engine);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  useEffect(() => {
    setIsVisible(true);
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
    <Link href="/" className="flex items-center space-x-3">
      <img src="/logo.png" alt="Premium Sheets Logo" className="h-10 w-auto" /> 
      <h1 className="text-xl font-bold text-gray-900">Premium Sheets</h1>
    </Link>

    {/* Mobile Menu Button */}
    <button 
      className="md:hidden text-gray-700 hover:text-gray-900"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
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

    {/* Desktop Navigation Links */}
    <div className="hidden md:flex space-x-6">
      <Link href="/#home" className="text-gray-700 hover:text-gray-900 transition">
        Home
      </Link>
 
      <Link href="/#how-it-works" className="text-gray-700 hover:text-gray-900 transition">
        How It Works
      </Link>
      <Link href="/#faq" className="text-gray-700 hover:text-gray-900 transition">
        FAQ
      </Link>
      <Link href="/about" className="text-gray-700 hover:text-gray-900 transition">
        About
      </Link>

    </div>
  </div>

  {/* Mobile Navigation Menu */}
  {isMenuOpen && (
    <div className="md:hidden border-t border-gray-200">
      <div className="flex flex-col space-y-3 px-6 py-4 bg-white">
        <Link href="/#home" 
          className="text-gray-700 hover:text-gray-900 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link href="/#about" 
          className="text-gray-700 hover:text-gray-900 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link href="/#how-it-works" 
          className="text-gray-700 hover:text-gray-900 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          How It Works
        </Link>
        <Link href="/#faq" 
          className="text-gray-700 hover:text-gray-900 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          FAQ
        </Link>
      </div>
    </div>
  )}
</nav>


{/* Simplified Hero Section for User Acquisition */}
<main id="home" className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 min-h-[28vh] select-none max-w-6xl mx-auto">
  {/* Original Background */}
  <div className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden">
    <div className="absolute inset-0 gradient-bg" />

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
        className="mr-3 text-green-300 transform -mt-10"
        animate={{ 
          rotate: [0, 2, 0, -2, 0],
          y: [0, -2, 0, 2, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/gsheet.png" width="70" height="70" alt="Google Sheets Icon" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl font-extrabold tracking-tight text-gray-800 -mt-10"
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

    {/* Updated Subtext */}
    <motion.p
      className="text-gray-800 text-lg mb-4 mt-5 max-w-3xl mx-auto leading-relaxed shadow-sm p-3 rounded-lg bg-white/10 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <span className="font-semibold">Find the perfect template</span> with professional formulas and design. Solve your challenges faster, customize to your needs, and get inspired while making it your own.
    </motion.p>
    
   
  </motion.div>
</main>
      

     

      {/* Templates Section */}
      <section id="templates" className="relative z-10 p-6 md:p-12 text-center">

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="card-container"  
        >

<h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Browse Our Templates</h2>

<div className="flex flex-col items-center gap-2 mb-3">
  <p className="text-gray-700 text-center text-sm">
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
          : "bg-gray-200 hover:bg-blue-300 text-gray-800"
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
            : "bg-gray-200 hover:bg-blue-300 text-gray-800"
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
              className="w-full md:w-3/4 px-4 py-3 rounded-lg text-black mb-8 bg-gray-100 border border-gray-300 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
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
  <img src={template.image} className="card-img w-full h-48 object-cover" alt={template.name} />
  {template.hasFreeVersion && template.isPaid && (
    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
      Free Version Available
    </div>
  )}
</div>

{/* Card Content */}
<div className="p-5 flex flex-col justify-between bg-white rounded-b-xl border-t border-gray-200">
  <div className="mb-3 flex justify-between items-center">
    <div className="flex flex-wrap gap-1">
      {template.categories
        .filter(cat => cat.toLowerCase() !== 'free')
        .map((cat) => (
          <span
            key={cat}
            className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-900/60 text-indigo-200"
          >
            {cat}
          </span>
        ))}
    </div>

    {/* Price label - Only show if it's paid or completely free */}
    <div className={`px-2 py-1 rounded-lg text-sm font-bold ${
      !template.isPaid ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
    }`}>
      {template.price}
    </div>
  </div>

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


      {/* How It Works Section - With subtle hover effects */}
<section id="how-it-works" className="relative z-10 py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md text-center section-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Cell Reference */}
        <div className="cell-reference">A1:B10</div>
        
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-blue-200">
          <span className="text-2xl text-blue-600">1</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Browse & Select</h3>
        <p className="text-gray-600">Find the perfect template for your needs from our curated collection.</p>
        
        {/* Formula Bar */}
        <div className="formula-bar bg-blue-100"></div>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md text-center section-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Cell Reference */}
        <div className="cell-reference">C1:D10</div>
        
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-blue-600">2</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Preview & Purchase</h3>
        <p className="text-gray-600">Preview the template functionality before deciding to use the free version or purchase the premium version.</p>
        
        {/* Formula Bar */}
        <div className="formula-bar bg-blue-100"></div>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md text-center section-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Cell Reference */}
        <div className="cell-reference">E1:F10</div>
        
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-blue-600">3</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Copy & Customize</h3>
        <p className="text-gray-600">Make a copy to your Google Drive and start using it right away with your own data.</p>
        
        {/* Formula Bar */}
        <div className="formula-bar bg-blue-100"></div>
      </motion.div>
    </div>
  </div>
</section>

<section id="faq" className="relative z-10 py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
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
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <button
            onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 pr-8">
              {faq.question}
            </h3>
            <motion.div
              animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
              className="text-gray-500"
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
            <div className="px-6 pb-4 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

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
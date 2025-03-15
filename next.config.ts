import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure for static export
  output: "export", // Use static export for Netlify
  
  // Fix Image Optimization API compatibility with static export
  images: {
    unoptimized: true, // Disable the Image Optimization API for static export
  },
  
  // Add configuration to handle client components properly
  experimental: {
    // This helps with client components that might use URL parameters
    serverActions: {
      allowedOrigins: ["localhost:3000", "sheetsmaster.co"],
    },
  },
};

export default nextConfig;
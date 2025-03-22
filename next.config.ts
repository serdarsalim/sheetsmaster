import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove the static export configuration since Vercel supports all Next.js features
  // output: "export", 
  
  // Image optimization works natively on Vercel, so you can remove this or set to false
  images: {
    // unoptimized: true, // Not needed for Vercel
  },
  
  // Keep experimental features if needed
  experimental: {
    // This helps with client components that might use URL parameters
    serverActions: {
      allowedOrigins: ["localhost:3000", "sheetsmaster.co"],
    },
  },
};

export default nextConfig;
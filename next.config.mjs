/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enabling SWC minifier for production builds
    swcMinify: true,
  
    // Enabling modern JavaScript for better performance
    experimental: {
      modern: true, // This will serve modern JavaScript to modern browsers
    },
  
    // You can add other performance and optimizations here if needed
  }
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enabling SWC minifier for production builds
  swcMinify: true,

  // Enabling modern JavaScript for better performance
  experimental: {
    modern: true, // This will serve modern JavaScript to modern browsers
  },

  // Redirect all routes to mardi.ge temporarily
  async redirects() {
    return [
      {
        source: "/:path*", // Match all paths
        destination: "https://mardi.ge", // Redirect to the target site
        permanent: false, // Temporary redirect (307)
      },
    ];
  },
};

export default nextConfig;

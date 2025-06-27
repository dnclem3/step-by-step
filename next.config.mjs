/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  output: 'export',  // Enable static exports
  basePath: '/step-by-step', // GitHub Pages repository name
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

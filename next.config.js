/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = withLess({
    reactStrictMode: true,
    images: {
      unoptimized: true,
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === "production"
    },
    async rewrites() {
      return [
        { source: '/app/:path*', destination: `http://127.0.0.1:8080/app/:path*` },
      ]
    },
    exportPathMap: function () {
      return {
        '/': { page: '/' },
        '/home': { page: '/home' },
      }
    },
    webpack: {
      module: {
        rules: []
      },
    }
  })
  
  module.exports = nextConfig
  
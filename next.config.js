/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching: require('next-pwa/cache'),
    disable: process.env.NODE_ENV === 'development',
  },
});

const nextConfig = withPWA({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
      },
    ],
  },
  reactStrictMode: false,
});

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // async redirects() {
  //   return [
  //     // Basic redirect
  //     {
  //       source: "/",
  //       destination: "/login",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;

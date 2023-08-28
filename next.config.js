/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'bo.adpadelhouse.com',
        port: '',
        pathname: '/assets/images/ilogo.png',
      },
    ],
  },
};

module.exports = nextConfig;

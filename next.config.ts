/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nalli.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com', // YE WALI LINE ADD KARNI HAI
      },
    ],
  },
};

export default nextConfig;
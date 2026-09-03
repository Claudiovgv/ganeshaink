/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3002', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'api.ganeshaink.pt', pathname: '/uploads/**' },
    ],
  },
};

export default nextConfig;

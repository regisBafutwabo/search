import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // For the sake of the challenge
      },
    ]
  }
};

export default nextConfig;

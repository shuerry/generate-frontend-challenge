import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://prods.garrettladley.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;

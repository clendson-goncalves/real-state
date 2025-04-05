import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "dummyimage.com",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig;

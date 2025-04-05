import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cms.oneklik.pl",
      },
      {
        protocol: "https",
        hostname: "cms.oneklik.pl",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.oneklik.pl", pathname: "/**" },
      { protocol: "http", hostname: "cms.oneklik.pl", pathname: "/**" }, // tymczasowo, jeśli URL jest http
    ],
  },
};

export default nextConfig;

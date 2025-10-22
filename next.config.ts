// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.oneklik.pl" },
      { protocol: "http",  hostname: "cms.oneklik.pl" }, // jeśli gdzieś trafia http
    ],
    deviceSizes: [640, 768],
    imageSizes: [100, 150, 200],
    minimumCacheTTL: 60 * 60 * 24,
  },
};
export default nextConfig;

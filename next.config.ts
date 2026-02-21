import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.oneklik.pl", pathname: "/**" },
      { protocol: "http", hostname: "cms.oneklik.pl", pathname: "/**" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/kontakt",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
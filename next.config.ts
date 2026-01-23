import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config.js";

const nextConfig: NextConfig = {
  i18n,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.us-east-1.amazonaws.com",
        pathname: "/*",
      }
    ],
  },
};

export default nextConfig;

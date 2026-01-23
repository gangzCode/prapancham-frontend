import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config.js";

const nextConfig: NextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prapancham-prod-assets.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

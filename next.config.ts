import type { NextConfig } from "next";
import path from "node:path";

const componentsRoot = path.resolve(process.cwd(), "components");

const nextConfig: NextConfig = {
  // Turbopack (next dev / next build): https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack
  turbopack: {
    resolveAlias: {
      ".@components": componentsRoot,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ".@components": componentsRoot,
    };
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "node:path";

const componentsRoot = path.resolve(process.cwd(), "components");

const nextConfig: NextConfig = {
  // Source: https://nextjs.org/docs/app/guides/self-hosting#docker
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/cases",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/cases/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/calculator",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/en/calculator",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ua/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/kz/blog/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/ru/blog/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/news/:path*",
        destination: "/services",
        permanent: true,
      },
    ];
  },
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

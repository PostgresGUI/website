import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Turbopack configuration for Next.js 16
  turbopack: {
    resolveAlias: {
      // Handle sql.js - it tries to require 'fs' which isn't available in browser
      fs: { browser: './lib/empty-module.js' },
      path: { browser: './lib/empty-module.js' },
      crypto: { browser: './lib/empty-module.js' },
    },
  },
  // Webpack configuration for fallback builds
  webpack: (config, { isServer }) => {
    // Handle sql.js - it tries to require 'fs' which isn't available in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;

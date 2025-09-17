import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // During development builds
  },
  output: "standalone",
};

export default nextConfig;

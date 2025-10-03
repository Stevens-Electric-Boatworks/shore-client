import type { NextConfig } from "next";

const now = new Date();
const pad = (n: number) => n.toString().padStart(2, "0");
const BUILD_ID = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
  now.getDate()
)}-${pad(now.getHours())}${pad(now.getMinutes())}`;

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // During development builds
  },
  output: "standalone",
  generateBuildId: async () => {
    // Use the precomputed build id so the same value is available in env
    return BUILD_ID;
  },
  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
    NEXT_PUBLIC_BUILD_TIME: now.toISOString(),
  },
};

export default nextConfig;

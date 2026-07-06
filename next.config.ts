import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 (used by the Prisma driver adapter) is a native addon —
  // it must run as-is in the Node.js server runtime, not be bundled.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;

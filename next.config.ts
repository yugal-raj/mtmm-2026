import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // WHY: 75 is Next's default for all images; 90 is used only for the home hero photos, which fill most of the screen
    // and showed visible compression softness at 75
    qualities: [75, 90],
  },
};

export default nextConfig;

import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  images: { formats: ["image/webp"], deviceSizes: [480, 640, 750, 960, 1200, 1600, 1920], qualities: [75, 85] },
};
export default config;

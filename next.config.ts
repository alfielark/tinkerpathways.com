import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/governance",
        destination: "/team",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

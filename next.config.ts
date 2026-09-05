import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

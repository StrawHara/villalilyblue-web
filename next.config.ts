import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "villalilyblue.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/rooms",
        destination: "/villa",
        permanent: true,
      },
      {
        source: "/:locale(fr|en|es)/rooms",
        destination: "/:locale/villa",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

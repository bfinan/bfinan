// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // optional; you can even omit this entirely
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/tokyo/:path*",
        destination:
          "https://docs.google.com/document/d/19QiG39nPI3nltA4SWrewXhPVZm5mbPobMRdxv24uoxs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

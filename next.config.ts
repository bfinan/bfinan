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
      {
        source: "/sbz1",
        destination:
          "https://docs.google.com/presentation/d/1yVI5SPjlClHibWxxIhnNt6Cls7uRDu3X_CjUJyQEgzU/edit?usp=sharing",
        permanent: true,
      },
      {
        source: "/SBZ1",
        destination:
          "https://docs.google.com/presentation/d/1yVI5SPjlClHibWxxIhnNt6Cls7uRDu3X_CjUJyQEgzU/edit?usp=sharing",
        permanent: true,
      },
      {
        source: "/sbz2",
        destination:
          "https://docs.google.com/presentation/d/1eXls4AbhW9135FJANsnY93iENXmjer1JvCSvltzKSuc/",
        permanent: true,
      },
      {
        source: "/SBZ2",
        destination:
          "https://docs.google.com/presentation/d/1eXls4AbhW9135FJANsnY93iENXmjer1JvCSvltzKSuc/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

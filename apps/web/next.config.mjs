/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/loader.ts",
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/HjKDVu2rAH",
        permanent: false,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@esohasl",
        permanent: false,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
    turbo: {
      resolveAlias: {
        "next/dist/shared/lib/image-loader": "./src/lib/loader.ts",
      },
    },
  },
};

export default nextConfig;

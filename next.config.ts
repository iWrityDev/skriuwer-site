import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/blog": ["./content/blog/**"],
    "/blog/[slug]": ["./content/blog/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products/:slug",
        destination: "/books/:slug",
        permanent: true,
      },
      {
        source: "/blogs/articles/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/collections/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

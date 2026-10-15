/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  // BELLA, EAN, FANCY and WINTER were removed on 2026-10-15. Old links
  // (ads, WhatsApp shares, Google) land on the indoor catalogue instead
  // of a 404. Temporary so it is easy to undo if a model comes back.
  async redirects() {
    return ["aihaa-bella", "aihaa-ean", "aihaa-fancy", "aihaa-winter"].map(
      (slug) => ({
        source: `/product/${slug}`,
        destination: "/produk-dalam",
        permanent: false,
      })
    );
  },
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

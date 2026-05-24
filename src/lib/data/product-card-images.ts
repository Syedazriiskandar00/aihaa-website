// Centralized config for product listing card images.
//
// ProductCard (src/components/ProductCard.tsx) reads from this file
// to render the card image with mobile-pair picture/source swap.
//
// Why this lives outside products.ts:
// - products.ts is the single source of truth for product *data*
//   (name, price, specs, gallery for detail pages).
// - This file controls the *presentation* asset used on listing
//   cards — a different image pipeline (3:4 portrait, mobile pair,
//   smaller payload). Decoupling lets us iterate on card visuals
//   without touching catalogue data.
//
// MIGRATION PLAN:
// Today every product's `desktop`/`mobile` points at the existing
// hero-banner.webp (or main.png / main.jpg for ean + penapis-boring).
// These are landscape sources, so the 3:4 portrait card frame crops
// them aggressively on mobile — known visual issue.
//
// Target convention for purpose-built portrait card images:
//   /images/products/[slug]/card.webp         (800px wide, Q80, 3:4)
//   /images/products/[slug]/card-mobile.webp  (600px wide, Q75, 3:4)
//
// To swap a product in: replace its `desktop` + `mobile` paths with
// the new card.webp / card-mobile.webp paths below. ProductCard
// picks up the change automatically — no component edit needed.

export type ProductCardImage = {
  slug: string;
  desktop: string; // path served on viewports > 768px
  mobile: string; // path served on viewports <= 768px (via <picture><source>)
  alt: string; // BM-leaning alt text, intentionally simple (not bilingual)
};

export const productCardImages: Record<string, ProductCardImage> = {
  // ─────────── INDOOR (5) ───────────
  "aihaa-bella": {
    slug: "aihaa-bella",
    desktop: "/images/products/bella/hero-banner.webp",
    mobile: "/images/products/bella/hero-banner-mobile.webp",
    alt: "AIHAA BELLA — Penapis Air Stand Floor",
  },
  "aihaa-big": {
    slug: "aihaa-big",
    desktop: "/images/products/big/hero-banner.webp",
    mobile: "/images/products/big/hero-banner-mobile.webp",
    alt: "AIHAA BIG — Penapis Air Kapasiti 17 Liter",
  },
  "aihaa-ean": {
    // ean still on legacy main.png — no hero-banner card variant yet.
    // Same path for desktop + mobile until card.webp pair is generated.
    slug: "aihaa-ean",
    desktop: "/images/products/ean/main.png",
    mobile: "/images/products/ean/main.png",
    alt: "AIHAA EAN — Penapis Air Bajet Digital",
  },
  "aihaa-fancy": {
    slug: "aihaa-fancy",
    desktop: "/images/products/fancy/hero-banner.webp",
    mobile: "/images/products/fancy/hero-banner-mobile.webp",
    alt: "AIHAA FANCY — Penapis Air Slim Moden 3 Tangki",
  },
  "aihaa-winter": {
    slug: "aihaa-winter",
    desktop: "/images/products/winter/hero-banner.webp",
    mobile: "/images/products/winter/hero-banner-mobile.webp",
    alt: "AIHAA WINTER — Penapis Air Premium dengan Ice Maker",
  },

  // ─────────── OUTDOOR (9) ───────────
  "ultra-one": {
    slug: "ultra-one",
    desktop: "/images/products/ultra-one/hero-banner.webp",
    mobile: "/images/products/ultra-one/hero-banner-mobile.webp",
    alt: "ULTRA ONE — Penapis Air Luar All-in-One",
  },
  "fiber-9x42": {
    slug: "fiber-9x42",
    desktop: "/images/products/fiber-9x42/hero-banner.webp",
    mobile: "/images/products/fiber-9x42/hero-banner-mobile.webp",
    alt: "FIBER 9x42 — Penapis Air Tangki Fiber",
  },
  "fiber-10x44": {
    slug: "fiber-10x44",
    desktop: "/images/products/fiber-10x44/hero-banner.webp",
    mobile: "/images/products/fiber-10x44/hero-banner-mobile.webp",
    alt: "FIBER 10x44 — Penapis Air Tangki Fiber Besar",
  },
  steel: {
    slug: "steel",
    desktop: "/images/products/steel/hero-banner.webp",
    mobile: "/images/products/steel/hero-banner-mobile.webp",
    alt: "AIHAA STEEL — Penapis Air Stainless Steel 304",
  },
  "penapis-boring-13x54": {
    // penapis-boring on legacy main.jpg (4.1 MB!) — no mobile pair.
    // Top-priority migration target: too large + no mobile pair.
    slug: "penapis-boring-13x54",
    desktop: "/images/products/penapis-boring/main.jpg",
    mobile: "/images/products/penapis-boring/main.jpg",
    alt: "PENAPIS BORING 13x54 — Penapis Air Bawah Tanah",
  },
  pvdf: {
    slug: "pvdf",
    desktop: "/images/products/pvdf/hero-banner.webp",
    mobile: "/images/products/pvdf/hero-banner-mobile.webp",
    alt: "PVDF — Penapis Air Gred Profesional",
  },
  "pvdf-plus": {
    slug: "pvdf-plus",
    desktop: "/images/products/pvdf-plus/hero-banner.webp",
    mobile: "/images/products/pvdf-plus/hero-banner-mobile.webp",
    alt: "PVDF PLUS — Penapis Air 6000L/Jam",
  },
  "super-pleated": {
    slug: "super-pleated",
    desktop: "/images/products/super-pleated/hero-banner.webp",
    mobile: "/images/products/super-pleated/hero-banner-mobile.webp",
    alt: "SUPER PLEATED — Penapis Air Pleated Kompak",
  },
  "uf-double-backwash": {
    slug: "uf-double-backwash",
    desktop: "/images/products/uf-double-backwash/hero-banner.webp",
    mobile: "/images/products/uf-double-backwash/hero-banner-mobile.webp",
    alt: "UF DOUBLE BACKWASH — Penapis Air Membran UF",
  },
};

// Returns the card image config for a given product slug, or null
// if no entry exists. ProductCard falls back to the legacy `image`
// prop (product.mainImage) when this returns null, preserving
// behavior for products not yet in the config.
export function getCardImage(slug: string): ProductCardImage | null {
  return productCardImages[slug] ?? null;
}

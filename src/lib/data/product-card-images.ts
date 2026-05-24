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
// Convention for portrait card images (used by all 12 products):
//   /images/products/[slug]/card.webp         (800px wide, Q80, 3:4)
//   /images/products/[slug]/card-mobile.webp  (600px wide, Q75, 3:4)
//
// To add a new product card: drop card.webp + card-mobile.webp into the
// product folder and add an entry below. ProductCard picks up the change
// automatically.

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
    desktop: "/images/products/bella/card.webp",
    mobile: "/images/products/bella/card-mobile.webp",
    alt: "AIHAA BELLA — Penapis Air Stand Floor",
  },
  "aihaa-big": {
    slug: "aihaa-big",
    desktop: "/images/products/big/card.webp",
    mobile: "/images/products/big/card-mobile.webp",
    alt: "AIHAA BIG — Penapis Air Kapasiti 17 Liter",
  },
  "aihaa-ean": {
    slug: "aihaa-ean",
    desktop: "/images/products/ean/card.webp",
    mobile: "/images/products/ean/card-mobile.webp",
    alt: "AIHAA EAN — Penapis Air Bajet Digital",
  },
  "aihaa-fancy": {
    slug: "aihaa-fancy",
    desktop: "/images/products/fancy/card.webp",
    mobile: "/images/products/fancy/card-mobile.webp",
    alt: "AIHAA FANCY — Penapis Air Slim Moden 3 Tangki",
  },
  "aihaa-winter": {
    slug: "aihaa-winter",
    desktop: "/images/products/winter/card.webp",
    mobile: "/images/products/winter/card-mobile.webp",
    alt: "AIHAA WINTER — Penapis Air Premium dengan Ice Maker",
  },

  // ─────────── OUTDOOR (7) ───────────
  "ultra-one": {
    slug: "ultra-one",
    desktop: "/images/products/ultra-one/card.webp",
    mobile: "/images/products/ultra-one/card-mobile.webp",
    alt: "ULTRA ONE — Penapis Air Luar All-in-One",
  },
  "fiber-9x42": {
    slug: "fiber-9x42",
    desktop: "/images/products/fiber-9x42/card.webp",
    mobile: "/images/products/fiber-9x42/card-mobile.webp",
    alt: "FIBER 9x42 — Penapis Air Tangki Fiber",
  },
  "fiber-10x44": {
    slug: "fiber-10x44",
    desktop: "/images/products/fiber-10x44/card.webp",
    mobile: "/images/products/fiber-10x44/card-mobile.webp",
    alt: "FIBER 10x44 — Penapis Air Tangki Fiber Besar",
  },
  steel: {
    slug: "steel",
    desktop: "/images/products/steel/card.webp",
    mobile: "/images/products/steel/card-mobile.webp",
    alt: "AIHAA STEEL — Penapis Air Stainless Steel 304",
  },
  pvdf: {
    slug: "pvdf",
    desktop: "/images/products/pvdf/card.webp",
    mobile: "/images/products/pvdf/card-mobile.webp",
    alt: "PVDF — Penapis Air Gred Profesional",
  },
  "pvdf-plus": {
    slug: "pvdf-plus",
    desktop: "/images/products/pvdf-plus/card.webp",
    mobile: "/images/products/pvdf-plus/card-mobile.webp",
    alt: "PVDF PLUS — Penapis Air 6000L/Jam",
  },
  "uf-double-backwash": {
    slug: "uf-double-backwash",
    desktop: "/images/products/uf-double-backwash/card.webp",
    mobile: "/images/products/uf-double-backwash/card-mobile.webp",
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

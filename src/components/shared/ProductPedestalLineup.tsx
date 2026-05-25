"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data/products";

export type PedestalBadge = {
  slug: string;
  label: string;
  tone: "gold" | "white";
};

type ProductPedestalLineupProps = {
  products: Product[];
  pedestalHeights: number[];
  badges?: PedestalBadge[];
};

// Reusable lineup of products on cream pedestals at varying heights — the
// composition used on /produk-dalam (all 5 indoor) and on the homepage
// hero (same 5). Pedestal heights per-product create UP-DOWN-UP rhythm;
// badges float near the top of the product image for tier-anchor products
// (e.g. BELLA = PILIHAN RAMAI, WINTER = PREMIUM).
//
// Mobile: horizontal snap-scroll via .no-scrollbar utility (globals.css).
// Desktop: centered flex row, all products visible at once.
export default function ProductPedestalLineup({
  products,
  pedestalHeights,
  badges,
}: ProductPedestalLineupProps) {
  const badgeFor = (slug: string): PedestalBadge | undefined =>
    badges?.find((b) => b.slug === slug);

  return (
    <div className="relative">
      <div className="flex items-end justify-start md:justify-center gap-3 md:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible pb-2 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {products.map((product, i) => {
          const pedestalHeight = pedestalHeights[i] ?? 32;
          const badge = badgeFor(product.slug);
          const badgeTone =
            badge?.tone === "gold" ? "bg-gold text-dark" : "bg-white text-dark";

          return (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="group flex flex-col items-center shrink-0 w-[148px] md:w-[176px] lg:w-[192px] snap-center transition-transform hover:-translate-y-1"
            >
              {/* Product image container — fixed height, product bottom-anchored */}
              <div className="relative w-full h-[220px] md:h-[260px] lg:h-[300px] flex items-end justify-center">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 148px, 192px"
                />
                {badge ? (
                  <span
                    className={`absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold shadow-sm ${badgeTone}`}
                  >
                    {badge.label}
                  </span>
                ) : null}
              </div>

              {/* Cream pedestal — variable height creates the rhythm */}
              <div
                className="w-full bg-cream text-dark flex flex-col items-center justify-center px-3 rounded-sm"
                style={{ minHeight: `${pedestalHeight}px` }}
              >
                <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] leading-tight text-center">
                  {product.name.replace(/^AIHAA\s+/, "")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

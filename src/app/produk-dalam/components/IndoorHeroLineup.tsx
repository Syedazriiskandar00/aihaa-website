"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug } from "@/lib/data/products";

// Hybrid hero layout per Azri's direction:
// - All 5 indoor products on cream pedestals (AIHAA poster aesthetic)
// - Varying pedestal heights create deliberate compositional rhythm
// - BELLA (bestseller) + WINTER (flagship) still get tier-badge treatment
// - Grid below hero carries complementary info (price, specs) — not a mirror
//
// Pedestal height rhythm (px), reading EAN → WINTER:
//   [ tall, short, medium-tall, medium, medium-tall ]
// EAN lifted so a small desktop unit gets presence; BIG grounded so its
// natural 17L-floor-standing form doesn't dominate; featured pair slightly
// elevated without dwarfing the non-featured three. Badges float on the
// pedestal face, not competing with gold accents elsewhere in the hero.

const HERO_LINEUP: Array<{
  slug: string;
  pedestalHeight: number;
  badgeKind?: "bestseller" | "premium";
}> = [
  { slug: "aihaa-ean", pedestalHeight: 56 },
  { slug: "aihaa-big", pedestalHeight: 24 },
  { slug: "aihaa-bella", pedestalHeight: 44, badgeKind: "bestseller" },
  { slug: "aihaa-fancy", pedestalHeight: 36 },
  { slug: "aihaa-winter", pedestalHeight: 44, badgeKind: "premium" },
];

export default function IndoorHeroLineup() {
  const { t } = useLanguage();

  const columns = HERO_LINEUP.map((entry) => ({
    ...entry,
    product: getProductBySlug(entry.slug),
  })).filter((c) => c.product !== undefined);

  return (
    <section className="relative overflow-hidden bg-dark pt-28 pb-16 lg:pt-36 lg:pb-20">
      {/* Subtle radial glow top-center — warmth without gradient drift */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-80 opacity-[0.10]"
        style={{
          background:
            "radial-gradient(ellipse at center top, #DAA520 0, transparent 60%)",
        }}
      />
      {/* Dotted texture — same pattern language as /produk-luar but tuned for dark */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* AIHAA wordmark — gold, small, centered */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="font-editorial text-gold text-xl md:text-2xl tracking-[0.22em] leading-none">
            AIHAA
          </span>
          <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-gold/60 font-semibold">
            Marketing Sdn Bhd
          </div>
        </div>

        {/* Headline block */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-5">
            {t.produk_dalam_hero_eyebrow}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-white leading-[1.04] mb-3">
            {t.produk_dalam_hero_heading}
          </h1>
          <p className="font-editorial-italic text-2xl md:text-3xl text-gold mb-6">
            {t.produk_dalam_hero_italic}
          </p>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-white/70 max-w-xl mx-auto">
            {t.produk_dalam_hero_tagline}
          </p>
        </div>

        {/* Pedestal lineup — all 5 products */}
        <div className="relative">
          <div className="flex items-end justify-start md:justify-center gap-3 md:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible pb-2 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {columns.map(({ product, pedestalHeight, badgeKind }) => {
              if (!product) return null;
              const badgeText =
                badgeKind === "bestseller"
                  ? t.produk_dalam_hero_featured_bestseller_badge
                  : badgeKind === "premium"
                  ? t.produk_dalam_hero_featured_premium_badge
                  : null;
              const badgeTone =
                badgeKind === "premium"
                  ? "bg-gold text-dark"
                  : "bg-white text-dark";

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
                    {/* Floating tier badge — only for BELLA + WINTER */}
                    {badgeText ? (
                      <span
                        className={`absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold shadow-sm ${badgeTone}`}
                      >
                        {badgeText}
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

        {/* Scroll CTA → #indoor-grid */}
        <div className="text-center mt-12 lg:mt-14">
          <a
            href="#indoor-grid"
            className="inline-flex items-center gap-2 text-white/80 text-[13px] font-semibold tracking-wide hover:text-gold transition-colors"
          >
            {t.produk_dalam_hero_cta}
            <span aria-hidden className="text-gold">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug, type Product } from "@/lib/data/products";
import ProductPedestalLineup, {
  type PedestalBadge,
} from "@/components/shared/ProductPedestalLineup";

// Hybrid hero layout per Azri's direction:
// - All 5 indoor products on cream pedestals (AIHAA poster aesthetic)
// - Varying pedestal heights create deliberate compositional rhythm
// - BELLA (bestseller) + WINTER (flagship) get tier-badge treatment
//
// Pedestal height rhythm (px), reading EAN → WINTER:
//   [ 56, 24, 44, 36, 44 ] — TALL, SHORT, MED-TALL, MED, MED-TALL
// creates an UP-DOWN-UP-DOWN-UP visual wave.

const LINEUP_SLUGS = [
  "aihaa-ean",
  "aihaa-big",
  "aihaa-bella",
  "aihaa-fancy",
  "aihaa-winter",
] as const;

const PEDESTAL_HEIGHTS = [56, 24, 44, 36, 44];

export default function IndoorHeroLineup() {
  const { t } = useLanguage();

  const products: Product[] = LINEUP_SLUGS.map((slug) =>
    getProductBySlug(slug)
  ).filter((p): p is Product => p !== undefined);

  const badges: PedestalBadge[] = [
    {
      slug: "aihaa-bella",
      label: t.produk_dalam_hero_featured_bestseller_badge,
      tone: "white",
    },
    {
      slug: "aihaa-winter",
      label: t.produk_dalam_hero_featured_premium_badge,
      tone: "gold",
    },
  ];

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
      {/* Dotted texture */}
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

        {/* Produk Dalam Lineup — Full Grid Visual */}
        <div className="mb-14 lg:mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-white max-w-6xl mx-auto">
            <Image
              src="/images/listings/indoor-hero.webp.webp"
              alt="Semua 6 model penapis air dalam AIHAA — EAN, Fancy, Ultra 1, Bella, Big, Winter"
              width={4269}
              height={3100}
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Shared 5-pedestal lineup */}
        <ProductPedestalLineup
          products={products}
          pedestalHeights={PEDESTAL_HEIGHTS}
          badges={badges}
        />

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

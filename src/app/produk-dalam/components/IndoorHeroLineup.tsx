"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug } from "@/lib/data/products";

// Spotlight-champions hero — EAN (PILIHAN RAMAI) + WINTER (PREMIUM) render
// as 2 big featured cards, mirroring SageHeroLineup's pattern on
// /produk-luar so indoor and outdoor listings feel consistent. The rest
// of the indoor catalog (BELLA, BIG, FANCY) lives in IndoorGrid below.

export default function IndoorHeroLineup() {
  const { t, locale } = useLanguage();
  const ean = getProductBySlug("aihaa-ean");
  const winter = getProductBySlug("aihaa-winter");

  if (!ean || !winter) return null;

  const featured = [
    {
      product: ean,
      badge: t.produk_dalam_hero_featured_bestseller_badge,
      badgeTone: "light" as const,
    },
    {
      product: winter,
      badge: t.produk_dalam_hero_featured_premium_badge,
      badgeTone: "dark" as const,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-20">
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
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.04] mb-3">
            {t.produk_dalam_hero_heading}
          </h1>
          <p className="font-editorial-italic text-2xl md:text-3xl text-gold-dark mb-6">
            {t.produk_dalam_hero_italic}
          </p>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-muted max-w-xl mx-auto">
            {t.produk_dalam_hero_tagline}
          </p>
        </div>

        {/* Produk Dalam Lineup — Full Grid Visual (cream frame for seamless blend) */}
        <div className="mb-14 lg:mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-surface max-w-6xl mx-auto">
            <Image
              src="/images/listings/indoor-hero.webp"
              alt="Semua 6 model penapis air dalam AIHAA — EAN (4 color variants), Fancy, Ultra 1, Bella, Big, Winter"
              width={4269}
              height={2391}
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Featured pair — mirrors SageHeroLineup pattern for size parity
            across outdoor and indoor listings. Each card: floating badge
            top-left, product image on cream canvas, name + tagline + price. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {featured.map(({ product, badge, badgeTone }) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="group relative bg-cream rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              <span
                className={`absolute top-5 left-5 z-10 inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.16em] font-semibold ${
                  badgeTone === "dark"
                    ? "bg-dark text-gold"
                    : "bg-white text-dark"
                }`}
              >
                {badge}
              </span>

              <div className="relative aspect-[4/5] flex items-center justify-center p-8">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-10 transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="bg-white px-6 py-5 border-t border-black/5">
                <h2 className="font-editorial text-2xl md:text-3xl text-dark leading-tight mb-1">
                  {product.name}
                </h2>
                <p className="text-[13px] text-muted mb-3">
                  {product.tagline[locale]}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-dark text-lg">
                    {product.price}
                  </span>
                  {product.oldPrice ? (
                    <span className="text-muted text-[12px] line-through">
                      {product.oldPrice}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll CTA → #indoor-grid */}
        <div className="text-center">
          <a
            href="#indoor-grid"
            className="inline-flex items-center gap-2 text-dark/80 text-[13px] font-semibold tracking-wide hover:text-gold-dark transition-colors"
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

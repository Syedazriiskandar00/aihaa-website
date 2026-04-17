"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug } from "@/lib/data/products";

const SAGE = "#B5C5A5";

export default function SageHeroLineup() {
  const { t, locale } = useLanguage();
  const pvdfPlus = getProductBySlug("pvdf-plus");
  const ultraOne = getProductBySlug("ultra-one");

  if (!pvdfPlus || !ultraOne) return null;

  const featured = [
    {
      product: pvdfPlus,
      badge: t.produk_luar_hero_featured_premium_badge,
      badgeTone: "dark" as const,
    },
    {
      product: ultraOne,
      badge: t.produk_luar_hero_featured_value_badge,
      badgeTone: "light" as const,
    },
  ];

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-24"
      style={{ background: SAGE }}
    >
      {/* Subtle dotted texture — not a card, just depth */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #0D0D0D 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline block */}
        <div className="text-center mb-14 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark/70 font-semibold mb-5">
            {t.produk_luar_hero_eyebrow}
          </p>
          <h1 className="font-editorial text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] mb-3">
            {t.produk_luar_hero_heading}
          </h1>
          <p className="font-editorial-italic text-2xl md:text-3xl text-dark/80 mb-6">
            {t.produk_luar_hero_italic}
          </p>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-dark/75 max-w-xl mx-auto">
            {t.produk_luar_hero_tagline}
          </p>
        </div>

        {/* Featured pair — not a symmetric 2-card grid; tier badge gives hierarchy */}
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
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold mb-1">
                  {t.produk_luar_hero_featured_label}
                </p>
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

        {/* Single scroll CTA — no gold button (sage bg already carries hierarchy) */}
        <div className="text-center">
          <a
            href="#outdoor-grid"
            className="inline-flex items-center gap-2 text-dark text-[13px] font-semibold tracking-wide hover:text-white transition-colors"
          >
            {t.produk_luar_hero_cta}
            <span aria-hidden className="text-gold">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

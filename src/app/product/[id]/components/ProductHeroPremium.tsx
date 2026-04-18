"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";
import {
  whatsappUrl,
  whatsappMessages,
} from "@/lib/config/contact";

// Tone-adaptive hero per Phase 6 spec:
//   indoor  → dark #0D0D0D bg + gold accents (matches /produk-dalam)
//   outdoor → sage #B5C5A5 bg (matches /produk-luar)
// Section 2 onward reverts to white/neutral for editorial consistency;
// only the hero signals category.
//
// Uses the existing ProductBadge enum from products.ts for tier chips —
// no bespoke "bestseller" override here. If Azri wants AIHAA BELLA to
// display a tier chip on detail pages, add `badge: "popular"` (or a new
// enum value) in products.ts; this component reads straight from data.

const BADGE_LABELS: Record<
  NonNullable<Product["badge"]>,
  { bm: string; en: string }
> = {
  popular: { bm: "POPULAR", en: "POPULAR" },
  sale: { bm: "JIMAT", en: "SALE" },
  premium: { bm: "PREMIUM", en: "PREMIUM" },
  "best-value": { bm: "NILAI TERBAIK", en: "BEST VALUE" },
  "pro-grade": { bm: "GRED PRO", en: "PRO GRADE" },
};

const BADGE_TONES: Record<NonNullable<Product["badge"]>, string> = {
  popular: "bg-gold text-dark",
  sale: "bg-red-600 text-white",
  premium: "bg-white text-dark",
  "best-value": "bg-white text-dark",
  "pro-grade": "bg-white text-dark",
};

type Props = {
  product: Product;
};

export default function ProductHeroPremium({ product }: Props) {
  const { t, locale } = useLanguage();
  const isOutdoor = product.category === "outdoor";

  const heroClass = isOutdoor
    ? "bg-[#B5C5A5] text-dark"
    : "bg-dark text-white";
  const imageFrameClass = isOutdoor
    ? "bg-cream border border-dark/10"
    : "bg-[#1A1A1A] border border-white/10";
  const eyebrowClass = isOutdoor ? "text-dark/80" : "text-gold";
  const subHeadClass = isOutdoor ? "text-dark/70" : "text-white/70";
  const priceColor = isOutdoor ? "text-dark" : "text-gold";
  const oldPriceColor = isOutdoor ? "text-dark/40" : "text-white/40";
  const secondaryCTAClass = isOutdoor
    ? "border border-dark/40 text-dark hover:bg-dark/5"
    : "border border-gold/60 text-gold hover:bg-gold/10";

  const categoryLabel = isOutdoor
    ? t.product_outdoor_label
    : t.product_indoor_label;

  const badgeMeta = product.badge
    ? {
        label: BADGE_LABELS[product.badge][locale],
        tone: BADGE_TONES[product.badge],
      }
    : null;

  return (
    <section
      className={`relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 ${heroClass}`}
    >
      {/* Tone-appropriate texture — dotted gold on dark, subtle dark dots on sage */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: isOutdoor
            ? "radial-gradient(circle at 2px 2px, #0D0D0D 1px, transparent 0)"
            : "radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left — product image */}
          <div
            className={`relative rounded-2xl overflow-hidden aspect-square ${imageFrameClass} flex items-center justify-center p-6 lg:p-10`}
          >
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              className="object-contain p-6 lg:p-12"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right — info */}
          <div>
            <p
              className={`text-[11px] uppercase tracking-[0.24em] font-semibold mb-4 ${eyebrowClass}`}
            >
              {categoryLabel}
            </p>

            <div className="flex items-start gap-3 flex-wrap mb-4">
              <h1 className="font-editorial text-3xl md:text-4xl lg:text-5xl leading-[1.06]">
                {product.name}
              </h1>
              {badgeMeta ? (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold shadow-sm ${badgeMeta.tone}`}
                >
                  {badgeMeta.label}
                </span>
              ) : null}
            </div>

            <p
              className={`font-editorial-italic text-lg md:text-xl mb-4 ${
                isOutdoor ? "text-dark/90" : "text-gold"
              }`}
            >
              {product.tagline[locale]}
            </p>
            <p className={`text-[14px] md:text-[15px] leading-relaxed mb-8 ${subHeadClass}`}>
              {product.description[locale]}
            </p>

            {/* Price block */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className={`font-editorial text-4xl lg:text-5xl ${priceColor}`}>
                {product.price}
              </span>
              {product.oldPrice ? (
                <span className={`text-lg line-through ${oldPriceColor}`}>
                  {product.oldPrice}
                </span>
              ) : null}
            </div>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href={whatsappUrl(whatsappMessages.productInquiry(product.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-dark px-7 py-3 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
              >
                {t.detail_cta_buy}
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#specifications"
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-[13.5px] font-semibold tracking-wide transition-colors ${secondaryCTAClass}`}
              >
                {t.product_detail_hero_cta_secondary}
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

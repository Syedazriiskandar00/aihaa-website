"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getProductBySlug, type Product } from "@/lib/data/products";
import ProductPedestalLineup, {
  type PedestalBadge,
} from "@/components/shared/ProductPedestalLineup";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

// SPEC §1.1 Hero Lineup — dark hero, 3-line editorial title, AIHAA's
// 5-indoor pedestal lineup as the brand anchor, dual CTA.
//
// The dual-CTA pattern is an explicit SPEC exception to the lessons.md
// "one CTA per section" rule. SPEC calls for primary WhatsApp CTA +
// secondary outlined link to /produk-dalam so visitors have both the
// instant-conversion path AND the "browse first" path without scrolling.
//
// Shares the 5-pedestal composition with /produk-dalam (via
// ProductPedestalLineup) — same products, same pedestal heights, same
// BELLA + WINTER tier badges. The homepage differentiates itself via
// copy, not lineup: "PENAPIS AIR / JIMAT / SEKALI BAYAR" emphasizes the
// one-time-payment value prop that sets AIHAA apart from Coway/Cuckoo.

const LINEUP_SLUGS = [
  "aihaa-ean",
  "aihaa-big",
  "aihaa-bella",
  "aihaa-fancy",
  "aihaa-winter",
] as const;

const PEDESTAL_HEIGHTS = [56, 24, 44, 36, 44];

export default function HomeHero() {
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
    <section className="relative overflow-hidden bg-dark pt-28 pb-20 lg:pt-36 lg:pb-24">
      {/* Subtle radial glow at top — matches /produk-dalam hero warmth */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-96 opacity-[0.10]"
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
        {/* AIHAA wordmark */}
        <div className="text-center mb-8 lg:mb-10">
          <span className="font-editorial text-gold text-xl md:text-2xl tracking-[0.22em] leading-none">
            AIHAA
          </span>
          <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-gold/60 font-semibold">
            Marketing Sdn Bhd
          </div>
        </div>

        {/* Eyebrow */}
        <p className="text-center text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-5">
          {t.home_hero_eyebrow}
        </p>

        {/* 3-line editorial title per SPEC §1.1 */}
        <h1 className="text-center mb-6 leading-[0.96]">
          <span className="block font-editorial text-white text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em]">
            {t.home_hero_title_1}
          </span>
          <span className="block font-editorial-italic text-gold text-6xl md:text-7xl lg:text-8xl tracking-[-0.02em] my-1 lg:my-2">
            {t.home_hero_title_2}
          </span>
          <span className="block font-editorial text-white text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em]">
            {t.home_hero_title_3}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[14px] md:text-[15px] leading-relaxed text-white/70 max-w-xl mx-auto mb-10 lg:mb-12">
          {t.home_hero_subtitle}
        </p>

        {/* 5-pedestal lineup — shared with /produk-dalam */}
        <ProductPedestalLineup
          products={products}
          pedestalHeights={PEDESTAL_HEIGHTS}
          badges={badges}
        />

        {/* Dual CTA — SPEC §1.1 exception to the one-CTA rule */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 lg:mt-14">
          <Link
            href={whatsappUrl(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
          >
            {t.home_hero_cta_primary}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/produk-dalam"
            className="inline-flex items-center gap-2 border border-gold/60 text-gold px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold/10 hover:border-gold transition-colors"
          >
            {t.home_hero_cta_secondary}
            <span aria-hidden>↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

// Client-provided hero banner — single full-bleed image with overlay CTAs.
// Header is fixed (z-50) so the image extends beneath it edge-to-edge.

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-dark">
      <Image
        src="/images/hero-main.jpg.webp"
        alt="AIHAA Water Purifier"
        width={1600}
        height={899}
        priority
        sizes="100vw"
        className="block w-full h-auto"
      />

      {/* Dual CTA overlay — bottom center */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 lg:bottom-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
        <Link
          href={whatsappUrl(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold text-dark px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-[13px] sm:text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
        >
          {t.home_hero_cta_primary}
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/produk-dalam"
          className="inline-flex items-center gap-2 border border-white/80 bg-black/30 backdrop-blur-sm text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-[13px] sm:text-[13.5px] font-semibold tracking-wide hover:bg-white hover:text-dark hover:border-white transition-colors"
        >
          {t.home_hero_cta_secondary}
          <span aria-hidden>↓</span>
        </Link>
      </div>
    </section>
  );
}

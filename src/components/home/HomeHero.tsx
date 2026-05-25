"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

// Client-provided hero banner — single full-bleed image with overlay CTAs.
// Header is fixed (z-50) so the image extends beneath it edge-to-edge.

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-surface">
      {/* Aspect wrapper: taller 4:5 on mobile for prominent hero
          presence + CSS crop via object-position focal shift; natural
          16:9 at sm+ keeps desktop composition identical to before. */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9]">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/hero-main-mobile.jpg.webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-main.jpg.webp"
            alt="AIHAA Water Purifier"
            className="absolute inset-0 w-full h-full object-cover object-[50%_25%] sm:object-center"
            loading="eager"
            {...{ fetchPriority: "high" as const }}
          />
        </picture>
      </div>

      {/* Dual CTA — absolute overlay on the hero image at every
          breakpoint. Stacks vertical on mobile (flex-col) so both
          buttons fit centered above the FloatingButtons FAB stack;
          becomes side-by-side row at sm+. Eliminates the previous
          cream-section background clash on mobile. */}
      <div className="absolute inset-x-0 bottom-8 lg:bottom-12 z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
        <Link
          href={whatsappUrl(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold text-dark px-7 sm:px-8 py-3.5 rounded-full text-[13px] sm:text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
        >
          {t.home_hero_cta_primary}
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/produk-dalam"
          className="inline-flex items-center gap-2 border border-white/80 bg-black/30 backdrop-blur-sm text-white px-7 sm:px-8 py-3.5 rounded-full text-[13px] sm:text-[13.5px] font-semibold tracking-wide hover:bg-white hover:text-dark hover:border-white transition-colors"
        >
          {t.home_hero_cta_secondary}
          <span aria-hidden>↓</span>
        </Link>
      </div>
    </section>
  );
}

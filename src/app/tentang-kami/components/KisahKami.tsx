"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §5.1 Kisah Kami — split layout: founder photo left, editorial
// quote + timeline right. Whole section is dark bg so the text column
// reads as an editorial feature. Photo column renders sales-expert via
// <picture> with a mobile pair swap.

const TIMELINE_POINTS = [
  { year: "2018", key: "about_kisah_timeline_2018" as const },
  { year: "2020", key: "about_kisah_timeline_2020" as const },
  { year: "2023", key: "about_kisah_timeline_2023" as const },
  { year: "2025", key: "about_kisah_timeline_2025" as const },
];

export default function KisahKami() {
  const { t } = useLanguage();

  return (
    <section className="bg-dark text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left — founder / sales-expert photo. Mobile uses a 3:4
            aspect box that matches the portrait source (720x960) so
            object-cover fits the full frame with no top/bottom crop —
            face stays visible. From lg+ the column widens to a fixed
            600px band and center-crops like the original layout. */}
        <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[600px] border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/products/sales-expert-mobile.webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/sales-expert.webp"
              alt="AIHAA sales expert"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Right — editorial content */}
        <div className="relative px-6 md:px-10 lg:px-14 py-14 lg:py-24 flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold mb-5">
            {t.about_kisah_eyebrow}
          </p>
          <h1 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-white leading-[1.12] mb-8">
            {t.about_kisah_heading}
          </h1>

          {/* Decorative quote mark */}
          <span
            aria-hidden
            className="font-editorial-italic text-gold text-6xl lg:text-7xl leading-none mb-2 select-none"
          >
            &ldquo;
          </span>
          <blockquote className="font-editorial-italic text-lg md:text-xl lg:text-[22px] leading-[1.5] text-white/90 mb-8">
            {t.about_kisah_quote}
          </blockquote>

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">
            <span className="text-white/80">{t.about_kisah_credit}</span>
            <span aria-hidden className="text-gold">
              ·
            </span>
            <span className="text-white/60 normal-case tracking-normal">
              {t.about_kisah_credit_sub}
            </span>
          </div>

          {/* Horizontal timeline */}
          <div className="mt-12 lg:mt-16">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-semibold mb-6">
              {t.about_kisah_timeline_heading}
            </p>
            <ol className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <span
                aria-hidden
                className="hidden md:block absolute top-1.5 left-0 right-0 h-px bg-white/10"
              />
              {TIMELINE_POINTS.map((point) => (
                <li key={point.year} className="relative">
                  <span
                    aria-hidden
                    className="block w-3 h-3 rounded-full bg-gold mb-3"
                  />
                  <div className="font-editorial text-gold text-xl md:text-2xl leading-none mb-2">
                    {point.year}
                  </div>
                  <div className="text-[12.5px] leading-snug text-white/70">
                    {t[point.key]}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

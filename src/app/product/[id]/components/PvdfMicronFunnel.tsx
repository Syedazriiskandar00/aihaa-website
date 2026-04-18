"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKeys } from "@/lib/i18n/translations";

// SPEC §D — Outdoor replacement for §D.4. PVDF ultrafiltration micron
// breakdown. Four trapezoid tiers stacked to form a funnel, each narrower
// than the one above, annotating a 100 → 10 → 1 → 0.01 micron journey.

type Tier = {
  micronKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
  colour: string;
};

const TIERS: Tier[] = [
  {
    micronKey: "product_funnel_tier_100_label",
    descKey: "product_funnel_tier_100_desc",
    colour: "#B7886A",
  },
  {
    micronKey: "product_funnel_tier_10_label",
    descKey: "product_funnel_tier_10_desc",
    colour: "#A68A5F",
  },
  {
    micronKey: "product_funnel_tier_1_label",
    descKey: "product_funnel_tier_1_desc",
    colour: "#8F7A5A",
  },
  {
    micronKey: "product_funnel_tier_001_label",
    descKey: "product_funnel_tier_001_desc",
    colour: "#6FA5C4",
  },
];

export default function PvdfMicronFunnel() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_funnel_eyebrow}
          heading={t.product_funnel_heading}
          subheading={t.product_funnel_subheading}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 md:gap-16 items-center">
          {/* Left — tier descriptions */}
          <ol className="space-y-4">
            {TIERS.map((tier, index) => (
              <li
                key={tier.micronKey}
                className="flex items-start gap-5 p-5 rounded-xl bg-[#FAFAF8] border border-black/5"
              >
                <span
                  className="font-editorial text-xl md:text-2xl shrink-0 min-w-[72px]"
                  style={{ color: tier.colour }}
                >
                  {t[tier.micronKey]}
                </span>
                <div>
                  <p className="text-[13.5px] md:text-[14px] text-dark leading-relaxed">
                    {t[tier.descKey]}
                  </p>
                  <span className="mt-1 inline-flex text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
                    Tier {index + 1}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          {/* Right — funnel SVG */}
          <div className="mx-auto md:mx-0">
            <svg
              width="280"
              height="360"
              viewBox="0 0 280 360"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              <defs>
                {TIERS.map((tier, i) => (
                  <linearGradient
                    key={i}
                    id={`funnel-gradient-${i}`}
                    x1="0%"
                    x2="0%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={tier.colour} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={tier.colour} stopOpacity="0.7" />
                  </linearGradient>
                ))}
              </defs>

              {/* Funnel trapezoids — each narrower than the last */}
              {/* Tier 1 (100μm): widest */}
              <polygon
                points="20,20 260,20 230,90 50,90"
                fill="url(#funnel-gradient-0)"
                stroke="#2A2724"
                strokeOpacity="0.15"
              />
              {/* Tier 2 (10μm) */}
              <polygon
                points="50,90 230,90 200,170 80,170"
                fill="url(#funnel-gradient-1)"
                stroke="#2A2724"
                strokeOpacity="0.15"
              />
              {/* Tier 3 (1μm) */}
              <polygon
                points="80,170 200,170 170,250 110,250"
                fill="url(#funnel-gradient-2)"
                stroke="#2A2724"
                strokeOpacity="0.15"
              />
              {/* Tier 4 (0.01μm) — narrowest, membrane */}
              <polygon
                points="110,250 170,250 165,330 115,330"
                fill="url(#funnel-gradient-3)"
                stroke="#2A2724"
                strokeOpacity="0.2"
              />

              {/* Particle dots — scattered through tiers 1-3 */}
              {[
                { cx: 80, cy: 40, r: 4 },
                { cx: 180, cy: 55, r: 5 },
                { cx: 140, cy: 65, r: 3 },
                { cx: 110, cy: 115, r: 2.5 },
                { cx: 170, cy: 130, r: 2 },
                { cx: 140, cy: 200, r: 1.2 },
              ].map((p, i) => (
                <circle
                  key={i}
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill="#FFFFFF"
                  opacity="0.7"
                />
              ))}

              {/* Labels on right side */}
              {[
                { y: 55, text: t.product_funnel_tier_100_label },
                { y: 130, text: t.product_funnel_tier_10_label },
                { y: 210, text: t.product_funnel_tier_1_label },
                { y: 290, text: t.product_funnel_tier_001_label },
              ].map((l, i) => (
                <g key={i}>
                  <line
                    x1={i === 0 ? 260 : i === 1 ? 230 : i === 2 ? 200 : 170}
                    y1={l.y}
                    x2={268}
                    y2={l.y}
                    stroke="#2A2724"
                    strokeOpacity="0.3"
                    strokeWidth="0.75"
                  />
                  <circle
                    cx={i === 0 ? 260 : i === 1 ? 230 : i === 2 ? 200 : 170}
                    cy={l.y}
                    r="2"
                    fill="#DAA520"
                  />
                </g>
              ))}

              {/* Drop — below funnel */}
              <path
                d="M140 340 Q 132 350 140 358 Q 148 350 140 340 Z"
                fill="#6FA5C4"
              />
            </svg>
          </div>
        </div>

        <p className="mt-10 text-[12px] text-muted text-center italic max-w-xl mx-auto">
          {t.product_funnel_caption}
        </p>
      </div>
    </section>
  );
}

"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { FilterStageKind, Product } from "@/lib/data/products";
import type { TranslationKeys } from "@/lib/i18n/translations";

// SPEC §D.5 — Filter Cartridge Row. Indoor detail pages only.
// Fully SVG/CSS-drawn cartridges on a light backdrop with blue water flow
// arrows between them. Premium placeholder that reads as deliberate
// technical diagram — replaces the cartoon tubes from the /service page.

type StageConfig = {
  nameKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
  liquid: string; // Fill colour for the cartridge window
  pattern: "horizontal" | "dots" | "fine" | "wave";
};

const STAGE_MAP: Record<FilterStageKind, StageConfig> = {
  sediment: {
    nameKey: "product_cartridge_sediment_name",
    descKey: "product_cartridge_sediment_desc",
    liquid: "#B7886A",
    pattern: "dots",
  },
  antibacterial: {
    nameKey: "product_cartridge_antibacterial_name",
    descKey: "product_cartridge_antibacterial_desc",
    liquid: "#5DA88F",
    pattern: "fine",
  },
  "pre-carbon": {
    nameKey: "product_cartridge_pre_carbon_name",
    descKey: "product_cartridge_pre_carbon_desc",
    liquid: "#3B3A36",
    pattern: "horizontal",
  },
  "post-carbon": {
    nameKey: "product_cartridge_post_carbon_name",
    descKey: "product_cartridge_post_carbon_desc",
    liquid: "#59524A",
    pattern: "horizontal",
  },
  "uf-membrane": {
    nameKey: "product_cartridge_uf_name",
    descKey: "product_cartridge_uf_desc",
    liquid: "#6FA5C4",
    pattern: "wave",
  },
};

const DEFAULT_INDOOR_STAGES: FilterStageKind[] = [
  "sediment",
  "antibacterial",
  "pre-carbon",
  "post-carbon",
];

type Props = { product: Product };

export default function FilterCartridgeRow({ product }: Props) {
  const { t } = useLanguage();
  const stages = product.filterStages ?? DEFAULT_INDOOR_STAGES;

  return (
    <section className="bg-[#FAFAF8] py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_cartridge_eyebrow}
          heading={t.product_cartridge_heading}
          subheading={t.product_cartridge_subheading}
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 relative">
          {stages.map((kind, index) => {
            const cfg = STAGE_MAP[kind];
            return (
              <div
                key={kind}
                className="relative flex flex-col items-center"
              >
                <CartridgeSvg
                  liquid={cfg.liquid}
                  pattern={cfg.pattern}
                  index={index}
                />

                <span className="mt-5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold/15 text-gold-dark text-[11px] font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-3 font-editorial text-[15px] md:text-base text-dark text-center">
                  {t[cfg.nameKey]}
                </p>
                <p className="mt-2 text-[12px] text-muted text-center leading-snug max-w-[180px]">
                  {t[cfg.descKey]}
                </p>

                {/* Flow arrow between cartridges — desktop only */}
                {index < stages.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden md:flex absolute top-[88px] -right-4 items-center justify-center"
                  >
                    <svg
                      width="34"
                      height="14"
                      viewBox="0 0 34 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 7h28m0 0l-5-5m5 5l-5 5"
                        stroke="#6FA5C4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.6"
                      />
                    </svg>
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CartridgeSvg({
  liquid,
  pattern,
  index,
}: {
  liquid: string;
  pattern: StageConfig["pattern"];
  index: number;
}) {
  const patternId = `cartridge-pattern-${pattern}-${index}`;

  return (
    <svg
      width="100"
      height="200"
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <defs>
        {pattern === "dots" && (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.35)" />
          </pattern>
        )}
        {pattern === "horizontal" && (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="14"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="14" height="1" fill="rgba(255,255,255,0.18)" />
          </pattern>
        )}
        {pattern === "fine" && (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.4)" />
          </pattern>
        )}
        {pattern === "wave" && (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="20"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 5 Q 5 0 10 5 T 20 5"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        )}
        <linearGradient id={`gloss-${index}`} x1="0%" x2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
      </defs>

      {/* Top cap */}
      <rect x="30" y="4" width="40" height="14" rx="3" fill="#E8E4DB" stroke="#C9C3B6" />
      {/* Top nozzle */}
      <rect x="44" y="0" width="12" height="6" rx="1" fill="#D5CEBF" />

      {/* Cartridge body */}
      <rect
        x="22"
        y="18"
        width="56"
        height="160"
        rx="8"
        fill={liquid}
        stroke="#2A2724"
        strokeOpacity="0.15"
        strokeWidth="1"
      />
      {/* Pattern overlay */}
      <rect
        x="22"
        y="18"
        width="56"
        height="160"
        rx="8"
        fill={`url(#${patternId})`}
      />
      {/* Gloss highlight */}
      <rect
        x="22"
        y="18"
        width="56"
        height="160"
        rx="8"
        fill={`url(#gloss-${index})`}
      />

      {/* Bottom cap */}
      <rect x="30" y="178" width="40" height="14" rx="3" fill="#E8E4DB" stroke="#C9C3B6" />
      {/* Bottom nozzle */}
      <rect x="44" y="192" width="12" height="6" rx="1" fill="#D5CEBF" />
    </svg>
  );
}

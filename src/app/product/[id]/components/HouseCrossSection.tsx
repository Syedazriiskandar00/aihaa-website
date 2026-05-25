"use client";

import { ChefHat, WashingMachine, ShowerHead, Shirt, Droplet, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKeys } from "@/lib/i18n/translations";

// SPEC §D — Outdoor replacement for §D.2. Whole-house protection
// narrative: inline SVG isometric-ish house with 6 use-case pins
// anchored around it. Intentionally stylised (not photoreal) so the
// placeholder reads as a deliberate infographic, not a missing render.

type UseCase = {
  icon: LucideIcon;
  labelKey: keyof TranslationKeys;
  // Absolute-positioned pin coordinates (percent of container).
  top: string;
  left: string;
  side: "left" | "right";
};

const USES: UseCase[] = [
  { icon: ChefHat,        labelKey: "product_house_use_cooking",   top: "22%", left: "12%", side: "left" },
  { icon: WashingMachine, labelKey: "product_house_use_washing",   top: "44%", left: "8%",  side: "left" },
  { icon: Droplet,        labelKey: "product_house_use_hygiene",   top: "68%", left: "14%", side: "left" },
  { icon: ShowerHead,     labelKey: "product_house_use_showering", top: "22%", left: "72%", side: "right" },
  { icon: Shirt,          labelKey: "product_house_use_laundry",   top: "46%", left: "76%", side: "right" },
  { icon: TreePine,       labelKey: "product_house_use_outdoor",   top: "70%", left: "72%", side: "right" },
];

export default function HouseCrossSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_house_eyebrow}
          heading={t.product_house_heading}
          subheading={t.product_house_subheading}
          className="mb-14"
        />

        {/* Stage — house illustration in center, pins around it */}
        <div className="relative mx-auto max-w-4xl aspect-[4/3] bg-[#F5F5F3] rounded-3xl border border-black/5 overflow-hidden">
          {/* Ground grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(#0D0D0D 1px, transparent 1px), linear-gradient(90deg, #0D0D0D 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* House SVG — centred */}
          <svg
            viewBox="0 0 400 320"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            {/* Ground line */}
            <line x1="0" y1="288" x2="400" y2="288" stroke="#0D0D0D" strokeWidth="1" opacity="0.3" />

            {/* Roof */}
            <polygon
              points="200,50 120,130 280,130"
              fill="#2A2927"
              opacity="0.95"
            />
            {/* Roof highlight */}
            <polygon
              points="200,50 200,130 280,130"
              fill="#1A1918"
              opacity="0.9"
            />
            {/* Chimney */}
            <rect x="235" y="72" width="14" height="32" fill="#2A2927" />

            {/* House body */}
            <rect
              x="130"
              y="130"
              width="140"
              height="158"
              fill="#E8E4DB"
              stroke="#C9C3B6"
              strokeWidth="1"
            />
            {/* Front facade shadow */}
            <rect x="200" y="130" width="70" height="158" fill="#D5CEBF" />

            {/* Door */}
            <rect x="186" y="218" width="28" height="70" fill="#3B3A36" />
            <circle cx="207" cy="255" r="1.5" fill="#DAA520" />

            {/* Windows */}
            <rect x="148" y="156" width="24" height="24" fill="#6FA5C4" opacity="0.7" stroke="#2A2927" strokeWidth="0.5" />
            <rect x="148" y="198" width="24" height="24" fill="#6FA5C4" opacity="0.7" stroke="#2A2927" strokeWidth="0.5" />
            <rect x="228" y="156" width="24" height="24" fill="#6FA5C4" opacity="0.5" stroke="#2A2927" strokeWidth="0.5" />

            {/* Water pipe down from house to filter */}
            <line x1="200" y1="288" x2="200" y2="305" stroke="#6FA5C4" strokeWidth="3" strokeLinecap="round" />
            {/* Filter tank — AIHAA outdoor silhouette */}
            <g transform="translate(188 295)">
              <ellipse cx="12" cy="2" rx="12" ry="3" fill="#9AA8B4" />
              <rect x="0" y="2" width="24" height="20" fill="#C4CCD4" stroke="#7A8894" strokeWidth="0.5" />
              <ellipse cx="12" cy="22" rx="12" ry="3" fill="#7A8894" />
            </g>

            {/* Water distribution pipes — from filter fanning out */}
            <path
              d="M200 305 Q 140 310 80 300"
              stroke="#6FA5C4"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3 3"
              opacity="0.7"
            />
            <path
              d="M200 305 Q 260 310 320 300"
              stroke="#6FA5C4"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3 3"
              opacity="0.7"
            />

            {/* Filter label badge */}
            <rect x="168" y="308" width="64" height="12" rx="2" fill="#DAA520" />
            <text
              x="200"
              y="317"
              textAnchor="middle"
              fill="#0D0D0D"
              fontSize="7"
              fontFamily="sans-serif"
              fontWeight="700"
              letterSpacing="1"
            >
              AIHAA FILTER
            </text>
          </svg>

          {/* Use-case pins */}
          {USES.map(({ icon: Icon, labelKey, top, left, side }) => (
            <div
              key={labelKey}
              className="absolute flex items-center gap-2 group"
              style={{ top, left }}
            >
              {side === "right" ? null : (
                <>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 shadow-sm text-gold-dark">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <span className="text-[12px] md:text-[13px] text-dark font-medium bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5 shadow-sm whitespace-nowrap">
                    {t[labelKey]}
                  </span>
                </>
              )}
              {side === "right" ? (
                <>
                  <span className="text-[12px] md:text-[13px] text-dark font-medium bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5 shadow-sm whitespace-nowrap">
                    {t[labelKey]}
                  </span>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 shadow-sm text-gold-dark">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-6 text-[12px] text-muted text-center italic max-w-lg mx-auto">
          {t.product_house_caption}
        </p>
      </div>
    </section>
  );
}

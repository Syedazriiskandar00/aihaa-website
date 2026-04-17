"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import BrandLogoBadge from "@/components/shared/BrandLogoBadge";

// Distinct earth-tone swatches so the 6 placeholder tiles read as six
// different media rather than a flat template. Will be replaced by real
// product photos — logged in PLACEHOLDERS.md.
const SAND_TONES = [
  "#3A2E28", // Metal Earse — dark iron
  "#1E1E1E", // Active Carbon — charcoal
  "#A89968", // Zeolite — warm beige
  "#E6D7B8", // Fine Silica — cream
  "#C8B99C", // Medium Silica — sand
  "#9B8770", // Coarse Silica — darker sand
];

export default function SandTypesShowcase() {
  const { t } = useLanguage();

  const types = [
    { label: t.service_sand_type_metal_earse, tone: SAND_TONES[0] },
    { label: t.service_sand_type_active_carbon, tone: SAND_TONES[1] },
    { label: t.service_sand_type_zeolite, tone: SAND_TONES[2] },
    { label: t.service_sand_type_fine_silica, tone: SAND_TONES[3] },
    { label: t.service_sand_type_medium_silica, tone: SAND_TONES[4] },
    { label: t.service_sand_type_coarse_silica, tone: SAND_TONES[5] },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrandLogoBadge subtitle={t.service_sand_eyebrow} className="mb-8" />

        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-editorial text-3xl md:text-4xl text-dark leading-[1.08]">
            {t.service_sand_heading}
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-muted">
            {t.service_sand_subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {types.map((type, index) => {
            const isLight = ["#E6D7B8", "#C8B99C"].includes(type.tone);
            return (
              <figure
                key={type.label}
                className="flex flex-col items-center"
              >
                <div
                  className="w-full aspect-[4/3] rounded-lg border border-black/5 relative overflow-hidden flex items-end justify-center"
                  style={{ background: type.tone }}
                >
                  {/* Subtle granular texture via layered radial gradients */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 0, transparent 35%), radial-gradient(circle at 75% 70%, rgba(0,0,0,0.25) 0, transparent 40%)",
                    }}
                  />
                  {/* Stage number */}
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-semibold tabular-nums tracking-wide ${
                      isLight ? "text-dark/40" : "text-white/50"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-dark text-center">
                  {type.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

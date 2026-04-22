"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";
import type { TranslationKeys } from "@/lib/i18n/translations";

// SPEC §D.5 — Filter Cartridge Row. Indoor product detail pages only.
// Minimalist dark layout: header + 4 cartridge images with inline gold
// arrows, description row aligned 1:1 with the cartridge grid columns.

type StageKey = "sediment" | "antibacterial" | "pre_carbon" | "post_carbon";

type Stage = {
  key: StageKey;
  number: string;
  src: string;
  nameKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
};

const STAGES: readonly Stage[] = [
  {
    key: "sediment",
    number: "01",
    src: "/images/products/cartridge/cartridge-sediment.png.png",
    nameKey: "product_cartridge_sediment_name",
    descKey: "product_cartridge_sediment_desc",
  },
  {
    key: "antibacterial",
    number: "02",
    src: "/images/products/cartridge/cartridge-antibacterial.png.png",
    nameKey: "product_cartridge_antibacterial_name",
    descKey: "product_cartridge_antibacterial_desc",
  },
  {
    key: "pre_carbon",
    number: "03",
    src: "/images/products/cartridge/cartridge-pre-carbon.png.png",
    nameKey: "product_cartridge_pre_carbon_name",
    descKey: "product_cartridge_pre_carbon_desc",
  },
  {
    key: "post_carbon",
    number: "04",
    src: "/images/products/cartridge/cartridge-post-carbon.png.png",
    nameKey: "product_cartridge_post_carbon_name",
    descKey: "product_cartridge_post_carbon_desc",
  },
] as const;

type Props = { product: Product };

export default function FilterCartridgeRow({ product: _product }: Props) {
  const { t } = useLanguage();

  const gridCols = "grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]";

  return (
    <section className="bg-[#0D0D0D] py-20 md:py-24 px-6 md:px-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-[50px]">
        <p className="text-xs font-semibold text-[#DAA520] uppercase tracking-[3px]">
          {t.product_cartridge_eyebrow}
        </p>
        <h2 className="font-editorial font-normal text-4xl md:text-5xl text-white mt-4">
          {t.product_cartridge_heading}
        </h2>
        <p className="text-sm text-[#888] mt-4 leading-relaxed">
          {t.product_cartridge_subheading}
        </p>
      </div>

      {/* Cartridge images row — 7-col grid on desktop, stacked on mobile */}
      <div
        className={`grid ${gridCols} items-center gap-3 max-w-[1100px] mx-auto mb-10`}
      >
        {STAGES.map((stage, i) => (
          <div key={`img-${stage.key}`} className="contents">
            <div className="flex items-center justify-center">
              <Image
                src={stage.src}
                alt={t[stage.nameKey]}
                width={666}
                height={374}
                sizes="(max-width: 768px) 80vw, 240px"
                className="h-60 md:h-[280px] w-auto object-contain"
              />
            </div>
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                className="hidden md:flex items-center justify-center px-1 text-3xl font-light text-[#DAA520]/50 select-none"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Description row — same grid template, aligned column-for-column */}
      <div
        className={`grid ${gridCols} items-start gap-3 md:gap-3 gap-y-8 max-w-[1100px] mx-auto`}
      >
        {STAGES.map((stage, i) => (
          <div key={`desc-${stage.key}`} className="contents">
            <div className="text-center px-2.5">
              <p className="text-xs font-semibold text-[#DAA520] tracking-[2px] mb-1.5">
                {stage.number}
              </p>
              <p className="text-base font-medium text-white tracking-[2px] uppercase mb-2.5">
                {t[stage.nameKey]}
              </p>
              <p className="text-xs text-[#888] leading-[1.5]">
                {t[stage.descKey]}
              </p>
            </div>
            {i < STAGES.length - 1 && (
              <span aria-hidden className="hidden md:block w-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

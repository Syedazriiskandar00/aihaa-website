"use client";

import { Coffee, Leaf, Baby, Droplets, CupSoda, Snowflake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { CapacityKind, Product } from "@/lib/data/products";
import type { TranslationKeys } from "@/lib/i18n/translations";

// SPEC §D.3 — Capacity Functionalities. Indoor detail pages only.
// 5 (or 6 if ice-maker) temperature/function icons on a warm-neutral
// palette. Defaults cover the 4-tank stack (hot/warm/baby/cold/ambient);
// products add "ice" via products.ts override.

type CapacityConfig = {
  icon: LucideIcon;
  labelKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
  temp: string;
  tempTone: string; // Tailwind class for temp pill
};

const CAPACITY_MAP: Record<CapacityKind, CapacityConfig> = {
  coffee: {
    icon: Coffee,
    labelKey: "product_capacity_coffee_label",
    descKey: "product_capacity_coffee_desc",
    temp: "85°C",
    tempTone: "bg-[#C2452B] text-white",
  },
  tea: {
    icon: Leaf,
    labelKey: "product_capacity_tea_label",
    descKey: "product_capacity_tea_desc",
    temp: "70°C",
    tempTone: "bg-[#D97706] text-white",
  },
  baby: {
    icon: Baby,
    labelKey: "product_capacity_baby_label",
    descKey: "product_capacity_baby_desc",
    temp: "50°C",
    tempTone: "bg-[#E89F71] text-white",
  },
  cold: {
    icon: Droplets,
    labelKey: "product_capacity_cold_label",
    descKey: "product_capacity_cold_desc",
    temp: "8°C",
    tempTone: "bg-[#2B6CB0] text-white",
  },
  ambient: {
    icon: CupSoda,
    labelKey: "product_capacity_ambient_label",
    descKey: "product_capacity_ambient_desc",
    temp: "25°C",
    tempTone: "bg-[#6B7280] text-white",
  },
  ice: {
    icon: Snowflake,
    labelKey: "product_capacity_ice_label",
    descKey: "product_capacity_ice_desc",
    temp: "−5°C",
    tempTone: "bg-[#0EA5E9] text-white",
  },
};

// Default capacity set for indoor products without an override.
const DEFAULT_INDOOR_CAPACITY: CapacityKind[] = [
  "coffee",
  "tea",
  "baby",
  "cold",
  "ambient",
];

type Props = { product: Product };

export default function CapacityFunctionalities({ product }: Props) {
  const { t } = useLanguage();

  const options = product.capacityOptions ?? DEFAULT_INDOOR_CAPACITY;

  return (
    <section className="bg-[#F5F5F3] py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_capacity_eyebrow}
          heading={t.product_capacity_heading}
          subheading={t.product_capacity_subheading}
          className="mb-14"
        />

        <ul
          className={`grid gap-6 lg:gap-8 grid-cols-2 sm:grid-cols-3 ${
            options.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          {options.map((kind) => {
            const cfg = CAPACITY_MAP[kind];
            const Icon = cfg.icon;
            return (
              <li
                key={kind}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1A1A1A] text-white shadow-md">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </span>
                  <span
                    className={`absolute -top-1 -right-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${cfg.tempTone}`}
                  >
                    {cfg.temp}
                  </span>
                </div>
                <p className="font-editorial text-[15px] md:text-base text-dark mb-1">
                  {t[cfg.labelKey]}
                </p>
                <p className="text-[12px] text-muted leading-snug max-w-[160px]">
                  {t[cfg.descKey]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

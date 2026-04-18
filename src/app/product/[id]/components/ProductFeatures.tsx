"use client";

import type { LucideIcon } from "lucide-react";
import {
  Filter,
  Sparkles,
  Ruler,
  Container,
  Wrench,
  ShieldCheck,
  Monitor,
  VolumeX,
  Snowflake,
  Beaker,
  Shield,
  Waves,
  RefreshCcw,
  Columns3,
  Layers,
  CupSoda,
  Award,
  ArrowDownFromLine,
  Gift,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";

// Keyword → icon matcher. Patterns checked in order; first match wins.
// Fallback = CheckCircle2 (neutral). Keeps icon assignment deterministic
// and traceable rather than random variety (lessons.md: no icon soup).
const ICON_RULES: Array<{
  patterns: RegExp;
  icon: LucideIcon;
}> = [
  { patterns: /ice\s*maker|ice\b|ais/i, icon: Snowflake },
  { patterns: /membran|uf\s*membrane|layer|lapisan/i, icon: Layers },
  { patterns: /dual\s*backwash|backwash|flushing/i, icon: RefreshCcw },
  { patterns: /3\s*tangki|three\s*tank|triple/i, icon: Columns3 },
  { patterns: /tahap|stage|penapisan|filtration/i, icon: Filter },
  { patterns: /mineral|alkali|alkaline/i, icon: Sparkles },
  { patterns: /kapasiti|capacity|liter|litre|tangki|tank/i, icon: Container },
  { patterns: /direct\s*minum|direct\s*drink|minum|drink/i, icon: CupSoda },
  { patterns: /all[-\s]?in[-\s]?one/i, icon: CupSoda },
  { patterns: /aliran|flow|l\/jam|l\/hr/i, icon: Waves },
  { patterns: /kimia|chemical|tahan\s*kimia/i, icon: Beaker },
  { patterns: /anti[-\s]?karat|anti[-\s]?rust|corrosion/i, icon: Shield },
  { patterns: /ice|snow|cold/i, icon: Snowflake },
  { patterns: /digital|display/i, icon: Monitor },
  { patterns: /senyap|silent|quiet/i, icon: VolumeX },
  { patterns: /percuma\s*pemasangan|free\s*install|pemasangan/i, icon: Wrench },
  { patterns: /waranti|warranty|year|tahun/i, icon: ShieldCheck },
  { patterns: /kompak|compact|slim|saiz/i, icon: Ruler },
  { patterns: /boring|underground|bawah\s*tanah/i, icon: ArrowDownFromLine },
  { patterns: /premium|gred|grade|profesional|professional/i, icon: Award },
  { patterns: /percuma|free/i, icon: Gift },
];

const pickIcon = (feature: string) => {
  for (const rule of ICON_RULES) {
    if (rule.patterns.test(feature)) return rule.icon;
  }
  return CheckCircle2;
};

type Props = { product: Product };

export default function ProductFeatures({ product }: Props) {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.detail_features}
          heading={t.product_detail_features_heading}
          className="mb-14"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {product.features.map((feature, index) => {
            const Icon = pickIcon(feature);
            return (
              <li
                key={`${feature}-${index}`}
                className="flex flex-col gap-4 p-5 rounded-2xl border border-black/5 bg-[#FAFAF8] hover:border-gold/30 hover:bg-white transition-colors"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold/10">
                  <Icon className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
                </span>
                <p className="text-[13.5px] leading-[1.55] text-dark font-medium">
                  {feature}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

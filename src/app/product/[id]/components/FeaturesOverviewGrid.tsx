"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";

// SPEC §D.4 — Features Overview. 3×2 grid of feature close-ups.
// Uses product.features[] (already 5–6 items per product) as captions,
// and renders each with a premium gradient "close-up frame" placeholder
// that signals to photography: "this is the shot we need here".
//
// When real close-up imagery lands, swap the gradient block for <Image>
// keyed by product.slug. Caption stays as-is.

type Props = { product: Product };

const FRAME_TONES = [
  "linear-gradient(135deg, #F4EFE4 0%, #DED5C3 100%)",
  "linear-gradient(135deg, #E7E2D6 0%, #C9BFA8 100%)",
  "linear-gradient(135deg, #EAE3D2 0%, #D0C5AA 100%)",
  "linear-gradient(135deg, #F2EEE6 0%, #D9D1BE 100%)",
  "linear-gradient(135deg, #EDE6D3 0%, #CEC3A7 100%)",
  "linear-gradient(135deg, #F5F0E4 0%, #DBD2BC 100%)",
];

export default function FeaturesOverviewGrid({ product }: Props) {
  const { t } = useLanguage();
  // Take up to 6 features; pad to 6 with a neutral placeholder if shorter.
  const items = product.features.slice(0, 6);
  const padCount = Math.max(0, 6 - items.length);
  const filled = [
    ...items,
    ...Array.from({ length: padCount }, () => product.tagline.bm),
  ];

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_features_overview_eyebrow}
          heading={t.product_features_overview_heading}
          subheading={t.product_features_overview_subheading}
          className="mb-14"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filled.map((caption, index) => (
            <li
              key={`${caption}-${index}`}
              className="group relative rounded-2xl overflow-hidden bg-[#FAFAF8] border border-black/5"
            >
              {/* Close-up "frame" placeholder */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: FRAME_TONES[index % FRAME_TONES.length] }}
              >
                {/* Subtle paper grain */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, #000 0.5px, transparent 0)",
                    backgroundSize: "6px 6px",
                  }}
                />
                {/* Frame number — discreet top-left */}
                <span className="absolute top-4 left-5 text-[10px] uppercase tracking-[0.22em] text-dark/50 font-semibold">
                  0{index + 1}
                </span>
                {/* Placeholder note — bottom-right, tiny */}
                <span className="absolute bottom-4 right-5 text-[10px] text-dark/35 italic">
                  {t.product_features_overview_caption_placeholder}
                </span>
                {/* Gold hover wash */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors"
                />
              </div>

              {/* Caption strip */}
              <div className="px-5 py-4 border-t border-black/5">
                <p className="text-[13.5px] leading-snug text-dark font-medium line-clamp-2">
                  {caption}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

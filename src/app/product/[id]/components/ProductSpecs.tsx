"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";

// SPEC §D.6 adapted — clean alternating-row spec table, BM-primary
// labels directly from product.specs. Anchor id=specifications matches
// the hero's secondary-CTA scroll target.
//
// BM-only labels for now — a future data-module upgrade can widen
// ProductSpec to bilingual, at which point this renderer swaps to
// locale-picked label without layout churn.

type Props = { product: Product };

export default function ProductSpecs({ product }: Props) {
  const { t } = useLanguage();

  return (
    <section
      id="specifications"
      className="bg-[#FAFAF8] py-20 lg:py-24 border-b border-black/5 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.detail_specs}
          heading={product.name}
          className="mb-12"
        />

        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
          <div className="h-1 w-16 bg-gold" aria-hidden />
          <dl>
            {product.specs.map((spec, index) => (
              <div
                key={`${spec.label}-${index}`}
                className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 px-6 py-5 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F5F5F3]"
                }`}
              >
                <dt className="text-[12px] uppercase tracking-[0.18em] text-muted font-semibold">
                  {spec.label}
                </dt>
                <dd className="text-[14px] md:text-[15px] text-dark font-semibold md:text-right">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

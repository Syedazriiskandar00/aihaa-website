"use client";

import { Wallet, ShieldCheck, CalendarClock, Calculator } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";
import { getServiceInfo } from "@/lib/data/services";

// SPEC Phase 6 §D — minimum-viable Service Info section. Four data
// points ONLY: service price, warranty, frequency, yearly estimate.
// No filter-lifespan claims, no parts-replacement schedules, no service
// inclusions beyond what's explicitly confirmed. Disclaimer below
// acknowledges the scope limitation.

type Props = { product: Product };

export default function ProductServiceInfo({ product }: Props) {
  const { t } = useLanguage();
  const service = getServiceInfo(product);

  const cards = [
    {
      icon: Wallet,
      label: t.product_detail_service_label_price,
      value: service.servicePrice,
    },
    {
      icon: ShieldCheck,
      label: t.product_detail_service_label_warranty,
      value: t[service.warrantyKey],
    },
    {
      icon: CalendarClock,
      label: t.product_detail_service_label_frequency,
      value: t[service.frequencyKey],
    },
    {
      icon: Calculator,
      label: t.product_detail_service_label_yearly,
      value: service.yearlyEstimate,
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_detail_service_heading}
          heading={t.product_detail_service_heading}
          subheading={t.product_detail_service_subheading}
          className="mb-14"
        />

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cards.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="relative flex flex-col gap-3 p-6 rounded-2xl bg-[#FAFAF8] border border-black/5 hover:border-gold/30 transition-colors"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/10">
                <Icon className="w-4 h-4 text-gold-dark" strokeWidth={1.5} />
              </span>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-muted font-semibold leading-tight">
                {label}
              </dt>
              <dd className="font-editorial text-xl md:text-2xl text-dark leading-tight">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-[12px] text-muted text-center max-w-xl mx-auto italic">
          {t.product_detail_service_disclaimer}
        </p>
      </div>
    </section>
  );
}

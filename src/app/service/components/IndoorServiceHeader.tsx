"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import BrandLogoBadge from "@/components/shared/BrandLogoBadge";
import IndoorFilterRow from "@/components/shared/IndoorFilterRow";

export default function IndoorServiceHeader() {
  const { t } = useLanguage();

  const cartridges = [
    { name: t.service_filter_1_name, caption: t.service_filter_1_desc, accent: "#3B82C4" },
    { name: t.service_filter_2_name, caption: t.service_filter_2_desc, accent: "#6B4226" },
    { name: t.service_filter_3_name, caption: t.service_filter_3_desc, accent: "#A8D89C" },
    { name: t.service_filter_4_name, caption: t.service_filter_4_desc, accent: "#2F4F4F" },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrandLogoBadge subtitle={t.service_indoor_eyebrow} className="mb-8" />

        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-editorial text-3xl md:text-4xl text-dark leading-[1.08]">
            {t.service_indoor_heading}
          </h2>
          <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-muted">
            {t.service_indoor_body}
          </p>
        </div>

        <IndoorFilterRow heading={t.service_filter_row_heading} cartridges={cartridges} />
      </div>
    </section>
  );
}

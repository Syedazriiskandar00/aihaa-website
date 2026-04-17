"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import SectionHeading from "@/components/shared/SectionHeading";

const AIHAA_PRICE = "RM 160";
const OTHER_PRICE = "RM 260";
const WHATSAPP_URL =
  "https://wa.me/60123456789?text=Saya%20nak%20tempah%20servis%20filter%20penapis%20air%20AIHAA";

export default function FilterPricingCards() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.service_pricing_filter_eyebrow}
          heading={t.service_pricing_filter_heading}
          subheading={t.service_pricing_filter_subheading}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1 — AIHAA brand (primary, dark) */}
          <article className="relative bg-dark text-white rounded-2xl p-8 lg:p-10 overflow-hidden border border-gold/20">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/15 text-gold text-[11px] uppercase tracking-[0.16em] font-semibold">
              {t.service_pricing_filter_aihaa_badge}
            </span>
            <div className="mt-8 mb-6">
              <span className="font-editorial text-5xl md:text-6xl text-gold tracking-tight">
                {AIHAA_PRICE}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-white/70 max-w-xs">
              {t.service_pricing_filter_aihaa_caption}
            </p>
            {/* Decorative corner stroke — not another CTA */}
            <span
              aria-hidden
              className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 rounded-tl-[60px]"
            />
          </article>

          {/* Card 2 — Other brand (secondary, light) */}
          <article className="relative bg-[#F5F5F3] text-dark rounded-2xl p-8 lg:p-10 border border-black/5">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-dark text-white text-[11px] uppercase tracking-[0.16em] font-semibold">
              {t.service_pricing_filter_other_badge}
            </span>
            <div className="mt-8 mb-6">
              <span className="font-editorial text-5xl md:text-6xl text-dark tracking-tight">
                {OTHER_PRICE}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-muted max-w-xs">
              {t.service_pricing_filter_other_caption}
            </p>
          </article>
        </div>

        {/* Footer note + single CTA (lessons.md rule: one CTA per section) */}
        <div className="mt-12 text-center">
          <p className="text-[12.5px] text-muted mb-6 max-w-md mx-auto">
            {t.service_pricing_filter_note}
          </p>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
          >
            {t.service_pricing_filter_cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

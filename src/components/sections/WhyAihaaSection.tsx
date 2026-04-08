"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ──────────────────────────────────────────────
   SUB-SECTION 1: FOUNDER STORY
   ────────────────────────────────────────────── */

function FounderStory() {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className="bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]"
        >
          {/* Left — Portrait image */}
          <div className="relative min-h-[420px] lg:min-h-0 scroll-reveal-child stagger-1">
            <Image
              src="/images/products/sales-expert.png"
              alt="Pengasas AIHAA"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0D0D0D]" />
          </div>

          {/* Right — Quote */}
          <div className="relative flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-32 scroll-reveal-child stagger-2">
            <p className="text-xs tracking-[0.2em] uppercase text-[#DAA520] mb-10">
              {t.why_founder_label}
            </p>

            <span
              className="absolute top-12 lg:top-20 right-8 lg:right-16 text-[140px] leading-none font-playfair text-[#DAA520] opacity-[0.08] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="relative">
              <p className="text-xl lg:text-2xl xl:text-[1.7rem] text-white font-playfair italic leading-relaxed max-w-lg">
                {t.why_founder_quote}
              </p>
            </blockquote>

            <div className="mt-10">
              <p className="text-sm font-medium text-[#DAA520]">
                {t.why_founder_author}
              </p>
              <p className="text-xs text-[#999] mt-1">
                {t.why_founder_role}
              </p>
            </div>

            <div className="mt-14 pt-8 border-t border-white/[0.06]">
              <div className="flex items-center gap-6 lg:gap-10 text-xs text-[#777] overflow-x-auto">
                {[
                  { year: "2018", label: "100 unit" },
                  { year: "2020", label: "2,500+" },
                  { year: "2023", label: "7,000+" },
                  { year: "2025", label: "10,800+" },
                ].map((m, i) => (
                  <div key={m.year} className="flex items-center gap-6">
                    {i > 0 && <div className="w-8 h-px bg-white/10" />}
                    <div className="flex-shrink-0">
                      <span
                        className={`block font-semibold ${
                          i === 3 ? "text-[#DAA520]" : "text-white/60"
                        }`}
                      >
                        {m.year}
                      </span>
                      <span className="block mt-0.5">{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SUB-SECTION 2: BEZA KAMI
   ────────────────────────────────────────────── */

function BezaKami() {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  const comparisons = [
    { feature: t.why_compare_payment, aihaa: t.why_compare_payment_aihaa, other: t.why_compare_payment_other, aihaaBetter: true },
    { feature: t.why_compare_contract, aihaa: t.why_compare_contract_aihaa, other: t.why_compare_contract_other, aihaaBetter: true },
    { feature: t.why_compare_price, aihaa: t.why_compare_price_aihaa, other: t.why_compare_price_other, aihaaBetter: true },
    { feature: t.why_compare_response, aihaa: t.why_compare_response_aihaa, other: t.why_compare_response_other, aihaaBetter: true },
    { feature: t.why_compare_install, aihaa: t.why_compare_install_aihaa, other: t.why_compare_install_other, aihaaBetter: true },
    { feature: t.why_compare_hidden, aihaa: t.why_compare_hidden_aihaa, other: t.why_compare_hidden_other, aihaaBetter: true },
    { feature: t.why_compare_service, aihaa: t.why_compare_service_aihaa, other: t.why_compare_service_other, aihaaBetter: false },
  ];

  return (
    <section className="bg-white py-28 lg:py-36">
      <div ref={ref} className="scroll-reveal max-w-7xl mx-auto px-10 lg:pl-10 lg:pr-20">
        <div className="w-12 h-[2px] bg-[#DAA520] mb-10 scroll-reveal-child stagger-1" />

        <p className="text-xs tracking-[0.2em] uppercase text-[#DAA520] mb-4 scroll-reveal-child stagger-1">
          {t.why_compare_label}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-6 scroll-reveal-child stagger-1">
          {t.why_compare_title}
        </h2>

        <div className="flex items-baseline gap-3 mb-7 scroll-reveal-child stagger-2">
          <span className="text-[42px] font-bold text-[#DAA520] leading-none">
            {t.why_compare_savings}
          </span>
          <span className="text-[15px] text-[#B8860B]">
            {t.why_compare_savings_sub}
          </span>
        </div>

        <div className="max-w-[85%]">
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              className={`scroll-reveal-child stagger-${Math.min(i + 3, 8)} py-5 border-b border-[#0D0D0D]/[0.06]`}
            >
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#999] mb-2">
                {row.feature}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className="text-base font-semibold text-[#0D0D0D] flex items-center gap-2">
                  {row.aihaaBetter && (
                    <span className="text-[#DAA520] text-sm">✓</span>
                  )}
                  {row.aihaa}
                </p>
                <p
                  className={`text-sm ${
                    row.aihaaBetter
                      ? "text-[#999] line-through"
                      : "text-[#555] flex items-center gap-2"
                  }`}
                >
                  {!row.aihaaBetter && (
                    <span className="text-green-600 text-sm">✓</span>
                  )}
                  {row.other}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SUB-SECTION 3: SOCIAL PROOF
   ────────────────────────────────────────────── */

function SocialProof() {
  const testiRef = useScrollReveal();
  const impactRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      {/* Part A — Testimonials */}
      <section className="bg-white py-28 lg:py-36 overflow-hidden">
        <div ref={testiRef} className="scroll-reveal max-w-7xl mx-auto px-8 lg:px-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#717171] mb-20 scroll-reveal-child stagger-1">
            {t.why_testi_label}
          </p>

          <div className="scroll-reveal-child stagger-2 relative max-w-3xl border-l-[3px] border-l-[#DAA520] pl-8 lg:pl-12 mb-24">
            <span className="absolute -top-8 -left-4 text-[200px] leading-none font-playfair text-[#0D0D0D] opacity-[0.03] select-none pointer-events-none" aria-hidden="true">&ldquo;</span>
            <p className="relative text-xl lg:text-2xl text-[#0D0D0D] font-playfair italic leading-relaxed">
              {t.why_testi_1_quote}
            </p>
            <p className="mt-6 text-sm text-[#717171]">{t.why_testi_1_author}</p>
          </div>

          <div className="scroll-reveal-child stagger-3 max-w-2xl ml-auto mb-24">
            <div className="bg-[#F5F5F5] rounded-2xl p-8 lg:p-10">
              <p className="text-base text-[#0D0D0D] leading-relaxed">{t.why_testi_2_quote}</p>
              <p className="mt-4 text-sm text-[#717171]">{t.why_testi_2_author}</p>
            </div>
          </div>

          <div className="scroll-reveal-child stagger-4 max-w-md">
            <p className="text-sm italic text-[#333] leading-relaxed">{t.why_testi_3_quote}</p>
            <p className="mt-3 text-xs text-[#999]">{t.why_testi_3_author}</p>
          </div>
        </div>
      </section>

      {/* Part B — Impact strip */}
      <section className="bg-[#0D0D0D] py-20 lg:py-28">
        <div ref={impactRef} className="scroll-reveal max-w-5xl mx-auto px-8 lg:px-16 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
            {[
              { number: t.why_impact_families, label: t.why_impact_families_label },
              { number: t.why_impact_bottles, label: t.why_impact_bottles_label },
              { number: t.why_impact_schools, label: t.why_impact_schools_label },
              { number: t.why_impact_coverage, label: t.why_impact_coverage_label },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center scroll-reveal-child stagger-${i + 1} ${
                  i > 0 ? "sm:border-l sm:border-[rgba(218,165,32,0.15)]" : ""
                }`}
              >
                <span className="block text-3xl lg:text-4xl font-bold text-[#DAA520]">{stat.number}</span>
                <span className="block text-xs text-[#777] mt-2 max-w-[140px] mx-auto">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#555] mt-12">{t.why_impact_footnote}</p>

          <div className="mt-14 scroll-reveal-child stagger-5">
            <a
              href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
            >
              {t.why_impact_cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────── */

export default function WhyAihaaSection() {
  return (
    <>
      <FounderStory />
      <BezaKami />
      <SocialProof />
    </>
  );
}

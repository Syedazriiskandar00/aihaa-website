"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PromotionsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const heroRef = useScrollReveal();
  const mainRef = useScrollReveal();
  const cardsRef = useScrollReveal();
  const { t } = useLanguage();

  const termsAndConditions = [
    { title: t.promo_tnc_label_general, content: t.promo_tnc_general },
    { title: t.promo_tnc_label_install, content: t.promo_tnc_install },
    { title: t.promo_tnc_label_warranty, content: t.promo_tnc_warranty },
    { title: t.promo_tnc_label_trade, content: t.promo_tnc_trade },
    { title: t.promo_tnc_label_questions, content: t.promo_tnc_questions },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── SECTION 1: Page Header ── */}
      <section className="bg-[#0D0D0D] pt-28 pb-16">
        <div ref={heroRef} className="scroll-reveal max-w-3xl mx-auto px-4 text-center">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.3em] uppercase text-[#DAA520] mb-4">
            {t.promo_label}
          </p>
          <h1 className="scroll-reveal-child stagger-2 text-3xl md:text-4xl font-bold text-white mb-3">
            {t.promo_title}
          </h1>
          <p className="scroll-reveal-child stagger-3 text-sm italic text-[#999]">
            {t.promo_urgency}
          </p>
        </div>
      </section>

      {/* ── SECTION 2: Promo Utama ── */}
      <section className="bg-[#FFFDE7] py-20 lg:py-24">
        <div ref={mainRef} className="scroll-reveal max-w-2xl mx-auto px-6 text-center">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.3em] uppercase text-[#DAA520] mb-6">
            {t.promo_main_label}
          </p>
          <h2 className="scroll-reveal-child stagger-2 text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-4 leading-tight">
            {t.promo_main_title}
          </h2>
          <div className="w-14 h-px bg-[#DAA520] mx-auto mb-6" />
          <p className="scroll-reveal-child stagger-3 text-base text-[#555] leading-[1.8] mb-8">
            {t.promo_main_desc}
          </p>
          <p className="scroll-reveal-child stagger-4 text-2xl md:text-3xl font-bold text-[#DAA520] mb-8">
            {t.promo_main_price}
          </p>
          <div className="scroll-reveal-child stagger-5">
            <a
              href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
            >
              {t.promo_main_cta}
            </a>
          </div>
          <p className="scroll-reveal-child stagger-6 mt-4">
            <a
              href="/water-purifier"
              className="text-[13px] text-[#DAA520] hover:underline"
            >
              {t.promo_main_alt}
            </a>
          </p>
        </div>
      </section>

      {/* ── SECTION 3: Three promo cards ── */}
      <section className="bg-white py-16 lg:py-20 overflow-hidden">
        <div ref={cardsRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">

            {/* Card 1 — Trade-In (DARK) */}
            <div className="scroll-reveal-child stagger-1 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start bg-[#0D0D0D] rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <div>
                <span className="inline-block text-[11px] text-[#DAA520] border border-[rgba(218,165,32,0.3)] rounded-full px-3 py-1 mb-5">
                  {t.promo_trade_badge}
                </span>
                <h3 className="text-[22px] font-bold text-white mb-2">
                  {t.promo_trade_title}
                </h3>
                <p className="text-sm text-[#999] leading-relaxed">
                  {t.promo_trade_desc}
                </p>
              </div>
              <a
                href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DAA520] text-sm font-medium mt-6 hover:underline inline-block"
              >
                {t.promo_trade_cta}
              </a>
            </div>

            {/* Card 2 — Pakej Bundle (WHITE) */}
            <div className="scroll-reveal-child stagger-2 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start bg-white border border-[rgba(218,165,32,0.15)] rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,32,0.1)]">
              <div>
                <span className="inline-block text-[11px] text-white bg-[#DAA520] rounded-full px-3 py-1 mb-5 font-medium">
                  {t.promo_bundle_badge}
                </span>
                <h3 className="text-[22px] font-bold text-[#0D0D0D] mb-2">
                  {t.promo_bundle_title}
                </h3>
                <p className="text-sm text-[#717171] leading-relaxed mb-3">
                  {t.promo_bundle_desc}
                </p>
                <p className="text-lg font-bold text-[#DAA520]">{t.promo_bundle_price}</p>
              </div>
              <a
                href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DAA520] text-sm font-medium mt-6 hover:underline inline-block"
              >
                {t.promo_bundle_cta}
              </a>
            </div>

            {/* Card 3 — Rujukan (YELLOW) */}
            <div className="scroll-reveal-child stagger-3 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start bg-[#FFFDE7] rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div>
                <span className="inline-block text-[11px] text-[#717171] border border-[rgba(0,0,0,0.1)] rounded-full px-3 py-1 mb-5">
                  {t.promo_refer_badge}
                </span>
                <h3 className="text-[22px] font-bold text-[#0D0D0D] mb-2">
                  {t.promo_refer_title}
                </h3>
                <p className="text-sm text-[#717171] leading-relaxed">
                  {t.promo_refer_desc}
                </p>
              </div>
              <a
                href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#717171] text-sm font-medium mt-6 hover:underline inline-block"
              >
                {t.promo_refer_cta}
              </a>
            </div>

          </div>

          {/* T&C — integrated footnote */}
          <div className="mt-10 pt-10 border-t border-[rgba(0,0,0,0.06)] max-w-2xl mx-auto">
            <h2 className="text-[13px] text-[#ccc] font-normal mb-4">{t.promo_tnc_title}</h2>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {termsAndConditions.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? null : index)
                    }
                    className="w-full flex items-center justify-between py-2.5 text-left"
                  >
                    <span className="text-[12px] text-[#aaa]">{item.title}</span>
                    {openAccordion === index ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[#ccc]" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#ccc]" />
                    )}
                  </button>
                  {openAccordion === index && (
                    <div className="pb-2.5">
                      <p className="text-[12px] text-[#bbb] leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

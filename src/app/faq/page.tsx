"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [topExpanded, setTopExpanded] = useState(false);
  const heroRef = useScrollReveal();
  const topRef = useScrollReveal();
  const listRef = useScrollReveal();
  const { t } = useLanguage();

  const faqs = [
    { q: t.faq_q2, a: t.faq_a2 },
    { q: t.faq_q3, a: t.faq_a3 },
    { q: t.faq_q4, a: t.faq_a4 },
    { q: t.faq_q5, a: t.faq_a5 },
    { q: t.faq_q6, a: t.faq_a6 },
    { q: t.faq_q7, a: t.faq_a7 },
    { q: t.faq_q8, a: t.faq_a8 },
    { q: t.faq_q9, a: t.faq_a9 },
    { q: t.faq_q10, a: t.faq_a10 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── 1. HERO ── */}
      <section className="bg-[#0D0D0D] pt-28 pb-14">
        <div ref={heroRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.25em] uppercase text-[#DAA520] mb-4">
            {t.faq_label}
          </p>
          <h1 className="scroll-reveal-child stagger-2 text-[28px] lg:text-[32px] font-bold text-white mb-3">
            {t.faq_title}
          </h1>
          <p className="scroll-reveal-child stagger-3 text-sm text-[#999]">
            {t.faq_subtitle}
          </p>
        </div>
      </section>

      {/* ── 2. TOP QUESTION ── */}
      <section className="bg-[#FFFDE7] py-12">
        <div ref={topRef} className="scroll-reveal max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.25em] uppercase text-[#DAA520] mb-5">
            {t.faq_top_label}
          </p>
          <h2 className="scroll-reveal-child stagger-2 text-[22px] font-bold text-[#0D0D0D] mb-5">
            {t.faq_q1}
          </h2>
          <div className="scroll-reveal-child stagger-3 border-l-[3px] border-l-[#DAA520] pl-6">
            <p className={`text-[15px] text-[#555] leading-[1.8] ${!topExpanded ? "line-clamp-3" : ""}`}>
              {t.faq_a1}
            </p>
            <button
              onClick={() => setTopExpanded(!topExpanded)}
              className="text-sm text-[#DAA520] font-medium mt-2 hover:underline"
            >
              {topExpanded ? "Tutup" : "Baca lebih lanjut \u2192"}
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. REMAINING 9 FAQ ── */}
      <section className="bg-white py-16">
        <div ref={listRef} className="scroll-reveal max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`scroll-reveal-child stagger-${Math.min(i + 1, 8)} border-b border-[rgba(0,0,0,0.04)]`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4 group hover:bg-[rgba(218,165,32,0.02)] transition-colors -mx-3 px-3 rounded-lg"
              >
                <span className="text-base font-medium text-[#0D0D0D] group-hover:text-[#333] transition-colors">
                  {faq.q}
                </span>
                <span
                  className="text-[#DAA520] text-sm flex-shrink-0 transition-transform duration-200"
                  style={{
                    transform: openIndex === i ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ›
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === i ? "400px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="text-[15px] text-[#717171] leading-[1.8] pb-6 pl-4 lg:pl-6 max-w-[90%]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}

          {/* Inline CTA */}
          <div className="mt-8 bg-[rgba(218,165,32,0.04)] hover:bg-[rgba(218,165,32,0.08)] transition-colors rounded-xl py-6 px-4 lg:px-6">
            <p className="text-base font-medium text-[#0D0D0D] mb-1">
              {t.faq_cta_title}
            </p>
            <p className="text-sm text-[#717171] mb-3">
              {t.faq_cta_sub}
            </p>
            <a
              href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#DAA520] hover:underline"
            >
              {t.faq_cta_link}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

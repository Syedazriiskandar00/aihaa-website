"use client";

import { DollarSign, Truck, Wrench, Thermometer } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BenefitsSection() {
  const revealRef = useScrollReveal();
  const { t } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t.benefits_1_title,
      description: t.benefits_1_desc,
      highlight: t.benefits_1_badge,
    },
    {
      icon: Truck,
      title: t.benefits_2_title,
      description: t.benefits_2_desc,
      highlight: t.benefits_2_badge,
    },
    {
      icon: Wrench,
      title: t.benefits_3_title,
      description: t.benefits_3_desc,
      highlight: "2 Tahun",
    },
    {
      icon: Thermometer,
      title: t.benefits_4_title,
      description: t.benefits_4_desc,
      highlight: "JAKIM",
    },
  ];

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 scroll-reveal-child stagger-1 text-center max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold mb-4">
            Keistimewaan
          </p>
          <h2 className="font-editorial text-4xl md:text-5xl text-dark mb-4">
            {t.benefits_title} <span className="font-editorial-italic text-gold">AIHAA?</span>
          </h2>
          <p className="text-muted text-[14px] leading-relaxed max-w-lg mx-auto">
            {t.benefits_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group scroll-reveal-child stagger-${index + 2} bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-[rgba(218,165,32,0.15)] transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(218,165,32,0.35)]`}
            >
              {/* Icon circle — larger, centered */}
              <div className="w-16 h-16 mb-5 bg-gold/10 rounded-full flex items-center justify-center border border-[rgba(218,165,32,0.2)]">
                <benefit.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>

              {/* Pill badge — proper spacing, not overlapping */}
              <span className="inline-flex items-center bg-gold/10 text-gold-dark text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full mb-4 border border-[rgba(218,165,32,0.2)]">
                {benefit.highlight}
              </span>

              {/* Title */}
              <h3 className="font-editorial text-dark text-lg mb-3 min-h-[2.5rem] flex items-center">
                {benefit.title}
              </h3>

              {/* Gold divider */}
              <div className="w-10 h-px bg-[rgba(218,165,32,0.35)] mb-4" />

              {/* Description */}
              <p className="text-muted text-[13px] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

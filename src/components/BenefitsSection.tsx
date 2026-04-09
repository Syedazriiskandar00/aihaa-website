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
    <section className="bg-surface py-16 lg:py-20">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-reveal-child stagger-1">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t.benefits_title} <span className="gold-gradient-text">AIHAA</span>?
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            {t.benefits_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-white border border-[rgba(218,165,32,0.15)] rounded-2xl p-8 text-center card-hover group scroll-reveal-child stagger-${index + 2}`}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-gold" />
              </div>

              <div className="bg-gold/10 text-gold-dark text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3">
                {benefit.highlight}
              </div>

              <h3 className="text-dark font-semibold text-lg mb-2">
                {benefit.title}
              </h3>

              <p className="text-muted text-sm line-clamp-2 overflow-hidden">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { HeartHandshake, Users, Baby, Home } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function IndoorUseCases() {
  const revealRef = useScrollReveal();
  const { t } = useLanguage();

  // Set A (user-approved): Keluarga Muda · Keluarga Besar · Bayi Baru ·
  // Apartment Compact. Every icon maps to at least one product's
  // strength (EAN/BELLA → muda, BIG → besar, WINTER/BELLA → bayi,
  // FANCY/BELLA → compact).
  const useCases = [
    { icon: HeartHandshake, label: t.produk_dalam_usecase_muda },
    { icon: Users, label: t.produk_dalam_usecase_besar },
    { icon: Baby, label: t.produk_dalam_usecase_bayi },
    { icon: Home, label: t.produk_dalam_usecase_compact },
  ];

  return (
    <section className="bg-white py-16 lg:py-20 border-b border-black/5">
      <div ref={revealRef} className="scroll-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="scroll-reveal-child stagger-1 text-center text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-10">
          {t.produk_dalam_usecase_eyebrow}
        </p>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {useCases.map(({ icon: Icon, label }, idx) => (
            <li
              key={label}
              className={`scroll-reveal-child stagger-${idx + 2} flex flex-col items-center gap-3 text-center`}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark/5 transition-all duration-200 hover:bg-gold/15 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
                <Icon className="w-5 h-5 text-dark/70" strokeWidth={1.5} />
              </span>
              <span className="text-[13.5px] font-semibold text-dark tracking-wide">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

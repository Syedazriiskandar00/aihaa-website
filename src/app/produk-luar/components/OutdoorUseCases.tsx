"use client";

import { Droplets, Fish, Building2, Factory } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OutdoorUseCases() {
  const { t } = useLanguage();

  const useCases = [
    { icon: Droplets, label: t.produk_luar_usecase_boring },
    { icon: Fish, label: t.produk_luar_usecase_kolam },
    { icon: Building2, label: t.produk_luar_usecase_pejabat },
    { icon: Factory, label: t.produk_luar_usecase_kilang },
  ];

  return (
    <section className="bg-white py-16 lg:py-20 border-b border-black/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-10">
          {t.produk_luar_usecase_eyebrow}
        </p>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {useCases.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark/5">
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

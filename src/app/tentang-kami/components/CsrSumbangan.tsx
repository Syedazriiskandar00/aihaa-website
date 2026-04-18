"use client";

import { HandHeart, CloudRain, Users2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §5.5 CSR / Sumbangan — soft grey bg, 3 category-level CSR cards.
// Cards are CATEGORY placeholders (equipment donations / disaster
// relief / community programmes) not specific events, so the section
// ships meaningful without fabricating specific dates or locations.
// When Azri provides real CSR activity data, swap the title/year/desc
// i18n values — no layout change needed. Logged in PLACEHOLDERS.md.

export default function CsrSumbangan() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: HandHeart,
      title: t.about_csr_card_1_title,
      year: t.about_csr_card_1_year,
      desc: t.about_csr_card_1_desc,
    },
    {
      icon: CloudRain,
      title: t.about_csr_card_2_title,
      year: t.about_csr_card_2_year,
      desc: t.about_csr_card_2_desc,
    },
    {
      icon: Users2,
      title: t.about_csr_card_3_title,
      year: t.about_csr_card_3_year,
      desc: t.about_csr_card_3_desc,
    },
  ];

  return (
    <section className="bg-[#F5F5F3] py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold mb-4">
            {t.about_csr_eyebrow}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-dark leading-[1.08]">
            {t.about_csr_heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map(({ icon: Icon, title, year, desc }) => (
            <article
              key={title}
              className="relative bg-white rounded-2xl p-8 border border-black/5 transition-transform hover:-translate-y-1 hover:shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-5">
                <Icon className="w-5 h-5 text-gold-dark" strokeWidth={1.5} />
              </span>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-editorial text-xl md:text-2xl text-dark leading-tight">
                  {title}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted font-semibold">
                  {year}
                </span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-muted">{desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] text-muted italic max-w-xl mx-auto">
          {t.about_csr_note}
        </p>
      </div>
    </section>
  );
}

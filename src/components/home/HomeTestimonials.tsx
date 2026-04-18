"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §1.4 Feedback / Suara Pelanggan — zigzag layout, serif italic
// quotes with gold left-border accents, alternating left/right alignment.
//
// Hijrah-style minimalist: no section heading other than the eyebrow,
// quotes do the storytelling. Two quotes only (SPEC allows optional 3rd)
// — cleaner rhythm with just 2 and room to add a 3rd later when a real
// customer review lands.
export default function HomeTestimonials() {
  const { t } = useLanguage();

  const quotes = [
    {
      text: t.home_testi_quote_1_text,
      author: t.home_testi_quote_1_author,
      location: t.home_testi_quote_1_location,
      align: "left" as const,
    },
    {
      text: t.home_testi_quote_2_text,
      author: t.home_testi_quote_2_author,
      location: t.home_testi_quote_2_location,
      align: "right" as const,
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-14 text-center">
          {t.home_testi_eyebrow}
        </p>

        <div className="space-y-16 lg:space-y-20">
          {quotes.map((q) => {
            const isLeft = q.align === "left";
            return (
              <figure
                key={q.author}
                className={`max-w-[60%] ${
                  isLeft ? "mr-auto" : "ml-auto text-right"
                }`}
              >
                <blockquote
                  className={`relative font-editorial-italic text-dark text-xl md:text-2xl lg:text-[28px] leading-[1.35] ${
                    isLeft
                      ? "border-l-[3px] border-gold pl-6 md:pl-8"
                      : "border-r-[3px] border-gold pr-6 md:pr-8"
                  }`}
                >
                  <span aria-hidden className="select-none">
                    &ldquo;
                  </span>
                  {q.text}
                  <span aria-hidden className="select-none">
                    &rdquo;
                  </span>
                </blockquote>
                <figcaption
                  className={`mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted font-semibold ${
                    isLeft ? "pl-6 md:pl-8" : "pr-6 md:pr-8 justify-end"
                  }`}
                >
                  <span className="text-dark">{q.author}</span>
                  <span aria-hidden className="text-gold">
                    ·
                  </span>
                  <span>{q.location}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

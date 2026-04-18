"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §5.2 Halal Commitment — Hijrah-style: centered layout, large
// MS 1500 cert label, Halal integrity checkpoints. Cert reference
// (6 126-03 / 2014) is a placeholder from the brainstorm — flagged in
// PLACEHOLDERS.md for Azri to verify against the actual JAKIM cert.

export default function HalalCommitment() {
  const { t } = useLanguage();

  const checkpoints = [
    t.about_halal_checkpoint_1,
    t.about_halal_checkpoint_2,
    t.about_halal_checkpoint_3,
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold mb-4">
          {t.about_halal_eyebrow}
        </p>
        <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-dark leading-[1.08] mb-3">
          {t.about_halal_heading}
        </h2>
        <p className="font-editorial-italic text-lg md:text-xl text-muted mb-10">
          {t.about_halal_italic}
        </p>

        {/* Halal mark — placeholder circle with JAKIM label */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#0D0D0D] flex items-center justify-center border-4 border-[#2D5F4A]">
            <div className="text-center leading-tight">
              <div className="font-editorial-italic text-gold text-xl lg:text-2xl">
                HALAL
              </div>
              <div className="text-[9px] lg:text-[10px] uppercase tracking-[0.22em] text-white/70 font-semibold mt-0.5">
                JAKIM
              </div>
            </div>
            {/* Decorative inner ring */}
            <span
              aria-hidden
              className="absolute inset-2 rounded-full border border-gold/30 pointer-events-none"
            />
          </div>
        </div>

        {/* MS 1500 cert label */}
        <div className="font-editorial text-dark text-4xl md:text-5xl mb-1 tracking-tight">
          {t.about_halal_cert_label}
        </div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-10 font-semibold">
          {t.about_halal_cert_ref}
        </div>

        <p className="text-[14px] md:text-[15px] leading-relaxed text-dark/80 mb-14 max-w-2xl mx-auto">
          {t.about_halal_body}
        </p>

        {/* Halal integrity checkpoints */}
        <div className="border-t border-black/10 pt-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold mb-6">
            {t.about_halal_checkpoints_heading}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 text-left max-w-2xl mx-auto">
            {checkpoints.map((text, index) => (
              <li
                key={index}
                className="relative pl-6 text-[13.5px] leading-relaxed text-dark/80"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.45em] w-2.5 h-2.5 rounded-full border-2 border-gold"
                />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

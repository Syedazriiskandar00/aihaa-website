"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §5.2 Halal Commitment — Hijrah-style centered layout with the
// official Halal JAKIM badge + integrity checkpoints. The MS 1500 cert
// label + reference number lived here previously as a brainstorm
// placeholder; both removed pending verified JAKIM cert detail.

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

        {/* Halal JAKIM badge — official logo, square frame so the
            block size stays consistent with surrounding rhythm.
            object-contain preserves the logo's native 3:2 ratio
            (it letterboxes top/bottom against the white section bg
            so the negative space is visually invisible). */}
        <div className="flex justify-center mb-10">
          <div className="relative aspect-square w-full max-w-32 lg:max-w-40">
            <Image
              src="/images/logo-halal.webp"
              alt="Halal JAKIM Certification"
              fill
              sizes="(max-width: 1024px) 128px, 160px"
              className="object-contain"
            />
          </div>
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

"use client";

import { Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §5.4 Team — white bg, full-bleed team photo. Placeholder block
// until Azri supplies the team group photo. Logged in PLACEHOLDERS.md.
// Kept minimal: eyebrow + heading + subheading + 21:9 placeholder
// block. No leadership grid yet — Azri can add later when bios land.

export default function TeamSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold mb-4">
            {t.about_team_eyebrow}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-dark leading-[1.08] mb-4">
            {t.about_team_heading}
          </h2>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-muted">
            {t.about_team_subheading}
          </p>
        </div>

        {/* Team photo placeholder — 21:9 dark block */}
        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden bg-[#1F1F1F] flex items-center justify-center border border-black/5">
          <div className="flex flex-col items-center gap-3 text-white/40">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5">
              <Users className="w-6 h-6 text-gold/60" strokeWidth={1.5} />
            </span>
            <p className="text-[12px] uppercase tracking-[0.24em] font-semibold">
              {t.about_team_placeholder}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

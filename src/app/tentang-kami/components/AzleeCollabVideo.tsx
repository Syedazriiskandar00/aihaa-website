"use client";

import { Play } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// SPEC §5.3 Brand Collaboration — dark bg so a future video embed pops.
// Placeholder 16:9 frame with decorative play affordance. When Azri
// supplies the real video URL, swap the placeholder div for a YouTube
// embed or next/video. Logged in PLACEHOLDERS.md.

export default function AzleeCollabVideo() {
  const { t } = useLanguage();

  return (
    <section className="bg-dark py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold mb-4">
            {t.about_azlee_eyebrow}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-white leading-[1.08] mb-4">
            {t.about_azlee_heading}
          </h2>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-white/70">
            {t.about_azlee_subheading}
          </p>
        </div>

        {/* Video placeholder — 16:9 dark frame with play button */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1F1F1F] border border-white/5 flex items-center justify-center">
          {/* Subtle grain */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold/40 bg-gold/10">
              <Play
                className="w-7 h-7 md:w-8 md:h-8 text-gold"
                strokeWidth={1.5}
                fill="currentColor"
              />
            </span>
            <p className="text-[12px] uppercase tracking-[0.24em] text-white/50 font-semibold">
              {t.about_azlee_placeholder}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

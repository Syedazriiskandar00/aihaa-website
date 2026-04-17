"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeartServiceHero() {
  const { t } = useLanguage();

  const pillars = [
    { title: t.service_heart_speedy_title, desc: t.service_heart_speedy_desc },
    { title: t.service_heart_expert_title, desc: t.service_heart_expert_desc },
    { title: t.service_heart_caring_title, desc: t.service_heart_caring_desc },
    { title: t.service_heart_alert_title, desc: t.service_heart_alert_desc },
  ];

  return (
    <section className="bg-white pt-28 pb-20 lg:pt-36 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Script logo + tagline */}
        <div className="text-center mb-14">
          <span
            className="block font-editorial-italic text-gold text-5xl md:text-6xl lg:text-7xl leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.service_hero_script}
          </span>
          <p className="mt-4 text-[13px] md:text-[14px] text-muted max-w-lg mx-auto leading-relaxed">
            {t.service_hero_tagline}
          </p>
        </div>

        {/* Eyebrow + heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-4">
            {t.service_hero_eyebrow}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.06]">
            {t.service_hero_heading}
          </h1>
          <p className="mt-5 text-[14px] md:text-[15px] leading-relaxed text-muted max-w-xl mx-auto">
            {t.service_hero_subheading}
          </p>
        </div>

        {/* 4 pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="relative">
              {/* Subtle index stroke — editorial, not a card */}
              <span className="block font-editorial-italic text-gold/30 text-3xl md:text-4xl mb-4">
                0{index + 1}
              </span>
              <h3 className="text-[15px] font-semibold tracking-[0.12em] text-dark mb-3">
                {pillar.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-muted">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TEAM_DEPARTMENTS, TEAM_GROUP_PHOTOS } from "@/lib/data/team";

// SPEC §5.4 Team — white bg. Group-photo strip on top, then a per-
// department grid of member portraits. Roster lives in
// src/lib/data/team.ts (BM-only site, so team copy is plain data, not
// i18n). Portraits 800x800 square; group photos 1600x900 landscape.

export default function TeamSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
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

        {/* Group photos — row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-16 lg:mb-20">
          {TEAM_GROUP_PHOTOS.map((g) => (
            <figure key={g.src} className="text-center">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-black/5 bg-[#F5F5F3]">
                <Image
                  src={g.src}
                  alt={`${g.caption} AIHAA`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[12px] uppercase tracking-[0.22em] text-muted font-semibold">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Department grids */}
        <div className="space-y-14 lg:space-y-16">
          {TEAM_DEPARTMENTS.map((dept) => (
            <div key={dept.title}>
              <h3 className="font-editorial text-2xl md:text-3xl text-dark leading-tight text-center mb-8 lg:mb-10">
                {dept.title}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                {dept.members.map((m) => (
                  <li key={m.name} className="flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-1 ring-black/[0.06] shadow-sm bg-[#F5F5F3]">
                      <Image
                        src={m.photo}
                        alt={`${m.name} — ${m.role}, AIHAA`}
                        width={800}
                        height={800}
                        sizes="(max-width: 640px) 112px, 128px"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-4 text-[15px] font-semibold text-dark">
                      {m.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-muted">
                      {m.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import SectionHeading from "@/components/shared/SectionHeading";

export default function FiveCheckPointOutdoor() {
  const { t } = useLanguage();

  const items = [
    t.service_check5_item_1,
    t.service_check5_item_2,
    t.service_check5_item_3,
    t.service_check5_item_4,
    t.service_check5_item_5,
  ];

  return (
    <section className="bg-[#F5F5F3] py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.service_check5_eyebrow}
          heading={t.service_check5_heading}
          subheading={t.service_check5_subheading}
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: 5 numbered items with clipboard accent */}
          <ol className="lg:col-span-3 space-y-5">
            {items.map((item, index) => (
              <li key={item} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-semibold text-gold-dark text-[13px] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <p className="text-[15px] text-dark font-semibold">{item}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: placeholder for technician illustration */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center p-6 border border-black/5"
              style={{ background: "#1F1F1F" }}
            >
              {/* Decorative outdoor tank silhouette */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                viewBox="0 0 200 260"
                fill="none"
                aria-hidden="true"
              >
                <ellipse cx="100" cy="50" rx="40" ry="12" stroke="#DAA520" strokeWidth="1" />
                <path
                  d="M 60 50 L 60 210 Q 60 230 100 230 Q 140 230 140 210 L 140 50"
                  stroke="#DAA520"
                  strokeWidth="1"
                  fill="none"
                />
                <line x1="60" y1="95" x2="140" y2="95" stroke="#DAA520" strokeWidth="0.5" strokeDasharray="2 3" />
                <line x1="60" y1="130" x2="140" y2="130" stroke="#DAA520" strokeWidth="0.5" strokeDasharray="2 3" />
                <line x1="60" y1="165" x2="140" y2="165" stroke="#DAA520" strokeWidth="0.5" strokeDasharray="2 3" />
                <line x1="60" y1="200" x2="140" y2="200" stroke="#DAA520" strokeWidth="0.5" strokeDasharray="2 3" />
              </svg>
              <p className="relative text-center text-[12px] text-white/50 max-w-[220px] leading-relaxed">
                {t.service_check5_placeholder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ThirteenCheckPoint() {
  const { t } = useLanguage();

  const items = [
    t.service_check13_item_1,
    t.service_check13_item_2,
    t.service_check13_item_3,
    t.service_check13_item_4,
    t.service_check13_item_5,
    t.service_check13_item_6,
    t.service_check13_item_7,
    t.service_check13_item_8,
    t.service_check13_item_9,
    t.service_check13_item_10,
    t.service_check13_item_11,
    t.service_check13_item_12,
    t.service_check13_item_13,
  ];

  const left = items.slice(0, 9);
  const right = items.slice(9);

  return (
    <section className="bg-[#F5F5F3] py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.service_check13_eyebrow}
          heading={t.service_check13_heading}
          subheading={t.service_check13_subheading}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: numbered list (2 columns on desktop) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-x-10 gap-y-3">
            <ol className="space-y-3" start={1}>
              {left.map((item, index) => (
                <li
                  key={`l-${index}`}
                  className="flex items-baseline gap-3 text-[14px] text-dark"
                >
                  <span className="text-[12px] font-semibold text-gold w-6 shrink-0 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <ol className="space-y-3" start={10}>
              {right.map((item, index) => (
                <li
                  key={`r-${index}`}
                  className="flex items-baseline gap-3 text-[14px] text-dark"
                >
                  <span className="text-[12px] font-semibold text-gold w-6 shrink-0 tabular-nums">
                    {String(index + 10).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: diagram placeholder */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center p-6 border border-black/5"
              style={{ background: "#1F1F1F" }}
            >
              {/* Decorative leader-line pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 200 260"
                fill="none"
                aria-hidden="true"
              >
                <rect x="70" y="40" width="60" height="180" rx="6" stroke="#DAA520" strokeWidth="1" />
                <line x1="10" y1="60" x2="70" y2="60" stroke="#DAA520" strokeWidth="0.5" />
                <line x1="10" y1="100" x2="70" y2="100" stroke="#DAA520" strokeWidth="0.5" />
                <line x1="130" y1="80" x2="190" y2="80" stroke="#DAA520" strokeWidth="0.5" />
                <line x1="130" y1="140" x2="190" y2="140" stroke="#DAA520" strokeWidth="0.5" />
                <line x1="10" y1="180" x2="70" y2="180" stroke="#DAA520" strokeWidth="0.5" />
                <line x1="130" y1="210" x2="190" y2="210" stroke="#DAA520" strokeWidth="0.5" />
                <circle cx="70" cy="60" r="2" fill="#DAA520" />
                <circle cx="70" cy="100" r="2" fill="#DAA520" />
                <circle cx="130" cy="80" r="2" fill="#DAA520" />
                <circle cx="130" cy="140" r="2" fill="#DAA520" />
                <circle cx="70" cy="180" r="2" fill="#DAA520" />
                <circle cx="130" cy="210" r="2" fill="#DAA520" />
              </svg>
              <p className="relative text-center text-[12px] text-white/50 max-w-[220px] leading-relaxed">
                {t.service_check13_placeholder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

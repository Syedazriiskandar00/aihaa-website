"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import SectionHeading from "@/components/shared/SectionHeading";

const FOREST_GREEN = "#2D5F4A";

export default function EightStepGallery() {
  const { t } = useLanguage();

  const steps = [
    t.service_8step_step_1,
    t.service_8step_step_2,
    t.service_8step_step_3,
    t.service_8step_step_4,
    t.service_8step_step_5,
    t.service_8step_step_6,
    t.service_8step_step_7,
    t.service_8step_step_8,
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.service_8step_eyebrow}
          heading={t.service_8step_heading}
          subheading={t.service_8step_subheading}
          className="mb-14"
        />

        <ol className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="group relative aspect-square rounded-lg overflow-hidden flex items-end p-5 transition-transform hover:scale-[1.02]"
              style={{ background: FOREST_GREEN }}
            >
              {/* Step number — editorial, large, subtle */}
              <span
                className="absolute top-4 right-4 text-white/25 font-editorial text-3xl md:text-4xl leading-none tabular-nums"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {/* Step label */}
              <span className="relative text-white text-[13px] md:text-[14px] font-semibold tracking-wide leading-tight">
                {step}
              </span>
              {/* Subtle top-left accent stroke */}
              <span
                aria-hidden
                className="absolute top-0 left-0 w-6 h-[2px] bg-white/40"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const certifications = [
  { abbr: "HALAL", name: "JAKIM Certified" },
  { abbr: "RoHS", name: "Compliant" },
  { abbr: "GOLD", name: "Standard" },
  { abbr: "TUV", name: "Tested" },
  { abbr: "ISO", name: "Certified" },
  { abbr: "CE", name: "Approved" },
];

export default function CertificationsSection() {
  const revealRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className="bg-[#FFFDE7] py-14 border-y border-[rgba(218,165,32,0.1)]">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#717171] text-sm uppercase tracking-wider">
            {t.cert_title}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center w-[76px] h-[88px] md:w-[88px] md:h-[100px]"
            >
              {/* Shield SVG shape */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 88 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 2L82 18V50C82 72 66 90 44 98C22 90 6 72 6 50V18L44 2Z"
                  fill="#FFFFFF"
                  stroke="rgba(218,165,32,0.35)"
                  strokeWidth="1.5"
                  className="group-hover:stroke-[rgba(218,165,32,0.6)] transition-all"
                />
              </svg>
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center pt-1">
                <span className="text-[#DAA520] font-bold text-base md:text-lg leading-none group-hover:scale-110 transition-transform">
                  {cert.abbr}
                </span>
                <span className="text-[#717171] text-[9px] md:text-[10px] mt-1.5 text-center leading-tight">
                  {cert.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

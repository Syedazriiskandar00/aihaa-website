"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[90vh] bg-[#0D0D0D] overflow-hidden pt-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 70% 50%, rgba(218,165,32,0.04) 0%, transparent 60%)",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 flex items-center min-h-[calc(90vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Mobile: Image first */}
          <div className="lg:hidden flex justify-center hero-entrance hero-entrance-1">
            <div className="relative w-full max-w-[320px] h-[280px] rounded-2xl overflow-hidden border border-[rgba(218,165,32,0.3)]">
              <Image
                src="/images/products/bella/poster.jpg"
                alt="AIHAA BELLA Water Purifier"
                fill
                className="object-contain"
                sizes="320px"
                priority
              />
            </div>
          </div>

          {/* Left — Content */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <p
              className="text-[#DAA520] font-semibold uppercase mb-6 hero-entrance hero-entrance-1"
              style={{ fontSize: "11px", letterSpacing: "0.15em" }}
            >
              PENAPIS AIR PREMIUM · SEKALI BAYAR
            </p>

            {/* Headline */}
            <h1
              className="text-white font-[800] leading-[1.1] mb-0 hero-entrance hero-entrance-1"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              Air Bersih.
              <br />
              Tanpa Bayaran Bulanan.
            </h1>

            {/* Price block */}
            <div className="mt-8 hero-entrance hero-entrance-2">
              <p className="text-white/50 text-[13px] mb-1">Bermula dari</p>
              <p
                className="text-[#DAA520] font-[900] leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
              >
                RM399
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 hero-entrance hero-entrance-3">
              <a
                href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto bg-[#DAA520] text-[#0D0D0D] font-bold text-base px-8 py-4 rounded-full hover:opacity-90 transition-all hover:shadow-gold text-center btn-shimmer"
              >
                WhatsApp Untuk Beli Sekarang →
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-6 mt-6 hero-entrance hero-entrance-3">
              {["Sekali Bayar", "Pemasangan Percuma", "Waranti 2 Tahun"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-white text-[11px] lg:text-[12px]"
                  >
                    <svg
                      className="w-4 h-4 text-[#DAA520] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right — Product Image (desktop only) */}
          <div className="hidden lg:flex items-center justify-center hero-entrance hero-entrance-2">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(218,165,32,0.3)]">
              <Image
                src="/images/products/bella/poster.jpg"
                alt="AIHAA BELLA Water Purifier"
                fill
                className="object-contain"
                sizes="420px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFFDE7"
          />
        </svg>
      </div>
    </section>
  );
}

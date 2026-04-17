"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import SectionHeading from "@/components/shared/SectionHeading";

const FIVE_LAYER_PRICE = "RM 250";
const SIX_LAYER_PRICE = "RM 650";
const WHATSAPP_URL =
  "https://wa.me/60123456789?text=Saya%20nak%20tempah%20servis%20tukar%20pasir%20penapis%20luar%20AIHAA";

// Layer rendering: top-down bands in the tank illustration.
// Kept minimal (not 6 separate colored bands) to stay visually calm.
const FIVE_LAYER_BANDS = [
  { tone: "#3A2E28", flex: 1 },
  { tone: "#A89968", flex: 1 },
  { tone: "#E6D7B8", flex: 1 },
  { tone: "#C8B99C", flex: 1 },
  { tone: "#9B8770", flex: 1 },
];

const SIX_LAYER_BANDS = [
  { tone: "#3A2E28", flex: 1 },
  { tone: "#1E1E1E", flex: 1 },
  { tone: "#A89968", flex: 1 },
  { tone: "#E6D7B8", flex: 1 },
  { tone: "#C8B99C", flex: 1 },
  { tone: "#9B8770", flex: 1 },
];

function TankIllustration({ bands, label }: { bands: typeof FIVE_LAYER_BANDS; label: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative rounded-[14px] overflow-hidden flex flex-col border border-black/10 shadow-sm"
        style={{ width: 72, height: 180 }}
        role="img"
        aria-label={label}
      >
        {bands.map((band, index) => (
          <div
            key={index}
            style={{ background: band.tone, flex: band.flex }}
            className="w-full"
          />
        ))}
        {/* Top cap */}
        <span className="absolute top-0 left-0 right-0 h-2 bg-black/30" />
        {/* Bottom cap */}
        <span className="absolute bottom-0 left-0 right-0 h-2 bg-black/40" />
      </div>
    </div>
  );
}

export default function SandReplacementPricing() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.service_pricing_sand_eyebrow}
          heading={t.service_pricing_sand_heading}
          subheading={t.service_pricing_sand_subheading}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1 — 5 layer (government supply) */}
          <article className="relative bg-[#F5F5F3] text-dark rounded-2xl p-8 lg:p-10 border border-black/5 flex gap-6">
            <TankIllustration bands={FIVE_LAYER_BANDS} label="5-layer sand tank" />
            <div className="flex-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-dark text-white text-[11px] uppercase tracking-[0.16em] font-semibold">
                {t.service_pricing_sand_5layer_badge}
              </span>
              <div className="mt-6 mb-4">
                <span className="font-editorial text-5xl md:text-6xl text-dark tracking-tight">
                  {FIVE_LAYER_PRICE}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-muted">
                {t.service_pricing_sand_5layer_note}
              </p>
            </div>
          </article>

          {/* Card 2 — 6 layer (borehole) */}
          <article className="relative bg-dark text-white rounded-2xl p-8 lg:p-10 overflow-hidden border border-gold/20 flex gap-6">
            <TankIllustration bands={SIX_LAYER_BANDS} label="6-layer sand tank" />
            <div className="flex-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/15 text-gold text-[11px] uppercase tracking-[0.16em] font-semibold">
                {t.service_pricing_sand_6layer_badge}
              </span>
              <div className="mt-6 mb-4">
                <span className="font-editorial text-5xl md:text-6xl text-gold tracking-tight">
                  {SIX_LAYER_PRICE}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-white/70">
                {t.service_pricing_sand_6layer_note}
              </p>
            </div>
            <span
              aria-hidden
              className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 rounded-tl-[60px] pointer-events-none"
            />
          </article>
        </div>

        {/* Footer note + single CTA */}
        <div className="mt-12 text-center">
          <p className="text-[12.5px] text-muted mb-6 max-w-md mx-auto">
            {t.service_pricing_sand_note}
          </p>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
          >
            {t.service_pricing_sand_cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

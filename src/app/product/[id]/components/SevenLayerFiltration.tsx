"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { OutdoorLayerKind, Product } from "@/lib/data/products";
import type { TranslationKeys } from "@/lib/i18n/translations";

// SPEC §D — Outdoor replacement for §D.3. Seven-layer cross-section of
// the AIHAA outdoor media stack. CSS-drawn cylinder (not a photo) with
// each layer using the earth-tone palette agreed in /service §4.6 sand
// types. Reads as a technical schematic, not filler.

type LayerConfig = {
  nameKey: keyof TranslationKeys;
  descKey: keyof TranslationKeys;
  colour: string;
  grain?: "dots" | "stripes" | "none";
};

const LAYER_MAP: Record<OutdoorLayerKind, LayerConfig> = {
  anthracite: {
    nameKey: "product_layers_anthracite_name",
    descKey: "product_layers_anthracite_desc",
    colour: "#3B3A36",
    grain: "dots",
  },
  "zeolite-plus": {
    nameKey: "product_layers_zeolite_plus_name",
    descKey: "product_layers_zeolite_plus_desc",
    colour: "#8F7A5A",
    grain: "dots",
  },
  kdf: {
    nameKey: "product_layers_kdf_name",
    descKey: "product_layers_kdf_desc",
    colour: "#A68A5F",
    grain: "stripes",
  },
  "nano-silver": {
    nameKey: "product_layers_nano_silver_name",
    descKey: "product_layers_nano_silver_desc",
    colour: "#2A2724",
    grain: "dots",
  },
  "super-quick-sand": {
    nameKey: "product_layers_super_quick_sand_name",
    descKey: "product_layers_super_quick_sand_desc",
    colour: "#C9B78C",
    grain: "dots",
  },
  "fine-sand": {
    nameKey: "product_layers_fine_sand_name",
    descKey: "product_layers_fine_sand_desc",
    colour: "#D8C79B",
    grain: "dots",
  },
  "silica-sand": {
    nameKey: "product_layers_silica_sand_name",
    descKey: "product_layers_silica_sand_desc",
    colour: "#E6D7AE",
    grain: "dots",
  },
};

const DEFAULT_OUTDOOR_LAYERS: OutdoorLayerKind[] = [
  "anthracite",
  "zeolite-plus",
  "kdf",
  "nano-silver",
  "super-quick-sand",
  "fine-sand",
  "silica-sand",
];

type Props = { product: Product };

export default function SevenLayerFiltration({ product }: Props) {
  const { t } = useLanguage();
  const layers = product.outdoorLayers ?? DEFAULT_OUTDOOR_LAYERS;

  return (
    <section className="bg-[#F5F5F3] py-20 lg:py-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.product_layers_eyebrow}
          heading={t.product_layers_heading}
          subheading={t.product_layers_subheading}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-center">
          {/* Cylinder — CSS-drawn, 7 stacked segments */}
          <div className="relative mx-auto md:mx-0 w-[220px]">
            {/* Top cap */}
            <div
              className="relative h-6 rounded-t-[50%] bg-gradient-to-b from-[#9AA8B4] to-[#7A8894]"
              aria-hidden
            />
            {/* Body frame */}
            <div className="relative border-x border-[#7A8894] bg-[#C4CCD4]">
              {layers.map((kind) => {
                const cfg = LAYER_MAP[kind];
                return (
                  <div
                    key={kind}
                    className="relative h-14 border-b border-black/10 last:border-b-0 overflow-hidden"
                    style={{ background: cfg.colour }}
                  >
                    {cfg.grain === "dots" && (
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
                          backgroundSize: "6px 6px",
                        }}
                      />
                    )}
                    {cfg.grain === "stripes" && (
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 7px)",
                          backgroundSize: "8px 100%",
                        }}
                      />
                    )}
                    {/* Inner shadow — subtle roundness */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.15) 100%)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {/* Bottom cap */}
            <div
              className="relative h-6 rounded-b-[50%] bg-gradient-to-t from-[#9AA8B4] to-[#7A8894]"
              aria-hidden
            />
          </div>

          {/* Layer list — right column */}
          <ol className="relative space-y-3">
            {layers.map((kind, index) => {
              const cfg = LAYER_MAP[kind];
              return (
                <li
                  key={kind}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-black/5 hover:border-gold/30 transition-colors"
                >
                  <span
                    className="mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-[11px] font-bold shrink-0"
                    style={{ background: cfg.colour }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-editorial text-[15px] md:text-base text-dark leading-tight">
                      {t[cfg.nameKey]}
                    </p>
                    <p className="mt-1 text-[12.5px] md:text-[13px] text-muted leading-snug">
                      {t[cfg.descKey]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

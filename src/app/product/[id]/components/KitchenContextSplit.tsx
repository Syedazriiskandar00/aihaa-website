"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";

// SPEC §D.2 — Kitchen Context Split. Indoor detail pages only.
// Two scenes side-by-side (Modern / Industrial) with the product hero-
// scale in front of each backdrop. No stock photography; backdrops are
// CSS gradients + subtle pattern overlays so the placeholder reads as
// deliberate design, not a missing asset.

type Props = { product: Product };

export default function KitchenContextSplit({ product }: Props) {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-10">
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold font-semibold text-center mb-3">
          {t.product_kitchen_eyebrow}
        </p>
        <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-dark text-center leading-[1.08] mb-4">
          {t.product_kitchen_heading}
        </h2>
        <p className="max-w-2xl mx-auto text-center text-[14px] md:text-[15px] text-muted leading-relaxed">
          {t.product_kitchen_tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <KitchenScene
          label={t.product_kitchen_modern_label}
          caption={t.product_kitchen_modern_caption}
          image={product.mainImage}
          alt={`${product.name} — ${t.product_kitchen_modern_label}`}
          variant="modern"
        />
        <KitchenScene
          label={t.product_kitchen_industrial_label}
          caption={t.product_kitchen_industrial_caption}
          image={product.mainImage}
          alt={`${product.name} — ${t.product_kitchen_industrial_label}`}
          variant="industrial"
        />
      </div>
    </section>
  );
}

function KitchenScene({
  label,
  caption,
  image,
  alt,
  variant,
}: {
  label: string;
  caption: string;
  image: string;
  alt: string;
  variant: "modern" | "industrial";
}) {
  const isModern = variant === "modern";

  // Modern — soft cream/grey gradient, light warm accent from top.
  // Industrial — dark charcoal with subtle concrete grain overlay.
  const backdropStyle = isModern
    ? {
        backgroundImage:
          "linear-gradient(180deg, #EDE7DC 0%, #D9D4C7 55%, #C9C3B6 100%)",
      }
    : {
        backgroundImage:
          "linear-gradient(180deg, #2A2927 0%, #1C1B1A 60%, #141312 100%)",
      };

  const labelClass = isModern
    ? "text-dark bg-white/70 backdrop-blur-sm"
    : "text-white bg-black/40 backdrop-blur-sm";

  const captionClass = isModern ? "text-dark/70" : "text-white/70";

  return (
    <div className="relative">
      {/* Backdrop layer */}
      <div
        className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden"
        style={backdropStyle}
      >
        {/* Subtle pattern overlay — different per variant */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage: isModern
              ? "radial-gradient(circle at 30% 20%, #FFFFFF 0, transparent 45%), radial-gradient(circle at 70% 80%, #000000 0, transparent 55%)"
              : "linear-gradient(135deg, transparent 0, transparent 48%, rgba(255,255,255,0.12) 50%, transparent 52%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0.6) 0, transparent 70%)",
            backgroundSize: isModern ? "600px 600px" : "32px 32px, 100% 100%",
          }}
        />

        {/* Horizon line — where "counter" meets "wall" for context */}
        <div
          aria-hidden
          className={`absolute left-0 right-0 h-px ${
            isModern ? "bg-black/10" : "bg-white/10"
          }`}
          style={{ top: "62%" }}
        />

        {/* Product sits on invisible counter */}
        <div className="absolute inset-0 flex items-end justify-center pb-[18%]">
          <div className="relative w-[55%] h-[70%]">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 55vw, 28vw"
            />
          </div>
        </div>

        {/* Label chip — top-left */}
        <span
          className={`absolute top-6 left-6 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold ${labelClass}`}
        >
          {label}
        </span>
      </div>

      {/* Caption below scene */}
      <div className={`bg-white px-6 md:px-10 py-6 md:py-8 border-t border-black/5`}>
        <p className="font-editorial text-lg md:text-xl text-dark mb-2">
          {label}
        </p>
        <p className={`text-[13px] md:text-[14px] leading-relaxed ${
          isModern ? "text-muted" : "text-muted"
        } ${captionClass ? "" : ""}`}>
          {caption}
        </p>
      </div>
    </div>
  );
}

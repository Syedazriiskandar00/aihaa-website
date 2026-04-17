"use client";

import Link from "next/link";
import Image from "next/image";
import { Droplets, TreePine } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CategoryShowcase() {
  const revealRef = useScrollReveal();
  const { t } = useLanguage();

  const categories = [
    {
      number: "01",
      icon: Droplets,
      title: t.category_indoor_title,
      subtitle: t.category_indoor_label,
      description: t.category_indoor_desc,
      products: "BELLA, FANCY, WINTER",
      productsMore: "dan 2 lagi \u2192",
      cta: t.category_indoor_cta,
      href: "/water-purifier",
      dark: true,
      image: "/images/products/bella/main.jpg",
      imageAlt: "AIHAA Bella",
    },
    {
      number: "02",
      icon: TreePine,
      title: t.category_outdoor_title,
      subtitle: t.category_outdoor_label,
      description: t.category_outdoor_desc,
      products: "PVDF, FIBER 9X42, ULTRA ONE",
      productsMore: "dan 5 lagi \u2192",
      cta: t.category_outdoor_cta,
      href: "/water-purifier",
      dark: false,
      image: "/images/products/ultra-one/main.jpg",
      imageAlt: "AIHAA Ultra One",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — editorial centered */}
        <div className="text-center mb-20 scroll-reveal-child stagger-1">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold mb-4">
            {t.category_title}
          </p>
          <h2 className="font-editorial text-4xl md:text-5xl text-dark mb-4">
            {t.category_heading}
          </h2>
          <p className="text-muted text-[14px] leading-relaxed max-w-xl mx-auto">
            {t.category_subtitle}
          </p>
        </div>

        {/* Category Cards — stacked full-width */}
        <div className="space-y-8">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className={`scroll-reveal-child stagger-${index + 2} group relative block rounded-3xl overflow-hidden card-hover border-l-[3px] border-l-gold ${
                cat.dark
                  ? "bg-[#1A1A1A] border border-[rgba(218,165,32,0.15)] border-l-[3px] border-l-gold"
                  : "bg-surface border border-[rgba(0,0,0,0.06)] border-l-[3px] border-l-gold"
              }`}
            >
              {/* Background pattern */}
              {cat.dark && (
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(rgba(218, 165, 32, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(218, 165, 32, 0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                  }}
                />
              )}

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                {/* Editorial watermark numeral */}
                <span
                  className="font-editorial pointer-events-none select-none"
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "24px",
                    fontSize: "clamp(100px, 12vw, 160px)",
                    lineHeight: 1,
                    fontWeight: 400,
                    color: cat.dark ? "rgba(218,165,32,0.12)" : "rgba(218,165,32,0.18)",
                    zIndex: 1,
                  }}
                  aria-hidden
                >
                  {cat.number}
                </span>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
                  {/* Left content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          cat.dark ? "bg-white/5" : "bg-white"
                        } shadow-sm`}
                      >
                        <cat.icon className="w-5 h-5 text-gold" />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p
                      className={`text-[10px] uppercase tracking-[0.22em] font-semibold mb-3 ${
                        cat.dark ? "text-gold" : "text-gold-dark"
                      }`}
                    >
                      {cat.subtitle}
                    </p>

                    {/* Title — editorial serif */}
                    <h3
                      className={`font-editorial text-3xl lg:text-4xl mb-5 ${
                        cat.dark ? "text-white" : "text-dark"
                      }`}
                    >
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-base lg:text-lg leading-relaxed max-w-xl ${
                        cat.dark ? "text-muted-dark" : "text-muted"
                      }`}
                    >
                      {cat.description}
                    </p>

                    {/* Product preview */}
                    <p className={`text-xs mt-3 ${cat.dark ? "text-gray-500" : "text-gray-400"}`}>
                      {cat.products} <span className="text-[#DAA520]">{cat.productsMore}</span>
                    </p>
                  </div>

                  {/* Right — product image + CTA */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-2xl overflow-hidden border border-[rgba(218,165,32,0.15)]">
                      <Image
                        src={cat.image}
                        alt={cat.imageAlt}
                        fill
                        className="object-contain p-2"
                        sizes="176px"
                      />
                    </div>
                    <span
                      className={`inline-flex items-center gap-3 font-semibold text-lg group-hover:gap-5 transition-all ${
                        cat.dark ? "text-gold" : "text-gold-dark"
                      }`}
                    >
                      {cat.cta}
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

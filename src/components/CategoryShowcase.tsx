"use client";

import Link from "next/link";
import Image from "next/image";
import { Droplets, TreePine } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = [
  {
    number: "01",
    icon: Droplets,
    title: "Penapis Air Dalam Rumah",
    subtitle: "Untuk keluarga anda",
    description:
      "5 model penapis air dalam rumah dengan teknologi 4 tahap penapisan, mineral alkali, dan rekaan kompak untuk dapur moden. Dari RM780.",
    href: "/water-purifier",
    dark: true,
    image: "/images/products/bella/main.jpg",
    imageAlt: "AIHAA Bella — penapis air dalam rumah",
  },
  {
    number: "02",
    icon: TreePine,
    title: "Penapis Air Luar Rumah",
    subtitle: "Perlindungan menyeluruh",
    description:
      "8 model penapis air luar rumah termasuk sistem fiber, PVDF profesional, dan penapis air boring. Dari RM399.",
    href: "/water-purifier",
    dark: false,
    image: "/images/products/ultra-one/main.jpg",
    imageAlt: "AIHAA Ultra One — penapis air luar rumah",
  },
];

export default function CategoryShowcase() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-t-[rgba(0,0,0,0.06)]">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal-child stagger-1">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            Koleksi Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">
            Pilih <span className="gold-gradient-text">Kategori</span> Anda
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Penapis air untuk setiap keperluan — dari dapur rumah anda hingga ke seluruh rumah
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
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  {/* Left content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      {/* Number */}
                      <span
                        className={`text-6xl lg:text-8xl font-bold leading-none ${
                          cat.dark
                            ? "text-white/20"
                            : "text-dark/10"
                        }`}
                      >
                        {cat.number}
                      </span>
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          cat.dark ? "bg-gold/10" : "bg-gold/10"
                        }`}
                      >
                        <cat.icon className="w-7 h-7 text-gold" />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p
                      className={`text-sm font-medium mb-2 ${
                        cat.dark ? "text-gold" : "text-gold-dark"
                      }`}
                    >
                      {cat.subtitle}
                    </p>

                    {/* Title */}
                    <h3
                      className={`text-3xl lg:text-4xl font-bold mb-4 ${
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
                      Lihat Koleksi
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

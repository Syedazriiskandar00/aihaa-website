"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const indoorProducts = [
  { id: "aihaa-bella", name: "AIHAA BELLA", tagline: "Rekaan Kompak Stand Floor", price: "RM1,080", image: "/images/products/bella/main.jpg" },
  { id: "aihaa-big", name: "AIHAA BIG", tagline: "Kapasiti Besar 17 Liter", price: "RM1,280", image: "/images/products/big/main.jpg", badge: "popular" as const },
  { id: "aihaa-ean", name: "AIHAA EAN", tagline: "Pilihan Bajet dengan Digital Feature", price: "RM780", oldPrice: "RM867", image: "/images/products/ean/main.png", badge: "sale" as const },
  { id: "aihaa-fancy", name: "AIHAA FANCY", tagline: "Rekaan Slim Moden dengan 3 Tangki", price: "RM999", image: "/images/products/fancy/main.jpg" },
  { id: "aihaa-winter", name: "AIHAA WINTER", tagline: "Premium dengan Ice Maker & Teknologi Baru", price: "RM1,580", image: "/images/products/winter/main.png", badge: "premium" as const },
];

const outdoorProducts = [
  { id: "ultra-one", name: "ULTRA ONE", tagline: "All-in-One Direct Minum", price: "RM399", image: "/images/products/ultra-one/main.jpg", badge: "best-value" as const },
  { id: "fiber-9x42", name: "FIBER 9X42", tagline: "Tangki Fiber Tahan Lasak", price: "RM399", image: "/images/products/fiber/main.jpg" },
  { id: "fiber-10x44", name: "FIBER 10X44", tagline: "Tangki Fiber Besar 10x44", price: "RM469", image: "/images/products/fiber-10x44/main.png" },
  { id: "penapis-boring-13x54", name: "PENAPIS BORING 13X54", tagline: "Khas Untuk Air Bawah Tanah", price: "RM1,180", image: "/images/products/penapis-boring/main.jpg" },
  { id: "pvdf", name: "PVDF", tagline: "Material PVDF Gred Profesional", price: "RM899", image: "/images/products/pvdf/main.jpg", badge: "pro-grade" as const },
  { id: "pvdf-plus", name: "PVDF PLUS", tagline: "PVDF Dipertingkat 6000L/Hour", price: "RM1,299", image: "/images/products/pvdf-plus/main.jpg", badge: "premium" as const },
  { id: "super-pleated", name: "SUPER PLEATED", tagline: "Kadar Aliran Tinggi & Kompak", price: "RM580", image: "/images/products/super-pleated/main.jpg" },
  { id: "uf-double-backwash", name: "UF DOUBLE BACKWASH", tagline: "Membran UF dengan Dual Backwash", price: "RM799", oldPrice: "RM888", image: "/images/products/uf-double-backwash/main.jpg", badge: "sale" as const },
];

export default function WaterPurifierPage() {
  const featuredRef = useScrollReveal();
  const indoorRef = useScrollReveal();
  const outdoorRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── Hero Banner ── */}
      <section className="relative pt-20 pb-16 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)] mb-4">
              {t.product_hero_badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.product_hero_title} <span className="gold-gradient-text">AIHAA</span>
            </h1>
            <p className="text-muted-dark text-lg max-w-2xl mx-auto">
              {t.product_hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Product Showcase ── */}
      <section className="bg-white py-16 lg:py-20">
        <div ref={featuredRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFFDE7] scroll-reveal-child stagger-1">
              <Image
                src="/images/products/bella/poster.jpg"
                alt="AIHAA BELLA — Penapis Air Paling Popular"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Info */}
            <div className="scroll-reveal-child stagger-2">
              <span className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                {t.product_featured_label}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-3 mb-3">
                AIHAA BELLA
              </h2>
              <p className="text-muted mb-4">
                Rekaan kompak stand floor dengan 4 tahap penapisan dan teknologi mineral alkali. Kapasiti tangki 9.5 liter — sesuai untuk keluarga.
              </p>
              <p className="text-gold-dark text-2xl font-semibold mb-6">RM1,080</p>
              <Link
                href="/product/aihaa-bella"
                className="text-gold font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                {t.product_featured_cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sekali Bayar Statement ── */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-playfair italic text-lg md:text-xl text-dark/70">
            {t.product_statement}
          </p>
          <div className="w-10 h-px bg-[#DAA520] mx-auto mt-6" />
        </div>
      </section>

      {/* ── Indoor Section ── */}
      <section id="indoor" className="scroll-mt-24 bg-white py-16 lg:py-20">
        <div ref={indoorRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 scroll-reveal-child stagger-1">
            <span className="text-gold text-[10px] font-medium uppercase tracking-[0.2em]">
              {t.product_indoor_label}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-2">
              {t.product_indoor_title}
            </h2>
            <p className="text-muted text-sm max-w-lg">
              {t.product_indoor_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {indoorProducts.map((product, i) => (
              <div key={product.id} className={`scroll-reveal-child stagger-${Math.min(i + 2, 8)}`}>
                <ProductCard {...product} />
              </div>
            ))}

            {/* CTA Card — fills grid */}
            <div className="scroll-reveal-child stagger-7 bg-[#0D0D0D] border border-[#DAA520] rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:-translate-y-1 transition-all duration-300">
              <svg className="w-8 h-8 text-[#DAA520] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-white mb-1">{t.product_cta_title}</p>
              <p className="text-[#999] text-sm mb-4">{t.product_cta_sub}</p>
              <a
                href="https://wa.me/60115657084?text=Hai,%20saya%20nak%20tanya%20penapis%20air%20mana%20yang%20sesuai%20untuk%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#DAA520] text-[#0D0D0D] px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
              >
                WhatsApp Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual Break ── */}
      <div
        className="h-[120px] flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, #FFFDE7)" }}
      >
        <div className="w-20 h-px bg-[rgba(218,165,32,0.3)]" />
        <span className="text-gold text-[10px] font-medium uppercase tracking-[0.3em] mt-4">
          {t.product_outdoor_label}
        </span>
      </div>

      {/* ── Outdoor Section ── */}
      <section id="outdoor" className="scroll-mt-24 bg-surface py-16 lg:py-20">
        <div ref={outdoorRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 scroll-reveal-child stagger-1">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-2">
              {t.product_outdoor_title}
            </h2>
            <p className="text-muted text-sm max-w-lg">
              {t.product_outdoor_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {outdoorProducts.map((product, i) => (
              <div key={product.id} className={`scroll-reveal-child stagger-${Math.min(i + 2, 8)}`}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

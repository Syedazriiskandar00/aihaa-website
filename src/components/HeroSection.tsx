"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[700px] bg-dark overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dark-alt rounded-full blur-3xl opacity-50" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(218, 165, 32, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(218, 165, 32, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4 hero-entrance hero-entrance-1">
              <span className="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)]">
                Sekali Bayar Tanpa Bulanan
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 hero-entrance hero-entrance-1">
              Penapis Air
              <br />
              <span className="gold-gradient-text">Sekali Bayar</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Tanpa Komitmen Bulanan</span>
            </h1>

            <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-6 hero-entrance hero-entrance-2">
              <span className="text-gold text-5xl md:text-6xl font-bold">Dari</span>
              <div className="flex items-baseline gap-1">
                <span className="text-gold text-7xl md:text-8xl font-bold">RM399</span>
              </div>
            </div>

            <p className="text-muted-dark text-lg mb-8 max-w-md mx-auto lg:mx-0 hero-entrance hero-entrance-2">
              Penapis air berkualiti tinggi untuk rumah anda.
              Termasuk pemasangan percuma dan waranti sehingga 2 tahun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start hero-entrance hero-entrance-3">
              <Link
                href="/water-purifier"
                className="gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:shadow-gold inline-block text-center btn-shimmer"
              >
                Lihat Produk
              </Link>
              <Link
                href="/promotions"
                className="border-2 border-gold text-gold px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold hover:text-white transition-all inline-block text-center"
              >
                Lihat Promosi
              </Link>
            </div>
          </div>

          {/* Right Content - Poster Placeholder */}
          <div className="relative hero-entrance hero-entrance-2">
            <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-[rgba(218,165,32,0.3)] bg-[#1A1A1A] flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[rgba(218,165,32,0.2)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[#555] text-sm font-medium tracking-wider uppercase">
                Hero Poster Coming Soon
              </p>
              <p className="text-[#444] text-xs">
                Graphic designer akan letak poster di sini
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave - transitions to light section */}
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

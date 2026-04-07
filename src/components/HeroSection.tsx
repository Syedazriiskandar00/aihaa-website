"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[700px] bg-navy-primary overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-secondary rounded-full blur-3xl opacity-50" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 67, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-gold/30">
                Limited Time Offer
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Trade-In Your
              <br />
              <span className="gold-gradient-text">Old Water Purifier</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">& Get Up To</span>
            </h1>

            <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-6">
              <span className="text-gold text-7xl md:text-8xl font-bold">50</span>
              <div className="flex flex-col">
                <span className="text-gold text-3xl font-bold">%</span>
                <span className="text-gold text-2xl font-bold">OFF</span>
              </div>
            </div>

            <p className="text-muted text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Experience pure, clean water with AIHAA's advanced filtration technology.
              Free installation & 7 years maintenance included.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/water-purifier"
                className="gold-gradient-bg text-navy-primary px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:shadow-gold inline-block text-center"
              >
                Explore Products
              </Link>
              <Link
                href="/promotions"
                className="border-2 border-gold text-gold px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold hover:text-navy-primary transition-all inline-block text-center"
              >
                View Promotions
              </Link>
            </div>
          </div>

          {/* Right Content - Product Display */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent rounded-full blur-3xl" />

            {/* Product Placeholder */}
            <div className="relative bg-navy-secondary/50 backdrop-blur-sm rounded-3xl p-8 border border-gold/20 overflow-hidden">
              {/* Background gradient */}
              <div
                className="aspect-square bg-gradient-to-br from-[#0D1E35] via-navy-secondary to-[#152A4A] rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(135deg, #0D1E35, #0F1F3A, #152A4A)` }}
              >
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 67, 0.1) 1px, transparent 1px)`,
                    backgroundSize: "25px 25px",
                  }}
                />

                {/* Accent glows */}
                <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gold opacity-10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gold-light opacity-5 rounded-full blur-2xl" />

                {/* Water Purifier Silhouette */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-40 h-56 bg-gradient-to-b from-white/15 to-white/5 rounded-xl border border-gold/30 backdrop-blur-sm relative overflow-hidden shadow-2xl">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                    {/* Display */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-10 bg-navy-primary/70 rounded-lg border border-gold/30 flex items-center justify-center">
                      <span className="text-gold font-mono text-lg">25°C</span>
                    </div>

                    {/* Buttons */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-3">
                      <div className="w-3 h-3 rounded-full bg-gold shadow-lg shadow-gold/50" />
                      <div className="w-3 h-3 rounded-full bg-white/20" />
                      <div className="w-3 h-3 rounded-full bg-white/20" />
                    </div>

                    {/* Dispenser */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-20 h-20 bg-navy-primary/40 rounded-lg border border-gold/20">
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-gold/30 rounded-full" />
                    </div>

                    {/* Side accent */}
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
                  </div>

                  {/* Product Label */}
                  <div className="mt-6 px-6 py-3 bg-navy-primary/70 backdrop-blur-sm rounded-xl border border-gold/40">
                    <span className="text-gold font-bold text-lg tracking-wider">VILLAEM III</span>
                  </div>
                </div>

                {/* Decorative water drops */}
                <div className="absolute top-10 right-10 w-3 h-4 bg-gold/30 rounded-full animate-float" />
                <div className="absolute bottom-20 left-10 w-2 h-3 bg-gold/20 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-1/2 right-16 w-2.5 h-3.5 bg-gold/25 rounded-full animate-float" style={{ animationDelay: "1s" }} />
              </div>

              {/* Product Badge */}
              <div className="absolute -top-3 -right-3 bg-gold text-navy-primary px-4 py-2 rounded-full font-bold text-sm shadow-gold">
                BESTSELLER
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#0F1F3A"
          />
        </svg>
      </div>
    </section>
  );
}

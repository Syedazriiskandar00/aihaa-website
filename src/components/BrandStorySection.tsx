"use client";

import { Shield, Droplets, Users, Wallet } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BrandStorySection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-16 lg:py-24 border-t border-t-[rgba(0,0,0,0.06)]">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal-child stagger-1">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            Kenapa AIHAA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">
            Kelebihan <span className="gold-gradient-text">AIHAA</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Bukan sekadar penapis air — AIHAA adalah pilihan keluarga Malaysia yang bijak
          </p>
        </div>

        {/* Bento Grid — Row 1: 60/40 | Row 2: 40/60 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-6">

          {/* Card 1 — HALAL & BUMIPUTERA (60% width, dark, tall) */}
          <div
            className="scroll-reveal-child stagger-2 relative md:col-span-3 rounded-[24px] p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,32,0.15)]"
            style={{ background: "linear-gradient(135deg, #1A1A1A, #222222)" }}
          >
            {/* Gold top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] gold-gradient-bg" />

            {/* Geometric pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
                backgroundSize: "60px 60px",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Large decorative shield */}
            <div className="absolute top-6 right-6 opacity-[0.06]">
              <Shield className="w-32 h-32 lg:w-40 lg:h-40 text-gold" />
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 border border-[rgba(218,165,32,0.2)]">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <p className="text-gold text-sm font-medium mb-2">Certified by JAKIM</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">HALAL & BUMIPUTERA</h3>
              <p className="text-muted-dark text-base leading-relaxed max-w-md">
                Setiap produk AIHAA telah mendapat pensijilan Halal dari JAKIM dan status Bumiputera. Jaminan kualiti untuk keluarga Muslim Malaysia.
              </p>
            </div>
          </div>

          {/* Card 2 — TEKNOLOGI 4 TAHAP (40% width, light) */}
          <div
            className="scroll-reveal-child stagger-3 relative md:col-span-2 rounded-[24px] p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            style={{ background: "linear-gradient(135deg, #F8F8F8, #F0F0F0)" }}
          >
            {/* Gold left accent */}
            <div className="absolute top-0 left-0 bottom-0 w-[3px] gold-gradient-bg" />

            {/* Layered filter visual */}
            <div className="absolute bottom-4 right-4 opacity-[0.06]">
              <Droplets className="w-28 h-28 lg:w-36 lg:h-36 text-gold-dark" />
            </div>

            {/* Subtle horizontal lines like filter layers */}
            <div className="absolute inset-0 opacity-[0.04]">
              {[20, 35, 50, 65].map((top) => (
                <div
                  key={top}
                  className="absolute left-0 right-0 h-px bg-gold-dark"
                  style={{ top: `${top}%` }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 border border-[rgba(218,165,32,0.15)]">
                <Droplets className="w-7 h-7 text-gold-dark" />
              </div>
              <p className="text-gold-dark text-sm font-medium mb-2">Kualiti Air Terjamin</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-4">TEKNOLOGI 4 TAHAP PENAPISAN</h3>
              <p className="text-muted text-base leading-relaxed">
                Sistem penapisan 4 tahap memastikan air anda bersih, selamat dan bermineral. Dari sedimen kasar hingga bakteria halus — semua ditapis.
              </p>
            </div>
          </div>

          {/* Card 3 — 10,000+ PELANGGAN (40% width, dark) */}
          <div
            className="scroll-reveal-child stagger-4 relative md:col-span-2 rounded-[24px] p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,32,0.15)]"
            style={{ background: "linear-gradient(135deg, #1C1917, #1A1A1A)" }}
          >
            {/* Gold bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] gold-gradient-bg" />

            {/* Large prominent number as background */}
            <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
              <span className="text-[80px] lg:text-[100px] font-bold leading-none text-white/[0.06] select-none">
                10K+
              </span>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-[rgba(218,165,32,0.2)]">
                <Users className="w-7 h-7 text-gold" />
              </div>
              <p className="text-gold text-sm font-medium mb-2">Seluruh Semenanjung Malaysia</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">10,000+ PELANGGAN</h3>
              <p className="text-muted-dark text-base leading-relaxed">
                Lebih 10,000 keluarga di seluruh Semenanjung Malaysia telah mempercayai AIHAA untuk air bersih di rumah mereka.
              </p>
            </div>
          </div>

          {/* Card 4 — SEKALI BAYAR (60% width, light) */}
          <div
            className="scroll-reveal-child stagger-5 relative md:col-span-3 rounded-[24px] p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            style={{ background: "linear-gradient(135deg, #F8F8F8, #EFEFEF)" }}
          >
            {/* Gold corner accent — top right triangle */}
            <div
              className="absolute top-0 right-0 w-24 h-24 opacity-10"
              style={{
                background: "linear-gradient(225deg, #DAA520 0%, transparent 70%)",
              }}
            />

            {/* RM symbol background */}
            <div className="absolute bottom-2 right-6 opacity-[0.04]">
              <span className="text-[100px] lg:text-[120px] font-bold leading-none text-dark select-none">
                RM
              </span>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 border border-[rgba(218,165,32,0.15)]">
                <Wallet className="w-7 h-7 text-gold-dark" />
              </div>
              <p className="text-gold-dark text-sm font-medium mb-2">Tanpa Komitmen Bulanan</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-4">SEKALI BAYAR</h3>
              <p className="text-muted text-base leading-relaxed max-w-md">
                Berbeza dengan jenama lain yang kenakan bayaran bulanan, AIHAA hanya perlu bayar sekali. Jimat dalam jangka panjang.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

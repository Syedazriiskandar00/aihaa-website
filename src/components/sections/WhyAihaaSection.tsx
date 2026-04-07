"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ──────────────────────────────────────────────
   SUB-SECTION 1: FOUNDER STORY
   Split layout — portrait left, quote right
   Dark bg, generous breathing room
   ────────────────────────────────────────────── */

function FounderStory() {
  const ref = useScrollReveal();

  return (
    <section className="bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]"
        >
          {/* Left — Portrait image */}
          <div className="relative min-h-[420px] lg:min-h-0 scroll-reveal-child stagger-1">
            <Image
              src="/images/products/sales-expert.png"
              alt="Pengasas AIHAA"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Bottom fade on mobile, right fade on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0D0D0D]" />
          </div>

          {/* Right — Quote */}
          <div className="relative flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-32 scroll-reveal-child stagger-2">
            {/* Label */}
            <p className="text-xs tracking-[0.2em] uppercase text-[#DAA520] mb-10">
              Kisah Kami
            </p>

            {/* Decorative quote mark */}
            <span
              className="absolute top-12 lg:top-20 right-8 lg:right-16 text-[140px] leading-none font-playfair text-[#DAA520] opacity-[0.08] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Quote */}
            <blockquote className="relative">
              <p className="text-xl lg:text-2xl xl:text-[1.7rem] text-white font-playfair italic leading-relaxed max-w-lg">
                Pada 2018, saya perasan ramai keluarga Malaysia menghadapi
                masalah yang sama — harga penapis air terlalu mahal dengan
                kontrak yang membebankan. Anak-anak saya sendiri pernah
                mengalami masalah kesihatan akibat kualiti air yang kurang baik.
                Dari situlah idea Aihaa lahir.
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-10">
              <p className="text-sm font-medium text-[#DAA520]">
                Pengasas AIHAA
              </p>
              <p className="text-xs text-[#999] mt-1">
                12+ tahun dalam industri penapis air
              </p>
            </div>

            {/* Timeline strip — small, supporting */}
            <div className="mt-14 pt-8 border-t border-white/[0.06]">
              <div className="flex items-center gap-6 lg:gap-10 text-xs text-[#777] overflow-x-auto">
                {[
                  { year: "2018", label: "100 unit" },
                  { year: "2020", label: "2,500+" },
                  { year: "2023", label: "7,000+" },
                  { year: "2025", label: "10,800+" },
                ].map((m, i) => (
                  <div key={m.year} className="flex items-center gap-6">
                    {i > 0 && <div className="w-8 h-px bg-white/10" />}
                    <div className="flex-shrink-0">
                      <span
                        className={`block font-semibold ${
                          i === 3 ? "text-[#DAA520]" : "text-white/60"
                        }`}
                      >
                        {m.year}
                      </span>
                      <span className="block mt-0.5">{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SUB-SECTION 2: BEZA KAMI — Honest comparison
   White bg, stacked rows, one big number
   ────────────────────────────────────────────── */

const comparisons = [
  {
    feature: "BAYARAN",
    aihaa: "Sekali bayar",
    other: "Bulanan 3-5 tahun",
    aihaaBetter: true,
  },
  {
    feature: "KONTRAK",
    aihaa: "Tiada kontrak",
    other: "Kontrak mengikat",
    aihaaBetter: true,
  },
  {
    feature: "HARGA",
    aihaa: "30-40% lebih jimat",
    other: "Premium pricing",
    aihaaBetter: true,
  },
  {
    feature: "RESPONSE",
    aihaa: "24 jam WhatsApp",
    other: "Hotline / service center",
    aihaaBetter: true,
  },
  {
    feature: "PEMASANGAN",
    aihaa: "Percuma",
    other: "Ada caj",
    aihaaBetter: true,
  },
  {
    feature: "CAJ TERSEMBUNYI",
    aihaa: "Tiada",
    other: "Ada",
    aihaaBetter: true,
  },
  {
    feature: "RANGKAIAN SERVICE CENTER",
    aihaa: "Online & mobile technician",
    other: "Ada kedai fizikal",
    aihaaBetter: false,
  },
];

function BezaKami() {
  const ref = useScrollReveal();

  return (
    <section className="bg-white py-28 lg:py-36">
      <div ref={ref} className="scroll-reveal max-w-7xl mx-auto px-10 lg:pl-10 lg:pr-20">
        {/* Gold accent line */}
        <div className="w-12 h-[2px] bg-[#DAA520] mb-10 scroll-reveal-child stagger-1" />

        <p className="text-xs tracking-[0.2em] uppercase text-[#DAA520] mb-4 scroll-reveal-child stagger-1">
          Beza Kami
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-6 scroll-reveal-child stagger-1">
          Kenapa bukan brand lain?
        </h2>

        {/* Highlight: 30-40% inline */}
        <div className="flex items-baseline gap-3 mb-7 scroll-reveal-child stagger-2">
          <span className="text-[42px] font-bold text-[#DAA520] leading-none">
            30-40%
          </span>
          <span className="text-[15px] text-[#B8860B]">
            lebih jimat dari brand lain
          </span>
        </div>

        {/* Comparison rows — full width, capped at 85% */}
        <div className="max-w-[85%]">
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              className={`scroll-reveal-child stagger-${Math.min(
                i + 3,
                8
              )} py-5 border-b border-[#0D0D0D]/[0.06]`}
            >
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#999] mb-2">
                {row.feature}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className="text-base font-semibold text-[#0D0D0D] flex items-center gap-2">
                  {row.aihaaBetter && (
                    <span className="text-[#DAA520] text-sm">✓</span>
                  )}
                  {row.aihaa}
                </p>
                <p
                  className={`text-sm ${
                    row.aihaaBetter
                      ? "text-[#999] line-through"
                      : "text-[#555] flex items-center gap-2"
                  }`}
                >
                  {!row.aihaaBetter && (
                    <span className="text-green-600 text-sm">✓</span>
                  )}
                  {row.other}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SUB-SECTION 3: SOCIAL PROOF
   Part A: Testimonials (varied sizes/alignments)
   Part B: Impact strip (dark, floating numbers)
   ────────────────────────────────────────────── */

function SocialProof() {
  const testiRef = useScrollReveal();
  const impactRef = useScrollReveal();

  return (
    <>
      {/* Part A — Testimonials on white */}
      <section className="bg-white py-28 lg:py-36 overflow-hidden">
        <div
          ref={testiRef}
          className="scroll-reveal max-w-7xl mx-auto px-8 lg:px-16"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#717171] mb-20 scroll-reveal-child stagger-1">
            Suara Pelanggan
          </p>

          {/* Testimonial 1 — LARGE, full width, serif, gold left border */}
          <div className="scroll-reveal-child stagger-2 relative max-w-3xl border-l-[3px] border-l-[#DAA520] pl-8 lg:pl-12 mb-24">
            <span
              className="absolute -top-8 -left-4 text-[200px] leading-none font-playfair text-[#0D0D0D] opacity-[0.03] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="relative text-xl lg:text-2xl text-[#0D0D0D] font-playfair italic leading-relaxed">
              Sebelum guna Aihaa, kami spend RM200 sebulan untuk air botol.
              Sekarang jimat lebih RM2,000 setahun! Yang paling penting,
              anak-anak tak sakit perut macam dulu.
            </p>
            <p className="mt-6 text-sm text-[#717171]">
              Encik Rizal Abdullah · Shah Alam, Selangor
            </p>
          </div>

          {/* Testimonial 2 — MEDIUM, right aligned, surface bg */}
          <div className="scroll-reveal-child stagger-3 max-w-2xl ml-auto mb-24">
            <div className="bg-[#F5F5F5] rounded-2xl p-8 lg:p-10">
              <p className="text-base text-[#0D0D0D] leading-relaxed">
                Saya compare 5 jenama sebelum pilih Aihaa. Harga paling
                transparent, servis paling responsive. Bila ada issue, team
                datang dalam masa 24 jam.
              </p>
              <p className="mt-4 text-sm text-[#717171]">
                Puan Farah · Johor Bahru
              </p>
            </div>
          </div>

          {/* Testimonial 3 — SMALL, left aligned, bare text */}
          <div className="scroll-reveal-child stagger-4 max-w-md">
            <p className="text-sm italic text-[#333] leading-relaxed">
              Sebagai doktor, saya sangat prihatin tentang kualiti air. Aihaa
              memenuhi standard yang saya perlukan.
            </p>
            <p className="mt-3 text-xs text-[#999]">
              Dr. Ahmad Faisal · Petaling Jaya
            </p>
          </div>
        </div>
      </section>

      {/* Part B — Impact strip on dark */}
      <section className="bg-[#0D0D0D] py-20 lg:py-28">
        <div
          ref={impactRef}
          className="scroll-reveal max-w-5xl mx-auto px-8 lg:px-16 text-center"
        >
          {/* Stats row — 2x2 mobile, 4x1 desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
            {[
              { number: "10,800+", label: "keluarga mempercayai AIHAA" },
              { number: "1.5 Juta", label: "botol plastik dikurangkan*" },
              { number: "50", label: "unit untuk sekolah B40/tahun" },
              { number: "Semenanjung", label: "seluruh Malaysia" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center scroll-reveal-child stagger-${i + 1} ${
                  i > 0 ? "sm:border-l sm:border-[rgba(218,165,32,0.15)]" : ""
                }`}
              >
                <span className="block text-3xl lg:text-4xl font-bold text-[#DAA520]">
                  {stat.number}
                </span>
                <span className="block text-xs text-[#777] mt-2 max-w-[140px] mx-auto">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="text-[10px] text-[#555] mt-12">
            *Anggaran berdasarkan purata penggunaan air botol per keluarga
          </p>

          {/* Single CTA — the ONLY one in entire WhyAihaa section */}
          <div className="mt-14 scroll-reveal-child stagger-5">
            <a
              href="https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20penapis%20air%20AIHAA.%20Boleh%20saya%20tahu%20lebih%20lanjut?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
            >
              WhatsApp Kami — Reply Dalam 5 Minit
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────── */

export default function WhyAihaaSection() {
  return (
    <>
      <FounderStory />
      <BezaKami />
      <SocialProof />
    </>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const termsAndConditions = [
  {
    title: "Terma Am",
    content:
      "Promosi tertakluk kepada stok yang ada. AIHAA berhak mengubah terma promosi tanpa notis awal.",
  },
  {
    title: "Pemasangan Percuma",
    content:
      "Pemasangan percuma hanya untuk Semenanjung Malaysia. Kawasan luar liputan mungkin dikenakan caj tambahan.",
  },
  {
    title: "Waranti",
    content:
      "Waranti tidak meliputi kerosakan akibat kecuaian pengguna. Waranti sehingga 2 tahun untuk model indoor, 1 tahun untuk outdoor.",
  },
  {
    title: "Trade-In",
    content:
      "Trade-in tertakluk kepada penilaian kondisi unit lama oleh teknisyen AIHAA. Diskaun bergantung kepada jenama dan keadaan unit.",
  },
  {
    title: "Pertanyaan",
    content:
      "Untuk sebarang pertanyaan mengenai promosi, hubungi WhatsApp +6011-5657 7084.",
  },
];

export default function PromotionsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const heroRef = useScrollReveal();
  const mainRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── SECTION 1: Page Header (compact, dark) ── */}
      <section className="bg-[#0D0D0D] pt-28 pb-16">
        <div ref={heroRef} className="scroll-reveal max-w-3xl mx-auto px-4 text-center">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.3em] uppercase text-[#DAA520] mb-4">
            Promosi
          </p>
          <h1 className="scroll-reveal-child stagger-2 text-3xl md:text-4xl font-bold text-white mb-3">
            Tawaran Istimewa AIHAA
          </h1>
          <p className="scroll-reveal-child stagger-3 text-sm italic text-[#999]">
            Sementara stok masih ada
          </p>
        </div>
      </section>

      {/* ── SECTION 2: Promo Utama (centered, full impact) ── */}
      <section className="bg-[#FFFDE7] py-20 lg:py-24">
        <div ref={mainRef} className="scroll-reveal max-w-2xl mx-auto px-6 text-center">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.3em] uppercase text-[#DAA520] mb-6">
            Promosi Utama
          </p>
          <h2 className="scroll-reveal-child stagger-2 text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-4 leading-tight">
            Sekali Bayar. Selamanya Milik Anda.
          </h2>
          <div className="w-14 h-px bg-[#DAA520] mx-auto mb-6" />
          <p className="scroll-reveal-child stagger-3 text-base text-[#555] leading-[1.8] mb-8">
            Setiap pembelian penapis air AIHAA termasuk pemasangan percuma oleh
            teknisyen bertauliah dan waranti sehingga 2 tahun. Tiada caj
            tersembunyi. Tiada kontrak. Bayar sekali, guna bertahun-tahun.
          </p>
          <p className="scroll-reveal-child stagger-4 text-2xl md:text-3xl font-bold text-[#DAA520] mb-8">
            Dari RM399
          </p>
          <div className="scroll-reveal-child stagger-5">
            <a
              href="https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20promosi%20AIHAA.%20Boleh%20saya%20tahu%20lebih%20lanjut?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
            >
              WhatsApp Sekarang — Reply Dalam 5 Minit
            </a>
          </div>
          <p className="scroll-reveal-child stagger-6 mt-4">
            <a
              href="/water-purifier"
              className="text-[13px] text-[#DAA520] hover:underline"
            >
              atau lihat semua produk →
            </a>
          </p>
        </div>
      </section>

      {/* ── SECTION 3: Three promo cards (horizontal row) ── */}
      <section className="bg-white py-16 lg:py-20 overflow-hidden">
        <div ref={cardsRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">

            {/* Card 1 — Trade-In (DARK) */}
            <div className="scroll-reveal-child stagger-1 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start bg-[#0D0D0D] rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <div>
                <span className="inline-block text-[11px] text-[#DAA520] border border-[rgba(218,165,32,0.3)] rounded-full px-3 py-1 mb-5">
                  TERHAD
                </span>
                <h3 className="text-[22px] font-bold text-white mb-2">
                  Trade-In Jenama Lain
                </h3>
                <p className="text-sm text-[#999] leading-relaxed">
                  Tukar penapis air jenama lain kepada AIHAA. Diskaun istimewa
                  menanti.
                </p>
              </div>
              <a
                href="https://wa.me/60115657084?text=Hai,%20saya%20nak%20tanya%20tentang%20trade-in%20penapis%20air."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DAA520] text-sm font-medium mt-6 hover:underline inline-block"
              >
                Tanya Harga Trade-In →
              </a>
            </div>

            {/* Card 2 — Pakej Bundle (WHITE) */}
            <div className="scroll-reveal-child stagger-2 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start bg-white border border-[rgba(218,165,32,0.15)] rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,32,0.1)]">
              <div>
                <span className="inline-block text-[11px] text-white bg-[#DAA520] rounded-full px-3 py-1 mb-5 font-medium">
                  JIMAT
                </span>
                <h3 className="text-[22px] font-bold text-[#0D0D0D] mb-2">
                  Pakej Dalam + Luar
                </h3>
                <p className="text-sm text-[#717171] leading-relaxed mb-3">
                  Beli kedua-dua sekali dan jimat lagi. Pakej bermula dari RM799.
                </p>
                <p className="text-lg font-bold text-[#DAA520]">Dari RM799</p>
              </div>
              <a
                href="https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20pakej%20dalam%20dan%20luar%20rumah."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DAA520] text-sm font-medium mt-6 hover:underline inline-block"
              >
                Lihat Pakej →
              </a>
            </div>

            {/* Card 3 — Rujukan (YELLOW) */}
            <div className="scroll-reveal-child stagger-3 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start bg-[#FFFDE7] rounded-[20px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div>
                <span className="inline-block text-[11px] text-[#717171] border border-[rgba(0,0,0,0.1)] rounded-full px-3 py-1 mb-5">
                  PROGRAM
                </span>
                <h3 className="text-[22px] font-bold text-[#0D0D0D] mb-2">
                  Rujuk Kawan, Dapat Hadiah
                </h3>
                <p className="text-sm text-[#717171] leading-relaxed">
                  Setiap rujukan berjaya, anda dan kawan dapat hadiah istimewa.
                </p>
              </div>
              <a
                href="https://wa.me/60115657084?text=Hai,%20saya%20nak%20tahu%20tentang%20program%20rujukan%20AIHAA."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#717171] text-sm font-medium mt-6 hover:underline inline-block"
              >
                Ketahui Lebih Lanjut →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: T&C (footnote, compact) ── */}
      <section className="bg-white py-10">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="text-base text-[#999] mb-6">Terma & Syarat</h2>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {termsAndConditions.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === index ? null : index)
                  }
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="text-[13px] text-[#999]">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-4 h-4 text-[#ccc]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#ccc]" />
                  )}
                </button>
                {openAccordion === index && (
                  <div className="pb-3">
                    <p className="text-[13px] text-[#bbb] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                )}
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

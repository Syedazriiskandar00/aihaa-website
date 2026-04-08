"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "Adakah Aihaa guna parts dan filter original berkualiti?",
    a: "Ya. Semua filter dan komponen yang digunakan adalah original dan berkualiti tinggi. Kami tidak menggunakan parts tiruan atau gred rendah. Kualiti air yang dihasilkan memenuhi standard antarabangsa.",
  },
  {
    q: "Berapa lama warranty yang diberikan?",
    a: "Warranty sehingga 2 tahun untuk semua model indoor. Outdoor models mendapat warranty 1 tahun. Warranty meliputi semua komponen utama termasuk motor, tangki, dan sistem penapisan.",
  },
  {
    q: "Adakah pemasangan benar-benar percuma?",
    a: "Ya, pemasangan percuma ke seluruh Semenanjung Malaysia. Teknisyen bertauliah kami akan datang ke rumah anda untuk pemasangan. Tiada caj tersembunyi.",
  },
  {
    q: "Kenapa tiada kontrak jangka panjang?",
    a: "Kami percaya pelanggan tidak sepatutnya terikat dengan kontrak 3-5 tahun. Model sekali bayar bermaksud anda miliki penapis air anda sepenuhnya tanpa komitmen bulanan atau penalti penamatan.",
  },
  {
    q: "Macam mana saya tahu model mana yang sesuai untuk rumah saya?",
    a: "WhatsApp kami di +6011-5657 7084. Team kami akan tanya beberapa soalan tentang keperluan anda — sumber air, saiz keluarga, bajet — dan cadangkan model yang paling sesuai.",
  },
  {
    q: "Boleh ke tukar filter sendiri atau mesti guna technician?",
    a: "Boleh tukar sendiri. Kami sediakan panduan lengkap untuk setiap model. Kalau anda prefer technician, kami ada servis penukaran filter dengan caj minimum.",
  },
  {
    q: "Apa jaminan kualiti air yang dihasilkan?",
    a: "Semua model AIHAA menggunakan sistem penapisan 4 tahap yang menapis sedimen, klorin, bakteria, dan bahan cemar. Air yang dihasilkan memenuhi standard WHO untuk air minuman.",
  },
  {
    q: "Bagaimana Aihaa boleh respond dalam masa 24 jam?",
    a: "Kami ada team support yang dedicated melalui WhatsApp. Setiap pertanyaan dan aduan di-handle secara direct, bukan melalui call center. Ini membolehkan response time yang lebih pantas.",
  },
  {
    q: "Bagaimana kalau saya nak upgrade model di kemudian hari?",
    a: "Kami ada program trade-in. Anda boleh tukar model lama dengan model baru pada harga istimewa. WhatsApp kami untuk maklumat lanjut.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const heroRef = useScrollReveal();
  const topRef = useScrollReveal();
  const listRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── 1. HERO — Compact, left-aligned, confident ── */}
      <section className="bg-[#0D0D0D] pt-28 pb-14">
        <div ref={heroRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.25em] uppercase text-[#DAA520] mb-4">
            Soalan Lazim
          </p>
          <h1 className="scroll-reveal-child stagger-2 text-[28px] lg:text-[32px] font-bold text-white mb-3">
            Kami jawab sebelum anda tanya.
          </h1>
          <p className="scroll-reveal-child stagger-3 text-sm text-[#999]">
            10 soalan paling kerap ditanya tentang AIHAA.
          </p>
        </div>
      </section>

      {/* ── 2. TOP QUESTION — Always visible, highlighted ── */}
      <section className="bg-[#FFFDE7] py-12">
        <div ref={topRef} className="scroll-reveal max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.25em] uppercase text-[#DAA520] mb-5">
            Paling Kerap Ditanya
          </p>
          <h2 className="scroll-reveal-child stagger-2 text-[22px] font-bold text-[#0D0D0D] mb-5">
            Kenapa harga Aihaa lebih murah dari brand lain?
          </h2>
          <div className="scroll-reveal-child stagger-3 border-l-[3px] border-l-[#DAA520] pl-6">
            <p className="text-[15px] text-[#555] leading-[1.8]">
              Kami jual terus kepada pelanggan tanpa ejen perantara. Model sekali
              bayar bermaksud tiada markup untuk kontrak bulanan. Ini membolehkan
              kami tawarkan harga 30-40% lebih rendah dari brand lain dengan
              kualiti yang sama.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. REMAINING 9 FAQ — Clean accordion + inline CTA ── */}
      <section className="bg-white py-16">
        <div ref={listRef} className="scroll-reveal max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`scroll-reveal-child stagger-${Math.min(i + 1, 8)} border-b border-[rgba(0,0,0,0.04)]`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4 group hover:bg-[rgba(218,165,32,0.02)] transition-colors -mx-3 px-3 rounded-lg"
              >
                <span className="text-base font-medium text-[#0D0D0D] group-hover:text-[#333] transition-colors">
                  {faq.q}
                </span>
                <span
                  className="text-[#DAA520] text-sm flex-shrink-0 transition-transform duration-200"
                  style={{
                    transform: openIndex === i ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ›
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === i ? "400px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="text-[15px] text-[#717171] leading-[1.8] pb-6 pl-4 lg:pl-6 max-w-[90%]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}

          {/* Inline CTA — blends with FAQ list */}
          <div className="mt-8 bg-[rgba(218,165,32,0.04)] hover:bg-[rgba(218,165,32,0.08)] transition-colors rounded-xl py-6 px-4 lg:px-6">
            <p className="text-base font-medium text-[#0D0D0D] mb-1">
              Ada soalan lain?
            </p>
            <p className="text-sm text-[#717171] mb-3">
              WhatsApp kami — pakar kami reply dalam 5 minit.
            </p>
            <a
              href="https://wa.me/60115657084?text=Hai,%20saya%20ada%20soalan%20tentang%20penapis%20air%20AIHAA."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#DAA520] hover:underline"
            >
              Tanya Sekarang →
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

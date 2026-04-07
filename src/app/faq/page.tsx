"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const faqs = [
  {
    q: "Kenapa harga Aihaa lebih murah dari brand lain?",
    a: "Kami jual terus kepada pelanggan tanpa ejen perantara. Model sekali bayar bermaksud tiada markup untuk kontrak bulanan. Ini membolehkan kami tawarkan harga 30-40% lebih rendah dari brand lain dengan kualiti yang sama.",
  },
  {
    q: "Adakah Aihaa guna parts dan filter original berkualiti?",
    a: "Ya. Semua filter dan komponen yang digunakan adalah original dan berkualiti tinggi. Kami tidak menggunakan parts tiruan atau gred rendah. Kualiti air yang dihasilkan memenuhi standard antarabangsa.",
  },
  {
    q: "Berapa lama warranty yang diberikan?",
    a: "Warranty sehingga 2 tahun untuk semua model indoor. Outdoor models mendapat warranty 1 tahun. Warranty meliputi semua komponen utama termasuk motor, tangki, dan sistem penapisan.",
  },
  {
    q: "Kenapa tiada kontrak jangka panjang?",
    a: "Kami percaya pelanggan tidak sepatutnya terikat dengan kontrak 3-5 tahun. Model sekali bayar bermaksud anda miliki penapis air anda sepenuhnya tanpa komitmen bulanan atau penalti penamatan.",
  },
  {
    q: "Bagaimana Aihaa boleh respond dalam masa 24 jam?",
    a: "Kami ada team support yang dedicated melalui WhatsApp. Setiap pertanyaan dan aduan di-handle secara direct, bukan melalui call center. Ini membolehkan response time yang lebih pantas.",
  },
  {
    q: "Adakah pemasangan benar-benar percuma?",
    a: "Ya, pemasangan percuma ke seluruh Semenanjung Malaysia. Teknisyen bertauliah kami akan datang ke rumah anda untuk pemasangan. Tiada caj tersembunyi.",
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
    q: "Bagaimana kalau saya nak upgrade model di kemudian hari?",
    a: "Kami ada program trade-in. Anda boleh tukar model lama dengan model baru pada harga istimewa. WhatsApp kami untuk maklumat lanjut.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#0D0D0D]/[0.06]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left gap-4 group"
      >
        <span className="flex items-center gap-4">
          <span className="text-xs text-[#999] font-mono w-6 flex-shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base lg:text-lg font-semibold text-[#0D0D0D] group-hover:text-[#333] transition-colors">
            {faq.q}
          </span>
        </span>
        <span className="text-[#DAA520] text-xl font-light flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "300px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-[#717171] text-sm lg:text-base leading-relaxed pb-6 pl-10">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-[#0D0D0D] pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-[#DAA520] mb-4">
            Soalan Lazim
          </p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Soalan Lazim
          </h1>
          <p className="text-[#999] text-base lg:text-lg max-w-xl">
            Jawapan kepada soalan yang sering ditanya tentang AIHAA
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0D] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Masih ada soalan?
          </h2>
          <p className="text-[#999] text-base mb-8 max-w-md mx-auto">
            Team kami sedia membantu anda memilih penapis air yang sesuai.
          </p>
          <a
            href="https://wa.me/60115657084?text=Hai,%20saya%20ada%20soalan%20tentang%20penapis%20air%20AIHAA."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
          >
            WhatsApp Kami
          </a>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

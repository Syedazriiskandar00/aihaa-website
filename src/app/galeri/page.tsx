"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Category = "semua" | "dalam" | "luar";

const galleryItems = [
  { name: "Pemasangan 1", location: "Shah Alam, Selangor", category: "dalam" as const, label: "Rumah Pelanggan 1" },
  { name: "Pemasangan 2", location: "Johor Bahru, Johor", category: "dalam" as const, label: "Rumah Pelanggan 2" },
  { name: "Pemasangan 3", location: "Petaling Jaya, Selangor", category: "dalam" as const, label: "Rumah Pelanggan 3" },
  { name: "Pemasangan 4", location: "Klang, Selangor", category: "dalam" as const, label: "Rumah Pelanggan 4" },
  { name: "Pemasangan 5", location: "Melaka", category: "dalam" as const, label: "Rumah Pelanggan 5" },
  { name: "Pemasangan 6", location: "Seremban, N. Sembilan", category: "luar" as const, label: "Pemasangan 6" },
  { name: "Pemasangan 7", location: "Batu Pahat, Johor", category: "luar" as const, label: "Pemasangan 7" },
  { name: "Pemasangan 8", location: "Muar, Johor", category: "luar" as const, label: "Pemasangan 8" },
  { name: "Pemasangan 9", location: "Perak", category: "luar" as const, label: "Pemasangan 9" },
  { name: "Pemasangan 10", location: "Kedah", category: "luar" as const, label: "Rumah Pelanggan 10" },
  { name: "Pemasangan 11", location: "Pahang", category: "luar" as const, label: "Pemasangan 11" },
  { name: "Pemasangan 12", location: "Terengganu", category: "luar" as const, label: "Pemasangan 12" },
];

export default function GaleriPage() {
  const [activeTab, setActiveTab] = useState<Category>("semua");
  const { t } = useLanguage();

  const tabs: { label: string; value: Category }[] = [
    { label: t.gallery_filter_all, value: "semua" },
    { label: t.gallery_filter_indoor, value: "dalam" },
    { label: t.gallery_filter_outdoor, value: "luar" },
  ];

  const filtered =
    activeTab === "semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-[#0D0D0D] pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-[#DAA520] mb-4">
            {t.gallery_label}
          </p>
          <h1 className="font-editorial text-4xl lg:text-6xl text-white mb-4">
            {t.gallery_title}
          </h1>
          <p className="text-[#999] text-base lg:text-lg max-w-xl">
            {t.gallery_subtitle}
          </p>
        </div>
      </section>

      {/* Filter Tabs + Gallery */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.value
                    ? "gold-gradient-bg text-white shadow-gold"
                    : "bg-[#FFFDE7] text-[#717171] hover:bg-[#FFF9C4]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div
                key={item.name}
                className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] aspect-[4/3] flex flex-col items-center justify-center border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-all"
              >
                <svg className="w-8 h-8 text-white/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-white/50 text-sm font-medium">{item.label}</p>
                <p className="text-white/30 text-xs mt-1">{item.location}</p>
              </div>
            ))}
          </div>

          {/* Share CTA */}
          <div className="text-center py-8 mt-4">
            <p className="text-base font-semibold text-[#0D0D0D] mb-2">Hantar gambar pemasangan anda</p>
            <p className="text-sm text-[#717171] mb-4">Kongsi pengalaman anda dan dapatkan hadiah istimewa</p>
            <a
              href={`https://wa.me/60115657084?text=${encodeURIComponent("Hai, saya nak hantar gambar pemasangan AIHAA saya!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gold-gradient-bg text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
            >
              WhatsApp Gambar Anda
            </a>
          </div>

          {/* Featured Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Ahmad, Shah Alam", initial: "A", quote: "Dah 2 tahun guna, air masih sedap. Tak payah fikir pasal bayaran bulanan lagi." },
              { name: "Farah, Johor Bahru", initial: "F", quote: "Pasang dalam sejam, technician datang tepat masa. Sangat professional." },
              { name: "Rizal, Melaka", initial: "R", quote: "Jimat beribu berbanding rental. Patut beli awal-awal lagi." },
            ].map((testi) => (
              <div key={testi.name} className="bg-[#FFFDE7] rounded-2xl p-6 border border-[rgba(218,165,32,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#DAA520] flex items-center justify-center text-white font-bold text-sm">
                    {testi.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0D0D0D]">{testi.name}</p>
                    <p className="text-[#DAA520] text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                  </div>
                </div>
                <p className="text-sm text-[#555] leading-relaxed italic">&ldquo;{testi.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0D] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-editorial text-3xl lg:text-5xl text-white mb-3">
            {t.gallery_cta_title}
          </h2>
          <p className="text-[#999] text-base mb-8 max-w-md mx-auto">
            {t.gallery_cta_sub}
          </p>
          <a
            href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
          >
            {t.gallery_cta_button}
          </a>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

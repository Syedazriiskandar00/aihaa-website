"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

type Category = "semua" | "dalam" | "luar";

const galleryItems = [
  {
    src: "/images/products/bella/main.jpg",
    name: "AIHAA Bella",
    location: "Shah Alam, Selangor",
    category: "dalam" as const,
    tall: true,
  },
  {
    src: "/images/products/big/main.jpg",
    name: "AIHAA Big",
    location: "Johor Bahru, Johor",
    category: "dalam" as const,
    tall: false,
  },
  {
    src: "/images/products/ean/main.png",
    name: "AIHAA Ean",
    location: "Petaling Jaya, Selangor",
    category: "dalam" as const,
    tall: false,
  },
  {
    src: "/images/products/fancy/main.jpg",
    name: "AIHAA Fancy",
    location: "Klang, Selangor",
    category: "dalam" as const,
    tall: true,
  },
  {
    src: "/images/products/winter/main.png",
    name: "AIHAA Winter",
    location: "Melaka",
    category: "dalam" as const,
    tall: false,
  },
  {
    src: "/images/products/pvdf/main.jpg",
    name: "PVDF",
    location: "Batu Pahat, Johor",
    category: "luar" as const,
    tall: false,
  },
  {
    src: "/images/products/pvdf-plus/main.jpg",
    name: "PVDF Plus",
    location: "Muar, Johor",
    category: "luar" as const,
    tall: true,
  },
  {
    src: "/images/products/ultra-one/main.jpg",
    name: "Ultra One",
    location: "Seremban, N. Sembilan",
    category: "luar" as const,
    tall: false,
  },
  {
    src: "/images/products/fiber/main.jpg",
    name: "Fiber 9x42",
    location: "Perak",
    category: "luar" as const,
    tall: true,
  },
  {
    src: "/images/products/fiber-10x44/main.png",
    name: "Fiber 10x44",
    location: "Kedah",
    category: "luar" as const,
    tall: false,
  },
];

const tabs: { label: string; value: Category }[] = [
  { label: "Semua", value: "semua" },
  { label: "Dalam Rumah", value: "dalam" },
  { label: "Luar Rumah", value: "luar" },
];

export default function GaleriPage() {
  const [activeTab, setActiveTab] = useState<Category>("semua");

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
            Galeri
          </p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Galeri Pemasangan
          </h1>
          <p className="text-[#999] text-base lg:text-lg max-w-xl">
            Lihat sendiri pemasangan AIHAA di rumah pelanggan seluruh
            Semenanjung Malaysia
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

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item) => (
              <div
                key={item.src}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
              >
                <div
                  className={`relative w-full ${
                    item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={`${item.name} · Pemasangan di ${item.location}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/60 transition-all duration-300 flex items-end">
                    <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-semibold text-sm">
                        {item.name}
                      </p>
                      <p className="text-[#999] text-xs mt-1">
                        Pemasangan di {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D0D0D] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Nak tengok AIHAA di rumah anda?
          </h2>
          <p className="text-[#999] text-base mb-8 max-w-md mx-auto">
            WhatsApp kami untuk konsultasi percuma dan pemasangan.
          </p>
          <a
            href="https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20penapis%20air%20AIHAA.%20Boleh%20saya%20tahu%20lebih%20lanjut?"
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

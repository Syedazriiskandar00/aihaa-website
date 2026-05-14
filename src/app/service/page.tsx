import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import HeartServiceHero from "./components/HeartServiceHero";

export const metadata: Metadata = {
  title: "Servis Penapis Air AIHAA — Jadual, Harga & Titik Pemeriksaan",
  description:
    "Servis penyelenggaraan setiap 6 bulan untuk penapis air dalam (13 titik) dan luar (5 titik). Juruteknik terlatih. Harga telus RM160 ke atas.",
  openGraph: {
    title: "Servis Penapis Air AIHAA",
    description:
      "Penyelenggaraan 6 bulan sekali. 13 titik pemeriksaan indoor, 5 titik outdoor. Harga telus dari RM160.",
    type: "website",
    locale: "ms_MY",
  },
};

// Phase 8 — service detail body switched from 7 HTML cards/grids to 7
// designer-supplied banner images. HeartServiceHero stays as the only
// HTML section (story-first hero + 4 value pillars). All 7 service
// banners live at /public/images/service/ and render via plain <img>
// with natural aspect ratio (same pattern as Phase 7 product banners).
//
// Banner order (top → bottom):
//   1 indoor service header (filter penapis dalam)
//   2 13 check points
//   3 service price card (filter)
//   4 7-step procedure
//   5 outdoor sand types
//   6 5 check points
//   7 sand replacement price card

export default function ServicePage() {
  return (
    <>
      <Header />
      <main>
        <HeartServiceHero />

        {/* Indoor service banners */}
        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/filter-penapis-dalam.webp"
            alt="Filter Penapis Air Dalam AIHAA — penyelenggaraan 6 bulan sekali untuk 4 filter."
            className="block w-full h-auto"
            loading="eager"
            {...{ fetchPriority: "high" as const }}
          />
        </section>

        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/13-check-point.webp"
            alt="13 Titik Pemeriksaan Servis penapis air dalam AIHAA."
            className="block w-full h-auto"
            loading="lazy"
          />
        </section>

        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/harga-servis-filter.webp"
            alt="Harga Servis Filter AIHAA — RM160 standard, RM260 premium."
            className="block w-full h-auto"
            loading="lazy"
          />
        </section>

        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/7-langkah-servis.webp"
            alt="7 Langkah Servis penapis air AIHAA — prosedur lengkap juruteknik."
            className="block w-full h-auto"
            loading="lazy"
          />
        </section>

        {/* Section divider — entering outdoor service */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <span
                aria-hidden
                className="h-px w-12 md:w-20 bg-gold/40"
              />
              <h2 className="text-[12px] md:text-[13px] uppercase tracking-[0.32em] text-gold font-semibold">
                Servis Penapis Luar
              </h2>
              <span
                aria-hidden
                className="h-px w-12 md:w-20 bg-gold/40"
              />
            </div>
          </div>
        </section>

        {/* Outdoor service banners */}
        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/pasir-penapis-luar.webp"
            alt="Pasir Penapis Air Luar AIHAA — jenis media penapis yang digunakan."
            className="block w-full h-auto"
            loading="lazy"
          />
        </section>

        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/5-check-point.webp"
            alt="5 Titik Pemeriksaan Servis penapis air luar AIHAA."
            className="block w-full h-auto"
            loading="lazy"
          />
        </section>

        <section className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/service/harga-tukar-pasir.webp"
            alt="Harga Servis Tukar Pasir AIHAA — RM250 basic, RM650 full."
            className="block w-full h-auto"
            loading="lazy"
          />
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

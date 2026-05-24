"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";
import { galleryImages } from "@/lib/data/gallery";

// Filter tabs intentionally not rendered today (Azri direction —
// keep the gallery flat for now). To re-enable: uncomment the tabs
// block in the JSX and the filter state + helpers below.
// type Category = "semua" | "dalam" | "luar";

export default function GaleriPage() {
  const { t } = useLanguage();
  // const [activeTab, setActiveTab] = useState<Category>("semua");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // const filtered =
  //   activeTab === "semua"
  //     ? galleryImages
  //     : galleryImages.filter((img) =>
  //         activeTab === "dalam"
  //           ? img.category === "indoor"
  //           : img.category === "outdoor"
  //       );
  const filtered = galleryImages;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero — cream, centered (commit 375528c + b63265b) */}
      <section className="bg-surface pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-dark mb-4">
            {t.gallery_label}
          </p>
          <h1 className="font-editorial text-4xl lg:text-6xl text-dark mb-4">
            {t.gallery_title}
          </h1>
          <p className="text-muted text-base lg:text-lg max-w-xl mx-auto">
            {t.gallery_subtitle}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs hidden — see comment block at top of file
              to re-enable. Tab state + filtering logic preserved as
              comments so the next pass is one-uncomment. */}

          {/* Grid — 2 col mobile / 3 col tablet / 4 col desktop,
              3:4 portrait cards. Landscape entries (outdoor-14,
              outdoor-15) get center-cropped via object-cover; the
              lightbox shows them uncropped on click. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#1a1a1a] border border-[rgba(218,165,32,0.1)] hover:border-[rgba(218,165,32,0.3)] transition-all"
                aria-label={`Buka ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Bottom gradient on hover — gives any future label
                    breathing room and signals interactivity. */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Lightbox — opens on card click, closes on ESC / outside
              click / X. Slides carry true width × height so the
              open animation lands on the right shape. */}
          <Lightbox
            open={lightboxIndex >= 0}
            index={lightboxIndex}
            close={() => setLightboxIndex(-1)}
            slides={filtered.map((image) => ({
              src: image.src,
              alt: image.alt,
              width: image.width,
              height: image.height,
            }))}
          />

          {/* Share CTA */}
          <div className="text-center py-8 mt-4">
            <p className="text-base font-semibold text-[#0D0D0D] mb-2">
              Hantar gambar pemasangan anda
            </p>
            <p className="text-sm text-[#717171] mb-4">
              Kongsi pengalaman anda dan dapatkan hadiah istimewa
            </p>
            <a
              href={whatsappUrl(whatsappMessages.galleryUpload)}
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
              {
                name: "Ahmad, Shah Alam",
                initial: "A",
                quote:
                  "Dah 2 tahun guna, air masih sedap. Tak payah fikir pasal bayaran bulanan lagi.",
              },
              {
                name: "Farah, Johor Bahru",
                initial: "F",
                quote:
                  "Pasang dalam sejam, technician datang tepat masa. Sangat professional.",
              },
              {
                name: "Rizal, Melaka",
                initial: "R",
                quote:
                  "Jimat beribu berbanding rental. Patut beli awal-awal lagi.",
              },
            ].map((testi) => (
              <div
                key={testi.name}
                className="bg-[#FFFDE7] rounded-2xl p-6 border border-[rgba(218,165,32,0.1)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#DAA520] flex items-center justify-center text-white font-bold text-sm">
                    {testi.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0D0D0D]">
                      {testi.name}
                    </p>
                    <p className="text-[#DAA520] text-xs">
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#555] leading-relaxed italic">
                  &ldquo;{testi.quote}&rdquo;
                </p>
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
            href={whatsappUrl(t.common_whatsapp_message)}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Client-provided collection visual. Single image with two invisible
// clickable halves — top half routes to /produk-luar (outdoor), bottom
// half routes to /produk-dalam (indoor).

export default function SignatureCollection() {
  const revealRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className="bg-white">
      <div ref={revealRef} className="scroll-reveal relative w-full group">
        <Image
          src="/images/product-collection.jpg.webp"
          alt={t.home_collection_heading}
          width={1600}
          height={899}
          sizes="100vw"
          className="block w-full h-auto"
        />

        {/* Top half → outdoor */}
        <Link
          href="/produk-luar"
          aria-label={t.home_collection_view_all_outdoor}
          className="absolute inset-x-0 top-0 h-1/2 cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
        />

        {/* Bottom half → indoor */}
        <Link
          href="/produk-dalam"
          aria-label={t.home_collection_view_all_indoor}
          className="absolute inset-x-0 bottom-0 h-1/2 cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
        />
      </div>
    </section>
  );
}

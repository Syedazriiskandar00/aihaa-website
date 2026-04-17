"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { outdoorProducts } from "@/lib/data/products";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

export default function OutdoorGrid() {
  const { t, locale } = useLanguage();

  return (
    <section id="outdoor-grid" className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.produk_luar_grid_eyebrow}
          heading={t.produk_luar_grid_heading}
          subheading={t.produk_luar_grid_subheading}
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {outdoorProducts.map((product) => (
            <ProductCard
              key={product.slug}
              id={product.slug}
              name={product.name}
              tagline={product.tagline[locale]}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.mainImage}
              badge={product.badge}
            />
          ))}
        </div>

        {/* Footer CTA — single WhatsApp action, gold accent, no competing button */}
        <div className="mt-20 lg:mt-24 text-center max-w-xl mx-auto">
          <h3 className="font-editorial text-2xl md:text-3xl text-dark mb-3">
            {t.produk_luar_footer_cta_heading}
          </h3>
          <p className="text-[14px] leading-relaxed text-muted mb-7">
            {t.produk_luar_footer_cta_body}
          </p>
          <Link
            href={whatsappUrl(whatsappMessages.modelAdvice)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
          >
            {t.produk_luar_footer_cta_button}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

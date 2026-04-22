"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { indoorProducts } from "@/lib/data/products";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

export default function IndoorGrid() {
  const gridRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const { t, locale } = useLanguage();

  return (
    <section id="indoor-grid" className="bg-white py-20 lg:py-24">
      <div ref={gridRef} className="scroll-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal-child stagger-1">
          <SectionHeading
            eyebrow={t.produk_dalam_grid_eyebrow}
            heading={t.produk_dalam_grid_heading}
            subheading={t.produk_dalam_grid_subheading}
            className="mb-14"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {indoorProducts.map((product, i) => (
            <div
              key={product.slug}
              className={`scroll-reveal-child stagger-${i + 2}`}
            >
              <ProductCard
                id={product.slug}
                name={product.name}
                tagline={product.tagline[locale]}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.mainImage}
                badge={product.badge}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA — own reveal wrapper so it fades in after grid scrolls into view */}
      <div ref={ctaRef} className="scroll-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal-child stagger-1 mt-20 lg:mt-24 text-center max-w-xl mx-auto">
          <h3 className="font-editorial text-2xl md:text-3xl text-dark mb-3">
            {t.produk_dalam_footer_cta_heading}
          </h3>
          <p className="text-[14px] leading-relaxed text-muted mb-7">
            {t.produk_dalam_footer_cta_body}
          </p>
          <Link
            href={whatsappUrl(whatsappMessages.modelAdvice)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors hover:shadow-[0_0_20px_rgba(218,165,32,0.4)] motion-reduce:transition-none"
          >
            {t.produk_dalam_footer_cta_button}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

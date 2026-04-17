"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import { Check } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl } from "@/lib/config/contact";
import {
  getProductBySlug,
  indoorProducts,
  outdoorProducts,
  type Product,
} from "@/lib/data/products";

// Legacy inline products + related arrays have been replaced by
// src/lib/data/products.ts. The helper below extracts a ProductCard-shaped
// subset for the "Related Products" strip at the bottom of this page.
const toRelatedCard = (p: Product, locale: "bm" | "en") => ({
  id: p.slug,
  name: p.name,
  tagline: p.tagline[locale],
  price: p.price,
  image: p.mainImage,
});


export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, locale } = useLanguage();
  const product = getProductBySlug(id) ?? getProductBySlug("aihaa-bella")!;
  const relatedPool =
    product.category === "indoor" ? indoorProducts : outdoorProducts;
  const related = relatedPool
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)
    .map((p) => toRelatedCard(p, locale));

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Product Hero - Dark section */}
      <section className="pt-20 pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="bg-dark-alt/50 backdrop-blur-sm rounded-3xl p-8 border border-[rgba(218,165,32,0.3)] overflow-hidden">
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)] mb-4">
                {product.category === "indoor"
                  ? "Penapis Air Dalam Rumah"
                  : "Penapis Air Luar Rumah"}
              </span>
              <h1 className="font-editorial text-4xl md:text-6xl text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gold text-xl mb-4">{product.tagline[locale]}</p>
              <p className="text-muted-dark mb-6">{product.description[locale]}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-gold text-4xl font-bold">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-muted-dark text-xl line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              {/* USP Badge Strip */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 text-sm text-[#DAA520] border border-[#DAA520] rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t.detail_badge_sekali}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#DAA520] border border-[#DAA520] rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {t.detail_badge_install}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#DAA520] border border-[#DAA520] rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  {t.detail_badge_warranty}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl(t.common_whatsapp_message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
                >
                  {t.detail_cta_buy}
                </a>
                <Link
                  href="/water-purifier"
                  className="inline-flex items-center justify-center border-2 border-[rgba(218,165,32,0.3)] text-gold px-8 py-4 rounded-full font-semibold hover:bg-gold/10 transition-all"
                >
                  {t.detail_cta_all}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spesifikasi */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-[2px] bg-[#DAA520] mb-6" />
          <h2 className="text-2xl font-bold text-dark mb-8">{t.detail_specs}</h2>
          <div className="bg-white rounded-2xl border border-[rgba(218,165,32,0.15)] overflow-hidden">
            {product.specs.map((spec, index) => (
              <div
                key={index}
                className={`flex justify-between p-4 ${
                  index === 0
                    ? "bg-[rgba(218,165,32,0.1)]"
                    : index % 2 === 1
                    ? "bg-[#FFFDE7]"
                    : "bg-white"
                } ${
                  index !== product.specs.length - 1
                    ? "border-b border-[rgba(0,0,0,0.04)]"
                    : ""
                }`}
              >
                <span className={index === 0 ? "text-dark font-medium" : "text-muted"}>{spec.label}</span>
                <span className={index === 0 ? "text-[#DAA520] font-bold" : "text-dark font-medium"}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ciri-ciri Utama */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-8">
            {t.detail_features}
          </h2>
          {/* Featured first feature */}
          {product.features.length > 0 && (
            <div className="bg-[#0D0D0D] rounded-2xl p-6 lg:p-8 mb-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#DAA520]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-[#DAA520]" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{product.features[0]}</p>
                <p className="text-[#999] text-sm mt-1">Ciri utama {product.name}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.slice(1).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-[rgba(218,165,32,0.1)]"
              >
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <span className="text-dark">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Berkaitan */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-8">
            {t.detail_related}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

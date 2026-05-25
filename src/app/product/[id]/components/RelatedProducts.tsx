"use client";

import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  indoorProducts,
  outdoorProducts,
  type Product,
} from "@/lib/data/products";

type Props = { product: Product };

export default function RelatedProducts({ product }: Props) {
  const { t, locale } = useLanguage();

  const pool =
    product.category === "indoor" ? indoorProducts : outdoorProducts;
  const related = pool
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-[#FAFAF8] py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.detail_related}
          heading={t.detail_related}
          subheading={t.product_detail_related_subheading}
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {related.map((p) => (
            <ProductCard
              key={p.slug}
              id={p.slug}
              name={p.name}
              tagline={p.tagline[locale]}
              price={p.price}
              oldPrice={p.oldPrice}
              image={p.mainImage}
              badge={p.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

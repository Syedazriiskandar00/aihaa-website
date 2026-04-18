"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductHeroPremium from "./components/ProductHeroPremium";
import ProductFeatures from "./components/ProductFeatures";
import ProductSpecs from "./components/ProductSpecs";
import ProductServiceInfo from "./components/ProductServiceInfo";
import RelatedProducts from "./components/RelatedProducts";
import { getProductBySlug } from "@/lib/data/products";

// Phase 6 premium detail template. ONE template renders all 13 products.
// Tone adaptation (indoor dark / outdoor sage) happens inside the hero
// based on product.category; every section below reverts to neutral
// editorial palette for consistency.
//
// No per-product page files. All data flows from src/lib/data/products.ts
// and src/lib/data/services.ts.

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductBySlug(id) ?? getProductBySlug("aihaa-bella")!;

  return (
    <>
      <Header />
      <main>
        <ProductHeroPremium product={product} />
        <ProductFeatures product={product} />
        <ProductSpecs product={product} />
        <ProductServiceInfo product={product} />
        <RelatedProducts product={product} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

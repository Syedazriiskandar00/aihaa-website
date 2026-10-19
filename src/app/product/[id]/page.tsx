"use client";

import { use, type ReactNode } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductHeroPremium from "./components/ProductHeroPremium";
import KitchenContextSplit from "./components/KitchenContextSplit";
import CapacityFunctionalities from "./components/CapacityFunctionalities";
import HouseCrossSection from "./components/HouseCrossSection";
import SevenLayerFiltration from "./components/SevenLayerFiltration";
import PvdfMicronFunnel from "./components/PvdfMicronFunnel";
import FeaturesOverviewGrid from "./components/FeaturesOverviewGrid";
import FilterCartridgeRow from "./components/FilterCartridgeRow";
import ProductSpecs from "./components/ProductSpecs";
import ProductOrderCta from "./components/ProductOrderCta";
import ProductServiceInfo from "./components/ProductServiceInfo";
import RelatedProducts from "./components/RelatedProducts";
import ProductBannerShowcase from "@/components/product/ProductBannerShowcase";
import { getProductBySlug } from "@/lib/data/products";

// Outdoor pure-banner pilots — render through ProductBannerShowcase with
// a 16px gap and no HTML interleave. Phase 7.1 shipped pvdf-plus solo;
// Phase 7.2B added the remaining 7 outdoor produk listed below.
// AIHAA ELITE (indoor) joined on 2026-10-19 with the same pure-banner stack.
const OUTDOOR_PURE_BANNER_PILOTS = new Set<string>([
  "pvdf-plus",
  "ultra-one",
  "aihaa-elite",
  "fiber-9x42",
  "fiber-10x44",
  "steel",
  "pvdf",
  "uf-double-backwash",
]);

// Phase 7 premium detail template. ONE template renders all 12 products.
//
// Section order adapts to product.category:
//   indoor  → Hero · Kitchen · Capacity · Cartridges · SpecsDark
//             · ServiceInfo · Related
//   outdoor → Hero · House · SevenLayers · PvdfFunnel · FeaturesOverview
//             · SpecsDark · ServiceInfo · Related
//
// ProductBannerShowcase rollout — Phase 7.1 (big, pvdf-plus) + Phase 7.2B
// (ultra-one, fiber-9x42, fiber-10x44, steel, pvdf, uf-double-backwash).
// BIG interleaves CapacityFunctionalities; outdoor pure-banner pilots run
// a 16px-gap stack with no HTML interleave.
//
// BELLA, EAN, FANCY and WINTER were removed from the catalogue on
// 2026-10-15. The default template below now only serves a product that
// is not in a pilot set.
//
// No per-product page files. All data flows from src/lib/data/products.ts
// and src/lib/data/services.ts.

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductBySlug(id);
  if (!product) notFound();
  const isIndoor = product.category === "indoor";
  const isBigPilot = product.slug === "aihaa-big";
  const isOutdoorPureBannerPilot = OUTDOOR_PURE_BANNER_PILOTS.has(
    product.slug
  );
  const isPilotShowcase = isBigPilot || isOutdoorPureBannerPilot;

  if (isPilotShowcase) {
    // Indoor mid-HTML pilot (big — 7 slots):
    // bannerImages = full 6-item gallery; htmlSlots {4: Capacity}
    // interleaves at the same position. Gallery order in products.ts
    // already matches:
    //   1 hero · 2 (per-product accent) · 3 (per-product accent) ·
    //   [HTML 4 Capacity] · 5 features-detail · 6 filter-flow ·
    //   7 spec-price.
    //
    // Outdoor pure-banner pilots (all slugs in the set above):
    // full gallery, 16px gap so the stack breathes, no HTML interleave.
    const htmlSlots: Record<number, ReactNode> | undefined = isBigPilot
      ? { 4: <CapacityFunctionalities product={product} /> }
      : undefined;

    return (
      <>
        <Header />
        <main>
          <ProductBannerShowcase
            productName={product.name}
            productSlug={product.slug}
            category={product.category}
            bannerImages={product.gallery ?? []}
            htmlSlots={htmlSlots}
            gapBetweenBanners={0}
          />
          <ProductOrderCta product={product} />
          <ProductServiceInfo product={product} />
          <RelatedProducts product={product} />
        </main>
        <Footer />
        <FloatingButtons />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <ProductHeroPremium product={product} />

        {/* Middle sections */}
        {isIndoor ? (
          <>
            <KitchenContextSplit product={product} />
            <CapacityFunctionalities product={product} />
            <FilterCartridgeRow product={product} />
          </>
        ) : (
          <>
            <HouseCrossSection />
            <SevenLayerFiltration product={product} />
            <PvdfMicronFunnel />
            <FeaturesOverviewGrid product={product} />
          </>
        )}

        <ProductSpecs product={product} />

        <ProductOrderCta product={product} />
        <ProductServiceInfo product={product} />
        <RelatedProducts product={product} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

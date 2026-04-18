"use client";

import { use } from "react";
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
import ProductServiceInfo from "./components/ProductServiceInfo";
import RelatedProducts from "./components/RelatedProducts";
import { getProductBySlug } from "@/lib/data/products";

// Phase 7 premium detail template. ONE template renders all 13 products.
//
// Section order adapts to product.category:
//   indoor  → Hero · Kitchen · Capacity · FeaturesOverview · Cartridges
//             · SpecsDark · ServiceInfo · Related
//   outdoor → Hero · House · SevenLayers · PvdfFunnel · FeaturesOverview
//             · SpecsDark · ServiceInfo · Related
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
  const isIndoor = product.category === "indoor";

  return (
    <>
      <Header />
      <main>
        <ProductHeroPremium product={product} />

        {isIndoor ? (
          <>
            <KitchenContextSplit product={product} />
            <CapacityFunctionalities product={product} />
            <FeaturesOverviewGrid product={product} />
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
        <ProductServiceInfo product={product} />
        <RelatedProducts product={product} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

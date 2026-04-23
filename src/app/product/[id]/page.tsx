"use client";

import { use } from "react";
import Image from "next/image";
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
// Phase 5 hybrid layout for aihaa-ean (client presentation 24 Apr 2026):
// EAN renders a 10-section mix of client-supplied images + preserved HTML:
//   Hero banner image → ColorVariants image → SmartDesign image →
//   Capacity (HTML) → FeaturesOverview (HTML) → FilterFlow image →
//   SpecPrice image → ServiceInfo (HTML) → Related (HTML) → Footer
// Other 12 products render the default template unchanged.
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
  const isEan = product.slug === "aihaa-ean";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        {isEan ? (
          <section className="relative">
            <Image
              src="/images/products/hero-banner.webp"
              alt="AIHAA EAN — Miliki gaya anda sendiri dengan harga yang berbaloi. Halal JAKIM certified. 4 pilihan warna pastel."
              width={4269}
              height={2400}
              priority
              sizes="100vw"
              className="w-full h-auto"
            />
          </section>
        ) : (
          <ProductHeroPremium product={product} />
        )}

        {/* EAN-only inserts: Color Variants + Smart Design */}
        {isEan && (
          <>
            <section className="py-12 md:py-16 lg:py-20 bg-surface">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="relative rounded-2xl overflow-hidden shadow-sm bg-surface">
                    <Image
                      src="/images/products/color-variants.webp"
                      alt="AIHAA EAN tersedia dalam 4 pilihan warna — BEIGE, WHITE, SOFT PINK, BLACK. Padankan dengan dapur anda."
                      width={4300}
                      height={1447}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 md:py-16 lg:py-20 bg-surface">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="relative rounded-2xl overflow-hidden shadow-sm bg-surface">
                    <Image
                      src="/images/products/smart-design.webp"
                      alt="AIHAA EAN dilengkapi Jam LED dan kawalan temperatur — Panas, Sejuk, Normal."
                      width={4269}
                      height={1788}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Middle sections */}
        {isIndoor ? (
          <>
            {/* EAN skips KitchenContextSplit per the 10-section spec */}
            {!isEan && <KitchenContextSplit product={product} />}
            <CapacityFunctionalities product={product} />
            <FeaturesOverviewGrid product={product} />
            {isEan ? (
              <section className="py-12 md:py-16 lg:py-20 bg-surface">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-sm bg-surface">
                      <Image
                        src="/images/products/filter-flow.webp"
                        alt="Sistem penapisan 4 peringkat AIHAA EAN — Sediment, Antibacterial, Pre-Carbon, Post-Carbon Filter."
                        width={4269}
                        height={2400}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <FilterCartridgeRow product={product} />
            )}
          </>
        ) : (
          <>
            <HouseCrossSection />
            <SevenLayerFiltration product={product} />
            <PvdfMicronFunnel />
            <FeaturesOverviewGrid product={product} />
          </>
        )}

        {/* Spec: EAN image, others ProductSpecs */}
        {isEan ? (
          <section className="py-12 md:py-16 lg:py-20 bg-surface">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-sm bg-surface">
                  <Image
                    src="/images/products/spec-price.webp"
                    alt="Spesifikasi AIHAA EAN — Berat 11.4kg, Ukuran 385×290×480mm, Kapasiti Tangki (Panas 1.5L, Biasa 3L, Sejuk 3L), 4 Filter Air. Harga RM780."
                    width={4269}
                    height={2400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <ProductSpecs product={product} />
        )}

        <ProductServiceInfo product={product} />
        <RelatedProducts product={product} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

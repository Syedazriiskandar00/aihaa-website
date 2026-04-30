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
import ProductBannerShowcase from "@/components/product/ProductBannerShowcase";
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
//
// Phase 7.1 pilot — aihaa-bella + pvdf-plus render through
// <ProductBannerShowcase>: an edge-to-edge stack of the gallery banners,
// with bella interleaving CapacityFunctionalities + FeaturesOverviewGrid
// at slots 4–5 (indoor hybrid) and pvdf-plus running pure-banner.
//
// All other slugs continue on the default template unchanged.
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
  const isBellaPilot = product.slug === "aihaa-bella";
  const isPvdfPlusPilot = product.slug === "pvdf-plus";
  const isPilotShowcase = isBellaPilot || isPvdfPlusPilot;

  if (isPilotShowcase) {
    // Bella: drop slots 4 + 5 (HTML) from gallery before passing as banners.
    // Gallery order: hero, smart-design, use-cases, features-detail,
    // filter-flow, spec-price → image slots 1, 2, 3, 6, 7.
    const bellaBanners = isBellaPilot
      ? [
          product.gallery![0], // hero-banner
          product.gallery![1], // smart-design
          product.gallery![2], // use-cases
          product.gallery![4], // filter-flow
          product.gallery![5], // spec-price
        ]
      : [];

    return (
      <>
        <Header />
        <main>
          <ProductBannerShowcase
            productName={product.name}
            productSlug={product.slug}
            category={product.category}
            bannerImages={isBellaPilot ? bellaBanners : product.gallery ?? []}
            htmlSlots={
              isBellaPilot
                ? {
                    4: <CapacityFunctionalities product={product} />,
                    5: <FeaturesOverviewGrid product={product} />,
                  }
                : undefined
            }
          />
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

        {/* EAN-only inserts: Color Variants + Smart Design (full-width) */}
        {isEan && (
          <>
            <section className="relative">
              <Image
                src="/images/products/color-variants.webp"
                alt="AIHAA EAN tersedia dalam 4 pilihan warna — BEIGE, WHITE, SOFT PINK, BLACK. Padankan dengan dapur anda."
                width={4300}
                height={1447}
                sizes="100vw"
                className="w-full h-auto"
              />
            </section>

            <section className="relative">
              <Image
                src="/images/products/smart-design.webp"
                alt="AIHAA EAN dilengkapi Jam LED dan kawalan temperatur — Panas, Sejuk, Normal."
                width={4269}
                height={1788}
                sizes="100vw"
                className="w-full h-auto"
              />
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
              <section className="relative">
                <Image
                  src="/images/products/filter-flow.webp"
                  alt="Sistem penapisan 4 peringkat AIHAA EAN — Sediment, Antibacterial, Pre-Carbon, Post-Carbon Filter."
                  width={4269}
                  height={2400}
                  sizes="100vw"
                  className="w-full h-auto"
                />
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

        {/* Spec: EAN image full-width, others ProductSpecs */}
        {isEan ? (
          <section className="relative">
            <Image
              src="/images/products/spec-price.webp"
              alt="Spesifikasi AIHAA EAN — Berat 11.4kg, Ukuran 385×290×480mm, Kapasiti Tangki (Panas 1.5L, Biasa 3L, Sejuk 3L), 4 Filter Air. Harga RM780."
              width={4269}
              height={2400}
              sizes="100vw"
              className="w-full h-auto"
            />
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

"use client";

import { use, type ReactNode } from "react";
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

// Outdoor pure-banner pilots — render through ProductBannerShowcase with
// a 16px gap and no HTML interleave. Phase 7.1 shipped pvdf-plus solo;
// Phase 7.2B added the remaining 7 outdoor produk listed below.
const OUTDOOR_PURE_BANNER_PILOTS = new Set<string>([
  "pvdf-plus",
  "ultra-one",
  "fiber-9x42",
  "fiber-10x44",
  "steel",
  "pvdf",
  "super-pleated",
  "uf-double-backwash",
]);

// Phase 7 premium detail template. ONE template renders all 13 products.
//
// Section order adapts to product.category:
//   indoor  → Hero · Kitchen · Capacity · Cartridges · SpecsDark
//             · ServiceInfo · Related
//   outdoor → Hero · House · SevenLayers · PvdfFunnel · FeaturesOverview
//             · SpecsDark · ServiceInfo · Related
//
// Phase 5 hybrid layout for aihaa-ean (client presentation 24 Apr 2026,
// extended Phase 7.1 fix with FeaturesDetail banner): EAN renders a
// 9-section mix of client-supplied images + preserved HTML:
//   Hero · ColorVariants · SmartDesign · Capacity (HTML) ·
//   FeaturesDetail · FilterFlow · SpecPrice · ServiceInfo (HTML) ·
//   Related (HTML) · Footer
//
// ProductBannerShowcase rollout — Phase 7.1 (bella, fancy, big, winter,
// pvdf-plus) + Phase 7.2B (ultra-one, fiber-9x42, fiber-10x44, steel,
// pvdf, super-pleated, uf-double-backwash). Indoor mid-HTML pilots
// interleave CapacityFunctionalities; outdoor pure-banner pilots run a
// 16px-gap stack with no HTML interleave.
//
// Default template fallback now applies only to penapis-boring-13x54
// (legacy single-image gallery) and aihaa-ean (custom 9-section inline
// flow with hardcoded banner <img> tags).
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
  const isBigPilot = product.slug === "aihaa-big";
  const isFancyPilot = product.slug === "aihaa-fancy";
  const isWinterPilot = product.slug === "aihaa-winter";
  const isOutdoorPureBannerPilot = OUTDOOR_PURE_BANNER_PILOTS.has(
    product.slug
  );
  const isIndoorMidHtmlPilot = isBellaPilot || isBigPilot || isWinterPilot;
  const isPilotShowcase =
    isIndoorMidHtmlPilot || isFancyPilot || isOutdoorPureBannerPilot;

  if (isPilotShowcase) {
    // Indoor mid-HTML pilots (bella, big, winter — 7 slots each):
    // bannerImages = full 6-item gallery; htmlSlots {4: Capacity}
    // interleaves at the same position. Gallery order in products.ts
    // already matches:
    //   1 hero · 2 (per-product accent) · 3 (per-product accent) ·
    //   [HTML 4 Capacity] · 5 features-detail · 6 filter-flow ·
    //   7 spec-price.
    //
    // Fancy (6 slots): only 5 banners post-Squoosh, so Capacity HTML
    // interleaves earlier at slot 3 between use-cases and features-overview.
    //
    // Outdoor pure-banner pilots (all 8 outdoor slugs in the set above):
    // full gallery, 16px gap so the stack breathes, no HTML interleave.
    let htmlSlots: Record<number, ReactNode> | undefined;
    if (isFancyPilot) {
      htmlSlots = {
        3: <CapacityFunctionalities product={product} />,
      };
    } else if (isIndoorMidHtmlPilot) {
      htmlSlots = {
        4: <CapacityFunctionalities product={product} />,
      };
    }

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
            gapBetweenBanners={isOutdoorPureBannerPilot ? 16 : 0}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/hero-banner.webp"
              alt="AIHAA EAN — Miliki gaya anda sendiri dengan harga yang berbaloi. Halal JAKIM certified. 4 pilihan warna pastel."
              className="block w-full h-auto"
              loading="eager"
              {...{ fetchPriority: "high" as const }}
            />
          </section>
        ) : (
          <ProductHeroPremium product={product} />
        )}

        {/* EAN-only inserts: Color Variants + Smart Design (full-width) */}
        {isEan && (
          <>
            <section className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/color-variants.webp"
                alt="AIHAA EAN tersedia dalam 4 pilihan warna — BEIGE, WHITE, SOFT PINK, BLACK. Padankan dengan dapur anda."
                className="block w-full h-auto"
                loading="lazy"
              />
            </section>

            <section className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/smart-design.webp"
                alt="AIHAA EAN dilengkapi Jam LED dan kawalan temperatur — Panas, Sejuk, Normal."
                className="block w-full h-auto"
                loading="lazy"
              />
            </section>
          </>
        )}

        {/* Middle sections */}
        {isIndoor ? (
          <>
            {/* EAN skips KitchenContextSplit per the 9-section spec */}
            {!isEan && <KitchenContextSplit product={product} />}
            <CapacityFunctionalities product={product} />
            {isEan && (
              <section className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/products/features-detail.webp"
                  alt="AIHAA EAN — Features Detail"
                  className="block w-full h-auto"
                  loading="lazy"
                />
              </section>
            )}
            {isEan ? (
              <section className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/products/filter-flow.webp"
                  alt="Sistem penapisan 4 peringkat AIHAA EAN — Sediment, Antibacterial, Pre-Carbon, Post-Carbon Filter."
                  className="block w-full h-auto"
                  loading="lazy"
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/spec-price.webp"
              alt="Spesifikasi AIHAA EAN — Berat 11.4kg, Ukuran 385×290×480mm, Kapasiti Tangki (Panas 1.5L, Biasa 3L, Sejuk 3L), 4 Filter Air. Harga RM780."
              className="block w-full h-auto"
              loading="lazy"
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

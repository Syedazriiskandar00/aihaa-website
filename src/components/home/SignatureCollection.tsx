"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  indoorProducts,
  outdoorProducts,
  type Product,
} from "@/lib/data/products";

// SPEC §1.2 Our Signature Collection — tab toggle between Indoor / Outdoor,
// 4 featured products per tab.
//
// Featured picks (editorial decisions flagged for Azri override):
// - Indoor: BELLA (bestseller), BIG (17L family), FANCY (slim modern),
//   WINTER (premium flagship). Skips EAN — stays visible on /produk-dalam
//   grid; homepage features the 4 with most distinct character.
// - Outdoor: ULTRA ONE (best-value), PVDF (pro-grade), PVDF PLUS
//   (premium), UF DOUBLE BACKWASH (sale). Skips the 4 utilitarian
//   fiber/tank variants.
const INDOOR_FEATURED_SLUGS = [
  "aihaa-bella",
  "aihaa-big",
  "aihaa-fancy",
  "aihaa-winter",
];
const OUTDOOR_FEATURED_SLUGS = [
  "ultra-one",
  "pvdf",
  "pvdf-plus",
  "uf-double-backwash",
];

const pick = (all: Product[], slugs: string[]): Product[] =>
  slugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);

type Tab = "indoor" | "outdoor";

export default function SignatureCollection() {
  const { t, locale } = useLanguage();
  const [tab, setTab] = useState<Tab>("indoor");

  const indoorFeatured = pick(indoorProducts, INDOOR_FEATURED_SLUGS);
  const outdoorFeatured = pick(outdoorProducts, OUTDOOR_FEATURED_SLUGS);
  const active = tab === "indoor" ? indoorFeatured : outdoorFeatured;
  const viewAllHref = tab === "indoor" ? "/produk-dalam" : "/produk-luar";
  const viewAllLabel =
    tab === "indoor"
      ? t.home_collection_view_all_indoor
      : t.home_collection_view_all_outdoor;

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.home_collection_eyebrow}
          heading={t.home_collection_heading}
          className="mb-10"
        />

        {/* Tab toggle — Wells-style pill */}
        <div
          className="flex items-center justify-center gap-2 mb-12"
          role="tablist"
          aria-label={t.home_collection_heading}
        >
          {(["indoor", "outdoor"] as const).map((key) => {
            const isActive = tab === key;
            const label =
              key === "indoor"
                ? t.home_collection_tab_indoor
                : t.home_collection_tab_outdoor;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(key)}
                className={`px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "bg-gold text-dark shadow-sm"
                    : "bg-transparent text-dark/70 hover:text-dark"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {active.map((product) => (
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

        <div className="text-center mt-12">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-dark hover:text-gold transition-colors"
          >
            {viewAllLabel}
            <span aria-hidden className="text-gold">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

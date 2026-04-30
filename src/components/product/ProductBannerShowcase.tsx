import Image from "next/image";
import type { ReactNode } from "react";

// Phase 7.1 pilot template. Renders a product detail page as a flush
// edge-to-edge stack of full-width banner images, with optional HTML
// components interleaved at specific slot positions (EAN-style hybrid).
//
// Slot positions are 1-indexed and absolute across the merged flow.
// Slots that appear in `htmlSlots` render the supplied node; remaining
// slots draw the next banner from `bannerImages` in order.
//
// Indoor pilot (aihaa-bella) — 7 slots, 5 banners + 2 HTML:
//   1 hero · 2 smart-design · 3 use-cases · 4 <CapacityFunctionalities/>
//   5 <FeaturesOverviewGrid/> · 6 filter-flow · 7 spec-price
//
// Outdoor pilot (pvdf-plus) — 6 slots, 6 banners, no HTML interleave.
//
// First banner (slot containing image index 0) gets `priority` + eager
// loading so it lands in the LCP candidate set; the rest lazy-load.

type ProductCategory = "indoor" | "outdoor";

export interface ProductBannerShowcaseProps {
  productName: string;
  productSlug: string;
  category: ProductCategory;
  bannerImages: string[];
  htmlSlots?: Record<number, ReactNode>;
}

function deriveAltSegment(banner: string): string {
  const file = banner.split("/").pop() ?? banner;
  const stem = file.replace(/\.[a-zA-Z0-9]+$/, "");
  return stem
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ProductBannerShowcase({
  productName,
  productSlug,
  category,
  bannerImages,
  htmlSlots,
}: ProductBannerShowcaseProps) {
  const htmlEntries = htmlSlots ?? {};
  const totalSlots = bannerImages.length + Object.keys(htmlEntries).length;

  const slots: ReactNode[] = [];
  let imageIndex = 0;

  for (let pos = 1; pos <= totalSlots; pos += 1) {
    const htmlNode = htmlEntries[pos];
    if (htmlNode !== undefined) {
      slots.push(
        <div key={`html-${productSlug}-${pos}`} data-slot={pos}>
          {htmlNode}
        </div>
      );
      continue;
    }

    const banner = bannerImages[imageIndex];
    if (!banner) break;
    const isFirstImage = imageIndex === 0;
    const altSegment = deriveAltSegment(banner);

    slots.push(
      <section
        key={`banner-${productSlug}-${pos}`}
        data-slot={pos}
        data-category={category}
        className="relative"
      >
        <Image
          src={banner}
          alt={`${productName} — ${altSegment}`}
          width={1600}
          height={900}
          sizes="100vw"
          className="w-full h-auto"
          priority={isFirstImage}
          loading={isFirstImage ? "eager" : "lazy"}
        />
      </section>
    );
    imageIndex += 1;
  }

  return <>{slots}</>;
}

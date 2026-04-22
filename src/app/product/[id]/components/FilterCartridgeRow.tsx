"use client";

import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";

// SPEC §D.5 — Filter Cartridge Row. Indoor detail pages only.
// Black full-bleed section showcasing the real cartridge photography
// supplied by the client — replaces the prior CSS/SVG placeholder.

type Props = { product: Product };

export default function FilterCartridgeRow({ product: _product }: Props) {
  const { t } = useLanguage();

  return (
    <section className="bg-dark py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-14">
        <SectionHeading
          eyebrow={t.product_cartridge_eyebrow}
          heading={t.product_cartridge_heading}
          subheading={t.product_cartridge_subheading}
          tone="dark"
        />
      </div>

      <Image
        src="/images/products/cartridge-filters.png.webp"
        alt={t.product_cartridge_heading}
        width={4269}
        height={2400}
        sizes="100vw"
        className="block w-full h-auto"
      />
    </section>
  );
}

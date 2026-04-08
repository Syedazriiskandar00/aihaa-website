"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  price: string;
  badge?: "popular" | "sale" | "premium" | "best-value" | "pro-grade";
  oldPrice?: string;
  image?: string;
}

export default function ProductCard({
  id,
  name,
  tagline,
  price,
  badge,
  oldPrice,
  image,
}: ProductCardProps) {
  const { locale } = useLanguage();

  const badgeStyles = {
    popular: "bg-gold text-white",
    sale: "bg-red-500 text-white",
    premium: "bg-gold text-white",
    "best-value": "bg-green-500 text-white",
    "pro-grade": "bg-blue-500 text-white",
  };

  const badgeText: Record<string, Record<string, string>> = {
    popular: { bm: "Popular", en: "Popular" },
    sale: { bm: "Jimat", en: "Sale" },
    premium: { bm: "Premium", en: "Premium" },
    "best-value": { bm: "Nilai Terbaik", en: "Best Value" },
    "pro-grade": { bm: "Gred Pro", en: "Pro Grade" },
  };

  return (
    <Link
      href={`/product/${id}`}
      className="bg-white border border-[rgba(218,165,32,0.15)] rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-[rgba(218,165,32,0.3)] block"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${badgeStyles[badge]}`}
          >
            {badgeText[badge][locale]}
          </div>
        )}

        {image ? (
          <Image
            src={image}
            alt={`AIHAA ${name}`}
            fill
            className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-alt via-dark to-dark-alt flex items-center justify-center">
            <div className="text-center">
              <div className="w-28 h-40 bg-gradient-to-b from-white/10 to-white/5 rounded-lg border border-[rgba(218,165,32,0.3)] mx-auto" />
              <div className="mt-4 px-4 py-2 bg-dark/60 rounded-lg border border-[rgba(218,165,32,0.3)] inline-block">
                <span className="text-gold font-semibold text-sm">{name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="relative p-5">
        <h3 className="text-dark font-semibold text-base mb-1">{name}</h3>
        <p className="text-muted text-sm mb-3 truncate">{tagline}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-gold-dark text-lg font-semibold">{price}</span>
          {oldPrice && (
            <span className="text-muted text-sm line-through">{oldPrice}</span>
          )}
        </div>

        {/* Hover arrow */}
        <span className="absolute bottom-5 right-5 text-gold opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-lg">
          →
        </span>
      </div>
    </Link>
  );
}

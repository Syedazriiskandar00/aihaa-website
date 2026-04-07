"use client";

import Link from "next/link";
import Image from "next/image";

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
  const badgeStyles = {
    popular: "bg-gold text-white",
    sale: "bg-red-500 text-white",
    premium: "bg-gold text-white",
    "best-value": "bg-green-500 text-white",
    "pro-grade": "bg-blue-500 text-white",
  };

  const badgeText = {
    popular: "Popular",
    sale: "Jimat",
    premium: "Premium",
    "best-value": "Nilai Terbaik",
    "pro-grade": "Gred Pro",
  };

  return (
    <div className="bg-white border border-[rgba(218,165,32,0.15)] rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,32,0.12)] hover:border-[rgba(218,165,32,0.3)]">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${badgeStyles[badge]}`}
          >
            {badgeText[badge]}
          </div>
        )}

        {image ? (
          <Image
            src={image}
            alt={`AIHAA ${name}`}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
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
      <div className="p-5">
        <h3 className="text-dark font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted text-sm mb-3">{tagline}</p>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-gold-dark text-2xl font-bold">{price}</span>
          {oldPrice && (
            <span className="text-muted text-sm line-through">{oldPrice}</span>
          )}
        </div>

        {/* Sekali Bayar badge */}
        <span className="inline-block text-[11px] text-[#DAA520] border border-[rgba(218,165,32,0.3)] rounded-full px-2.5 py-0.5 mb-4">
          Sekali Bayar
        </span>

        <div className="flex gap-3">
          <Link
            href={`/product/${id}`}
            className="flex-1 bg-surface border border-[rgba(218,165,32,0.15)] text-dark py-2.5 rounded-lg text-sm font-medium text-center hover:border-gold hover:text-gold-dark transition-all"
          >
            Lihat Details
          </Link>
          <a
            href={`https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20${name}.%20Boleh%20saya%20tahu%20lebih%20lanjut?`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 gold-gradient-bg text-white py-2.5 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-all"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

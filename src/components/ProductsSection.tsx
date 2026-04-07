"use client";

import ProductCard from "./ProductCard";

const indoorProducts = [
  { id: "aihaa-bella", name: "AIHAA BELLA", tagline: "Rekaan Kompak Stand Floor", price: "RM1,080", image: "/images/products/bella/main.jpg" },
  { id: "aihaa-big", name: "AIHAA BIG", tagline: "Kapasiti Besar 17 Liter", price: "RM1,280", image: "/images/products/big/main.jpg", badge: "popular" as const },
  { id: "aihaa-ean", name: "AIHAA EAN", tagline: "Pilihan Bajet dengan Digital Feature", price: "RM780", oldPrice: "RM867", image: "/images/products/ean/main.png", badge: "sale" as const },
  { id: "aihaa-fancy", name: "AIHAA FANCY", tagline: "Rekaan Slim Moden dengan 3 Tangki", price: "RM999", image: "/images/products/fancy/main.jpg" },
  { id: "aihaa-winter", name: "AIHAA WINTER", tagline: "Premium dengan Ice Maker & Teknologi Baru", price: "RM1,580", image: "/images/products/winter/main.png", badge: "premium" as const },
];

const outdoorProducts = [
  { id: "ultra-one", name: "ULTRA ONE", tagline: "All-in-One Direct Minum", price: "RM399", image: "/images/products/ultra-one/main.jpg", badge: "best-value" as const },
  { id: "fiber-9x42", name: "FIBER 9X42", tagline: "Tangki Fiber Tahan Lasak", price: "RM399", image: "/images/products/fiber/main.jpg" },
  { id: "fiber-10x44", name: "FIBER 10X44", tagline: "Tangki Fiber Besar 10x44", price: "RM469", image: "/images/products/fiber-10x44/main.png" },
  { id: "penapis-boring-13x54", name: "PENAPIS BORING 13X54", tagline: "Khas Untuk Air Bawah Tanah", price: "RM1,180", image: "/images/products/penapis-boring/main.jpg" },
  { id: "pvdf", name: "PVDF", tagline: "Material PVDF Gred Profesional", price: "RM899", image: "/images/products/pvdf/main.jpg", badge: "pro-grade" as const },
  { id: "pvdf-plus", name: "PVDF PLUS", tagline: "PVDF Dipertingkat 6000L/Hour", price: "RM1,299", image: "/images/products/pvdf-plus/main.jpg", badge: "premium" as const },
  { id: "super-pleated", name: "SUPER PLEATED", tagline: "Kadar Aliran Tinggi & Kompak", price: "RM580", image: "/images/products/super-pleated/main.jpg" },
  { id: "uf-double-backwash", name: "UF DOUBLE BACKWASH", tagline: "Membran UF dengan Dual Backwash", price: "RM799", oldPrice: "RM888", image: "/images/products/uf-double-backwash/main.jpg", badge: "sale" as const },
];

export default function ProductsSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Our <span className="gold-gradient-text">Water Purifiers</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Discover our range of premium water purification systems designed for every need
          </p>
        </div>

        {/* Indoor Products */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="text-xl font-semibold text-dark px-4 py-2 bg-surface rounded-full border border-[rgba(218,165,32,0.15)]">
              Penapis Air Dalam Rumah
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {indoorProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Outdoor Products */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="text-xl font-semibold text-dark px-4 py-2 bg-surface rounded-full border border-[rgba(218,165,32,0.15)]">
              Penapis Air Luar Rumah
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {outdoorProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

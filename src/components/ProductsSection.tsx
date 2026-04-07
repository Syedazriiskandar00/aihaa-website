"use client";

import ProductCard from "./ProductCard";

const indoorProducts = [
  { id: "neon", name: "Neon", tagline: "Compact & Stylish", price: "RM54", badge: "new" as const },
  { id: "neo-plus", name: "Neo Plus", tagline: "Advanced Filtration", price: "RM59" },
  { id: "cinnamon", name: "Cinnamon", tagline: "Budget Friendly", price: "RM32", badge: "limited" as const },
  { id: "dazzie", name: "Dazzie", tagline: "Premium Design", price: "RM79" },
  { id: "villaem-iii", name: "Villaem III", tagline: "Family Size", price: "RM74", badge: "bestseller" as const },
  { id: "glaze", name: "Glaze", tagline: "Sleek Modern", price: "RM75" },
  { id: "core-plus", name: "Core Plus", tagline: "High Performance", price: "RM93" },
  { id: "harry", name: "Harry", tagline: "Smart Technology", price: "RM83", badge: "new" as const },
  { id: "ombak", name: "Ombak", tagline: "Wave Series", price: "RM90" },
  { id: "ais", name: "AIS", tagline: "Ice Cold Water", price: "RM120" },
  { id: "inception", name: "Inception", tagline: "Next Generation", price: "RM144", badge: "new" as const },
  { id: "lucy-plus", name: "Lucy Plus", tagline: "Ultimate Premium", price: "RM150", badge: "limited" as const },
];

const outdoorProducts = [
  { id: "outdoor-filter", name: "Outdoor Filter", tagline: "Whole House Solution", price: "RM60" },
];

export default function ProductsSection() {
  return (
    <section className="bg-navy-primary py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
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
            <h3 className="text-xl font-semibold text-white px-4 py-2 bg-navy-secondary rounded-full border border-gold/20">
              Indoor Water Purifiers
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
            <h3 className="text-xl font-semibold text-white px-4 py-2 bg-navy-secondary rounded-full border border-gold/20">
              Outdoor Water Purifiers
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

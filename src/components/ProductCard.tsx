"use client";

import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  price: string;
  badge?: "new" | "limited" | "bestseller";
  image?: string;
}

// Generate unique gradient based on product name
function getProductGradient(name: string): { gradient: string; angle: number; accentColor: string } {
  const gradients = [
    { gradient: "from-navy-light via-navy-secondary to-navy-primary", angle: 135, accentColor: "bg-gold" },
    { gradient: "from-navy-primary via-navy-light to-navy-secondary", angle: 45, accentColor: "bg-gold-light" },
    { gradient: "from-navy-secondary via-navy-primary to-navy-light", angle: 180, accentColor: "bg-gold-dark" },
    { gradient: "from-[#0D1E35] via-navy-secondary to-[#152A4A]", angle: 225, accentColor: "bg-gold" },
    { gradient: "from-[#152A4A] via-[#0D1E35] to-navy-primary", angle: 90, accentColor: "bg-gold-light" },
    { gradient: "from-navy-light via-[#1A3050] to-navy-secondary", angle: 315, accentColor: "bg-gold-dark" },
    { gradient: "from-[#0B1929] via-navy-secondary to-[#162D48]", angle: 160, accentColor: "bg-gold" },
    { gradient: "from-[#162D48] via-navy-light to-[#0B1929]", angle: 200, accentColor: "bg-gold-light" },
    { gradient: "from-navy-secondary via-[#1E3A5F] to-navy-primary", angle: 270, accentColor: "bg-gold-dark" },
    { gradient: "from-[#0E2137] via-navy-primary to-navy-light", angle: 120, accentColor: "bg-gold" },
    { gradient: "from-navy-primary via-[#0E2137] to-[#1A3555]", angle: 300, accentColor: "bg-gold-light" },
    { gradient: "from-[#1A3555] via-navy-secondary to-[#0E2137]", angle: 75, accentColor: "bg-gold-dark" },
    { gradient: "from-navy-light via-[#0F2540] to-navy-secondary", angle: 240, accentColor: "bg-gold" },
  ];

  // Create a simple hash from the product name to pick a gradient
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;

  return gradients[index];
}

export default function ProductCard({
  id,
  name,
  tagline,
  price,
  badge,
}: ProductCardProps) {
  const badgeStyles = {
    new: "bg-green-500 text-white",
    limited: "bg-red-500 text-white",
    bestseller: "bg-gold text-navy-primary",
  };

  const badgeText = {
    new: "New",
    limited: "Limited Offer",
    bestseller: "Bestseller",
  };

  const { gradient, angle, accentColor } = getProductGradient(name);

  return (
    <div className="bg-navy-secondary border border-gold/20 rounded-2xl overflow-hidden card-hover group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${badgeStyles[badge]}`}
          >
            {badgeText[badge]}
          </div>
        )}

        {/* Unique Gradient Placeholder */}
        <div
          className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500`}
          style={{ backgroundImage: `linear-gradient(${angle}deg, var(--tw-gradient-stops))` }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20">
            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 67, 0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Accent Circle */}
          <div className={`absolute top-1/4 right-1/4 w-32 h-32 ${accentColor} opacity-10 rounded-full blur-2xl`} />
          <div className={`absolute bottom-1/4 left-1/4 w-24 h-24 ${accentColor} opacity-5 rounded-full blur-xl`} />

          {/* Water Purifier Shape Silhouette */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Machine silhouette */}
            <div className="w-28 h-40 bg-gradient-to-b from-white/10 to-white/5 rounded-lg border border-gold/20 backdrop-blur-sm relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              {/* Display placeholder */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-navy-primary/50 rounded border border-gold/20 flex items-center justify-center">
                <div className="w-8 h-1 bg-gold/40 rounded-full" />
              </div>

              {/* Button indicators */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 flex gap-2">
                <div className={`w-2 h-2 rounded-full ${accentColor} opacity-60`} />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>

              {/* Dispenser area */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-14 h-14 bg-navy-primary/30 rounded border border-gold/10">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-gold/20 rounded-full" />
              </div>
            </div>

            {/* Product Name Label */}
            <div className="mt-4 px-4 py-2 bg-navy-primary/60 backdrop-blur-sm rounded-lg border border-gold/30">
              <span className="text-gold font-semibold text-sm tracking-wide">{name}</span>
            </div>
          </div>

          {/* Decorative water drops */}
          <div className={`absolute top-8 right-8 w-2 h-3 ${accentColor} opacity-30 rounded-full`} />
          <div className={`absolute bottom-12 left-8 w-1.5 h-2 ${accentColor} opacity-20 rounded-full`} />
          <div className={`absolute top-1/2 right-12 w-1 h-1.5 ${accentColor} opacity-25 rounded-full`} />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted text-sm mb-3">{tagline}</p>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-gold text-2xl font-bold">{price}</span>
          <span className="text-muted text-sm">/month</span>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/product/${id}`}
            className="flex-1 bg-navy-light border border-gold/30 text-gold py-2.5 rounded-lg text-sm font-medium text-center hover:bg-gold hover:text-navy-primary transition-all"
          >
            Read More
          </Link>
          <a
            href={`https://wa.me/60123456789?text=Hi%20AIHAA,%20I%20want%20to%20check%20promotion%20for%20${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 gold-gradient-bg text-navy-primary py-2.5 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-all"
          >
            Check Promo
          </a>
        </div>
      </div>
    </div>
  );
}

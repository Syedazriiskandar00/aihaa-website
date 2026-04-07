"use client";

import Link from "next/link";
import { Wind, BedDouble } from "lucide-react";

const categories = [
  {
    icon: Wind,
    title: "Air Purifier",
    description: "Breathe clean, purified air with our advanced HEPA filtration systems",
    href: "#",
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: BedDouble,
    title: "Mattress",
    description: "Experience premium sleep with our certified hypoallergenic mattresses",
    href: "#",
    color: "from-purple-500/10 to-pink-500/10",
  },
];

export default function CrossSellSection() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Explore More <span className="gold-gradient-text">Products</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Complete your healthy living experience with our other premium products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative overflow-hidden rounded-3xl bg-white border border-[rgba(218,165,32,0.15)] p-8 lg:p-10 card-hover"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <category.icon className="w-10 h-10 text-gold" />
                </div>

                <div className="text-center lg:text-left flex-1">
                  <h3 className="text-2xl font-bold text-dark mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted mb-4">{category.description}</p>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 text-gold-dark font-semibold group-hover:gap-4 transition-all">
                    Discover More
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

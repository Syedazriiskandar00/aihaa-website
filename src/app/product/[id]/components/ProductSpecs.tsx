"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Product } from "@/lib/data/products";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

// SPEC §D.6 — Spec & Price Dark. Upgraded from the Phase 6 light-card
// version to match the Hijrah/Coway spec-page aesthetic: dark backdrop,
// engineering-blueprint drawing on the left, full spec table on the
// right, cash-price emphasis + tech badge + primary WhatsApp CTA below.
//
// Anchor id=specifications preserved so the hero secondary-CTA still
// scrolls here.

type Props = { product: Product };

export default function ProductSpecs({ product }: Props) {
  const { t, locale } = useLanguage();

  return (
    <section
      id="specifications"
      className="bg-[#0A0A0A] text-white py-20 lg:py-24 border-b border-white/5 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.24em] text-gold font-semibold mb-4">
            {t.product_specprice_eyebrow}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl text-white leading-[1.08]">
            {product.name}
          </h2>
          <p className="mt-3 text-[13px] md:text-[14px] text-white/60">
            {t.product_specprice_heading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
          {/* Left — Blueprint drawing */}
          <div>
            <BlueprintDrawing />
            <p className="mt-4 text-[11px] text-white/45 uppercase tracking-[0.18em] text-center">
              {t.product_specprice_blueprint_caption}
            </p>
          </div>

          {/* Right — Spec table + Price */}
          <div>
            <dl className="divide-y divide-white/10 border-t border-b border-white/10">
              {product.specs.map((spec, index) => (
                <div
                  key={`${spec.label}-${index}`}
                  className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-4 py-4"
                >
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                    {spec.label}
                  </dt>
                  <dd className="text-[13.5px] md:text-[14.5px] text-white font-medium">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Price block */}
            <div className="mt-10 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold mb-3">
                {t.product_specprice_cash_label}
              </p>
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="font-editorial text-5xl lg:text-6xl text-gold leading-none">
                  {product.price}
                </span>
                {product.oldPrice ? (
                  <span className="text-xl text-white/40 line-through">
                    {product.oldPrice}
                  </span>
                ) : null}
              </div>

              {/* Green Tech badge */}
              <div className="mt-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold text-dark text-[10.5px] uppercase tracking-[0.16em] font-bold">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 1l-5 5h3v4h4V6h3L6 1z" fill="currentColor" />
                  </svg>
                  {t.product_specprice_tech_badge}
                </span>
              </div>

              {/* CTA */}
              <div className="mt-7">
                <Link
                  href={whatsappUrl(whatsappMessages.productInquiry(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
                >
                  {t.product_specprice_cta}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            {/* Tagline — subtle echo below for continuity */}
            <p className="mt-6 font-editorial-italic text-[14px] text-white/55">
              {product.tagline[locale]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintDrawing() {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#111111] border border-white/10">
      {/* Grid paper */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#DAA520 1px, transparent 1px), linear-gradient(90deg, #DAA520 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Inner frame border */}
      <div
        aria-hidden
        className="absolute inset-4 border border-white/15 rounded-lg pointer-events-none"
      />

      {/* Blueprint drawing — generic purifier silhouette */}
      <svg
        viewBox="0 0 240 320"
        className="absolute inset-0 w-full h-full p-8"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Body outline */}
        <rect
          x="60"
          y="40"
          width="120"
          height="220"
          rx="6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.85"
        />
        {/* Top cap */}
        <rect
          x="72"
          y="28"
          width="96"
          height="12"
          rx="2"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.7"
        />
        {/* Screen / display */}
        <rect
          x="82"
          y="70"
          width="76"
          height="36"
          rx="3"
          fill="none"
          stroke="#DAA520"
          strokeWidth="0.75"
          opacity="0.8"
        />
        {/* Faucet */}
        <rect x="110" y="130" width="20" height="36" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
        <circle cx="120" cy="170" r="3" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
        {/* Drip tray */}
        <rect x="88" y="228" width="64" height="20" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.75" />
        {/* Base */}
        <rect x="60" y="258" width="120" height="4" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

        {/* Dimension lines — width */}
        <line x1="48" y1="40" x2="48" y2="260" stroke="#DAA520" strokeWidth="0.5" opacity="0.8" />
        <line x1="44" y1="40" x2="52" y2="40" stroke="#DAA520" strokeWidth="0.5" opacity="0.8" />
        <line x1="44" y1="260" x2="52" y2="260" stroke="#DAA520" strokeWidth="0.5" opacity="0.8" />
        <text x="40" y="155" textAnchor="middle" fill="#DAA520" fontSize="8" fontFamily="monospace" transform="rotate(-90 40 155)">
          H
        </text>

        {/* Dimension line — width top */}
        <line x1="60" y1="278" x2="180" y2="278" stroke="#DAA520" strokeWidth="0.5" opacity="0.8" />
        <line x1="60" y1="274" x2="60" y2="282" stroke="#DAA520" strokeWidth="0.5" opacity="0.8" />
        <line x1="180" y1="274" x2="180" y2="282" stroke="#DAA520" strokeWidth="0.5" opacity="0.8" />
        <text x="120" y="295" textAnchor="middle" fill="#DAA520" fontSize="8" fontFamily="monospace">
          W
        </text>

        {/* Leader lines with numbered callouts */}
        {[
          { x1: 180, y1: 50, x2: 210, y2: 50, n: "1" },
          { x1: 180, y1: 88, x2: 210, y2: 88, n: "2" },
          { x1: 180, y1: 150, x2: 210, y2: 150, n: "3" },
          { x1: 180, y1: 238, x2: 210, y2: 238, n: "4" },
        ].map((cb) => (
          <g key={cb.n}>
            <line
              x1={cb.x1}
              y1={cb.y1}
              x2={cb.x2}
              y2={cb.y2}
              stroke="#FFFFFF"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <circle cx={cb.x2 + 2} cy={cb.y2} r="7" fill="#DAA520" opacity="0.95" />
            <text
              x={cb.x2 + 2}
              y={cb.y2 + 3}
              textAnchor="middle"
              fill="#0D0D0D"
              fontSize="8"
              fontFamily="sans-serif"
              fontWeight="700"
            >
              {cb.n}
            </text>
          </g>
        ))}
      </svg>

      {/* Corner mark — top-left */}
      <span className="absolute top-3 left-4 text-[9px] uppercase tracking-[0.22em] text-gold/70 font-semibold">
        AIHAA / TECH
      </span>
    </div>
  );
}

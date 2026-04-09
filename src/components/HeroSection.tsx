"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      style={{ minHeight: "92vh", background: "#0D0D0D" }}
      className="relative flex items-center overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 65% 50%, rgba(218,165,32,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Wave bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "#FFFDE7",
          clipPath: "ellipse(55% 100% at 50% 100%)",
          zIndex: 1,
        }}
      />

      {/* Main content — 2 column */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-center gap-12 md:gap-8">
        {/* LEFT COLUMN — text content, below image on mobile */}
        <div className="flex-1 flex flex-col items-start order-last md:order-first">
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.14em",
              color: "#DAA520",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            PENAPIS AIR PREMIUM · SEKALI BAYAR
          </p>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 2.6vw, 3.2rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              marginBottom: "2rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Air Bersih.
            <br />
            Tanpa Bayaran Bulanan.
          </h1>

          {/* Price */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "0.25rem",
              }}
            >
              Bermula dari
            </p>
            <p
              style={{
                fontSize: "clamp(4rem, 7vw, 6rem)",
                fontWeight: 900,
                color: "#DAA520",
                lineHeight: 1,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              RM399
            </p>
          </div>

          {/* Single CTA */}
          <a
            href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#DAA520",
              color: "#0D0D0D",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px 36px",
              borderRadius: "999px",
              textDecoration: "none",
              marginBottom: "2rem",
              whiteSpace: "nowrap",
            }}
          >
            WhatsApp Untuk Beli Sekarang →
          </a>

          {/* Trust bar */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {["Sekali Bayar", "Pemasangan Percuma", "Waranti 2 Tahun"].map(
              (item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="7" fill="rgba(218,165,32,0.2)" />
                    <path
                      d="M4 7l2 2 4-4"
                      stroke="#DAA520"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT COLUMN — Product image, shows first on mobile */}
        <div className="flex-1 flex items-center justify-center w-full order-first md:order-last">
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              border: "1px solid rgba(218,165,32,0.25)",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#1A1A1A",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/bella/poster.jpg"
              alt="AIHAA BELLA Water Purifier"
              style={{ width: "100%", maxHeight: "280px", objectFit: "contain", display: "block", margin: "0 auto" }}
              className="md:!max-h-none"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              style={{
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
                gap: "8px",
              }}
            >
              <p
                style={{
                  color: "#DAA520",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                AIHAA BELLA
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                }}
              >
                RM1,080
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

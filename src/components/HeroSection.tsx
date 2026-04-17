"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl } from "@/lib/config/contact";

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
          {/* Eyebrow — pill with gold dot */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(218,165,32,0.35)",
              padding: "6px 14px 6px 18px",
              borderRadius: "999px",
              marginBottom: "1.75rem",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "8px",
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                background: "#DAA520",
                boxShadow: "0 0 12px rgba(218,165,32,0.8)",
              }}
            />
            <span
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                color: "#DAA520",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Penapis Air Premium · Sekali Bayar
            </span>
          </div>

          {/* Headline — editorial serif with italic accent */}
          <h1
            style={{
              fontSize: "clamp(2.6rem, 3.6vw, 4.2rem)",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Air Bersih.
            <br />
            <span
              style={{
                fontStyle: "italic",
                color: "rgba(255,255,255,0.78)",
                fontWeight: 400,
              }}
            >
              Tanpa Bayaran Bulanan.
            </span>
          </h1>

          {/* Price — refined editorial ratio */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "0.4rem",
                fontWeight: 600,
              }}
            >
              Bermula dari
            </p>
            <p
              style={{
                fontSize: "clamp(3.5rem, 6.4vw, 5.2rem)",
                fontWeight: 800,
                color: "#DAA520",
                lineHeight: 1,
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "-0.02em",
                display: "inline-flex",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "0.32em", marginTop: "0.6em", marginRight: "4px", fontWeight: 600 }}>RM</span>
              399
            </p>
          </div>

          {/* Single CTA — pill editorial */}
          <a
            href={whatsappUrl(t.common_whatsapp_message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-shimmer"
            style={{
              fontSize: "14px",
              padding: "16px 36px",
              textDecoration: "none",
              marginBottom: "2rem",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px -8px rgba(218, 165, 32, 0.45)",
            }}
          >
            WhatsApp Untuk Beli Sekarang →
          </a>

          {/* Trust bar — editorial spacing, bordered top */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              width: "100%",
            }}
          >
            {["Sekali Bayar", "Pemasangan Percuma", "Waranti 2 Tahun"].map(
              (item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "rgba(218,165,32,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M4 7l2 2 4-4"
                        stroke="#DAA520"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.78)",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT COLUMN — Product image with editorial frame, shows first on mobile */}
        <div className="flex-1 flex items-center justify-center w-full order-first md:order-last">
          <div
            className="relative"
            style={{
              width: "100%",
              maxWidth: "460px",
              border: "1px solid rgba(218,165,32,0.25)",
              borderRadius: "4px",
              overflow: "hidden",
              background: "#1A1A1A",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(218,165,32,0.05)",
            }}
          >
            {/* Floating product name tag — editorial overlay */}
            <div
              style={{
                position: "absolute",
                left: "-16px",
                bottom: "-16px",
                background: "#0D0D0D",
                border: "1px solid rgba(218,165,32,0.3)",
                padding: "18px 22px",
                zIndex: 20,
                minWidth: "180px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#FFFFFF",
                  marginBottom: "2px",
                  fontWeight: 500,
                }}
              >
                AIHAA BELLA
              </p>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#DAA520",
                  letterSpacing: "-0.01em",
                }}
              >
                RM1,080
              </p>
            </div>
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

"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronUp } from "lucide-react";

export default function FloatingButtons() {
  const [showBanner, setShowBanner] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Promotional Banner */}
      {showBanner && (
        <div className="fixed bottom-24 right-4 z-50 promo-slide-in">
          <div className="relative bg-white border border-[rgba(218,165,32,0.15)] rounded-xl p-4 pr-10 shadow-gold-lg max-w-xs">
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-2 text-muted hover:text-dark transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/60115657084?text=Hai,%20saya%20nak%20tahu%20tentang%20promosi%20AIHAA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold-dark text-lg">%</span>
              </div>
              <div>
                <p className="text-dark font-semibold text-sm">
                  Pemasangan Percuma + Waranti 2 Tahun
                </p>
                <p className="text-muted text-xs">WhatsApp sekarang!</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20penapis%20air%20AIHAA.%20Boleh%20saya%20tahu%20lebih%20lanjut?"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 gold-gradient-bg text-white p-4 rounded-full shadow-gold transition-all duration-300 hover:scale-110 hover:opacity-90 animate-pulse-gold whatsapp-bounce"
      >
        <MessageCircle className="w-6 h-6" fill="white" />
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 bg-white border border-[rgba(218,165,32,0.15)] text-gold-dark p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gold hover:text-white animate-fade-in-up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

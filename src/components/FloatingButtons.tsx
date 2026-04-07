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
        <div className="fixed bottom-24 right-4 z-50 animate-fade-in-up">
          <div className="relative bg-navy-secondary border border-gold/30 rounded-xl p-4 pr-10 shadow-gold-lg max-w-xs">
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-2 text-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/60123456789?text=Hi%20AIHAA,%20I%20want%20to%20claim%20RM200%20discount"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold text-lg">%</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Get RM200 Discount Now
                </p>
                <p className="text-muted text-xs">T&C apply</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/60123456789?text=Hi%20AIHAA,%20I%20would%20like%20to%20know%20more%20about%20your%20water%20purifiers"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-gold"
      >
        <MessageCircle className="w-6 h-6" fill="white" />
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 bg-navy-secondary border border-gold/30 text-gold p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gold hover:text-navy-primary animate-fade-in-up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

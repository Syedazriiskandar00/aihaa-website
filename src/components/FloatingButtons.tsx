"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Chatbot from "./Chatbot";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useLanguage();

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
      {/* Chatbot — positioned at bottom-[88px] right-4 internally */}
      <Chatbot />

      {/* WhatsApp Button — below chatbot toggle */}
      <a
        href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 gold-gradient-bg text-white p-4 rounded-full shadow-gold transition-all duration-300 hover:scale-110 hover:opacity-90"
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

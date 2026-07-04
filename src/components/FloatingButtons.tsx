"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import Chatbot from "./Chatbot";

export default function FloatingButtons() {
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
      {/* Chatbot — self-positioned bottom-right (FAB when closed, panel when open) */}
      <Chatbot />

      {/* Scroll to Top — desktop only. On mobile it overlapped page content
          (/contact card) and the near-full-width chat panel; mobile relies on
          native flick-scroll / status-bar tap instead. */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-50 hidden md:block bg-white border border-[rgba(218,165,32,0.15)] text-gold-dark p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gold hover:text-white animate-fade-in-up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

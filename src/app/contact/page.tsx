"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactPage() {
  const { t } = useLanguage();
  const heroRef = useScrollReveal();
  const waRef = useScrollReveal();
  const infoRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── 1. HERO — compact, left-aligned ── */}
      <section className="bg-[#0D0D0D] pt-28 pb-14">
        <div ref={heroRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="scroll-reveal-child stagger-1 text-[10px] tracking-[0.25em] uppercase text-[#DAA520] mb-4">
            {t.contact_label}
          </p>
          <h1 className="scroll-reveal-child stagger-2 font-editorial text-[36px] lg:text-[48px] text-white mb-3">
            {t.contact_hero_title}
          </h1>
          <p className="scroll-reveal-child stagger-3 text-sm text-[#999]">
            {t.contact_hero_sub}
          </p>
        </div>
      </section>

      {/* ── 2. WHATSAPP CTA — focal point ── */}
      <section className="bg-[#FFFDE7] py-16 lg:py-20">
        <div ref={waRef} className="scroll-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — WhatsApp conversation mockup */}
            <div className="scroll-reveal-child stagger-1 max-w-[340px] mx-auto lg:mx-0">
              <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden border border-[rgba(0,0,0,0.06)]">
                {/* Mock header */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DAA520] flex items-center justify-center text-white text-xs font-bold">A</div>
                  <div>
                    <p className="text-white text-sm font-semibold">AIHAA</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <p className="text-[#8BCFB7] text-[10px]">online</p>
                    </div>
                  </div>
                </div>
                {/* Mock messages */}
                <div className="bg-[#ECE5DD] p-4 space-y-2.5 min-h-[260px]">
                  {/* User bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] text-[#111] text-[13px] leading-relaxed px-3 py-2 rounded-lg rounded-tr-sm max-w-[85%]">
                      {t.contact_mock_user1}
                    </div>
                  </div>
                  {/* Bot bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white text-[#111] text-[13px] leading-relaxed px-3 py-2 rounded-lg rounded-tl-sm max-w-[85%]">
                      {t.contact_mock_bot1}
                    </div>
                  </div>
                  {/* User bubble */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] text-[#111] text-[13px] leading-relaxed px-3 py-2 rounded-lg rounded-tr-sm max-w-[85%]">
                      {t.contact_mock_user2}
                    </div>
                  </div>
                  {/* Bot bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white text-[#111] text-[13px] leading-relaxed px-3 py-2 rounded-lg rounded-tl-sm max-w-[85%]">
                      {t.contact_mock_bot2}
                    </div>
                  </div>
                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-2.5 rounded-lg rounded-tl-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — CTA content */}
            <div className="scroll-reveal-child stagger-2">
              <h2 className="font-editorial text-3xl lg:text-[36px] text-[#0D0D0D] mb-4">
                {t.contact_wa_title}
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed mb-6">
                {t.contact_wa_desc}
              </p>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[t.contact_wa_badge1, t.contact_wa_badge2, t.contact_wa_badge3].map((badge) => (
                  <span key={badge} className="text-[11px] text-[#717171] border border-[rgba(0,0,0,0.1)] rounded-full px-3 py-1">
                    {badge}
                  </span>
                ))}
              </div>
              {/* CTA button */}
              <a
                href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full sm:w-auto sm:inline-block gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold text-center hover:opacity-90 transition-all hover:shadow-gold btn-shimmer text-lg"
              >
                {t.contact_wa_cta}
              </a>
              <p className="mt-4 text-[13px] text-[#999]">
                <a href="tel:+60115657084" className="hover:text-[#717171] transition-colors">
                  {t.contact_wa_alt}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. INFO — 3-column grid ── */}
      <section className="bg-white py-16">
        <div ref={infoRef} className="scroll-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <div className="scroll-reveal-child stagger-1 bg-[#FFFDE7] rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-[#0D0D0D] mb-2">{t.contact_info_wa_title}</h3>
              <a href="tel:+60115657084" className="text-lg font-bold text-[#DAA520] hover:opacity-80 transition-opacity block mb-1">
                +6011-5657 7084
              </a>
              <p className="text-xs text-[#717171]">{t.contact_info_wa_sub}</p>
            </div>

            {/* Email */}
            <div className="scroll-reveal-child stagger-2 bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)]">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-[#0D0D0D] mb-2">{t.contact_email}</h3>
              <p className="text-sm text-[#717171] mb-1">aihaa.marketing@gmail.com</p>
              <p className="text-xs text-[#999]">{t.contact_info_email_sub}</p>
            </div>

            {/* Operating Hours */}
            <div className="scroll-reveal-child stagger-3 bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)]">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-[#0D0D0D] mb-2">{t.contact_hours_title}</h3>
              <p className="text-sm text-[#717171]">{t.contact_hours_weekday}</p>
              <p className="text-sm text-[#717171]">{t.contact_hours_saturday}</p>
              <p className="text-sm text-[#717171]">{t.contact_hours_closed}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. LOCATION + Google Maps ── */}
      <section className="bg-[#F5F5F5] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
            <h2 className="text-lg font-bold text-[#0D0D0D]">AIHAA Marketing SDN BHD</h2>
            <p className="text-sm text-[#717171]">Batu Pahat, Johor, Malaysia</p>
            <p className="text-xs text-[#999] mt-1">SSM: 1263314-X</p>
          </div>
          {/* Map Placeholder */}
          <div className="rounded-xl overflow-hidden bg-[#1a1a1a] min-h-[320px] flex flex-col items-center justify-center border border-[rgba(218,165,32,0.15)]">
            <svg className="w-12 h-12 text-[#DAA520] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-[#DAA520] text-xl font-bold mb-1">Batu Pahat, Johor</p>
            <p className="text-[#777] text-sm">Malaysia</p>
          </div>
          <p className="text-center mt-4">
            <a
              href="https://maps.google.com/?q=Batu+Pahat,Johor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#DAA520] hover:underline"
            >
              {t.contact_maps_link}
            </a>
          </p>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

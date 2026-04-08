"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `${formData.name}: ${formData.message} (${formData.email}, ${formData.phone})`;
    window.open(
      `https://wa.me/60115657084?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero - Dark */}
      <section className="relative pt-20 pb-16 bg-dark">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)] mb-4">
              {t.contact_label}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.contact_title} <span className="gold-gradient-text">AIHAA</span>
            </h1>
            <p className="text-muted-dark text-lg max-w-2xl mx-auto">
              {t.contact_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content - Light */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 border border-[rgba(218,165,32,0.15)]">
              <h2 className="text-2xl font-bold text-dark mb-6">
                {t.contact_form_title}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-muted text-sm mb-2">
                    {t.contact_name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder={t.contact_name_placeholder}
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">
                    {t.contact_email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder={t.contact_email_placeholder}
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">
                    {t.contact_phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder={t.contact_phone_placeholder}
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">
                    {t.contact_message} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder={t.contact_message_placeholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
                >
                  <Send className="w-5 h-5" />
                  {t.contact_submit}
                </button>
              </form>

              {/* WhatsApp Direct Link */}
              <div className="mt-6 pt-6 border-t border-[rgba(218,165,32,0.15)]">
                <p className="text-muted text-sm text-center mb-4">
                  {t.contact_or}
                </p>
                <a
                  href={`https://wa.me/60115657084?text=${encodeURIComponent(t.common_whatsapp_message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.contact_whatsapp}
                </a>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Info strip */}
              <div className="bg-white rounded-2xl p-5 border border-[rgba(218,165,32,0.15)] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DAA520]" />
                <p className="text-[#717171] text-sm">
                  {t.contact_info_strip}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">{t.contact_phone}</h3>
                  <p className="text-muted">+6011-5657 7084</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">{t.contact_email}</h3>
                  <p className="text-muted text-sm">aihaa.marketing@gmail.com</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">{t.cta_location}</h3>
                  <p className="text-muted text-sm">AIHAA Marketing SDN BHD, Batu Pahat, Johor</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">{t.contact_hours_title}</h3>
                  <p className="text-muted text-sm">{t.contact_hours_weekday}</p>
                  <p className="text-muted text-sm">{t.contact_hours_saturday}</p>
                  <p className="text-muted text-sm">{t.contact_hours_closed}</p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-4 border border-[rgba(218,165,32,0.15)]">
                <div className="aspect-video bg-surface rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface to-white" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                    <p className="text-dark font-medium">AIHAA Marketing SDN BHD</p>
                    <p className="text-muted text-sm">Batu Pahat, Johor, Malaysia</p>
                  </div>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(218, 165, 32, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(218, 165, 32, 0.5) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

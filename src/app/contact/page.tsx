"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hai, saya ${formData.name} ingin bertanya tentang penapis air AIHAA. ${formData.message}`;
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
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Hubungi <span className="gold-gradient-text">Kami</span>
            </h1>
            <p className="text-muted-dark text-lg max-w-2xl mx-auto">
              Ada soalan? Pakar penapis air kami sedia membantu anda mencari
              penyelesaian terbaik.
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
                Hantar Mesej
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-muted text-sm mb-2">
                    Nama *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder="Nama penuh anda"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder="email@anda.com"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">
                    No. Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder="+60 12-345 6789"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">
                    Mesej *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface border border-[rgba(218,165,32,0.15)] rounded-xl px-4 py-3 text-dark placeholder-muted focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Beritahu kami bagaimana kami boleh membantu anda..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
                >
                  <Send className="w-5 h-5" />
                  Hantar
                </button>
              </form>

              {/* WhatsApp Direct Link */}
              <div className="mt-6 pt-6 border-t border-[rgba(218,165,32,0.15)]">
                <p className="text-muted text-sm text-center mb-4">
                  Atau hubungi kami terus
                </p>
                <a
                  href="https://wa.me/60115657084?text=Hai,%20saya%20ingin%20bertanya%20tentang%20penapis%20air%20AIHAA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Kami
                </a>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Info strip */}
              <div className="bg-white rounded-2xl p-5 border border-[rgba(218,165,32,0.15)] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DAA520]" />
                <p className="text-[#717171] text-sm">
                  <span className="text-[#0D0D0D] font-medium">
                    WhatsApp response dalam masa 24 jam
                  </span>{" "}
                  · Meliputi seluruh Semenanjung Malaysia
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">Telefon</h3>
                  <p className="text-muted">+6011-5657 7084</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">Email</h3>
                  <p className="text-muted text-sm">
                    aihaa.marketing@gmail.com
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">Lokasi</h3>
                  <p className="text-muted text-sm">
                    AIHAA Marketing SDN BHD, Batu Pahat, Johor, Malaysia
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[rgba(218,165,32,0.15)]">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-dark font-semibold mb-1">
                    Waktu Operasi
                  </h3>
                  <p className="text-muted text-sm">
                    Isnin - Jumaat: 9AM - 6PM
                  </p>
                  <p className="text-muted text-sm">Sabtu: 10AM - 4PM</p>
                  <p className="text-muted text-sm">
                    Ahad & Cuti Umum: Tutup
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-4 border border-[rgba(218,165,32,0.15)]">
                <div className="aspect-video bg-surface rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface to-white" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                    <p className="text-dark font-medium">
                      AIHAA Marketing SDN BHD
                    </p>
                    <p className="text-muted text-sm">
                      Batu Pahat, Johor, Malaysia
                    </p>
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

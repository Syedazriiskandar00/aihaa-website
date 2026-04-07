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
    // Handle form submission
    const whatsappMessage = `Hi AIHAA, I'm ${formData.name}. ${formData.message} (Email: ${formData.email}, Phone: ${formData.phone})`;
    window.open(`https://wa.me/60123456789?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-navy-primary">
      <Header />

      {/* Hero */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-navy-primary to-navy-secondary">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #D4A843 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-gold/30 mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Reach To Us <span className="gold-gradient-text">Now</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Have questions? Our water purification experts are ready to help you find the perfect solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-navy-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-navy-primary/50 backdrop-blur-sm rounded-3xl p-8 border border-gold/20">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-muted text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-navy-secondary border border-gold/20 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-navy-secondary border border-gold/20 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-navy-secondary border border-gold/20 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-gold transition-colors"
                    placeholder="+60 12-345 6789"
                  />
                </div>

                <div>
                  <label className="block text-muted text-sm mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-navy-secondary border border-gold/20 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-navy-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:shadow-gold"
                >
                  <Send className="w-5 h-5" />
                  Submit Message
                </button>
              </form>

              {/* WhatsApp Direct Link */}
              <div className="mt-6 pt-6 border-t border-gold/20">
                <p className="text-muted text-sm text-center mb-4">Or chat with us directly</p>
                <a
                  href="https://wa.me/60123456789?text=Hi%20AIHAA,%20I%20have%20a%20question"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-navy-primary/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-muted">+60 12-345 6789</p>
                </div>

                <div className="bg-navy-primary/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-muted">sales@aihaa.com.my</p>
                </div>

                <div className="bg-navy-primary/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Address</h3>
                  <p className="text-muted text-sm">123 Jalan Ampang, 50450 Kuala Lumpur, Malaysia</p>
                </div>

                <div className="bg-navy-primary/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Operating Hours</h3>
                  <p className="text-muted text-sm">Mon - Fri: 9AM - 6PM</p>
                  <p className="text-muted text-sm">Sat: 10AM - 4PM</p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-navy-primary/50 backdrop-blur-sm rounded-2xl p-4 border border-gold/20">
                <div className="aspect-video bg-navy-secondary rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-light to-navy-primary" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-gold mx-auto mb-2" />
                    <p className="text-white font-medium">AIHAA Headquarters</p>
                    <p className="text-muted text-sm">Kuala Lumpur, Malaysia</p>
                  </div>
                  {/* Grid overlay to simulate map */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 67, 0.5) 1px, transparent 1px)`,
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

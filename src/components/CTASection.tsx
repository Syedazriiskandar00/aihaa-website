"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CTASection() {
  const revealRef = useScrollReveal();

  return (
    <section className="bg-dark py-16 lg:py-20">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Need Expert Advice?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
              Reach To Us <span className="gold-gradient-text">Now</span>
            </h2>
            <p className="text-muted-dark mb-8 max-w-md">
              Our water purification experts are ready to help you find the perfect
              solution for your home. Get personalized recommendations and exclusive
              offers today.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-muted-dark text-sm">Hubungi Kami</p>
                  <p className="text-white font-medium">+6011-5657 084</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-muted-dark text-sm">Email Kami</p>
                  <p className="text-white font-medium">aihaa.marketing@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-muted-dark text-sm">Lokasi</p>
                  <p className="text-white font-medium">Semenanjung Malaysia</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20penapis%20air%20AIHAA.%20Boleh%20saya%20tahu%20lebih%20lanjut?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right Content — Sales Expert Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(218,165,32,0.2)]">
              <Image
                src="/images/products/sales-expert.png"
                alt="AIHAA Sales Expert"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-3 -right-3 bg-gold text-white px-4 py-2 rounded-full font-bold text-sm shadow-gold z-10">
              Respon Pantas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

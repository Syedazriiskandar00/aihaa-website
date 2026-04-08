"use client";

import { DollarSign, Truck, Wrench, Thermometer } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  {
    icon: DollarSign,
    title: "Sekali Bayar Tanpa Bulanan",
    description: "Beli sekali, guna bertahun. Tiada komitmen bayaran bulanan. Dari RM399.",
    highlight: "Dari RM399",
  },
  {
    icon: Truck,
    title: "Pemasangan Percuma",
    description: "Penghantaran dan pemasangan percuma ke seluruh Semenanjung Malaysia",
    highlight: "Semenanjung MY",
  },
  {
    icon: Wrench,
    title: "Waranti Sehingga 2 Tahun",
    description: "Setiap pembelian disertakan waranti sehingga 2 tahun untuk ketenangan anda",
    highlight: "2 Tahun",
  },
  {
    icon: Thermometer,
    title: "Halal & Bumiputera Certified",
    description: "Diperakui Halal oleh JAKIM dan syarikat bertaraf Bumiputera",
    highlight: "JAKIM",
  },
];

export default function BenefitsSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="bg-surface py-16 lg:py-20">
      <div ref={revealRef} className="scroll-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-reveal-child stagger-1">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Kenapa Pilih <span className="gold-gradient-text">AIHAA</span>?
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Penapis air berkualiti tinggi dengan kelebihan dan servis tiada tandingan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-white border border-[rgba(218,165,32,0.15)] rounded-2xl p-6 text-center card-hover group scroll-reveal-child stagger-${index + 2}`}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-gold" />
              </div>

              <div className="bg-gold/10 text-gold-dark text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3">
                {benefit.highlight}
              </div>

              <h3 className="text-dark font-semibold text-lg mb-2">
                {benefit.title}
              </h3>

              <p className="text-muted text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { DollarSign, Truck, Wrench, Thermometer } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Affordable & Flexible Plan",
    description: "Starting from RM54/month with flexible payment options",
    highlight: "From RM54/mo",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free delivery and professional installation nationwide",
    highlight: "Nationwide",
  },
  {
    icon: Wrench,
    title: "Free Maintenance",
    description: "Up to 7 years of free maintenance service every 2 months",
    highlight: "Up to 7 Years",
  },
  {
    icon: Thermometer,
    title: "Various Water Temperature",
    description: "Hot, Ambient, Room & Cold water at your fingertips",
    highlight: "4 Options",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-navy-secondary py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="gold-gradient-text">AIHAA</span>?
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Experience premium water purification with unmatched benefits and services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-navy-primary/50 backdrop-blur-sm border border-gold/20 rounded-2xl p-6 text-center card-hover group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-gold" />
              </div>

              <div className="bg-gold/10 text-gold text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3">
                {benefit.highlight}
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">
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

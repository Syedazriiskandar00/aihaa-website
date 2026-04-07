"use client";

import { useEffect, useState, useRef } from "react";
import { FlaskRound, Users, Home, Building2, Award } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: 10000,
    suffix: "+",
    label: "Pelanggan Berpuas Hati",
    display: "10,000",
  },
  {
    icon: Building2,
    value: 1,
    suffix: "",
    label: "Seluruh Semenanjung Malaysia",
    display: "SM",
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    label: "Bumiputera & Halal JAKIM",
    display: "HALAL",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Teknisyen Bertauliah",
    display: "50",
  },
  {
    icon: FlaskRound,
    value: 4,
    suffix: "",
    label: "Tahap Penapisan",
    display: "4",
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111111] py-16 lg:py-24 overflow-hidden border-t border-t-[rgba(218,165,32,0.1)]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            Kenapa Pilih AIHAA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Dipercayai Ribuan{" "}
            <span className="gold-gradient-text">Keluarga Malaysia</span>
          </h2>
          <p className="text-muted-dark max-w-2xl mx-auto">
            Bumiputera & Halal JAKIM certified. Sekali bayar, tanpa komitmen bulanan.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-[#1E1E1E] backdrop-blur-sm border border-[rgba(218,165,32,0.2)] border-t-2 border-t-gold rounded-2xl ${
                isInView ? "count-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gold/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-gold" />
              </div>

              <div className="text-3xl md:text-4xl font-bold gold-gradient-text mb-2">
                {stat.display}
                {stat.suffix}
              </div>

              <p className="text-muted-dark text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Clock, Gift, ChevronDown, ChevronUp } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Promosi Sekali Bayar",
    description:
      "Beli mana-mana penapis air AIHAA dan dapatkan pemasangan percuma + waranti penuh. Tiada caj tersembunyi, tiada kontrak.",
    badge: "Sepanjang Masa",
    cta: "WhatsApp Sekarang",
    highlight: true,
  },
  {
    id: 2,
    title: "Trade-In Jenama Lain",
    description:
      "Tukar penapis air jenama lain kepada AIHAA dan dapatkan diskaun istimewa. Kami terima semua jenama.",
    badge: "Terhad",
    cta: "Tanya Harga Trade-In",
    highlight: false,
  },
  {
    id: 3,
    title: "Pakej Dalam + Luar Rumah",
    description:
      "Beli penapis air dalam rumah dan luar rumah sekali — jimat lagi. Pakej bermula dari RM799.",
    badge: "Jimat",
    cta: "Lihat Pakej",
    highlight: false,
  },
  {
    id: 4,
    title: "Rujuk Kawan, Dapat Hadiah",
    description:
      "Rujuk kawan atau keluarga untuk beli AIHAA. Setiap rujukan berjaya, anda dan kawan dapat hadiah istimewa.",
    badge: "Program Rujukan",
    cta: "Ketahui Lebih Lanjut",
    highlight: false,
  },
];

const termsAndConditions = [
  {
    title: "Terma Am",
    content:
      "Promosi tertakluk kepada stok yang ada. AIHAA berhak mengubah terma promosi tanpa notis awal.",
  },
  {
    title: "Pemasangan Percuma",
    content:
      "Pemasangan percuma hanya untuk Semenanjung Malaysia. Kawasan luar liputan mungkin dikenakan caj tambahan.",
  },
  {
    title: "Waranti",
    content:
      "Waranti tidak meliputi kerosakan akibat kecuaian pengguna. Waranti sehingga 2 tahun untuk model indoor, 1 tahun untuk outdoor.",
  },
  {
    title: "Trade-In",
    content:
      "Trade-in tertakluk kepada penilaian kondisi unit lama oleh teknisyen AIHAA. Diskaun bergantung kepada jenama dan keadaan unit.",
  },
  {
    title: "Pertanyaan",
    content:
      "Untuk sebarang pertanyaan mengenai promosi, hubungi WhatsApp +6011-5657 7084.",
  },
];

const timerLabels: Record<string, string> = {
  days: "Hari",
  hours: "Jam",
  minutes: "Minit",
  seconds: "Saat",
};

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference =
        new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-dark border border-[rgba(218,165,32,0.3)] rounded-xl flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-gold">
              {value}
            </span>
          </div>
          <p className="text-muted-dark text-xs mt-2 uppercase">
            {timerLabels[unit] || unit}
          </p>
        </div>
      ))}
    </div>
  );
}

function AccordionItem({
  title,
  content,
  isOpen,
  onClick,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-[rgba(218,165,32,0.15)] rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-surface text-left"
      >
        <span className="text-dark font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gold" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gold" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <p className="text-muted text-sm">{content}</p>
        </div>
      )}
    </div>
  );
}

export default function PromotionsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner - Dark */}
      <section className="relative pt-20 pb-16 bg-dark overflow-hidden">
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
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)] mb-4">
              <Gift className="w-4 h-4" />
              Tawaran Istimewa
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Promosi <span className="gold-gradient-text">AIHAA</span>
            </h1>
            <p className="text-muted-dark text-lg max-w-2xl mx-auto mb-8">
              Jangan lepaskan tawaran eksklusif untuk penapis air premium AIHAA
            </p>

            {/* Countdown Timer */}
            <div className="bg-dark-alt/50 backdrop-blur-sm rounded-2xl p-6 border border-[rgba(218,165,32,0.3)] inline-block">
              <div className="flex items-center gap-2 justify-center mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-white font-medium">
                  Tawaran Tamat Dalam
                </span>
              </div>
              <CountdownTimer targetDate="2026-07-07" />
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Grid - Light */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`relative overflow-hidden rounded-2xl border p-6 lg:p-8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,32,0.12)] ${
                  promo.highlight
                    ? "border-[rgba(218,165,32,0.4)] md:col-span-2"
                    : "border-[rgba(218,165,32,0.15)]"
                }`}
              >
                {/* Gold accent for highlight */}
                {promo.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] gold-gradient-bg" />
                )}

                <div className="flex items-start gap-4">
                  <div>
                    <span className="inline-block bg-gold/10 text-[#DAA520] text-xs font-medium px-3 py-1 rounded-full border border-[rgba(218,165,32,0.2)] mb-3">
                      {promo.badge}
                    </span>
                    <h3 className="text-xl font-bold text-dark mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-muted mb-6">{promo.description}</p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/60115657084?text=${encodeURIComponent(
                    `Hai, saya berminat dengan promosi ${promo.title}. Boleh saya tahu lebih lanjut?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block gold-gradient-bg text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
                >
                  {promo.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terma & Syarat - White */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-8 text-center">
            Terma & Syarat
          </h2>
          <div className="space-y-4">
            {termsAndConditions.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                isOpen={openAccordion === index}
                onClick={() =>
                  setOpenAccordion(openAccordion === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

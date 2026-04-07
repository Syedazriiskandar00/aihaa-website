"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Clock, Gift, Percent, ChevronDown, ChevronUp } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Trade-In Offer",
    description: "Trade in your old water purifier and get up to 50% off on any new AIHAA model",
    discount: "50% OFF",
    validUntil: "2024-12-31",
    color: "from-gold/20 to-amber-500/20",
  },
  {
    id: 2,
    title: "Free Installation",
    description: "Get free professional installation worth RM200 on all water purifiers",
    discount: "RM200 FREE",
    validUntil: "2024-12-31",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Referral Bonus",
    description: "Refer a friend and both get RM100 rebate on your next payment",
    discount: "RM100 x2",
    validUntil: "2024-12-31",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Bundle Deal",
    description: "Purchase any 2 products and enjoy additional 10% discount",
    discount: "10% OFF",
    validUntil: "2024-12-31",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

const termsAndConditions = [
  {
    title: "General Terms",
    content: "All promotions are subject to availability and may be withdrawn at any time without prior notice. AIHAA reserves the right to modify the terms and conditions of any promotion.",
  },
  {
    title: "Trade-In Offer",
    content: "Trade-in offer applies to functional water purifiers only. The discount percentage depends on the brand and condition of the traded item. Assessment will be done by AIHAA technicians.",
  },
  {
    title: "Free Installation",
    content: "Free installation is available for addresses within Klang Valley. Additional charges may apply for locations outside the service area.",
  },
  {
    title: "Referral Program",
    content: "Referral bonus will be credited after the referred customer completes their first month of rental payment. Both parties must be active customers to receive the bonus.",
  },
];

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
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
          <div className="w-16 h-16 md:w-20 md:h-20 bg-navy-primary border border-gold/30 rounded-xl flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-gold">{value}</span>
          </div>
          <p className="text-muted text-xs mt-2 uppercase">{unit}</p>
        </div>
      ))}
    </div>
  );
}

function AccordionItem({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-gold/20 rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-navy-secondary/50 text-left"
      >
        <span className="text-white font-medium">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gold" /> : <ChevronDown className="w-5 h-5 text-gold" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-navy-primary/50">
          <p className="text-muted text-sm">{content}</p>
        </div>
      )}
    </div>
  );
}

export default function PromotionsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-navy-primary">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-navy-primary to-navy-secondary overflow-hidden">
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
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-gold/30 mb-4">
              <Gift className="w-4 h-4" />
              Limited Time Offers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Current <span className="gold-gradient-text">Promotions</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
              Don't miss out on these exclusive deals and discounts on our premium water purifiers
            </p>

            {/* Countdown Timer */}
            <div className="bg-navy-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 inline-block">
              <div className="flex items-center gap-2 justify-center mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-white font-medium">Offer Ends In</span>
              </div>
              <CountdownTimer targetDate="2024-12-31" />
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="bg-navy-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.color} border border-gold/20 p-6 lg:p-8 card-hover`}
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-gold text-navy-primary px-3 py-1 rounded-full text-sm font-bold">
                    {promo.discount}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Percent className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-muted mb-4">{promo.description}</p>
                    <p className="text-gold text-sm">Valid until: {new Date(promo.validUntil).toLocaleDateString()}</p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/60123456789?text=Hi%20AIHAA,%20I'm%20interested%20in%20the%20${promo.title}%20promotion`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block gold-gradient-bg text-navy-primary px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
                >
                  Claim Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="bg-navy-primary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Terms & Conditions</h2>
          <div className="space-y-4">
            {termsAndConditions.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                isOpen={openAccordion === index}
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
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

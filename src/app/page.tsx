import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import WhyAihaaSection from "@/components/sections/WhyAihaaSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import CTASection from "@/components/CTASection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <WhyAihaaSection />
      <CategoryShowcase />
      {/* Gradient divider: white → dark */}
      <div
        className="h-10"
        style={{
          background:
            "linear-gradient(to bottom, #FFFFFF 0%, #E8E8E8 30%, #888888 60%, #333333 85%, #0D0D0D 100%)",
        }}
      />
      <CTASection />
      <CertificationsSection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

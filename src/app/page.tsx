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
      <CTASection />
      <CertificationsSection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

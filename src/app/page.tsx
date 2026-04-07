import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProductsSection from "@/components/ProductsSection";
import StatsSection from "@/components/StatsSection";
import CertificationsSection from "@/components/CertificationsSection";
import CTASection from "@/components/CTASection";
import CrossSellSection from "@/components/CrossSellSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-primary">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProductsSection />
      <StatsSection />
      <CertificationsSection />
      <CTASection />
      <CrossSellSection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

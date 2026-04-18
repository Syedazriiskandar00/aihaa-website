import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import SignatureCollection from "@/components/home/SignatureCollection";
import BenefitsSection from "@/components/BenefitsSection";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import CertificationsSection from "@/components/CertificationsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      {/* SPEC §1.1 — dark hero with 5-pedestal lineup + dual CTA */}
      <HomeHero />
      {/* SPEC §1.2 — Indoor/Outdoor tab toggle, 4 featured per tab */}
      <SignatureCollection />
      {/* SPEC §1.3 — Kenapa Pilih AIHAA (unchanged from pre-Phase-4) */}
      <BenefitsSection />
      {/* SPEC §1.4 — zigzag testimonials */}
      <HomeTestimonials />
      {/* Brand-critical retention — Halal JAKIM + Bumiputera + ISO badges */}
      <CertificationsSection />
      {/* Pre-footer call-to-action */}
      <CTASection />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

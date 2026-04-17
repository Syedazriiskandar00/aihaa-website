import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import HeartServiceHero from "./components/HeartServiceHero";
import IndoorServiceHeader from "./components/IndoorServiceHeader";
import ThirteenCheckPoint from "./components/ThirteenCheckPoint";
import EightStepGallery from "./components/EightStepGallery";
import FilterPricingCards from "./components/FilterPricingCards";
import SandTypesShowcase from "./components/SandTypesShowcase";
import FiveCheckPointOutdoor from "./components/FiveCheckPointOutdoor";
import SandReplacementPricing from "./components/SandReplacementPricing";

export const metadata: Metadata = {
  title: "Servis Penapis Air AIHAA — Jadual, Harga & Titik Pemeriksaan",
  description:
    "Servis penyelenggaraan setiap 6 bulan untuk penapis air dalam (13 titik) dan luar (5 titik). Juruteknik terlatih. Harga telus RM160 ke atas.",
  openGraph: {
    title: "Servis Penapis Air AIHAA",
    description:
      "Penyelenggaraan 6 bulan sekali. 13 titik pemeriksaan indoor, 5 titik outdoor. Harga telus dari RM160.",
    type: "website",
    locale: "ms_MY",
  },
};

export default function ServicePage() {
  return (
    <>
      <Header />
      <main>
        {/* Indoor service — story first */}
        <HeartServiceHero />
        <IndoorServiceHeader />
        <ThirteenCheckPoint />
        <FilterPricingCards />
        <EightStepGallery />
        {/* Outdoor service */}
        <SandTypesShowcase />
        <FiveCheckPointOutdoor />
        <SandReplacementPricing />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

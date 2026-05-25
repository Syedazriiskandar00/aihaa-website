import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import IndoorHeroLineup from "./components/IndoorHeroLineup";
import IndoorUseCases from "./components/IndoorUseCases";
import IndoorGrid from "./components/IndoorGrid";

export const metadata: Metadata = {
  title: "Penapis Air Dalam AIHAA — 5 Model Premium",
  description:
    "Penapis air dalam rumah AIHAA — 5 model premium dari RM780. BELLA, BIG, EAN, FANCY, WINTER. Sekali bayar, pemasangan percuma seluruh Semenanjung Malaysia.",
  openGraph: {
    title: "Penapis Air Dalam AIHAA — 5 Model Premium",
    description:
      "Lima model penapis dalam rumah untuk setiap saiz keluarga. Sekali bayar, pemasangan percuma.",
    type: "website",
    locale: "ms_MY",
  },
};

export default function ProdukDalamPage() {
  return (
    <>
      <Header />
      <main>
        <IndoorHeroLineup />
        <IndoorUseCases />
        <IndoorGrid />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

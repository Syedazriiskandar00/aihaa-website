import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SageHeroLineup from "./components/SageHeroLineup";
import OutdoorUseCases from "./components/OutdoorUseCases";
import OutdoorGrid from "./components/OutdoorGrid";

export const metadata: Metadata = {
  title: "Penapis Air Luar AIHAA — Koleksi Penuh 8 Model",
  description:
    "Penapis air luar rumah AIHAA — 8 model dari RM399. PVDF, Fiber, Super Pleated, UF Double Backwash, dan lebih. Sesuai untuk air boring, kolam, pejabat, kilang.",
  openGraph: {
    title: "Penapis Air Luar AIHAA — Koleksi Penuh",
    description:
      "8 model penapis luar rumah untuk setiap sumber air. Sekali bayar, pemasangan percuma.",
    type: "website",
    locale: "ms_MY",
  },
};

export default function ProdukLuarPage() {
  return (
    <>
      <Header />
      <main>
        <SageHeroLineup />
        <OutdoorUseCases />
        <OutdoorGrid />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

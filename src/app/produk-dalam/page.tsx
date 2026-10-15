import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import IndoorHeroLineup from "./components/IndoorHeroLineup";
import IndoorUseCases from "./components/IndoorUseCases";
import IndoorGrid from "./components/IndoorGrid";

export const metadata: Metadata = {
  title: "Penapis Air Dalam AIHAA — ULTRA ONE & AIHAA BIG",
  description:
    "Penapis air dalam rumah AIHAA dari RM399 — ULTRA ONE all-in-one direct minum dan AIHAA BIG kapasiti 17 liter. Sekali bayar, pemasangan percuma seluruh Semenanjung Malaysia.",
  openGraph: {
    title: "Penapis Air Dalam AIHAA — ULTRA ONE & AIHAA BIG",
    description:
      "Penapis dalam rumah untuk keluarga kecil dan besar. Sekali bayar, pemasangan percuma.",
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

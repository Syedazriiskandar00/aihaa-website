import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import KisahKami from "./components/KisahKami";
import HalalCommitment from "./components/HalalCommitment";
import AzleeCollabVideo from "./components/AzleeCollabVideo";
import TeamSection from "./components/TeamSection";
import CsrSumbangan from "./components/CsrSumbangan";

export const metadata: Metadata = {
  title: "Tentang AIHAA — Kisah, Halal Commitment & Pasukan",
  description:
    "Kisah AIHAA dari 2018. Sijil Halal JAKIM, kolaborasi jenama, pasukan, dan aktiviti tanggungjawab sosial di seluruh Semenanjung Malaysia.",
  openGraph: {
    title: "Tentang AIHAA — Kisah, Halal & Pasukan",
    description:
      "Kisah pengasas AIHAA, Halal JAKIM commitment, dan aktiviti komuniti di Malaysia.",
    type: "website",
    locale: "ms_MY",
  },
};

export default function TentangKamiPage() {
  return (
    <>
      <Header />
      <main>
        <KisahKami />
        <HalalCommitment />
        <AzleeCollabVideo />
        <TeamSection />
        <CsrSumbangan />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

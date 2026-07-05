import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

// Custom 404 — replaces the generic English Next.js fallback. Branded,
// Bahasa Malaysia, with Header/Footer nav and two clear ways out (home +
// WhatsApp). WhatsApp uses the MAIN contact number via whatsappUrl(),
// NOT the product rotator (a lost visitor isn't a product lead).

export const metadata = {
  title: "Halaman Tidak Dijumpai — AIHAA",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-surface min-h-[62vh] flex items-center justify-center px-5 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-editorial text-6xl md:text-7xl text-gold-dark leading-none mb-4">
            404
          </p>
          <h1 className="font-editorial text-3xl md:text-4xl text-dark leading-tight mb-4">
            Halaman Tidak Dijumpai
          </h1>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-muted max-w-md mx-auto mb-10">
            Maaf, halaman yang anda cari tiada atau telah dipindahkan. Jom
            kembali ke laman utama, atau WhatsApp kami kalau perlukan bantuan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gold text-dark px-7 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
            >
              <Home className="w-4 h-4" strokeWidth={2} />
              Kembali ke Laman Utama
            </Link>
            <a
              href={whatsappUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-dark/15 text-dark px-7 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:border-gold hover:text-gold-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              WhatsApp Kami
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

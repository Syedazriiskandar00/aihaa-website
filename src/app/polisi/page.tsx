import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { POLICY_DOCUMENTS } from "@/lib/data/policy";

// Halaman polisi syarikat. Badan teks datang VERBATIM dari dokumen HQ
// melalui src/lib/data/policy.ts — halaman ini cuma render, tidak menyunting.
// Sebarang perubahan ayat mesti bermula di HQ, bukan di sini.
//
// Server component sengaja: metadata mesti dieksport dari fail ini, jadi
// halaman TIDAK boleh panggil useLanguage() (LanguageContext ialah "use
// client"). Chrome halaman kekal BM selaras tapak; badan polisi kekal
// dalam bahasa asal HQ.

export const metadata: Metadata = {
  title: "Polisi Syarikat — AIHAA Marketing Sdn Bhd",
  description:
    "Terms & Conditions, Privacy Policy, Cancellation and Refund Policy dan Shipping Policy rasmi AIHAA Marketing Sdn Bhd.",
  openGraph: {
    title: "Polisi Syarikat — AIHAA Marketing Sdn Bhd",
    description:
      "Terms & Conditions, Privacy Policy, Cancellation and Refund Policy dan Shipping Policy rasmi AIHAA Marketing Sdn Bhd.",
    type: "website",
    locale: "ms_MY",
  },
};

export default function PolisiPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* ── HERO ── */}
        <section className="bg-surface pt-12 pb-14">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold-dark mb-4">
              AIHAA Marketing Sdn Bhd
            </p>
            <h1 className="font-editorial text-[36px] lg:text-[48px] text-dark leading-tight">
              Polisi Syarikat
            </h1>
          </div>
        </section>

        {/* ── KANDUNGAN ── */}
        <nav
          aria-label="Kandungan polisi"
          className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-8 pt-12"
        >
          <ul className="border-l-[3px] border-l-gold pl-6 space-y-2">
            {POLICY_DOCUMENTS.map((doc) => (
              <li key={doc.id}>
                <a
                  href={`#${doc.id}`}
                  className="text-[15px] text-[#555] hover:text-gold-dark transition-colors"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── DOKUMEN ── */}
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-8 py-12 space-y-16">
          {POLICY_DOCUMENTS.map((doc) => (
            <section key={doc.id} id={doc.id} className="scroll-mt-28">
              <h2 className="font-editorial text-[26px] lg:text-[30px] text-dark border-l-[3px] border-l-gold pl-4 mb-6">
                {doc.title}
              </h2>

              {doc.blocks.map((block, i) => {
                if (block.kind === "subheading") {
                  return (
                    <h3
                      key={i}
                      className="text-[15px] font-semibold text-dark mt-7 mb-2"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.kind === "list") {
                  return (
                    <ul
                      key={i}
                      className="list-disc pl-5 my-3 space-y-2 text-[15px] text-[#555] leading-[1.8]"
                    >
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={i}
                    className="text-[15px] text-[#555] leading-[1.8] my-3"
                  >
                    {block.text}
                  </p>
                );
              })}
            </section>
          ))}
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}

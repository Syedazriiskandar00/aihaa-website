import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "AIHAA | Penapis Air Premium Sekali Bayar Malaysia",
  description: "Penapis air berkualiti tinggi sekali bayar dari RM399. Pemasangan percuma, waranti 2 tahun. Halal JAKIM certified. 10,800+ keluarga percaya.",
  keywords: "penapis air, water purifier, AIHAA, Malaysia, sekali bayar, penapis air murah",
  openGraph: {
    title: "AIHAA | Penapis Air Premium Sekali Bayar Malaysia",
    description: "Penapis air berkualiti tinggi sekali bayar dari RM399. Pemasangan percuma, waranti 2 tahun. Halal JAKIM certified.",
    type: "website",
    url: "https://aihaa-website-five.vercel.app",
    siteName: "AIHAA Water Purifier",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "AIHAA Marketing SDN BHD",
              description: "Penapis air premium sekali bayar untuk keluarga Malaysia. Bumiputera & Halal JAKIM certified.",
              url: "https://aihaa-website-five.vercel.app",
              telephone: "+60115657084",
              email: "aihaa.marketing@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Batu Pahat",
                addressRegion: "Johor",
                addressCountry: "MY",
              },
              priceRange: "RM399 - RM1,580",
              openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
              sameAs: [
                "https://www.facebook.com/Aihaapenapisair/",
                "https://www.instagram.com/aihaa_hq/",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

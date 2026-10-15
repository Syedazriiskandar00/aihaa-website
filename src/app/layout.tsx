import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { PHONE_NUMBER_DISPLAY, EMAIL_ADDRESS, SOCIAL_LINKS } from "@/lib/config/contact";
import { SITE_URL, META_PIXEL_ID } from "@/lib/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AIHAA | Penapis Air Premium Sekali Bayar Malaysia",
  description: "Penapis air berkualiti tinggi sekali bayar dari RM399. Pemasangan percuma, waranti 2 tahun. Halal JAKIM certified. 10,800+ keluarga percaya.",
  keywords: "penapis air, water purifier, AIHAA, Malaysia, sekali bayar, penapis air murah",
  openGraph: {
    title: "AIHAA | Penapis Air Premium Sekali Bayar Malaysia",
    description: "Penapis air berkualiti tinggi sekali bayar dari RM399. Pemasangan percuma, waranti 2 tahun. Halal JAKIM certified.",
    type: "website",
    url: SITE_URL,
    siteName: "AIHAA Water Purifier",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className="scroll-smooth">
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
              url: SITE_URL,
              telephone: PHONE_NUMBER_DISPLAY,
              email: EMAIL_ADDRESS,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Batu Pahat",
                addressRegion: "Johor",
                addressCountry: "MY",
              },
              priceRange: "RM399 - RM1,299",
              openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
              sameAs: SOCIAL_LINKS.map((link) => link.href),
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white" suppressHydrationWarning>
        {/* Meta Pixel base code. fbevents.js tracks client-side route
            changes itself, so PageView is only fired here once. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

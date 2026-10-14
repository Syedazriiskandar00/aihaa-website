// Contact channels — single source of truth for the AIHAA office line
// and all pre-filled CTA messages. The office line (PHONE_NUMBER) is a
// 1300 hotline for calls only, dialled without a country code. WhatsApp
// has no single number: whatsappUrl() points at /api/wa, which rotates
// each click across the sales team in src/lib/chatbot/sales-team.ts.
export const PHONE_NUMBER = "1300824422" as const;
export const PHONE_NUMBER_DISPLAY = "1300-82-4422" as const;

// Must be rendered with a plain <a>, never next/link: a prefetch would
// hit /api/wa and use up a sales rep's turn.
export const whatsappUrl = (message: string): string =>
  `/api/wa?text=${encodeURIComponent(message)}`;

export const telHref = (): string => `tel:${PHONE_NUMBER}`;

export const EMAIL_ADDRESS = "aihaamarketing.01@gmail.com" as const;

// Official social accounts. Footer renders this list in order and the
// LocalBusiness JSON-LD in app/layout.tsx reuses the hrefs as `sameAs`.
export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    label: "@aihaawaterfiltermalaysia",
    href: "https://www.facebook.com/aihaawaterfiltermalaysia",
  },
  {
    name: "Instagram",
    label: "@aihaa_water_filter_elite",
    href: "https://www.instagram.com/aihaa_water_filter_elite",
  },
  {
    name: "Threads",
    label: "@aihaa_water_filter_elite",
    href: "https://www.threads.com/@aihaa_water_filter_elite",
  },
  {
    name: "TikTok",
    label: "@aihaa.elite",
    href: "https://www.tiktok.com/@aihaa.elite",
  },
  {
    name: "YouTube",
    label: "@aihaachannelhq",
    href: "https://www.youtube.com/@aihaachannelhq",
  },
] as const;

// Pre-filled message presets. Kept in BM since most CTAs originate from
// Malay-speaking funnels; callers may pass their own localized string to
// `whatsappUrl(...)` for EN surfaces.
export const whatsappMessages = {
  general: "Salam, saya berminat dengan produk AIHAA",
  serviceFilter: "Salam, saya nak tempah Servis Filter AIHAA",
  serviceSand: "Salam, saya nak tempah Servis Tukar Pasir AIHAA",
  productInquiry: (productName: string) => `Salam, saya berminat dengan ${productName}`,
  priceQuestion: "Hai, saya nak tanya harga penapis air AIHAA.",
  warrantyClaim: "Hai, saya nak claim warranty AIHAA.",
  support: "Hai, saya pelanggan AIHAA dan ada masalah dengan unit saya.",
  filterOrder: "Hai, saya nak order filter untuk penapis air AIHAA saya.",
  tradeIn: "Hai, saya nak tanya tentang program trade-in AIHAA.",
  modelAdvice: "Hai, saya nak tanya penapis air mana yang sesuai untuk saya.",
  galleryUpload: "Hai, saya nak hantar gambar pemasangan AIHAA saya!",
} as const;

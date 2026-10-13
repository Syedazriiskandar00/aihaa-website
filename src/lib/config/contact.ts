// Contact channels — single source of truth for the AIHAA main lines
// and all pre-filled CTA messages. WhatsApp and voice are separate
// numbers: the office line (PHONE_NUMBER) takes calls only, so every
// whatsappUrl() CTA uses WHATSAPP_NUMBER and telHref() uses PHONE_NUMBER.
export const WHATSAPP_NUMBER = "601156577084" as const;
export const WHATSAPP_NUMBER_DISPLAY = "+60 11-5657 7084" as const;
export const PHONE_NUMBER = "60123705004" as const;
export const PHONE_NUMBER_DISPLAY = "+60 12-370 5004" as const;

export const whatsappUrl = (message: string): string => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const telHref = (): string => `tel:+${PHONE_NUMBER}`;

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

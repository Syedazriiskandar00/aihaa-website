// Contact channels — single source of truth for the AIHAA main line
// (WhatsApp + voice) and all pre-filled CTA messages. Every CTA that
// calls whatsappUrl() / telHref() inherits this number automatically.
export const WHATSAPP_NUMBER = "601137208466" as const;
export const PHONE_NUMBER = "601137208466" as const;
export const PHONE_NUMBER_DISPLAY = "+60 11-3720 8466" as const;

export const whatsappUrl = (message: string): string => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const telHref = (): string => `tel:+${PHONE_NUMBER}`;

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

// WhatsApp contact — single source of truth
// TODO(azri): replace WHATSAPP_NUMBER with the real AIHAA WhatsApp number.
// Search for "60000000000" across the repo to find every touch point.
export const WHATSAPP_NUMBER = "60000000000" as const;

export const whatsappUrl = (message: string): string => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

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

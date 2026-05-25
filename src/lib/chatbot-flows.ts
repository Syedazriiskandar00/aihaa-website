import type { Locale } from "./i18n/translations";
import { whatsappUrl, whatsappMessages } from "./config/contact";

export type ChatMessage = {
  id: string;
  type: "bot" | "user";
  text: string;
  quickReplies?: { label: string; action: string }[];
};

export type FlowStep = {
  message: Record<Locale, string>;
  quickReplies?: { label: Record<Locale, string>; action: string }[];
};

export const whatsappUrls: Record<string, string> = {
  whatsapp: whatsappUrl("Hai, saya berminat dengan penapis air AIHAA."),
  whatsapp_price: whatsappUrl(whatsappMessages.priceQuestion),
  whatsapp_ean: whatsappUrl(whatsappMessages.productInquiry("AIHAA EAN (RM780)")),
  whatsapp_bella: whatsappUrl(whatsappMessages.productInquiry("AIHAA BELLA (RM1,080)")),
  whatsapp_winter: whatsappUrl(whatsappMessages.productInquiry("AIHAA WINTER (RM1,580)")),
  whatsapp_warranty: whatsappUrl(whatsappMessages.warrantyClaim),
  whatsapp_support: whatsappUrl(whatsappMessages.support),
  whatsapp_filter: whatsappUrl(whatsappMessages.filterOrder),
  whatsapp_tradein: whatsappUrl(whatsappMessages.tradeIn),
};

// Keyword matching for free text input
const keywordGroups: { keywords: string[]; action: string }[] = [
  { keywords: ["harga", "price", "berapa", "cost", "rm", "murah", "mahal"], action: "price" },
  { keywords: ["model", "sesuai", "recommend", "cadang", "pilih", "suggest"], action: "recommend_budget" },
  { keywords: ["warranty", "waranti", "jaminan", "guarantee"], action: "warranty" },
  { keywords: ["coverage", "kawasan", "area", "lokasi", "location", "sabah", "sarawak", "semenanjung", "negeri"], action: "coverage" },
  { keywords: ["pelanggan", "customer", "tukar filter", "filter", "masalah", "problem", "issue", "upgrade", "trade", "rosak", "broken"], action: "existing_customer" },
];

export function matchKeyword(text: string): string | null {
  const lower = text.toLowerCase();
  for (const group of keywordGroups) {
    if (group.keywords.some((kw) => lower.includes(kw))) {
      return group.action;
    }
  }
  return null;
}

export const flows: Record<string, FlowStep> = {
  greeting: {
    message: {
      bm: "Hi! Selamat datang ke AIHAA 👋 Saya boleh bantu awak cari penapis air yang sesuai. Ada soalan?",
      en: "Hi! Welcome to AIHAA 👋 I can help you find the right water purifier. Any questions?",
    },
    quickReplies: [
      { label: { bm: "Berapa harga?", en: "What's the price?" }, action: "price" },
      { label: { bm: "Model mana sesuai?", en: "Which model suits me?" }, action: "recommend_budget" },
      { label: { bm: "Pasal warranty", en: "About warranty" }, action: "warranty" },
      { label: { bm: "Coverage kawasan saya?", en: "Coverage in my area?" }, action: "coverage" },
      { label: { bm: "Saya pelanggan sedia ada", en: "I'm an existing customer" }, action: "existing_customer" },
      { label: { bm: "WhatsApp terus", en: "WhatsApp directly" }, action: "whatsapp" },
    ],
  },

  price: {
    message: {
      bm: "Penapis air AIHAA bermula dari RM399 — sekali bayar! 💰\n\nDalam rumah: RM780 - RM1,580\nLuar rumah: RM399 - RM1,299\n\nSemua termasuk pemasangan percuma + waranti.",
      en: "AIHAA water purifiers start from RM399 — one-time payment! 💰\n\nIndoor: RM780 - RM1,580\nOutdoor: RM399 - RM1,299\n\nAll include free installation + warranty.",
    },
    quickReplies: [
      { label: { bm: "Tengok semua produk", en: "View all products" }, action: "link:/produk-dalam" },
      { label: { bm: "Model mana sesuai?", en: "Which model suits me?" }, action: "recommend_budget" },
      { label: { bm: "WhatsApp untuk harga detail", en: "WhatsApp for pricing" }, action: "whatsapp_price" },
    ],
  },

  recommend_budget: {
    message: {
      bm: "Bajet anda dalam range mana? Saya cadangkan yang terbaik 😊",
      en: "What's your budget range? I'll recommend the best option 😊",
    },
    quickReplies: [
      { label: { bm: "Bawah RM800", en: "Under RM800" }, action: "rec_budget_low" },
      { label: { bm: "RM800 - RM1,200", en: "RM800 - RM1,200" }, action: "rec_budget_mid" },
      { label: { bm: "RM1,200 ke atas", en: "Above RM1,200" }, action: "rec_budget_high" },
    ],
  },

  rec_budget_low: {
    message: {
      bm: "Cadangan saya — AIHAA EAN (RM780) ✨\n\n✅ Digital display\n✅ 4 tahap penapisan\n✅ 7.5L tangki\n✅ Pemasangan percuma\n✅ Waranti 2 tahun\n\nPaling popular dalam range ni!",
      en: "My recommendation — AIHAA EAN (RM780) ✨\n\n✅ Digital display\n✅ 4-stage filtration\n✅ 7.5L tank\n✅ Free installation\n✅ 2 years warranty\n\nMost popular in this range!",
    },
    quickReplies: [
      { label: { bm: "Nak beli, WhatsApp", en: "Buy now, WhatsApp" }, action: "whatsapp_ean" },
      { label: { bm: "Tengok produk lain", en: "See other products" }, action: "link:/produk-dalam" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  rec_budget_mid: {
    message: {
      bm: "Cadangan saya — AIHAA BELLA (RM1,080) ✨\n\n✅ Mineral alkali\n✅ 4 tahap penapisan\n✅ 9.5L tangki\n✅ Rekaan kompak stand floor\n✅ Pemasangan percuma + waranti 2 tahun\n\nBest seller kami!",
      en: "My recommendation — AIHAA BELLA (RM1,080) ✨\n\n✅ Alkaline mineral\n✅ 4-stage filtration\n✅ 9.5L tank\n✅ Compact stand floor design\n✅ Free installation + 2 years warranty\n\nOur best seller!",
    },
    quickReplies: [
      { label: { bm: "Nak beli, WhatsApp", en: "Buy now, WhatsApp" }, action: "whatsapp_bella" },
      { label: { bm: "Tengok produk lain", en: "See other products" }, action: "link:/produk-dalam" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  rec_budget_high: {
    message: {
      bm: "Cadangan saya — AIHAA WINTER (RM1,580) ✨\n\n✅ Premium quality\n✅ Ice maker built-in\n✅ 4 tahap penapisan\n✅ Teknologi terbaru\n✅ Pemasangan percuma + waranti 2 tahun\n\nModel premium kami dengan ice maker!",
      en: "My recommendation — AIHAA WINTER (RM1,580) ✨\n\n✅ Premium quality\n✅ Built-in ice maker\n✅ 4-stage filtration\n✅ Latest technology\n✅ Free installation + 2 years warranty\n\nOur premium model with ice maker!",
    },
    quickReplies: [
      { label: { bm: "Nak beli, WhatsApp", en: "Buy now, WhatsApp" }, action: "whatsapp_winter" },
      { label: { bm: "Tengok produk lain", en: "See other products" }, action: "link:/produk-dalam" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  warranty: {
    message: {
      bm: "Waranti AIHAA:\n\n🔹 Indoor — 2 tahun\n🔹 Outdoor — 2 tahun\n🔹 UF Double Backwash — 10 tahun (UF Membrane)\n\nMeliputi motor, sistem penapisan, dan tangki. Claim mudah via WhatsApp!",
      en: "AIHAA Warranty:\n\n🔹 Indoor — 2 years\n🔹 Outdoor — 2 years\n🔹 UF Double Backwash — 10 years (UF Membrane)\n\nCovers motor, filtration system, and tank. Easy claim via WhatsApp!",
    },
    quickReplies: [
      { label: { bm: "WhatsApp untuk claim", en: "WhatsApp to claim" }, action: "whatsapp_warranty" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  coverage: {
    message: {
      bm: "AIHAA cover seluruh Semenanjung Malaysia! 🇲🇾\n\nJohor, Melaka, N. Sembilan, Selangor, KL, Perak, Pulau Pinang, Kedah, Perlis, Pahang, Terengganu, Kelantan.\n\nPemasangan percuma ke semua lokasi di atas.",
      en: "AIHAA covers all of Peninsular Malaysia! 🇲🇾\n\nJohor, Melaka, N. Sembilan, Selangor, KL, Perak, Penang, Kedah, Perlis, Pahang, Terengganu, Kelantan.\n\nFree installation to all locations above.",
    },
    quickReplies: [
      { label: { bm: "Nak beli sekarang", en: "Buy now" }, action: "whatsapp" },
      { label: { bm: "Saya di Sabah/Sarawak", en: "I'm in Sabah/Sarawak" }, action: "no_coverage" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  no_coverage: {
    message: {
      bm: "Maaf, buat masa ini kami hanya cover Semenanjung Malaysia 😔 Tapi kami sedang expand! WhatsApp kami untuk check update.",
      en: "Sorry, we currently only cover Peninsular Malaysia 😔 But we're expanding! WhatsApp us for updates.",
    },
    quickReplies: [
      { label: { bm: "WhatsApp untuk check", en: "WhatsApp to check" }, action: "whatsapp" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  existing_customer: {
    message: {
      bm: "Terima kasih jadi pelanggan AIHAA! 🙏 Apa yang boleh saya bantu?",
      en: "Thank you for being an AIHAA customer! 🙏 How can I help?",
    },
    quickReplies: [
      { label: { bm: "Nak tukar filter", en: "Change filter" }, action: "filter_change" },
      { label: { bm: "Ada masalah", en: "Having issues" }, action: "whatsapp_support" },
      { label: { bm: "Nak upgrade", en: "Want to upgrade" }, action: "upgrade" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  filter_change: {
    message: {
      bm: "Anda boleh tukar filter sendiri — kami sedia panduan lengkap. Atau book technician kami.\n\nKos filter biasanya RM50-RM150.\n\nWhatsApp kami untuk order! 😊",
      en: "You can change filters yourself — we provide full guides. Or book our technician.\n\nFilter cost usually RM50-RM150.\n\nWhatsApp us to order! 😊",
    },
    quickReplies: [
      { label: { bm: "WhatsApp untuk order", en: "WhatsApp to order" }, action: "whatsapp_filter" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  upgrade: {
    message: {
      bm: "Program Trade-In — tukar model lama ke baru dengan harga istimewa! WhatsApp kami untuk penilaian.",
      en: "Trade-In Program — exchange old model for new at special price! WhatsApp us for assessment.",
    },
    quickReplies: [
      { label: { bm: "WhatsApp untuk trade-in", en: "WhatsApp for trade-in" }, action: "whatsapp_tradein" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  whatsapp_redirect: {
    message: {
      bm: "Okay! Saya redirect ke WhatsApp sekarang. Team kami reply dalam 5 minit! 😊",
      en: "Okay! Redirecting to WhatsApp now. Our team replies within 5 minutes! 😊",
    },
  },

  fallback: {
    message: {
      bm: "Soalan bagus! Untuk jawapan yang lebih tepat, jom sambung di WhatsApp — reply dalam 5 minit 😊",
      en: "Great question! For a more accurate answer, let's continue on WhatsApp — reply within 5 minutes 😊",
    },
    quickReplies: [
      { label: { bm: "WhatsApp sekarang", en: "WhatsApp now" }, action: "whatsapp" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },
};

import type { Locale } from "./i18n/translations";

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
  whatsapp: "https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20penapis%20air%20AIHAA.",
  whatsapp_price: "https://wa.me/60115657084?text=Hai,%20saya%20nak%20tanya%20harga%20penapis%20air%20AIHAA.",
  whatsapp_ean: "https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20AIHAA%20EAN%20(RM780).",
  whatsapp_bella: "https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20AIHAA%20BELLA%20(RM1,080).",
  whatsapp_winter: "https://wa.me/60115657084?text=Hai,%20saya%20berminat%20dengan%20AIHAA%20WINTER%20(RM1,580).",
  whatsapp_warranty: "https://wa.me/60115657084?text=Hai,%20saya%20nak%20claim%20warranty%20AIHAA.",
};

export const flows: Record<string, FlowStep> = {
  greeting: {
    message: {
      bm: "Hi! Saya Azri dari Aihaa 👋 Ada apa boleh saya bantu?",
      en: "Hi! I'm Azri from Aihaa 👋 How can I help?",
    },
    quickReplies: [
      { label: { bm: "Berapa harga?", en: "What's the price?" }, action: "price" },
      { label: { bm: "Model mana sesuai?", en: "Which model suits me?" }, action: "recommend_budget" },
      { label: { bm: "Pasal warranty", en: "About warranty" }, action: "warranty" },
      { label: { bm: "WhatsApp terus", en: "WhatsApp directly" }, action: "whatsapp" },
    ],
  },

  price: {
    message: {
      bm: "Penapis air AIHAA bermula dari RM399 — sekali bayar! 💰\n\nDalam rumah: RM780 - RM1,580\nLuar rumah: RM399 - RM1,299\n\nSemua termasuk pemasangan percuma + waranti.",
      en: "AIHAA water purifiers start from RM399 — one-time payment! 💰\n\nIndoor: RM780 - RM1,580\nOutdoor: RM399 - RM1,299\n\nAll include free installation + warranty.",
    },
    quickReplies: [
      { label: { bm: "Tengok semua produk", en: "View all products" }, action: "link:/water-purifier" },
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
      { label: { bm: "Tengok produk lain", en: "See other products" }, action: "link:/water-purifier" },
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
      { label: { bm: "Tengok produk lain", en: "See other products" }, action: "link:/water-purifier" },
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
      { label: { bm: "Tengok produk lain", en: "See other products" }, action: "link:/water-purifier" },
      { label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" },
    ],
  },

  warranty: {
    message: {
      bm: "Waranti AIHAA:\n\n🔹 Indoor — 2 tahun\n🔹 Outdoor — 1 tahun\n\nMeliputi motor, sistem penapisan, dan tangki. Claim mudah via WhatsApp!",
      en: "AIHAA Warranty:\n\n🔹 Indoor — 2 years\n🔹 Outdoor — 1 year\n\nCovers motor, filtration system, and tank. Easy claim via WhatsApp!",
    },
    quickReplies: [
      { label: { bm: "WhatsApp untuk claim", en: "WhatsApp to claim" }, action: "whatsapp_warranty" },
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

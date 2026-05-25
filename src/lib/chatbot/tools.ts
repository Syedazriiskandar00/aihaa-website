import { tool } from "ai";
import { z } from "zod";
import { getAdminByState } from "./admins";
import { nextSalesPerson } from "./sales-team";

// Chatbot handoff tools (AI SDK v6: tool() + inputSchema Zod schema).
// Both build a wa.me deep link with a URL-encoded pre-filled message and
// return UI-ready data ({ buttonLabel, waUrl, ... }) that Phase C renders
// as a tappable button. Numbers come only from admins.ts / sales-team.ts.
export const chatbotTools = {
  connectToAdmin: tool({
    description:
      "Sambung customer ke admin AIHAA via WhatsApp untuk aduan/masalah. Panggil bila dah cukup info pasal masalah customer.",
    inputSchema: z.object({
      state: z
        .string()
        .describe("Negeri customer, cth: Johor, Selangor, Kuala Lumpur"),
      customerSummary: z
        .string()
        .describe("Ringkasan masalah customer (jenis penapis, isu, berapa lama)"),
    }),
    execute: async ({ state, customerSummary }) => {
      const admin = getAdminByState(state);
      const message = `Hai, saya customer AIHAA. Saya ada masalah: ${customerSummary}. Lokasi: ${state}.`;
      const waUrl = `https://wa.me/${admin.waNumber}?text=${encodeURIComponent(message)}`;
      return {
        buttonType: "whatsapp" as const,
        buttonLabel: "Sambung ke Admin via WhatsApp",
        waUrl,
        adminName: admin.name,
        isOutOfCoverage: admin.isOutOfCoverage ?? false,
      };
    },
  }),

  connectToSales: tool({
    description:
      "Sambung customer ke team sales via WhatsApp untuk pertanyaan beli. Panggil bila customer tunjuk interest beli produk.",
    inputSchema: z.object({
      productInterest: z
        .string()
        .describe("Produk atau jenis penapis yang customer berminat"),
      customerName: z.string().optional().describe("Nama customer kalau ada"),
    }),
    execute: async ({ productInterest, customerName }) => {
      const { sales } = await nextSalesPerson();
      const who = customerName?.trim() || "customer AIHAA";
      const message = `Hai, saya ${who}. Saya berminat: ${productInterest}.`;
      const waUrl = `https://wa.me/${sales.waNumber}?text=${encodeURIComponent(message)}`;
      return {
        buttonType: "whatsapp" as const,
        buttonLabel: "Sambung ke Team Sales via WhatsApp",
        waUrl,
        salesName: sales.name,
      };
    },
  }),

  showLocation: tool({
    description:
      "Tunjuk lokasi AIHAA (Batu Pahat, Johor) dalam Google Maps. Panggil bila customer tanya alamat, kedai, showroom, atau cara nak ke lokasi AIHAA.",
    inputSchema: z.object({}),
    execute: async () => {
      return {
        buttonType: "location" as const,
        buttonLabel: "Buka Lokasi di Google Maps",
        mapsUrl: "https://www.google.com/maps?q=1.866704,103.010227",
        locationName: "AIHAA Marketing Sdn Bhd, Batu Pahat, Johor",
      };
    },
  }),
};

import { kv } from "@vercel/kv";

// Sales team for every WhatsApp handoff on the site (chatbot, product
// order button, and all whatsappUrl() CTAs). Single source of truth for
// sales WhatsApp numbers — never hardcode these elsewhere.
export const SALES_TEAM = [
  { name: "Aim", display: "+60 10-584 6001", waNumber: "60105846001" },
  { name: "Shaa", display: "+60 19-952 3897", waNumber: "60199523897" },
  { name: "Firdaus", display: "+60 10-829 1794", waNumber: "60108291794" },
  { name: "Aidil", display: "+60 14-646 7345", waNumber: "60146467345" },
  { name: "Adibah", display: "+60 11-2692 2081", waNumber: "601126922081" },
] as const;

export type SalesPerson = (typeof SALES_TEAM)[number];

export type SalesRotation = {
  salesIndex: number;
  counter: number;
  sales: SalesPerson;
  error?: string;
};

// Atomic round-robin via Vercel KV (incr is race-safe), wrapped by list
// length so a roster change needs no other code edit. Falls back to rep 0
// if KV isn't reachable, so no handoff ever throws or dead-ends.
async function rotate(key: string): Promise<SalesRotation> {
  try {
    const counter = await kv.incr(key);
    const salesIndex = (counter - 1) % SALES_TEAM.length;
    return { salesIndex, counter, sales: SALES_TEAM[salesIndex] };
  } catch {
    return {
      salesIndex: 0,
      counter: 0,
      sales: SALES_TEAM[0],
      error: "KV not configured",
    };
  }
}

// Chatbot handoff (connectToSales tool + /api/sales-rotation).
export const nextSalesPerson = () => rotate("sales_rotation_counter");

// Website buttons (/api/wa and /api/wa/product). Separate counter so
// button clicks never disturb the chatbot's lead assignment.
export const nextWebsiteSalesPerson = () => rotate("product_rotation");

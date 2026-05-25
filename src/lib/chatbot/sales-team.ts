import { kv } from "@vercel/kv";

// Sales team for the chatbot's round-robin handoff. Single source of
// truth for sales WhatsApp numbers — never hardcode these elsewhere.
export const SALES_TEAM = [
  { name: "Azri", display: "+60 11-3720 8466", waNumber: "601137208466" },
  { name: "Aim", display: "+60 10-584 6001", waNumber: "60105846001" },
  { name: "Aidil", display: "+60 19-946 9437", waNumber: "60199469437" },
  { name: "Adibah", display: "+60 11-2692 2081", waNumber: "601126922081" },
  { name: "Firdaus", display: "+60 10-829 1794", waNumber: "60108291794" },
  { name: "Shaa", display: "+60 19-952 3897", waNumber: "60199523897" },
  { name: "Haziq", display: "+60 10-664 3590", waNumber: "60106643590" },
] as const;

export type SalesPerson = (typeof SALES_TEAM)[number];

export type SalesRotation = {
  salesIndex: number;
  counter: number;
  sales: SalesPerson;
  error?: string;
};

// Atomic round-robin via Vercel KV (incr is race-safe). Falls back to
// rep 0 if KV isn't provisioned yet, so the API route + the
// connectToSales tool never throw on a fresh/un-provisioned env.
export async function nextSalesPerson(): Promise<SalesRotation> {
  try {
    const counter = await kv.incr("sales_rotation_counter");
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

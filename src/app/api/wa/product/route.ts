import { kv } from "@vercel/kv";
import { type NextRequest, NextResponse } from "next/server";
import { SALES_TEAM } from "@/lib/chatbot/sales-team";
import { getProductBySlug } from "@/lib/data/products";
import { whatsappMessages } from "@/lib/config/contact";

// Product-page WhatsApp handoff. Rotates leads round-robin across the
// SAME sales team as the chatbot (imported from sales-team.ts) but keeps
// its OWN counter under the KV key `product_rotation` — completely
// separate from the chatbot's `sales_rotation_counter`, so product-CTA
// clicks never disturb the chatbot's live lead assignment.
//
// Per-request rotation on click (force-dynamic, never cached): each GET
// atomically increments the counter and 302-redirects to the selected
// rep's wa.me chat, pre-filled with the product inquiry message. If KV
// isn't provisioned, it falls back to rep 0 and still redirects — the
// user is never dropped at a dead end.

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "";
  const product = getProductBySlug(id);

  // Product name drives the pre-filled message; unknown id falls back to
  // the generic inquiry so the redirect still works.
  const message = product
    ? whatsappMessages.productInquiry(product.name)
    : whatsappMessages.general;

  // Atomic round-robin via KV incr (race-safe). Wrap by list length so a
  // roster change needs no code edit here. Fall back to rep 0 if KV is
  // unavailable so the redirect always resolves.
  let salesIndex = 0;
  try {
    const counter = await kv.incr("product_rotation");
    salesIndex = (counter - 1) % SALES_TEAM.length;
  } catch {
    salesIndex = 0;
  }

  const sales = SALES_TEAM[salesIndex];
  const waUrl = `https://wa.me/${sales.waNumber}?text=${encodeURIComponent(
    message
  )}`;

  return NextResponse.redirect(waUrl, 302);
}

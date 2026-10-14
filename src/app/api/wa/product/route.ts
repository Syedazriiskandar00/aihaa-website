import { type NextRequest, NextResponse } from "next/server";
import { nextWebsiteSalesPerson } from "@/lib/chatbot/sales-team";
import { getProductBySlug } from "@/lib/data/products";
import { whatsappMessages } from "@/lib/config/contact";

// Product-page "Order melalui WhatsApp" handoff. Rotates leads round-robin
// across the sales team (shared website counter, see sales-team.ts) and
// 302-redirects to the selected rep's wa.me chat, pre-filled with the
// product inquiry message.

export const dynamic = "force-dynamic";

// A cached 302 would reuse the first rep and make the rotator look stuck,
// so every response is explicitly uncacheable at the browser + CDN layer.
const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
} as const;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "";
  // ?debug=1 → return the rotation state as JSON (no redirect) so KV
  // availability can be verified: hit it a few times and watch `counter`
  // climb. kvOk:false / a static counter = KV isn't reachable.
  const debug = request.nextUrl.searchParams.get("debug") === "1";
  const product = getProductBySlug(id);

  // Product name drives the pre-filled message; unknown id falls back to
  // the generic inquiry so the redirect still works.
  const message = product
    ? whatsappMessages.productInquiry(product.name)
    : whatsappMessages.general;

  const { salesIndex, counter, sales, error } = await nextWebsiteSalesPerson();

  if (debug) {
    // name only — never expose the phone number in the debug payload.
    return NextResponse.json(
      { kvOk: !error, counter, index: salesIndex, name: sales.name },
      { headers: NO_STORE }
    );
  }

  const waUrl = `https://wa.me/${sales.waNumber}?text=${encodeURIComponent(
    message
  )}`;

  return NextResponse.redirect(waUrl, { status: 302, headers: NO_STORE });
}

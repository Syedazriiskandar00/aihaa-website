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

// A cached 302 would reuse the first rep and make the rotator look stuck,
// so every response is explicitly uncacheable at the browser + CDN layer.
const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
} as const;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "";
  // ?debug=1 → return the rotation state as JSON (no redirect) so KV
  // availability can be verified on a Preview deploy: hit it a few times
  // and watch `counter` climb. kvOk:false / a static counter = KV isn't
  // reachable in this environment (env vars not enabled for Preview).
  const debug = request.nextUrl.searchParams.get("debug") === "1";
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
  let counter = 0;
  let kvOk = false;
  try {
    counter = await kv.incr("product_rotation");
    salesIndex = (counter - 1) % SALES_TEAM.length;
    kvOk = true;
  } catch {
    salesIndex = 0;
    kvOk = false;
  }

  const sales = SALES_TEAM[salesIndex];

  if (debug) {
    // name only — never expose the phone number in the debug payload.
    return NextResponse.json(
      { kvOk, counter, index: salesIndex, name: sales.name },
      { headers: NO_STORE }
    );
  }

  const waUrl = `https://wa.me/${sales.waNumber}?text=${encodeURIComponent(
    message
  )}`;

  return NextResponse.redirect(waUrl, { status: 302, headers: NO_STORE });
}

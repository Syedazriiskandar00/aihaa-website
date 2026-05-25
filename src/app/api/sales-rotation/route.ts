import { nextSalesPerson } from "@/lib/chatbot/sales-team";

// Round-robin sales-rep rotation, backed by Vercel KV (Redis). Each GET
// atomically increments a shared counter and returns the mapped sales
// person. Must run per request (live counter), never cached.
//
// nextSalesPerson() handles the KV-not-configured fallback internally
// (returns rep 0 + an error note at status 200) so build + preview
// deploys never break.

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await nextSalesPerson();
  return Response.json(result);
}

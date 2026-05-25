import { kv } from "@vercel/kv";

// Round-robin sales-rep rotation counter, backed by Vercel KV (Redis).
// Each GET atomically increments a shared counter and maps it onto a
// sales-rep index. Must run per request (it's a live counter), never
// cached — hence force-dynamic.
//
// Phase A: array length is a hardcoded stub. The real sales array
// lands in Phase B; only SALES_COUNT changes here when it does.

export const dynamic = "force-dynamic";

const SALES_COUNT = 7; // Phase A stub

export async function GET() {
  try {
    // incr is atomic — safe under concurrent requests, no race.
    const counter = await kv.incr("sales_rotation_counter");
    return Response.json({
      salesIndex: (counter - 1) % SALES_COUNT,
      counter,
    });
  } catch {
    // KV not provisioned yet (no KV_REST_API_* env). Degrade gracefully
    // with status 200 so build + preview deploys don't break — the UI
    // just always gets rep 0 until KV is wired.
    return Response.json({
      salesIndex: 0,
      counter: 0,
      error: "KV not configured",
    });
  }
}

import { type NextRequest, NextResponse } from "next/server";
import { nextWebsiteSalesPerson } from "@/lib/chatbot/sales-team";
import { whatsappMessages } from "@/lib/config/contact";

// Target of every whatsappUrl() button on the site. Picks the next sales
// rep (shared website counter, see sales-team.ts) and 302-redirects to
// their wa.me chat with the button's pre-filled message from ?text=.

export const dynamic = "force-dynamic";

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
} as const;

// Pre-filled messages are short presets; cap the length so the redirect
// can't be used to relay arbitrary long text.
const MAX_TEXT_LENGTH = 500;

export async function GET(request: NextRequest) {
  const text =
    request.nextUrl.searchParams.get("text")?.trim().slice(0, MAX_TEXT_LENGTH) ||
    whatsappMessages.general;

  const { sales } = await nextWebsiteSalesPerson();
  const waUrl = `https://wa.me/${sales.waNumber}?text=${encodeURIComponent(text)}`;

  return NextResponse.redirect(waUrl, { status: 302, headers: NO_STORE });
}

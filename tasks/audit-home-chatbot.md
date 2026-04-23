# Home Page Chatbot Audit — 2026-04-23

## Executive Summary
The chatbot (rendered on Home via `FloatingButtons` → `Chatbot`) covers all 5 core intents, routes every flow to a WhatsApp handoff through `contact.ts`, and has no hardcoded phone numbers. BM copy is natural and on-brand. Main weaknesses are structural: a hard-coded agent name ("Azri — Aihaa") in the header regardless of locale, a `link:/water-purifier` quick-reply that points to a route the CLAUDE.md flags as a stopgap pending redesign, a non-localized input placeholder-adjacent subtitle using an inline locale ternary instead of the i18n layer, and the `no_coverage` branch that never offers users a product path.

## Issues Found

### 1. [HIGH] `link:/water-purifier` quick-reply points at a route flagged as "stopgap pending redesign"
- **File:** `src/lib/chatbot-flows.ts`
- **Line:** 69, 94, 107, 119
- **Current:** Three "Tengok produk lain / Tengok semua produk" quick replies deep-link to `/water-purifier`. Per `CLAUDE.md` ("Routing IA post-Phase-6"), `/water-purifier` is a stopgap. The corporate-rebuild IA now has dedicated `/produk-luar` (outdoor) and `/produk-dalam` (indoor) pages, and the nav dropdown already points to those.
- **Recommended fix:** Replace the four `link:/water-purifier` actions with category-appropriate destinations: after an indoor recommendation (`rec_budget_mid`, `rec_budget_high`) link to `/produk-dalam`; after an outdoor-leaning or low-budget recommendation (`rec_budget_low` — AIHAA EAN is indoor so keep `/produk-dalam`) route accordingly. In the generic `price` flow, offer two buttons ("Luar rumah" → `/produk-luar`, "Dalam rumah" → `/produk-dalam`) instead of the single "Tengok semua produk".

### 2. [HIGH] Agent header ("Azri — Aihaa") and reply-time subtitle are hard-coded, bypassing i18n
- **File:** `src/components/Chatbot.tsx`
- **Line:** 137-140
- **Current:**
  ```tsx
  <p className="text-white text-sm font-semibold">Azri — Aihaa</p>
  <p className="text-[#999] text-[11px]">
    {locale === "bm" ? "Biasanya reply dalam 5 minit" : "Usually replies within 5 minutes"}
  </p>
  ```
  The "Biasanya reply..." subtitle uses an inline `locale === "bm" ? ... : ...` ternary instead of a translation key, violating the single-source-of-truth pattern enforced elsewhere (see translations.ts, CLAUDE.md anti-hardcode rules). Also, "Azri" is the real owner's name (per `me.md` / commit author) — shipping it as the always-visible bot persona is a real decision that should be locked in deliberately, not left as a dev stub. Same applies to the Chatbot input placeholder on line 204 (same ternary pattern).
- **Recommended fix:** Add `chatbot_agent_name`, `chatbot_reply_time`, `chatbot_input_placeholder` keys to `src/lib/i18n/translations.ts`. Consume via `t.chatbot_*`. Confirm with Azri that "Azri — Aihaa" is the intended persona — if it is, lock it as the translation value in both `bm` and `en`; if not, swap to a generic persona like "AIHAA Support" / "AIHAA Team".

### 3. [MEDIUM] `no_coverage` dead-ends Sabah/Sarawak users without a product-browsing path
- **File:** `src/lib/chatbot-flows.ts`
- **Line:** 146-155
- **Current:** When a user says they're in Sabah/Sarawak, they get apology + "WhatsApp untuk check" + "Menu utama". No way to continue browsing products or view the outdoor catalog (outdoor units could in theory be self-installed even where coverage doesn't include installation).
- **Recommended fix:** Add a "Tengok produk (self-pickup)" / "View products (self-pickup)" quick reply that links to `/produk-luar`, or soften the copy to say installation is Semenanjung-only but shipment to East Malaysia can be discussed on WhatsApp — and keep the WhatsApp CTA. Also consider whether trade-in / filter-order for existing East-Malaysia customers should route to `whatsapp_support` directly instead of the generic `whatsapp`.

### 4. [MEDIUM] `recommend_budget` has no "back" / "menu utama" option
- **File:** `src/lib/chatbot-flows.ts`
- **Line:** 75-85
- **Current:** The budget-tier selector has three buttons (low / mid / high) but no escape hatch. A user who opens this flow by accident has to pick a budget or type freely.
- **Recommended fix:** Add `{ label: { bm: "Menu utama", en: "Main menu" }, action: "greeting" }` as the last quick reply — matches the pattern used in every other nested flow.

### 5. [MEDIUM] `fallback` and generic flows route to `whatsapp` (generic message) instead of intent-specific messages
- **File:** `src/lib/chatbot-flows.ts`
- **Line:** 199-208 (`fallback`), 140 (`coverage` → `whatsapp`), 152 (`no_coverage` → `whatsapp`)
- **Current:** The generic `whatsapp` handoff uses the pre-filled message `"Hai, saya berminat dengan penapis air AIHAA."` regardless of what the user was actually asking about. A user who typed "pasir tak jalan" and hit fallback arrives in WhatsApp with a generic interest message — team loses context.
- **Recommended fix:** For `fallback`, pass the user's last typed text into the WhatsApp message (e.g., `whatsappUrl(\`Hai AIHAA, saya ada soalan: ${lastUserMessage}\`)`). For `coverage` / `no_coverage`, route to a `whatsapp_coverage` key with a location-aware prefilled message (e.g., "Hai, saya nak confirm AIHAA cover kawasan saya"). Register the new URLs in `whatsappUrls` map.

### 6. [LOW] Module-scoped `msgId` counter persists across remounts, producing surprising IDs after HMR or route-re-entry
- **File:** `src/components/Chatbot.tsx`
- **Line:** 9-12
- **Current:** `let msgId = 0;` at module scope. With Next.js client-side navigation, the Chatbot component may unmount/remount when the user navigates within the SPA; the counter keeps growing and IDs are not reset. Harmless today (IDs are only used as React keys), but fragile if anyone later uses msgId for logic.
- **Recommended fix:** Move the counter into `useRef(0)` inside the component, or use `crypto.randomUUID()` for message IDs.

### 7. [LOW] `matchKeyword` swallows outdoor-specific vocab into the generic recommendation flow
- **File:** `src/lib/chatbot-flows.ts`
- **Line:** 29-35
- **Current:** Keywords like `"filter"`, `"upgrade"`, `"trade"`, `"rosak"`, `"broken"` all map to `existing_customer` — correct. But a prospective buyer typing "pasir" (sand filter — an outdoor product), "outdoor", "luar rumah", "air telaga", "karat", "keruh" has no dedicated route and will fall into the generic `fallback`. Similarly "indoor", "dalam rumah", "counter top" have no route.
- **Recommended fix:** Add two keyword groups: `{ keywords: ["outdoor", "luar", "pasir", "telaga", "karat", "keruh"], action: "link:/produk-luar" }` and `{ keywords: ["indoor", "dalam rumah", "dapur", "counter"], action: "link:/produk-dalam" }`. Note: `matchKeyword` currently returns an action string only; to support `link:` actions from free-text input, `handleSend` already passes the result through `handleAction` which handles `link:` — so this works without code changes to the handler.

### 8. [LOW] Budget tier boundary ambiguity: RM1,200 and above skips AIHAA WINTER to users who said "RM800 - RM1,200"
- **File:** `src/lib/chatbot-flows.ts`
- **Line:** 81-83
- **Current:** Tiers are `< RM800`, `RM800-RM1,200`, `> RM1,200`. But `AIHAA BELLA` is RM1,080 (mid, correct), `AIHAA WINTER` is RM1,580 (high, correct), and `AIHAA EAN` is RM780 (just under the low cap — actually RM780 maps to both "Bawah RM800" and as the high end of the <RM800 tier, but then what recommendation fires for exactly RM780? EAN only). Acceptable, but the tier copy of "RM800 - RM1,200" could confuse someone with a budget of exactly RM1,200 who might actually afford a WINTER at RM1,580.
- **Recommended fix:** Cosmetic — change labels to "Di bawah RM1,000" / "RM1,000 - RM1,500" / "RM1,500 ke atas" and keep recommendations aligned (EAN, BELLA, WINTER respectively). Or leave as-is and document.

### 9. [LOW] Reply-time claim "5 minit" is repeated in 3 places — maintenance hazard
- **File:** `src/components/Chatbot.tsx` (line 139), `src/lib/chatbot-flows.ts` (line 194, `whatsapp_redirect`; line 201, `fallback`)
- **Current:** The "reply dalam 5 minit" promise is hardcoded in three places. If Azri decides to change SLA to 15 minutes, all three must be updated in sync.
- **Recommended fix:** Centralize as a constant `RESPONSE_TIME_MINUTES = 5` in `contact.ts` and interpolate into strings. Or accept the duplication and add a comment noting the three locations.

## Intent Coverage Matrix

| Intent | Present? | Reaches WhatsApp handoff? | Notes |
|---|---|---|---|
| (a) Product recommendation | Yes | Yes — `whatsapp_ean`, `whatsapp_bella`, `whatsapp_winter` | `recommend_budget` → 3 tier branches, each with product-specific prefilled WA. Only covers 3 of 13 products though (see issue #1) — indoor-only recommendations, no AIHAA ALFHA / MALFI / MELODIA / outdoor sand/UF units. |
| (b) FAQ (price/warranty/delivery) | Partial | Yes | `price` and `warranty` covered. "Delivery" / "bila sampai" / "installation time" not present as an intent. No `shipping` flow. |
| (c) Coverage (Semenanjung only?) | Yes | Yes — `whatsapp` | `coverage` + `no_coverage` flows both end in WhatsApp. Generic handoff message though — see issue #5. |
| (d) Existing customer (service/warranty/filter) | Yes | Yes — `whatsapp_support`, `whatsapp_warranty`, `whatsapp_filter`, `whatsapp_tradein` | Solid. "Ada masalah" routes to `whatsapp_support` directly (good — no unnecessary interstitial). Trade-in has its own flow. |
| (e) WhatsApp direct handoff | Yes | Yes — `whatsapp` (root) | Explicit "WhatsApp terus" button in greeting. `whatsapp_redirect` flow shows a friendly message before `window.open`, with 800ms typing delay + 1000ms read delay (natural). |

## UI Integration

- **Launcher position:** Chat FAB at `fixed bottom-[88px] right-4`, WhatsApp FAB at `fixed bottom-4 right-4`. Stacked vertically — no overlap. Scroll-to-top FAB is on left (`left-4`). Good.
- **Z-indexes:** Chat FAB `z-50`, WhatsApp/scroll-top `z-50`, Chat window `z-[60]`. Header is `fixed top-0 ... z-50`. No collisions because positions don't overlap (header is top, FABs are bottom). When the chat window is open at 480px height it sits below the header with room to spare on desktop.
- **Mobile responsive:** Window width is `w-[380px] max-w-[calc(100vw-32px)]` and height `h-[480px] max-h-[85vh]`. Scales correctly on narrow screens. FAB is 56px touch target — meets WCAG.
- **Animations / polish:** Typing indicator (3 bouncing dots, staggered delays) on line 186-194. Auto-scroll to bottom on new messages (line 25-29). Good.

## Broken States / Regressions

- **Stale quick-reply buttons (from `lessons.md` history, commit `47ca758`):** FIXED. Line 169: `idx === messages.length - 1` guard ensures only the latest bot message renders quick-reply chips. Verified correct.
- **Typing delay only on greeting (from `lessons.md`, commit `ca5adcc`):** FIXED. Lines 35-43 apply `withDelay` to greeting, lines 82-88 apply typing delay to WhatsApp redirect, and line 93 explicitly routes all regular flow transitions through `triggerFlow(action, true)` so every bot reply has a natural pause. Verified correct.
- **Empty quick-replies array:** Not possible in current data — every flow either has `quickReplies` defined or leaves the field undefined (handled by `msg.quickReplies &&` guard line 169).
- **Empty/whitespace-only user input:** Handled — `handleSend` early-returns on `!text` after trim (line 103).
- **Timeouts / network errors:** N/A — chatbot is fully client-side, no API calls. `window.open(url)` is the only external IO and is best-effort.
- **State persistence:** `messages`, `input`, `hasOpened` are all component-local state. Closing and reopening the chat window preserves history (no state reset on close), but navigating to another page unmounts → fresh state. Acceptable.

## Anti-Pattern Checks

- **Placeholder `60000000000`:** Only present in `src/lib/config/contact.ts` (the documented single source). `chatbot-flows.ts` uses `whatsappUrl(...)` + `whatsappMessages.*` from contact.ts exclusively. PASS.
- **Fake contact forms:** None in the chatbot. It is 100% WhatsApp-first (correct for AIHAA). PASS.
- **"Selamat datang..." openings:** None. Greeting is `"Hi! Saya Azri dari Aihaa 👋 Ada apa boleh saya bantu?"` — natural Malaysian tone. PASS.
- **Overly corporate buzzwords (inovatif / holistik / komprehensif):** None found across all flow copy. PASS.
- **Machine-translation smell:** BM copy reads as natural Malaysian (e.g., "jom sambung di WhatsApp", "Nak beli, WhatsApp", "Team kami reply dalam 5 minit"). EN copy is idiomatic. PASS.
- **WhatsApp-first alignment:** Every intent funnels to a WhatsApp CTA. Product links exist only as browsing side-paths. PASS.

## Notes

- The chatbot is mounted on every page via `FloatingButtons`, not just Home — 12 pages include it (verified via grep). So issues here affect site-wide, not just `/`. The audit scope was "Home page" but the component is shared; fixes apply globally.
- Copy quality is genuinely high — this is one of the better-written flows in the codebase. Most issues above are about routing correctness (IA drift) and leaving i18n-bypass escape hatches, not tone.
- No `chatbot_*` i18n keys exist in `translations.ts` (confirmed — 0 matches). All chatbot copy lives in `chatbot-flows.ts` as inline `Record<Locale, string>`. This is a defensible pattern (keeps flow data co-located) but is inconsistent with the anti-hardcode rule in CLAUDE.md. Consider documenting the exception explicitly in `chatbot-flows.ts` with a header comment, or migrating flow copy to translation keys.
- The `Azri` persona in the chatbot header mirrors the repo owner's name (`me.md`, git author `Syedazriiskandar00`). If AIHAA wants to project a team face rather than a personal one, consider "AIHAA Team" / "Pasukan AIHAA".
- No tests exist for the chatbot flow graph (e.g., "every action reaches WhatsApp within N hops"). A simple unit test asserting every non-terminal flow has either a `whatsapp*` or `greeting` action in its quick-replies would guard against future IA drift.

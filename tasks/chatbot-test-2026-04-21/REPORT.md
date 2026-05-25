# Chatbot Test Report — 2026-04-21

## Environment
- **Target:** `http://localhost:3000` (Vercel preview gated behind Auth, switched to localhost per Azri decision)
- **HEAD commit tested:** `f323957` (warranty fix on top of Penapis Boring fix on top of Phase 7)
- **UF warranty fix status:** ✅ PASS (verified in Flow 5 + /product/uf-double-backwash detail page both show "10 Tahun (UF Membrane)")
- **Dev server:** Next.js 15.3.7 Turbopack (Ready in 29.2s)
- **Browser:** Playwright MCP — Chromium
- **Desktop viewport:** 1440 × 900
- **Mobile viewport:** 390 × 844 (iPhone 14)
- **Language:** BM default, EN spot-tested for toggle behaviour

## Pre-flight: ✅ PASS
- Status 200 OK
- Title: `AIHAA | Penapis Air Premium Sekali Bayar Malaysia`
- Chatbot trigger visible at (1360, 756), 56 × 56 bottom-right, dark `#0D0D0D` with gold border
- No page errors; 1 pre-existing asset 404 + 1 LCP `next/image` priority warning — unrelated to chatbot
- Evidence: `preflight/01-home-1440x900.png`, `preflight/02-chatbot-trigger-highlighted.png`

## Flow results

| Flow | Status | Evidence | Notes |
|------|--------|----------|-------|
| 1 Greeting | ✅ PASS | `flow-1-greeting/` (3 screenshots) | Header "Azri — Aihaa", subtitle "Biasanya reply dalam 5 minit", avatar gold "A", 6 quick replies rendered verbatim from code. First-message timing 19.5s was Turbopack cold compile — warm-run measured 758ms (§UX). |
| 2 Harga | ✅ PASS | `flow-2-harga/` (3 screenshots) | 3 options all functional. Option A = price summary + 3 sub-replies; Option B = routes to `recommend_budget` correctly; Option C = WhatsApp fired at 1038ms with URL `?text=Hai%2C%20saya%20nak%20tanya%20harga%20penapis%20air%20AIHAA.` |
| 3 Recommend — Path A `<RM800` | ✅ PASS | `flow-3-recommend/path-A-low-*` | Resolves to **AIHAA EAN (RM780)**. WhatsApp URL = `berminat dengan AIHAA EAN (RM780)`. |
| 3 Recommend — Path B `RM800-1200` | ✅ PASS | `flow-3-recommend/path-B-mid-*` | Resolves to **AIHAA BELLA (RM1,080)**. WhatsApp URL = `berminat dengan AIHAA BELLA (RM1,080)`. |
| 3 Recommend — Path C `RM1200+` | ✅ PASS | `flow-3-recommend/path-C-high-*` | Resolves to **AIHAA WINTER (RM1,580)**. WhatsApp URL = `berminat dengan AIHAA WINTER (RM1,580)`. |
| 4 Coverage | ✅ PASS | `flow-4-coverage/` (3 screenshots) | All 12 Semenanjung states listed. Sabah/Sarawak branch → graceful decline bubble. WhatsApp fallback fires generic URL. |
| 5 Warranty | ✅ PASS | `flow-5-warranty/` (3 screenshots) | **UF FIX VERIFIED**. Chatbot message now has 3 bullets: Indoor 2y / Outdoor 2y / UF Double Backwash 10y (UF Membrane). Claim WhatsApp URL = `nak claim warranty AIHAA`. `/product/uf-double-backwash` page also shows "10 Tahun (UF Membrane)" in 2 places (spec row + service-info card). |
| 6 Existing customer | ✅ PASS | `flow-6-existing/` (3 screenshots) | 4 options exactly per code: Nak tukar filter / Ada masalah / Nak upgrade / Menu utama. Filter-change sub-flow response + WhatsApp order URL both correct. |
| 7 WhatsApp redirect | ✅ PASS | `flow-7-whatsapp/` (4 screenshots) | **Precise delay = 1065ms** (code = 1000ms setTimeout + JS overhead). Redirect bubble appears within 14ms of click. BELLA-context URL + generic `WhatsApp terus` URL both distinct and correctly formatted. All URLs use `wa.me/60000000000` placeholder — EXPECTED. |
| 8 Free text keyword | ✅ PASS | `flow-8-freetext/` (10 screenshots) | `harga` → price flow, `warranty` → warranty flow, `waranti` (BM) → warranty flow, `coverage` → coverage flow, `asdf qwerty xyz123` → graceful fallback ("Soalan bagus! Untuk jawapan yang lebih tepat, jom sambung di WhatsApp"). |
| 9 Menu utama | ⚠️ PARTIAL | `flow-9-menu/` (2 screenshots) | State NOT cleared — greeting re-added as 4th bubble on top of 3 existing bubbles. Old quick replies (12) remain clickable alongside new greeting replies (6) = 18 total visible. Functional (greeting re-fires) but UX-unclean. |

## UX findings

### Timing (warm, post-Turbopack-compile)
- **Initial greeting typing delay:** 758ms (code = 800ms setTimeout in `triggerFlow("greeting", true)`) — within 0.5–1s spec ✅
- **Open → typing indicator appears:** 301ms (React render + state update)
- **Quick-reply action response:** 96ms — instant (code uses `withDelay=false` for non-greeting flows) — feels slightly robotic; would benefit from a 300–500ms typing indicator on every bot reply, not just greeting. Low priority.
- **Cold-compile first-paint in dev mode:** ~17s after click — dev-only artifact, not production.

### Language toggle mid-conversation ⚠️ UX ISSUE
- **New messages render in target locale** correctly ✅ (EN toggle produced "AIHAA water purifiers start from RM399 — one-time payment!")
- **Old messages stay in original locale** ❌ (BM greeting bubble remains "Hi! Saya Azri..." after EN toggle)
- **Old quick-reply buttons stay in original locale** ❌ (BM replies "Coverage kawasan saya?", "Saya pelanggan sedia ada", "WhatsApp terus" still visible)
- **Root cause:** `Chatbot.tsx` stores already-translated strings in `messages` state array at render-time. Toggle changes `locale` but doesn't re-translate stored messages.
- **Evidence:** `ux-language/01-bm-greeting.png`, `ux-language/02-after-en-toggle.png`, `ux-language/03-new-flow-in-en.png`
- **Fix cost estimate:** Medium. Need to store `{ messageKey: string, locale: Locale }` or `{ action: string }` references instead of pre-rendered text, then re-resolve on every render against current `locale`. ~30 min refactor.

### Mobile (390 × 844 iPhone 14) ⚠️ SPEC DIVERGENCE
- Chat window renders as **358 × 480 floating bubble** at `(8, 348)` — NOT fullscreen.
- Trigger at `(310, 700)` 56×56. Chat window fits within viewport. Input field reachable at y=775 (69px from bottom edge, above keyboard area).
- Flow 3 functional test on mobile — resolves to EAN correctly.
- **Azri's spec expected:** fullscreen on mobile. **Code ships:** `max-w-[calc(100vw-32px)] max-h-[85vh]`. The 358px width is viewport-16 each side; 480px height is fixed, not `h-[85vh]`. To hit true mobile-fullscreen would need breakpoint-aware width + height + bottom inset. Evidence: `ux-mobile/01-home-mobile.png`, `ux-mobile/02-chatbot-open-mobile.png`, `ux-mobile/03-ean-recommendation-mobile.png`
- **Current behaviour:** works functionally, but feels cramped vs. production chatbots like Intercom/Drift which go fullscreen on small screens.

### Stale quick-reply buttons (cross-flow UX concern)
- After any action, old bot messages' quick-reply buttons **remain clickable** in the scroll history.
- Example: after traversing Greeting → Recommend → EAN result, 12 stale buttons are still clickable including "Bawah RM800", "RM800 - RM1,200", "Menu utama" from 2 prior steps.
- Users may accidentally click an old option and jump back mid-flow without understanding why.
- **Fix:** disable `quickReplies` on any non-latest bot message (e.g. fade to 40% opacity + `pointer-events: none`). One-line CSS per message render.

## Critical bugs (block launch)
**NONE.** All 9 flows functionally work. UF Double Backwash warranty data-accuracy bug already fixed and verified in this session.

## UX improvements (nice-to-have, non-blocking)
1. **Language toggle state re-translation** — refactor `messages` state to reference keys/actions and re-resolve on locale change. Medium effort, high polish.
2. **Typing indicator on all bot replies** — currently only the initial greeting shows the animated dots; subsequent quick-reply responses appear instantly. Adding the same 600–800ms typing delay to every bot reply would make the persona feel more human. Low effort: change `triggerFlow(action, false)` → `triggerFlow(action, true)` in `handleAction`.
3. **Disable old quick-reply buttons** — once a user has clicked a reply, fade the prior buttons to 40% opacity + `pointer-events: none`. Prevents accidental re-clicks of stale options. Low effort.
4. **Mobile fullscreen mode** — breakpoint-specific full-height chat window for phones. Medium effort; requires touch-scroll and iOS keyboard handling verification.
5. **"Menu utama" clears state (optional)** — alternative to #3: clicking "Menu utama" could reset `messages` array entirely, giving the user a clean restart. Low effort, but loses conversation history which some users want.
6. **Generic quick-reply accumulator** — 6 greeting + 3 price + 3 recommend + 3 per-product = 15+ buttons by step 4. Even with stale-disable (#3) it's a lot of visual noise. Could also scroll-anchor the latest bot message so old buttons are off-screen by default.

## Known expected issues (NOT bugs)
- **WhatsApp placeholder `60000000000`** — all 9 distinct WhatsApp URLs captured during test use this placeholder. Azri will replace via `src/lib/config/contact.ts` single-source before merge to main.
- **Dev-mode cold compile lag** — first interaction after dev-server start takes ~17s to resolve due to Turbopack on-demand compilation. Does not occur in production build.
- **Playwright MCP Discord overlay** — required a `document.querySelector('#mcp-discord-button')?.remove()` call on every page load. Artifact of the test tool, not shipping code.
- **Chatbot trigger is dark `#0D0D0D` with gold border**, not "gold bulatan" as Azri's memory suggested. Gold is the "A" avatar inside the header, not the trigger itself. Non-issue — the contrast against the page is intentional.

## Recommended next action

**Proceed to Priority B (photoshoot execution).**

Rationale: chatbot ships launch-ready. No critical bugs. The 6 UX improvements are all "nice-to-have" post-launch polish, none gate production. Suggested sequence:

1. **Now:** Commit test artifacts + this report. Push to `feat/corporate-rebuild-2026-q2`.
2. **Batch later (1 dev session, ~2h):** Implement improvements #2 (typing on all replies) + #3 (disable old buttons) + #1 (language toggle refactor). Improvements #4 and #6 can defer to post-launch feedback.
3. **Before merge to main:** Azri supplies real WhatsApp/phone number → one-line edit in `contact.ts`. No chatbot code changes needed for the number swap — the 9 context-based pre-filled messages auto-use whatever URL `whatsappUrl()` builds.

## Appendix — File inventory
```
tasks/chatbot-test-2026-04-21/
├── REPORT.md                              (this file)
├── preflight/
│   ├── 01-home-1440x900.png
│   └── 02-chatbot-trigger-highlighted.png
├── flow-1-greeting/          (3 screenshots)
├── flow-2-harga/             (3 screenshots)
├── flow-3-recommend/         (9 screenshots — 3 paths × 3 steps)
├── flow-4-coverage/          (3 screenshots)
├── flow-5-warranty/          (3 screenshots, incl. UF product page)
├── flow-6-existing/          (3 screenshots)
├── flow-7-whatsapp/          (4 screenshots)
├── flow-8-freetext/          (10 screenshots — 5 inputs × 2 steps)
├── flow-9-menu/              (2 screenshots)
├── ux-timing/                (timing metrics captured in report)
├── ux-language/              (3 screenshots)
└── ux-mobile/                (3 screenshots)
```

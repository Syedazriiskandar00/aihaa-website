# Home Page i18n Audit — 2026-04-23

## Executive Summary
BM/EN dictionaries are in perfect structural parity (530 keys each) and every `t.<key>` referenced by the Home tree resolves to a declared interface key — no runtime KeyErrors. The real issues are (a) a hydration-mismatch pattern in `LanguageContext` that flashes BM before swapping to EN on EN-preferring returning visitors, (b) eight Phase-4 homepage keys that were shipped but never referenced after HomeHero/SignatureCollection were flattened to image-only layouts, and (c) `<html lang="en">` hardcoded regardless of locale.

## Issues Found

### 1. [HIGH] Hydration mismatch on locale — BM flash for EN users
- **File:** src/lib/i18n/LanguageContext.tsx
- **Line:** 15–22
- **Current:** `useState<Locale>("bm")` seeds the server render with BM unconditionally. The `useEffect` that reads `localStorage.getItem("aihaa-lang")` only fires on the client after mount, so an EN-preferring returning visitor sees a full BM paint, then every `t.*` string visibly swaps to EN on hydration. `layout.tsx` has `suppressHydrationWarning` on `<body>` which silences the warning but does not fix the visible swap.
- **Recommended fix:** Either (a) read the locale in a server component from a cookie and pass it down (proper App Router pattern — move the saved locale into a cookie alongside / in place of localStorage), or (b) wrap rendered strings in a mount gate so the first paint matches SSR exactly and only swap after an idle frame. Do NOT leave `suppressHydrationWarning` as the "fix" — it masks a real UX flash.

### 2. [HIGH] `<html lang>` hardcoded to `"en"` — never tracks locale
- **File:** src/app/layout.tsx
- **Line:** 25
- **Current:** `<html lang="en" className="scroll-smooth">`. This attribute is used by screen readers, Google's language classifier, and Chrome translate. BM users get `lang="en"` permanently, which both hurts SEO on Malay queries and causes assistive tech to mispronounce Bahasa Melayu content.
- **Recommended fix:** Promote locale to a server-readable source (cookie), set `<html lang={locale === "bm" ? "ms" : "en"}>` in the root layout. Note: the ISO code for Bahasa Melayu is `ms` — keep the internal locale code as `"bm"` (already the convention), but emit `ms` to the `lang` attribute.

### 3. [MEDIUM] `localStorage.getItem` unguarded — throws in restricted contexts
- **File:** src/lib/i18n/LanguageContext.tsx
- **Line:** 18, 26
- **Current:** `localStorage.getItem("aihaa-lang")` and `localStorage.setItem(...)` run with no try/catch. In Safari Private mode and some Chromium extensions/iframes `localStorage` access throws `SecurityError`, which would bubble up and unmount the provider.
- **Recommended fix:** Wrap both reads and writes in try/catch and fall back silently to the default locale.

### 4. [MEDIUM] Dead homepage-only keys — HomeHero + SignatureCollection flatten
- **File:** src/lib/i18n/translations.ts
- **Line:** 385–397 (interface), plus matching entries in both dicts
- **Current:** These keys were shipped for Phase 4 but are no longer referenced after HomeHero became a single flat image with two CTAs, and SignatureCollection became a flat image with two invisible link halves:
  - `home_hero_eyebrow`
  - `home_hero_title_1`
  - `home_hero_title_2`
  - `home_hero_title_3`
  - `home_hero_subtitle`
  - `home_collection_eyebrow`
  - `home_collection_tab_indoor`
  - `home_collection_tab_outdoor`
- **Recommended fix:** Delete the 8 keys from the `TranslationKeys` interface and both dictionaries, unless Phase 4 intends to re-add overlay text on the hero. Leaving them invites drift (copy updated in Figma will never surface).

### 5. [LOW] Hardcoded Malay strings escape the i18n system in Home tree
- **File:** src/components/BenefitsSection.tsx
- **Line:** 29, 34, 44
- **Current:** `highlight: "2 Tahun"` (line 29) and `highlight: "JAKIM"` (line 34) are literal strings for Benefits cards 3 and 4, and the "Keistimewaan" eyebrow on line 44 is hardcoded. None translate to EN.
- **Recommended fix:** "JAKIM" is a brand identifier — keep hardcoded. But "2 Tahun" should be a new key (e.g. `benefits_3_badge`) like `benefits_1_badge` and `benefits_2_badge` already are — the asymmetry is a bug. "Keistimewaan" should be an i18n key (English equivalent likely "Our Edge" / "Features"). Note there is already a `benefits_3_badge` in the interface? No — checked: only `benefits_1_badge` and `benefits_2_badge` exist. Add `benefits_3_badge` and a new `benefits_eyebrow` key.

### 6. [LOW] Footer col-3 uses `t.cta_location` for the address line
- **File:** src/components/Footer.tsx
- **Line:** 83
- **Current:** Reuses `cta_location` ("Semenanjung Malaysia" / "Peninsular Malaysia") under the MapPin icon inside the Footer's Contact column. Works today, but semantically the footer wants a fuller address string and the CTA section wants the short badge; coupling them means any future fix to one breaks the other.
- **Recommended fix:** Introduce `footer_address` (or similar) and leave `cta_location` exclusive to the CTA badge.

### 7. [LOW] CTASection hardcodes email address
- **File:** src/components/CTASection.tsx
- **Line:** 46
- **Current:** `aihaa.marketing@gmail.com` appears inline in JSX. The WhatsApp number is already centralised via `PHONE_NUMBER_DISPLAY` on line 36, so this is the one remaining hardcoded contact identifier on the Home page.
- **Recommended fix:** Add `EMAIL_ADDRESS` to `src/lib/config/contact.ts` and import here + in `Footer.tsx` (also hardcoded on line 78).

### 8. [LOW] Chatbot bypasses the i18n system entirely
- **File:** src/components/Chatbot.tsx
- **Line:** 139, 204
- **Current:** The chatbot uses `locale === "bm" ? "BM string" : "EN string"` inline for the "Biasanya reply dalam 5 minit" subtitle and the "Taip mesej..." input placeholder, instead of adding keys to `translations.ts` like every other component. Flow content lives in `src/lib/chatbot-flows.ts` with its own `{ bm, en }` dual-string shape — a parallel i18n system.
- **Recommended fix:** Out of scope for this sprint if the chatbot is treated as a micro-app, but flag for a future unification pass. Minimum: add `chatbot_reply_time` and `chatbot_input_placeholder` to `translations.ts`.

## Keys Missing
None. All 52 `t.<key>` references in the Home tree resolve to declared keys in the `TranslationKeys` interface.

## Keys Orphan
478 of 530 interface keys are not referenced by any file in the Home tree. The vast majority belong to other pages (they ARE used elsewhere in the app and should not be deleted). Breakdown by prefix — use this to spot genuine orphans vs. legitimately-used-elsewhere:

- **Dead (Home-specific, safe to delete if no Phase 4 revert planned):** 8 keys — see Issue #4 above (`home_hero_eyebrow`, `home_hero_title_1..3`, `home_hero_subtitle`, `home_collection_eyebrow`, `home_collection_tab_indoor`, `home_collection_tab_outdoor`).
- **Stale / pre-2026 rebuild** (used by `/water-purifier` legacy page and `/why-aihaa` which the corporate rebuild routes around — verify they are still rendered before deleting):
  - `hero_badge`, `hero_cta_products`, `hero_cta_promotions`, `hero_subtitle`, `hero_title_1`, `hero_title_2` (old top-hero, predates `home_hero_*`)
  - `why_founder_*` (4), `why_compare_*` (23), `why_testi_1..3_*` (6), `why_impact_*` (10) — 43 keys for the `/why-aihaa` section
  - `category_*` (10) — old category split-card section
- **Used on non-Home pages (NOT orphans, DO NOT delete):**
  - `about_*` (42) → `/tentang-kami`
  - `service_*` (84) → `/service`
  - `produk_dalam_*` (22) → `/produk-dalam`
  - `produk_luar_*` (21) → `/produk-luar`
  - `product_detail_*` (13), `product_*` (60+, Phase 7 detail-page sections) → `/product/[id]`
  - `faq_*` (24) → `/faq`
  - `promo_*` (26) → `/promotions`
  - `contact_*` (30) → `/contact`
  - `gallery_*` (10) → `/galeri`
  - `detail_*` (7), `product_cta_*`, `product_hero_*`, `product_indoor_*`, `product_outdoor_*`, `product_statement`, `product_view_details`, `product_featured_*` → legacy `/water-purifier`
  - `common_from`, `common_month`, `common_sekali_bayar` → used in product cards / outdoor page
- **Smell — duplicate semantic content:** `why_testi_1_quote` ≈ `home_testi_quote_1_text` (same customer quote, slight wording drift between BM dicts: "Aihaa" vs "AIHAA"). If `/why-aihaa` is being retired, fold into homepage source. If both stay, decide whether one is canonical.

## Notes
- Locale codes are correctly `"bm" | "en"` as the CLAUDE.md brain mandates — no stray `"ms"` / `"en-US"` inside the i18n system. The `<html lang="en">` issue (#2) is the only place where the ISO code `ms` should surface.
- `localStorage` key is `aihaa-lang` — consistent, single reference point.
- Interface line 133–142 declares paired keys on the same line (`faq_q1: string; faq_a1: string;`). This pattern works fine but trips naive regex-based key extractors — worth converting to one-per-line on the next translations.ts touch, purely for tooling friendliness.
- No `{{var}}` / `%s` / `${var}` interpolation patterns exist in any string value — every entry is a static template, so the naive `translations[locale]` object lookup is safe.
- Chatbot runs its own i18n out of `src/lib/chatbot-flows.ts` with inline `{ bm, en }` objects — not an issue on Home per se, but worth noting that "all i18n lives in translations.ts" is not literally true.
- `layout.tsx` sets `suppressHydrationWarning` on `<body>` (line 56). This is a band-aid for Issue #1; the real fix is moving locale to a cookie or a mount gate, not silencing the warning.

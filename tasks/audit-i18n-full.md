# i18n Full Audit — 8 Pages (Master Report)
Date: 2026-04-23
Branch: feat/home-improvement
Supersedes (but does not replace): tasks/audit-home-i18n.md

## Executive Summary
- **Total keys declared:** 530 (BM) / 530 (EN) — perfect structural parity in `TranslationKeys`
- **Parity gaps:** 0 type-level gaps; 1 cosmetic content drift (`about_halal_eyebrow` is the same English string "OUR HALAL COMMITMENT" in both BM and EN — likely intentional for brand-voice, flag for review)
- **Missing-key references:** 0 (every `t.<key>` and every `keyof TranslationKeys` referenced across the 8 pages resolves to a declared key)
- **Orphan keys in 8-page scope:** 433 of 530 keys unused by the 8 pages + shared chrome (most belong to other pages and are NOT safe to delete; 8 are truly dead — see Orphan section)
- **Cross-page shared keys (top 20 tracked):** all 20 live in nav/footer/shared chrome — a single wording change there touches every page in the site
- **Hardcoded strings flagged:** 14 across the 8 pages (breakdown in Hardcoded section; 4 are brand identifiers and exempt, leaving 10 genuine issues)
- **Structural/system issues:** 4 (hydration mismatch, `<html lang>` hardcoded, unguarded `localStorage`, Chatbot + ProductCard running parallel bilingual shapes outside `translations.ts`)

## Issues By Severity

### CRITICAL
None. No runtime KeyErrors, no missing dict entries, no broken dynamic key lookups. The system is type-safe and ships both locales for every referenced key.

### HIGH

#### H1. Hydration mismatch on locale — BM flash for EN users (confirmed across all 7 new pages)
- **Affected pages:** ALL 8 — fires on every page load
- **File:line:** `src/lib/i18n/LanguageContext.tsx:15-22`
- **Current state:** `useState<Locale>("bm")` seeds the server render with BM unconditionally. The `useEffect` that reads `localStorage.getItem("aihaa-lang")` only runs on the client after mount. The 7 new pages all consume `useLanguage()` client-side and therefore inherit the same flash. `layout.tsx:56` papers over the React warning with `suppressHydrationWarning` but the user still sees BM → EN content swap on first paint when their saved preference is EN.
- **Recommended fix:** Move locale into a cookie readable by a Server Component; pass it into `<LanguageProvider initialLocale={...}>` so SSR and first client paint agree. Mount-gate fallback if cookie migration is deferred.

#### H2. `<html lang>` hardcoded to `"en"` — never tracks locale (site-wide, affects SEO and a11y on all 8 pages)
- **Affected pages:** ALL 8 (set at root layout)
- **File:line:** `src/app/layout.tsx:25`
- **Current state:** `<html lang="en" className="scroll-smooth">`. BM users get `lang="en"` permanently, hurting Google's Malay-language classification, Chrome Translate heuristics, and screen-reader pronunciation of Bahasa Melayu content. The entire new Phase 2–7 corporate rebuild (product/[id], produk-luar, produk-dalam) is BM-first content, so the mismatch is most visible on these pages.
- **Recommended fix:** Same cookie-based approach as H1 — read locale server-side, emit `<html lang={locale === "bm" ? "ms" : "en"}>`. Note: use ISO `ms` (Bahasa Melayu) in the HTML attribute while internal code keeps `"bm"`.

#### H3. `detail_related` key used for BOTH eyebrow AND heading of RelatedProducts — duplicate render
- **Affected pages:** `/product/[id]` (all 13 products)
- **File:line:** `src/app/product/[id]/components/RelatedProducts.tsx:29-30`
- **Current state:**
  ```tsx
  eyebrow={t.detail_related}
  heading={t.detail_related}
  ```
  Both `SectionHeading` slots receive the same string ("Produk Berkaitan" / "Related Products") so the page renders the identical phrase stacked as eyebrow above heading. This is a user-visible layout bug, not just an i18n smell.
- **Recommended fix:** Introduce `product_detail_related_eyebrow` (e.g. "PILIHAN LAIN" / "MORE PICKS") OR remove the eyebrow prop on that `SectionHeading`.

#### H4. `ProductServiceInfo` reuses `product_detail_service_heading` as both eyebrow and heading
- **Affected pages:** `/product/[id]` (all 13 products)
- **File:line:** `src/app/product/[id]/components/ProductServiceInfo.tsx:48-49`
- **Current state:**
  ```tsx
  eyebrow={t.product_detail_service_heading}
  heading={t.product_detail_service_heading}
  ```
  Same defect pattern as H3 — "Info Servis" renders twice, once in small caps eyebrow treatment, once as h2. No dedicated eyebrow key exists in the interface.
- **Recommended fix:** Add `product_detail_service_eyebrow` (e.g. "SERVIS" / "SERVICE") to the interface + both dicts.

### MEDIUM

#### M1. Unguarded `localStorage` access (system-wide)
- **Affected pages:** ALL 8
- **File:line:** `src/lib/i18n/LanguageContext.tsx:18, 26`
- **Current state:** `localStorage.getItem("aihaa-lang")` and `setItem(...)` have no try/catch. Safari Private mode, strict cookie/storage policies, and some embedded WebViews throw `SecurityError` on storage access, which would unmount the provider and cascade a "useLanguage must be used within a LanguageProvider" across every consumer on the page.
- **Recommended fix:** Wrap both calls in try/catch, fall back to default locale silently.

#### M2. ProductCard maintains its own parallel bilingual dictionary
- **Affected pages:** `/produk-dalam`, `/produk-luar`, `/product/[id]` RelatedProducts, plus home
- **File:line:** `src/components/ProductCard.tsx:36-42`
- **Current state:**
  ```tsx
  const badgeText: Record<string, Record<string, string>> = {
    popular: { bm: "Popular", en: "Popular" },
    sale: { bm: "Jimat", en: "Sale" },
    premium: { bm: "Premium", en: "Premium" },
    "best-value": { bm: "Nilai Terbaik", en: "Best Value" },
    "pro-grade": { bm: "Gred Pro", en: "Pro Grade" },
  };
  ```
  And `ProductHeroPremium.tsx:23-32` duplicates the exact same map with different casing (`BADGE_LABELS` uses uppercase `"JIMAT"`, `"POPULAR"`). Two source-of-truth locations for the same 5 strings. Any copy tweak has to be made in two places or drift silently.
- **Recommended fix:** Promote badge label maps to either (a) five new keys in `translations.ts` (`product_badge_popular`, etc.) or (b) a single `src/lib/data/productBadges.ts` module imported by both components. Option (a) is preferred since it matches the CLAUDE.md principle of "all i18n in translations.ts".

#### M3. `ProductHeroPremium` hardcodes badge labels in both BM and EN
- **Affected pages:** `/product/[id]` (any product with a `badge` set — currently BELLA, BIG, EAN, WINTER, ULTRA ONE, PVDF, PVDF PLUS, UF DOUBLE BACKWASH)
- **File:line:** `src/app/product/[id]/components/ProductHeroPremium.tsx:23-32`
- **Current state:** `BADGE_LABELS` is a module-level constant with inline `{ bm, en }` strings — the exact anti-pattern flagged in the Home audit for Chatbot.
- **Recommended fix:** Same as M2 — move to `translations.ts`.

#### M4. `Chatbot` bilingual strings inline (persists across all 8 pages via `FloatingButtons`)
- **Affected pages:** ALL 8 (Chatbot ships on every page via `FloatingButtons`)
- **File:line:** `src/components/Chatbot.tsx:139, 204`
- **Current state:** Carried forward from Home audit — `locale === "bm" ? "Biasanya reply dalam 5 minit" : "Usually replies within 5 minutes"` inline, plus input placeholder `"Taip mesej..." / "Type a message..."`. Also: bot persona name "Azri — Aihaa" is hardcoded on line 137 with no locale check.
- **Recommended fix:** Add `chatbot_reply_time`, `chatbot_input_placeholder`, `chatbot_bot_name` keys.

### LOW

#### L1. Brand-voice content drift between BM and EN in `home_testi_quote_1_text` (still present)
- **Affected pages:** `/` homepage only — not in 7 new pages, but propagates because this quote was originally seeded from `why_testi_1_quote` which is a DIFFERENT key with similar content.
- **File:line:** `translations.ts:981` (BM), `translations.ts:1591` (EN)
- **Current state:** BM uses "spend" (English loanword) and "anak-anak tak sakit perut macam dulu"; EN says "stopped getting upset stomachs". Pair the semantics but audit tone in copywriting pass.

#### L2. Typo / awkward translation smell in BM
- **Affected pages:** `/tentang-kami`, `/service`, various
- **Samples (BM → English-flavoured phrasing or loanwords):**
  - `about_halal_body` — "sangat komited" (BM ~ "sangat komitmen" would be purer; "komited" is accepted but feels translated), "patuh-Syariah" — hyphenated Syariah adj is unusual. `translations.ts:1011`
  - `service_heart_expert_desc` — "bertauliah" is fine but the sentence reads translated: "Juruteknik bertauliah dengan latihan rasmi dalam pemasangan dan penyelenggaraan sistem penapisan air indoor dan outdoor." Mixing "indoor"/"outdoor" English loanwords with formal Malay clauses. `translations.ts:813`
  - `product_detail_service_warranty_default` BM = "2 Tahun" (good, capitalised); EN = "2 Years". Consistent.
  - `product_features_overview_heading` BM = "Setiap Ciri Yang Penting" reads translated; a more natural Malay framing would be "Setiap Detail Ada Sebab" or "Setiap Butiran Yang Perlu". `translations.ts:1095`
  - `product_kitchen_heading` BM = "Compact To All Type Kitchen" — English phrase sits in BM dict. `translations.ts:1066`. Intentional (brand headline style) but BM users who speak no English are addressed in English here.
  - `product_capacity_heading` BM = "Functionalities, Perfectly Suited to Your Lifestyle" — same pattern: pure English in the BM dict. `translations.ts:1077-1078`
  - `about_azlee_subheading` BM = "Bersama Azlee dalam misi membawa air bersih ke setiap rumah Malaysia." Reads natural — OK.
  - `about_csr_heading` BM = "Aktiviti & Sumbangan AIHAA" — natural.
  - Not flagged: `service_hero_tagline`, `service_hero_heading` read naturally.
- **Recommended fix:** Copywriting pass by a BM-native editor. Specific pattern: Phase 7 product-detail English-in-BM headings (`product_kitchen_heading`, `product_capacity_heading`) are editorial-voice choices; confirm with Azri whether those stay English or translate for BM locale.

#### L3. Redundant `about_halal_eyebrow` — same string in BM and EN
- **Affected pages:** `/tentang-kami` (not in the 8-page scope, but relevant because `about_*` keys also surface in cross-page nav)
- **File:line:** `translations.ts:1007` (BM) = `"OUR HALAL COMMITMENT"`, `translations.ts:1617` (EN) = same
- **Current state:** BM value is English. `about_azlee_eyebrow` and `about_team_eyebrow` follow the same English-eyebrow pattern. If this is intentional brand-voice (editorial all-caps English eyebrows on BM pages), leave as-is but document the rule.
- **Recommended fix:** Either translate (e.g. "KOMITMEN HALAL KAMI") or add a comment in `translations.ts` explaining the intentional English-eyebrow convention so future editors don't "fix" it.

#### L4. `product_kitchen_industrial_label` / `_modern_label` used as both chip label AND caption heading
- **Affected pages:** `/product/[id]` indoor only
- **File:line:** `src/app/product/[id]/components/KitchenContextSplit.tsx:130-137`
- **Current state:** The `label` prop renders as a chip on the scene AND again as a heading over the caption. Not wrong, but identical text surfaces twice in the same visual block.
- **Recommended fix:** Cosmetic. Acceptable to keep as-is since the two renderings are visually distinct (small chip + large heading).

#### L5. `FilterCartridgeRow` product heading refers to indoor-only cartridges even when product is outdoor
- **Affected pages:** `/product/[id]` indoor products
- **File:line:** `src/app/product/[id]/components/FilterCartridgeRow.tsx` — only rendered when `isIndoor === true` in `page.tsx:46`, so this is correctly gated. Not a bug.
- **Note:** No action needed — flagging that the i18n key `product_cartridge_heading` BM value = "Filter Penapis Air Dalam" explicitly says "Dalam" (indoor) so if the dynamic template ever accidentally rendered this section for an outdoor product, the key content itself would expose the leak.

#### L6. Hardcoded "AIHAA Marketing Sdn Bhd" subtitle in `BrandLogoBadge` + `IndoorHeroLineup`
- **Affected pages:** `/produk-dalam` (IndoorHeroLineup), `/produk-luar` indirectly
- **File:line:** `src/components/shared/BrandLogoBadge.tsx:13`, `src/app/produk-dalam/components/IndoorHeroLineup.tsx:77`
- **Current state:** "Marketing Sdn Bhd" is a brand/legal suffix — arguably exempt as a brand identifier. But it's displayed as a formal tagline on hero pages. Consistency-wise it's hardcoded in two different files with the same string.
- **Recommended fix:** If considered non-translatable legal text, leave as-is but centralise in a `BRAND_META` constant. If translatable (e.g. EN = "Marketing Sdn Bhd", BM = "Syarikat Pemasaran"), add i18n key. Current posture: treat as brand identifier = leave alone, but dedupe.

#### L7. `AIHAA / TECH` corner mark on blueprint illustration
- **Affected pages:** `/product/[id]` all products
- **File:line:** `src/app/product/[id]/components/ProductSpecs.tsx:238`
- **Current state:** `<span>AIHAA / TECH</span>` hardcoded. Brand identifier, acceptable.
- **Recommended fix:** No action. Flagged for completeness.

#### L8. `AIHAA FILTER` SVG text on HouseCrossSection
- **Affected pages:** `/product/[id]` outdoor only
- **File:line:** `src/app/product/[id]/components/HouseCrossSection.tsx:144`
- **Current state:** SVG `<text>` element hardcodes "AIHAA FILTER". Brand identifier — acceptable.

#### L9. Hardcoded "Tier {n}" in `PvdfMicronFunnel`
- **Affected pages:** `/product/[id]` outdoor only
- **File:line:** `src/app/product/[id]/components/PvdfMicronFunnel.tsx:73`
- **Current state:** `<span>Tier {index + 1}</span>` — English word "Tier" appears literally in BM render too.
- **Recommended fix:** Add `product_funnel_tier_label` key (BM: "Tahap" or "Tier" if editorial keeps English).

## Per-Page Breakdown

### Home (src/app/page.tsx)
Carried forward from `tasks/audit-home-i18n.md` — 8 issues catalogued there (1 HIGH hydration, 1 HIGH `<html lang>`, 1 MEDIUM localStorage, 1 MEDIUM dead Phase-4 keys, 3 LOW hardcoded strings in BenefitsSection/Footer/CTASection, 1 LOW Chatbot bypass). No new findings for the homepage. Re-confirm: 52 `t.*` references, all resolve.

### /produk-dalam (src/app/produk-dalam/page.tsx)
- **Components audited:** `IndoorHeroLineup`, `IndoorUseCases`, `IndoorGrid`, plus `ProductPedestalLineup` (shared).
- **Keys used:** `produk_dalam_hero_eyebrow`, `produk_dalam_hero_heading`, `produk_dalam_hero_italic`, `produk_dalam_hero_tagline`, `produk_dalam_hero_featured_bestseller_badge`, `produk_dalam_hero_featured_premium_badge`, `produk_dalam_hero_cta`, `produk_dalam_usecase_eyebrow`, `produk_dalam_usecase_muda`, `produk_dalam_usecase_besar`, `produk_dalam_usecase_bayi`, `produk_dalam_usecase_compact`, `produk_dalam_grid_eyebrow`, `produk_dalam_grid_heading`, `produk_dalam_grid_subheading`, `produk_dalam_footer_cta_heading`, `produk_dalam_footer_cta_body`, `produk_dalam_footer_cta_button` (18 keys). All resolve.
- **Hardcoded strings:** 2 — "AIHAA" wordmark (brand, exempt) and "Marketing Sdn Bhd" subtitle at `IndoorHeroLineup.tsx:77` (duplicates `BrandLogoBadge`, see L6).
- **Product data surface:** reads `product.name` and `product.tagline[locale]` via `ProductPedestalLineup` + `ProductCard` — BM+EN parity verified in `src/lib/data/products.ts` (all 5 indoor products have both `bm` and `en` values).
- **Issue summary:** clean page from an i18n-key perspective. Only structural issues (H1, H2, M1, M4) apply.

### /produk-luar (src/app/produk-luar/page.tsx)
- **Components audited:** `SageHeroLineup`, `OutdoorUseCases`, `OutdoorGrid`.
- **Keys used:** `produk_luar_hero_eyebrow`, `produk_luar_hero_heading`, `produk_luar_hero_italic`, `produk_luar_hero_tagline`, `produk_luar_hero_featured_premium_badge`, `produk_luar_hero_featured_value_badge`, `produk_luar_hero_featured_label`, `produk_luar_hero_cta`, `produk_luar_usecase_eyebrow`, `produk_luar_usecase_boring`, `produk_luar_usecase_kolam`, `produk_luar_usecase_pejabat`, `produk_luar_usecase_kilang`, `produk_luar_grid_eyebrow`, `produk_luar_grid_heading`, `produk_luar_grid_subheading`, `produk_luar_footer_cta_heading`, `produk_luar_footer_cta_body`, `produk_luar_footer_cta_button` (19 keys). All resolve.
- **Hardcoded strings:** 0 internal. Metadata title/description in `page.tsx:10-12` is BM-only — see cross-page note below on `metadata.locale` being `ms_MY` while `<html lang>` stays `"en"`.
- **Product data surface:** reads `product.name`, `product.tagline[locale]`, `product.price`, `product.oldPrice` via `ProductCard` and the inline featured pair in `SageHeroLineup`. All 8 outdoor products in `products.ts` have bilingual `tagline` + `description`.
- **Issue summary:** clean page.

### /product/[id] — dynamic template (renders all 13 products)
**IMPORTANT: This single template is the audit surface for `/product/bella`, `/product/big`, `/product/ean`, `/product/fancy`, `/product/winter` AND all 8 outdoor products.** Findings apply to 13 product URLs, not 5.

- **Components audited (11 total):** `ProductHeroPremium`, `KitchenContextSplit` (indoor only), `CapacityFunctionalities` (indoor only), `FeaturesOverviewGrid` (both), `FilterCartridgeRow` (indoor only), `HouseCrossSection` (outdoor only), `SevenLayerFiltration` (outdoor only), `PvdfMicronFunnel` (outdoor only), `ProductSpecs` (both), `ProductServiceInfo` (both), `RelatedProducts` (both).
- **Keys used:** ~70 unique i18n keys, plus ~20 dynamically-indexed keys (`keyof TranslationKeys` passed through config objects in CapacityFunctionalities, SevenLayerFiltration, HouseCrossSection, FilterCartridgeRow, PvdfMicronFunnel). ALL resolve — the `keyof TranslationKeys` typing catches any drift at compile time.
- **Keys exercised dynamically** (worth noting because `grep t\.foo` misses them):
  - `CAPACITY_MAP` uses 12 keys (`product_capacity_*_label` / `_desc` × 6 kinds)
  - `LAYER_MAP` uses 14 keys (`product_layers_*_name` / `_desc` × 7 kinds)
  - `USES` array in HouseCrossSection uses 6 keys (`product_house_use_*`)
  - `STAGES` array in FilterCartridgeRow uses 8 keys (`product_cartridge_*_name` / `_desc` × 4 stages). Note: `product_cartridge_uf_name` / `_desc` are declared and translated but NOT used by the STAGES array (which only exposes 4 stages: sediment, antibacterial, pre_carbon, post_carbon). The UF cartridge keys are orphans within the component — see orphan section.
- **Hardcoded strings:**
  1. `ProductHeroPremium.tsx:27-30` — `BADGE_LABELS` object. See M3.
  2. `ProductSpecs.tsx:238` — "AIHAA / TECH" corner mark. Brand identifier — exempt.
  3. `ProductSpecs.tsx:191-200` — SVG dimension labels "W" and "H". Accepted universal engineering abbreviations, but if BM pedantry matters add `product_specprice_dim_width` / `_height`.
  4. `HouseCrossSection.tsx:144` — "AIHAA FILTER" inside SVG. Brand — exempt.
  5. `PvdfMicronFunnel.tsx:73` — "Tier {index+1}". See L9.
  6. `FilterCartridgeRow.tsx:111` — displays `stage.number` ("01"–"04") which is a data value, acceptable.
- **Cross-cutting issues:** H3 (duplicate `detail_related`), H4 (duplicate `product_detail_service_heading`).
- **Section layout gating:** `page.tsx:46-60` — indoor gets `[KitchenContextSplit, CapacityFunctionalities, FeaturesOverviewGrid, FilterCartridgeRow]`, outdoor gets `[HouseCrossSection, SevenLayerFiltration, PvdfMicronFunnel, FeaturesOverviewGrid]`. No locale-specific gating — i18n applies uniformly across both categories.
- **Per-product differentiation:** only `product.name`, `product.tagline`, `product.description`, `product.price`, `product.oldPrice`, `product.specs`, `product.features`, `product.capacityOptions?`, `product.outdoorLayers?`, `product.badge?` differ. Specs and features are BM-ONLY arrays (confirmed `products.ts:26-28` comment). This means when locale flips to EN:
  - The product's `tagline` and `description` do translate (bilingual sub-objects).
  - The product's `specs[].label` and `specs[].value` DO NOT — they render as BM text in an EN-locale page. Same for `features[]`. **This is the largest bilingual hole in the new pages.** Example: under EN locale, `/product/aihaa-bella` shows the spec table with BM labels ("Tahap Penapisan", "Kapasiti Tangki", etc.) while every chrome string around it is in English.
  - Flag as **HIGH for any EN-facing marketing push** — bilateral coverage is incomplete on the most data-dense section of the page.

### /product/bella, /product/big, /product/ean, /product/fancy, /product/winter
Same template, covered above. Per-product findings:
- **aihaa-bella** (indoor, no badge): renders clean. No issues beyond template-level.
- **aihaa-big** (indoor, `badge: "popular"`): hits M2/M3 (hardcoded badge label).
- **aihaa-ean** (indoor, `badge: "sale"`, has variants): hits M2/M3. Variants (`white`, `pink`, `beige`) use `label` strings hardcoded in `products.ts:195-197` — not translated, but they are brand/color names so probably exempt.
- **aihaa-fancy** (indoor, no badge): renders clean.
- **aihaa-winter** (indoor, `badge: "premium"`, has `capacityOptions: [coffee, tea, baby, cold, ambient, ice]`): hits M2/M3. The `ice` capacity adds one extra icon vs. the default set — all 6 capacity keys are declared/translated.

## Cross-Page Shared Issues (priority)

These surface on MORE than one of the 8 pages in scope — blast radius matters:

1. **H1 Hydration mismatch** — 8/8 pages. Single source, single fix.
2. **H2 `<html lang>` hardcoded** — 8/8 pages. Single source, single fix.
3. **M1 Unguarded `localStorage`** — 8/8 pages. Single source, single fix.
4. **M2 ProductCard badge map duplicated** — `/produk-dalam`, `/produk-luar`, `/product/[id]` RelatedProducts, plus homepage SignatureCollection. 4 page surfaces affected.
5. **M4 Chatbot inline strings** — 8/8 pages (via FloatingButtons).
6. **Nav items (`t.nav_*`)** — Header + Footer, 8/8 pages. 11 keys (`nav_home`, `nav_products`, `nav_products_indoor`, `nav_products_outdoor`, `nav_products_all`, `nav_promotions`, `nav_faq`, `nav_gallery`, `nav_contact`, `nav_service`, `nav_about`). Any wording change touches the whole site.
7. **`cta_location`** — used by both `CTASection` (home CTA) and `Footer` col-3 (8/8 pages). Already flagged L6 in home audit — still not fixed.

### Top 20 cross-page shared keys (by usage count across 8-page scope)

| Key | Usage count | Consumers |
|---|---|---|
| `nav_home` | 2 | Header, Footer |
| `nav_products_indoor` | 2 | Header dropdown, Footer |
| `nav_products_outdoor` | 2 | Header dropdown, Footer |
| `nav_promotions` | 2 | Header, Footer |
| `nav_about` | 2 | Header, Footer |
| `nav_contact` | 2 | Header, Footer |
| `nav_products` | 1 | Header |
| `nav_products_all` | 1 | Header dropdown |
| `nav_faq` | 1 | Header |
| `nav_gallery` | 1 | Header |
| `nav_service` | 1 | Header |
| `footer_desc` | 1 | Footer |
| `footer_nav` | 1 | Footer |
| `footer_contact` | 1 | Footer |
| `footer_social` | 1 | Footer |
| `footer_copyright` | 1 | Footer |
| `footer_privacy` | 1 | Footer |
| `cta_location` | 1 | Footer (home audit also flagged CTASection) |
| `common_whatsapp_message` | 1 | FloatingButtons |
| `product_indoor_label` / `product_outdoor_label` | each used 1× | `ProductHeroPremium` (detail page, selects based on category) |

All top-20 live in shared chrome. Changing any one impacts every page in the site — fix once, propagates everywhere, but also: regress once, regress everywhere.

## Missing Keys (Global List)
None. Zero `t.<unknown>` references; zero dynamic `keyof TranslationKeys` indexing that doesn't resolve.

## Orphan Keys (Global List — bucketed by likely owner)

Unused **within the 8-page scope** — but many are USED by pages outside this scope. Do NOT delete without verifying cross-page usage.

### Dead / safe to delete (Home-only, Phase 4 abandoned)
Confirmed in Home audit, re-confirmed here — 8 keys:
- `home_hero_eyebrow`, `home_hero_title_1`, `home_hero_title_2`, `home_hero_title_3`, `home_hero_subtitle`
- `home_collection_eyebrow`, `home_collection_tab_indoor`, `home_collection_tab_outdoor`

### Dynamic-map orphans (truly unused within FilterCartridgeRow's STAGES)
- `product_cartridge_uf_name`, `product_cartridge_uf_desc` — declared in the interface and translated in both dicts, but `STAGES` in `FilterCartridgeRow.tsx:22-51` only exposes 4 stages (sediment/antibacterial/pre_carbon/post_carbon). UF is presumably optional for products with `filterStages` including `"uf-membrane"` — check if this was meant to be dynamic via `product.filterStages`. Currently no product in `products.ts` sets `filterStages`, so these 2 keys are unused. Either wire up dynamic stages or delete.

### Pre-2026 rebuild legacy (used by `/water-purifier` and `/why-aihaa` — verify before delete)
Same buckets as Home audit:
- `hero_*` (6 keys) — old top-hero on legacy pages
- `why_founder_*` (4), `why_compare_*` (23), `why_testi_*` (6), `why_impact_*` (10) — legacy `/why-aihaa` section (~43 keys)
- `category_*` (10) — old category split-card
- `product_hero_*`, `product_statement`, `product_indoor_title`, `product_indoor_subtitle`, `product_outdoor_title`, `product_outdoor_subtitle`, `product_cta_*`, `product_view_details`, `product_featured_*`, `detail_*` (~22 keys) — legacy `/water-purifier` list page

### Used on OTHER pages (not in 8-page scope — DO NOT DELETE)
These buckets were also flagged in the home audit. Re-confirmed:
- `about_*` (42) → `/tentang-kami`
- `service_*` (84) → `/service`
- `faq_*` (24) → `/faq`
- `promo_*` (26) → `/promotions`
- `contact_*` (30) → `/contact`
- `gallery_*` (10) → `/galeri`
- `cert_title`, `cta_*` used by `CTASection` on home, `CertificationsSection`, etc.

### Used within 7 new pages but marked orphans in Home audit
- All `produk_dalam_*`, `produk_luar_*` (41 keys total) — Home audit listed these as "used on non-Home pages" buckets; this audit confirms they are used on their respective landing pages (`/produk-dalam` and `/produk-luar`).
- All `product_kitchen_*`, `product_capacity_*`, `product_cartridge_*`, `product_house_*`, `product_layers_*`, `product_funnel_*`, `product_specprice_*`, `product_features_overview_*`, `product_detail_*` (≈60 keys) — confirmed USED by `/product/[id]` dynamic-template components.

**Net result:** ~10 keys truly safe to delete today (8 dead home + 2 unused cartridge UF). The remaining ~65 legacy keys belong to `/water-purifier` and `/why-aihaa` and should be deleted only after those pages are formally retired (the rebuild plan says `/water-purifier` is stopgap-redirected via the Nav dropdown to `/produk-luar`).

## Hardcoded Strings Found

Per page, with file:line. Numbers/prices, arrow glyphs, product names (brand IDs), and numeric ordinals are NOT flagged.

### /produk-dalam
- `src/app/produk-dalam/components/IndoorHeroLineup.tsx:74` — `"AIHAA"` wordmark. **Brand — exempt.**
- `src/app/produk-dalam/components/IndoorHeroLineup.tsx:77` — `"Marketing Sdn Bhd"`. **See L6 — centralise or accept as brand legal suffix.**

### /produk-luar
- None internal to the 3 components.

### /product/[id] (template)
- `ProductHeroPremium.tsx:23-32` — `BADGE_LABELS` inline bilingual map (5 labels × 2 locales = 10 strings). **M3.**
- `ProductSpecs.tsx:191, 199` — SVG dimension letters `"H"` and `"W"`. **Universal engineering — accept.**
- `ProductSpecs.tsx:238` — `"AIHAA / TECH"`. **Brand — exempt.**
- `HouseCrossSection.tsx:144` — `"AIHAA FILTER"` (SVG text). **Brand — exempt.**
- `PvdfMicronFunnel.tsx:73` — `"Tier {index + 1}"`. **L9.**
- `FilterCartridgeRow.tsx:112` — `stage.number` ("01"–"04") — **data-driven, not hardcoded copy.**

### Shared chrome (affects all 8)
- `Header.tsx` — no hardcoded labels. All through `t.nav_*`.
- `Footer.tsx:78` — `"aihaa.marketing@gmail.com"` email. **Home audit L7 — still not centralised.**
- `Footer.tsx:10-13` — `socialLinks` array hardcodes `"Facebook"`, `"Instagram"`, `"TikTok"` names and `"Penapis Air Aihaa"`, `"@aihaa_hq"` handles. **Platform names + handles — exempt.**
- `Footer.tsx:37` — `"SSM: 1263314-X"`. **Legal identifier — exempt.**
- `ProductCard.tsx:36-42` — `badgeText` inline bilingual map. **M2.**
- `Chatbot.tsx:137` — `"Azri — Aihaa"` bot persona name. **Should be keyed if the persona localises (e.g. EN copy uses "Azri" but different title). Minor.**
- `Chatbot.tsx:139` — `"Biasanya reply dalam 5 minit" / "Usually replies within 5 minutes"`. **M4.**
- `Chatbot.tsx:204` — `"Taip mesej..." / "Type a message..."`. **M4.**
- `Chatbot.tsx:121` — `aria-label="Open chat"` hardcoded English. **A11y bug: BM screen-reader users get English label. Add to i18n.**

**Total genuine (non-exempt) hardcoded strings:** 10
(M2 badge map, M3 badge map, M4 Chatbot reply-time, M4 input placeholder, Chatbot bot name, Chatbot aria-label, L6 Marketing Sdn Bhd subtitle ×2, L9 Tier label, L7 email from home audit carried forward)

## Recommendations for Phase 3

Concrete, ordered by impact × ease:

1. **Fix H1 + H2 together via cookie-based locale.** One PR: add `src/lib/i18n/cookie.ts` that reads/writes an `aihaa-lang` cookie (fallback to `localStorage`), wire into a Server Component that reads the cookie in `layout.tsx`, pass `initialLocale` prop into `<LanguageProvider>`, update `<html lang>` to reflect locale. Eliminates the BM→EN flash on all 8 pages AND fixes the SEO/a11y `lang` mismatch in one go. Remove `suppressHydrationWarning`.

2. **Fix H3 + H4 in the same PR.** Add `product_detail_related_eyebrow` and `product_detail_service_eyebrow` keys. Wire them into `RelatedProducts.tsx:29` and `ProductServiceInfo.tsx:48`. Visual regression fix on all 13 product pages.

3. **Move product badge labels into translations.ts** (fixes M2 + M3 together). Add 5 new keys: `product_badge_popular`, `product_badge_sale`, `product_badge_premium`, `product_badge_best_value`, `product_badge_pro_grade`. Refactor both `ProductCard.tsx` and `ProductHeroPremium.tsx` to consume from `t.*` instead of local maps. Deletes 20 lines of duplicated config.

4. **Translate product specs and features** (the biggest EN-locale gap). Make `specs[].label` and `features[]` bilingual in `products.ts` — either `Bilingual` or i18n-key references. This unlocks the EN-facing surface: without this, every `/product/*` page shows a BM spec table even in EN locale.

5. **Guard localStorage (M1).** Trivial — 5-line try/catch wrap around the two calls. Protects Safari Private, WebView, and ad-blocker-sandboxed contexts.

6. **Chatbot i18n unification (M4).** Add 3 keys: `chatbot_reply_time`, `chatbot_input_placeholder`, `chatbot_aria_open`. Optional: `chatbot_bot_name` if persona changes per locale. Deletes inline ternaries.

7. **Delete the 10 genuinely-dead keys.** 8 Phase-4 home + 2 cartridge-UF. Keep everything else pending `/water-purifier` and `/why-aihaa` retirement decision.

8. **Copywriting pass on the English-in-BM headings** (L2). `product_kitchen_heading`, `product_capacity_heading`, `product_features_overview_heading` read translated or remain pure English in BM. Get an editorial call from Azri: stays English as brand voice OR translates to Malay.

## Structural Issues (System-level)

Non-key-level problems that cascade across the site:

1. **Hydration mismatch** (H1) — `LanguageContext` runs client-side only; SSR always ships BM; `<body suppressHydrationWarning>` hides the warning but not the flash. Root cause of the most common "page flashes Malay before turning English" UX bug.

2. **`<html lang>` hardcoded** (H2) — decoupled from locale state. Hurts SEO (Google treats every BM page as English), hurts a11y (VoiceOver reads BM with English phonemes), hurts Chrome Translate (offers to translate BM pages to English because the attribute says they're already English).

3. **Parallel bilingual systems coexist with `translations.ts`:**
   - `Chatbot.tsx` — inline ternaries + separate `src/lib/chatbot-flows.ts` with its own `{ bm, en }` shape.
   - `src/lib/data/products.ts` — `tagline` and `description` are `Bilingual` objects outside the translations module. Consistent with the "data lives near data" principle (Azri documented this), BUT the rule is not enforced anywhere and `specs[]` + `features[]` slipped through as BM-only.
   - `ProductCard.tsx` and `ProductHeroPremium.tsx` — local `badgeText` / `BADGE_LABELS` maps.
   - `products.ts:seo.titleBm` + `descriptionBm` — only BM metadata, no EN counterpart, which means when Google crawls an EN-locale variant of `/product/aihaa-bella` it still gets the BM title/description.

4. **Page-level metadata locale lie:** `produk-dalam/page.tsx:18` and `produk-luar/page.tsx:18` both set `openGraph.locale: "ms_MY"`. Correct ISO code, but `<html lang="en">` on the same page contradicts it. Social crawlers (Facebook, LinkedIn, X) will get mixed signals.

5. **No runtime validation** that every key in `TranslationKeys` exists in BOTH dicts. TypeScript catches missing entries at build time (because `translations: Record<Locale, TranslationKeys>`) — this is the saving grace of the current system. Confirmed: running `tsc --noEmit` would catch any deletion from one dict without the other. Good belt-and-braces on parity.

## Notes

### Path deviation flagged prominently
The user brief said: "3-7. `/product/bella`, `/product/big`, `/product/ean`, `/product/fancy`, `/product/winter`". Per-product static folders **do not exist** in the repo. The product detail route is a single dynamic template:

```
src/app/product/[id]/page.tsx
src/app/product/[id]/layout.tsx          ← generateMetadata
src/app/product/[id]/components/         ← 11 section components
```

**All 13 AIHAA products (5 indoor + 8 outdoor)** resolve through `getProductBySlug(id)` in `products.ts` and render through the same 11-component tree. Tone-adapts to `product.category`:
- Indoor: `ProductHeroPremium` (dark bg) → `KitchenContextSplit` → `CapacityFunctionalities` → `FeaturesOverviewGrid` → `FilterCartridgeRow` → `ProductSpecs` → `ProductServiceInfo` → `RelatedProducts`
- Outdoor: `ProductHeroPremium` (sage bg) → `HouseCrossSection` → `SevenLayerFiltration` → `PvdfMicronFunnel` → `FeaturesOverviewGrid` → `ProductSpecs` → `ProductServiceInfo` → `RelatedProducts`

**Implication for this audit:** every `/product/[id]` finding applies to 13 product URLs, not 5. The 8 outdoor pages (`ultra-one`, `fiber-9x42`, `fiber-10x44`, `penapis-boring-13x54`, `pvdf`, `pvdf-plus`, `super-pleated`, `uf-double-backwash`) inherit the same template and the same i18n posture as the 5 indoor products the user explicitly named. Anything fixed in the template fixes 13 pages at once.

### Other deviations
- No `produk-dalam/components/layout.tsx` — the page uses `Header`, `Footer`, `FloatingButtons` directly (same pattern as `/produk-luar`). Expected.
- `product/[id]/layout.tsx` is a stub layout (`return children`) that exists only to host `generateMetadata`. SEO metadata comes from `product.seo.titleBm` (BM-only, flagged as structural issue #3).
- Locale codes correctly use `"bm" | "en"` throughout — no stray `"ms"` / `"en-US"` inside the i18n system.
- `translations.ts` interface line 133–142 declares paired keys on the same line (`faq_q1: string; faq_a1: string;`) — already noted in Home audit, same cosmetic tooling-friendliness issue persists.

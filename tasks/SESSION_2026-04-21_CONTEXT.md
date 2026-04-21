# AIHAA Website — Session Context 2026-04-21

**Tujuan fail ni:** Satu sumber kebenaran untuk Claude Code sebelum sesi kerja baharu bermula. Baca dari atas ke bawah. Jangan mula kerja sehingga fahaman disahkan oleh Azri.

---

## 1. SNAPSHOT KEDUDUKAN SEKARANG

**Repo:** `Syedazriiskandar00/aihaa-website`
**Active branch:** `feat/corporate-rebuild-2026-q2`
**Commit status:** 90 commits, **LOCAL SAHAJA**, belum push ke remote (akan push ke preview URL selepas doc reconcile + Penapis Boring fix)
**Main branch:** stable, bukan di sini kita kerja

**Q2 2026 Structural Rebuild — SEMUA 7 PHASE DAH SIAP di branch ni:**

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | `/service` page rebuild | ✅ Shipped |
| 2 | `/produk-luar` (Outdoor) rebuild | ✅ Shipped |
| 3 | `/produk-dalam` (Indoor) rebuild | ✅ Shipped |
| 4 | `/` Home rebuild | ✅ Shipped |
| 5 | `/tentang-kami` About Us rebuild | ✅ Shipped |
| 6 | `/product/[slug]` template (13 produk) | ✅ Shipped |
| 7 | `/product/[slug]` deeper sections (§D.1–D.6) + indoor dark / outdoor sage tone variants + 7 new section components | ✅ Shipped |

**Page lama yang TAK disentuh** (kekal as-is): `/faq`, `/promosi`, `/galeri`, `/contact`, `/water-purifier`.

---

## 2. 3 FOKUS SESI INI (dari Azri)

Azri nak tackle **3 perkara sekarang**:

1. **Enhanced design** — guna Claude design capabilities + Figma MCP untuk elevate visual quality
2. **Integrate gambar sebenar** — replace placeholder dengan real product + installation photos
3. **Test chatbot** — rule-based chatbot yang dah dibina (product recommendation, FAQ, coverage, existing customer, WhatsApp redirect)

**Plus settlekan semua pending sebelum merge & push ke main.**

---

## 3. PENDING ITEMS — MESTI SETTLE SEBELUM MERGE KE MAIN

### Code bug (1 sahaja — bukan banyak)
- [ ] **`src/lib/data/services.ts`** — Penapis Boring 13x54 tersilap classify sebagai RM250. **BETUL:** RM650 (Tukar Pasir 6 Lapisan — air boring).
  - RM250 adalah untuk Tukar Pasir 5 Lapisan (air kerajaan) sahaja.
  - Source of truth: Phase 1 spec, bukan Phase 6 brief.
  - **Fix dalam scope sesi ni** (Step 3).

### Production blockers — BUKAN code bug, tapi wajib sebelum merge ke main
Semua yang berikut adalah **PARKED** sekarang. Preview URL boleh go tanpa selesaikan ni. Azri akan supply sebelum merge ke main.
- [ ] **Nombor WhatsApp sebenar** — semua link masih guna placeholder `60000000000`. Cari semua dan ganti (config-level `src/lib/config/contact.ts` + 6 translation strings). **PARKED** — Azri akan provide.
- [ ] **Nombor telefon sebenar** — format `+6011-5657 7084`. **PARKED** sama seperti WhatsApp.
- [ ] **Verify nombor sijil Halal JAKIM** — sekarang placeholder `MS 1500 / 6 126-03 / 2014`. **PARKED** — Azri akan verify sebelum merge.
- [ ] **Test semua page di lokal** — belum dibuat sejak semua 7 phase siap.

### Content yang perlu dikembalikan
- [ ] **BezaKami comparison table** + **impact stats "10,000+ units sejak 2018"** — tersilap buang dalam Phase 5 bersama `WhyAihaaSection.tsx`.
  - Retrievable: `git show e359b58^:src/components/sections/WhyAihaaSection.tsx`
  - Placement belum decide. Candidates: `/tentang-kami` (section tambahan), Home page, atau page baharu `/kenapa-aihaa`.
  - Azri dah confirm kedua-dua content ni penting.

### Routing decision
- [ ] **`/water-purifier`** — nasib belum decide. Pilihan: delete, redirect ke `/produk-dalam`, atau kekal sebagai landing alternatif.

### Priority B — Photoshoot scope (detail lengkap di §14)
- [ ] **55 photos across 8 surface groups** (exact tally jatuh 57 — Azri reconcile off-by-two)
- [ ] **2 illustration surfaces DEFERRED ke Phase 8+**: `HouseCrossSection` (outdoor §D.2) + `ThirteenCheckPoint` (service §4.3). SVG version kekal dalam production sementara itu.
- [ ] **SpecPriceDark blueprint LOCKED as generic SVG** (Azri decision — tak ada CAD dari supplier. Upgrade per-product blueprint deferred Phase 8+).
- [ ] **Data field extension required** sebelum photo wiring: `kitchenScenes`, `featureCloseups` field on `Product` type tidak wujud lagi. Phase 7 commit d8ca0aa hanya tambah 3 enum array (`capacityOptions`, `filterStages`, `outdoorLayers`) — bukan photo-hook. Extension tugasan separate bila Azri brief "wire in photos".

---

## 4. HARD CONSTRAINTS — JANGAN LANGGAR

Ini peraturan yang dah pernah dilanggar sekali dan cause regression. Jangan repeat.

### Warna — Modern Contrast locked
- `#0D0D0D` dark
- `#FFFFFF` white
- `#DAA520` gold — **max 10 elements per section**, jangan overuse
- `#FFFDE7` soft lemon yellow — untuk section backgrounds
- **JANGAN** tukar tone warna. Team dah vote kekal.

### Font — locked
- **Poppins** (sans) — body, nav, UI
- **Playfair Display** (serif editorial) — headings, display
- Tailwind tokens: `font-editorial`, `font-editorial-italic`

### Tailwind custom tokens (jangan tukar)
- `bg-dark`, `bg-soft-lemon`
- `text-gold`
- `font-editorial`, `font-editorial-italic`

### Struktur i18n — locked
- **Satu file sahaja:** `src/lib/i18n/translations.ts` (~1500 lines, dah grow dari Phase 5–7)
- **Flat snake_case keys** — `service_hero_eyebrow`, `home_hero_title_1`, dsb
- **TypeScript `TranslationKeys` type** enforce BM+EN parity (compiler error kalau miss)
- Locale codes: `"bm" | "en"`, default `bm`, localStorage key `aihaa-lang`
- **JANGAN** split ke multiple files — dulu kena crash, sekarang dah stable
- Untuk add key baharu: (1) add field to `TranslationKeys` type, (2) add BM value, (3) add EN value

### Anti-patterns — JANGAN BUAT
- ❌ Dual button per card (button "Lihat Details" + "WhatsApp" dalam satu card) — nampak macam Shopee listing
- ❌ Template grid of cards untuk semua section (setiap section mesti ada layout unique)
- ❌ Overuse gold — max 10 gold elements per section
- ❌ Placeholder content dalam production (Coming Soon, Lorem Ipsum, fake data)
- ❌ Countdown timer >30 hari — ganti dengan evergreen urgency text
- ❌ Batch fixes merentas banyak section sekali gus — cause regression, guna targeted section-specific prompts
- ❌ Fake contact form — contact page dah WhatsApp-first, jangan tambah balik form

### Halaman yang TAK boleh sentuh (scope protection)
- `/faq`, `/promosi`, `/galeri`, `/contact` — kekal as-is, jangan redesign tanpa Azri confirm

---

## 5. DESIGN SYSTEM — QUICK REFERENCE

### Voice & tone
- Hybrid corporate — cerita & spec dulu, harga di bawah
- Malaysian-natural BM (bukan terjemahan literal English)
- Reference brands: Hijrah Water (story/halal framing), Wells Malaysia Signature Collection (hero aesthetic), Coway (service feature framing)
- Positioning: **sekali bayar** vs sewa bulanan Coway

### Layout principles
- 40% whitespace — premium brands leave space empty
- Alternating dark/light sections (bukan zebra pattern — smooth transitions)
- Setiap section ada layout berbeza (quote, timeline, comparison, cards, strip)
- Mobile viewports: iPhone 14 (390×844), Android standard (360×800)
- Desktop audit viewport: 1440×900

### Product category tone adaptation (dalam `/product/[slug]` template)
- Indoor products → dark `#0D0D0D` hero with gold accents
- Outdoor products → sage `#B5C5A5` hero

---

## 6. PRODUCT LINEUP — SOURCE OF TRUTH

Data dalam `src/lib/data/products.ts`. Slugs kebab-case. Images dalam `public/images/products/[slug]/`.

### Indoor (5 produk, 4-stage filter, waranti 2 tahun)
| Slug | Name | Tier badge? |
|------|------|-------------|
| `aihaa-bella` | AIHAA BELLA | BESTSELLER |
| `aihaa-big` | AIHAA BIG | — |
| `aihaa-ean` | AIHAA EAN (4 color variants) | — |
| `aihaa-fancy` | AIHAA FANCY | — |
| `aihaa-winter` | AIHAA WINTER | PREMIUM |

### Outdoor (8 produk, UF membrane, waranti 10 tahun untuk UF Double Backwash)
| Slug | Name | Tier badge? |
|------|------|-------------|
| `ultra-one` | Ultra One | BEST VALUE |
| `fiber-9x42` | Fiber 9x42 | — |
| `fiber-10x44` | Fiber 10x44 | — |
| `penapis-boring-13x54` | Penapis Boring 13x54 | — |
| `pvdf` | PVDF | — |
| `pvdf-plus` | PVDF Plus | — |
| `super-pleated` | Super Pleated | — |
| `uf-double-backwash` | UF Double Backwash | — |

**Always verify slug di `src/lib/constants.ts` sebelum construct URL.** Jangan assume.

---

## 7. SERVICE PRICING — SOURCE OF TRUTH

Phase 1 spec adalah source of truth. Semak `src/lib/data/services.ts`.

| Servis | Harga |
|--------|-------|
| Servis Filter AIHAA | **RM160** |
| Servis Filter Jenama Lain | **RM260** |
| Tukar Pasir 5 Lapisan (Air Kerajaan) | **RM250** |
| Tukar Pasir 6 Lapisan (Air Boring) / Penapis Boring 13x54 | **RM650** |

- Indoor: 13 checkpoints + 8-step process
- Outdoor: 5 checkpoints
- Frekuensi servis disyorkan: setiap 6 bulan

---

## 8. FILE STRUCTURE — QUICK MAP

```
aihaa-website/
├── CLAUDE.md                    ← Brain file, WAJIB baca dulu
├── me.md, work.md, team.md, priorities.md
├── rules/workflow.md, tone.md, format.md
├── tasks/
│   ├── lessons.md               ← WAJIB baca — 20+ lessons
│   ├── 2026-q2-corporate-rebuild/
│   │   ├── IMPLEMENTATION_PLAN.md
│   │   ├── SECTION_SPEC.md
│   │   ├── MASTER_COPY.md
│   │   ├── PLACEHOLDERS.md
│   │   ├── visual-review.html   ← 46-screenshot gallery
│   │   └── scripts/capture-review.mjs
│   └── SESSION_2026-04-21_CONTEXT.md ← FAIL NI
├── src/
│   ├── lib/i18n/translations.ts ← i18n (flat snake_case, single source)
│   ├── app/
│   │   ├── page.tsx             ← Home (Phase 4)
│   │   ├── produk-dalam/page.tsx (Phase 3)
│   │   ├── produk-luar/page.tsx (Phase 2)
│   │   ├── service/page.tsx (Phase 1)
│   │   ├── tentang-kami/page.tsx (Phase 5)
│   │   ├── product/[slug]/page.tsx (Phase 6 — dynamic template)
│   │   └── [legacy: /faq, /promosi, /galeri, /contact, /water-purifier]
│   ├── components/
│   │   ├── Chatbot.tsx          ← Rule-based, zero API
│   │   ├── shared/IndoorFilterRow.tsx
│   │   └── [banyak lagi]
│   └── lib/
│       ├── data/products.ts     ← 13 produk data
│       ├── data/services.ts     ← Service pricing (FIX penapis-boring-13x54!)
│       ├── chatbot-flows.ts     ← Chatbot decision tree
│       ├── constants.ts         ← Slugs, colors
│       └── i18n/LanguageContext.tsx
└── public/images/products/      ← 13 folder produk
```

---

## 9. CHATBOT ARCHITECTURE (untuk testing)

**Component:** `src/components/Chatbot.tsx`
**Data:** `src/lib/chatbot-flows.ts`
**Position:** Bottom-right (ganti floating WhatsApp button lama)
**Stack:** Pure React + useState, zero dependencies, zero API keys

### 9 conversation flows
1. Greeting (entry point)
2. Harga (browse produk ikut kategori)
3. Recommend (5-question decision tree: house type → family size → budget → produk cadangan)
4. Coverage (check area kawasan)
5. Warranty info
6. Existing customer (tukar filter, masalah, upgrade, rujuk kawan)
7. WhatsApp redirect (auto-open dengan context-based pre-filled message)
8. Free text input (keyword detection)
9. Menu utama (kembali)

### Testing checklist
- [ ] Icon bottom-right visible, tak conflict dengan floating WhatsApp lama
- [ ] On click open window, 380px desktop / 100vw mobile
- [ ] Header: avatar "A" gold + "Azri - Aihaa" + "Biasanya respond segera"
- [ ] Typing indicator delay 0.5–1s sebelum bot reply (jangan instant)
- [ ] Flow 2 (Harga) — klik ikut kategori indoor → list 5 produk, klik outdoor → list 8
- [ ] Flow 3 (Recommend) — 5 soalan, logic betul:
  - Bajet <RM800 → EAN
  - Bajet RM800-1200 + family kecil → FANCY
  - Bajet RM800-1200 + family sederhana/besar → BELLA
  - Bajet RM1200+ + family besar → BIG
  - Bajet RM1200+ + premium → WINTER
- [ ] Flow 4 (Coverage) — test "Sabah/Sarawak" → graceful decline
- [ ] Flow 7 (WhatsApp) — pre-filled message muncul ikut context, link wa.me betul
- [ ] Free text — keyword detection works (e.g., "harga" → Flow 2, "coverage" → Flow 4)
- [ ] Bilingual — toggle BM/EN, bot respond dalam bahasa betul
- [ ] Mobile — fullscreen, scroll smooth, input keyboard tak cover chat

---

## 10. WORKFLOW RULES (dari `lessons.md`)

1. **AUTORUN MODE** — Azri tak nak approval mid-task. Edit → fix → build → commit. Report summary di akhir sahaja.
2. **Baca `CLAUDE.md` + `tasks/lessons.md` DULU** sebelum mula apa-apa kerja.
3. **L99 GOD MODE self-critique** — audit draft prompt sendiri sebelum execute. Tangkap guessed values, wrong CSS, regression risk.
4. **Prompts pecah ke numbered parts** kalau scope besar — elak context overflow crash.
5. **Targeted, section-specific prompts** — BUKAN batch fixes merentas banyak section (cause regression).
6. **Screenshot audit sequence:**
   - Navigate ke Vercel preview URL (bukan localhost)
   - Set viewport explicitly (1440×900 desktop, 390×844 iPhone 14, 360×800 Android)
   - Fullpage screenshot, atau crop ke section level untuk precision
   - Display sebelum & selepas
7. **Slug verification** — check `src/lib/constants.ts` sebelum construct URL, jangan assume
8. **`npm run build` mesti ZERO errors** sebelum commit
9. **Git commit message format:** `feat:`, `fix:`, `chore:` prefix + descriptive
10. **Update `tasks/lessons.md`** bila belajar rule baharu

---

## 11. VERIFICATION CHECKLIST — SEBELUM MERGE & PUSH BRANCH

Sebelum `feat/corporate-rebuild-2026-q2` di-push ke remote dan merge ke main, tick semua:

### Functional
- [ ] `npm run build` — zero errors, zero warnings
- [ ] `npm run dev` — semua 23 route load tanpa error
- [ ] 5 page utama render (`/`, `/produk-dalam`, `/produk-luar`, `/service`, `/tentang-kami`)
- [ ] 13 page produk detail render (semua slug di section 6)
- [ ] 5 page legacy tak rosak (`/faq`, `/promosi`, `/galeri`, `/contact`, `/water-purifier`)

### i18n
- [ ] Toggle BM/EN pada setiap page — zero mixed language
- [ ] Refresh page — bahasa pilihan kekal (localStorage)
- [ ] Navigate antara page — bahasa kekal
- [ ] Zero hardcoded string (semua text via `t.key`)

### Responsive
- [ ] Desktop 1440px render betul
- [ ] iPhone 14 (390×844) render betul
- [ ] Android (360×800) render betul
- [ ] Mobile menu, chatbot, modal responsive

### Content
- [ ] Placeholder WhatsApp/phone number dah diganti
- [ ] Halal cert number verified
- [ ] Zero "Coming Soon" / "Lorem Ipsum" / placeholder text
- [ ] Penapis Boring 13x54 pricing — RM650 (BUKAN RM250)
- [ ] BezaKami + impact stats restored ke lokasi yang Azri pilih
- [ ] `/water-purifier` decision dilaksanakan (delete/redirect/keep)

### Chatbot
- [ ] 9 flow semua test pass (lihat Section 9)
- [ ] Typing indicator delay betul
- [ ] WhatsApp redirect dengan pre-filled message context-based

### Design
- [ ] Zero dual-button card
- [ ] Gold count ≤ 10 per section
- [ ] Setiap section layout unique (bukan template grid)
- [ ] 40% whitespace respected

---

## 12. HOW TO START WORK IN THIS SESSION

Workflow cadangan untuk Azri tackle 3 priority:

### Priority A: Test chatbot (30-45 min)
Paling senang start. Dah ada code. Just test sistematik ikut checklist Section 9. Log bug dalam `tasks/chatbot-bugs.md`. Fix yang critical, defer yang cosmetic.

### Priority B: Integrate real images (1-2 hari)
1. Audit `public/images/products/` — senaraikan placeholder yang ada
2. Replace satu kategori at a time (Indoor dulu, Outdoor kemudian)
3. Optimize `.webp`, bawah 200KB
4. Hero banner — extend square asal ke landscape 1920×600 (guna Photoshop/Canva/Firefly)
5. Test setiap page selepas replace — jangan batch

### Priority C: Enhanced design via Figma MCP (exploratory)
1. Capture current page ke Figma via Figma MCP
2. Identify section yang paling lemah (guna `visual-review.html` — 46 screenshots)
3. Iterate dalam Figma, bukan code terus
4. Generate code dari Figma design yang dah refined
5. Verify dengan Playwright MCP screenshot

**Disarankan urutan:** A → B → C. Priority A quick win untuk confidence, Priority B unblock production readiness, Priority C untuk polish.

---

## 13. TOOLS AVAILABLE

- **Claude Code** — terminal, AUTORUN MODE
- **Playwright MCP** — live Vercel URL screenshot; install: `npx playwright install chromium` → `claude mcp add playwright -s user -- playwright-mcp` (Windows: full VS Code restart kalau tool tak muncul)
- **Figma MCP** — connected via claude.ai scope
- **Vercel** — auto-deploy dari GitHub
- **GitHub** — repo `Syedazriiskandar00/aihaa-website`

---

---

## 14. PHOTOSHOOT SHOPPING LIST — PRIORITY B

Fotografer (in-house atau commission) perlukan senarai lengkap ni sebelum shoot day. **Azri initial count: 55 photos.** Exact tally dari 8 group di bawah = **57 photos** (off-by-two — Azri reconcile: drop satu group ke angka yang dia committed, atau accept 57).

### Data field mapping — PENTING sebelum photo arrive

Phase 7 commit `d8ca0aa` menambah 3 optional enum arrays SAHAJA ke `Product` type:
- `capacityOptions?: CapacityKind[]` — indoor water temperature/state options
- `filterStages?: FilterStageKind[]` — indoor filter cartridge kinds
- `outdoorLayers?: OutdoorLayerKind[]` — outdoor sand layer kinds

**Belum ada** field untuk hook photo ke produk:
- ❌ `kitchenScenes?: { modern: string; industrial: string }` — perlu tambah untuk Group 1 (DECISION 1 Azri)
- ❌ `featureCloseups?: string[]` — perlu tambah untuk Group 2 (DECISION 3 Azri)

Kedua-dua field di atas = **separate tugasan** yang kena buat bila Azri brief "wire in photos". Bukan dalam scope Phase 7.

### Group 1 — Kitchen Context (10 photos)
- **Component:** `KitchenContextSplit.tsx` (indoor §D.2)
- **Scope:** 2 scenes × 5 indoor products = 10 photos (Azri DECISION 1: setiap produk indoor ada scene sendiri)
- **Aspect ratio:** 4:5 portrait
- **Lighting mood:**
  - *Modern scene:* soft natural cabinetry, cream-grey palette, daylight key
  - *Industrial scene:* directional hard light, dark steel/concrete, charcoal palette
- **Subjects:** AIHAA BELLA, BIG, EAN, FANCY, WINTER — each × 2 contexts (modern + industrial)

### Group 2 — Feature Close-ups (30 photos)
- **Component:** `FeaturesOverviewGrid.tsx` (shared §D.5)
- **Scope:** Azri DECISION 3 = 6 close-up × 5 priority produk = **30 total**. KEKAL (tak reduce). Committed untuk premium feel.
- **Aspect ratio:** 3:2 landscape (fit 3×2 grid tile)
- **Lighting mood:** Macro/close-up, controlled softbox, warm-toned backdrop per produk
- **Subjects:** One shot per feature bullet dalam `product.features[]` untuk setiap 5 priority SKU
- **Note:** Component shared — juga render pada 8 outdoor products. Initial shoot = 5 priority SKU sahaja; 8 produk lain kekal gradient placeholder sampai batch 2.

### Group 3 — Filter Cartridges (4 photos)
- **Component:** `FilterCartridgeRow.tsx` (indoor §D.4) — juga reused oleh Phase 1 `IndoorFilterRow` (§4.2)
- **Scope:** 4 cartridges (sediment, antibacterial, pre-carbon, post-carbon)
- **Aspect ratio:** Tall portrait (≈100:200), cut out to PNG transparent background
- **Lighting mood:** Product-on-white studio, high-key, gloss preserved
- **Subjects:** Actual AIHAA cartridges — satu set drive dua section (Phase 1 §4.2 + Phase 7 §D.4)

### Group 4 — Sand Media (6 photos)
- **Component:** `SandTypesShowcase.tsx` (service §4.6)
- **Scope:** 6 media types top-down
- **Aspect ratio:** 4:3
- **Lighting mood:** Lab-style even top-down, neutral muted background, consistent WB/exposure merentas 6 shot
- **Subjects:** metal earse, active carbon, zeolite, fine silica, medium silica, coarse silica

### Group 5 — Sage Hero Products (2 photos)
- **Component:** `SageHeroLineup` on `/produk-luar` (§3.1)
- **Scope:** PVDF PLUS + ULTRA ONE
- **Aspect ratio:** 4:5 portrait
- **Lighting mood:** Premium studio (reference: Wells Malaysia Signature Collection), sage/cream backdrop, soft directional
- **Subjects:** 2 outdoor flagship products

### Group 6 — Founder Portrait (1 photo)
- **Component:** `KisahKami.tsx` (tentang-kami §5.1)
- **Aspect ratio:** Flexible ~4:5 portrait (hooks into left-column grid cell)
- **Lighting mood:** Editorial warm, single-subject, muted background
- **Subject:** Azri (founder)

### Group 7 — Team Group (1 photo)
- **Component:** `TeamSection.tsx` (tentang-kami §5.4)
- **Aspect ratio:** 21:9 ultra-wide
- **Lighting mood:** Group portrait, natural daylight preferred
- **Subject:** AIHAA team

### Group 8 — CSR Activity (3 photos)
- **Component:** `CsrSumbangan.tsx` (tentang-kami §5.5)
- **Aspect ratio:** 4:3 each
- **Lighting mood:** Documentary-style, real events (not staged)
- **Subjects:** 1 representative photo per category — Sumbangan Peralatan, Bantuan Bencana, Program Komuniti
- **Note:** Cards sekarang pakai category-level titles + year "TBD" — photo + real copy mesti sampai serentak.

### DEFERRED to Phase 8+ (illustration, BUKAN photography)
- `HouseCrossSection.tsx` (outdoor §D.2) — isometric illustration / 3D render. Inline SVG kekal dalam production meanwhile.
- `ThirteenCheckPoint.tsx` (service §4.3) — technical 13-point diagram. Dark panel dengan SVG leader-lines kekal meanwhile.

### Locked as final SVG — NO photoshoot needed
- `SpecPriceDark` blueprint (§D.6) — Azri DECISION 2: guna SVG generic sedia ada. Upgrade per-product blueprint deferred Phase 8+.
- `PvdfMicronFunnel.tsx` (outdoor §D.4) — intentional infographic SVG.
- `CapacityFunctionalities.tsx` (indoor §D.3) — lucide-react icon circles acceptable; optional upgrade deferred.
- `SevenLayerFiltration.tsx` (outdoor §D.3) — CSS-drawn cylinder acceptable; optional cross-section photo/CAD upgrade deferred.

### Tally table

| Group | Surface | Photos |
|-------|---------|-------:|
| 1 | Kitchen Context (indoor §D.2) | 10 |
| 2 | Feature Close-ups (shared §D.5) | 30 |
| 3 | Filter Cartridges (indoor §D.4 + service §4.2) | 4 |
| 4 | Sand Media (service §4.6) | 6 |
| 5 | Sage Hero Products (produk-luar §3.1) | 2 |
| 6 | Founder Portrait (tentang §5.1) | 1 |
| 7 | Team Group (tentang §5.4) | 1 |
| 8 | CSR Activity (tentang §5.5) | 3 |
| **Total** | | **57** |

**Reconcile action:** Azri count = 55. Possible trims to hit 55: (a) CSR → 1 lead activity (saves 2), or (b) Sand Media → 5 (if satu media tak shoot), or (c) accept 57 as final. Flag decision kepada Azri.

---

**Akhir fail.** Kalau ada apa-apa yang tak jelas atau ada konflik dengan `CLAUDE.md`/`lessons.md`, **TANYA AZRI DULU.** Jangan assume.

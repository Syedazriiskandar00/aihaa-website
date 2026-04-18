# Placeholders — Q2 2026 Corporate Rebuild

**Purpose:** Track every section that currently uses a placeholder visual
(solid block, SVG sketch, or CSS-drawn illustration). Replace these with
real photography or design assets before production launch.

**Rule (per lessons.md):** No stock photos, no Unsplash. Placeholders must
read as deliberate design placeholders — not random filler.

---

## Phase 1 — Service Page

### §4.2 Indoor Filter Row — `src/components/shared/IndoorFilterRow.tsx`
- **Current:** 4 CSS-drawn cartridge tubes with coloured liquid fills, stage chips (01–04), and flow arrows between them.
- **Needed:** Four close-up product photos of the actual AIHAA cartridges (sediment, pre-carbon, UF membrane, post-carbon) on a transparent background.
- **Integration point:** `IndoorFilterRow` accepts an optional `image?` prop per cartridge — when assets land, extend the cartridges array in `IndoorServiceHeader.tsx` and the component will render them.
- **Blocker:** Photography session with production cartridges.
- **Priority:** Medium (visual works without photos but will be significantly stronger with them).

### §4.3 13 Check Point Diagram — `ThirteenCheckPoint.tsx`
- **Current:** Dark 3:4 panel (`#1F1F1F`) with decorative SVG leader-lines and caption "Diagram teknikal 13 titik pemeriksaan — gambar rasmi akan dimuat naik."
- **Needed:** Technical isometric render (or photo) of an AIHAA indoor purifier with labelled callouts pointing to all 13 inspection points.
- **Dimensions:** 3:4 aspect ratio (600 × 800 px minimum).
- **Blocker:** Design illustration — needs to be commissioned or rendered from CAD.
- **Priority:** High (central visual of the section).

### §4.6 Sand Types Grid — `SandTypesShowcase.tsx`
- **Current:** Six 4:3 earth-tone swatches with subtle radial-gradient grain.
- **Needed:** Six laboratory-style top-down photos of each sand type (metal earse, active carbon, zeolite, fine/medium/coarse silica) on a neutral background.
- **Dimensions:** 4:3 aspect ratio, 600 × 450 px minimum, consistent lighting across all six.
- **Blocker:** Photography session with the six filter media types.
- **Priority:** Medium.

### §4.7 5 Check Point Outdoor Illustration — `FiveCheckPointOutdoor.tsx`
- **Current:** Dark 3:4 panel with decorative SVG outdoor tank silhouette.
- **Needed:** Photo or illustration of a technician kneeling beside an outdoor filter tank, or a labelled tank render with the 5 check points called out.
- **Dimensions:** 3:4 aspect ratio.
- **Blocker:** Field photography OR design illustration.
- **Priority:** Medium.

### §4.8 Sand Tank Illustrations — `SandReplacementPricing.tsx`
- **Current:** Two miniature CSS-drawn tanks (72 × 180 px) with horizontal coloured bands matching the sand swatches in §4.6.
- **Needed:** Either a cleaner vector illustration per tank with labelled layers, OR keep the current CSS version (it works, it scales, no file dependency).
- **Recommendation:** Keep as-is unless Azri wants the layer names visible next to each band.
- **Priority:** Low (optional enhancement).

---

## Non-Placeholder Design Elements (intentional, do not replace)

These look minimal but are the agreed final design per SECTION_SPEC:

- **§4.4 Eight Step Gallery** — The forest green `#2D5F4A` tiles with step numbers are the FINAL look per SPEC §4.4, not a placeholder. Photos/videos could drop in later as a refresh but are not a Phase 1 blocker.
- **§4.1 Heart Service Hero script logo** — Using the text string "AIHAA Care" in Playfair italic instead of a custom logotype. This can remain text-only indefinitely.

---

## Phase 2 — /produk-luar Landing

### Contact config placeholders (config-level, not visual)
- `src/lib/config/contact.ts` — `WHATSAPP_NUMBER`, `PHONE_NUMBER`, and `PHONE_NUMBER_DISPLAY` are all set to `60000000000` / `+60 00-0000 0000` placeholders.
  - Search for `60000000000` and `+60 00-0000 0000` across the repo to find every touchpoint (~8 call sites after Parts A + Phase 1 refactors).
  - Also referenced directly in 6 translation string values (`faq_a6`, `promo_tnc_questions`, `contact_wa_alt` × bm + en). When the real number is confirmed, update config AND those 6 translation strings.
  - **Priority:** HIGH — live production CTAs route to a dead number until fixed.

### §3.1 SageHeroLineup featured photography
- **Current:** PVDF PLUS + ULTRA ONE hero cards use their existing `public/images/products/*/main.jpg` assets. Both render but weren't shot for a hero-scale presentation.
- **Needed:** Dedicated photoshoot of PVDF PLUS and ULTRA ONE on a premium cream / sage backdrop, studio lighting, 4:5 crop ratio. Could also be replaced with a single wide lifestyle shot showing both products installed.
- **Priority:** Medium (current images work but are catalogue-style, not hero-grade).

### §3 (Phase 3) Indoor hero pedestal photography
- **Current:** `IndoorHeroLineup` uses the existing `main.jpg` / `main.png` for each of the 5 indoor products. All render OK on dark background (verified in screenshots) because indoor photography is shot with neutral backdrops.
- **Hero-grade upgrade available:** SECTION_SPEC §2.1 originally called for a single studio-shot lineup with all 5 products on an actual cream pedestal surface. Our implementation approximates this via CSS-drawn pedestal blocks. A real photoshoot would make the hero more magazine-grade.
- **Priority:** Low — current version ships a premium feel; reshoot is an aesthetic upgrade, not a blocker.

### §3 Product grid low-contrast thumbnails (photo issue only)
- **Card-frame fix landed** in commit `d772706` — `ProductCard.tsx` image container swapped from `#f8f8f8` to the warm `#F0EEE9` off-white so every tile now reads as a distinct card even when the product photo has a white background.
- **Residual issue:** `super-pleated/main.jpg` and `uf-double-backwash/main.jpg` still appear faint because the subjects themselves were photographed against white. This is now a pure photo problem, not a UI problem.
- **Needed:** Reshoot or re-cut those two product photos with a subtle grey backdrop (or isolated cutouts on transparent PNG so the new #F0EEE9 tile shows through).
- **Priority:** Low — tiles are legible, product names + prices visible, cards clickable.

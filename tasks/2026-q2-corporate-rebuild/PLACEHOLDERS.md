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

### Phase 6 — /product/[slug] service-info categorization

Service-info cards on product detail pages pull from `src/lib/data/services.ts`. The slug-based mapping follows Azri's Phase 6 brief exactly:

- indoor (all 5) → RM 160 / 2 Tahun / RM 320 annual
- outdoor `uf-double-backwash` → RM 650 / 10 Tahun (UF Membrane) / RM 1,300 annual
- outdoor `penapis-boring-13x54`, `fiber-9x42`, `fiber-10x44` → RM 250 / 2 Tahun / RM 500 annual
- outdoor `pvdf`, `pvdf-plus`, `ultra-one`, `super-pleated` → RM 160 / 2 Tahun / RM 320 annual

**Flag for Azri review (non-blocking):** the mapping places `penapis-boring-13x54` in the RM 250 (5-layer sand) bucket, but the Phase 1 service page copy states RM 650 6-layer is for "penggunaan air boring (sumber bawah tanah)". There's a potential conflict between "service complexity by tank type" (Phase 6 brief) and "service price by water source" (Phase 1 SPEC §4.8). Current implementation honours the Phase 6 brief verbatim — if Azri wants boring → RM 650 service pricing alignment with Phase 1 copy, one line change in `services.ts` (`penapis-boring-13x54: OUTDOOR_UF_DOUBLE_BACKWASH` or a new `OUTDOOR_SAND_BORING` tier). No user-facing copy needs to change — only the service-info card value.

**Priority:** Medium — customer-visible service price on the boring-specific product page should match what the /service page quotes for boring water.

### Phase 6 — product-detail photography

Detail-page hero uses existing `main.jpg|main.png` per product from `public/images/products/`. Current shots render well on the dark indoor hero and on the sage outdoor hero (verified in 3 sample screenshots), BUT several products have catalogue-style photos (product-on-white) that look pale on the sage background — specifically `super-pleated` and `uf-double-backwash`. The Phase 2 ProductCard contrast fix (`#F0EEE9` card tone) doesn't apply at hero scale. **Priority:** Low — fully legible and clickable, just not hero-grade premium for those two.

### §5 (Phase 5) /tentang-kami About page assets

Five placeholder surfaces on the new /tentang-kami page. All render cleanly but none ship real content — swap the listed i18n values or component assets when Azri supplies.

- **§5.1 Founder photo** — `KisahKami.tsx` left column is a dark block with a dashed gold frame stroke and caption "Gambar pengasas — akan dimuat naik". Swap the whole `<div>` block for an `<Image>` wrapped around the same grid cell when the photo lands.
- **§5.2 JAKIM cert reference** — `MS 1500 / Ref: 6 126-03 / 2014` values are verbatim from SECTION_SPEC's brainstorm section. **Azri to verify against the actual current JAKIM certificate.** Update `about_halal_cert_label` / `about_halal_cert_ref` translations when confirmed. The centered dark Halal mark is a CSS-drawn placeholder (HALAL / JAKIM text in a green-ringed black disc) — swap for the real JAKIM Halal logo SVG when available.
- **§5.2 Halal integrity checkpoints** — 3 placeholder bullets written as category-level (components inspected / packaging / internal audit). Replace with the actual AIHAA-specific checkpoint items when legal / compliance supplies them.
- **§5.3 AIHAA × Azlee video** — placeholder 16:9 dark frame with gold play button and caption "Video kolaborasi — akan dimuat naik". When video URL lands, replace the entire placeholder `<div>` with a YouTube embed or `<video>` element.
- **§5.4 Team group photo** — placeholder 21:9 dark block with Users icon and caption. Swap for `<Image>` once the team photo is shot.
- **§5.5 CSR cards** — all 3 cards (Sumbangan Peralatan / Bantuan Bencana / Program Komuniti) use **category-level** titles/descriptions so no fabricated specific events leaked to production. Year shown as "TBD". Swap via `about_csr_card_{1,2,3}_{title,year,desc}` i18n values when Azri supplies real activity data.

**Priority:** Medium-High for the JAKIM cert verification (§5.2 reference number) — legal/compliance risk if the placeholder number conflicts with the actual cert. Low for photography/video/CSR details (all work as placeholders, visually premium, just empty of specific content).

### §1 (Phase 4) Homepage hero photography
- **Current:** Homepage hero (`HomeHero.tsx`) reuses the exact same 5-product pedestal composition as `/produk-dalam` via the shared `ProductPedestalLineup` component. Renders cleanly at desktop BM/EN and 375px mobile.
- **Hero-grade upgrade:** SECTION_SPEC §1.1 originally envisioned a custom AIHAA poster lineup image (single studio shot with all products on real cream pedestals). A dedicated photoshoot would replace the CSS pedestals entirely with a single hero composition image.
- **Also noted:** The homepage testimonials (`HomeTestimonials.tsx`) use the two SECTION_SPEC §1.4 quotes verbatim. When real customer reviews come in, copy-swap via `home_testi_quote_*` keys in `src/lib/i18n/translations.ts` — no layout changes needed.
- **Priority:** Low (both pages ship premium without reshoots; aesthetic upgrade only).

### §3 (Phase 3) Indoor hero pedestal photography
- **Current:** `IndoorHeroLineup` uses the existing `main.jpg` / `main.png` for each of the 5 indoor products. All render OK on dark background (verified in screenshots) because indoor photography is shot with neutral backdrops.
- **Hero-grade upgrade available:** SECTION_SPEC §2.1 originally called for a single studio-shot lineup with all 5 products on an actual cream pedestal surface. Our implementation approximates this via CSS-drawn pedestal blocks. A real photoshoot would make the hero more magazine-grade.
- **Priority:** Low — current version ships a premium feel; reshoot is an aesthetic upgrade, not a blocker.

### §3 Product grid low-contrast thumbnails (photo issue only)
- **Card-frame fix landed** in commit `d772706` — `ProductCard.tsx` image container swapped from `#f8f8f8` to the warm `#F0EEE9` off-white so every tile now reads as a distinct card even when the product photo has a white background.
- **Residual issue:** `super-pleated/main.jpg` and `uf-double-backwash/main.jpg` still appear faint because the subjects themselves were photographed against white. This is now a pure photo problem, not a UI problem.
- **Needed:** Reshoot or re-cut those two product photos with a subtle grey backdrop (or isolated cutouts on transparent PNG so the new #F0EEE9 tile shows through).
- **Priority:** Low — tiles are legible, product names + prices visible, cards clickable.

---

## Phase 7 — /product/[id] Premium Detail Sections

The detail-page template ships eight new sections spec'd against
SECTION_SPEC §D.2–§D.6. Every new visual is **CSS/SVG-drawn inline** —
no stock photos, no third-party assets, no missing images rendered as
broken UI. Real photography/illustration slots in later without changing
section logic.

### §D.2 indoor — `KitchenContextSplit.tsx`
- **Current:** Two side-by-side "kitchen scene" blocks. Modern = cream-grey gradient with soft radial highlights. Industrial = dark charcoal with concrete-grain overlay. Product image floats in front of an implied counter horizon. Label chip top-left, caption strip below each scene.
- **Needed:** Two real product-in-kitchen photos (4:5 aspect, studio-lit) — Modern (soft cabinetry) + Industrial (dark steel / concrete). Replace each KitchenScene's gradient `<div>` with a full-bleed `<Image>` once photography is delivered.
- **Priority:** Medium — gradient version reads premium at full-bleed aspect-[4/5] but the shot would make it magazine-grade.

### §D.2 outdoor — `HouseCrossSection.tsx`
- **Current:** Inline SVG isometric-ish house silhouette with 6 use-case pins (cooking, washing, showering, laundry, hygiene, outdoor) anchored around an AIHAA filter tank beneath the foundation. Grid-paper backdrop + dashed water distribution lines from tank to house taps.
- **Needed:** Commissioned isometric illustration (or 3D render) of a full AIHAA installation with labelled call-outs. Replace the inline `<svg>` block with a single `<Image>` once the render lands.
- **Priority:** Medium — signals intent clearly but real render would be significantly more persuasive.

### §D.3 indoor — `CapacityFunctionalities.tsx`
- **Current:** Five lucide-react icon circles (Coffee, Leaf, Baby, Droplets, CupSoda) with per-icon temperature pills. WINTER auto-adds a sixth Snowflake tile for the ice maker via `capacityOptions` override in products.ts.
- **Needed:** Either custom SVG iconography aligned with AIHAA brand, or real photos of each water state (steaming cup / chilled glass / ice cubes). Current lucide-react set works but is identifiable third-party iconography.
- **Priority:** Low — lucide icons read clean at 80px circles; upgrade is optional.

### §D.3 outdoor — `SevenLayerFiltration.tsx`
- **Current:** CSS-drawn seven-segment cylinder with top/bottom caps. Each layer has a distinct earth-tone colour + per-layer grain pattern (dots for granular media, stripes for KDF). Right column: 7 numbered cards with BM+EN layer name + description.
- **Needed:** Cross-section photo of an actual outdoor cylinder cut open (lab-style shot), OR a CAD-rendered cross-section with the actual AIHAA tank dimensions. Replace the `<div>` cylinder stack with an `<Image>` keyed by tank size.
- **Priority:** Medium — current version is premium but distinctly "illustrated schematic"; a real cross-section is the magazine-cover upgrade.

### §D.4 indoor — `FilterCartridgeRow.tsx`
- **Current:** Four inline-SVG cartridges (100×200 viewBox) with caps, nozzles, coloured liquid fills, per-stage pattern overlay (dots/stripes/wave), gloss gradient, and 34×14 blue flow-arrows between. Not reused from `/service/IndoorFilterRow.tsx` — this version is the hero-grade editorial edition.
- **Needed:** Four studio close-up product photos of the actual AIHAA cartridges (sediment, antibacterial, pre-carbon, post-carbon) on transparent background. Replace each `<CartridgeSvg>` block with an `<Image>` wrapped in the same flex-column container.
- **Priority:** Medium — SVG version reads clean but real cartridge photography would differentiate this from generic water-filter websites.

### §D.4 outdoor — `PvdfMicronFunnel.tsx`
- **Current:** Inline SVG trapezoid funnel (100μm → 10μm → 1μm → 0.01μm) with progressively-narrower widths, scattered "particle" dots through upper tiers, gold callout pins on the right side. Left column: 4 tier description cards.
- **Needed:** Either keep the SVG (it's intentional infographic styling), or commission a high-res microscopy composite showing actual membrane porosity. Real microscopy would dramatically uplift the "technical credibility" story.
- **Priority:** Low — SVG funnel is purpose-built for this section; microscopy is a nice-to-have.

### §D.5 — `FeaturesOverviewGrid.tsx` (shared)
- **Current:** 3×2 grid of warm-toned gradient "frames" (six preset colour tones), each showing `01`–`06` number + product feature caption pulled from `product.features[]`. Bottom-right placeholder note `"Close-up produk — akan dimuat naik"`.
- **Needed:** Six close-up photography shots per product — one per feature listed in `product.features[]`. The caption text is already wired; only the image block needs swapping. When photos arrive, replace the gradient `<div>` with `<Image>`.
- **Priority:** Medium — this section is deliberately placeholder-forward (the caption literally asks for photos). Works today, dramatically better with real close-ups.

### §D.6 — `ProductSpecs.tsx` (SpecPriceDark, shared)
- **Current blueprint drawing:** Inline SVG generic purifier silhouette with gold grid-paper backdrop, W/H dimension callouts, and 4 numbered lead-lines to unlabelled call-out points.
- **Needed:** Per-product engineering blueprint (can be CAD export converted to SVG, or a commissioned technical illustration). The 4 numbered call-outs should label actual product features. When blueprints land, replace `<BlueprintDrawing>` function body with an `<Image src={product.blueprint} />` and add a `blueprint?: string` field to Product.
- **Priority:** Medium-High — the spec page is where purchase conviction happens. A real technical drawing per product signals "professional engineering" at first glance.

### Phase 7 data-driven overrides (no new config placeholders)
- `capacityOptions` on products.ts — only WINTER overrides today (adds `"ice"`). Every other indoor product uses the default 5-tile set. No action needed unless a new SKU breaks the pattern.
- `filterStages` on products.ts — all indoor products use the default 4-stage set. Override per-product only if an SKU ships with a different filter stack.
- `outdoorLayers` on products.ts — all outdoor products use the default 7-layer set. Override only for the fiber-tank SKUs that use a simpler stack, if Azri confirms the media is different (currently assumed identical across outdoor range).

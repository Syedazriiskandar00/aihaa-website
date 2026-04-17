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

## Phase 2+ Placeholders (tracked here for future phases)

*To be populated when Phase 2 (Outdoor product detail) begins.*

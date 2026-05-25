# EAN Mobile Banner Spec — Azri Squoosh Reference

**Date:** 2026-05-24
**Status:** Pending Azri action
**Goal:** Generate 6 mobile portrait versions for EAN page banners

---

## 📊 6 Banner Inventory

| # | Banner | Desktop dim | Aspect | Desktop KB | Target mobile dim | Target KB |
|---|--------|-------------|--------|------------|-------------------|-----------|
| 1 | `hero-banner.webp` | 4269×2400 | 1.78 landscape | 162.2 KB | **800×1200** portrait reframe | ~60-90 KB |
| 2 | `color-variants.webp` | 4300×1447 | 2.97 landscape | 97.3 KB | **800×1200** portrait reframe | ~50-80 KB |
| 3 | `smart-design.webp` | 4269×1788 | 2.39 landscape | 84.5 KB | **800×1200** portrait reframe | ~50-80 KB |
| 4 | `features-detail.webp` | 1600×1600 | 1.00 square | 71.9 KB | **800×800** downscale | ~40-60 KB |
| 5 | `filter-flow.webp` | 4269×2400 | 1.78 landscape | 216.6 KB | **800×1200** portrait reframe | ~70-100 KB |
| 6 | `spec-price.webp` | 4269×2400 | 1.78 landscape | 105.4 KB | **800×1200** portrait reframe (text must stay readable!) | ~60-90 KB |

**Total desktop:** 738 KB → **Target mobile total:** ~330-500 KB (~50% reduction + portrait-friendly framing)

---

## 📁 Save Mobile Files To

All 6 mobile files save to folder: **`public/images/products/ean/`**

| Source banner | Target filename |
|--------------|-----------------|
| hero-banner.webp | `hero-banner-mobile.webp` |
| color-variants.webp | `color-variants-mobile.webp` |
| smart-design.webp | `smart-design-mobile.webp` |
| features-detail.webp | `features-detail-mobile.webp` |
| filter-flow.webp | `filter-flow-mobile.webp` |
| spec-price.webp | `spec-price-mobile.webp` |

---

## ⚙️ Squoosh Settings (PENTING!)

**Format:** WebP
**Lossless:** OFF
**Quality:** 75
**Width:** ikut "Target mobile dim" per banner di table atas
**Maintain aspect ratio:** ✅ YES
**Don't enlarge:** ✅ YES (check checkbox ni penting!)

### ⚠️ Important note on portrait reframe

For banners #1, #2, #3, #5, #6 (landscape source → portrait mobile target), Squoosh's auto-resize will only downscale the landscape image, NOT reframe it to portrait.

**Two workflow options:**

**Option A — Quick (auto downscale, keep landscape composition):**
- Just set width 800px in Squoosh, maintain aspect = YES
- Result: 800×450 instead of 800×1200 (still landscape, just smaller)
- Mobile users see same composition at smaller size
- Acceptable but not optimal portrait UX

**Option B — Better (manual portrait reframe before Squoosh):**
- In Figma/Photoshop: crop source to 800×1200 portrait composition (zoom in on hero subject)
- Then run through Squoosh quality 75
- Result: true portrait mobile experience
- Matches Phase 9 pattern from outdoor products (fiber-9x42, pvdf, steel)

**Recommend Option B** untuk hero-banner (LCP) + filter-flow (text-heavy diagram). Option A acceptable untuk color-variants + smart-design.

For #4 (features-detail square): just downscale 800×800, no reframe needed.

---

## ✅ After Azri Squoosh Siap

Bagitahu Claude — saya akan:
1. Verify 6 mobile files exist di `public/images/products/ean/`
2. Stage 6 mobile files
3. Commit dengan message: `feat(ean): add 6 mobile pair banners`
4. Push to remote
5. Vercel deploy

The `<picture>` wire-up + path moves are **already in place** (commits pending Azri review):
- Move commit: 6× `git mv` from `/products/` root to `/products/ean/`
- Wire-up commit: `<picture>` swap with `srcSet` pointing to `-mobile.webp` paths
- Currently `<source>` will 404 on mobile pairs → browser auto-fallback to `<img>` desktop ← that's expected behaviour until you finish Squoosh

---

## 🎯 Why This Matters

- `/product/aihaa-ean` is currently the **only product page with ZERO mobile optimization** (per session audit)
- EAN is a popular SKU — high mobile traffic
- LCP banner (hero-banner) currently serves 162 KB to phone users — should be ~30-50 KB
- Specs banner has text — desktop scaled down looks tiny on phone, portrait reframe makes specs readable

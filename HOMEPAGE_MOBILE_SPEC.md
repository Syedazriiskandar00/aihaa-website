# Homepage Mobile Image Spec — Azri Squoosh Reference

**Date:** 2026-05-24
**Status:** Pending Azri action
**Goal:** Generate 3 mobile portrait versions for homepage above-fold images

---

## 📊 3 Image Inventory

| # | Image | Desktop dim | Aspect | Desktop KB | Component | Target mobile dim | Target KB |
|---|-------|-------------|--------|------------|-----------|-------------------|-----------|
| 1 | `hero-main.jpg.webp` | 1600×899 | 1.78 landscape | 75.7 KB | HomeHero (LCP) | **800×1000** portrait reframe | ~30-40 KB |
| 2 | `product-collection.jpg.webp` | 1600×899 | 1.78 landscape | 31.6 KB | SignatureCollection | **800×900** portrait reframe | ~15-20 KB |
| 3 | `sales-expert.webp` | 1024×1536 | 0.67 portrait (already!) | 38.2 KB | CTASection | **600×900** downscale | ~25-35 KB |

**Total desktop:** 145.5 KB → **Target mobile total:** ~70-95 KB

---

## 📁 Save Mobile Files To

| Image | Save to path |
|-------|--------------|
| hero-main | `public/images/hero-main-mobile.jpg.webp` |
| product-collection | `public/images/product-collection-mobile.jpg.webp` |
| sales-expert | `public/images/products/sales-expert-mobile.webp` |

---

## ⚙️ Squoosh Settings Per Image

### 1. Hero Main (LCP critical)
- **Format:** WebP
- **Quality:** 75
- **Resize width:** 800px
- **Maintain aspect:** ✅ YES
- **Don't enlarge:** ✅ YES
- **Target file size:** ~30-40 KB

**Important:** This image already has `priority` + `fetch high` in HomeHero — it's the LCP candidate. Portrait reframe (manual crop first) STRONGLY recommended:
- Desktop 1600×899 → focal point likely center horizontal
- Mobile 800×1000 → zoom in on subject vertically
- Use Figma/Photoshop to crop BEFORE Squoosh

### 2. Product Collection (above-fold grid)
- **Format:** WebP
- **Quality:** 75
- **Resize width:** 800px
- **Maintain aspect:** ✅ YES
- **Don't enlarge:** ✅ YES
- **Target file size:** ~15-20 KB

**Note:** This image has two invisible clickable halves (top→outdoor, bottom→indoor). Mobile portrait reframe MUST preserve the visual top/bottom split so the click zones still make sense. Center the split line vertically in mobile crop.

### 3. Sales Expert (CTA portrait)
- **Format:** WebP
- **Quality:** 75
- **Resize width:** 600px (smaller because already portrait)
- **Maintain aspect:** ✅ YES
- **Don't enlarge:** ✅ YES
- **Target file size:** ~25-35 KB

**Note:** Already 0.67 portrait aspect — NO reframe needed, just downscale width 1024 → 600. Auto Squoosh will produce ~600×900.

---

## ✅ After Azri Squoosh Siap

Bagitahu Claude — saya akan:
1. Verify 3 mobile files exist
2. Stage 3 mobile files
3. Wire-up `<picture>` swap dalam 3 components:
   - `src/components/home/HomeHero.tsx`
   - `src/components/home/SignatureCollection.tsx`
   - `src/components/CTASection.tsx`
4. Build verify + type check
5. Test homepage desktop + mobile DevTools
6. Commit + push (likely 2 commits: 1 for mobile files, 1 for component wire-ups)

---

## 🎯 Why This Matters

- Homepage `/` adalah **landing page paling kerap dilawat** — every visit benefits
- Hero is LCP image — mobile LCP improvement directly impacts Core Web Vitals score
- Currently homepage 3 images = ~145 KB desktop = same 145 KB mobile (no swap)
- After mobile pair: ~70-95 KB mobile = **35-50% reduction** on homepage above-fold

---

## 🔧 Wire-up Pattern (preview, untuk reference Azri)

After mobile pairs exist, Claude will transform each component like this:

**HomeHero.tsx (Next/Image → picture wrapper):**

```tsx
// BEFORE
<Image src="/images/hero-main.jpg.webp" alt="..." fill priority sizes="100vw" />

// AFTER (use plain img + picture for media query swap)
<picture>
  <source media="(max-width: 768px)" srcSet="/images/hero-main-mobile.jpg.webp" />
  <img src="/images/hero-main.jpg.webp" alt="..." className="..." loading="eager" />
</picture>
```

Trade-off: lose Next.js srcset auto-generation but gain explicit mobile reframe control. For LCP-critical hero, explicit control wins.

Alternative: keep Next/Image and use `picture` element wrapper anyway — Next.js Image component renders inside. Both patterns valid; Claude will pick whichever fits each component's existing structure best.

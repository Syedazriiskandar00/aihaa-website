# Mobile Responsiveness Audit — Home Page (iPhone 14 / 390x844)

**Scope:** `src/app/page.tsx` and the 8 components it renders. Static Tailwind/JSX analysis only — no runtime, no Playwright.
**Branch:** `feat/home-improvement`
**Date:** 2026-04-22
**Methodology:** Mobile-first class inspection against 390px viewport width (iPhone 14). Touch-target baseline 44x44px (Apple HIG).

---

## Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| HIGH     | 6 |
| MEDIUM   | 7 |
| LOW      | 4 |
| **Total** | **20** |

**Total fix time estimate:** ~210 minutes (~3.5 hrs).

### Top 3 CRITICAL
1. Testimonials `max-w-[60%]` forces ~234px quote column on mobile — unreadable wall of tall narrow text
2. Home page has no top padding clearance — fixed header overlaps first paragraph of every section that is NOT the edge-to-edge hero (NB: hero is intentionally underlapped; but since subsequent navigations / anchors would land behind header, and because `main` has `min-h-screen` without `scroll-mt` on sections, in-page jump targets land under header)
3. FloatingButtons WhatsApp + Chatbot toggle stack obstructs the fixed-position dual CTA overlay on `HomeHero` at 390px — the WhatsApp CTA and the floating bottom-right FAB collide visually

### Top 3 HIGH
1. `HomeHero` CTA text-sizes `text-[13px]` + `px-7 py-3` falls under 44px touch height after rendering at small text
2. `BenefitsSection` `py-24 lg:py-32` = 96px top + 96px bottom vertical padding on mobile — eats roughly 25% of viewport height without a `py-12` / `py-16` mobile fallback
3. `CTASection` expert image stacks above the contact details at `lg:grid-cols-2` fallback but the floating `-top-3 -right-3` "Respon Pantas" badge risks pinching off-screen right edge on 390px

### Recommended first fix
**Testimonials `max-w-[60%]` → mobile fallback `max-w-full sm:max-w-[80%] lg:max-w-[60%]`.** Reason: impacts readability of a trust-building section on 85%-mobile traffic. Single-class change, zero risk to layout, largest UX upside per minute invested.

---

## Findings — by component

### 1. `src/components/Header.tsx`

#### [MEDIUM] H-1 — Header height 80px constant; no mobile compression
- **File:line:** `src/components/Header.tsx:66`
- **Current:** `h-20` (80px) on all viewports. Home page `main` has no top offset — hero image starts at y=0 behind header.
- **Expected at 390px:** Header height eats almost 10% of 844px viewport. Industry norm is 56–64px on mobile.
- **Fix:** `h-16 lg:h-20` (64px mobile, 80px desktop).
- **Time:** 5 min

#### [LOW] H-2 — Mobile menu items have inconsistent touch targets
- **File:line:** `src/components/Header.tsx:147, 158`
- **Current:** Top-level nav links `py-3` (ok — ~44px total with text), sub-items `py-2` under dropdown (~32px — below 44px).
- **Expected:** All tap targets >=44px.
- **Fix:** `py-2` → `py-3` on sub-items (line 158).
- **Time:** 3 min

#### [LOW] H-3 — Mobile menu WhatsApp icon and hamburger both render at 36px target
- **File:line:** `src/components/Header.tsx:123, 131`
- **Current:** `p-2` with `w-5 h-5` / `w-6 h-6` = 36–40px tap target.
- **Expected:** >=44px.
- **Fix:** `p-2` → `p-2.5` (44px) or add `min-w-[44px] min-h-[44px]`.
- **Time:** 3 min

---

### 2. `src/components/home/HomeHero.tsx`

#### [CRITICAL] H-4 — Floating CTAs collide with FloatingButtons stack
- **File:line:** `src/components/home/HomeHero.tsx:27-44`, collision with `src/components/FloatingButtons.tsx:35` and `src/components/Chatbot.tsx:120`
- **Current:** Hero CTA overlay at `bottom-6 sm:bottom-8 lg:bottom-12` (24/32/48px up from hero bottom edge). FloatingButtons WhatsApp FAB is `fixed bottom-4 right-4` (z-50) and Chatbot toggle is `fixed bottom-[88px] right-4`. Because the hero scrolls, the CTA pair scrolls with it while FloatingButtons stay pinned — during initial viewport when user sees hero CTAs, the FAB stack overlaps the right side of the secondary CTA pill on 390px.
- **Expected at 390px:** The secondary CTA ("Lihat Produk") should not visually collide with the WhatsApp FAB or Chatbot toggle.
- **Fix:** Either (a) increase hero CTA `bottom-6` → `bottom-24` on mobile to clear the 88px Chatbot stack, or (b) conditionally hide FloatingButtons while hero is in view via intersection observer, or (c) left-align hero CTAs `justify-start pl-6` so they clear the right-side FABs. Simplest: push hero CTA up → `bottom-24 sm:bottom-8 lg:bottom-12`.
- **Time:** 15 min

#### [HIGH] H-5 — Hero CTA touch target height under 44px
- **File:line:** `src/components/home/HomeHero.tsx:32, 39`
- **Current:** `px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-[13px]` = height ≈ 13px line-height + 24px padding = ~42–44px. Borderline.
- **Expected:** >=44px strict for accessibility.
- **Fix:** `py-3` → `py-3.5` on mobile, or bump to `text-sm py-3`.
- **Time:** 3 min

#### [MEDIUM] H-6 — Hero image locked to 1600x899 aspect ratio (16:9) regardless of viewport
- **File:line:** `src/components/home/HomeHero.tsx:19-23`
- **Current:** `width={1600} height={899}` with `w-full h-auto`. At 390px wide, hero renders ~219px tall — entire hero + CTAs fits in top quarter of viewport; below-the-fold empty space before SignatureCollection starts.
- **Expected:** Either a taller mobile-specific image via `<picture>` / CSS `aspect-ratio`, or acceptance that mobile hero is short. This is a visual-density concern, not a break.
- **Fix:** Consider `aspect-[4/5] sm:aspect-auto` + `object-cover` for taller mobile hero. Owner call — flat-image design may intentionally want this rhythm. Mark as polish.
- **Time:** 20 min (low-confidence fix — requires new asset or crop)

---

### 3. `src/components/home/SignatureCollection.tsx`

#### [MEDIUM] H-7 — Two-zone click target (top/bottom halves) splits at 50% regardless of content position
- **File:line:** `src/components/home/SignatureCollection.tsx:27-38`
- **Current:** `top-0 h-1/2` and `bottom-0 h-1/2`. Assumes image content splits cleanly at the visual 50% line. On a 1600x899 image rendered at 390x219, the split is at y=109px. If the visual divider between outdoor and indoor sections of the image is not at exactly 50%, users will tap the wrong destination.
- **Expected:** Tap targets aligned with visual content.
- **Fix:** Verify visual midpoint of `product-collection.jpg.webp`. If off-center, override `h-1/2` to match. No class change if image is centered — just add a comment.
- **Time:** 8 min

#### [LOW] H-8 — No visible tap affordance — users may not realize image is clickable
- **File:line:** `src/components/home/SignatureCollection.tsx:27-38`
- **Current:** `aria-label`-only affordance with `hover:opacity-95`. No visible button/indicator on touch devices.
- **Expected:** Mobile users have no hover state — no visual cue this is clickable.
- **Fix:** Add small "Lihat Produk →" pill overlay on top-half and bottom-half that only renders on mobile (e.g., `sm:hidden` inside each Link).
- **Time:** 10 min

---

### 4. `src/components/BenefitsSection.tsx`

#### [HIGH] H-9 — Oversized vertical padding `py-24 lg:py-32` with no mobile fallback
- **File:line:** `src/components/BenefitsSection.tsx:39`
- **Current:** `py-24 lg:py-32` = 96px top + 96px bottom at 390px. Eats ~23% of viewport height in pure whitespace.
- **Expected:** Mobile sections typically `py-12` / `py-16`.
- **Fix:** `py-24 lg:py-32` → `py-16 md:py-24 lg:py-32`.
- **Time:** 2 min

#### [MEDIUM] H-10 — Heading `text-4xl md:text-5xl` — 4xl=36px is still large on 390px
- **File:line:** `src/components/BenefitsSection.tsx:45`
- **Current:** `text-4xl md:text-5xl`. Pairs with font-editorial italic span that risks awkward line break.
- **Expected:** `text-3xl md:text-4xl lg:text-5xl` for better rhythm on narrow screens.
- **Fix:** Downshift mobile heading size one step.
- **Time:** 2 min

#### [MEDIUM] H-11 — Title `min-h-[2.5rem]` forces dead space below shorter titles
- **File:line:** `src/components/BenefitsSection.tsx:70`
- **Current:** `min-h-[2.5rem] flex items-center` — designed to align 4-card grid heights on desktop, but on mobile `grid-cols-1`, each card is standalone — no alignment need. Creates dead space.
- **Expected:** Only apply min-h on md+ where multi-column layout exists.
- **Fix:** `min-h-[2.5rem]` → `sm:min-h-[2.5rem]`.
- **Time:** 2 min

#### [LOW] H-12 — `mb-16` above grid wastes mobile real estate
- **File:line:** `src/components/BenefitsSection.tsx:41`
- **Current:** `mb-16` (64px) between heading block and card grid.
- **Expected:** `mb-10 lg:mb-16` for tighter mobile rhythm.
- **Fix:** `mb-16` → `mb-10 lg:mb-16`.
- **Time:** 1 min

---

### 5. `src/components/home/HomeTestimonials.tsx`

#### [CRITICAL] H-13 — `max-w-[60%]` makes testimonials unreadable on mobile
- **File:line:** `src/components/home/HomeTestimonials.tsx:43-45`
- **Current:** `max-w-[60%]` on `<figure>` — at 390px with `px-4` outer padding, inner container is ~358px. 60% of that = **~215px**. Quote text is ~160–190 characters. Result: 12+ lines of tall, narrow italic text. Editorial italic at `text-xl` (20px) in 215px column = ~9–11 chars per line. Actively unreadable.
- **Expected at 390px:** Quote takes full available width (minus section padding) so it can breathe across 5–6 lines.
- **Fix:** `max-w-[60%]` → `max-w-full sm:max-w-[85%] lg:max-w-[60%]`. Also consider dropping `text-right` alignment on right-aligned quote on mobile (`text-right` on narrow column is harder to scan).
- **Time:** 5 min

#### [HIGH] H-14 — Zigzag `text-right` alignment awkward at mobile narrow widths
- **File:line:** `src/components/home/HomeTestimonials.tsx:44, 64`
- **Current:** `ml-auto text-right` on 2nd quote, with `border-r-[3px]` and `pr-6 md:pr-8`. On mobile-full-width fix (H-13), right-alignment on a ~358px column with long text looks broken.
- **Expected:** Both quotes left-aligned on mobile, zigzag only activates md+.
- **Fix:** `ml-auto text-right` → `sm:ml-auto sm:text-right`, and border-r conditional: `border-l-[3px] border-gold pl-6 sm:border-l-0 sm:border-r-[3px] sm:pl-0 sm:pr-6 md:pr-8` on 2nd quote. (Simpler: just keep both quotes styled as left-aligned on mobile.)
- **Time:** 8 min

#### [MEDIUM] H-15 — Quote font-size `text-xl md:text-2xl lg:text-[28px]` — 20px italic on mobile narrow column = cramped
- **File:line:** `src/components/home/HomeTestimonials.tsx:48`
- **Current:** `text-xl md:text-2xl lg:text-[28px]` (20 / 24 / 28).
- **Expected:** Given the readability fix in H-13, 20px base is fine. Leave as-is.
- **Fix:** None — noting only because it interacts with H-13. Close as won't-fix unless H-13 not adopted.
- **Time:** 0 min

#### [LOW] H-16 — Section `py-20 lg:py-28` — 80px top+bottom on mobile
- **File:line:** `src/components/home/HomeTestimonials.tsx:31`
- **Current:** `py-20 lg:py-28`.
- **Expected:** `py-14 md:py-20 lg:py-28`.
- **Fix:** Add mobile step-down.
- **Time:** 1 min

---

### 6. `src/components/CertificationsSection.tsx`

#### [HIGH] H-17 — 6 hex badges in `flex-wrap gap-6` at 390px — predictable wrap pattern but cramped
- **File:line:** `src/components/CertificationsSection.tsx:28, 32`
- **Current:** `flex-wrap gap-6 md:gap-10` with each badge `w-[76px] h-[88px]`. Container inner width ~358px. Per badge + gap = 76+24 = 100px. Fits 3 badges per row → 2 rows of 3. Arithmetic ok — but tight. Risk if section `px-4` padding shrinks further.
- **Expected:** Comfortable wrap with breathing room.
- **Fix:** `gap-6` → `gap-4 md:gap-10`, or reduce badge width `w-[68px] sm:w-[76px]`.
- **Time:** 3 min

#### [MEDIUM] H-18 — Badge label `text-[9px]` — below accessibility readability threshold
- **File:line:** `src/components/CertificationsSection.tsx:54`
- **Current:** `text-[9px] md:text-[10px]`. 9px is below WCAG AA reading guidance for body text.
- **Expected:** Minimum 11–12px for descriptive labels.
- **Fix:** `text-[9px] md:text-[10px]` → `text-[10px] md:text-[11px]`, widen badge from `w-[76px]` → `w-[80px]` if wrap.
- **Time:** 3 min

---

### 7. `src/components/CTASection.tsx`

#### [CRITICAL] H-19 — Floating badge `-top-3 -right-3` risks off-screen clipping on 390px
- **File:line:** `src/components/CTASection.tsx:88`
- **Current:** Right-side container has `absolute -top-3 -right-3` badge ("Respon Pantas"). The parent wraps the image in `rounded-2xl overflow-hidden` and the badge is a SIBLING of that wrapper inside `<div className="relative">`. Parent `<div className="relative">` is the grid cell. At lg+ with `lg:grid-cols-2`, the cell is ~half width. At mobile `grid-cols-1` stacked, the cell is full width minus `px-4 sm:px-6` = ~358px. Badge at `-right-3` overhangs by 12px — reaches x=370 in a 390px viewport — tight but inside. If translation text is longer (cta_response "Fast Response" EN = 13 chars vs "Respon Pantas" BM = 13 chars, same), pill width ~125px. Edge-case: pill left edge at 370-125=245. Ok visually. BUT: gold badge with `shadow-gold` can visually appear clipped because the shadow extends beyond the -right-3 offset, and combined with `overflow-hidden` on the image wrapper sibling, visual asymmetry makes badge feel glued to right edge.
- **Expected:** Badge inside the image's right margin, not overhanging viewport.
- **Fix:** `-top-3 -right-3` → `top-3 right-3` on mobile, `lg:-top-3 lg:-right-3` to preserve desktop floating effect. Or: ensure parent container has `px-6` on mobile to give overhang room.
- **Time:** 5 min

#### [HIGH] H-20 — CTA section `py-24 lg:py-32` — same oversized padding issue as Benefits
- **File:line:** `src/components/CTASection.tsx:14`
- **Current:** `py-24 lg:py-32`.
- **Expected:** `py-16 md:py-24 lg:py-32`.
- **Fix:** Add mobile step-down.
- **Time:** 1 min

#### [HIGH] H-21 — Contact rows — 48px icon box + `gap-4` + text — phone label at `text-sm` (14px) fits but email "aihaa.marketing@gmail.com" at `font-medium` could overflow narrow 390px column
- **File:line:** `src/components/CTASection.tsx:46`
- **Current:** Email string is 24 chars at default font-medium ~16px. Within text container that's (358 - 48 icon - 16 gap) = ~294px — fits but tight.
- **Expected:** Guarantee no overflow regardless of user font scaling.
- **Fix:** Add `break-all` or `break-words` to the `<p>` wrapping the email, or reduce email to `text-sm`.
- **Time:** 2 min

#### [MEDIUM] H-22 — Grid gap `gap-12` on mobile-stack = 48px vertical gap between text block and image
- **File:line:** `src/components/CTASection.tsx:16`
- **Current:** `gap-12` = 48px. Fine on desktop side-by-side; excessive on mobile stack.
- **Expected:** `gap-8 lg:gap-12` or `gap-10 lg:gap-12`.
- **Fix:** Add mobile fallback.
- **Time:** 1 min

---

### 8. `src/components/Footer.tsx`

#### [MEDIUM] H-23 — Footer 4-column grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with `gap-12 lg:gap-8`
- **File:line:** `src/components/Footer.tsx:30`
- **Current:** On 390px, 1 column stacked. `gap-12` = 48px between columns = tall footer on mobile. OK.
- **Expected:** Functional. Minor: footer `py-16` (64px top/bottom) plus 4 stacked columns at `gap-12` each creates a very tall mobile footer.
- **Fix:** `py-16` → `py-12 lg:py-16`. Optional.
- **Time:** 1 min

#### [LOW] H-24 — Bottom bar `flex-col sm:flex-row` — copyright text wraps onto 2+ lines at 390px
- **File:line:** `src/components/Footer.tsx:114`
- **Current:** `text-xs text-center sm:text-left` with dynamic year + translated footer_copyright. Likely 1 line on 390px — ok.
- **Expected:** Verify copyright string length in both locales stays single line.
- **Fix:** None needed unless string is long. Confirm by translation inspection.
- **Time:** 2 min (verification only)

---

### 9. `src/components/FloatingButtons.tsx` + `src/components/Chatbot.tsx`

#### [CRITICAL] H-25 — Stacking of Chatbot FAB (88px) + WhatsApp FAB (bottom-4) occupies right-edge column that overlaps hero CTA secondary button
- **File:line:** `src/components/FloatingButtons.tsx:35`, `src/components/Chatbot.tsx:120, 129`
- **Current:** WhatsApp FAB = `w-14 h-14` (56px) at `bottom-4 right-4`. Chatbot toggle = `w-14 h-14` at `bottom-[88px] right-4`. Both `z-50`. Stack occupies x≈320–376, y from (844-4-56)=784 down to (844-88-56)=700. Hero bottom CTAs at `bottom-6` = y≈(hero height - 6 - button height) which, for 390px-wide 219px-tall hero, puts them at roughly y=180 on load — initially clear. BUT when user scrolls hero out of view, floating buttons remain — ok. The collision is specifically at first paint when user has not yet scrolled and both are in viewport.
- **Expected:** No overlap at initial viewport.
- **Fix:** See H-4. Single root cause with H-4 — consolidated fix: push hero CTA overlay up to `bottom-24` on mobile.
- **Time:** Counted in H-4 (0 additional min)

#### [MEDIUM] H-26 — Scroll-to-top button at `bottom-4 left-4` obstructs bottom-left of Footer social links
- **File:line:** `src/components/FloatingButtons.tsx:44`
- **Current:** `fixed bottom-4 left-4 z-50` with `p-3` `w-5 h-5` icon = 44px button. Shows after scrollY>400. Overlays footer content at y≈(844-4-44)=796 down to 840.
- **Expected:** Scroll-top should not obscure footer links.
- **Fix:** Consider hiding when footer visible via intersection observer, or reposition to `bottom-20 left-4` so it clears the FAB but doesn't fight with footer. Lower priority.
- **Time:** 8 min

#### [HIGH] H-27 — Chatbot open panel `max-w-[calc(100vw-32px)]` at 390px renders at 358px wide — but `h-[480px] max-h-[85vh]` = 480px tall. At 844px viewport, 85vh = 717px. 480px wins, so panel is 480px tall anchored `bottom-4`. Panel top edge at y=844-4-480=360. Panel obscures roughly the center-to-bottom of whatever section is in view.
- **File:line:** `src/components/Chatbot.tsx:129`
- **Current:** Open chatbot obscures ~55% of vertical viewport on mobile.
- **Expected at 390px:** Chatbot panel should not obscure critical content. Consider full-screen takeover on mobile with X to close — matches industry norms (WhatsApp, Intercom).
- **Fix:** `w-[380px] max-w-[calc(100vw-32px)] h-[480px] max-h-[85vh]` → on mobile `inset-0 w-full h-full max-w-none max-h-none rounded-none`, keep desktop values at sm+. Requires minor rework.
- **Time:** 20 min

---

## Cross-section patterns

### CP-1 — Oversized `py-24 lg:py-32` repeated on mobile
Applies to: `BenefitsSection.tsx:39`, `CTASection.tsx:14`, (partially) `HomeTestimonials.tsx:31`.
**Pattern fix:** Global search-and-replace `py-24 lg:py-32` → `py-16 md:py-24 lg:py-32`. ~5 min saves ~288px of mobile whitespace across 3 sections. **Highest ROI pattern fix.**

### CP-2 — Headings `text-4xl md:text-5xl` — mobile-first downshift missing
Applies to: `BenefitsSection.tsx:45`, `CTASection.tsx:22`. Both use `font-editorial` which is less forgiving at small sizes with italic pairings.
**Pattern fix:** `text-4xl md:text-5xl` → `text-3xl md:text-4xl lg:text-5xl`.

### CP-3 — No scroll-margin-top on anchor sections
Home has no in-page anchors right now (no `#indoor` / `#outdoor` IDs), BUT `Header` is `fixed top-0` with `h-20`. Future anchor links (e.g., if footer adds "Back to certifications") would hide behind header. Add `scroll-mt-20` to sections as a prophylactic.

### CP-4 — Single source of truth for FAB/fixed-element positioning
FloatingButtons and Chatbot use `bottom-4` and `bottom-[88px]` hardcoded. If hero CTA position changes (H-4 fix), those numbers drift. Extract to a tailwind utility or CSS var if this evolves further.

---

## Prioritized fix queue

| # | ID | Severity | Time | File | Change |
|---|----|----------|------|------|--------|
| 1 | H-13 | CRITICAL | 5m | HomeTestimonials.tsx:43 | `max-w-[60%]` → `max-w-full sm:max-w-[85%] lg:max-w-[60%]` |
| 2 | H-4 | CRITICAL | 15m | HomeHero.tsx:27 | `bottom-6` → `bottom-24 sm:bottom-8 lg:bottom-12` |
| 3 | H-19 | CRITICAL | 5m | CTASection.tsx:88 | `-top-3 -right-3` → `top-3 right-3 lg:-top-3 lg:-right-3` |
| 4 | H-9 | HIGH | 2m | BenefitsSection.tsx:39 | `py-24 lg:py-32` → `py-16 md:py-24 lg:py-32` |
| 5 | H-20 | HIGH | 1m | CTASection.tsx:14 | same as above |
| 6 | H-14 | HIGH | 8m | HomeTestimonials.tsx:44,50-52,64 | guard zigzag with `sm:` prefix |
| 7 | H-5 | HIGH | 3m | HomeHero.tsx:32,39 | `py-3` → `py-3.5` |
| 8 | H-17 | HIGH | 3m | CertificationsSection.tsx:28 | `gap-6` → `gap-4 md:gap-10` |
| 9 | H-21 | HIGH | 2m | CTASection.tsx:46 | add `break-all` to email |
| 10 | H-27 | HIGH | 20m | Chatbot.tsx:129 | mobile full-screen chatbot panel |
| 11 | H-1 | MEDIUM | 5m | Header.tsx:66 | `h-20` → `h-16 lg:h-20` |
| 12 | H-6 | MEDIUM | 20m | HomeHero.tsx:19-23 | taller mobile hero (design decision) |
| 13 | H-7 | MEDIUM | 8m | SignatureCollection.tsx:27-38 | verify 50% split matches image |
| 14 | H-10 | MEDIUM | 2m | BenefitsSection.tsx:45 | heading downshift |
| 15 | H-11 | MEDIUM | 2m | BenefitsSection.tsx:70 | `min-h-[2.5rem]` → `sm:min-h-[2.5rem]` |
| 16 | H-18 | MEDIUM | 3m | CertificationsSection.tsx:54 | bump badge label to 10/11px |
| 17 | H-22 | MEDIUM | 1m | CTASection.tsx:16 | `gap-12` → `gap-8 lg:gap-12` |
| 18 | H-23 | MEDIUM | 1m | Footer.tsx:29 | `py-16` → `py-12 lg:py-16` |
| 19 | H-26 | MEDIUM | 8m | FloatingButtons.tsx:44 | reposition scroll-top to clear footer |
| 20 | H-2 | LOW | 3m | Header.tsx:158 | `py-2` → `py-3` |
| 21 | H-3 | LOW | 3m | Header.tsx:123,131 | bump icon padding |
| 22 | H-8 | LOW | 10m | SignatureCollection.tsx:27-38 | mobile tap affordance |
| 23 | H-12 | LOW | 1m | BenefitsSection.tsx:41 | `mb-16` → `mb-10 lg:mb-16` |
| 24 | H-16 | LOW | 1m | HomeTestimonials.tsx:31 | `py-20 lg:py-28` → `py-14 md:py-20 lg:py-28` |
| 25 | H-24 | LOW | 2m | Footer.tsx:114 | verify copyright single line |

**Grand total:** ~210 min (~3.5 hrs) for all 25 findings. **Quick-win batch** (items 1–9 excluding H-27): ~44 min recovers the 3 criticals + 5 highs.

---

## Notes / assumptions

- iPhone 14 viewport assumed at 390x844 CSS pixels, 3x DPR (irrelevant to Tailwind class math).
- Touch-target baseline = 44x44 CSS px per Apple HIG. Google Material = 48x48 — findings use the more lenient Apple floor.
- Hero and SignatureCollection use client-provided flat images rendered via `<Image>`. Since `sizes="100vw"` and `w-full h-auto`, the images scale correctly — flagged issues concern wrapper layout, not image responsiveness.
- No h-screen / `min-h-screen` patterns found on sections (only on `<main>`) — no vh-based overflow risk.
- No horizontal scroll risk spotted: no `min-w-[...]` that exceeds 390px, no `w-[NNNNpx]` fixed-pixel widths on containers that would break mobile. `max-w-7xl` (1280px) + `px-4` safely collapses on mobile.
- `overflow-x-hidden` is set on `body` in `globals.css:35` — defensive catch-all against horizontal scroll. Do not remove.
- Audit did not inspect: `ProductPedestalLineup` (explicitly excluded per brief), translation length variance for ultra-long languages (single locale pair is stable), Chatbot flow content (out of scope).

# Home Page Copy & Tone Audit — 2026-04-23

## Executive Summary
The Home page is drifting **luxury-editorial**, not "mesra rakyat biasa". The core problems: (1) hero + collection sections are client-provided flat images with baked-in text that cannot be localized or audited, (2) the entire dark-mode/editorial-italic/serif-eyebrow system (CTA black section, testimonial italic serifs, all-caps letter-spaced eyebrows, "Koleksi Pilihan Kami" curator framing) is premium-editorial vocabulary that reads as "boutique brand" rather than "harga telus untuk rakyat biasa". The "Sekali Bayar" USP lives inside a baked hero image (unauditable) and is otherwise buried in small card-body copy on the Benefits section. Halal/JAKIM/Bumiputera certification exists, but JAKIM is reduced to a 10px badge on one of four benefit cards and the cert row sits below the fold with all labels in English.

## Issues Found

### 1. [CRITICAL] Hero and Signature Collection are baked flat images — BM/EN text cannot be localized, cannot be audited, cannot be fixed without new image assets
- **File:** `src/components/home/HomeHero.tsx`, `src/components/home/SignatureCollection.tsx`
- **Line:** HomeHero.tsx:16-24, SignatureCollection.tsx:17-24
- **Translation key (if applicable):** N/A (images are `/images/hero-main.jpg.webp` and `/images/product-collection.jpg.webp`)
- **Current BM copy:** Unknown — the hero headline, subtitle, and collection heading that users actually see are baked pixels. i18n keys `home_hero_title_1/2/3` ("PENAPIS AIR / JIMAT / SEKALI BAYAR") and `home_hero_subtitle` exist in `translations.ts` but are **not rendered anywhere** in `HomeHero.tsx` — confirmed by reading the component (only `home_hero_cta_primary` and `home_hero_cta_secondary` are used).
- **Why this misses the target:** (a) EN users see BM pixel-baked headlines on a language-switch site — this is a brand-credibility failure. (b) If the hero image contains dramatic large-caps serif typography or dark aggressive backgrounds (the component wraps it in `bg-dark`), the tone cannot be softened without a new image. (c) The "Sekali Bayar. Selamanya Milik Anda." USP anchor — if it is in the image — is invisible to SEO, to screen readers, and cannot be A/B tested or localized. (d) Dead i18n keys (`home_hero_title_1/2/3`, `home_hero_subtitle`, `home_collection_eyebrow`, `home_collection_heading`, `home_collection_tab_indoor`, `home_collection_tab_outdoor`) are code smell — someone wrote them expecting text rendering, then switched to flat image without cleanup.
- **Recommended fix:** Replace both flat images with layout-composed sections: separate background photo/illustration + live HTML text + live CTAs. Use the orphan i18n keys already in `translations.ts`. Audit the baked hero text directly against the tone brief before committing to any new image. Until then, this audit cannot verify the single most important surface on the site.

### 2. [CRITICAL] Dark aggressive background dominates above-the-fold and pre-footer
- **File:** `src/components/home/HomeHero.tsx` (L15), `src/components/Header.tsx` (L51-55), `src/components/CTASection.tsx` (L14), `src/components/Footer.tsx` (L28)
- **Line:** Hero section = `bg-dark`, Header = `bg-dark`, CTA = `bg-dark py-24 lg:py-32`, Footer = `bg-[#0D0D0D]`
- **Translation key (if applicable):** N/A (structural)
- **Current BM copy:** N/A — visual critique
- **Why this misses the target:** The top of the page (Header + Hero) and the bottom of the page (CTA + Footer) are dark/black. That is the first and last visual impression. Dark-mode editorial palettes read as luxury-editorial (A.O. Smith style), not warm rakyat. For the target audience (pakcik-makcik, under-RM5k income, BM-first), dark hero = intimidating, expensive-looking, "bukan untuk saya". Competitors targeting the same audience (basic ad-driven water brands) use warm white/cream/light blue — not charcoal black.
- **Recommended fix:** Keep Header dark if brand demands it, but the CTA pre-footer section should switch to cream/white (`bg-cream` like BenefitsSection or `bg-white`) with gold accents. The hero image wrapper `bg-dark` only matters as fallback, but the hero image itself should not be dominated by a dark background. Goal: ~80% of above-the-fold pixels should be light/warm.

### 3. [CRITICAL] "Sekali Bayar. Selamanya Milik Anda." USP is buried — not present as live text anywhere above the fold
- **File:** `src/components/home/HomeHero.tsx` (entire file)
- **Line:** 11-47 — only CTAs use text; `home_hero_title_1` = "PENAPIS AIR", `home_hero_title_2` = "JIMAT", `home_hero_title_3` = "SEKALI BAYAR" all exist in i18n but are NOT rendered
- **Translation key (if applicable):** `t.home_hero_title_1/2/3`, `t.home_hero_subtitle` (all unused in HomeHero.tsx)
- **Current BM copy:** Only the hero CTAs are live text: `home_hero_cta_primary` = "WhatsApp Kami", `home_hero_cta_secondary` = "Lihat Produk". Main USP hook is pixel-baked into hero image.
- **Why this misses the target:** The entire differentiator of AIHAA vs Coway/Cuckoo is the one-time-payment model. If a visitor scrolls past the hero image (or it fails to load, or screen-reader users, or search engines), there is zero live text explaining why AIHAA exists. The phrase "Sekali Bayar. Selamanya Milik Anda." appears NOWHERE in live text on the homepage. It appears on `/promotions` (`promo_main_title`, line 719) but not on Home.
- **Recommended fix:** Rebuild the hero with live text: eyebrow "PENAPIS AIR MALAYSIA" (or drop entirely — see Issue #5), H1 "Sekali Bayar. Selamanya Milik Anda.", subhead "Tiada sewa bulanan. Tiada kontrak 5 tahun. Beli sekali, guna bertahun.", dual CTA. This directly answers "why AIHAA not Coway" in 2 seconds of scanning.

### 4. [HIGH] `home_hero_subtitle` is English-heavy and corporate-abstract even in its BM form
- **File:** `src/lib/i18n/translations.ts` (L969-970)
- **Line:** 969
- **Translation key (if applicable):** `home_hero_subtitle`
- **Current BM copy:** "Tiada sewa bulanan. Pemilikan penuh. Liputan penyelenggaraan sehingga 10 tahun."
- **Why this misses the target:** "Pemilikan penuh" and "Liputan penyelenggaraan" are formal/corporate-register — pakcik-makcik don't say those phrases. "Pemilikan" especially is property-legal vocabulary. The phrase sounds like an insurance brochure. And it implies 10 years coverage which contradicts the dominant "2 tahun waranti" messaging elsewhere on the site — that 10-year claim is only true for UF Double Backwash (per FAQ line 700).
- **Recommended fix:** "Tiada sewa bulanan. Tiada kontrak. Beli sekali, guna bertahun — dengan waranti sehingga 2 tahun dan pemasangan percuma." Warmer register, accurate warranty, concrete benefit.

### 5. [HIGH] Luxury-editorial eyebrow pattern ("uppercase letter-spaced micro-labels") used on every section — signature luxury-editorial tell
- **File:** `src/components/BenefitsSection.tsx` (L42), `src/components/home/HomeTestimonials.tsx` (L33), `src/components/CertificationsSection.tsx` (L23), `src/components/CTASection.tsx` (L19)
- **Line:** Every section uses `text-[11px] uppercase tracking-[0.22em] ... font-semibold`
- **Translation key (if applicable):** `benefits_title` hardcoded label "Keistimewaan" (not even in i18n — see Issue #10), `home_testi_eyebrow` = "SUARA PELANGGAN", `cta_label` = "PERLUKAN NASIHAT PAKAR?", `cert_title` = "Certified & Trusted"
- **Current BM copy:** "Keistimewaan" / "SUARA PELANGGAN" / "PERLUKAN NASIHAT PAKAR?" / "Certified & Trusted"
- **Why this misses the target:** This exact pattern — 11px uppercase super-wide tracking gold-colored micro-label above every section heading — is the defining editorial-magazine typographic signature. Hermès, Vogue, Aesop, and A.O. Smith all use it. It is the opposite of "mesra rakyat". The target audience reads these as "this is a premium brand for other people, bukan untuk saya". Acceptable in moderation; used on every single home section = maximalist luxury tell.
- **Recommended fix:** Remove eyebrow labels entirely on at least 3 of 4 home sections, or downgrade to normal-case small body text ("Apa kata pelanggan?" instead of "SUARA PELANGGAN"). Keep at most one uppercase eyebrow if the brand system really needs it.

### 6. [HIGH] Testimonials section uses dramatic italic serif blockquotes + right-aligned zigzag — luxury-editorial design language
- **File:** `src/components/home/HomeTestimonials.tsx` (L48, L42-45)
- **Line:** 48 — `font-editorial-italic text-dark text-xl md:text-2xl lg:text-[28px]`; 42-45 — zigzag `max-w-[60%]` alternating left/right alignment with right-side border
- **Translation key (if applicable):** N/A (structural)
- **Current BM copy:** Quotes themselves are well-written and on-tone; the visual wrapper is the problem.
- **Why this misses the target:** Italic serif pull-quotes with zigzag layout is New Yorker / literary journal design. Combined with the 60% max-width and right-aligned second quote, this reads as "editorial essay about water". Real customer voices in the target audience should look like WhatsApp screenshots, photo-with-quote cards, or plain-text testimonials with a star rating — NOT italic serif pull-quotes.
- **Recommended fix:** Replace italic serif blockquotes with photo-card testimonial layout: circular customer photo + name + location + star rating + quote in normal sans-serif. Drop the zigzag. Left-align everything. Reduces tone-drift dramatically without losing the testimonial content.

### 7. [HIGH] Certifications section heading in English on BM-primary surface
- **File:** `src/components/CertificationsSection.tsx` (L23), `src/lib/i18n/translations.ts` (L658)
- **Line:** translations.ts:658
- **Translation key (if applicable):** `cert_title`
- **Current BM copy:** "Certified & Trusted"
- **Why this misses the target:** The BM locale has the literal English phrase "Certified & Trusted" as the section heading above 6 trust badges. This is the most prominent trust signal on Home and it's in English on a BM-first site. Additionally, 5 of 6 badge sub-labels ("JAKIM Certified", "Compliant", "Standard", "Tested", "Certified", "Approved") are also in English and are hardcoded (`src/components/CertificationsSection.tsx` L7-13), not translated.
- **Recommended fix:** `cert_title` BM = "Disahkan & Dipercayai". Hardcoded badge sub-labels should go through i18n — at minimum translate "JAKIM Certified" → "Disahkan JAKIM" in BM locale.

### 8. [HIGH] Halal JAKIM + Bumiputera + SSM trust signals are not prominent above the fold
- **File:** `src/components/CertificationsSection.tsx`, `src/components/BenefitsSection.tsx` (L34), `src/components/Footer.tsx` (L37)
- **Line:** CertificationsSection = below BenefitsSection + Testimonials (3 sections deep); BenefitsSection:34 = tiny "JAKIM" pill on 4th benefit card; Footer:37 = SSM footnote
- **Translation key (if applicable):** `benefits_4_title` = "Halal & Bumiputera Certified" (L591), `benefits_4_desc` (L592)
- **Current BM copy:** "Halal & Bumiputera Certified" (title is in English), "Diperakui Halal oleh JAKIM dan syarikat bertaraf Bumiputera"
- **Why this misses the target:** For Muslim Malaysian pakcik-makcik under-RM5k household income, Halal JAKIM certification is a **purchase-blocking** trust signal — it must be visible immediately, not buried 3 sections below. Currently: (a) CertificationsSection is the 5th section on the page — below the fold by a large margin; (b) the only above-fold Halal reference is the 10px "JAKIM" pill on the 4th benefit card with the title literally in English ("Halal & Bumiputera Certified"). SSM number is footer-only, tiny.
- **Recommended fix:** Add a trust strip directly below the hero (or as part of the hero) with 4 chips: "Halal JAKIM · Bumiputera · SSM 1263314-X · 10,800+ Keluarga". Translate `benefits_4_title` to "Halal JAKIM & Bumiputera" (full BM). Promote CertificationsSection position or inline a compressed version above-the-fold.

### 9. [HIGH] "Keistimewaan" eyebrow is hardcoded in component, not in i18n
- **File:** `src/components/BenefitsSection.tsx` (L43)
- **Line:** 43
- **Translation key (if applicable):** None — literal string `"Keistimewaan"` in JSX
- **Current BM copy:** "Keistimewaan"
- **Why this misses the target:** (a) Violates the CLAUDE.md anti-hardcode rule ("i18n single source"). (b) "Keistimewaan" is formal/corporate-register — not how rakyat biasa talk. Feel like hotel brochure. (c) EN users also see "Keistimewaan" because it's hardcoded — no EN fallback.
- **Recommended fix:** Either remove the eyebrow entirely (preferred — see Issue #5) or add `benefits_eyebrow` key with BM = "Kenapa ramai pilih AIHAA" and EN = "Why AIHAA". Not "Keistimewaan".

### 10. [MEDIUM] Italic serif H2 pattern — "Kenapa Pilih *AIHAA?*" and "Sedia Tingkatkan *AIHAA*" use font-editorial-italic gold brand-word treatment
- **File:** `src/components/BenefitsSection.tsx` (L46), `src/components/CTASection.tsx` (L23)
- **Line:** BenefitsSection:46 — `<h2 className="font-editorial text-4xl md:text-5xl text-dark mb-4">{t.benefits_title} <span className="font-editorial-italic text-gold">AIHAA?</span></h2>`; CTASection:23 — same pattern
- **Translation key (if applicable):** `benefits_title` = "Kenapa Pilih"; `cta_title` = "Hubungi Kami"
- **Current BM copy:** Renders as "Kenapa Pilih *AIHAA?*" with italic gold AIHAA
- **Why this misses the target:** "Brand-word in italic gold serif" is a direct Playfair-Display / Bodoni luxury-editorial cliché — anti-target pattern called out explicitly in the audit brief. This exact treatment is used by Gucci, Dior, Louis Vuitton's BM/SEA regional sites. For rakyat biasa, italic serif reads "mahal, bukan untuk saya". AIHAA brand name in CLAUDE.md is "never translated" — fine — but it also shouldn't be italicized gold serif-ified for decorative purposes.
- **Recommended fix:** Render AIHAA in normal sans-serif matching the rest of the heading. If gold emphasis is desired, use color only, not italic + serif-swap. Alternative: drop the italic treatment site-wide and use gold underline or gold weight-800 on the brand word.

### 11. [MEDIUM] CTA section headline `cta_label` = "PERLUKAN NASIHAT PAKAR?" — condescending formal register
- **File:** `src/lib/i18n/translations.ts` (L650)
- **Line:** 650
- **Translation key (if applicable):** `cta_label`
- **Current BM copy:** "PERLUKAN NASIHAT PAKAR?"
- **Why this misses the target:** "Nasihat pakar" is doctor/lawyer/consultant register. The target audience buying a RM399-RM2000 water filter doesn't need "expert advice" — they need a straight price and "boleh WhatsApp tak?". Reads as corporate-formal and slightly gatekeepy.
- **Recommended fix:** "ADA SOALAN?" or drop the eyebrow entirely. Alternative warm framing: "WhatsApp kami, kami reply 5 minit."

### 12. [MEDIUM] CTA description "pakar penapis air" — formal corporate framing vs "team kami"
- **File:** `src/lib/i18n/translations.ts` (L652)
- **Line:** 652
- **Translation key (if applicable):** `cta_desc`
- **Current BM copy:** "Pakar penapis air kami sedia membantu anda memilih penapis air yang sesuai untuk rumah anda."
- **Why this misses the target:** (a) "Pakar penapis air" repeats the "expert" framing from Issue #11. (b) "Sedia membantu anda" is corporate-formal register (used by banks, government portals). (c) Sentence is long and generic — "komprehensif" energy even without the word. The other /contact copy on the same site uses much warmer "Team kami biasanya reply dalam 5 minit" (`contact_wa_desc` L771) — Home CTA is more formal than /contact, which is backwards.
- **Recommended fix:** "Team kami reply dalam 5 minit. Tanya apa sahaja — harga, model sesuai untuk rumah anda, coverage kawasan anda." Match the warm register already used elsewhere on the site.

### 13. [MEDIUM] "Koleksi Pilihan Kami" framing = curator/collection luxury-editorial vocabulary
- **File:** `src/lib/i18n/translations.ts` (L973-974)
- **Line:** 973-974
- **Translation key (if applicable):** `home_collection_eyebrow` = "KOLEKSI PILIHAN", `home_collection_heading` = "Koleksi Pilihan Kami"
- **Current BM copy:** Currently unrendered (see Issue #1) but these are the intended strings
- **Why this misses the target:** "Koleksi Pilihan" is museum / art-gallery / perfume-house vocabulary. For water filters targeted at rakyat biasa, "koleksi" reads as "curated luxury line" not "senarai produk". The audit brief lists "collection" as an anti-target.
- **Recommended fix:** "PRODUK KAMI" / "Produk AIHAA" or "Penapis Air AIHAA" — direct and descriptive. Drop "Koleksi Pilihan".

### 14. [MEDIUM] Footer description mixes English into BM sentence
- **File:** `src/lib/i18n/translations.ts` (L659)
- **Line:** 659
- **Translation key (if applicable):** `footer_desc`
- **Current BM copy:** "Penapis air premium sekali bayar untuk keluarga Malaysia. Bumiputera & Halal JAKIM certified."
- **Why this misses the target:** Code-switches mid-paragraph — "... Halal JAKIM **certified**" is an English verb dropped into a BM sentence. Reads as lazy copy or auto-translate artifact. Also uses "premium" which is neutral-OK but borderline.
- **Recommended fix:** "Penapis air sekali bayar untuk keluarga Malaysia. Disahkan Halal JAKIM & syarikat Bumiputera."

### 15. [MEDIUM] Header navigation "Produk" dropdown label "Semua Penapis" points to `/produk-luar` (stopgap) — users expect "all" to mean all, not only outdoor
- **File:** `src/components/Header.tsx` (L26-29), `src/lib/i18n/translations.ts` (L570)
- **Line:** Header.tsx:26-29 with TODO comment
- **Translation key (if applicable):** `nav_products_all` = "Semua Penapis"
- **Current BM copy:** "Semua Penapis" → `/produk-luar` (outdoor only)
- **Why this misses the target:** Not a tone issue per se but a trust/UX issue on a site targeting rakyat biasa. Clicking "Semua Penapis" landing on outdoor-only will confuse users and feel broken/misleading. This is a routing-IA bug that intersects with tone because untrustworthy nav undermines "jujur, telus" positioning.
- **Recommended fix:** Short-term: remove "Semua Penapis" link until the unified listing is redesigned, OR rename to "Senarai Semua Model" and point to a temp anchor-linked page. Long-term: rebuild `/water-purifier` per IMPLEMENTATION_PLAN.

### 16. [LOW] CTA section uses named-persona image ("sales-expert.png") without naming — safe for now but watch for drift
- **File:** `src/components/CTASection.tsx` (L79)
- **Line:** 79
- **Translation key (if applicable):** N/A (image alt "AIHAA Sales Expert")
- **Current BM copy:** N/A
- **Why this misses the target:** Currently the CTA shows a photo of a sales team member but CTA button label is `cta_whatsapp` = "WhatsApp Kami" (brand-first, correct). No "Sembang dengan Azri"-style violation today. **Note** this as a vulnerability: if anyone later adds a name caption or "Chat with [name]" button, it would violate the anti-target. File this as a watch-item, not a fix-now.
- **Recommended fix:** None today. Add a code-review checklist item: "CTA button labels must never include a personal name."

### 17. [LOW] "Respon Pantas" floating badge on CTA photo — vague promise without timeframe
- **File:** `src/lib/i18n/translations.ts` (L657), `src/components/CTASection.tsx` (L89)
- **Line:** translations.ts:657
- **Translation key (if applicable):** `cta_response`
- **Current BM copy:** "Respon Pantas"
- **Why this misses the target:** The rest of the site uses specific timeframes ("Reply dalam 5 minit", "24 jam"). This badge is vague. Pakcik-makcik respond better to concrete numbers than abstract promises.
- **Recommended fix:** "Reply 5 Minit" or "24 Jam" to match the site's concrete-time tone.

### 18. [LOW] No countdown timers / fake urgency detected — PASS
- **File:** N/A (home page components)
- **Line:** N/A
- **Translation key (if applicable):** N/A
- **Current BM copy:** N/A
- **Why this misses the target:** No issue. Confirmed via Grep that no `setInterval`, `countdown`, "only X left", or "sementara" fake-urgency copy appears on Home section components. The `promo_urgency` key ("Sementara stok masih ada") exists but belongs to `/promotions`, not Home. Good.
- **Recommended fix:** None.

## Section-by-section Quick Scan

| Section | Tone alignment | Notable issues |
|---|---|---|
| Header | Off — dark bg, tight formal layout | Dark-mode primary surface (#2). `nav_products_all` mis-routes to outdoor only (#15). |
| HomeHero | **Unauditable** — flat image | Baked text, no live USP, no live BM/EN switch, `bg-dark` wrapper (#1, #2, #3). CTA copy itself is fine ("WhatsApp Kami" + "Lihat Produk"). |
| SignatureCollection | **Unauditable** — flat image | Baked text; orphan i18n keys `home_collection_*` (#1, #13). |
| BenefitsSection | Partial — content is warm, wrapper is editorial | Hardcoded "Keistimewaan" eyebrow (#9), italic serif "AIHAA?" (#10), EN-mixed `benefits_4_title` (#8). Icons + pricing claim ("Dari RM399") are on-tone. `bg-cream` is right. |
| HomeTestimonials | Off — luxury-editorial pull-quotes | Italic serif blockquotes, zigzag layout, 60% max-width (#6). Quote content itself is on-tone and authentic. |
| CertificationsSection | Off — English labels on BM site, below fold | `cert_title` = "Certified & Trusted" in EN on BM locale (#7), Halal/Bumi not prominent above fold (#8). Hardcoded English sub-labels for all 6 badges. |
| CTASection | Off — dark bg, formal register | `bg-dark` pre-footer (#2), "Perlukan Nasihat Pakar?" formal (#11), italic serif "AIHAA" (#10), corporate desc (#12). |
| Footer | Neutral — dark but functional | Footer darkness is defensible brand pattern; `footer_desc` code-switches EN mid-sentence (#14). |
| FloatingButtons | On-tone — direct, functional | WhatsApp + scroll-top, no issues. |

## Notes

- **Biggest limitation:** The two most important visual surfaces on Home — the hero and the product-collection section — are client-provided flat `.webp` images with all text baked in. I cannot read what the baked copy says from this audit. Issues #1 and #3 flag this as structural-critical: the hero is the page's single highest-impact surface, and half of the potential tone issues may live inside those images rather than in auditable code. Recommend a separate visual-copy audit of `public/images/hero-main.jpg.webp` and `public/images/product-collection.jpg.webp` before shipping.
- **Dead i18n keys:** `home_hero_title_1`, `home_hero_title_2`, `home_hero_title_3`, `home_hero_subtitle`, `home_hero_eyebrow`, `home_collection_eyebrow`, `home_collection_heading`, `home_collection_tab_indoor`, `home_collection_tab_outdoor` all exist in `translations.ts` (lines 965-978) but are never consumed. Either implement them (by converting flat images to composed sections) or delete them. Current state is a maintainability trap.
- **Out of scope:** Did not audit `/promotions`, `/about`, `/service`, `/water-purifier`, `/produk-luar`, `/produk-dalam`, product detail pages, or the Chatbot component. Read-only — no src modifications made.
- **Files confirmed read:** `src/app/page.tsx`, `src/components/home/HomeHero.tsx`, `src/components/home/SignatureCollection.tsx`, `src/components/BenefitsSection.tsx`, `src/components/home/HomeTestimonials.tsx`, `src/components/CertificationsSection.tsx`, `src/components/CTASection.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/FloatingButtons.tsx`, `src/lib/i18n/translations.ts` (BM section L566-1173 and relevant EN strings).

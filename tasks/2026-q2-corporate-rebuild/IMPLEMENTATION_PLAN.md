# AIHAA Website — Implementation Plan

**Versi:** 1.0  
**Tarikh:** 17 April 2026  
**Tujuan:** Master plan untuk Claude Code di lokal Azri implement transformation 5 halaman utama mengikut brainstorm team graphic design.

---

## Ringkasan Keputusan

| Perkara | Keputusan |
|---------|-----------|
| Tone warna | **Modern Contrast asal** (`#0D0D0D`, `#DAA520`, `#FFFDE7`, white) |
| Strategi tone | Kekal warna sedia ada, tapi guna gold dengan lebih tertib (kurang serabut) |
| Page scope | **7 page kekal**, 5 page utama di-rebuild section-by-section |
| Page yang TAK disentuh | `/promosi`, `/faq`, `/galeri` (kekal as-is) |
| Page yang DI-REBUILD | `/`, `/produk-dalam`, `/produk-luar`, `/service`, `/tentang-kami` |
| Workflow | **Feature branch** → Vercel preview → Azri review → merge ke main |
| Branch name | `feat/corporate-rebuild-2026-q2` |
| Reference visual | Hijrah Water, Wells Malaysia, Coway |
| Positioning | Hybrid corporate — cerita & spec dulu, harga di bawah |

---

## Larangan Penting (Jangan Buat)

Senarai ini direka khas untuk elak silap:

1. **JANGAN ubah tone warna utama.** `#0D0D0D` hitam, `#DAA520` gold, `#FFFDE7` soft lemon, putih. Kekal seperti sekarang.
2. **JANGAN buang halaman `/promosi`, `/faq`, atau `/galeri`.** Kekal sepenuhnya.
3. **JANGAN buang chatbot rule-based sedia ada.** Kekal.
4. **JANGAN ubah sistem i18n BM/EN sedia ada.** Tambah translation key baharu sahaja, jangan ubah struktur 6 file.
5. **JANGAN buang halaman product detail 13 produk yang dah ada** — restructure ke 9 indoor + 2 outdoor mengikut lineup AIHAA sebenar.
6. **JANGAN restructure folder Next.js secara dramatik.** Tambah file baharu di lokasi yang masuk akal, tapi jangan rename folder besar-besaran.
7. **JANGAN guna template patterns** (lessons.md rule). Jangan dual-button cards. Jangan placeholder content. Jangan countdown timer >30 hari.
8. **JANGAN tukar font keseluruhan tanpa konfirm Azri.** Kekal font heading & body sedia ada.

---

## Branch Strategy

```bash
# Mulakan dari main yang latest
git checkout main
git pull origin main

# Buat branch baharu
git checkout -b feat/corporate-rebuild-2026-q2

# Sepanjang implementation, commit secara incremental dengan message jelas
git commit -m "feat(home): add hero lineup section with AIHAA product showcase"
git commit -m "feat(produk-dalam): add 13 check point service section"
# dst.

# Push ke origin selalu untuk Vercel preview deploy
git push origin feat/corporate-rebuild-2026-q2
```

**Vercel preview URL akan auto-generate** untuk setiap push. Format biasanya: `aihaa-website-five-git-feat-corporate-rebuild-2026-q2.vercel.app`

Azri review di preview URL → bila approve, baru merge ke main:
```bash
git checkout main
git merge --no-ff feat/corporate-rebuild-2026-q2
git push origin main
```

---

## Urutan Kerja (Work Sequence)

Kerja dipecahkan kepada **5 phase** yang boleh siap satu-satu. Setiap phase boleh di-deploy dan di-review independently.

### Phase 0 — Setup (30 minit)
- [ ] Create branch `feat/corporate-rebuild-2026-q2`
- [ ] Update `CLAUDE.md` brain system dengan keputusan tone & scope
- [ ] Buat folder `tasks/2026-q2-corporate-rebuild/` untuk track progress
- [ ] Drop `IMPLEMENTATION_PLAN.md` (file ini) dan `SECTION_SPEC.md` ke folder tu
- [ ] Update `tasks/lessons.md` dengan rules baharu dari brainstorm

### Phase 1 — Service Page (3-4 jam) ⭐ MULAKAN DI SINI
**Sebab mulakan di sini:** Data paling lengkap (semua harga, check points, steps dah confirm). Tak perlu tunggu asset baharu sangat — boleh guna existing visuals + placeholder yang masuk akal. Hasil cepat nampak untuk Azri validate direction.

Files yang akan disentuh:
- `app/service/page.tsx` — page utama (CREATE atau UPDATE kalau dah ada)
- `app/service/components/HeartServiceHero.tsx` — section 1 (CREATE)
- `app/service/components/IndoorFilterShowcase.tsx` — section 2 (CREATE)
- `app/service/components/CheckPointDiagram.tsx` — section 3 (CREATE)
- `app/service/components/EightStepGallery.tsx` — section 4 (CREATE)
- `app/service/components/ServicePricingCards.tsx` — section 5 (CREATE)
- `app/service/components/SandTypesShowcase.tsx` — section 6 (CREATE)
- `app/service/components/OutdoorCheckPoints.tsx` — section 7 (CREATE)
- `app/service/components/SandServicePricing.tsx` — section 8 (CREATE)
- `i18n/translations/service.ts` — translation keys baharu (CREATE atau UPDATE)
- `app/components/Navbar.tsx` — tambah link `/service` kalau belum ada (UPDATE)

### Phase 2 — Produk Outdoor (2-3 jam)
**Sebab di sini selepas Service:** Cuma 2 produk = scope kecil. Pattern detail page boleh established sebelum berkembang ke 9 indoor produk yang lebih kompleks.

Files:
- `app/produk-luar/page.tsx` — landing page outdoor (CREATE atau UPDATE)
- `app/produk-luar/components/SageHeroLineup.tsx` — section 1 (CREATE)
- `app/produk-luar/[slug]/page.tsx` — product detail template (CREATE)
- `app/produk-luar/[slug]/components/HeroBanner.tsx`
- `app/produk-luar/[slug]/components/HouseCrossSection.tsx`
- `app/produk-luar/[slug]/components/SevenLayerBreakdown.tsx`
- `app/produk-luar/[slug]/components/MicronFunnel.tsx`
- `app/produk-luar/[slug]/components/FeaturesGrid.tsx`
- `app/produk-luar/[slug]/components/SpecAndPrice.tsx`
- `data/products/outdoor.ts` — data RENN & RENN S Series (CREATE)

### Phase 3 — Produk Indoor (5-6 jam)
**Sebab paling besar:** 9 produk × 6 section template = banyak data wiring. Tapi component reusable dari Phase 2.

Files:
- `app/produk-dalam/page.tsx` — landing page indoor (UPDATE)
- `app/produk-dalam/components/IndoorHeroLineup.tsx` (CREATE)
- `app/produk-dalam/components/ProductGridHijrahStyle.tsx` (CREATE)
- `app/produk-dalam/[slug]/page.tsx` — detail template (UPDATE)
- `app/produk-dalam/[slug]/components/ProductHeroBanner.tsx`
- `app/produk-dalam/[slug]/components/KitchenContextSplit.tsx`
- `app/produk-dalam/[slug]/components/CapacityIcons.tsx`
- `app/produk-dalam/[slug]/components/FeaturesOverviewGrid.tsx`
- `app/produk-dalam/[slug]/components/FilterCartridgeRow.tsx`
- `app/produk-dalam/[slug]/components/SpecAndPriceDark.tsx`
- `data/products/indoor.ts` — data 9 model (CREATE atau UPDATE)
- 9 product detail pages (auto-generate dari template + data)

### Phase 4 — Home Page (3-4 jam)
**Sebab di tengah:** Boleh reuse component dari Phase 1-3 (lineup hero, product grid). Tak perlu reinvent.

Files:
- `app/page.tsx` — homepage (UPDATE)
- `app/components/home/HeroLineup.tsx` — section 1 (CREATE)
- `app/components/home/SignatureCollection.tsx` — section 2 (CREATE)
- `app/components/home/KenapaPilihAihaa.tsx` — section 3 (UPDATE jika dah ada)
- `app/components/home/FeedbackTestimonials.tsx` — section 4 (UPDATE jika dah ada)

### Phase 5 — About Us (2-3 jam)
**Sebab last:** Banyak placeholder (Video Azlee, team photos, CSR) yang belum confirmed. Boleh launch dengan section yang dah mature dulu, top up kemudian.

Files:
- `app/tentang-kami/page.tsx` (UPDATE)
- `app/tentang-kami/components/KisahKami.tsx` (UPDATE — sudah ada)
- `app/tentang-kami/components/HalalCommitment.tsx` (CREATE)
- `app/tentang-kami/components/AzleeCollabVideo.tsx` (CREATE — placeholder OK)
- `app/tentang-kami/components/TeamPhotoSection.tsx` (CREATE — placeholder OK)
- `app/tentang-kami/components/CsrSumbangan.tsx` (CREATE — placeholder OK)

---

## Component Reuse Map

Komponen ini perlu dibina sekali, guna di banyak tempat:

| Component | Lokasi awal | Reused di |
|-----------|-------------|-----------|
| `IndoorFilterRow` (4 cartridge horizontal) | `service/page.tsx` | `produk-dalam/[slug]/page.tsx` |
| `SpecPriceDarkSection` | `produk-dalam/[slug]` | `produk-luar/[slug]` |
| `HalalBadge` | `tentang-kami/page.tsx` | Footer global, homepage trust bar |
| `WhatsAppFloatingCTA` | Sudah ada | Kekal di semua page |
| `LanguageToggle BM/EN` | Sudah ada | Kekal |
| `ProductLineupShowcase` | `produk-dalam` | Homepage hero |

**Prinsip:** kalau Claude Code lokal nampak component yang serupa di 2 tempat, refactor ke satu file shared. Letak di `app/components/shared/`.

---

## Translation Strategy (i18n BM/EN)

Sedia ada 200+ keys split kepada 6 file. Tambah key baharu mengikut convention:

```typescript
// i18n/translations/service.ts (CREATE)
export const serviceTranslations = {
  hero: {
    eyebrow: { ms: "EXCEPTIONAL SERVICE, PREMIUM EXPERIENCE", en: "EXCEPTIONAL SERVICE, PREMIUM EXPERIENCE" },
    speedy: { ms: "Pantas", en: "Speedy" },
    expert: { ms: "Bertauliah", en: "Expert" },
    caring: { ms: "Mesra", en: "Caring" },
    alert: { ms: "Responsif", en: "Alert" },
    // ...dll
  },
  checkPoint: {
    title: { ms: "13 Titik Pemeriksaan Servis", en: "13 Service Check Points" },
    items: [
      { ms: "Adapter", en: "Adapter" },
      { ms: "Powerpoint", en: "Powerpoint" },
      // ...
    ]
  },
  pricing: {
    aihaaTitle: { ms: "Servis Filter (Jenama AIHAA)", en: "Filter Service (AIHAA Brand)" },
    aihaaPrice: "RM 160", // tak perlu translate
    otherTitle: { ms: "Servis Filter (Jenama Lain)", en: "Filter Service (Other Brand)" },
    otherPrice: "RM 260",
  }
};
```

**Pattern:** Setiap section yang dibina mesti ada translation entry. JANGAN hardcode bahasa dalam component.

---

## Asset & Image Requirements

Asset yang **wajib** ada sebelum launch (kalau tak ada, guna placeholder):

| Asset | Lokasi gunaan | Status |
|-------|---------------|--------|
| Lineup hero photoshoot (9 indoor + label pedestal) | Homepage hero, Produk Dalam hero | Confirm dengan team graphic |
| 9 product photo individu (latar telus) | Product grid, product detail hero | Confirm |
| Modern Kitchen + Industrial Kitchen lifestyle shot | Product detail section 2 | Perlu shoot atau render |
| Filter cartridge close-up (4 jenis) | Product detail section 5, Service section 2 | Confirm |
| House cross-section illustration | Outdoor product detail section 2 | Custom illustration — perlu render baharu |
| 6 jenis pasir tumpukan photo | Service section 6 | Confirm |
| Halal JAKIM cert scan | About Us section 2 | Azri ada |
| Azlee video (YouTube link or file) | About Us section 3 | Confirm |
| Team group photo | About Us section 4 | Confirm |
| CSR activity photos | About Us section 5 | Confirm |
| 8 step service photo/video | Service section 4 | Belum ada — guna placeholder hijau dulu |

**Strategy untuk asset belum ada:** Guna `next/image` dengan placeholder yang bermakna (cth solid color block dengan teks "Photo: 8 step service akan diisi"). JANGAN guna stock photo random.

---

## SEO & Metadata Updates

Setiap page baharu/dirombak mesti ada:

```typescript
export const metadata = {
  title: "...",
  description: "...",
  openGraph: { /* ... */ },
};
```

Update `sitemap.xml` dengan slug baharu. Update `robots.txt` kalau ada page yang perlu di-block.

JSON-LD `LocalBusiness` schema sudah ada di laman semasa — extend dengan `Product` schema untuk setiap 11 product detail page.

---

## Testing Checklist Sebelum Merge

Sebelum push ke main, Azri review preview dan check:

### Visual & UX
- [ ] Tone Modern Contrast konsisten — tiada warna asing tertumpah
- [ ] Gold `#DAA520` digunakan dengan tertib (bukan setiap card)
- [ ] Soft lemon `#FFFDE7` cuma di section "Kenapa Pilih AIHAA" dan tempat strategik lain
- [ ] Hero lineup section render produk dengan jelas
- [ ] Spec & Price section ada di BAWAH setiap product detail (bukan atas)
- [ ] Mobile layout works (test di iPhone & Android width)
- [ ] WhatsApp floating CTA kekal accessible di semua page

### Functional
- [ ] Toggle BM/EN works untuk semua content baharu
- [ ] Chatbot sedia ada masih works (jangan break)
- [ ] Halaman `/promosi`, `/faq`, `/galeri` masih accessible & berfungsi
- [ ] Setiap product detail page dapat diakses via grid click
- [ ] Internal links between pages works (Home → Produk → Detail)
- [ ] Form contact (kalau ada) masih works

### Performance
- [ ] Lighthouse score: Performance >85, Accessibility >90, SEO >95
- [ ] Image optimization: guna `next/image` dengan width/height proper
- [ ] No console errors

### Content
- [ ] Tiada "Lorem ipsum" atau placeholder text yang ter-leave
- [ ] Tiada gambar broken (404)
- [ ] Translation keys lengkap untuk BM dan EN
- [ ] Halal cert valid (tarikh tak expired)

---

## Lessons.md Updates (Add These Rules)

Tambah dalam `tasks/lessons.md`:

1. **Hero lineup pattern:** Untuk product showcase, gunakan layout lineup atas pedestal (gaya Hijrah/AIHAA poster). Bukan grid 4 kotak.
2. **Spec & Price always at bottom:** Hybrid corporate positioning — spec dan harga MESTI di section terakhir product detail. Jangan letak di atas.
3. **Soft lemon yellow accent rule:** `#FFFDE7` hanya untuk satu section per page sebagai visual rest stop. Jangan guna di multiple sections — terlalu kuning, hilang premium feel.
4. **Service page = transparent pricing:** Lain dari product page, harga servis ditunjuk besar dan jelas (bukan di bawah). Service = predictable cost, customer perlu tahu cepat.
5. **Filter cartridge horizontal row** ialah component reusable — guna yang sama di Service page dan Product Detail Indoor. JANGAN buat dua versi.
6. **Coway "Heart Service" 4-pillar pattern:** Speedy/Expert/Caring/Alert dalam grid 4 kolum, gunakan untuk service value proposition. Style editorial, bukan corporate kering.
7. **House cross-section** untuk outdoor filter — jelaskan "filter melindungi semua air masuk rumah", bukan sekadar di sinki. Visual paling powerful untuk outdoor section.
8. **Sage green** (`#C5D5B5` lebih kurang) hanya untuk Outdoor product hero — bagi rasa "natural water purification". Jangan guna di indoor atau home page.

---

## Risk Register

| Risk | Mitigation |
|------|-----------|
| Asset belum ready (lineup photo, kitchen shots, dll) | Guna placeholder bermakna, deploy preview, top up bila ada |
| Team graphic design tukar fikiran tengah jalan | Lock brainstorm sebagai source of truth via dokumen ini |
| Translation keys terlepas bahasa | Run linter check sebelum merge — cari "Locale not found" warnings |
| Performance turun sebab image size besar | `next/image` dengan AVIF/WebP, lazy loading, blur placeholder |
| 9 product detail page kerja banyak | Build template betul-betul dulu, lepas itu data wiring je |
| Mobile experience pecah | Test setiap section di Chrome DevTools mobile mode setiap kali commit |
| Tone warna terlampau gold = "serabut" feel | Apply rule: gold cuma untuk CTA primary, eyebrow accent, dan halal badge. Bukan setiap heading. |

---

## Communication Protocol

Bila Claude Code lokal Azri jumpa benda yang ambiguous atau perlu decision:
1. **JANGAN guess** — buat note dalam commit message: `// QUESTION: should X be Y or Z?`
2. **Tag dalam PR description** bila push — Azri review akan nampak.
3. **Stop kerja yang depend pada decision** — pindah ke task lain dulu sehingga Azri jawab.

Bila Azri suruh "lancarkan sekarang":
1. Pastikan branch passing semua testing checklist di atas
2. Squash commits kalau perlu untuk history yang bersih
3. Merge dengan `--no-ff` supaya history nampak ada milestone
4. Tag release: `git tag v2.0-corporate-rebuild`
5. Push tag: `git push origin v2.0-corporate-rebuild`

---

## Estimasi Total Masa

| Phase | Estimasi | Realistik (dengan asset issue) |
|-------|----------|--------------------------------|
| Phase 0 (Setup) | 30 min | 1 jam |
| Phase 1 (Service) | 3-4 jam | 1 hari |
| Phase 2 (Outdoor) | 2-3 jam | 1 hari |
| Phase 3 (Indoor) | 5-6 jam | 2 hari |
| Phase 4 (Home) | 3-4 jam | 1 hari |
| Phase 5 (About) | 2-3 jam | 1 hari |
| **Total** | **~18 jam fokus** | **~6-7 hari kerja** |

Realistik mengambil kira: tunggu asset, iterasi feedback, fix bug, test mobile, dll.

---

## Kontak & Reference

- **Repo:** `Syedazriiskandar00/aihaa-website`
- **Production:** `aihaa-website-five.vercel.app`
- **Brain system:** `CLAUDE.md` (10-file system di repo root)
- **Visual references:** Hijrah Water (`hijrahwater.com.my`), Wells Malaysia (`wellsmalaysia.com`), Coway Malaysia (`coway.com.my`)
- **Brainstorm source:** `WEBSITE_AIHAA_BRAINSTORMING.pdf` (uploaded by Azri)

---

**Status:** Plan ini lock. Bila Azri approve, Claude Code lokal mulakan Phase 0.

# AIHAA Website — Section Specification

**Versi:** 1.0  
**Tarikh:** 17 April 2026  
**Tujuan:** Spesifikasi visual & copy untuk setiap section dalam 5 page utama. Rujukan untuk Claude Code di lokal supaya tak silap interpret brainstorm team.

---

## Reference Source

Setiap section di bawah dipetakan kepada page asal team yang dirujuk:

- **Hijrah Water** (`hijrahwater.com.my`) — product detail, halal commitment, outdoor cross-section
- **Wells Malaysia** (`wellsmalaysia.com`) — signature collection grid, kitchen lifestyle
- **Coway Malaysia** (`coway.com.my`) — heart service 4-pillar, PVDF micron breakdown

Bila ragu — open URL rujukan dan tengok lebih dekat.

---

## Design Tokens (Sah Untuk Semua Section)

```typescript
// Tone Modern Contrast (kekal)
const tokens = {
  colors: {
    bgPrimary: "#0D0D0D",        // hitam dominan
    bgSecondary: "#1A1A1A",       // hitam lebih lembut
    textPrimary: "#FFFFFF",
    textSecondary: "#B4B2A9",     // kelabu pucat untuk subtitle
    accent: "#DAA520",            // gold — guna dengan tertib
    accentSoft: "#F2D77E",        // gold lebih cerah untuk hover
    softLemon: "#FFFDE7",         // cuma untuk section "Kenapa Pilih AIHAA"
    sage: "#B5C5A5",              // outdoor product hero ONLY
    darkSpec: "#0A0A0A",          // background section spec & price
    halalGreen: "#2D5F4A",        // ikon halal
  },
  spacing: {
    sectionY: "5rem",             // padding atas/bawah setiap section
    sectionXMobile: "1.25rem",
    sectionXDesktop: "max(2rem, calc((100vw - 1280px) / 2))",
  },
  typography: {
    eyebrow: { size: "11px", weight: 500, tracking: "0.2em", uppercase: true },
    h1: { size: "clamp(32px, 5vw, 56px)", weight: 500, tracking: "-0.02em" },
    h2: { size: "clamp(24px, 3.5vw, 36px)", weight: 500 },
    h3: { size: "18px", weight: 500 },
    body: { size: "15px", lineHeight: "1.6" },
    caption: { size: "13px", color: "textSecondary" },
  }
};
```

**Rule:** Semua component WAJIB guna tokens ini. Jangan hardcode `#000000` atau `#FFD700` etc.

---

## RULES — Penggunaan Gold (Anti-Serabut)

Sebab Azri kata "premium tak nak terlampau serabut", gold mesti diguna **TERTIB**:

### Gold YANG dibenarkan
- ✓ Logo brand di navbar
- ✓ Eyebrow text di hero (e.g. "PENAPIS AIR PREMIUM")
- ✓ CTA primary button (background gold)
- ✓ Halal badge accent
- ✓ Service price emphasis (tajuk "RM 160" — bukan keseluruhan card)
- ✓ Active state navigation underline

### Gold YANG DILARANG
- ✗ Setiap heading dalam page
- ✗ Setiap card border
- ✗ Body text
- ✗ Background besar (lebih dari 10% area visible)
- ✗ Setiap icon
- ✗ Multiple CTAs in same screen view

**Test:** Kalau dalam satu screenshot mobile-size, ada lebih dari 4 elemen gold visible serentak — itu DAH SERABUT. Kurangkan.

---

# PAGE 1: HOME

## Section 1.1 — Hero Lineup

**Reference:** AIHAA poster lineup (PDF page 2)

### Layout
- Full-width section
- Background: `#0D0D0D`
- Padding: `5rem 1.25rem` (mobile), `5rem max(2rem, ...)` (desktop)
- Min-height: `90vh`

### Components (atas ke bawah)
1. **Logo strip kecil di tengah atas:** Logo AIHAA Marketing Sdn Bhd putih + emas (size: 60px width)
2. **Eyebrow text:** "PENAPIS AIR PREMIUM" (gold, tracking `0.2em`)
3. **Hero title (3 baris):**
   - "PENAPIS AIR" (putih, 56px, weight 500)
   - "JIMAT" (gold, 80px, weight 600, italic)
   - "SEKALI BAYAR" (putih, 56px, weight 500)
4. **Sub-tagline (1 ayat):** "Tiada sewa bulanan. Pemilikan penuh. Liputan penyelenggaraan 10 tahun." (kelabu pucat, 16px)
5. **Lineup image:** 9 produk indoor atas pedestal cream (height: 50vh, object-fit: contain)
6. **Dual CTA:**
   - Primary: "WhatsApp Kami →" (background gold, text hitam)
   - Secondary: "Lihat Produk" (border gold, text gold, transparent background)

### Mobile Responsive
- Hero title turun ke 32px / 48px / 32px
- Lineup image turun ke 40vh
- CTA stack vertikal (bukan horizontal)

### Translation Keys
```typescript
home.hero = {
  eyebrow: "PENAPIS AIR PREMIUM",
  title1: { ms: "PENAPIS AIR", en: "WATER PURIFIER" },
  title2: { ms: "JIMAT", en: "ECONOMY" },
  title3: { ms: "SEKALI BAYAR", en: "ONE-TIME PAYMENT" },
  subtitle: { ms: "Tiada sewa bulanan...", en: "No monthly rental..." },
  ctaPrimary: { ms: "WhatsApp Kami", en: "WhatsApp Us" },
  ctaSecondary: { ms: "Lihat Produk", en: "View Products" }
}
```

---

## Section 1.2 — Our Signature Collection

**Reference:** Wells Malaysia (PDF page 1)

### Layout
- Background: `#FFFFFF` (putih bersih, beza dari hero)
- Padding atas/bawah: `5rem`

### Components
1. **Section heading:** "OUR SIGNATURE COLLECTION" (hitam, 36px, tengah-aligned)
2. **Tab toggle:** "Indoor" | "Outdoor" (Wells style: pill toggle, active state gold background)
3. **Grid 4 produk per row (desktop), 2 per row (mobile):**
   - Setiap card: `padding: 1.5rem`, no border, no shadow
   - Top: 4-5 colour swatch dot kecil (warna varian produk yang available)
   - Tengah: Gambar produk besar (latar telus), height ~280px
   - Bawah: Nama produk (caps, 14px, weight 500), 2-baris deskripsi pendek (kelabu, 13px), "Read More →" link kecil
4. **Footer link:** "Lihat semua produk →" (gold, di bawah grid)

### Indoor tab content (active default):
Featured 4 produk: **EAN WHITE, BIG, BELLA, ULTRA ONE** (variety dari portfolio)

### Outdoor tab content:
Featured 2 produk: **RENN, RENN S Series** (sebab cuma 2 produk outdoor — layout 2-column instead of 4)

### Translation Keys
```typescript
home.collection = {
  heading: { ms: "Koleksi Pilihan Kami", en: "Our Signature Collection" },
  tabIndoor: { ms: "Dalam", en: "Indoor" },
  tabOutdoor: { ms: "Luar", en: "Outdoor" },
  readMore: { ms: "Baca Lanjut", en: "Read More" },
  viewAll: { ms: "Lihat semua produk", en: "View all products" }
}
```

---

## Section 1.3 — Kenapa Pilih AIHAA

**Reference:** Sudah ada di laman semasa, refine sahaja

### Layout
- Background: `#FFFDE7` (soft lemon — INI SAHAJA section dengan warna ini!)
- Padding: `5rem`

### Components
1. **Section heading:** "Kenapa Pilih **AIHAA**?" (hitam, "AIHAA" gold)
2. **Sub-tajuk:** "Penapis air berkualiti tinggi dengan kelebihan dan servis tiada tandingan"
3. **Grid 4 cards (desktop), 2x2 (mobile):**
   - Background card: putih (`#FFFFFF`)
   - Border: 0.5px solid soft gold
   - Padding: `1.5rem`
   - Top: Icon gold (24x24px) di tengah
   - Sebelah icon: Badge label kecil (e.g. "Dari RM399", "Semenanjung MY", "2 Tahun", "JAKIM") — background soft gold
   - Tajuk card (16px, weight 500)
   - Deskripsi pendek 2 ayat (kelabu, 13px)

### 4 Cards Content
1. **Sekali Bayar Tanpa Bulanan** — "Beli sekali, guna bertahun. Tiada komitmen bayaran bulanan." (Badge: "Dari RM399", Icon: $)
2. **Pemasangan Percuma** — "Penghantaran dan pemasangan percuma ke seluruh Semenanjung Malaysia." (Badge: "Semenanjung MY", Icon: kotak/parcel)
3. **Waranti Sehingga 2 Tahun** — "Setiap pembelian disertakan waranti sehingga 2 tahun." (Badge: "2 Tahun", Icon: spanar)
4. **Halal & Bumiputera Certified** — "Diperakui Halal oleh JAKIM dan syarikat bertaraf Bumiputera." (Badge: "JAKIM", Icon: halal symbol)

### Translation Keys
Sudah ada — extend dengan key baharu jika perlu.

---

## Section 1.4 — Feedback / Suara Pelanggan

**Reference:** Hijrah Water testimonial (PDF page 2)

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
1. **Eyebrow text:** "SUARA PELANGGAN" (gold, tracking `0.2em`, kecil)
2. **Section heading:** Tiada — direct masuk ke testimoni (Hijrah style minimalist)
3. **Layout zigzag:** 
   - Quote 1: Align kiri, max-width 60% (gold left border 3px)
   - Quote 2: Align kanan, max-width 60%
   - Quote 3 (kalau ada): Align kiri lagi
4. **Setiap quote:**
   - Quote dalam font serif italic (style editorial, 22px)
   - Bawah quote: nama pelanggan (caps, 11px, kelabu) dot lokasi

### Initial Content (dari brainstorm)
1. **Quote 1 (kiri):**
   > *"Sebelum guna Aihaa, kami spend RM200 sebulan untuk air botol. Sekarang jimat lebih RM2,000 setahun! Yang paling penting, anak-anak tak sakit perut macam dulu."*
   > — **Encik Rizal Abdullah** · Shah Alam, Selangor

2. **Quote 2 (kanan):**
   > *"Saya compare 5 jenama sebelum pilih Aihaa. Harga paling transparent, servis paling responsive. Bila ada issue, team datang dalam masa 24 jam."*
   > — **Puan Farah** · Johor Bahru

### Translation Keys
```typescript
home.testimonials = {
  eyebrow: { ms: "SUARA PELANGGAN", en: "CUSTOMER VOICES" },
  quotes: [
    { quote: { ms: "...", en: "..." }, name: "Encik Rizal Abdullah", location: "Shah Alam, Selangor" },
    { quote: { ms: "...", en: "..." }, name: "Puan Farah", location: "Johor Bahru" }
  ]
}
```

---

# PAGE 2: PRODUK INDOOR

## Section 2.1 — Indoor Hero Lineup

**Reference:** AIHAA poster lineup (PDF page 2)

### Layout
- Background: `#0D0D0D`
- Padding: `5rem`
- Min-height: `70vh`

### Components
1. **Logo AIHAA gold kecil di tengah atas**
2. **Hero title:** "PENAPIS AIR AIHAA" (putih, 64px, weight 600, 3D effect via CSS shadow lembut)
3. **Lineup image:** Sama dengan home page — 9 produk atas pedestal cream
4. **Lineup labels** kecil di bawah setiap produk: EAN WHITE, EAN BLACK, BIG, EAN PINK, BELLA, EAN BEIGE, WINTER ICE, FANCY, ULTRA ONE
5. **Sub-tagline:** "Pilih dari 9 model penapis air dalam yang sesuai untuk setiap keluarga"
6. **CTA scroll indicator:** Arrow ke bawah → bawa user ke Section 2.2

---

## Section 2.2 — Product Grid (Hijrah Style)

**Reference:** Hijrah Water grid (PDF page 3)

### Layout
- Background: warna lembut yang complement, e.g. `#1F1F1F` (hitam lembut) atau `#F5F1E8` (ivory) — pilih yang tak clash dengan hero
- Padding: `5rem`

### Components
- **Section heading:** "Senarai Penuh Penapis Air Dalam" (font weight 500, 32px)
- **Sub-tajuk:** "Klik produk untuk maklumat lebih terperinci"
- **Grid 3 kolum (desktop), 2 kolum (tablet), 1 kolum (mobile):**
  - Setiap card: padding `2rem`, no shadow, transparent atau soft background
  - Tengah: Gambar produk besar (height ~320px, object-fit contain)
  - Bawah: Nama produk (caps, weight 500, tracking wide)
  - Below name: Button outline kecil "EXPLORE MORE →" (border gold, text gold, transparent bg)
- **Hover state:** Lift up `translateY(-4px)` + button background fill gold

### Data Wiring
9 produk dari `data/products/indoor.ts` — slug → name → mainImage → link `/produk-dalam/[slug]`

---

# PRODUK DETAIL TEMPLATE (untuk semua 9 indoor + 2 outdoor)

## Section D.1 — Hero Banner Produk Individu

**Reference:** Hijrah SYAA Premium (PDF page 3)

### Layout
- Background: gradient atau solid colour yang sesuai dengan personality produk (boleh override per-product dalam data)
- Default kalau tak set: `#0D0D0D` dengan accent gold
- Padding: `5rem`
- Min-height: `80vh`

### Components
1. **Layout split 50/50:**
   - **Kiri:**
     - Eyebrow text: "WATER PURIFIER" (gold tracking)
     - Nama produk besar: e.g. "EAN WHITE" (putih, 72px, weight 600)
     - Sub-line: "Penapis air desktop terkini" (16px)
   - **Kanan:**
     - Gambar produk besar (latar telus), boleh ada visual prop (e.g. tangan model menyentuh)
2. **Strip bawah (full-width):**
   - 3 tag features dalam pill ("Versatile" / "Convenient" / "Innovative")
   - Tagline: "The one and only EAN WHITE"

---

## Section D.2 — Kitchen Context Split

**Reference:** Wells kitchen (PDF page 4)

### Layout
- Background: `#FFFFFF`
- Padding: `0` (gambar full-bleed)

### Components
- **Grid 2 kolum equal:**
  - Kiri: "Modern Kitchen" — gambar produk dalam dapur biru moden (label kecil top-left)
  - Kanan: "Industrial Kitchen" — gambar produk dalam dapur konkrit dengan coffee machine
- **Tagline strip di bawah:** "Compact To All Type Kitchen" (tengah-aligned, 24px, weight 500)
- **Optional:** Satu lagi shot full-width below — produk dengan info card overlay (lifestyle hero)

---

## Section D.3 — Capacity Air (Functionalities)

**Reference:** Wells Functionalities (PDF page 4)

### Layout
- Background: `#F5F5F3` (kelabu sangat pucat)
- Padding: `5rem`

### Components
1. **Section heading:** "Functionalities, Perfectly Suited to Your Lifestyle" (24px, weight 500)
2. **Sub-tajuk:** "Suhu yang sesuai untuk setiap keperluan keluarga anda"
3. **Grid 5 ikon (desktop), 3+2 (mobile):**
   - Setiap ikon: Bulat 80x80px dengan background `#1A1A1A`, badge suhu warna (top-right)
   - Bawah ikon: Nama (e.g. "Coffee", "Tea", "Baby Milk", "Cold Water", "Ambient Water")
   - Below nama: Deskripsi 1 ayat (kelabu, 12px)

### Data Wiring
Produk yang ada hot/cold akan render 5 ikon. Produk ambient-only render 1-2 ikon sahaja. Define dalam `data/products/indoor.ts` per produk.

---

## Section D.4 — Features Overview

**Reference:** Hijrah Features (PDF page 5)

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
1. **Section heading:** "Features Overview" (gold accent, 28px)
2. **Grid 3 kolum × 2 baris (6 kotak gambar feature):**
   - Setiap kotak: Gambar zoom dekat pada part tertentu produk
   - Bawah gambar: Caption pendek (e.g. "Hot Water Safety Child Lock")
3. **Hover:** Cuma sedikit overlay gold lembut

---

## Section D.5 — Filter Visualization

**Reference:** Filter horizontal (PDF page 5)

### Layout
- Background: `#FFFFFF` atau lembut
- Padding: `5rem`

### Components
- **Section heading kecil:** "Filter Penapis Air Dalam" (centered, 18px)
- **Visual horizontal:** 4 cartridge filter berderetan, dengan air berwarna mengalir antara satu sama lain
- Setiap cartridge:
  - Cartridge image isolated
  - Nama bawah (e.g. "Sediment Filter")
  - Caption pendek 1 ayat fungsi

### Reusable
Component ini SAMA dengan yang akan diguna di Service Page Section 2. Build sekali di `app/components/shared/IndoorFilterRow.tsx`.

---

## Section D.6 — Spec & Price (Background Gelap)

**Reference:** Hijrah Spec page (PDF page 5)

### Layout
- Background: `#0A0A0A` (paling gelap untuk contrast)
- Padding: `5rem`

### Components
- **Layout split 40/60:**
  - **Kiri (40%):** Drawing teknikal produk (gaya engineering blueprint, garisan putih atas hitam) dengan dimensi (W × D × H)
  - **Kanan (60%):**
    - Tajuk: "SPEC & PRICE" (putih, weight 500, 28px)
    - Sub: "Technical Specifications" (kelabu, 13px)
    - Jadual spec (table 2 column):
      - DIMENSION (W×D×H)
      - FILTRATION RATE (e.g. "35 L/H")
      - WEIGHT
      - WATER TANK CAPACITY (Hot/Ambient/Cold breakdown)
      - WATER TEMPERATURE (Hot range / Ambient range)
      - FILTER / STAGE (4 stages senarai)
      - POWER CONSUMPTION (Hot/Cold)
- **Bahagian harga di bawah jadual:**
  - "CASH PROMOTION:" — harga lama strikethrough → harga baharu BESAR (gold)
  - Badge: "GREEN TECHNOLOGY · Auto Cut Off Energy" (background gold, text hitam, kecil)
- **CTA:** "Tempah via WhatsApp →" (gold)

---

# PAGE 3: PRODUK OUTDOOR

## Section 3.1 — Sage Hero Lineup

**Reference:** Hijrah Outdoor (PDF page 6)

### Layout
- Background: `#B5C5A5` (sage green — hanya di sini!)
- Padding: `5rem`
- Min-height: `70vh`

### Components
1. **Hero title:** "Outdoor Filter" (putih, 64px, weight 600)
2. **Sub-italic:** "Your First Protector." (putih italic, 28px)
3. **Tagline kecil:** "Crafted to address dirty water problems effectively at an affordable cost"
4. **Lineup 2 produk side-by-side:**
   - RENN (silver gunmetal)
   - RENN S Series (silver chrome)
   - Setiap satu ada label nama + button "EXPLORE MORE"

---

# PRODUK DETAIL OUTDOOR (template berbeza dari indoor)

Sama struktur 6-section, tapi adapt content:

- **D.1 Hero:** background sage atau biru tua (laut/water theme)
- **D.2 Kegunaan:** GANTIKAN dengan **House Cross-Section** (illustration cutaway rumah dengan 6 use case: Cooking, Washing, Showering, Laundry, Personal Hygiene, Outdoor Usage)
- **D.3 Capacity:** GANTIKAN dengan **7 Layer Filtration Breakdown** (cross-section tabung dengan 7 lapisan berlabel: Anthracite, Zeolite Plus, KDF, Nano Silver Activated Carbon, Super Quick Sand, Fine Sand, Silica Sand)
- **D.4 Features:** GANTIKAN dengan **PVDF Ultrafiltration Membrane (Micron Funnel)** — visual funnel 100→10→1→0.01 micron + close-up membrane
- **D.5 Lifestyle Grid:** 6 photo grid features (top valve, in kitchen, in garden, bottom valve, internal mechanism, cap)
- **D.6 Spec & Price:** Sama dengan indoor template, tapi spec berbeza (DIMENSIONS, MATERIAL, WEIGHT, CONNECTIONS, FLECK TOP & BOTTOM DISTRIBUTOR)

---

# PAGE 4: SERVICE

## Section 4.1 — Heart Service Hero (Coway Style)

**Reference:** Coway Heart Service (PDF page 9)

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
1. **Logo "heart service" script** (atau text fallback dalam font script style, e.g. Pinyon Script):
   - "AIHAA Care" atau guna terminology AIHAA — JANGAN copy verbatim "Coway"
2. **Tagline kecil:** "Salah satu sebab keluarga Malaysia memilih AIHAA"
3. **Section heading uppercase:** "EXCEPTIONAL SERVICE, PREMIUM EXPERIENCE"
4. **Sub-heading kecil:** "Heart Winning Excellence" — TUKAR ke "Khidmat Sepenuh Hati" (BM)
5. **Grid 4 kolum (mobile: 2x2):**
   - Tajuk pillar (warna gold accent, 18px, weight 500): **PANTAS** (Speedy)
   - Deskripsi 3-4 ayat (kelabu, 13px)
   - Repeat untuk: **BERTAULIAH** (Expert), **MESRA** (Caring), **RESPONSIF** (Alert)

### Translation Keys
```typescript
service.heroPillars = {
  speedy: {
    title: { ms: "PANTAS", en: "SPEEDY" },
    desc: { ms: "Pantas dan menyeluruh — itulah reputasi juruteknik AIHAA. Setiap juruteknik menghargai masa anda dan menjalankan kerja dengan cekap.", en: "..." }
  },
  // ...
}
```

---

## Section 4.2 — Servis Penjagaan Header + Filter Showcase

### Components
1. **Logo AIHAA gold di tengah atas**
2. **Tajuk:** "SERVIS PENJAGAAN PENAPIS AIR AIHAA" (gold, 24px)
3. **Sub-tajuk 2-3 ayat:** "Penapis air AIHAA diselenggara setiap 6 bulan bagi memastikan prestasi sentiasa optimum. Juruteknik terlatih akan menukar penapis serta membersihkan bahagian dalaman dan luaran mesin..."
4. **Sub-tajuk kecil:** "Filter Penapis Air Dalam"
5. **Filter visual horizontal (REUSE component dari Product Detail D.5):** 4 cartridge berderet

---

## Section 4.3 — 13 Check Point Servis

### Layout
- Background: `#F5F5F3` (kelabu sangat pucat)
- Padding: `4rem`

### Components
- **Section heading:** "13 TITIK PEMERIKSAAN SERVIS" (caps tracking, 18px)
- **Layout split 50/50:**
  - **Kiri:** 2 kolum senarai bernombor (1-9 dan 10-13), font 14px
  - **Kanan:** Gambar produk penapis air dengan circles/leader lines pointing ke 13 part

### 13 Items
1. Adapter
2. Powerpoint
3. Top Cover
4. Water Tank
5. Connector
6. Tubing
7. Faucet
8. Bottom Cover
9. Tray
10. Child Lock Safety Button
11. Filter
12. Servis Sticker
13. Cold/Hot Switch

---

## Section 4.4 — 8 Step Servis Gallery

### Layout
- Background: `#FFFFFF`
- Padding: `4rem`

### Components
- **Section heading:** "8 LANGKAH SERVIS" (caps tracking)
- **Grid 4 × 2 (mobile: 2 × 4):**
  - Setiap kotak: Aspect ratio 1:1 atau 4:3
  - Background: `#2D5F4A` (forest green — placeholder color)
  - Center text: nombor + nama langkah (putih, weight 500)
  - Hover: scale up sedikit

### 8 Steps
1. Suis Off
2. Check Panas Sejuk
3. Drain Water
4. Cuci Tangki
5. Tukar Filter
6. Flushing Filter Baru
7. Lap Body Mesin
8. Update Sticker Servis

**Nota:** Bila gambar/video sebenar dah ada, gantikan kotak hijau dengan media. Sehingga itu, kotak hijau dengan teks placeholder OK.

---

## Section 4.5 — Harga Servis Filter

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
- **Section heading:** "HARGA SERVIS FILTER" (centered)
- **2 cards side-by-side (mobile: stack):**

**Card 1 (AIHAA):**
- Pill badge: "Servis Filter (Jenama AIHAA)"
- Harga BESAR: "RM 160" (gold, 64px, weight 600)
- Bawah harga: Gambar lineup (2 produk AIHAA + 4 cartridge filter + 2 produk lagi) — collage style

**Card 2 (Jenama Lain):**
- Pill badge: "Servis Filter (Jenama Lain)"
- Harga BESAR: "RM 260" (gold)
- Bawah: Gambar serupa tapi guna produk jenama lain (Coway/Cuckoo style)

**Footer:**
- Nota kecil: "Harga termasuk gantian filter dan upah pemasangan"
- CTA: "Tempah Servis via WhatsApp →"

---

## Section 4.6 — Pasir Penapis Air Luar (Outdoor Service)

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
- **Logo AIHAA gold di tengah** (sama dengan section 4.2)
- **Tajuk:** "SERVIS PENJAGAAN PENAPIS AIR AIHAA" (sama, kekal konsisten)
- **Sub-tajuk:** "Pasir Penapis Air Luar"
- **Grid 3 × 2 (6 jenis pasir):**
  - Setiap pasir: Photo tumpukan kecil (style laboratorium product), label nama bawah
  - **Top row:** METAL EARSE, ACTIVE CARBON, ZEOLITE
  - **Bottom row:** FINE SILICA, MEDIUM SILICA, COARSE SILICA

---

## Section 4.7 — 5 Check Point Servis (Outdoor)

### Layout
- Background: `#F5F5F3`
- Padding: `4rem`

### Components
- **Section heading:** "5 TITIK PEMERIKSAAN" (caps)
- **Layout split:**
  - **Kiri:** Senarai 5 check point dengan ikon pen/clipboard kecil:
    1. Sumber Air
    2. Kualiti Body
    3. Kebersihan Produk
    4. Performance Filter
    5. Leakage Test
  - **Kanan:** Illustration juruteknik berlutut dengan tabung outdoor filter (atau placeholder tetap warna sepadan)

---

## Section 4.8 — Harga Servis Tukar Pasir

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
- **Section heading:** "HARGA SERVIS TUKAR PASIR"
- **2 cards side-by-side (mobile: stack):**

**Card 1 (5 Lapisan):**
- Pill badge: "5 Lapisan Pasir (Penggunaan Air Kerajaan)"
- Harga: "RM 250" (gold, 64px)
- Visual: Tabung outdoor dengan 5 lapisan pasir berlabel di sebelah

**Card 2 (6 Lapisan):**
- Pill badge: "6 Lapisan Pasir (Penggunaan Air Boring)"
- Harga: "RM 650" (gold, 64px)
- Visual: Tabung outdoor dengan 6 lapisan pasir berlabel

**Note:** Beza harga jelas (RM250 vs RM650) — tak perlu explain banyak, customer faham sendiri.

---

# PAGE 5: ABOUT US

## Section 5.1 — Kisah Kami (Sudah Ada)

**Reference:** Sudah ada di laman semasa — refine sahaja

### Layout
- Background: gambar pengasas (foto besar, latar belakang office)
- Overlay: gradient gelap dari kanan ke kiri supaya text di kanan readable

### Components
1. **Layout split:**
   - **Kiri:** Gambar pengasas (full-height, object-cover)
   - **Kanan:** 
     - Eyebrow: "KISAH KAMI" (gold)
     - Quote mark dekoratif (gold, 64px)
     - Quote dari pengasas (font serif italic, 22px, putih):
       > *"Pada 2018, saya perasan ramai keluarga Malaysia menghadapi masalah yang sama — harga penapis air terlalu mahal dengan kontrak yang membebankan. Anak-anak saya sendiri pernah mengalami masalah kesihatan akibat kualiti air yang kurang baik. Dari situlah idea Aihaa lahir."*
     - Credit: "Pengasas AIHAA · 12+ tahun dalam industri penapis air" (kecil, gold)
2. **Footer timeline horizontal:** 2018 · 2020 · 2023 · 2025 (milestones text)

---

## Section 5.2 — Halal Commitment (Hijrah Style)

**Reference:** Hijrah Halal Policy (PDF page 13)

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`
- Tengah-aligned everything

### Components
1. **Section heading:** "OUR HALAL COMMITMENT" (caps, weight 500, 32px)
2. **Sub-italic tagline:** "Kepercayaan Anda, Janji Kami" (italic serif, 18px)
3. **Halal logo bulat besar (centered)**
4. **Sijil number:** "MS 1500" (besar, weight 600)
5. **Reference:** "6 126-03 / 2014" (kecil, kelabu)
6. **Perenggan komitmen (max-width 600px):**
   "Di AIHAA, kami sangat komited untuk memastikan bukan sahaja produk kami memenuhi standard Halal, tetapi perjalanan perniagaan kami juga patuh-Syariah. Setiap produk diperakui Halal oleh Jabatan Kemajuan Islam Malaysia (JAKIM)..."
7. **Sub-section:** "HALAL INTEGRITY CHECKPOINTS" — listing point compliance (TBD bila Azri ada data)

---

## Section 5.3 — Video Collaboration Azlee

### Layout
- Background: `#0D0D0D` (gelap untuk video pop)
- Padding: `5rem`

### Components
1. **Eyebrow:** "BRAND COLLABORATION" (gold tracking)
2. **Section heading:** "AIHAA × Azlee" (putih, 36px)
3. **Sub-tajuk:** "Bersama Azlee dalam misi membawa air bersih ke setiap rumah"
4. **Video embed:** YouTube embed atau autoplay muted (16:9 ratio)
5. **Below video:** Quote pendek dari Azlee (italic, kelabu)

**Status:** Placeholder OK kalau video belum ada — guna gambar Azlee + "Video coming soon"

---

## Section 5.4 — Gambar dengan Team

### Layout
- Background: `#FFFFFF`
- Padding: `5rem`

### Components
1. **Eyebrow:** "PASUKAN KAMI"
2. **Section heading:** "Berkenalan Dengan Pasukan AIHAA"
3. **Group photo besar:** Full-width gambar team (16:9 atau 21:9)
4. **Sub-section optional:** Leadership grid (kalau Azri nak tambah CEO/COO/dll)

**Status:** Placeholder OK.

---

## Section 5.5 — Sumbangan / CSR

### Layout
- Background: `#F5F5F3`
- Padding: `5rem`

### Components
1. **Eyebrow:** "TANGGUNGJAWAB SOSIAL"
2. **Section heading:** "Aktiviti & Sumbangan AIHAA"
3. **Grid 3 kolum CSR cards:**
   - Setiap card: Gambar (16:9), tajuk aktiviti, tahun, deskripsi pendek
4. **Footer link:** "Lihat semua aktiviti →"

**Status:** Placeholder OK — minimum 3 cards untuk visual balance.

---

# Penutup

Dokumen ini ialah **source of truth** untuk fasa rebuild. Bila ada perselisihan antara apa Claude Code lokal nak buat dengan apa team graphic design lakar, **rujuk dokumen ini dulu** — bukan brainstorm PDF. Brainstorm PDF adalah inspirasi awal; dokumen ini adalah keputusan final.

Bila ada perubahan major mid-implementation:
1. Update dokumen ini DULU
2. Update version (1.0 → 1.1)
3. Tag commit baharu untuk track changes

**End of spec.**

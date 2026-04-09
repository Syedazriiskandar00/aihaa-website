# AIHAA Website — Lessons Learned

## How To Use This File
- READ THIS FILE FIRST before starting any work session
- After ANY correction from user, add a new lesson immediately
- Format: `[DATE] [CATEGORY] What happened → What to do instead`
- Categories: DESIGN, CODE, CONTENT, STRUCTURE, PERFORMANCE, GIT, WORKFLOW
- Review weekly and merge duplicate lessons

---

## Lessons Log

### [2025-XX-XX] WORKFLOW — Project generated via same.new
- Initial website generated using same.new AI tool
- Pushed to GitHub as starting point
- All placeholder images need replacement with real product photos
- Content needs rewriting with anti-AI rules from `rules/tone.md`
- Lesson: same.new gives a fast draft but EVERY element needs manual polish for international quality

### [2025-XX-XX] DESIGN — Placeholder images are gradient cards
- same.new generated gradient placeholder cards instead of real product images
- These MUST be replaced before any design review
- Lesson: Always prepare real assets before Phase 3.5 polish begins

---

## Common Patterns To Watch For

### AI-Generated Content Patterns (from rules/tone.md):
- Starting with "Selamat datang" or "Kami menyediakan"
- Using buzzwords: "inovatif", "komprehensif", "holistik"
- All sentences same length and structure
- Generic content that could apply to any brand

### AI-Generated Design Patterns (from rules/tone.md):
- All cards exactly same height and width
- Perfectly symmetrical layouts everywhere
- Same section pattern repeated throughout
- Every button looks identical

### Code Quality Patterns:
- Leaving console.log in commits
- Using `any` type in TypeScript
- Missing error handling on async operations
- Not testing responsive breakpoints

---

### [2026-04-07] DESIGN — Color scheme tukar dari dark navy ke modern contrast
- What happened: Owner rasa dark navy (#0A1628) terlalu gelap, tak selesa untuk browsing lama
- Why: Full dark theme nampak premium tapi susah baca, rasa berat, dan tak sesuai untuk product showcase
- What to do instead: Guna Modern Contrast theme — putih bersih (#FFFFFF) untuk content sections, hitam pekat (#0D0D0D) untuk hero/navbar/footer/CTA, emas segar gradient (#B8860B → #DAA520 → #F0D060). Alternating dark/light sections bagi breathing room.
- Rule: JANGAN buat full dark theme untuk e-commerce/product website. Guna dark sections untuk emphasis (hero, stats, CTA) dan light sections untuk browsing (products, benefits, contact).
- Files affected: Semua components, tailwind.config, globals.css

### [2026-04-07] CONTENT — Produk AIHAA sebenar berbeza dari Coway
- What happened: Website asal guna produk Coway sebagai placeholder (Neon, Neo Plus, Cinnamon, dll). Produk AIHAA sebenar adalah penapis air indoor dan outdoor dengan model sendiri.
- Key difference: AIHAA jual sekali bayar (one-time payment), BUKAN rental bulanan macam Coway. Ini USP utama AIHAA.
- Rule: JANGAN guna pricing model "RM__/bulan". AIHAA guna harga sekali bayar. Tagline AIHAA: "Sekali Bayar Tanpa Bulanan"
- Files affected: Product data, ProductCard, ProductsSection, product detail pages

### [2026-04-07] DESIGN — Dark sections perlu depth separation
- What happened: Cards hitam (#0D0D0D) di atas background hitam (#0D0D0D) nampak flat, tiada depth
- Rule: JANGAN guna same exact color untuk background dan cards. Cards mesti SELALU slightly lighter daripada background. Minimum difference 10-15 hex values.
- Rule: SEMUA cards dalam dark sections MESTI ada border (gold subtle atau white subtle)
- Rule: Tambah accent lines (gold top border atau left border) untuk premium feel dan visual separation

### [2026-04-09] DEPLOY — Final polish complete
- Navbar CTA button added (gold gradient, standout from nav links)
- 5 unused components deleted (BrandStory, CrossSell, Products, Stats, ClientBody)
- Console.logs: zero found
- Unused imports: cleaned via file deletion
- All 8 routes verified (build 9/9 pages)
- Build: zero errors, zero warnings
- Production ready at https://aihaa-website-five.vercel.app

### [2026-04-09] SEO — SEO + Performance optimization
- Rules:
  1. SETIAP page MESTI ada unique title dan description
  2. Sitemap.xml dan robots.txt WAJIB ada di public/
  3. Schema markup (JSON-LD) untuk LocalBusiness — helps Google understand business
  4. SEMUA images guna Next.js Image component — bukan raw img
  5. Alt text descriptive — bukan generic "image" atau "product"

### [2026-04-09] DESIGN — Contact page WhatsApp-first redesign
- What happened: Contact page had fake form (redirect to WhatsApp) and 4 same-size template cards
- Rules:
  1. Kalau business model WhatsApp-first, EMBRACE it. Jangan buat fake form.
  2. WhatsApp conversation mockup > contact form. Show visitor apa yang akan jadi.
  3. Info cards BUKAN sama saiz. Most important = biggest card.
  4. Real Google Maps embed atau link. JANGAN placeholder grey box.
  5. Trust badges (reply time, coverage, no spam) near CTA = boost confidence.

### [2026-04-09] FEATURE — i18n bilingual complete (6 parts)
- All 7 pages fully bilingual (BM/EN)
- 200+ translation keys
- Zero external dependencies — pure React Context + localStorage
- Language persists across navigation and refresh
- Rules:
  1. SEMUA visible text MESTI guna t.key — ZERO hardcoded strings
  2. Product names, phone numbers, emails — JANGAN translate
  3. Test KEDUA-DUA bahasa pada SETIAP page sebelum commit
  4. EN text mungkin lebih panjang — check layout tak pecah
  5. Kalau tambah content baru kemudian — WAJIB tambah translation key dulu

### [2026-04-08] FEATURE — i18n bilingual setup
- Approach: Client-side React Context, zero dependencies
- Files: translations.ts (all text), LanguageContext.tsx (provider + hook), LanguageSwitcher.tsx (UI)
- localStorage key: 'aihaa-lang'
- Default: 'bm'
- Rule: SEMUA visible text mesti ada key dalam translations.ts. JANGAN hardcode text dalam components.

### [2026-04-08] DESIGN — FAQ page GOD MODE
- Rules:
  1. FAQ page = conversation, bukan list. Design warm dan inviting.
  2. HIGHLIGHT soalan paling popular BESAR di atas — jangan sorok dalam accordion.
  3. JANGAN force kategori kalau tak natural. 10 soalan dalam satu list dah cukup clean.
  4. CTA blend dengan content — inline, bukan section berasingan.
  5. JANGAN add search untuk <20 items. Visual clutter tanpa benefit.
  6. Accordion: semua collapsed by default. SATU top question je visible.
  7. Left-aligned hero = berbeza dari pages lain. Every page patut ada unique layout trait.

### [2026-04-08] DESIGN — Promotions page v2
- Rules:
  1. JANGAN repeat same layout across pages. Kalau homepage guna 2-col, promotions guna centered.
  2. Promo utama = STATEMENT, bukan card. Full-width, centered, authoritative.
  3. Secondary promos = varied backgrounds (dark, white, yellow). Bukan 3 kotak sama.
  4. MAX 1 button per page. Selebihnya text links. Button = primary action sahaja.
  5. Countdown timer lebih dari 30 hari = zero urgency. Buang atau ganti text.
  6. T&C = footnote. 13px, muted, collapsed. Bukan main content.
  7. Jangan recycle social proof stats yang dah ada di 3 pages lain.

### [2026-04-08] DESIGN — Product page premium transformation
- Rules:
  1. SATU featured product besar sebelum grid — bagi first impression premium
  2. Cards ZERO buttons — seluruh card clickable. Buttons di detail page.
  3. Repetitive badges jadi noise — cakap sekali sahaja
  4. Beza-kan sections dengan background color, bukan just heading
  5. Lonely cards kena di-handle — tambah CTA card untuk fill
  6. Visual break antara major sections — breathing moment
  7. Benefits section TAK PERLU di product listing page — redundant dari homepage
  8. Nav max 6 items — group related items dalam dropdown
  9. Poster/flyer images perlu subtle overlay supaya kurang distract

### [2026-04-07] DESIGN — Cards generic sama saiz nampak template
- What happened: 4 brand story cards semua sama saiz dan shape, nampak macam AI-generated template
- Rule: JANGAN buat semua cards dalam satu section sama saiz. Guna bento/asymmetric grid.
- Rule: Setiap card perlu visual element unik — icon, pattern, atau accent yang berbeza
- Rule: Vary border-radius, backgrounds, dan accent styles antara cards

### [2026-04-07] DESIGN — Jangan duplicate CTA dalam satu section
- What happened: CTA section ada 2 WhatsApp buttons — satu di left, satu di right card
- Rule: Satu section, satu primary CTA sahaja. Jangan confuse user dengan multiple same-action buttons
- Rule: Guna gambar sebenar bila available, jangan guna placeholder icon

### [2026-04-07] DESIGN — Refined "Kenapa AIHAA" based on critical review
- What happened: First design attempt masih template-ish (5 sub-sections, over-prescribed pixels, fake comparison, unverified image)
- Rules:
  1. VERIFY images sebelum commit kepada design yang depend on image quality
  2. Max 3 sub-sections untuk satu storytelling section — lebih dari tu user hilang fokus
  3. Comparison MESTI honest — acknowledge 1-2 competitor strengths untuk credibility
  4. Jangan over-prescribe dalam prompts — bagi design direction, bukan pixel instructions
  5. Numbers yang di-display MESTI boleh didefend — tambah footnote/source kalau perlu
  6. Testimonials: vary EVERYTHING (size, alignment, styling) — sameness = AI tell
  7. Satu CTA per section sahaja

### [2026-04-07] DESIGN — Kritikan design 30 tahun pengalaman
- What happened: Website nampak macam AI buat. Semua section same pattern (cards). Gold terlalu banyak. Typography tiada hierarchy. Tiada gambar impactful. Takut whitespace.
- Rules yang dipelajari:
  1. JANGAN buat semua section pakai cards. Vary: full-bleed, text-only, timeline, stacked rows
  2. Gold HANYA untuk accent (max 10 gold elements per section). Bukan untuk semua benda
  3. Typography MESTI ada 3 saiz berbeza yang jelas: display, title, body
  4. 40% whitespace minimum. Premium brands berani biarkan ruang kosong
  5. SATU gambar besar lebih power dari 10 gambar kecil
  6. Setiap sub-section MESTI ada design yang COMPLETELY DIFFERENT dari yang lain
  7. CTA SATU sahaja per section. Jangan jerit dari 7 tempat berbeza
  8. Testimonials: vary saiz, alignment, dan styling. Bukan semua cards sama
- Apply rules ini untuk SEMUA section design going forward

### [2026-04-07] DESIGN — Animation rules untuk premium feel
- Rule: Semua scroll animations guna Intersection Observer, trigger sekali sahaja
- Rule: Guna HANYA transform + opacity untuk animations (GPU accelerated)
- Rule: Stagger children 0.1s untuk natural feel
- Rule: Always wrap dalam prefers-reduced-motion media query
- Rule: Jangan guna heavy animation libraries — CSS + vanilla JS cukup
- Rule: Animations mesti subtle dan purposeful, bukan decorative

### [2026-04-08] DESIGN — Production review found 6 critical issues
- What happened: Yellow tone configured but never applied. Placeholder text in production. English in BM page. Wrong phone number. Stale copyright. Too many CTAs.
- Rules:
  1. SETIAP warna yang ditambah dalam config MESTI digunakan dalam sekurang-kurangnya 2 sections
  2. ZERO placeholder/coming soon text allowed in production. Ever.
  3. Kalau page 90% BM, 10% English tu MESTI ditukar. Consistency.
  4. Phone numbers: SATU source of truth. Define sekali, guna everywhere.
  5. Copyright year: ALWAYS dynamic. Hardcoded year = website nampak abandoned.
  6. Max 4 prominent CTA buttons per homepage. Lebih dari tu = desperation.

### [2026-04-08] DESIGN — Tambah yellow light sebagai brand identity tone
- What: Tukar grey surface (#F5F5F5) kepada soft lemon (#FFFDE7) sebagai AIHAA identity
- Why: Macam Coway ada biru cair, AIHAA ada kuning light — bagi brand recognition
- Rule: Yellow light HANYA untuk background sections. BUKAN untuk text, buttons, atau accents.
- Rule: Gold (#DAA520) kekal sebagai accent utama. Yellow light complement, bukan replace.

### [2026-04-07] DESIGN — Placeholder images mesti diganti awal
- What happened: Gradient placeholder masih ada walaupun gambar sebenar dah available
- Rule: Bila gambar sebenar dah ada dalam public/images, SEGERA ganti placeholder
- Rule: Scan folder untuk detect available images sebelum guna placeholder

### [2026-04-07] DESIGN — Impact strip items mesti sebaris
- Rule: Horizontal stat strips MESTI fit dalam satu baris pada desktop. Kalau tak muat, kurangkan items atau font-size.

### [2026-04-07] DESIGN — Guna CSS gradient bukan image file
- Rule: JANGAN download/save gradient images. CSS linear-gradient boleh buat semua jenis gradient tanpa file tambahan.
- Rule: CSS gradients lebih ringan, scalable, dan tak ada watermark.

### [2026-04-07] DESIGN — 7 fixes untuk international standard
- Rule: Homepage MESTI ada gambar produk — even placeholder lebih baik dari abstract gradient
- Rule: JANGAN letak cart icon kalau bukan e-commerce. Match CTA dengan business model (WhatsApp)
- Rule: JANGAN copy promotional text dari template/reference website
- Rule: Footer MESTI ada: navigation, contact, social media, SSM, copyright
- Rule: Certification badges perlu nampak macam actual stamps, bukan just text
- Rule: Floating buttons MESTI match brand color scheme
- Rule: Category sections MESTI ada product imagery

### [2026-04-07] DESIGN — Buang section redundant, jangan repeat data
- What happened: StatsSection dan WhyAihaaSection impact strip paparkan data hampir sama (10,000+ vs 10,800+, Semenanjung, etc). Redundant.
- Rule: JANGAN ada 2 sections yang cakap benda sama. Pilih satu yang lebih kuat, buang yang lain.
- Rule: Kalau data tak cukup untuk isi satu section penuh (contoh "SM" dan "HALAL%" bukan numbers), jangan paksa. Kurang tapi kuat lebih baik dari banyak tapi lemah.
- Rule: Elak zebra pattern (hitam-putih-hitam). Gabungkan sections yang sama background color.

### [2026-04-07] CODE — Internal Server Error berulang kali
- What happened: Setiap kali buat perubahan besar, website crash dengan "Internal Server Error"
- Root cause: .next cache folder corrupt — ENOENT errors pada _buildManifest.js.tmp dan app-build-manifest.json. Disebabkan multiple dev servers running serentak pada ports berbeza, semua menulis ke .next folder yang sama dan corrupt satu sama lain.
- Fix: KILL semua ports dulu (npx kill-port 3000 3001 3002 3003), kemudian rm -rf .next, kemudian npm run dev
- Rule: SEBELUM start dev server, WAJIB kill semua port dan delete .next folder
- Rule: SELEPAS setiap perubahan code, WAJIB run npm run build SEBELUM declare "done"
- Rule: Jangan buat semua fixes sekaligus. Buat SATU, test, confirm okay, baru buat seterusnya.
- Rule: Kalau ada TypeScript error, fix SEGERA sebelum proceed ke fix seterusnya
- Rule: Check browser localhost:3000 selepas SETIAP fix, bukan selepas semua siap
- Rule: JANGAN biarkan multiple dev servers running serentak — satu sahaja pada satu masa

---

## Template For New Lessons
```
### [DATE] CATEGORY — Short title
- What happened: [describe the mistake]
- Why it happened: [root cause]
- What to do instead: [the correct approach]
- Files affected: [which files to watch]
```

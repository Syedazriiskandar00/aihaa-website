# AUDIT KESEDIAAN POLISI SYARIKAT — 2026-08-24

**Soalan:** Selamat tak untuk letak polisi syarikat atas website ini, dan polisi tu masuk fail mana?

**Verdict:** ✅ **Selamat dari segi teknikal** — build hijau, types bersih, penambahan halaman adalah aditif dan berisiko rendah.
🟠 **BELUM selamat dari segi isi kandungan** — polisi yang ditulis untuk keadaan tapak hari ini akan buat **dakwaan palsu** tentang data pihak ketiga melainkan 3 blocker di bawah diselesaikan dahulu.

Bahaya sebenar bukan pada kod. Bahaya ialah menerbitkan dokumen undang-undang di bawah nombor SSM syarikat yang menyatakan perkara yang tidak benar.

---

## 1. Kaedah & bukti

| Semakan | Arahan sebenar | Keputusan |
|---|---|---|
| Pemasangan deps | `npm ci --no-audit --no-fund` | ✅ exit 0 — 412 pakej, 7 min. Lockfile tidak berubah |
| Jenis (types) | `./node_modules/.bin/tsc --noEmit` | ✅ **exit 0 — sifar error** |
| Lint | `./node_modules/.bin/biome check src` | ⚠️ exit 1 — **150 error** (majoriti formatting, sedia ada) |
| Build produksi | `npm run build` | ✅ **exit 0** — 14 halaman static dijana |
| Kerentanan | `npm audit --omit=dev` | 🔴 **4 HIGH** |

Ditambah: pembacaan terus 30+ fail sumber, dan satu agen kritik bebas (29 tool call, konteks berasingan) yang mengesahkan semula setiap dakwaan terhadap repo.

**Nota kejujuran:** percubaan pertama workflow 8-agen dan kedua 12-agen sebahagian besarnya gagal dengan `API Error: 529 Overloaded` (isu server Anthropic). 6/7 agen tumbang pada larian kedua. Audit ini terhasil daripada pembacaan langsung + 1 agen kritik yang berjaya — bukan daripada 12 agen seperti dirancang. Tiada penemuan di bawah yang bergantung pada agen yang gagal.

---

## 2. TIGA BLOCKER sebelum polisi boleh diterbitkan

### 🔴 BLOCKER 1 — Chatbot hantar data pelanggan ke OpenAI (Amerika Syarikat), tanpa sebarang pendedahan

`src/app/api/chat/route.ts:28` — `const MODEL = "gpt-4o-mini"`
`src/app/api/chat/route.ts:35-41` — setiap mesej teks bebas pelawat dihantar ke OpenAI.
`src/lib/chatbot/tools.ts:15-21` — LLM cabut `state` ("Negeri customer") dan `customerSummary`.
`src/lib/chatbot/tools.ts:43` — dan `customerName` ("Nama customer kalau ada").

`src/components/Chatbot.tsx:281-296` — kotak input dengan `placeholder="Taip mesej..."`. **Tiada notis, tiada consent, tiada link privasi** sebelum mesej pertama keluar dari browser.

Implikasi PDPA 2010 (Akta 709): ini pemindahan data peribadi merentas sempadan. Ayat template biasa seperti *"data anda tidak dikongsi dengan pihak ketiga"* atau *"kami tidak mengumpul nama atau lokasi anda"* akan menjadi **PALSU**.

### 🔴 BLOCKER 2 — Percanggahan waranti masih hidup di produksi

`docs/audit/UIUX_AUDIT_2026-07-04_MASTER.md:70` dan `:180` — banner produk luar menjerit **"10 YEARS WARRANTY BODY"** sementara kad HTML pada halaman yang sama papar **"Tempoh Waranti: 2 Tahun"**. Dikesan pada 5 halaman produk luar. Masih belum selesai.

`src/lib/i18n/translations.ts:695` pula kata waranti 2 tahun semua model, kecuali membran UF Double Backwash 10 tahun.

Menerbitkan polisi waranti bertulis sekarang **memburukkan** percanggahan ini — ia menjadikan angka yang bercanggah itu satu janji rasmi bertulis. Sahkan polisi waranti sebenar dengan Azri dahulu.

### 🔴 BLOCKER 3 — Tiada alamat surat-menyurat

Satu-satunya alamat di seluruh repo ialah "Batu Pahat, Johor" (`src/app/layout.tsx:44-46`, `src/app/contact/page.tsx:173`). **Tiada alamat jalan penuh, tiada poskod.** Saluran hubungan rasmi pula hanya `aihaa.marketing@gmail.com`.

Notis PDPA lazimnya perlukan alamat surat-menyurat sebenar untuk permintaan akses/pembetulan data. Menamakan "Data Protection Officer" pula bermakna mencipta jawatan yang tiada bukti kewujudannya.

---

## 3. Apa yang polisi BOLEH dan TAK BOLEH dakwa

Disahkan daripada kod, bukan andaian.

| Dakwaan | Status | Bukti |
|---|---|---|
| "Kami tidak guna cookie" | ✅ **BENAR** | Sifar `document.cookie`. `localStorage` (`aihaa-lang`) mati di belakang `ENABLE_LOCALE_PERSISTENCE = false` — `LanguageContext.tsx:23` |
| "Tiada Google Analytics / Meta Pixel" | ✅ **BENAR** | Sifar hit untuk gtag/GTM/fbq/hotjar/clarity di seluruh `src/` |
| "Kami tidak simpan rekod sembang" | ✅ **BENAR untuk AIHAA** | Tiada persistence dalam `api/chat/route.ts`; `Chatbot.tsx:104` — *"No persistence by design"* |
| "Sistem rotasi tidak simpan data peribadi" | ✅ **BENAR** | KV simpan kaunter integer sahaja — `sales-team.ts:28`, `api/wa/product/route.ts:49` |
| "Gambar dihidang dari domain kami sendiri" | ✅ **BENAR** | Sifar rujukan unsplash/same-assets dalam `src/` (allowlist `next.config.js:6-11` sudah mati) |
| "Tiada borang mengumpul data" | ✅ **BENAR** | Sifar `<form>`. Satu-satunya `<input>` dalam seluruh repo ialah `Chatbot.tsx:285` |
| "Data tidak dikongsi dengan pihak ketiga" | ❌ **PALSU** | OpenAI — `api/chat/route.ts:28,35-41` |
| "Kami tidak kumpul nama/lokasi anda" | ❌ **PALSU** | `tools.ts:15-21,43` |
| "Tiada penjejak pihak ketiga langsung" | ❌ **PALSU** | iframe Google Maps — `contact/page.tsx:180-181`; Google Fonts `@import` — `globals.css:1` |
| "Kami tidak kumpul apa-apa secara automatik" | ❌ **PALSU** | Vercel log IP + user-agent secara lalai |

**Penerima data sebenar yang polisi kena namakan:** Vercel (hosting + log), OpenAI (chatbot), Upstash/Vercel KV (kaunter sahaja, tiada PII), WhatsApp/Meta (bila pelawat tekan CTA), Google (Fonts + Maps embed).

Bezakan dengan jelas: *AIHAA tidak menyimpan* ≠ *pembekal AI kami mungkin menyimpan*. Menggabungkan dua ayat ini adalah kesilapan klasik yang menjadikan polisi itu palsu.

---

## 4. Fakta syarikat — ada vs tiada

**Sudah ada, boleh terus pakai:**
- Entiti: `AIHAA Marketing Sdn Bhd` — `src/lib/config/site.ts:8`
- SSM: `1263314-X` — `src/components/Footer.tsx:54`
- Email: `aihaa.marketing@gmail.com` — `src/app/layout.tsx:41`
- Telefon/WhatsApp: `+60 11-5657 7084` — `src/lib/config/contact.ts:4-6`
- Domain kanonik: `https://aihaaofficial.com` — `site.ts:7`
- Waktu operasi: Isn-Jum 09:00-18:00, Sab 10:00-16:00 — `layout.tsx:49`

**Azri kena bekalkan:**
1. Alamat berdaftar penuh (jalan + poskod)
2. Email/saluran khusus permintaan data PDPA (elak guna gmail peribadi untuk ini)
3. Tempoh penyimpanan data (berapa lama lead WhatsApp disimpan)
4. Tarikh kuat kuasa polisi — **hardcode sebagai literal**, jangan sekali-kali `new Date()`
5. Kedudukan rasmi waranti (selesaikan percanggahan 2 vs 10 tahun)
6. Polisi bayaran balik / pemulangan — tiada langsung di mana-mana sekarang

---

## 5. JAWAPAN: polisi masuk fail mana

**Disahkan oleh Azri 2026-08-24:** polisi ialah **dokumen syarikat gabungan** (beberapa perkara dalam satu dokumen), dan **teks asal dibekalkan oleh syarikat dalam Bahasa Inggeris**. Pelan di bawah dibentuk untuk kes itu.

### Fail BARU untuk dicipta — DUA fail

**1. `src/lib/data/policy.ts`** ← **teks polisi awak masuk sini**

Dokumen gabungan = banyak seksyen bertajuk. Itu data berstruktur, bukan satu blok prose — jadi ia tergolong dalam `src/lib/data/`, sama macam `products.ts` dan `services.ts`. `CLAUDE.md` sendiri kata kandungan berstruktur hidup dalam modul data, jangan hardcode dalam komponen.

Bentuknya: array seksyen, setiap satu `{ id, title, body }`. `id` jadi anchor URL (`/polisi#privasi`), `title` jadi entri daftar kandungan yang dijana automatik. Satu sumber, page cuma map atasnya.

**2. `src/app/polisi/page.tsx`** ← halaman yang render modul di atas

- **Server component** dengan `export const metadata` inline. Preseden: `src/app/service/page.tsx:7`, `src/app/tentang-kami/page.tsx:13`.
- **JANGAN panggil `useLanguage()`** dalam fail ini. `LanguageContext.tsx:1` ialah `"use client"` — kalau page panggil `t.*`, ia jadi client component dan `export const metadata` akan **gagal build**.
- Import `Header`, `Footer`, `FloatingButtons` seperti setiap halaman lain.
- Guna class Tailwind manual (`text-[15px] text-[#555] leading-[1.8]` seperti `faq/page.tsx:59`) — `@tailwindcss/typography` **tidak dipasang** (`tailwind.config.ts:79`), jadi `prose` tidak wujud.
- Tarikh kuat kuasa: **literal hardcoded**. Jangan tiru corak `new Date()` di `Footer.tsx:135` — tarikh undang-undang akan tulis semula dirinya setiap kali redeploy.

**Kenapa BUKAN `src/lib/i18n/translations.ts`:** fail itu sudah 1,780 baris. `TranslationKeys` ialah type wajib, jadi setiap kunci baru mesti ditulis **dua kali** (`bm:` baris 563, `en:` baris 1171) atau tsc gagal. Prose panjang berperenggan dan bersenarai tak boleh hidup dalam string rata. Corak `promo_tnc_*` (`promotions/page.tsx:19-25`) memang wujud untuk teks legal — tapi ia untuk **lima klausa pendek**, bukan dokumen penuh.

### ⚠️ Isu bahasa yang perlu keputusan Azri

Teks asal dalam English, tetapi tapak ini **BM sahaja** dalam praktik (`Header.tsx:15` `SHOW_LANGUAGE_TOGGLE = false`).

`tasks/lessons.md` mengunci rule ini pada 2026-04-08: *"Kalau page 90% BM, 10% English tu MESTI ditukar. Consistency."* Audit Julai juga menyenaraikan teks English pada laman BM-sahaja sebagai masalah berulang.

Tiga pilihan, ikut turutan syor:
1. **Terjemah ke BM, terbitkan BM** — konsisten dengan tapak dan pelanggan Melayu. Simpan teks English asal dalam repo sebagai rujukan.
2. **Terbitkan BM + English berdampingan** dengan klausa *"sekiranya berlaku percanggahan, versi Bahasa Inggeris yang mengikat"* — amalan biasa Malaysia bila HQ bekalkan teks yang mengikat.
3. **English sahaja** — hanya kalau dokumen itu terikat dari segi undang-undang dan tak boleh diparafrasa langsung. Ini melanggar rule konsistensi bahasa; buat secara sedar, bukan terlepas pandang.

Keputusan ini kena dibuat sebelum menulis, sebab ia menentukan sama ada `policy.ts` simpan satu medan teks atau guna type `Bilingual` (`src/lib/data/products.ts:22-25`).

### Fail SEDIA ADA untuk diedit

| Fail | Perubahan | Anchor tepat |
|---|---|---|
| `src/components/Footer.tsx` | **Ganti** `<a href="#">` jadi `<Link href="/polisi#privasi">`. `Link` sudah diimport di baris 3. **Tiada kunci i18n baru diperlukan** — label `t.footer_privacy` ("Dasar Privasi") kekal tepat kerana ia menuding terus ke seksyen privasi dalam hub | baris **137-139** |
| `public/sitemap.xml` | Tambah satu `<url>` untuk `/polisi` (non-www, padan baris 3-23) | selepas baris **23**, sebelum `</urlset>` |
| `src/components/Chatbot.tsx` | Tambah notis satu baris di atas input, link ke `/polisi#privasi`, **sebelum** mesej pertama dihantar | atas baris **281** |

**Tidak perlu diubah:** `public/robots.txt` (3 baris, `Allow: /` — sudah betul). `Header.tsx:24-41` navItems — polisi tidak sepatutnya masuk nav utama.

### Kenapa nama route `/polisi`

Nama BM padan set route sedia ada: `produk-dalam`, `produk-luar`, `tentang-kami`, `galeri`. Satu hub dengan seksyen ber-anchor sesuai untuk dokumen gabungan, dan ia elak lima route separuh-isi.

Audit repo sendiri preskripsikan `/dasar-privasi` dua kali (`UIUX_AUDIT_2026-07-04_MASTER.md:73`, `:309`) — pautan mati itu dilaporkan oleh **5 auditor berasingan** (`:48`), isu top-10 #10, dan probe produksi sahkan `/privacy` = **404** (`:384`). Anchor `/polisi#privasi` memenuhi preskripsi itu sepenuhnya sambil menampung dokumen gabungan. Kalau kemudian seksyen privasi membesar, ia boleh dipecahkan jadi route sendiri tanpa memecahkan pautan footer.

---

## 6. Turutan langkah

1. Selesaikan 3 blocker (isi kandungan — bukan kod)
2. Buat branch baru. **Jangan** kerja atas `main`
3. Cipta `src/app/dasar-privasi/page.tsx`
4. Edit `Footer.tsx:137`, `public/sitemap.xml`, `Chatbot.tsx:281`
5. `npm run build` — mesti exit 0
6. `git add` **path-scoped sahaja**. Working tree sekarang ada ` M .claude/settings.local.json`, ` M package-lock.json`, `?? .claude/agents/`. Repo ada **dua lockfile** (`package-lock.json` + `bun.lock`) — commit lockfile tersasar boleh ubah apa yang Vercel resolve masa install
7. Preview deploy, Azri semak
8. **Merge ke main hanya selepas Azri bagi lampu hijau eksplisit** — push ke `main` auto-deploy, jadi commit+push = penerbitan

---

## 7. Isu lain dijumpai (bukan blocker polisi, tapi kena tahu)

| Keutamaan | Isu | Bukti |
|---|---|---|
| 🔴 P1 | `next@15.3.7` — npm sendiri tanda deprecated: *"This version has a security vulnerability"* | Amaran `npm ci` |
| 🔴 P1 | `postcss <=8.5.22` — 4 advisory HIGH (XSS, path traversal baca fail `.map`) | `npm audit` |
| 🔴 P1 | `sharp <0.35.0` — CVE libvips (CVE-2026-33327/33328/35590/35591) | `npm audit` |
| 🔴 P1 | `/api/chat` **tiada rate limit, tiada auth, tiada had panjang mesej** — sesiapa boleh spam, Azri bayar bil OpenAI | `api/chat/route.ts:30-43` |
| 🟠 P2 | **Zero security header** — tiada CSP, X-Frame-Options, Referrer-Policy | `next.config.js` |
| 🟠 P2 | `@vercel/kv@3.0.0` deprecated — Vercel KV dimatikan, pindah Upstash Redis. Sepadan dengan KV mati di prod | Amaran `npm ci` |
| 🟠 P2 | `"react-grab": "latest"` — dependency tak dipin, berubah setiap install | `package.json:23` |
| 🟠 P2 | Sitemap guna non-www tapi produksi redirect ke `www.` | `sitemap.xml:3-23` vs audit `:384` |
| 🟡 P3 | Teks "Dasar Privasi" sendiri gagal kontras WCAG AA (3.4:1) | audit `:315` |
| 🟡 P3 | `biome check` — 150 error, repo tak patuh config sendiri | `biome check src` |
| 🟡 P3 | `netlify.toml` wujud dalam repo yang deploy ke Vercel | fail root |
| 🟡 P3 | `src/app/product/[slug]/` — direktori kosong sebelah `[id]/` | `ls` |

---

*Dijana 2026-08-24. Semua nombor baris disahkan terhadap `main` pada tarikh tersebut.*

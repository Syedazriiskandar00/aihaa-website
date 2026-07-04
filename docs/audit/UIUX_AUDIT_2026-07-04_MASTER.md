# AUDIT PENUH UI/UX — AIHAAOFFICIAL.COM
**Tarikh:** 4 Julai 2026 · **Skop:** 22 halaman produksi + halaman 404, desktop 1440×900 / mobile 390×844 / spot-check tablet 768×1024 · **Branch kod rujukan:** `feat/home-improvement` · **Kaedah:** 6 auditor subagent (3 deep/Opus, 3 standard/Sonnet), 254 skrinsyot produksi + audit kod, setiap penemuan wajib ada bukti (skrinsyot atau file:line)

> **Mod audit:** READ-ONLY. Tiada satu pun fail sumber diubah, tiada commit, tiada push. Laporan ini cadangan sahaja — keputusan di tangan Azri.

---

## Ringkasan Eksekutif

Audit penuh 22 halaman produksi (desktop + mobile + spot-check tablet) berserta kod branch `feat/home-improvement` telah selesai dengan liputan 100% — setiap halaman disemak dalam kedua-dua viewport. Keadaan keseluruhan tapak adalah baik: sistem reka bentuk matang dan konsisten (cream hangat, emas berhemat, Playfair + Poppins), dengan homepage dan `/produk-dalam` sebagai halaman paling kukuh. Berita baik terbesar: syak utama "banner desktop 1600px dihidang ke mobile" **terbukti PALSU** — swap `<picture>` berfungsi di produksi dan payload imej mobile homepage hanya ~0.12MB. Masalah paling merugikan jualan ialah pada **semua 12 halaman detail produk: tiada harga dipaparkan dan tiada butang WhatsApp dalam kandungan halaman** — pembeli yang sudah berminat tiada laluan terus untuk bertindak. Terdapat **3 isu P0 KRITIKAL**: `/galeri` (halaman bukti sosial) memaparkan 5–7 kad kotak hitam, halaman 404 ialah fallback Next.js dalam English tanpa nav/CTA, dan `/service` memberi maklumat selang servis yang **salah** untuk penapis luar ("setiap 6 bulan" sedangkan nilai betul 2/3/5 tahun). Isu kepercayaan ketara turut hidup di produksi: label "TBD" dan blok kosong di `/tentang-kami`, percanggahan waranti "10 YEARS" vs "2 Tahun" pada halaman yang sama, 3 nombor WhatsApp berbeza, dan pautan "Dasar Privasi" yang mati. Dari sisi prestasi & aksesibiliti, `images.unoptimized: true` dalam `next.config.js` mematikan pengoptimuman imej seluruh tapak (fiber-9x42 ~899KB imej mobile), butang hamburger tiada aria-label, dan beberapa teks gagal kontras WCAG AA. Tema berulang yang perlu keputusan strategik: terlalu banyak kandungan penting (tajuk hero, spec, harga, waranti) di-bake dalam imej — halimunan kepada SEO dan pembaca skrin, tak boleh zoom oleh warga emas, dan sebahagiannya dalam English pada laman BM-sahaja. Jumlah penemuan: **67 isu unik** selepas gabung pendua (3 P0 · 16 P1 · 28 P2 · 20 P3) daripada 77 penemuan mentah. Sebahagian besar isu teratas boleh diselesaikan sebagai Quick Win bawah 1 jam setiap satu.

---

## Scoreboard

Skor daripada auditor pemilik halaman (skor sampel konsistensi SA-6 dicatat dalam seksyennya sendiri).

| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| `/` (Home) | 7.5 | 7 |
| `/produk-dalam` | 9 | 8 |
| `/product/aihaa-bella` | 7 | 7 |
| `/product/aihaa-big` | 7 | 6.5 |
| `/product/aihaa-ean` | 7 | 7 |
| `/product/aihaa-fancy` | 7.5 | 7 |
| `/product/aihaa-winter` | 7.5 | 7 |
| `/product/ultra-one` | 6.5 | 6.5 |
| `/produk-luar` | 8 | 7 |
| `/product/fiber-9x42` | 6 | 5 |
| `/product/fiber-10x44` | 6 | 5 |
| `/product/steel` | 6 | 5 |
| `/product/pvdf` | 6 | 5 |
| `/product/pvdf-plus` | 6 | 5 |
| `/product/uf-double-backwash` | 6 | 6 |
| `/service` | 6.5 | 6 |
| `/tentang-kami` | 6 | 5 |
| `/faq` | 8.5 | 8 |
| `/promotions` | 8 | 7.5 |
| `/galeri` | 5.5 | 5 |
| `/contact` | 7.5 | 7 |
| `/water-purifier` | 7.5 | 7 |
| Halaman 404 | 2 | 2 |

---

## Kiraan Isu

77 penemuan mentah daripada 6 auditor → **67 isu unik** selepas 10 pendua digabung (contoh: pautan "Dasar Privasi" mati dilaporkan oleh 5 auditor, dikira sekali).

| Severity | Jumlah | Maksud |
|---|---|---|
| **P0 KRITIKAL** | 3 | Rosak / blok terus conversion atau kepercayaan |
| **P1 MAJOR** | 16 | Jelas menjejaskan UX atau kepercayaan |
| **P2 MINOR** | 28 | Polish — spacing, kontras, konsistensi |
| **P3 CADANGAN** | 20 | Penambahbaikan elok-ada |
| **Jumlah** | **67** | |

---

## TOP 10 ISU (ranked: impak conversion × senang fix)

| # | Isu | Halaman | Bukti | Cadangan Fix | Effort |
|---|---|---|---|---|---|
| 1 | **Tiada butang WhatsApp dalam kandungan halaman produk** — laluan bertindak hanya chatbot FAB / ikon kecil header; `whatsappMessages.productInquiry` wujud dalam kod tapi TIDAK digunakan | Semua 12 `/product/*` | SA-2 & SA-3; `FloatingButtons.tsx:22-37`, `ProductServiceInfo.tsx:86-88` (teks "Sila WhatsApp kami" pun bukan pautan) | Tambah butang CTA WhatsApp emas selepas banner stack + dalam kad Info Servis, guna `whatsappUrl(productInquiry)` sedia ada | Quick Win |
| 2 | **Harga produk tidak dipaparkan di halaman produk** — banner "SPEC & PRICE" tiada angka RM; harga hanya di kad listing | Semua 12 `/product/*` | SA-2 & SA-3; banner baked tanpa RM + `product/[id]/page.tsx` tiada blok harga HTML | Papar harga dari `products.ts` sebagai teks HTML bersebelahan CTA WhatsApp (transparensi = USP AIHAA) | Sprint |
| 3 | **Maklumat servis SALAH di `/service`** — seksyen penapis luar tulis "diselenggara setiap 6 bulan"; nilai betul: Fiber/Steel 2 tahun, UF 3 tahun, PVDF/PVDF Plus 5 tahun | `/service` | SA-4 (P0); `service/page.tsx:128-142` | Betulkan perenggan seksyen luar kepada selang servis sebenar mengikut jenis penapis | Quick Win |
| 4 | **`/galeri` papar 5–7 kad kotak hitam** — halaman bukti sosial utama nampak rosak | `/galeri` | SA-5 (P0); `galeri--desktop-full.png` & `galeri--mobile-sec*.png` | Semak & ganti fail imej yang rosak/hitam; buang kad sehingga foto sebenar sedia | Quick Win → Sprint |
| 5 | **Halaman 404 = fallback Next.js generik** — English, tiada header/nav/footer, tiada CTA; jalan buntu penuh | Sitewide | SA-5 + SA-6 (P0); `404-test--*.png`; tiada `not-found.tsx` dalam `src/app/` | Bina `src/app/not-found.tsx` BM dengan header/footer + butang "Balik ke Laman Utama" + CTA WhatsApp | Quick Win |
| 6 | **Placeholder "TBD" & blok kosong LIVE di produksi** | `/tentang-kami` | SA-4; 3 kad CSR bertulis "TBD", blok "AIHAA × Azlee" & "Pasukan AIHAA" kosong | Sorok seksyen berkenaan sehingga kandungan sebenar sedia (patuh aturan placeholder projek) | Quick Win |
| 7 | **Percanggahan waranti pada halaman sama** — banner baked "10 YEARS WARRANTY BODY" vs kad HTML "Tempoh Waranti: 2 Tahun" | 5 halaman produk luar | SA-3; banner vs `services.ts`/`translations.ts:1046` | Sahkan polisi waranti sebenar dengan Azri, kemudian betulkan banner ATAU data servis | Sprint |
| 8 | **3 nombor WhatsApp berbeza serentak** — hero/header `601137208466` vs CTASection/footer `601129987890`/`60162773211`; boleh keliru pembeli & pecah routing lead | Home + footer sitewide | SA-1 + SA-5; `contact.ts:4` vs `CTASection.tsx:42,53,86` vs `Footer.tsx:28-29` | Selaraskan ke satu sumber `contact.ts`; jika nombor memang berbeza peranan, labelkan dengan jelas | Quick Win |
| 9 | **`images.unoptimized: true` matikan next/image seluruh tapak** — galeri/contact hantar .jpg mentah; fiber-9x42 ~899KB imej mobile | Sitewide (terburuk: `/galeri`, `/product/fiber-9x42`) | SA-6; `next.config.js:5` + manifest mobileImageBytes | Buang flag tersebut & uji di Vercel preview (Vercel sokong image optimization) | Quick Win |
| 10 | **"Dasar Privasi" pautan mati** — `href="#"` dan `/privacy` 404; isu kepercayaan + PDPA untuk tapak yang kutip lead | Footer semua halaman | 5 auditor; `Footer.tsx:137` + manifest probe `/privacy` = 404 | Bina halaman dasar privasi sebenar (cth `/dasar-privasi`) atau buang pautan sementara | Sprint |

**Menyusul rapat (11–13):** (11) Hero homepage — semua teks di-bake dalam imej, tiada `<h1>` sebenar → SEO/aksesibiliti (Sprint); (12) butang hamburger tiada `aria-label`/`aria-expanded` — navigasi utama 70% trafik (`Header.tsx:117-122`, Quick Win); (13) tema English-pada-laman-BM merentas banner baked + `translations.ts` blok `ms` ("Coffee", "Tea", "Baby Milk"...) (Projek kecil).


---

# PENEMUAN PENUH (6 seksyen auditor, verbatim)

## [SA-1] — HOME (`/`)

### Ringkasan
Halaman utama nampak kemas, premium dan konsisten dengan bahasa reka bentuk AIHAA (cream hangat, emas berhemat, Playfair + Poppins). Aliran seksyen logik: Hero → Koleksi Produk (Outdoor/Indoor) → Kenapa Pilih AIHAA → Suara Pelanggan → Hubungi Kami → Footer, dan CTA WhatsApp emas berada di atas fold pada mobile — bagus. Isu paling besar bersifat struktur, bukan visual: keseluruhan hero (tajuk, USP "Berhenti Sewa, Mula Miliki", sub-tajuk, dan 3 lencana kepercayaan) di-"bake" ke dalam satu imej raster, jadi tiada `<h1>` sebenar, tiada teks untuk SEO/pembaca skrin, dan teks tak boleh di-zoom oleh pengguna warga emas. Pautan footer "Dasar Privasi" pula mati (`href="#"`), dan tiada butang WhatsApp melekat (sticky) selepas hero — hanya bot sembang. Yang paling menggembirakan: swap imej mobile BERFUNGSI (payload mobile kecil 43KB/28KB/27KB — dakwaan "imej desktop dihantar ke mobile" adalah PALSU untuk home), dan salinan empati/perbandingan lawan sewa Coway/Cuckoo sangat kuat.

### Skor
| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| `/` (Home) | 7.5 | 7 |

### Penemuan
| # | Severity | View | Halaman & Lokasi | Isu | Bukti | Cadangan Fix |
|---|---|---|---|---|---|---|
| 1 | P1 | Both | Home / `HomeHero.tsx:19-32` | Seluruh hero (tajuk "Penapis Air Premium Halal JAKIM", USP "Berhenti Sewa, Mula Miliki", sub-tajuk, 3 lencana) di-bake dalam imej `hero-main*.jpg.webp`; tiada `<h1>` sebenar dan `alt="AIHAA Water Purifier"` (generik, English). Kesan: tiada heading H1 (heading pertama halaman jadi H2 di BenefitsSection → hierarki pecah), USP + isyarat Halal JAKIM halimunan kepada Google & pembaca skrin, teks tak boleh reflow/zoom untuk warga emas. | `HomeHero.tsx` (tiada teks tajuk dalam DOM, hanya label butang); `home--desktop-fold.png` & `state--home-mobile-chatbot-open.png` (tajuk jelas sebahagian imej) | Render tajuk/sub-tajuk/lencana sebagai teks HTML sebenar (`<h1>` + `<p>` + senarai lencana) bertindih atas foto; kekal foto sebagai latar dengan alt deskriptif BM. |
| 2 | P1 | Both | Home / `Footer.tsx:137` | Pautan footer "Dasar Privasi" ialah `href="#"` — mati, cuma lompat ke atas. Manifest juga sahkan `/privacy` = 404. Menjejaskan kepercayaan pada jenama yang jual "sekali bayar, selamanya milik". | `Footer.tsx:137`; manifest `probes./privacy` = 404 | Bina halaman dasar privasi sebenar (cth `/dasar-privasi`) atau buang pautan sehingga siap. |
| 3 | P2 | Both | Home / `FloatingButtons.tsx:22-37` | Tiada butang WhatsApp melekat (sticky FAB). Elemen kekal di kanan bawah ialah BOT SEMBANG, bukan pautan WhatsApp terus; scroll-to-top pula di kiri bawah selepas 400px. Untuk audiens warga emas 70% mobile dengan matlamat WhatsApp, tiada butang WhatsApp satu-tap yang sentiasa kelihatan selepas hero. | `FloatingButtons.tsx` (hanya `<Chatbot>` + scroll-top); `home--mobile-sec2..sec5.png` (hanya buih bot + anak panah) | Tambah FAB WhatsApp melekat (hijau/emas) yang sentiasa kelihatan pada mobile, berasingan daripada bot. |
| 4 | P2 | Both | Home / `SignatureCollection.tsx:14-45` | Seksyen koleksi produk ialah satu imej bake dengan hanya 2 zon klik halimunan (separuh atas → `/produk-luar`, separuh bawah → `/produk-dalam`). ~13 produk dipapar tapi tiada satu pun boleh diklik individu; lencana "OUTDOOR"/"INDOOR" nampak macam label, bukan butang — pengguna mungkin tak sedar ia interaktif. | `SignatureCollection.tsx` (dua `<Link>` bertindih separuh); manifest home hanya `product-collection-mobile.webp` (satu komposit, tiada kad per-produk) | Tambah butang jelas "Lihat Outdoor →" / "Lihat Indoor →", atau jadikan setiap produk pautan ke halaman produk masing-masing. |
| 5 | P2 | Both | Home / `contact.ts:4`, `CTASection.tsx:42-58` & `:86`, `Footer.tsx:27-30` | Tiga nombor WhatsApp berbeza pada satu halaman: hero + ikon header guna `601137208466`; senarai telefon CTASection + footer guna `601129987890` / `60162773211`. Dalam CTASection sendiri, nombor tersenarai berbeza daripada nombor butang "WhatsApp Kami". Boleh keliru pembeli & pecahkan routing lead. | `contact.ts:4` vs `CTASection.tsx:42,53,86` vs `Footer.tsx:28-29` | Selaraskan kepada satu sumber tunggal (`contact.ts`) atau jelaskan peranan setiap nombor; elak nombor bercanggah pada halaman sama. |
| 6 | P2 | Both | Home / `CTASection.tsx:121` | Lencana "Respon Pantas" guna teks putih atas latar emas (`bg-gold text-white`) — kontras ~2:1, bawah WCAG AA. Tak konsisten pula dengan butang WhatsApp hero yang betul (teks gelap atas emas). | `home--desktop-full.png` (lencana atas foto pakar jualan); `CTASection.tsx:121` | Tukar kepada `text-dark` atas emas untuk kontras & konsisten. |
| 7 | P3 | Both | Home / `translations.ts:588` | `benefits_4_title` = "Halal & Bumiputera **Certified**" — perkataan English pada laman BM sahaja (bahasa toggle OFF); `cert_title` juga "Certified & Trusted". Kurang mesra-rakyat. | `translations.ts:588`; `home--mobile-sec3.png` (kad "Halal & Bumiputera Certified") | Tukar kepada BM: cth "Diperakui Halal & Bertaraf Bumiputera". |
| 8 | P3 | Mobile | Home / `HomeHero.tsx:52` | CTA sekunder "Lihat Produk" ialah teks putih atas kaca `bg-black/30 backdrop-blur` — atas bahagian foto hero yang cerah, pil kelihatan pucat/kontras marginal. | `home--mobile-fold.png` (pil "Lihat Produk" nampak pudar) | Tebalkan latar pil (cth `bg-black/45`) atau border lebih tegas untuk kontras stabil merentas latar berubah. |
| 9 | P3 | Both | Home / `globals.css:226-231`, `BenefitsSection.tsx`/`CTASection.tsx` | Seksyen `.scroll-reveal` mula pada `opacity:0` dan bergantung pada JS IntersectionObserver. Tanpa reduced-motion, atas talian luar bandar yang perlahan, seksyen "Kenapa Pilih AIHAA" + CTA sekejap halimunan sehingga JS bertindak. (Laluan reduced-motion betul dikendalikan.) | `globals.css:226` (opacity:0 default), `:362-372` (reduced-motion OK) | Pertimbang render kandungan kelihatan secara lalai dengan reveal sebagai peningkatan progresif, atau fallback `<noscript>`. |
| 10 | P3 | Both | Home / `HomeTestimonials.tsx:15-28` | Hanya 2 testimoni, teks sahaja, tanpa foto/gambar bukti; pada desktop susun-atur zigzag tinggalkan banyak ruang kosong (nampak jarang). Bukti sosial boleh lebih kuat untuk audiens berhati-hati kos. | `home--desktop-full.png` (2 petikan berjauhan, ruang putih besar); `HomeTestimonials.tsx` | Tambah testimoni ke-3 + foto/lokasi/verifikasi bila review sebenar tiba; rapatkan rhythm desktop. |

### Apa Yang Dah Bagus (kekalkan, jangan usik)
- **Swap imej responsif hero BERFUNGSI** — `<picture><source media="(max-width:768px)">` sajikan `hero-main-mobile.jpg.webp` (43KB, disahkan manifest). Dakwaan "imej desktop 1600px dihantar ke mobile" adalah PALSU untuk home; semua payload mobile kecil & optimum (hero 43KB, collection 28KB, sales-expert 27KB).
- CTA WhatsApp utama (emas, teks gelap kontras tinggi) berada **di atas fold pada mobile** — satu-tap ke WhatsApp terus dari hero.
- Isyarat kepercayaan menonjol: lencana Halal JAKIM / Waranti 2 Tahun / Pemasangan Percuma di atas fold, No. SSM 1263314-X di footer, Bumiputera + JAKIM diulang di seksyen manfaat & footer.
- Salinan empati/perbandingan kuat lawan sewa bulanan ("Sebelum guna AIHAA, kami spend RM200 sebulan... jimat lebih RM2,000 setahun"; "compare 5 jenama... harga paling transparent") — tepat sasaran keluarga jimat.
- Header **statik** (bukan fixed — tiada bleed-through atas hero) dengan laci hamburger mobile bersih, sasaran sentuh lapang, tinggi di-cap + padding safe-area iOS.
- `prefers-reduced-motion` dihormati betul (`globals.css:362-372`: `opacity:1; transform:none; animation:none`) — kandungan dipaksa kelihatan.
- Token reka bentuk konsisten (cream/emas/gelap), Playfair (font-editorial) untuk tajuk + Poppins untuk badan, kad manfaat seragam.

---

## [SA-2] — Produk Indoor (/produk-dalam + 6 halaman produk dalam)

### Ringkasan
Skop indoor adalah antara yang paling kemas dari segi visual: templat produk premium yang konsisten merentas 6 model (Hero · Functionalities · Features · Filter Flow · Spec · Info Servis · Produk Berkaitan), fotografi dapur hangat berkualiti tinggi, dan halaman senarai /produk-dalam yang jelas dengan grid responsif dan CTA WhatsApp. Isu suspek #1 (banner mobile "orphan") TIDAK benar untuk indoor — manifest mengesahkan varian `-mobile.webp` (hero-banner-mobile, spec-price-mobile, dsb.) MEMANG disajikan pada produksi dan swap `<picture><source>` berfungsi betul. Masalah paling besar bersifat struktur & penukaran: harga produk sendiri LANGSUNG tidak dipaparkan pada 5 daripada 6 halaman produk (banner bertajuk "SPEC & PRICE" hanya senarai spec tanpa nilai RM), dan tiada butang CTA WhatsApp dalam badan halaman — satu-satunya laluan ke WhatsApp ialah chatbot/header. Hampir semua kandungan (spec, ciri, harga, deskripsi penapis dalam Bahasa Inggeris) dibaked dalam imej dengan alt text generik, melemahkan SEO, accessibility dan kejelasan untuk pengguna warga tua.

### Skor
| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| /produk-dalam | 9 | 8 |
| /product/aihaa-bella | 7 | 7 |
| /product/aihaa-big | 7 | 6.5 |
| /product/aihaa-ean | 7 | 7 |
| /product/aihaa-fancy | 7.5 | 7 |
| /product/aihaa-winter | 7.5 | 7 |
| /product/ultra-one | 6.5 | 6.5 |

### Penemuan
| # | Severity | View | Halaman & Lokasi | Isu | Bukti | Cadangan Fix |
|---|---|---|---|---|---|---|
| 1 | P1 | Both | bella, big, fancy, winter, ultra-one — banner "SPEC & PRICE" + badan halaman | Harga produk sendiri tidak dipapar di mana-mana pada halaman produk; banner bertajuk "SPEC & PRICE" tetapi hanya senarai spec tanpa nilai RM. Pembeli terpaksa buka chat atau scroll ke "Produk Berkaitan" yang tunjuk harga produk LAIN. Hanya EAN ada "Harga RM780". | prod-aihaa-bella/big/fancy/winter/ultra-one--desktop-full: banner "SPEC & PRICE" tiada baris harga; prod-aihaa-bella--mobile-sec4/sec5: bawah halaman terus ke Produk Berkaitan (RM780/RM999), harga BELLA RM1,080 tiada langsung | Tambah blok harga teks yang jelas (guna ProductSpecs/HTML) pada setiap halaman produk, berdekatan spec |
| 2 | P1 | Both | Semua /product/* indoor — badan halaman | Tiada butang CTA WhatsApp "Order" dalam badan halaman produk; laluan ke WhatsApp hanya melalui chatbot FAB / butang header. Fungsi `whatsappMessages.productInquiry` wujud tetapi tidak diwayar ke halaman produk | FloatingButtons.tsx:22-38 (hanya render Chatbot + scroll-top, tiada WA FAB); ProductBannerShowcase/ProductServiceInfo/RelatedProducts tiada import whatsappUrl; screenshot semua halaman produk | Tambah CTA/sticky "Order via WhatsApp" dengan mesej `productInquiry(product.name)` berdekatan harga |
| 3 | P2 | Both | Semua halaman produk — imej banner | Hampir semua kandungan (spec, ciri, harga, deskripsi) dibaked dalam imej dengan alt text generik hasil derive nama fail (cth "AIHAA BELLA — Spec Price", "— Filter Flow"). Screen reader & enjin carian tidak dapat baca spec/harga → lemah SEO & accessibility | ProductBannerShowcase.tsx:41-49 (deriveAltSegment) + :114 (alt) | Alt text deskriptif + sediakan jadual spec teks selari banner |
| 4 | P2 | Both | bella, big, ean, fancy, winter — imej filter-flow | Deskripsi 4 penapis dalam Bahasa Inggeris penuh ("Removes large particles...", "Helps reduce bacteria and harmful microorganisms") atas laman BM-sahaja untuk audiens warga tua/kampung | prod-aihaa-ean--mobile-sec3, prod-aihaa-fancy--mobile-sec3 (teks penapis semua BI) | Terjemah teks dalam imej filter-flow ke Bahasa Malaysia |
| 5 | P2 | Both | ultra-one — hero/banner + product-card-images.ts:67 | Percanggahan penjenamaan & kategori: katalog/kad guna "ULTRA ONE" tetapi hero/banner tulis "AIHAA ULTRA 1"/"ULTRA 1" (chip "SOB000i"); alt kad = "Penapis Air Luar All-in-One" ("Luar"=outdoor) walhal disenaraikan sebagai produk DALAM | prod-ultra-one--mobile-fold & --desktop-full ("AIHAA ULTRA 1"); products.ts:323 name "ULTRA ONE"; product-card-images.ts:67 alt "Penapis Air Luar" | Selaraskan satu nama rasmi & betulkan alt kepada "Dalam/Undersink" |
| 6 | P2 | Both | Semua halaman (footer) — Footer.tsx:137 | Pautan "Dasar Privasi" href="#" (mati) dan /privacy pulangkan 404. Muncul di semua halaman skop saya (SA-6 pegang verdict sitewide) | Footer.tsx:137 (`<a href="#">`); manifest probe /privacy = status 404 | Bina halaman /privacy atau buang pautan mati |
| 7 | P3 | Desktop | ean — banner filter-flow | Jurang ruang putih besar antara banner filter-flow (ekor putih memudar) dan seksyen Info Servis pada desktop | prod-aihaa-ean--desktop-full (ruang putih besar sebelum "Info Servis") | Trim whitespace ekor imej filter-flow / rapatkan seksyen |
| 8 | P3 | Both | bella — imej spec-price | Ejaan "Pastel Arcylic" (patut "Acrylic") dibaked dalam banner spec | prod-aihaa-bella--desktop-full (baris Material/Warna) — perlu shot crisp untuk sahkan ejaan | Betulkan ejaan dalam imej spec-price |
| 9 | P3 | Both | bella, big, ean, fancy, winter — imej filter-flow | Ejaan "unplesant" (patut "unpleasant") dibaked dalam banner filter-flow | prod-aihaa-ean--mobile-sec3 & prod-aihaa-fancy--mobile-sec3 (baris Pre-Carbon) | Betulkan ejaan dalam imej |
| 10 | P3 | Both | big — hero banner | Wordmark hero "AIHAA BIG" krim-atas-krim, kontras rendah (masih boleh dibaca kerana saiz besar + bayang) | prod-aihaa-big--mobile-fold | Tambah kontras/overlay pada wordmark hero |
| 11 | P3 | Both | ean — products.ts:203-207 | Data `variants` EAN hanya 3 (white/pink/beige) tetapi laman papar 4 warna termasuk BLACK; array variants tidak digunakan pada laman detail (data usang) | products.ts:203-207 vs prod-aihaa-ean--desktop-full ("AIHAA BLACK") | Kemas kini/buang array variants supaya selari |
| 12 | P3 | Mobile | produk-dalam — hero | CTA WhatsApp ("WhatsApp Pakar AIHAA") hanya di hujung grid; atas fold mobile tiada CTA WA (hanya ikon chat kecil di header) | produk-dalam--mobile-full (fold = tajuk + kad featured sahaja) | Pertimbang anchor/CTA WA lebih awal atau sticky pada mobile |

### Apa Yang Dah Bagus (kekalkan, jangan usik)
- Varian imej `-mobile.webp` MEMANG disajikan pada produksi untuk semua halaman produk indoor + /produk-dalam (manifest: hero-banner-mobile.webp, spec-price-mobile.webp, card-mobile.webp dll.); swap `<picture><source media="(max-width:768px)">` berfungsi — isu suspek "orphan mobile banner" tidak benar untuk indoor.
- Templat produk premium sangat konsisten merentas 6 produk; fotografi dapur hangat berkualiti tinggi dan seragam gaya.
- /produk-dalam kemas: hierarki jelas, pasangan featured EAN/WINTER, grid responsif (1/2/3 kolum), hover kad berfungsi lembut, CTA "WhatsApp Pakar AIHAA" hadir.
- Payload imej mobile sederhana (kebanyakan <110KB; terbesar bella use-cases 178KB) — prestasi baik untuk kepadatan visual yang tinggi.
- Isyarat amanah Halal JAKIM hadir atas banner hero (BIG, EAN, BELLA); harga + oldPrice coret dipapar jelas pada kad senarai & Produk Berkaitan.
- Teks banner ("SPEC & PRICE", tajuk seksyen, dimensi spec) besar dan mudah dibaca pada 390px — legibiliti banner BUKAN isu.

---

## [SA-3] — OUTDOOR (Produk Luar: /produk-luar + 6 halaman produk)

### Ringkasan
Bahagian outdoor secara visual kemas dan konsisten dari segi bahasa reka bentuk (cream, gold berhemah, Playfair/Poppins), dan /produk-luar sendiri ialah halaman terbaik dalam skop ini — harga jelas pada setiap kad, satu CTA WhatsApp yang jelas ("WhatsApp Pakar AIHAA"), dan hierarki featured pair (PVDF Plus + UF Double Backwash "PERLINDUNGAN PENUH") yang berfungsi elok. Namun 6 halaman produk luar berkongsi template "pure-banner pilot" yang mempunyai tiga masalah besar untuk penukaran (conversion): (1) harga produk sebenar TIDAK dipaparkan di mana-mana pada halaman detail — banner "SPEC & PRICE" tiada angka RM dan template tiada harga HTML; (2) tiada butang WhatsApp dalam kandungan halaman produk langsung (FloatingButtons hanya ada chatbot + scroll-to-top); dan (3) percanggahan waranti — banner baked menjerit "10 YEARS WARRANTY BODY" sementara kad servis HTML papar "2 Tahun" pada halaman yang sama. Berita baik: sangkaan "banner mobile orphaned" adalah SALAH — swap `<picture>` mobile berfungsi dan disahkan manifest; dan interval servis outdoor dalam kod adalah BETUL (Fiber/Steel 2 Tahun, UF 3 Tahun, PVDF/PVDF Plus 5 Tahun) tanpa sisa "setiap 6 bulan". Isu jenama "Super Pleated" dari brief tidak wujud di produksi — produksi konsisten memapar "AIHAA STEEL / STAINLESS STEEL".

### Skor
| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| /produk-luar | 8 | 7 |
| /product/fiber-9x42 | 6 | 5 |
| /product/fiber-10x44 | 6 | 5 |
| /product/steel | 6 | 5 |
| /product/pvdf | 6 | 5 |
| /product/pvdf-plus | 6 | 5 |
| /product/uf-double-backwash | 6 | 6 |

### Penemuan
| # | Severity | View | Halaman & Lokasi | Isu | Bukti | Cadangan Fix |
|---|---|---|---|---|---|---|
| 1 | P1 | Both | Semua 6 halaman /product/* outdoor — banner "SPEC & PRICE" + page.tsx L107-125 | Harga produk sebenar (RM399/469/650/799/899/1299) tidak dipapar di mana-mana pada halaman detail; template pilot render Banner+ServiceInfo+Related sahaja tanpa harga HTML | prod-steel/pvdf/uf/fiber-9x42/fiber-10x44/pvdf-plus--desktop-full: seksyen "SPEC & PRICE" senarai spek tanpa angka RM; prod-pvdf--mobile-sec5: hujung halaman hanya papar harga produk LAIN (RM469/RM650) | Tambah blok harga HTML (product.price) yang menonjol di hero atau atas ProductServiceInfo |
| 2 | P1 | Both | Semua halaman /product/* outdoor — FloatingButtons.tsx L22-37; ProductServiceInfo.tsx L86-88 | Tiada butang/pautan WhatsApp dalam kandungan halaman produk; disclaimer hanya teks "Sila WhatsApp kami" tanpa pautan; FAB hanya chatbot + scroll-top | FloatingButtons.tsx (hanya `<Chatbot/>` + scroll button); prod-steel--mobile-sec4 (Info Servis tanpa butang WA) | Tambah butang WhatsApp (`whatsappUrl`) dalam ProductServiceInfo + FAB WhatsApp tetap pada mobile |
| 3 | P1 | Both | /product/steel, /pvdf, /pvdf-plus, /fiber-9x42, /fiber-10x44 — banner waranti vs ProductServiceInfo | Percanggahan waranti: banner baked papar "10 YEARS WARRANTY BODY" tetapi kad "Tempoh Waranti" HTML papar "2 Tahun" pada halaman sama | prod-steel--desktop-full (banner "10 YEARS") + prod-steel--mobile-sec4 ("2 Tahun"); prod-pvdf/fiber-10x44/pvdf-plus--desktop-full sama; services.ts warranty_default → translations.ts L1046 "2 Tahun" vs products.ts L484 steel "10 Tahun" | Selaraskan warrantyKey outdoor supaya padan visual (10 tahun) atau buang dakwaan "10 years" dari banner |
| 4 | P2 | Mobile | Semua halaman /product/* outdoor — ProductServiceInfo | Satu-satunya harga HTML menonjol pada mobile ialah "HARGA SERVIS RM 250/490/590" — mudah dikelirukan sebagai harga produk oleh pembeli bajet | prod-steel--mobile-sec4 ("HARGA SERVIS RM 250" font besar) | Papar harga produk sebenar lebih menonjol + label harga servis dengan jelas |
| 5 | P2 | Both | /produk-luar hero & /product/pvdf-plus hero — imej mockup | Logo jenama pada render AI tertera "ΛΛHIΛ / AAHIA" bukan "AIHAA"; tak konsisten dgn kad Fiber ("AiHAA") & Steel ("AIHAA") | produk-luar--mobile-fold (PVDF PLUS "AAHIA"); prod-pvdf-plus--desktop-full & mobile-sec5 hero | Jana semula imej mockup dengan logo AIHAA yang betul & konsisten |
| 6 | P2 | Both | /product/pvdf — banner "SPEC & PRICE" | Kandungan baked tak tepat: produk "Material PVDF" (RM899) tapi banner Material/Warna="304 STAINLESS STEEL" & "500L TANK" (data: 5000L/jam) | prod-pvdf--desktop-full spec banner; products.ts L527-529 | Sahkan & betulkan imej spec PVDF (material & kadar aliran) |
| 7 | P2 | Both | Footer semua halaman — Footer.tsx L137 | Pautan "Dasar Privasi" `href="#"` (mati); /privacy pulangan 404 (chrome, milik SA-6) | Footer.tsx L137; manifest probes `/privacy` status 404 | Buang pautan atau hala ke halaman privasi sebenar |
| 8 | P2 | Both | Semua halaman /product/* — ProductBannerShowcase.tsx L112-118 | `<img>` tanpa width/height/aspect-ratio pada 6–8 banner lazy-load → risiko layout shift (CLS) semasa scroll | ProductBannerShowcase.tsx L112-118 (`w-full h-auto`, tiada dimensi) | Tetapkan aspect-ratio/dimensi intrinsik setiap banner untuk elak CLS |
| 9 | P2 | Mobile | Semua halaman /product/* outdoor — aset banner mobile | Berat imej mobile tinggi untuk pengguna bajet (bkn orphaned): fiber-9x42 filter-layers-mobile 238KB, pvdf hero 196KB + installation 199KB, fiber-10x44 hero 158KB | manifest mobileImageBytes (per halaman) | Mampat lagi banner mobile ke <120KB; swap mobile sendiri sudah betul |
| 10 | P3 | Both | /produk-luar — SageHeroLineup H1; translations.ts L900 | H1 "Outdoor Filter" (BI) pada laman BM-only, sedangkan eyebrow BM "PENAPIS AIR LUAR RUMAH" | produk-luar--desktop-full & mobile-fold; translations.ts L900 | Pertimbang heading BM (cth "Penapis Luar") untuk konsistensi bahasa |
| 11 | P3 | Mobile | /produk-luar — OutdoorUseCases.tsx L22 | `grid-cols-2` dengan 3 item → "Kilang" tersendiri di baris kedua (kiri), nampak tak seimbang | produk-luar--mobile-sec3; OutdoorUseCases.tsx L22 | Guna grid-cols-3 pada mobile atau pusatkan item terakhir |
| 12 | P3 | Both | /product/steel — naming | Brief sebut "Super Pleated" tetapi produksi konsisten papar "AIHAA STEEL / STAINLESS STEEL / 3rd Generation"; tiada "Super Pleated" di mana-mana (bukan pepijat, produksi & data selaras) | prod-steel--desktop-full ("FEATURE AIHAA STEEL", "3rd Generation STAINLESS STEEL"); products.ts L457 name "AIHAA STEEL" | Sahkan nama model rasmi dengan Azri; kod sudah selaras dengan produksi |

### Apa Yang Dah Bagus (kekalkan, jangan usik)
- Interval servis outdoor dalam kod adalah BETUL: Fiber/Steel "Setiap 2 Tahun", UF "Setiap 3 Tahun", PVDF/PVDF Plus "Setiap 5 Tahun" — tiada sisa "setiap 6 bulan" untuk outdoor (translations.ts L1049-1051; services.ts OUTDOOR_SERVICE_MAP).
- Swap imej mobile `<picture><source media="(max-width:768px)">` berfungsi (ProductBannerShowcase.tsx L106-110) dan disahkan manifest mobileImageBytes memaparkan `*-mobile.webp` — sangkaan "banner mobile orphaned / desktop dihidang ke mobile" adalah SALAH.
- /produk-luar: harga jelas pada setiap kad, satu CTA WhatsApp jelas ("WhatsApp Pakar AIHAA"), featured pair + badge "PERLINDUNGAN PENUH" render kemas; grid responsif betul (1/2/3 kolum, tablet 2-kolum elok).
- Isyarat kepercayaan HALAL JAKIM hadir dalam hero produk (uf--mobile-fold ada logo bulat JAKIM; label JAKIM.700-2/3/6 pada badan produk steel/fiber) + SSM & Bumiputera dalam footer.
- Harga servis tukar pasir 5 lapisan RM250 padan dengan rujukan pihak berkepentingan.

### Nota (perlu semak manual)
- Ketepatan penuh teks halus baked pada jadual "SPEC & PRICE" (micron/ukuran) pada 390px — perlu zum manual walaupun sec-shots menunjukkan ia masih boleh dibaca.

---

## [SA-4] - Service + Tentang Kami
### Ringkasan
Kedua-dua halaman kelihatan kemas dari segi reka bentuk (krim/emas/dark, Playfair + Poppins, grid responsif yang beralih dengan baik dari 1440px ke 390px) dan pricing yang dipaparkan di /service (RM160, RM260, RM250, RM650) adalah **tepat dan terkini** — ini mengesahkan bahawa isu "harga lapuk" yang disyaki TIDAK berlaku pada banner semasa, dan /service juga sudah betul menghantar imej banner mobile yang sebenar (bukan desktop diskalakan) melalui `<picture><source media>`. Namun terdapat satu isu KRITIKAL: banner "Pasir Penapis Air Luar" menyalin bulat-bulat perenggan seksyen dalam ("diselenggara setiap 6 bulan") untuk konteks LUAR, bercanggah terus dengan selang servis luar sebenar (2/3/5 tahun ikut jenis). /tentang-kami pula mempunyai storytelling & isyarat Halal/JAKIM yang kuat tetapi masih menunjukkan label "TBD" literal dan dua blok "akan dimuat naik" secara langsung di produksi, ditambah isu amanah — foto yang sama dipakai sebagai "Pengasas AIHAA" di sini dan "AIHAA Sales Expert" generik di halaman utama. Kedua-dua halaman juga tiada blok CTA WhatsApp khusus di penghujung kandungan, bergantung sepenuhnya pada chrome global.

### Skor
| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| /service | 6.5 | 6 |
| /tentang-kami | 6 | 5 |

### Penemuan
| # | Severity | View | Halaman & Lokasi | Isu | Bukti | Cadangan Fix |
|---|---|---|---|---|---|---|
| 1 | P0 | Both | /service — banner "Pasir Penapis Air Luar" (seksyen luar) | Perenggan "Penapis air AIHAA diselenggara setiap 6 bulan..." dari seksyen DALAM disalin bulat-bulat untuk seksyen LUAR, bercanggah dengan selang sebenar (Fiber/Steel 2 tahun, UF 3 tahun, PVDF/PVDF Plus 5 tahun) | service--desktop-full.png & service--mobile-sec4.png tunjuk perenggan identik untuk dua konteks; code: `src/app/service/page.tsx:128-142` (banner `pasir-penapis-luar.webp`) | Reka semula banner luar dengan teks selang servis betul ikut jenis penapis (2/3/5 tahun), jangan guna perenggan "6 bulan" generik dari seksyen dalam. |
| 2 | P1 | Both | /service — seksyen "Harga Servis Tukar Pasir" | Tiada maklumat harga/selang servis untuk penapis membran (PVDF RM490, PVDF Plus RM590, UF RM390) yang dijual di /produk-luar; hanya penapis pasir (RM250/RM650) diliputi | code `service/page.tsx` (hanya 2 kategori servis dipaparkan); `src/lib/data/services.ts:53-67` (harga membran wujud dalam data tetapi tiada di /service) | Tambah banner/seksyen berasingan untuk harga & selang servis penapis membran supaya pelanggan PVDF/UF dapat maklumat lengkap. |
| 3 | P1 | Both | /service — banner "Filter Penapis Air Dalam" | Penerangan fungsi setiap filter (Sediment/Pre-Carbon/Antibacterial/Post-Carbon) 100% Bahasa Inggeris dalam imej, bercanggah dengan dasar laman BM sahaja & audiens kurang fasih Inggeris | service--mobile-sec2.png ("Removes large particles such as sand, rust, dirt, and dust." dll.) | Reka semula banner dengan teks penerangan dalam Bahasa Malaysia. |
| 4 | P1 | Both | /service — keseluruhan halaman | Tiada blok CTA/WhatsApp khusus selepas jadual harga; halaman terus ke Footer selepas imej harga terakhir | `service/page.tsx` (tiada import CTASection); service--desktop-full.png & mobile-full.png (imej harga → terus footer) | Tambah seksyen CTA "Hubungi Kami untuk Tempah Servis" sejurus selepas jadual harga. |
| 5 | P1 | Both | /tentang-kami — kad CSR (Aktiviti & Sumbangan) | Label "TBD" literal dipaparkan pada 3 kad CSR di laman produksi langsung | tentang-kami--mobile-full.png & desktop-full.png (label "TBD" kelihatan); `translations.ts:1023,1027,1031` (`about_csr_card_x_year: "TBD"`) | Ganti "TBD" dengan nilai sebenar atau sembunyikan medan tahun sehingga data rasmi sedia. |
| 6 | P1 | Both | /tentang-kami — "AIHAA × Azlee" & "Pasukan AIHAA" | Dua blok plekhoder kosong ("Video kolaborasi — akan dimuat naik", "Gambar pasukan — akan dimuat naik") terus kelihatan di produksi, memberi kesan laman belum siap di tengah kandungan membina kepercayaan | tentang-kami--desktop-full.png; code `AzleeCollabVideo.tsx`, `TeamSection.tsx` | Isi dengan kandungan sebenar segera, atau alih keluar seksyen sehingga aset sedia. |
| 7 | P1 | Both | /tentang-kami — "Kisah Kami" (foto pengasas) vs Home CTASection | Foto yang sama (`/images/products/sales-expert.webp`) digunakan sebagai "Pengasas AIHAA" dengan kisah asal-usul peribadi di /tentang-kami DAN sebagai "AIHAA Sales Expert" generik di seksyen CTA halaman utama — identiti bercanggah bagi muka yang sama | `KisahKami.tsx:36-37` (alt="AIHAA sales expert") vs `CTASection.tsx:108-109` (fail sama, alt="AIHAA Sales Expert") | Guna foto pengasas sebenar yang unik untuk /tentang-kami, bukan foto staf yang dikongsi dengan seksyen jualan generik. |
| 8 | P2 | Mobile | /service — semua 7 imej banner | Semua banner guna `<img>` biasa tanpa atribut width/height (hanya CSS `w-full h-auto`), risiko Cumulative Layout Shift semasa imej dimuat | `service/page.tsx:50-56` dst. (setiap seksyen) | Tambah width/height (atau aspect-ratio CSS eksplisit) sepadan dengan dimensi sebenar setiap imej. |
| 9 | P2 | Mobile | /service — header (ikon WhatsApp vs butang) | CTA "Hubungi Kami" berlabel & bergaya emas jelas di desktop, tetapi di mobile hanya ikon chat kosong tanpa label muncul di header — kurang jelas untuk pengguna kurang mahir teknologi | service--desktop-fold.png (butang emas "Hubungi Kami") vs service--mobile-fold.png (hanya ikon); `Header.tsx:96-101` vs `:107-114` | Tambah label teks ringkas di sebelah ikon WhatsApp mobile. |
| 10 | P2 | Both | /service — banner "Pasir Penapis Air Luar" & "Harga Servis Tukar Pasir" | Label media penapis (ACTIVE CARBON, ZEOLITE, FINE SILICA SAND SPECIAL dll.) sepenuhnya Bahasa Inggeris, dan label "METAL EARSE" berkemungkinan kesilapan ejaan/istilah tidak jelas | service--mobile-sec5.png, service--tablet-full.png | Terjemah label ke BM & sahkan/betulkan istilah "METAL EARSE" semasa reka bentuk semula banner. |
| 11 | P2 | Mobile | /tentang-kami — logo Halal JAKIM | Fail `logo-halal.webp` memuat turun 122KB pada mobile walaupun dipaparkan hanya 128–160px lebar; laluan URL ialah fail mentah, bukan `_next/image` yang dioptimumkan | manifest.json → `mobileImageBytes` untuk tentang-kami (`logo-halal.webp` = 122310 bytes); `HalalCommitment.tsx:39-46` (`sizes="(max-width:1024px) 128px, 160px"`) | Mampatkan/hasilkan versi kecil khas untuk badge ini atau pastikan Next Image optimizer benar-benar aktif untuk aset ini. |
| 12 | P2 | Mobile | /tentang-kami — fold pertama (foto pengasas) | Foto pengasas memenuhi 100% skrin lipatan pertama mobile tanpa sebarang teks/tajuk/CTA kelihatan; "Kisah Kami" hanya nampak sedikit di penjuru bawah | tentang-kami--mobile-fold.png | Kurangkan tinggi imej (aspect ratio) pada mobile supaya tajuk "Dari Rumah Kami, Untuk Rumah Anda" kelihatan tanpa scroll. |
| 13 | P2 | Both | /tentang-kami — label "eyebrow" emas (cth. "OUR HALAL COMMITMENT", "PASUKAN KAMI") | Teks emas kecil huruf besar di atas latar putih/krim berkemungkinan gagal nisbah kontras WCAG AA 4.5:1 | tentang-kami--desktop-full.png (label emas pada latar putih di setiap seksyen) | Gelapkan sedikit ton emas (gold-dark) untuk label di atas latar terang. |
| 14 | P2 | Both | /tentang-kami — keseluruhan halaman | Tiada blok CTA WhatsApp selepas kandungan kepercayaan (Halal, kisah, CSR); laman terus ke Footer sejurus selepas nota CSR | `tentang-kami/page.tsx` (tiada CTASection); tentang-kami--desktop-full.png (nota CSR → terus footer) | Tambah CTA ringkas "Hubungi Kami" selepas seksyen CSR untuk manfaatkan momentum kepercayaan yang baru dibina. |
| 15 | P3 | Mobile | /service — senarai "13 Check Point Servis" | Legibiliti teks senarai pada lebar mobile sebenar 390px tidak dapat disahkan sepenuhnya (jatuh dalam jurang antara sec2/sec3); di tablet (768px, guna imej mobile yang sama) teks sudah agak kecil | service--tablet-full.png (teks kecil "1. Adapter" dll.) — [UNVERIFIED] | Ambil screenshot manual tepat pada kedudukan senarai di 390px sebenar untuk sahkan saiz teks masih boleh dibaca. |
| 16 | P3 | Desktop | /tentang-kami — kredit pengasas "12+ tahun" vs garis masa "2018 ditubuhkan" | "12+ tahun dalam industri penapis air" berbanding syarikat ditubuhkan 2018 (8 tahun pada 2026) — berkemungkinan sah (pengalaman peribadi pra-syarikat) tapi boleh disalah anggap tidak konsisten | tentang-kami--desktop-fold.png | Jelaskan frasa (cth. "berpengalaman dalam industri sejak 2014") untuk elak persoalan konsistensi. |

### Apa Yang Dah Bagus (kekalkan, jangan usik)
- Harga yang dipaparkan di /service (RM160, RM260, RM250, RM650) adalah tepat & terkini — mengesahkan isu "harga lapuk" yang disyaki TIDAK berlaku di sini.
- /service sudah betul menghantar imej banner mobile yang berasingan (bukan desktop yang diskalakan) melalui `<picture><source media>`, disahkan oleh kod & bait imej dalam manifest.
- Reka bentuk /tentang-kami (Kisah Kami, Halal Commitment, timeline) mengikut bahasa reka bentuk jenama (krim, emas, Playfair) dengan kemas & konsisten.
- Nombor SSM dan sijil Halal JAKIM dipaparkan jelas sebagai isyarat amanah, disokong "Halal Integrity Checkpoints".
- Grid responsif (4 pilar servis, 3 kad CSR, timeline 4 titik) beralih dengan baik dari desktop ke mobile tanpa pecah susun atur.
- Nombor WhatsApp staf (Hakiim & Afiq) jelas tersedia di footer untuk terus hubungi.
- Quote pengasas "Dari Rumah Kami, Untuk Rumah Anda" — nada mesra-rakyat yang kuat dan sesuai dengan audiens sasaran.



---

## [SA-5] - Support Pages (FAQ, Promotions, Galeri, Contact, Water-Purifier, 404)

### Ringkasan
Kelima-lima halaman sokongan ini secara struktur kukuh — accordion FAQ, kad promosi, dan reka bentuk WhatsApp-first pada /contact semuanya berfungsi dengan baik dan CTA WhatsApp konsisten menghala ke nombor betul (+60 11-3720 8466) yang sepadan antara kod (contact.ts) dan apa yang production papar. Isu paling besar ialah /galeri — halaman "bukti pemasangan sebenar" yang sepatutnya membina kepercayaan — menunjukkan 5-7 daripada 17 kad gambar sebagai kotak hitam pekat merentasi desktop, tablet dan mobile, dan halaman 404 langsung tiada custom build (fallback Next.js generik, tiada BM, tiada jalan balik). Isu bersaiz sederhana yang berulang di semua halaman saya (sebab ia di Footer) ialah percanggahan nombor WhatsApp (footer vs CTA utama) dan link "Dasar Privasi" yang mati. Perkara paling bagus: reka bentuk /contact yang fokus WhatsApp dengan mock-chat believable, dan konsistensi token produk (badge, kad) merentasi /water-purifier, /produk-dalam, /produk-luar.

### Skor
| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| /faq | 8.5 | 8 |
| /promotions | 8 | 7.5 |
| /galeri | 5.5 | 5 |
| /contact | 7.5 | 7 |
| /water-purifier | 7.5 | 7 |
| 404 (/laluan-tidak-wujud-xyz123) | 2 | 2 |

### Penemuan
| # | Severity | View | Halaman & Lokasi | Isu | Bukti | Cadangan Fix |
|---|---|---|---|---|---|---|
| 1 | P0 | Both | /galeri — grid pemasangan (~5-7/17 kad) | Kad gambar render sebagai kotak hitam pekat, bukan foto pemasangan sebenar, pada halaman bukti-sosial utama | galeri--desktop-full.png, galeri--tablet-full.png, galeri--mobile-sec3/4.png tunjuk kad hitam konsisten; manifest.json — outdoor-12/13/14.jpg & indoor-1/2.jpg tiada dalam mobileImageBytes route "galeri" (hanya 12/17 imej berjaya), tapi muncul sah di bawah route "contact" — fail wujud, gagal render stabil di /galeri | Tambah blur placeholder pada `<Image>` (galeri/page.tsx:74-80), mampatkan foto kamera asal (100-220KB), uji semula kestabilan load seluruh grid |
| 2 | P0 | Both | 404 (/laluan-tidak-wujud-xyz123) — seluruh halaman | Fallback Next.js generik: tiada header/nav/footer AIHAA, tiada BM, tiada CTA/jalan balik | 404-test--desktop-full.png, 404-test--mobile-fold.png; disahkan tiada src/app/not-found.tsx dalam kod | Bina not-found.tsx custom dengan Header/Footer, mesej BM, butang Home + WhatsApp |
| 3 | P1 | Both | Footer (nampak di /faq, /promotions, /galeri, /contact, /water-purifier) | Nombor WhatsApp footer (+60 11-2998 7890, +60 16-277 3211) tak sepadan dengan CTA utama (+60 11-3720 8466) pada halaman yang sama | Footer.tsx:22-30 (komen: "phased migration"); contact--desktop-full.png tunjuk dua set nombor berbeza dalam satu skrin | Sambungkan Footer ke sumber contact.ts yang sama atau label jelas sebagai admin berasingan |
| 4 | P1 | Both | Footer — link "Dasar Privasi" | href="#" dead link; /privacy juga 404 | Footer.tsx:137-138; manifest.json probes "/privacy":404 | Bina halaman dasar privasi & link betul, atau alih keluar sementara |
| 5 | P1 | Mobile | /water-purifier (ProductCard dikongsi) | Tagline produk terpotong drastik pada grid 2-lajur mobile ("Premium denga...") | water-purifier--mobile-sec3.png; ProductCard.tsx:111 `truncate` 1-baris | Tukar ke `line-clamp-2` supaya tagline wrap 2 baris |
| 6 | P2 | Both | /promotions & /water-purifier — URL slug | Slug BI (/promotions, /water-purifier) pada laman BM-sepenuhnya; /promosi 404 | manifest.json probes "/promosi":404; Header.tsx:31,37 | Redirect /promosi→/promotions (301) atau tukar slug ikut konvensyen BM |
| 7 | P2 | Both | /water-purifier vs /produk-dalam /produk-luar | Grid produk 100% pendua (harga/badge/gambar sama) di 3 URL berbeza | water-purifier--desktop-full.png sepadan produk-dalam/produk-luar--desktop-full.png; kod guna catalog sama | Papar hanya produk pilihan pada /water-purifier, biar link "Lihat Koleksi" bawa ke senarai penuh |
| 8 | P2 | Mobile | /contact — kad WhatsApp (~88% scroll) | Butang scroll-to-top bertindih teks "WhatsApp — Cara Paling Cepat" | contact--mobile-sec2.png; FloatingButtons.tsx:29-35 (chrome dikongsi) | (Flag ke SA-6) beri backdrop/reposisi butang supaya tak bertindih teks |
| 9 | P2 | Mobile | /contact — above the fold | Butang WhatsApp sebenar di luar fold pertama; hanya bubble chat terapung immediate | contact--mobile-fold.png vs contact--mobile-sec2.png | Kurangkan tinggi mock-chat atau alih butang lebih atas |
| 10 | P3 | Both | /promotions — "Promosi Utama" | Kad "promosi" sebenarnya ulang USP sedia ada, urgency tanpa tarikh tamat sebenar | promotions--desktop-fold.png; translations.ts:712-734 | Tambah countdown/tarikh tamat sebenar untuk urgency yang credible |
| 11 | P3 | Both | /faq — item accordion | Soalan dalam `<span>`, bukan heading semantik | faq/page.tsx:85 | Bungkus faq.q dalam `<h3>` untuk navigasi heading yang accessible |

### Apa Yang Dah Bagus (kekalkan, jangan usik)
- FAQ: pola accordion kemas, satu soalan terbuka pada satu masa, ada CTA WhatsApp inline lepas 9 soalan terakhir.
- /contact: reka bentuk WhatsApp-first dengan mock-up chat believable, 3 trust badge, Google Maps embed lazy-loaded.
- /promotions: hierarki 3 kad promo (gelap/putih/krim) jelas, setiap kad ada CTA WhatsApp sendiri, accordion T&C berfungsi.
- /water-purifier: keputusan IA munasabah (nav "Produk" → katalog penuh + cross-link balik ke /produk-dalam & /produk-luar); token design (badge, kad produk) konsisten merentasi 3 halaman produk.
- Bila gambar berjaya load, /galeri sangat meyakinkan — foto before/after sebenar, testimoni nama+lokasi, lightbox dengan aria-label yang betul.
- Nombor telefon utama (+60 11-3720 8466) konsisten antara contact.ts, translations.ts (BM & EN) dan apa yang dipaparkan di /contact dan /faq — tiada placeholder ditemui pada cawangan ini.


---

## [SA-6] - Global / Cross-Cutting (Header, Footer, Chatbot, 404, Konsistensi & Aksesibiliti Sitewide)

### Ringkasan
Rangka global (header, footer, chatbot, floating buttons) secara keseluruhannya kukuh dan konsisten merentasi semua 8 laluan yang disampel — nav, drawer mobile, dan chatbot berfungsi dengan baik serta lencana kepercayaan (Halal JAKIM/Waranti/Bumiputera) berulang secara konsisten. Dua isu suspek yang diberi memang **tidak dapat disahkan berlaku** pada production: swap imej mobile/desktop untuk banner produk & hero berfungsi betul (picture/source dengan srcSet -mobile disahkan dalam manifest), dan harga di /service (RM160/RM260/RM250/RM650) tepat menurut rujukan rasmi — tiada imej harga lapuk dijumpai. Walau bagaimanapun, dua isu suspek yang disahkan BENAR: halaman 404 adalah kosong sepenuhnya dalam Bahasa Inggeris tanpa sebarang jenama/navigasi (P0), dan pautan "Dasar Privasi" footer memang href="#" mati dengan /privacy yang benar-benar 404 (P1) — kritikal bagi perniagaan yang mengumpul data lead WhatsApp. Penemuan BARU yang penting: label & tajuk Bahasa Inggeris tersimpan terus di dalam objek locale Bahasa Malaysia (translations.ts) dan terpapar pada halaman produk sebenar, `next.config.js` mematikan pengoptimuman imej next/image untuk SELURUH laman (menyebabkan /galeri & /contact hantar .jpg mentah bersaiz penuh ke mobile), dan butang hamburger mobile — togol navigasi utama untuk ~70% trafik — langsung tiada aria-label. Perkara paling bagus: disiplin responsive-image untuk banner produk, konsistensi kad/lencana amanah, dan pengendalian prefers-reduced-motion yang wujud (walaupun tidak menyeluruh).

### Skor
| Halaman | Desktop /10 | Mobile /10 |
|---|---|---|
| home | 8 | 7 |
| produk-dalam | 8 | 7.5 |
| prod-aihaa-bella | 6.5 | 6 |
| prod-fiber-9x42 | 7 | 6 |
| service | 8.5 | 8 |
| faq | 7.5 | 7 |
| contact | 8 | 7.5 |
| 404-test | 2 | 2 |

### Penemuan
| # | Severity | View | Halaman & Lokasi | Isu | Bukti | Cadangan Fix |
|---|---|---|---|---|---|---|
| 1 | P0 | Both | 404 (/laluan-tidak-wujud-xyz123) | Halaman 404 kosong sepenuhnya, dalam Bahasa Inggeris ("This page could not be found"), tiada header/nav/footer/CTA WhatsApp — jalan buntu penuh untuk pengguna tersasar | 404-test--desktop-full.png & 404-test--mobile-full.png (halaman putih kosong tanpa jenama); manifest.json status 404 | Bina custom not-found.tsx berjenama AIHAA (Header/Footer, mesej BM mesra, butang "Kembali ke Laman Utama"/WhatsApp) |
| 2 | P1 | Both | Global — semua produk dalam rumah, cth /product/aihaa-bella | Tajuk & label seksyen "Fungsi Air" ("Functionalities, Perfectly Suited to Your Lifestyle", "Coffee", "Tea", "Baby Milk", dll) dalam Bahasa Inggeris DI DALAM objek locale BM sendiri — langgar dasar BM-sahaja pada halaman duit | translations.ts:1069-1084 (blok "ms") + prod-aihaa-bella--mobile-sec2.png | Terjemah semua nilai blok "ms" kepada BM: "Kopi", "Teh", "Susu Bayi", "Air Sejuk", "Air Suhu Bilik", "Mesin Ais" |
| 3 | P1 | Both | Footer — semua halaman | Pautan "Dasar Privasi" masih href="#" dan /privacy 404 — risiko kepercayaan & PDPA bagi laman yang kumpul data lead WhatsApp | Footer.tsx:137 + manifest probes "/privacy":404 | Bina laman /dasar-privasi ringkas BM & tukar href Footer |
| 4 | P1 | Mobile | Header.tsx — butang hamburger (semua halaman) | Togol nav utama mobile (~70% trafik) tiada aria-label/aria-expanded, tidak konsisten dgn Chatbot yg sudah betul | Header.tsx:117-122 vs Chatbot.tsx:146 | Tambah aria-label dinamik + aria-expanded={isMenuOpen} |
| 5 | P1 | Mobile | Sitewide — /galeri & /contact | `images.unoptimized:true` mematikan pengoptimuman next/image SELURUH laman — .jpg mentah bersaiz penuh dihantar ke mobile untuk thumbnail kecil | next.config.js:5 + manifest: /galeri ~1.36MB (12 fail .jpg), /contact ~508KB | Buang unoptimized:true (jika hosting sokong) atau pra-jana WebP/AVIF kecil |
| 6 | P1 | Mobile | /product/fiber-9x42 | Halaman produk terberat dlm sampel: ~899KB imej mobile, satu fail (filter-layers-mobile.webp) 233KB | manifest mobileImageBytes prod-fiber-9x42 | Mampatkan semula banner filter-layers & maintenance-guide, sasar <80KB/banner |
| 7 | P2 | Mobile | Header.tsx ikon hamburger & WhatsApp | Target sentuh ~32-36px, di bawah minimum 44×44px | Header.tsx:107-122 (kiraan padding+ikon) | Naikkan padding ke p-2.5/p-3 atau min-w/h-[44px] |
| 8 | P2 | Mobile | Chatbot.tsx butang tutup (X) | Target sentuh ~28×28px, terlalu kecil | Chatbot.tsx:168-174; state--home-mobile-chatbot-open.png | Naikkan padding ke p-2.5 (≈44px) |
| 9 | P2 | Both | Footer bar bawah — semua halaman | Teks hak cipta/"Dasar Privasi" (#666 atas #0D0D0D) kontras ~3.4:1, gagal WCAG AA 4.5:1 | Footer.tsx:134-139 + kiraan kontras WCAG | Tukar ke warna lebih terang (~#8F8F8F) |
| 10 | P2 | Mobile | Home — scroll-to-top vs Footer Navigasi | Butang terapung bertindih visual dgn pautan "Dalam Rumah" semasa scroll ke penghujung laman | home--mobile-sec5.png | Tambah padding-bottom footer atau sorok butang di footer |
| 11 | P2 | Both | Konsistensi butang CTA emas merentasi laman | 3 gaya butang CTA berbeza tanpa token tunggal (bg-gold text-dark / gold-gradient-bg text-white / .btn-pill) | HomeHero.tsx:45 vs Header.tsx:98 vs globals.css:119-137 | Satukan kepada 1 komponen Button dgn 1 token gaya |
| 12 | P2 | Desktop | Header.tsx dropdown "Produk" | Dropdown hanya buka via hover, tiada sokongan tap pada peranti skrin sentuh ≥1024px | Header.tsx:64-65 | Tambah state klik/tap sbg alternatif hover |
| 13 | P2 | Both | FAQ — accordion soalan | Butang accordion tiada aria-expanded/aria-controls | faq/page.tsx:81-96 | Tambah atribut aria-expanded & aria-controls |
| 14 | P3 | Both | Sitewide — globals.css | Sokongan reduced-motion tidak menyeluruh (hanya class custom terhad) | globals.css:362-392 vs faq/page.tsx:98 | Tambah catch-all media query reduced-motion |
| 15 | P3 | Both | /product/fiber-9x42 banner | Label terbakar-imej dlm Inggeris ("STAINLESS STEEL HANDLE" dll) sedangkan teks sekeliling BM | prod-fiber-9x42--mobile-sec2.png | Eksport semula banner dgn label BM pada sesi reka bentuk akan datang |
| 16 | P3 | Both | Sitewide — font loading | Font dimuat via @import CSS bukan next/font — lapisan permintaan luaran tambahan | globals.css:1 + layout.tsx:29-30 | Migrasi ke next/font/google |

### Apa Yang Dah Bagus (kekalkan, jangan usik)
- Swap imej mobile/desktop untuk hero & banner produk (`<picture>`/`<source media>` di HomeHero.tsx & ProductBannerShowcase.tsx) berfungsi betul dan disahkan production benar-benar hantar fail `-mobile.webp` yang lebih kecil — dakwaan "banner mobile orphaned" TIDAK dapat disahkan berlaku hari ini.
- Harga di /service (RM160 servis filter AIHAA, RM260 jenama lain, RM250 tukar pasir 5 lapisan, RM650 6 lapisan) padan 100% dengan rujukan rasmi — tiada imej harga lapuk dijumpai.
- Drawer menu mobile (state--home-mobile-hamburger-open.png) kemas: senarai penuh + sub-item dropdown kelihatan, jarak/teks selesa, safe-area bottom padding dikendalikan.
- Bahagian prefers-reduced-motion (globals.css:362-392) wujud dan meliputi kebanyakan animasi custom — amalan baik yang ramai laman lain lupa buat.
- Lencana amanah Halal JAKIM / Waranti 2 Tahun / Bumiputera konsisten berulang di home, produk-dalam dan water-purifier.
- Reka bentuk kad (produk, FAQ, ciri) konsisten dari segi radius, shadow dan spacing merentasi home/produk-dalam/service.
- Chatbot (desktop & mobile) ada aria-label yang betul pada butang buka/tutup, dan reka bentuk privacy-by-design (padam mesej bila ditutup) adalah amalan baik.


---

## Roadmap Cadangan (cadangan sahaja — TIADA yang dilaksanakan)

### Quick Wins (< 1 jam setiap satu)
1. Tambah butang CTA WhatsApp dalam badan semua halaman produk (guna `whatsappMessages.productInquiry` sedia ada) — TOP #1
2. Betulkan copy selang servis luar di `/service` ("setiap 6 bulan" → 2/3/5 tahun) — TOP #3
3. Bina `not-found.tsx` custom BM dengan nav + CTA WhatsApp — TOP #5
4. Sorok seksyen "TBD"/kosong di `/tentang-kami` sehingga kandungan sedia — TOP #6
5. Selaraskan nombor WhatsApp ke satu sumber `contact.ts` — TOP #8
6. Buang `images.unoptimized: true` dari `next.config.js` (uji di preview dulu) — TOP #9
7. Tambah `aria-label` + `aria-expanded` pada butang hamburger (`Header.tsx:117-122`) dan `aria-expanded`/`aria-controls` pada accordion FAQ
8. Baiki kontras: bar bawah footer `text-[#666]` (~3.4:1), lencana "Respon Pantas" putih-atas-emas
9. Tukar `benefits_4_title` "Halal & Bumiputera Certified" kepada BM penuh

### Sprint (± 1 hari setiap satu)
1. Papar harga produk sebagai teks HTML pada semua 12 halaman detail (sumber: `products.ts`) — TOP #2
2. Ganti/baiki foto kotak hitam di `/galeri` — TOP #4
3. Selesaikan percanggahan waranti (sahkan polisi dengan Azri → betulkan banner atau `services.ts`) — TOP #7
4. Bina halaman Dasar Privasi sebenar + ganti `href="#"` — TOP #10
5. Hero homepage: render tajuk/USP/lencana sebagai teks HTML overlay (kekalkan foto sebagai latar) → dapat `<h1>`, SEO, zoom
6. `/contact`: naikkan butang "WhatsApp Sekarang" ke fold pertama mobile; baiki pertindihan butang scroll-to-top dengan kad WhatsApp
7. Tambah blok CTA WhatsApp selepas jadual harga `/service` dan di hujung `/tentang-kami`
8. Tambah maklumat harga/selang servis membran (PVDF, PVDF Plus, UF) di `/service`
9. `/water-purifier` & kad produk: hadkan tagline terpotong pada grid 2 lajur mobile (line-clamp + saiz kad)

### Projek (multi-hari)
1. **Strategi kandungan baked-in-image** — alih kandungan kritikal (spec, harga, waranti, tajuk) daripada imej kepada HTML merentas semua 12 produk; imej kekal untuk visual sahaja. Selesaikan sekali gus isu SEO, pembaca skrin, zoom warga emas, dan English-dalam-imej
2. **Sweep English → BM** — banner baked (perlu aset design baru: filter-flow, spec, "METAL EARSE", label "STAINLESS STEEL HANDLE" dll.) + `translations.ts` blok `ms` ("Coffee", "Tea", "Baby Milk"...) + H1 "Outdoor Filter" + ejaan baked ("unplesant", "Pastel Arcylic")
3. **Sistem token butang CTA** — satukan 3 gaya butang emas (`bg-gold text-dark` vs `gold-gradient-bg text-white` vs class custom) kepada satu komponen dengan varian
4. **Keputusan IA `/water-purifier` & `/promotions`** — sama ada redirect, jenamakan semula ke slug BM, atau bezakan kandungan (kini 11 kad produk sama diulang dari 2 halaman listing); promosi perlu tawaran sebenar berbeza daripada USP tetap
5. **Bukti sosial sebenar** — testimoni dengan foto/lokasi + galeri pemasangan yang lengkap; padankan foto "Pengasas" vs "Sales Expert" (kini imej sama untuk 2 identiti berbeza)

---

## Appendix

### A. Nota metodologi & deviasi (keputusan orkestrator)
1. **Playwright MCP tidak tersedia dalam sesi** → daripada jatuh ke mod CODE-ONLY, orkestrator pra-tangkap semua bukti visual menggunakan pakej `playwright` sedia ada dalam devDependencies repo + Chrome sistem (tiada dependency baru, tiada penulisan dalam repo, tiada dev server — semua skrinsyot dari URL produksi). Auditor membaca imej secara read-only.
2. **Chatbot**: widget hanya DIBUKA dan DITUTUP untuk skrinsyot UI. Tiada satu aksara pun ditaip, tiada mesej dihantar — round-robin sales tidak disentuh.
3. **Working tree tidak 100% bersih semasa mula**: 2 fail diubah — `.claude/settings.local.json` (+1 baris permission tooling) dan `package-lock.json` (−1 baris metadata `"peer": true`). Kedua-duanya bukan fail sumber; audit read-only diteruskan dengan deviasi ini dilaporkan di sini. Tiada fail sumber lain kotor.
4. **Agent definitions**: 2 fail dicipta di `.claude/agents/` seperti arahan, tetapi agent type baharu tidak boleh didaftar dalam sesi yang sedang berjalan — auditor dijalankan sebagai workflow subagents dengan model sama (SA-1..3 Opus, SA-4..6 Sonnet) dan kontrak read-only penuh dalam setiap prompt.
5. **Route sebenar vs brief**: halaman detail produk di `/product/[slug]` (bukan bawah `/produk-dalam/`); halaman promosi ialah `/promotions` (`/promosi` = 404); produk outdoor ke-6 dalam data ialah **AIHAA STEEL** (slug `steel`) — tiada produk "Super Pleated" di produksi mahupun data (disahkan SA-3, bukan pepijat).
6. **Penapis Boring 13×54**: DISAHKAN tidak reachable — 3 varian slug diprob, semua 404. Bukan isu.
7. **Produksi mungkin deploy lebih lama daripada branch**: auditor melaporkan apa yang produksi papar; keadaan kod branch dicatat dalam penemuan yang sama di mana berbeza.

### B. Bukti & liputan
- **254 fail bukti**: 22 halaman × (desktop/mobile/tablet, full + fold) + 5 skrinsyot state interaktif (hamburger terbuka, sticky scroll, card hover, chatbot buka desktop/mobile) + 110 section-shot mobile (5 kedalaman scroll × 22 halaman) + `manifest.json` (status HTTP, probe URL, payload imej mobile per halaman).
- Lokasi (sementara, folder scratchpad sesi): `C:\Users\ACER\AppData\Local\Temp\claude\c--Users-ACER-Desktop-AIHAA-WEBSITE-COMPANY\be4faa59-7865-4ede-97a8-2541ac99bc3c\scratchpad\shots\` — **salin folder ini jika mahu simpan kekal**; folder temp boleh dibersihkan oleh sistem.
- Liputan: 22/22 halaman diaudit dalam KEDUA-DUA desktop & mobile oleh auditor pemilik; tiada gap, tiada respawn diperlukan.
- Probe status: semua 22 route = HTTP 200 (redirect ke `www.`); `/promosi` 404; `/privacy` 404; `/product/boring-13x54` + 2 varian = 404.
- Payload imej mobile (top-25 per halaman, dari manifest): home 0.12MB · produk-dalam 0.11MB · produk-luar 0.13MB · produk indoor 0.31–0.52MB · produk outdoor 0.51–0.95MB · service 0.60MB · galeri 1.33MB (terberat) · contact 0.48MB.

### C. Perlu skrinsyot / semakan manual (dilaporkan [UNVERIFIED] oleh auditor)
- **SA-1:** Nisbah kontras TEPAT butang 'Lihat Produk' (HomeHero) & badge 'Respon Pantas' (CTASection) atas latar berubah/foto — warna dari kod disahkan tetapi ukuran kontras piksel sebenar perlu semakan manual.
- **SA-2:** Ejaan tepat "Pastel Arcylic" pada banner spec BELLA — hanya dilihat dari shot desktop-full yang di-downscale; perlu screenshot crisp mobile-sec kawasan spec BELLA untuk sahkan.
- **SA-2:** Ketiadaan mutlak nilai RM pada banner spec-price BIG/FANCY/WINTER — disahkan dari desktop-full (tiada baris harga), tetapi shot crisp mobile-sec khusus kawasan spec setiap satu akan mengesahkan 100%.
- **SA-3:** Ketepatan penuh teks halus baked pada jadual 'SPEC & PRICE' (nilai micron/ukuran) pada 390px — perlu zum manual walaupun sec-shots menunjukkan ia masih boleh dibaca.
- **SA-4 - Service + Tentang Kami:** Legibiliti teks senarai "13 Check Point Servis" pada lebar mobile sebenar 390px (jatuh dalam jurang antara sec2 & sec3 tangkapan skrin) — perlu screenshot manual tepat pada kedudukan scroll tersebut.
- **SA-5 - Support Pages (FAQ, Promotions, Galeri, Contact, Water-Purifier, 404):** Sama ada kotak hitam pada /galeri adalah kegagalan rangkaian sepenuhnya (imej tidak pernah load) atau sekadar timing race semasa capture (imej lambat tapi akhirnya load) — perlu retest manual dengan throttling rangkaian sebenar & devtools Network tab untuk sahkan punca tepat.
- **SA-5 - Support Pages (FAQ, Promotions, Galeri, Contact, Water-Purifier, 404):** Sama ada nombor footer 'Hakiim'/'Afiq' memang admin sales aktif yang sengaja berasingan daripada CTA utama (bukan silap), atau ia peninggalan migrasi yang patut disegerakan — perlu semak dengan Azri/pasukan admin WhatsApp round-robin sebenar.
- **SA-6 - Global / Cross-Cutting (Header, Footer, Chatbot, 404, Konsistensi & Aksesibiliti Sitewide):** Pertindihan pixel-tepat antara butang 'scroll-to-top' terapung dengan pautan footer 'Dalam Rumah' pada titik scroll penghujung laman — full-page screenshot mobile di-downscale terlalu kecil (780x11178 → 140x2000) untuk sahkan sepenuhnya; disyorkan screenshot manual tepat di titik scroll akhir setiap laman.
- **SA-6 - Global / Cross-Cutting (Header, Footer, Chatbot, 404, Konsistensi & Aksesibiliti Sitewide):** Sama ada label Bahasa Inggeris dalam komponen CapacityFunctionalities (Coffee/Tea/Baby Milk/dll) turut terpapar sama di 5 produk dalam rumah yang lain (big/ean/fancy/winter/ultra-one) — disahkan berlaku pada aihaa-bella melalui screenshot, dan kod translations.ts mengesahkan ia sumber sepunya untuk semua produk dalam, tetapi setiap laman produk individu tidak di-screenshot pada seksyen tepat ini untuk pengesahan visual 1-ke-1.

---

*Laporan dijana oleh audit orchestrator (Claude Fable 5) dengan 6 auditor subagent · 4 Julai 2026 · READ-ONLY, tiada fix dilaksanakan.*

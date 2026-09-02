# senangPay "website inaccessible" — siasatan & tindakan

**Tarikh:** 2026-09-02
**Pencetus:** e-mel senangPay Onboarding ke `aihaateam@gmail.com` — semakan Digital Catalog tidak dapat diteruskan kerana "the website is currently inaccessible" dan mesti "contain the necessary information".

---

## 1. Verdict pendek

**Website tidak pernah mati.** Semua ujian pada 2026-09-02 hijau:

| Semakan | Arahan | Keputusan |
|---|---|---|
| Homepage | `curl https://www.aihaaofficial.com` | ✅ HTTP 200, 40,611 bytes |
| Sijil SSL | `openssl s_client` | ✅ Let's Encrypt, sah hingga 24 Okt 2026 |
| DNS | `nslookup … 8.8.8.8` | ✅ resolve ke Vercel (216.150.1.1) |
| Blocking bot | 4 user-agent berbeza (Chrome, curl, Googlebot, kosong) | ✅ semua 200 — tiada blocking |
| Render sebenar | browser + `read_console_messages` | ✅ penuh, **sifar** console error |
| Semua route | 12 halaman utama | ✅ semua 200 |
| Rotasi WhatsApp | `/api/wa/product?debug=1` | ✅ `kvOk:true, counter:179` |
| Chatbot | `POST /api/chat` (payload UIMessage betul) | ✅ 200, streaming jawapan OpenAI |

Jadi ayat "inaccessible" itu **bukan** tentang server.

---

## 2. Punca paling berkemungkinan — URL salah pada rekod senangPay

Dokumen HQ `docs/legal/T&C,PP,CRP - PHYSICAL PRODUCT.docx` ialah **template merchant senangPay sendiri**. Dalam template itu ada slot untuk alamat laman web. Slot itu telah diisi dengan **alamat e-mel**, bukan domain:

> "Terms and conditions stated below applies to all visitors and users of **aihaateam@gmail.com/**."

Ia berulang **15 kali** dalam dokumen yang sama.

Kesimpulan yang munasabah: borang permohonan senangPay kemungkinan besar turut diisi dengan `aihaateam@gmail.com` dalam medan **Website URL**. Pemeriksa cuba buka "website" itu, ia bukan laman web, jadi laporan mereka berbunyi *inaccessible*.

### 🔴 TINDAKAN AZRI (paling penting)
Log masuk dashboard merchant senangPay → semak medan **Website URL** → pastikan ia berbunyi:

```
https://www.aihaaofficial.com
```

Tiada pembetulan kod boleh menggantikan langkah ini.

---

## 3. Isu kedua — setiap URL kanonik tapak sendiri hanya bagi 307

`src/lib/config/site.ts` isytihar `SITE_URL = "https://aihaaofficial.com"` (apex, tanpa www). Nilai itu mengalir ke `metadataBase`, `og:url`, JSON-LD, dan didup dalam `public/sitemap.xml` + `public/robots.txt`.

Tetapi Vercel hidangkan **www** sebagai domain utama:

```
https://aihaaofficial.com      -> 307 -> https://www.aihaaofficial.com/
https://www.aihaaofficial.com  -> 200
```

Kesannya: kesemua **22 URL dalam sitemap**, arahan `Sitemap:` dalam robots.txt, `og:url` setiap halaman, dan `url` dalam JSON-LD menunjuk ke hos yang **tidak pernah pulangkan 200**.

Pelayar biasa ikut redirect tanpa masalah, jadi ini **belum terbukti** punca aduan pemeriksa. Tapi ia tetap salah dan patut diselaraskan.

### 🟠 TINDAKAN AZRI — pilih satu (jangan saya buat sendiri, ini keputusan domain)
- **(A)** Dashboard Vercel → jadikan `aihaaofficial.com` domain **primary**, biar `www` yang redirect. Kod kekal seperti sedia ada. *Disyorkan* — sepadan dengan apa yang kod sudah isytihar.
- **(B)** Saya tukar `SITE_URL` + sitemap + robots kepada `www`. Cepat, tiada akses dashboard perlu, tapi menukar domain kanonik jenama.

---

## 4. Sudah dibetulkan dalam kod

Cabang **`fix/senangpay-review-blockers`** — 3 commit, **belum push, belum merge ke main**.

| Commit | Isi |
|---|---|
| `1a6ff36` | 15 slot laman web dalam `policy.ts` → `aihaaofficial.com`; 2 rujukan yang memang e-mel dikekalkan; **4 nota pengarang template senangPay dibuang** — `(not applicable for intangible product)` dan `**(Note: Kindly amend according to your business service)` yang selama ini terbit hidup-hidup di `/polisi` |
| `948c7d7` | Buang **"FVSB"** — singkatan syarikat lain yang tiada kaitan dengan AIHAA, tertinggal dalam klausa perkongsian data; frasa terpotong `apply our terms of;` dilengkapkan; buang nombor `013-736 6805` yang tidak disahkan, ganti dengan talian rasmi `+60 11-5657 7084` |
| `56c0452` | Tambah **AIHAA STEEL** ke `sitemap.xml` — `/product/steel` hidup (200) tapi tercicir, jadi katalog crawlable hanya 11 daripada 12 produk |

Verified: `tsc --noEmit` exit 0 · `npm run build` exit 0 (15/15 halaman) · output `.next/server/app/polisi.html` — FVSB 0, `013-736` 0, `Kindly amend` 0.

> Nota kejujuran: nombor `013-736 6805` itu saya sendiri yang hasilkan lebih awal dalam sesi ini, daripada token rosak `aihaateam@gmail.com/0137366805`. Ia tidak pernah disahkan sebagai talian AIHAA. Sudah ditarik balik.

---

## 5. Masih terbuka — perlu keputusan/data dari Azri

1. **🔴 Tiada alamat penuh.** Seluruh tapak hanya ada "Batu Pahat, Johor" — tiada nama jalan, tiada poskod. Gateway pembayaran lazimnya wajibkan alamat perniagaan fizikal, dan Privacy Policy sendiri janji "the address given below" yang tidak wujud. **Azri kena bekalkan alamat berdaftar.**

2. **🔴 Polisi cerita kedai online yang tidak wujud.** Teks HQ sebut *online store*, akaun pengguna, pendaftaran/log masuk, dan bayaran *Visa, MasterCard*. Tapak sebenar tiada troli, tiada checkout — semua CTA pergi ke WhatsApp. Ini soalan perniagaan, bukan bug: **AIHAA memang nak buka checkout senangPay, atau teks polisi patut ditulis semula ikut model pesanan-WhatsApp?** Saya tidak ubah bahagian ini kerana membuangnya boleh menjejaskan permohonan itu sendiri.

3. **🟠 Fail .docx HQ masih ada ralat asal** (slot e-mel, nota template, FVSB). Kod dan dokumen kini tidak sepadan. HQ perlu kemas kini dokumen asal. Pengecualian 1–4 sudah dicatat dalam header `src/lib/data/policy.ts`.

4. **🟠 Keputusan domain** — lihat bahagian 3.

5. **⚪ Merge & deploy.** Cabang siap tapi saya tidak push atau merge ke `main` tanpa kebenaran Azri. Selagi tidak deploy, `/polisi` live masih papar nota template senangPay.

---

## 6. Nota metodologi

Audit 6-dimensi dijalankan (192 agen). **154 daripadanya gagal** kerana had sesi API, jadi lapisan verifikasi adversarial tidak lengkap dan pembahagian automatik "confirmed vs refuted" tidak boleh dipercayai. Penemuan mentah dari 5 daripada 6 dimensi diselamatkan dari `journal.jsonl` dan **disahkan semula secara manual satu per satu** dengan curl/grep sebelum dilaporkan di sini.

Dua dakwaan agen yang **saya tolak selepas ujian sendiri**:

- ❌ *"Chatbot mati di produksi, /api/chat pulangkan 500"* — 500 itu artifak payload ujian yang salah bentuk. Dengan badan UIMessage yang betul, ia pulangkan **200 + streaming jawapan OpenAI sebenar**.
- ❌ *"Repo terpaut ke projek Vercel orphan, fix tak boleh ship dari folder ini"* — build tempatan dan tapak live padan tepat (termasuk commit terakhir `2655067`), membuktikan domain live memang dihidangkan dari repo ini, cabang `main`.

Memori projek turut dikemas kini: catatan lama "prod KV/env DEAD" sudah **lapuk** — rotasi dan chatbot kedua-duanya hidup pada 2026-09-02.

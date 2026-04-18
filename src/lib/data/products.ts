// Single source of truth for all AIHAA product data.
// Consumed by: /product/[id], /water-purifier, /produk-luar,
// /produk-dalam, and the homepage SignatureCollection. When editing,
// change here once — routes pick it up automatically.
//
// i18n note: specs and features remain BM-only (reflects the current
// state of the existing catalogue). tagline and description are the
// only bilingual fields today because they surface on the landing
// page cards where BM ↔ EN toggling is user-facing. Phase 3 product
// detail rebuild will widen bilingual coverage to specs + features.

export type ProductCategory = "indoor" | "outdoor";

export type ProductBadge =
  | "popular"
  | "sale"
  | "premium"
  | "best-value"
  | "pro-grade";

export type Bilingual = {
  bm: string;
  en: string;
};

export type ProductSpec = {
  label: string; // BM only for now — Phase 3 detail pages will upgrade to Bilingual
  value: string;
};

export type ProductVariant = {
  slug: string; // kebab-case id for the variant
  label: string;
  image: string;
};

// ────────────── Phase 7 detail-page enums ──────────────
// Kept as union-of-strings rather than data-heavy objects so the visible
// labels live in i18n (single source, BM+EN parity). Each kind maps to a
// translation key prefix inside the corresponding section component.
export type CapacityKind =
  | "coffee" // 85°C
  | "tea" // 70°C
  | "baby" // 50°C
  | "cold" // 8°C
  | "ambient" // 25°C
  | "ice"; // Ice maker

export type FilterStageKind =
  | "sediment"
  | "antibacterial"
  | "pre-carbon"
  | "post-carbon"
  | "uf-membrane";

export type OutdoorLayerKind =
  | "anthracite"
  | "zeolite-plus"
  | "kdf"
  | "nano-silver"
  | "super-quick-sand"
  | "fine-sand"
  | "silica-sand";

export type Product = {
  slug: string;
  name: string; // brand identifier, never translated
  category: ProductCategory;
  tagline: Bilingual;
  description: Bilingual;
  price: string; // hardcoded, never translated
  oldPrice?: string;
  badge?: ProductBadge;
  mainImage: string;
  gallery?: string[];
  variants?: ProductVariant[];
  specs: ProductSpec[];
  features: string[];
  // Phase 7 overrides — all optional, components fall back to category
  // defaults (see CATEGORY_DEFAULTS inside each detail-section component).
  capacityOptions?: CapacityKind[]; // Indoor only
  filterStages?: FilterStageKind[]; // Indoor only
  outdoorLayers?: OutdoorLayerKind[]; // Outdoor only
  seo: {
    titleBm: string;
    descriptionBm: string;
  };
};

export const products: Product[] = [
  // ─────────────────────── INDOOR ───────────────────────
  {
    slug: "aihaa-bella",
    name: "AIHAA BELLA",
    category: "indoor",
    tagline: {
      bm: "Rekaan Kompak Stand Floor",
      en: "Compact Stand Floor Design",
    },
    description: {
      bm: "AIHAA BELLA — penapis air berdiri dengan 4 tahap penapisan dan teknologi mineral alkali. Kapasiti tangki 9.5 liter. Rekaan kompak stand floor.",
      en: "AIHAA BELLA — stand-floor water purifier with 4-stage filtration and alkaline mineral technology. 9.5-litre tank. Compact stand-floor design.",
    },
    price: "RM1,080",
    mainImage: "/images/products/bella/main.jpg",
    gallery: [
      "/images/products/bella/main.jpg",
      "/images/products/bella/poster.jpg",
      "/images/products/bella/specs.jpg",
      "/images/products/bella/filter.jpg",
    ],
    specs: [
      { label: "Tahap Penapisan", value: "4 Tahap" },
      { label: "Teknologi", value: "Mineral Alkali" },
      { label: "Kapasiti Tangki", value: "9.5 Liter" },
      { label: "Rekaan", value: "Stand Floor" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "4 Tahap Penapisan",
      "Teknologi Mineral Alkali",
      "Rekaan Kompak Stand Floor",
      "Kapasiti Tangki 9.5 Liter",
      "Percuma pemasangan & penghantaran",
      "Waranti 2 tahun",
    ],
    seo: {
      titleBm: "AIHAA BELLA | Penapis Air Stand Floor",
      descriptionBm:
        "AIHAA BELLA — rekaan kompak stand floor. RM1,080. Sekali bayar, pemasangan percuma, waranti 2 tahun.",
    },
  },
  {
    slug: "aihaa-big",
    name: "AIHAA BIG",
    category: "indoor",
    tagline: {
      bm: "Kapasiti Besar 17 Liter",
      en: "Large 17-Litre Capacity",
    },
    description: {
      bm: "AIHAA BIG — penapis air berdiri berkapasiti besar 17 liter. Sesuai untuk keluarga besar dan pejabat.",
      en: "AIHAA BIG — stand-floor water purifier with a large 17-litre capacity. Suitable for big families and offices.",
    },
    price: "RM1,280",
    badge: "popular",
    mainImage: "/images/products/big/main.jpg",
    gallery: ["/images/products/big/main.jpg", "/images/products/big/specs.jpg"],
    specs: [
      { label: "Tahap Penapisan", value: "4 Tahap" },
      { label: "Kapasiti Tangki", value: "17 Liter" },
      { label: "Rekaan", value: "Stand Floor" },
      { label: "Sesuai Untuk", value: "Keluarga Besar" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Kapasiti Besar — 17 Liter",
      "4 Tahap Penapisan",
      "Rekaan Kompak Stand Floor",
      "Sesuai untuk keluarga besar",
      "Percuma pemasangan & penghantaran",
      "Waranti 2 tahun",
    ],
    seo: {
      titleBm: "AIHAA BIG | Kapasiti Besar 17 Liter",
      descriptionBm:
        "AIHAA BIG — kapasiti besar 17 liter. RM1,280. Sekali bayar, pemasangan percuma, waranti 2 tahun.",
    },
  },
  {
    slug: "aihaa-ean",
    name: "AIHAA EAN",
    category: "indoor",
    tagline: {
      bm: "Pilihan Bajet dengan Digital Feature",
      en: "Budget Pick with Digital Features",
    },
    description: {
      bm: "AIHAA EAN — pilihan bajet dengan digital feature. Kapasiti tangki 7.5 liter. Mudah dipasang.",
      en: "AIHAA EAN — budget pick with digital features. 7.5-litre tank. Easy to install.",
    },
    price: "RM780",
    oldPrice: "RM867",
    badge: "sale",
    mainImage: "/images/products/ean/main.png",
    gallery: [
      "/images/products/ean/main.png",
      "/images/products/ean/colors.jpg",
      "/images/products/ean/features.jpg",
      "/images/products/ean/specs.jpg",
    ],
    variants: [
      { slug: "white", label: "White", image: "/images/products/ean/white.jpg" },
      { slug: "pink", label: "Pink", image: "/images/products/ean/pink.jpg" },
      { slug: "beige", label: "Beige", image: "/images/products/ean/beige.jpg" },
    ],
    specs: [
      { label: "Tahap Penapisan", value: "4 Tahap" },
      { label: "Kapasiti Tangki", value: "7.5 Liter" },
      { label: "Ciri Khas", value: "Digital Display" },
      { label: "Pemasangan", value: "Mudah" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Harga Bajet",
      "4 Tahap Penapisan",
      "Pemasangan Mudah",
      "Digital Display",
      "Kapasiti Tangki 7.5 Liter",
      "Percuma pemasangan & waranti 2 tahun",
    ],
    seo: {
      titleBm: "AIHAA EAN | Digital Feature Bajet",
      descriptionBm:
        "AIHAA EAN — pilihan bajet dengan digital feature. RM780. Sekali bayar, pemasangan percuma, waranti 2 tahun.",
    },
  },
  {
    slug: "aihaa-fancy",
    name: "AIHAA FANCY",
    category: "indoor",
    tagline: {
      bm: "Rekaan Slim Moden dengan 3 Tangki",
      en: "Slim Modern Design with 3 Tanks",
    },
    description: {
      bm: "AIHAA FANCY — rekaan slim moden dengan 3 tangki berasingan. Operasi senyap, sesuai untuk mana-mana ruang.",
      en: "AIHAA FANCY — slim modern design with 3 separate tanks. Silent operation, fits any space.",
    },
    price: "RM999",
    mainImage: "/images/products/fancy/main.jpg",
    gallery: [
      "/images/products/fancy/main.jpg",
      "/images/products/fancy/features.jpg",
      "/images/products/fancy/safety.png",
    ],
    specs: [
      { label: "Tahap Penapisan", value: "4 Tahap" },
      { label: "Rekaan", value: "Slim Moden" },
      { label: "Tangki", value: "3 Berasingan" },
      { label: "Operasi", value: "Senyap" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Rekaan Slim Moden",
      "4 Tahap Penapisan",
      "3 Tangki Berasingan",
      "Operasi Senyap",
      "Percuma pemasangan & penghantaran",
      "Waranti 2 tahun",
    ],
    seo: {
      titleBm: "AIHAA FANCY | Slim Moden 3 Tangki",
      descriptionBm:
        "AIHAA FANCY — rekaan slim moden dengan 3 tangki. RM999. Sekali bayar, pemasangan percuma, waranti 2 tahun.",
    },
  },
  {
    slug: "aihaa-winter",
    name: "AIHAA WINTER",
    category: "indoor",
    tagline: {
      bm: "Premium dengan Ice Maker & Teknologi Baru",
      en: "Premium with Ice Maker & Latest Tech",
    },
    description: {
      bm: "AIHAA WINTER — model premium dengan fungsi ice maker dan teknologi terbaru. Pilihan terbaik untuk yang mahukan kualiti premium.",
      en: "AIHAA WINTER — premium model with ice maker and the latest technology. Top pick for premium quality.",
    },
    price: "RM1,580",
    badge: "premium",
    // WINTER's defining feature — surface on CapacityFunctionalities
    capacityOptions: ["coffee", "tea", "baby", "cold", "ambient", "ice"],
    mainImage: "/images/products/winter/main.png",
    gallery: [
      "/images/products/winter/main.png",
      "/images/products/winter/poster.png",
      "/images/products/winter/specs.png",
    ],
    specs: [
      { label: "Tahap Penapisan", value: "4 Tahap" },
      { label: "Ciri Khas", value: "Ice Maker" },
      { label: "Teknologi", value: "Terbaru" },
      { label: "Kualiti", value: "Premium" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Kualiti Premium",
      "4 Tahap Penapisan",
      "Fungsi Ice Maker",
      "Teknologi Terbaru",
      "Percuma pemasangan & penghantaran",
      "Waranti 2 tahun",
    ],
    seo: {
      titleBm: "AIHAA WINTER | Premium Ice Maker",
      descriptionBm:
        "AIHAA WINTER — premium dengan ice maker. RM1,580. Sekali bayar, pemasangan percuma, waranti 2 tahun.",
    },
  },
  // ─────────────────────── OUTDOOR ───────────────────────
  {
    slug: "ultra-one",
    name: "ULTRA ONE",
    category: "outdoor",
    tagline: {
      bm: "All-in-One Direct Minum",
      en: "All-in-One Direct Drink",
    },
    description: {
      bm: "ULTRA ONE — model premium dengan unlimited flow capacity. All-in-one system yang boleh direct minum.",
      en: "ULTRA ONE — premium model with unlimited flow capacity. All-in-one system that delivers direct drinking water.",
    },
    price: "RM399",
    badge: "best-value",
    mainImage: "/images/products/ultra-one/main.jpg",
    gallery: [
      "/images/products/ultra-one/main.jpg",
      "/images/products/ultra-one/filter.jpg",
      "/images/products/ultra-one/service.jpg",
      "/images/products/ultra-one/specs.jpg",
    ],
    specs: [
      { label: "Model", value: "Premium" },
      { label: "Kadar Aliran", value: "Unlimited" },
      { label: "Sistem", value: "All-in-One" },
      { label: "Kegunaan", value: "Direct Minum" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Model Premium",
      "Kadar Aliran Tanpa Had",
      "Sistem All-in-One",
      "Boleh Direct Minum",
      "Percuma pemasangan & penghantaran",
      "Waranti 2 tahun",
    ],
    seo: {
      titleBm: "ULTRA ONE | All-in-One Direct Minum",
      descriptionBm:
        "ULTRA ONE — all-in-one direct minum. RM399. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "fiber-9x42",
    name: "FIBER 9X42",
    category: "outdoor",
    tagline: {
      bm: "Tangki Fiber Tahan Lasak",
      en: "Rugged Fiber Tank",
    },
    description: {
      bm: "FIBER 9X42 — tangki fiber anti-karat yang tahan lasak. Mudah diselenggara.",
      en: "FIBER 9X42 — rust-proof fiber tank built to last. Easy to maintain.",
    },
    price: "RM399",
    mainImage: "/images/products/fiber/main.jpg",
    gallery: ["/images/products/fiber/main.jpg"],
    specs: [
      { label: "Jenis Tangki", value: "Fiber" },
      { label: "Bahan", value: "Anti-Karat" },
      { label: "Penyelenggaraan", value: "Mudah" },
      { label: "Waranti", value: "1 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Tangki Fiber",
      "Anti-Karat",
      "Penyelenggaraan Mudah",
      "Tahan Lasak",
      "Percuma pemasangan & penghantaran",
    ],
    seo: {
      titleBm: "FIBER 9X42 | Tangki Fiber Tahan Lasak",
      descriptionBm:
        "FIBER 9X42 — tangki fiber tahan lasak. RM399. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "fiber-10x44",
    name: "FIBER 10X44",
    category: "outdoor",
    tagline: {
      bm: "Tangki Fiber Besar 10x44",
      en: "Large 10x44 Fiber Tank",
    },
    description: {
      bm: "FIBER 10X44 — tangki fiber besar saiz 10x44 inci. Tahan lama dan anti-karat.",
      en: "FIBER 10X44 — large 10x44-inch fiber tank. Durable and rust-proof.",
    },
    price: "RM469",
    mainImage: "/images/products/fiber-10x44/main.png",
    gallery: ["/images/products/fiber-10x44/main.png"],
    specs: [
      { label: "Saiz Tangki", value: "10 x 44 Inci" },
      { label: "Ketahanan", value: "Tahan Lama" },
      { label: "Bahan", value: "Anti-Karat" },
      { label: "Penyelenggaraan", value: "Mudah" },
      { label: "Waranti", value: "1 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Tangki Fiber Besar 10x44",
      "Tahan Lama",
      "Anti-Karat",
      "Penyelenggaraan Mudah",
      "Percuma pemasangan & penghantaran",
    ],
    seo: {
      titleBm: "FIBER 10X44 | Tangki Fiber Besar",
      descriptionBm:
        "FIBER 10X44 — tangki fiber besar. RM469. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "penapis-boring-13x54",
    name: "PENAPIS BORING 13X54",
    category: "outdoor",
    tagline: {
      bm: "Khas Untuk Air Bawah Tanah",
      en: "Built for Borehole Water",
    },
    description: {
      bm: "PENAPIS BORING 13X54 — khas untuk air bawah tanah (boring). Penapisan pelbagai tahap dengan penapis khas.",
      en: "PENAPIS BORING 13X54 — purpose-built for borehole (underground) water. Multi-stage filtration with specialty media.",
    },
    price: "RM1,180",
    mainImage: "/images/products/penapis-boring/main.jpg",
    gallery: ["/images/products/penapis-boring/main.jpg"],
    specs: [
      { label: "Saiz Tangki", value: "13 x 54 Inci" },
      { label: "Kegunaan", value: "Air Boring" },
      { label: "Penapisan", value: "Pelbagai Tahap" },
      { label: "Penapis", value: "Penapis Khas" },
      { label: "Waranti", value: "1 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Penapis Air Boring",
      "Kapasiti Besar",
      "Penapisan Pelbagai Tahap dengan Penapis Khas",
      "Tahan Lama",
      "Anti-Karat",
      "Percuma pemasangan & penghantaran",
    ],
    seo: {
      titleBm: "PENAPIS BORING 13X54 | Air Bawah Tanah",
      descriptionBm:
        "PENAPIS BORING 13X54 — khas untuk air bawah tanah. RM1,180. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "pvdf",
    name: "PVDF",
    category: "outdoor",
    tagline: {
      bm: "Material PVDF Gred Profesional",
      en: "Professional-Grade PVDF Material",
    },
    description: {
      bm: "PVDF — material gred profesional dengan kadar aliran 5000L/jam. Tahan kimia.",
      en: "PVDF — professional-grade material with 5000 L/hour flow rate. Chemical-resistant.",
    },
    price: "RM899",
    badge: "pro-grade",
    mainImage: "/images/products/pvdf/main.jpg",
    gallery: [
      "/images/products/pvdf/main.jpg",
      "/images/products/pvdf/specs.jpg",
    ],
    specs: [
      { label: "Material", value: "PVDF" },
      { label: "Ketahanan", value: "Tahan Kimia" },
      { label: "Kadar Aliran", value: "5000 L/Jam" },
      { label: "Gred", value: "Profesional" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Material PVDF",
      "Tahan Kimia",
      "Kadar Aliran 5000L/Jam",
      "Gred Profesional",
      "Percuma pemasangan & penghantaran",
      "Waranti 2 tahun",
    ],
    seo: {
      titleBm: "PVDF | Gred Profesional",
      descriptionBm:
        "PVDF — material gred profesional 5000L/jam. RM899. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "pvdf-plus",
    name: "PVDF PLUS",
    category: "outdoor",
    tagline: {
      bm: "PVDF Dipertingkat 6000L/Hour",
      en: "Enhanced PVDF — 6000 L/Hour",
    },
    description: {
      bm: "PVDF PLUS — versi dipertingkat dengan kadar aliran 6000L/jam. Penapis premium dengan jangka hayat panjang.",
      en: "PVDF PLUS — enhanced variant with 6000 L/hour flow rate. Premium filter with a long service life.",
    },
    price: "RM1,299",
    badge: "premium",
    mainImage: "/images/products/pvdf-plus/main.jpg",
    gallery: [
      "/images/products/pvdf-plus/main.jpg",
      "/images/products/pvdf-plus/specs.jpg",
    ],
    specs: [
      { label: "Material", value: "PVDF Dipertingkat" },
      { label: "Kadar Aliran", value: "6000 L/Jam" },
      { label: "Penapis", value: "Premium" },
      { label: "Jangka Hayat", value: "Panjang" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "PVDF Dipertingkat",
      "Kadar Aliran 6000L/Jam",
      "Penapis Premium",
      "Jangka Hayat Panjang",
      "Gred Profesional",
      "Percuma pemasangan & penghantaran",
    ],
    seo: {
      titleBm: "PVDF PLUS | 6000L/Hour",
      descriptionBm:
        "PVDF PLUS — dipertingkat 6000L/jam. RM1,299. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "super-pleated",
    name: "SUPER PLEATED",
    category: "outdoor",
    tagline: {
      bm: "Kadar Aliran Tinggi & Kompak",
      en: "High Flow Rate & Compact",
    },
    description: {
      bm: "SUPER PLEATED — penapis pleated dengan kadar aliran tinggi. Saiz kompak dan kos efektif.",
      en: "SUPER PLEATED — pleated filter with a high flow rate. Compact and cost-effective.",
    },
    price: "RM580",
    mainImage: "/images/products/super-pleated/main.jpg",
    gallery: ["/images/products/super-pleated/main.jpg"],
    specs: [
      { label: "Jenis Penapis", value: "Pleated" },
      { label: "Kadar Aliran", value: "Tinggi" },
      { label: "Saiz", value: "Kompak" },
      { label: "Kos", value: "Efektif" },
      { label: "Waranti", value: "1 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Penapis Pleated",
      "Kadar Aliran Tinggi",
      "Saiz Kompak",
      "Kos Efektif",
      "Percuma pemasangan & penghantaran",
    ],
    seo: {
      titleBm: "SUPER PLEATED | Kadar Aliran Tinggi",
      descriptionBm:
        "SUPER PLEATED — kadar aliran tinggi dan kompak. RM580. Sekali bayar, pemasangan percuma.",
    },
  },
  {
    slug: "uf-double-backwash",
    name: "UF DOUBLE BACKWASH",
    category: "outdoor",
    tagline: {
      bm: "Membran UF dengan Dual Backwash",
      en: "UF Membrane with Dual Backwash",
    },
    description: {
      bm: "UF DOUBLE BACKWASH — membran UF dengan dual backwash dan pembersihan automatik. Kadar aliran 4000L/jam.",
      en: "UF DOUBLE BACKWASH — UF membrane with dual backwash and automatic cleaning. 4000 L/hour flow rate.",
    },
    price: "RM799",
    oldPrice: "RM888",
    badge: "sale",
    mainImage: "/images/products/uf-double-backwash/main.jpg",
    gallery: [
      "/images/products/uf-double-backwash/main.jpg",
      "/images/products/uf-double-backwash/specs.png",
    ],
    specs: [
      { label: "Teknologi", value: "Membran UF" },
      { label: "Backwash", value: "Sistem Dual" },
      { label: "Kadar Aliran", value: "4000 L/Jam" },
      { label: "Pembersihan", value: "Automatik" },
      { label: "Waranti", value: "2 Tahun" },
      { label: "Pemasangan", value: "Percuma" },
    ],
    features: [
      "Membran UF",
      "Dual Backwash",
      "Kadar Aliran 4000L/Jam",
      "Pembersihan Automatik",
      "Saiz Kompak",
      "Percuma pemasangan & penghantaran",
    ],
    seo: {
      titleBm: "UF DOUBLE BACKWASH | Membran UF",
      descriptionBm:
        "UF DOUBLE BACKWASH — membran UF dengan dual backwash. RM799. Sekali bayar, pemasangan percuma.",
    },
  },
];

export const indoorProducts = products.filter(
  (p) => p.category === "indoor"
);

export const outdoorProducts = products.filter(
  (p) => p.category === "outdoor"
);

export const productsBySlug: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.slug, p])
);

export const getProductBySlug = (slug: string): Product | undefined =>
  productsBySlug[slug];

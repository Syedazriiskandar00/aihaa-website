"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import { Check } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl } from "@/lib/config/contact";

const products: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    price: string;
    oldPrice?: string;
    category: "indoor" | "outdoor";
    image: string;
    specs: { label: string; value: string }[];
    features: string[];
  }
> = {
  "aihaa-bella": {
    name: "AIHAA BELLA",
    tagline: "Rekaan Kompak Stand Floor",
    description:
      "AIHAA BELLA — penapis air berdiri dengan 4 tahap penapisan dan teknologi mineral alkali. Kapasiti tangki 9.5 liter. Rekaan kompak stand floor.",
    price: "RM1,080",
    category: "indoor",
    image: "/images/products/bella/main.jpg",
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
  },
  "aihaa-big": {
    name: "AIHAA BIG",
    tagline: "Kapasiti Besar 17 Liter",
    description:
      "AIHAA BIG — penapis air berdiri berkapasiti besar 17 liter. Sesuai untuk keluarga besar dan pejabat.",
    price: "RM1,280",
    category: "indoor",
    image: "/images/products/big/main.jpg",
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
  },
  "aihaa-ean": {
    name: "AIHAA EAN",
    tagline: "Pilihan Bajet dengan Digital Feature",
    description:
      "AIHAA EAN — pilihan bajet dengan digital feature. Kapasiti tangki 7.5 liter. Mudah dipasang.",
    price: "RM780",
    oldPrice: "RM867",
    category: "indoor",
    image: "/images/products/ean/main.png",
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
  },
  "aihaa-fancy": {
    name: "AIHAA FANCY",
    tagline: "Rekaan Slim Moden dengan 3 Tangki",
    description:
      "AIHAA FANCY — rekaan slim moden dengan 3 tangki berasingan. Operasi senyap, sesuai untuk mana-mana ruang.",
    price: "RM999",
    category: "indoor",
    image: "/images/products/fancy/main.jpg",
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
  },
  "aihaa-winter": {
    name: "AIHAA WINTER",
    tagline: "Premium dengan Ice Maker & Teknologi Baru",
    description:
      "AIHAA WINTER — model premium dengan fungsi ice maker dan teknologi terbaru. Pilihan terbaik untuk yang mahukan kualiti premium.",
    price: "RM1,580",
    category: "indoor",
    image: "/images/products/winter/main.png",
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
  },
  "ultra-one": {
    name: "ULTRA ONE",
    tagline: "All-in-One Direct Minum",
    description:
      "ULTRA ONE — model premium dengan unlimited flow capacity. All-in-one system yang boleh direct minum.",
    price: "RM399",
    category: "outdoor",
    image: "/images/products/ultra-one/main.jpg",
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
  },
  "fiber-9x42": {
    name: "FIBER 9X42",
    tagline: "Tangki Fiber Tahan Lasak",
    description:
      "FIBER 9X42 — tangki fiber anti-karat yang tahan lasak. Mudah diselenggara.",
    price: "RM399",
    category: "outdoor",
    image: "/images/products/fiber/main.jpg",
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
  },
  "fiber-10x44": {
    name: "FIBER 10X44",
    tagline: "Tangki Fiber Besar 10x44",
    description:
      "FIBER 10X44 — tangki fiber besar saiz 10x44 inci. Tahan lama dan anti-karat.",
    price: "RM469",
    category: "outdoor",
    image: "/images/products/fiber-10x44/main.png",
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
  },
  "penapis-boring-13x54": {
    name: "PENAPIS BORING 13X54",
    tagline: "Khas Untuk Air Bawah Tanah",
    description:
      "PENAPIS BORING 13X54 — khas untuk air bawah tanah (boring). Penapisan pelbagai tahap dengan penapis khas.",
    price: "RM1,180",
    category: "outdoor",
    image: "/images/products/penapis-boring/main.jpg",
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
  },
  pvdf: {
    name: "PVDF",
    tagline: "Material PVDF Gred Profesional",
    description:
      "PVDF — material gred profesional dengan kadar aliran 5000L/jam. Tahan kimia.",
    price: "RM899",
    category: "outdoor",
    image: "/images/products/pvdf/main.jpg",
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
  },
  "pvdf-plus": {
    name: "PVDF PLUS",
    tagline: "PVDF Dipertingkat 6000L/Hour",
    description:
      "PVDF PLUS — versi dipertingkat dengan kadar aliran 6000L/jam. Penapis premium dengan jangka hayat panjang.",
    price: "RM1,299",
    category: "outdoor",
    image: "/images/products/pvdf-plus/main.jpg",
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
  },
  "super-pleated": {
    name: "SUPER PLEATED",
    tagline: "Kadar Aliran Tinggi & Kompak",
    description:
      "SUPER PLEATED — penapis pleated dengan kadar aliran tinggi. Saiz kompak dan kos efektif.",
    price: "RM580",
    category: "outdoor",
    image: "/images/products/super-pleated/main.jpg",
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
  },
  "uf-double-backwash": {
    name: "UF DOUBLE BACKWASH",
    tagline: "Membran UF dengan Dual Backwash",
    description:
      "UF DOUBLE BACKWASH — membran UF dengan dual backwash dan pembersihan automatik. Kadar aliran 4000L/jam.",
    price: "RM799",
    oldPrice: "RM888",
    category: "outdoor",
    image: "/images/products/uf-double-backwash/main.jpg",
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
  },
};

const relatedIndoor = [
  {
    id: "aihaa-bella",
    name: "AIHAA BELLA",
    tagline: "Rekaan Kompak Stand Floor",
    price: "RM1,080",
    image: "/images/products/bella/main.jpg",
  },
  {
    id: "aihaa-ean",
    name: "AIHAA EAN",
    tagline: "Pilihan Bajet Digital",
    price: "RM780",
    image: "/images/products/ean/main.png",
  },
  {
    id: "aihaa-winter",
    name: "AIHAA WINTER",
    tagline: "Premium Ice Maker",
    price: "RM1,580",
    image: "/images/products/winter/main.png",
  },
];

const relatedOutdoor = [
  {
    id: "pvdf",
    name: "PVDF",
    tagline: "Gred Profesional",
    price: "RM899",
    image: "/images/products/pvdf/main.jpg",
  },
  {
    id: "fiber-9x42",
    name: "FIBER 9X42",
    tagline: "Tangki Fiber",
    price: "RM399",
    image: "/images/products/fiber/main.jpg",
  },
  {
    id: "uf-double-backwash",
    name: "UF DOUBLE BACKWASH",
    tagline: "Membran UF",
    price: "RM799",
    image: "/images/products/uf-double-backwash/main.jpg",
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useLanguage();
  const product = products[id] || products["aihaa-bella"];
  const related =
    product.category === "indoor" ? relatedIndoor : relatedOutdoor;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Product Hero - Dark section */}
      <section className="pt-20 pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="bg-dark-alt/50 backdrop-blur-sm rounded-3xl p-8 border border-[rgba(218,165,32,0.3)] overflow-hidden">
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)] mb-4">
                {product.category === "indoor"
                  ? "Penapis Air Dalam Rumah"
                  : "Penapis Air Luar Rumah"}
              </span>
              <h1 className="font-editorial text-4xl md:text-6xl text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gold text-xl mb-4">{product.tagline}</p>
              <p className="text-muted-dark mb-6">{product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-gold text-4xl font-bold">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-muted-dark text-xl line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              {/* USP Badge Strip */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 text-sm text-[#DAA520] border border-[#DAA520] rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t.detail_badge_sekali}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#DAA520] border border-[#DAA520] rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {t.detail_badge_install}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#DAA520] border border-[#DAA520] rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  {t.detail_badge_warranty}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl(t.common_whatsapp_message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 gold-gradient-bg text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold btn-shimmer"
                >
                  {t.detail_cta_buy}
                </a>
                <Link
                  href="/water-purifier"
                  className="inline-flex items-center justify-center border-2 border-[rgba(218,165,32,0.3)] text-gold px-8 py-4 rounded-full font-semibold hover:bg-gold/10 transition-all"
                >
                  {t.detail_cta_all}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spesifikasi */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-[2px] bg-[#DAA520] mb-6" />
          <h2 className="text-2xl font-bold text-dark mb-8">{t.detail_specs}</h2>
          <div className="bg-white rounded-2xl border border-[rgba(218,165,32,0.15)] overflow-hidden">
            {product.specs.map((spec, index) => (
              <div
                key={index}
                className={`flex justify-between p-4 ${
                  index === 0
                    ? "bg-[rgba(218,165,32,0.1)]"
                    : index % 2 === 1
                    ? "bg-[#FFFDE7]"
                    : "bg-white"
                } ${
                  index !== product.specs.length - 1
                    ? "border-b border-[rgba(0,0,0,0.04)]"
                    : ""
                }`}
              >
                <span className={index === 0 ? "text-dark font-medium" : "text-muted"}>{spec.label}</span>
                <span className={index === 0 ? "text-[#DAA520] font-bold" : "text-dark font-medium"}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ciri-ciri Utama */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-8">
            {t.detail_features}
          </h2>
          {/* Featured first feature */}
          {product.features.length > 0 && (
            <div className="bg-[#0D0D0D] rounded-2xl p-6 lg:p-8 mb-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#DAA520]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-[#DAA520]" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{product.features[0]}</p>
                <p className="text-[#999] text-sm mt-1">Ciri utama {product.name}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.slice(1).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-[rgba(218,165,32,0.1)]"
              >
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <span className="text-dark">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Berkaitan */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark mb-8">
            {t.detail_related}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

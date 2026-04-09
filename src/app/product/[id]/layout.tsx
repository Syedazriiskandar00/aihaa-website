import type { Metadata } from "next";

const productMeta: Record<string, { title: string; description: string }> = {
  "aihaa-bella": { title: "AIHAA BELLA | Penapis Air Stand Floor", description: "AIHAA BELLA — rekaan kompak stand floor. RM1,080. Sekali bayar, pemasangan percuma, waranti 2 tahun." },
  "aihaa-big": { title: "AIHAA BIG | Kapasiti Besar 17 Liter", description: "AIHAA BIG — kapasiti besar 17 liter. RM1,280. Sekali bayar, pemasangan percuma, waranti 2 tahun." },
  "aihaa-ean": { title: "AIHAA EAN | Digital Feature Bajet", description: "AIHAA EAN — pilihan bajet dengan digital feature. RM780. Sekali bayar, pemasangan percuma, waranti 2 tahun." },
  "aihaa-fancy": { title: "AIHAA FANCY | Slim Moden 3 Tangki", description: "AIHAA FANCY — rekaan slim moden dengan 3 tangki. RM999. Sekali bayar, pemasangan percuma, waranti 2 tahun." },
  "aihaa-winter": { title: "AIHAA WINTER | Premium Ice Maker", description: "AIHAA WINTER — premium dengan ice maker. RM1,580. Sekali bayar, pemasangan percuma, waranti 2 tahun." },
  "ultra-one": { title: "ULTRA ONE | All-in-One Direct Minum", description: "ULTRA ONE — all-in-one direct minum. RM399. Sekali bayar, pemasangan percuma." },
  "fiber-9x42": { title: "FIBER 9X42 | Tangki Fiber Tahan Lasak", description: "FIBER 9X42 — tangki fiber tahan lasak. RM399. Sekali bayar, pemasangan percuma." },
  "fiber-10x44": { title: "FIBER 10X44 | Tangki Fiber Besar", description: "FIBER 10X44 — tangki fiber besar. RM469. Sekali bayar, pemasangan percuma." },
  "penapis-boring-13x54": { title: "PENAPIS BORING 13X54 | Air Bawah Tanah", description: "PENAPIS BORING 13X54 — khas untuk air bawah tanah. RM1,180. Sekali bayar, pemasangan percuma." },
  pvdf: { title: "PVDF | Gred Profesional", description: "PVDF — material gred profesional 5000L/jam. RM899. Sekali bayar, pemasangan percuma." },
  "pvdf-plus": { title: "PVDF PLUS | 6000L/Hour", description: "PVDF PLUS — dipertingkat 6000L/jam. RM1,299. Sekali bayar, pemasangan percuma." },
  "super-pleated": { title: "SUPER PLEATED | Kadar Aliran Tinggi", description: "SUPER PLEATED — kadar aliran tinggi dan kompak. RM580. Sekali bayar, pemasangan percuma." },
  "uf-double-backwash": { title: "UF DOUBLE BACKWASH | Membran UF", description: "UF DOUBLE BACKWASH — membran UF dengan dual backwash. RM799. Sekali bayar, pemasangan percuma." },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const meta = productMeta[id] || { title: "Produk AIHAA", description: "Penapis air premium AIHAA." };
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

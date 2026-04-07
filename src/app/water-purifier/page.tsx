import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import BenefitsSection from "@/components/BenefitsSection";

const indoorProducts = [
  { id: "aihaa-bella", name: "AIHAA BELLA", tagline: "Rekaan Kompak Stand Floor", price: "RM1,080", image: "/images/products/bella/main.jpg" },
  { id: "aihaa-big", name: "AIHAA BIG", tagline: "Kapasiti Besar 17 Liter", price: "RM1,280", image: "/images/products/big/main.jpg", badge: "popular" as const },
  { id: "aihaa-ean", name: "AIHAA EAN", tagline: "Pilihan Bajet dengan Digital Feature", price: "RM780", oldPrice: "RM867", image: "/images/products/ean/main.png", badge: "sale" as const },
  { id: "aihaa-fancy", name: "AIHAA FANCY", tagline: "Rekaan Slim Moden dengan 3 Tangki", price: "RM999", image: "/images/products/fancy/main.jpg" },
  { id: "aihaa-winter", name: "AIHAA WINTER", tagline: "Premium dengan Ice Maker & Teknologi Baru", price: "RM1,580", image: "/images/products/winter/main.png", badge: "premium" as const },
];

const outdoorProducts = [
  { id: "ultra-one", name: "ULTRA ONE", tagline: "All-in-One Direct Minum", price: "RM399", image: "/images/products/ultra-one/main.jpg", badge: "best-value" as const },
  { id: "fiber-9x42", name: "FIBER 9X42", tagline: "Tangki Fiber Tahan Lasak", price: "RM399", image: "/images/products/fiber/main.jpg" },
  { id: "fiber-10x44", name: "FIBER 10X44", tagline: "Tangki Fiber Besar 10x44", price: "RM469", image: "/images/products/fiber-10x44/main.png" },
  { id: "penapis-boring-13x54", name: "PENAPIS BORING 13X54", tagline: "Khas Untuk Air Bawah Tanah", price: "RM1,180", image: "/images/products/penapis-boring/main.jpg" },
  { id: "pvdf", name: "PVDF", tagline: "Material PVDF Gred Profesional", price: "RM899", image: "/images/products/pvdf/main.jpg", badge: "pro-grade" as const },
  { id: "pvdf-plus", name: "PVDF PLUS", tagline: "PVDF Dipertingkat 6000L/Hour", price: "RM1,299", image: "/images/products/pvdf-plus/main.jpg", badge: "premium" as const },
  { id: "super-pleated", name: "SUPER PLEATED", tagline: "Kadar Aliran Tinggi & Kompak", price: "RM580", image: "/images/products/super-pleated/main.jpg" },
  { id: "uf-double-backwash", name: "UF DOUBLE BACKWASH", tagline: "Membran UF dengan Dual Backwash", price: "RM799", oldPrice: "RM888", image: "/images/products/uf-double-backwash/main.jpg", badge: "sale" as const },
];

export default function WaterPurifierPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-20 pb-16 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-[rgba(218,165,32,0.3)] mb-4">
              Penapis Air Premium
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Penapis <span className="gold-gradient-text">Air</span>
            </h1>
            <p className="text-muted-dark text-lg max-w-2xl mx-auto">
              Koleksi lengkap penapis air berkualiti tinggi untuk keluarga anda.
              Sekali bayar, tanpa komitmen bulanan.
            </p>
          </div>
        </div>
      </section>

      <BenefitsSection />

      {/* Indoor Products */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Penapis Air <span className="gold-gradient-text">Dalam Rumah</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Penapis air meja dan berdiri untuk rumah dan pejabat anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {indoorProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor Products */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Penapis Air <span className="gold-gradient-text">Luar Rumah</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Sistem penapisan air luar untuk keseluruhan rumah anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {outdoorProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

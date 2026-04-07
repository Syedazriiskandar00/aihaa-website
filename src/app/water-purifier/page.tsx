import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import BenefitsSection from "@/components/BenefitsSection";

const allProducts = [
  { id: "neon", name: "Neon", tagline: "Compact & Stylish", price: "RM54", badge: "new" as const },
  { id: "neo-plus", name: "Neo Plus", tagline: "Advanced Filtration", price: "RM59" },
  { id: "cinnamon", name: "Cinnamon", tagline: "Budget Friendly", price: "RM32", badge: "limited" as const },
  { id: "dazzie", name: "Dazzie", tagline: "Premium Design", price: "RM79" },
  { id: "villaem-iii", name: "Villaem III", tagline: "Family Size", price: "RM74", badge: "bestseller" as const },
  { id: "glaze", name: "Glaze", tagline: "Sleek Modern", price: "RM75" },
  { id: "core-plus", name: "Core Plus", tagline: "High Performance", price: "RM93" },
  { id: "harry", name: "Harry", tagline: "Smart Technology", price: "RM83", badge: "new" as const },
  { id: "ombak", name: "Ombak", tagline: "Wave Series", price: "RM90" },
  { id: "ais", name: "AIS", tagline: "Ice Cold Water", price: "RM120" },
  { id: "inception", name: "Inception", tagline: "Next Generation", price: "RM144", badge: "new" as const },
  { id: "lucy-plus", name: "Lucy Plus", tagline: "Ultimate Premium", price: "RM150", badge: "limited" as const },
  { id: "outdoor-filter", name: "Outdoor Filter", tagline: "Whole House Solution", price: "RM60" },
];

export default function WaterPurifierPage() {
  return (
    <main className="min-h-screen bg-navy-primary">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-navy-primary to-navy-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #D4A843 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center">
            <span className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium border border-gold/30 mb-4">
              Premium Water Purification
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Water <span className="gold-gradient-text">Purifiers</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Discover our complete range of advanced water purification systems.
              Pure water for a healthier life.
            </p>
          </div>
        </div>
      </section>

      <BenefitsSection />

      {/* All Products Grid */}
      <section className="bg-navy-primary py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              All <span className="gold-gradient-text">Products</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Find the perfect water purifier for your home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product) => (
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

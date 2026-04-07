import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ProductCard from "@/components/ProductCard";
import { Check } from "lucide-react";

const products: Record<string, {
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: string;
  retailPrice: string;
  specs: { label: string; value: string }[];
  features: string[];
  gradient: string;
  angle: number;
}> = {
  neon: {
    name: "Neon",
    tagline: "Compact & Stylish",
    description: "The Neon water purifier combines modern aesthetics with powerful filtration technology. Perfect for small spaces and modern homes.",
    monthlyPrice: "RM54",
    retailPrice: "RM2,988",
    specs: [
      { label: "Dimensions", value: "260 x 180 x 460mm" },
      { label: "Weight", value: "8.5kg" },
      { label: "Tank Capacity", value: "3.0L" },
      { label: "Filtration", value: "4-Stage RO" },
      { label: "Power", value: "80W" },
    ],
    features: [
      "4-stage reverse osmosis filtration",
      "Hot, cold, and room temperature water",
      "Child safety lock for hot water",
      "LED display with temperature indicator",
      "Auto sterilization function",
      "Energy-saving eco mode",
    ],
    gradient: "from-[#0D1E35] via-navy-secondary to-[#152A4A]",
    angle: 135,
  },
  "villaem-iii": {
    name: "Villaem III",
    tagline: "Family Size",
    description: "The Villaem III is designed for larger families, featuring a high-capacity tank and advanced filtration system.",
    monthlyPrice: "RM74",
    retailPrice: "RM4,288",
    specs: [
      { label: "Dimensions", value: "320 x 220 x 520mm" },
      { label: "Weight", value: "12kg" },
      { label: "Tank Capacity", value: "5.0L" },
      { label: "Filtration", value: "6-Stage RO+UV" },
      { label: "Power", value: "120W" },
    ],
    features: [
      "6-stage filtration with UV sterilization",
      "Large 5L tank capacity",
      "Touch panel control",
      "Smart water quality indicator",
      "Self-cleaning function",
      "Quiet operation technology",
    ],
    gradient: "from-navy-light via-[#1A3050] to-navy-secondary",
    angle: 180,
  },
  "neo-plus": {
    name: "Neo Plus",
    tagline: "Advanced Filtration",
    description: "Neo Plus offers enhanced filtration capabilities with a sleek design that fits any kitchen aesthetic.",
    monthlyPrice: "RM59",
    retailPrice: "RM3,288",
    specs: [
      { label: "Dimensions", value: "280 x 190 x 480mm" },
      { label: "Weight", value: "9.2kg" },
      { label: "Tank Capacity", value: "3.5L" },
      { label: "Filtration", value: "5-Stage RO" },
      { label: "Power", value: "90W" },
    ],
    features: [
      "5-stage reverse osmosis filtration",
      "Hot, cold, and ambient water",
      "Smart touch controls",
      "Filter change indicator",
      "Night mode with dimmed display",
      "Compact footprint design",
    ],
    gradient: "from-navy-primary via-navy-light to-navy-secondary",
    angle: 45,
  },
};

const relatedProducts = [
  { id: "neo-plus", name: "Neo Plus", tagline: "Advanced Filtration", price: "RM59" },
  { id: "glaze", name: "Glaze", tagline: "Sleek Modern", price: "RM75" },
  { id: "core-plus", name: "Core Plus", tagline: "High Performance", price: "RM93" },
];

const pricingOptions = [
  {
    title: "Option A",
    subtitle: "Rental Self-Service",
    price: "RM54",
    period: "/month",
    features: ["Free Installation", "Filter Replacement", "24/7 Support"],
    highlight: false,
  },
  {
    title: "Option B",
    subtitle: "Rental Heart-Service",
    price: "RM64",
    period: "/month",
    features: ["Free Installation", "Bi-monthly Maintenance", "Filter Replacement", "Priority Support"],
    highlight: true,
  },
  {
    title: "Option C",
    subtitle: "Retail Purchase",
    price: "RM2,988",
    period: "one-time",
    features: ["Free Installation", "1 Year Warranty", "Optional Maintenance Plan"],
    highlight: false,
  },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products[params.id] || products.neon;

  return (
    <main className="min-h-screen bg-navy-primary">
      <Header />

      {/* Product Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-navy-primary to-navy-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image Placeholder */}
            <div className="relative">
              <div className="bg-navy-secondary/50 backdrop-blur-sm rounded-3xl p-8 border border-gold/20 overflow-hidden">
                <div
                  className={`aspect-square bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                  style={{ backgroundImage: `linear-gradient(${product.angle}deg, var(--tw-gradient-stops))` }}
                >
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 67, 0.1) 1px, transparent 1px)`,
                      backgroundSize: "25px 25px",
                    }}
                  />

                  {/* Accent glows */}
                  <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gold opacity-10 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gold-light opacity-5 rounded-full blur-2xl" />

                  {/* Water Purifier Silhouette */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-44 h-60 bg-gradient-to-b from-white/15 to-white/5 rounded-xl border border-gold/30 backdrop-blur-sm relative overflow-hidden shadow-2xl">
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

                      {/* Display */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-12 bg-navy-primary/70 rounded-lg border border-gold/30 flex items-center justify-center">
                        <span className="text-gold font-mono text-xl">25°C</span>
                      </div>

                      {/* Buttons */}
                      <div className="absolute top-22 left-1/2 -translate-x-1/2 flex gap-3 mt-2">
                        <div className="w-3 h-3 rounded-full bg-gold shadow-lg shadow-gold/50" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                      </div>

                      {/* Dispenser */}
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-24 h-24 bg-navy-primary/40 rounded-lg border border-gold/20">
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3 bg-gold/30 rounded-full" />
                      </div>

                      {/* Side accent */}
                      <div className="absolute right-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
                    </div>

                    {/* Product Label */}
                    <div className="mt-6 px-8 py-3 bg-navy-primary/70 backdrop-blur-sm rounded-xl border border-gold/40">
                      <span className="text-gold font-bold text-xl tracking-wider">{product.name}</span>
                    </div>
                  </div>

                  {/* Decorative water drops */}
                  <div className="absolute top-10 right-10 w-3 h-4 bg-gold/30 rounded-full" />
                  <div className="absolute bottom-16 left-10 w-2 h-3 bg-gold/20 rounded-full" />
                  <div className="absolute top-1/2 right-14 w-2.5 h-3.5 bg-gold/25 rounded-full" />
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-gold text-navy-primary px-4 py-2 rounded-full font-bold text-sm shadow-gold">
                BESTSELLER
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium border border-gold/30 mb-4">
                Water Purifier
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gold text-xl mb-4">{product.tagline}</p>
              <p className="text-muted mb-6">{product.description}</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-gold text-4xl font-bold">{product.monthlyPrice}</span>
                <span className="text-muted">/month</span>
                <span className="text-muted ml-4">or {product.retailPrice} retail</span>
              </div>

              <a
                href={`https://wa.me/60123456789?text=Hi%20AIHAA,%20I'm%20interested%20in%20${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gold-gradient-bg text-navy-primary px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all hover:shadow-gold"
              >
                Check Promotion
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-navy-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Specifications</h2>
          <div className="bg-navy-primary/50 rounded-2xl border border-gold/20 overflow-hidden">
            {product.specs.map((spec, index) => (
              <div
                key={index}
                className={`flex justify-between p-4 ${index !== product.specs.length - 1 ? "border-b border-gold/10" : ""}`}
              >
                <span className="text-muted">{spec.label}</span>
                <span className="text-white font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-navy-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-navy-secondary/50 rounded-xl border border-gold/10">
                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="bg-navy-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Pricing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 ${option.highlight ? "bg-gold/10 border-2 border-gold" : "bg-navy-primary/50 border border-gold/20"}`}
              >
                {option.highlight && (
                  <span className="inline-block bg-gold text-navy-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
                    RECOMMENDED
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-muted text-sm mb-4">{option.subtitle}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-gold">{option.price}</span>
                  <span className="text-muted text-sm">{option.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="w-4 h-4 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/60123456789"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${option.highlight ? "gold-gradient-bg text-navy-primary" : "border border-gold text-gold hover:bg-gold hover:text-navy-primary"}`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-navy-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
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

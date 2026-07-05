import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/data/products";

// Price + rotating WhatsApp order CTA. Rendered once per product page,
// right before ProductServiceInfo, on all 12 products. Price is read
// straight from products.ts (pre-formatted strings like "RM1,080");
// oldPrice, when present (EAN, UF Double Backwash), shows struck through
// beside the current price. The button links to /api/wa/product, which
// rotates the lead server-side across the sales team on each click
// (separate KV counter from the chatbot) and 302-redirects to wa.me.

type Props = { product: Product };

export default function ProductOrderCta({ product }: Props) {
  return (
    <section className="bg-[#FAF7F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 rounded-2xl border border-black/5 bg-white px-6 py-10 sm:px-10 lg:px-12 text-center shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted font-semibold">
            Harga {product.name}
          </p>

          <div className="flex items-baseline justify-center gap-3">
            {product.oldPrice && (
              <span className="text-lg md:text-xl text-muted line-through">
                {product.oldPrice}
              </span>
            )}
            <span className="font-editorial text-4xl md:text-5xl text-dark leading-none">
              {product.price}
            </span>
          </div>

          <p className="text-[13.5px] leading-relaxed text-muted max-w-md">
            Sekali bayar, terus milik anda. WhatsApp kami sekarang untuk tempah
            atau tanya apa-apa soalan.
          </p>

          <a
            href={`/api/wa/product?id=${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3.5 rounded-full text-[13.5px] font-semibold tracking-wide hover:bg-gold-light transition-colors shadow-gold"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            Order melalui WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

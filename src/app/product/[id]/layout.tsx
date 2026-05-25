import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/data/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) {
    return {
      title: "Produk AIHAA",
      description: "Penapis air premium AIHAA.",
    };
  }
  return {
    title: product.seo.titleBm,
    description: product.seo.descriptionBm,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

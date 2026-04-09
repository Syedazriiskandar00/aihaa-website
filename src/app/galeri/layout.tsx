import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Pemasangan | AIHAA Water Purifier",
  description: "Lihat pemasangan penapis air AIHAA di rumah pelanggan seluruh Semenanjung Malaysia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

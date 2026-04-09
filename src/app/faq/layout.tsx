import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soalan Lazim | AIHAA Penapis Air Malaysia",
  description: "Jawapan kepada soalan lazim tentang AIHAA — harga, pemasangan, warranty, coverage. 10 soalan paling kerap ditanya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

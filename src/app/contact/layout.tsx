import type { Metadata } from "next";
import { PHONE_NUMBER_DISPLAY } from "@/lib/config/contact";

export const metadata: Metadata = {
  title: `Hubungi AIHAA | WhatsApp ${PHONE_NUMBER_DISPLAY}`,
  description:
    "Hubungi AIHAA via WhatsApp. Reply dalam 5 minit. Pemasangan percuma seluruh Semenanjung Malaysia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

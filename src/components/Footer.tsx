"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  EMAIL_ADDRESS,
  PHONE_NUMBER_DISPLAY,
  SOCIAL_LINKS,
  telHref,
} from "@/lib/config/contact";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav_home, href: "/" },
    { name: t.nav_products_indoor, href: "/produk-dalam" },
    { name: t.nav_products_outdoor, href: "/produk-luar" },
    { name: t.nav_promotions, href: "/promotions" },
    { name: t.nav_about, href: "/tentang-kami" },
    { name: t.nav_contact, href: "/contact" },
    { name: t.nav_policy, href: "/polisi" },
  ];

  return (
    <footer className="bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Logo size="sm" />
            <p className="text-[#999] text-sm leading-relaxed mt-4">
              {t.footer_desc}
            </p>
            <p className="text-[#666] text-xs mt-3">SSM: 1263314-X</p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t.footer_nav}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#999] text-sm hover:text-[#DAA520] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t.footer_contact}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={telHref()}
                  className="flex items-center gap-2 text-[#999] text-sm hover:text-[#DAA520] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#DAA520] flex-shrink-0" />
                  {PHONE_NUMBER_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-2 text-[#999] text-sm hover:text-[#DAA520] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#DAA520]" />
                  {EMAIL_ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#999] text-sm">
                <MapPin className="w-4 h-4 text-[#DAA520]" />
                {t.cta_location}
              </li>
            </ul>
          </div>

          {/* Column 4 — Social Media */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">
              {t.footer_social}
            </h4>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#999] text-sm hover:text-[#DAA520] transition-colors"
                  >
                    <span className="text-[#777]">{link.name}</span>{" "}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(218,165,32,0.1)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* #8F8F8F on #0D0D0D = 6.01:1 — passes WCAG AA (4.5:1). The
              previous #666 measured 3.38:1 and failed. */}
          <p className="text-[#8F8F8F] text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {t.footer_copyright}
          </p>
          <Link
            href="/polisi#privacy-policy"
            className="text-[#8F8F8F] text-xs hover:text-[#DAA520] transition-colors"
          >
            {t.footer_privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}

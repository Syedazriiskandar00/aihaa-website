"use client";

import Link from "next/link";
import Logo from "./Logo";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const socialLinks = [
  { name: "Facebook", label: "Penapis Air Aihaa", href: "#" },
  { name: "Instagram", label: "@aihaa_hq", href: "#" },
  { name: "TikTok", label: "@aihaa_hq", href: "#" },
];

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav_home, href: "/" },
    { name: t.nav_products_indoor, href: "/water-purifier" },
    { name: t.nav_products_outdoor, href: "/water-purifier" },
    { name: t.nav_promotions, href: "/promotions" },
    { name: t.nav_contact, href: "/contact" },
  ];

  return (
    <footer className="bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                  href="https://wa.me/60115657084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#999] text-sm hover:text-[#DAA520] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#DAA520]" />
                  +6011-5657 7084
                </a>
              </li>
              <li>
                <a
                  href="mailto:aihaa.marketing@gmail.com"
                  className="flex items-center gap-2 text-[#999] text-sm hover:text-[#DAA520] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#DAA520]" />
                  aihaa.marketing@gmail.com
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
              {socialLinks.map((link) => (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#666] text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {t.footer_copyright}
          </p>
          <a href="#" className="text-[#666] text-xs hover:text-[#999] transition-colors">
            {t.footer_privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}

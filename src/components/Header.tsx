"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappUrl, whatsappMessages } from "@/lib/config/contact";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav_home, href: "/" },
    {
      name: t.nav_products,
      href: "/water-purifier",
      dropdown: [
        { name: t.nav_products_all, href: "/water-purifier" },
        { name: t.nav_products_indoor, href: "/water-purifier#indoor" },
        { name: t.nav_products_outdoor, href: "/produk-luar" },
      ],
    },
    { name: t.nav_promotions, href: "/promotions" },
    { name: t.nav_faq, href: "/faq" },
    { name: t.nav_gallery, href: "/galeri" },
    { name: t.nav_service, href: "/service" },
  ];

  // Contact shown as gold button on desktop, normal link in mobile menu
  const contactItem = { name: t.nav_contact, href: "/contact" };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-dark"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-white/80 hover:text-gold text-sm font-medium transition-colors py-2 nav-link-underline"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 bg-dark-alt border border-[rgba(218,165,32,0.3)] rounded-lg shadow-xl py-2 min-w-[160px]">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-white/80 hover:text-gold hover:bg-white/5 text-sm transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Contact CTA Button — desktop only */}
            <Link
              href={contactItem.href}
              className="hidden lg:inline-block gold-gradient-bg text-white px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 hover:shadow-gold transition-all"
            >
              {contactItem.name}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* WhatsApp */}
            <a
              href={whatsappUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-gold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-gold transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-dark-alt border-t border-[rgba(218,165,32,0.3)]">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-3 text-white/80 hover:text-gold transition-colors border-b border-[rgba(218,165,32,0.15)]"
                  onClick={() => !item.dropdown && setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-2 text-white/60 hover:text-gold text-sm transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Contact — in mobile menu as normal link */}
            <div>
              <Link
                href={contactItem.href}
                className="block py-3 text-white/80 hover:text-gold transition-colors border-b border-[rgba(218,165,32,0.15)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {contactItem.name}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

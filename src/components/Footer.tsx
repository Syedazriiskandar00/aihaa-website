"use client";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy-primary border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-muted text-sm text-center md:text-right">
            Copyright@ 2024 AIHAA Water Purification Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

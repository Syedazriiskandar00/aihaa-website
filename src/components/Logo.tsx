"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

// Heights calibrated for the tight-cropped logo (zero-whitespace
// letterform). The previous values were tuned for the old logo file
// which had built-in padding around "AIHAA" — keeping them after the
// crop made the letters fill the container edge-to-edge and overpower
// the header. New values are ~50% smaller so the logo reads as a
// brand mark rather than a banner.
const SIZE_CLASSES: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-6 md:h-7",
  md: "h-7 md:h-8 lg:h-9",
  lg: "h-8 md:h-9 lg:h-10",
};

export default function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center group">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/images/logo-mobile.webp"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.webp"
          alt="AIHAA — Premium Water Purifier"
          className={`${SIZE_CLASSES[size]} w-auto`}
        />
      </picture>
    </Link>
  );
}

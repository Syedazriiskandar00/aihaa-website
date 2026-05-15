"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-16 md:h-20",
  md: "h-20 md:h-24 lg:h-28",
  lg: "h-24 md:h-28 lg:h-32",
};

export default function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.webp"
        alt="AIHAA — Premium Water Purifier"
        className={`${SIZE_CLASSES[size]} w-auto`}
      />
    </Link>
  );
}

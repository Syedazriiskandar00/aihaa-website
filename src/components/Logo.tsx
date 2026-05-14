"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-9 md:h-12",
  md: "h-12 md:h-14 lg:h-16",
  lg: "h-14 md:h-16 lg:h-20",
};

export default function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="AIHAA — Premium Water Purifier"
        className={`${SIZE_CLASSES[size]} w-auto`}
      />
    </Link>
  );
}

"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export default function Logo({ size = "md", showTagline = false }: LogoProps) {
  const sizes = {
    sm: { text: "text-xl", wave: "w-6", dots: "w-1" },
    md: { text: "text-2xl", wave: "w-8", dots: "w-1.5" },
    lg: { text: "text-4xl", wave: "w-12", dots: "w-2" },
  };

  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Wave Lines */}
      <div className="flex flex-col gap-1 wave-animate">
        <svg
          className={`${sizes[size].wave} h-auto`}
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10C5 5 10 5 15 10C20 15 25 15 30 10C35 5 40 5 40 10"
            stroke="url(#goldGradient1)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M0 16C5 11 10 11 15 16C20 21 25 21 30 16C35 11 40 11 40 16"
            stroke="url(#goldGradient2)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="goldGradient1" x1="0" y1="0" x2="40" y2="0">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="50%" stopColor="#F0D060" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <linearGradient id="goldGradient2" x1="0" y1="0" x2="40" y2="0">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="50%" stopColor="#F0D060" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col items-start">
        <span
          className={`${sizes[size].text} font-playfair font-bold tracking-[0.2em] gold-gradient-text group-hover:opacity-90 transition-opacity`}
        >
          AIHAA
        </span>

        {/* Decorative Dots */}
        <div className="flex gap-1 mt-0.5">
          <div
            className={`${sizes[size].dots} aspect-square rounded-full bg-gold`}
          />
          <div
            className={`${sizes[size].dots} aspect-square rounded-full bg-gold opacity-60`}
          />
          <div
            className={`${sizes[size].dots} aspect-square rounded-full bg-gold opacity-30`}
          />
        </div>

        {showTagline && (
          <span className="text-[10px] text-muted-dark tracking-wider mt-1">
            PURE WATER, PURE LIFE
          </span>
        )}
      </div>
    </Link>
  );
}

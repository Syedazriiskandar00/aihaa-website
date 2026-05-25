type BrandLogoBadgeProps = {
  subtitle?: string;
  className?: string;
};

export default function BrandLogoBadge({ subtitle, className = "" }: BrandLogoBadgeProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="font-editorial text-gold text-2xl md:text-3xl tracking-[0.18em] leading-none">
        AIHAA
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold/70 font-semibold">
        Marketing Sdn Bhd
      </span>
      {subtitle ? (
        <span className="mt-3 text-[11px] uppercase tracking-[0.22em] text-dark/60 font-semibold">
          {subtitle}
        </span>
      ) : null}
    </div>
  );
}

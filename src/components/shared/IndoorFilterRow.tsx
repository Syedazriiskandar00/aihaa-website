export type FilterCartridge = {
  name: string;
  caption: string;
  accent?: string;
};

type IndoorFilterRowProps = {
  heading?: string;
  cartridges: FilterCartridge[];
  tone?: "light" | "dark";
};

const DEFAULT_ACCENTS = ["#3B82C4", "#A8D89C", "#F7C873", "#E57373"];

export default function IndoorFilterRow({
  heading,
  cartridges,
  tone = "light",
}: IndoorFilterRowProps) {
  const isDark = tone === "dark";
  const nameColor = isDark ? "text-white" : "text-dark";
  const captionColor = isDark ? "text-white/60" : "text-muted";
  const cartridgeBg = isDark ? "bg-dark-alt border-white/10" : "bg-white border-black/5";

  return (
    <div className="w-full">
      {heading ? (
        <p
          className={`text-center text-[13px] md:text-sm uppercase tracking-[0.22em] font-semibold mb-8 ${
            isDark ? "text-white/80" : "text-dark/80"
          }`}
        >
          {heading}
        </p>
      ) : null}

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
        {cartridges.map((cartridge, index) => {
          const accent = cartridge.accent ?? DEFAULT_ACCENTS[index % DEFAULT_ACCENTS.length];
          return (
            <div
              key={`${cartridge.name}-${index}`}
              className="flex flex-col items-center px-3 md:px-5 relative"
            >
              {/* Cartridge block — vertical tube with colored liquid */}
              <div
                className={`relative w-16 md:w-20 h-44 md:h-52 rounded-[10px] border ${cartridgeBg} overflow-hidden shadow-sm`}
              >
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ background: accent, height: `${55 + (index % 3) * 10}%`, opacity: 0.85 }}
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 md:w-12 h-2 rounded-full bg-black/10" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 md:w-12 h-2 rounded-full bg-black/10" />
              </div>

              {/* Stage number chip */}
              <span
                className={`mt-4 inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-semibold ${
                  isDark ? "bg-gold/20 text-gold" : "bg-gold/15 text-gold-dark"
                }`}
              >
                {index + 1}
              </span>

              <p className={`mt-2 text-[13px] md:text-sm font-semibold tracking-wide ${nameColor}`}>
                {cartridge.name}
              </p>
              <p className={`mt-1 text-[12px] leading-snug text-center max-w-[180px] ${captionColor}`}>
                {cartridge.caption}
              </p>

              {/* Horizontal flow arrow between cartridges (desktop only) */}
              {index < cartridges.length - 1 ? (
                <span
                  aria-hidden
                  className={`hidden md:block absolute top-24 -right-3 w-6 h-px ${
                    isDark ? "bg-white/20" : "bg-black/15"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

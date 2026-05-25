type Align = "left" | "center";

type Tone = "light" | "dark";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  headingAccent?: string;
  subheading?: string;
  align?: Align;
  tone?: Tone;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  heading,
  headingAccent,
  subheading,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const headingColor = tone === "dark" ? "text-white" : "text-dark";
  const subColor = tone === "dark" ? "text-white/60" : "text-muted";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-4">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`font-editorial text-3xl md:text-4xl lg:text-5xl ${headingColor} leading-[1.08]`}
      >
        {heading}
        {headingAccent ? (
          <>
            {" "}
            <span className="font-editorial-italic text-gold">{headingAccent}</span>
          </>
        ) : null}
      </Heading>
      {subheading ? (
        <p className={`mt-4 text-[14px] md:text-[15px] leading-relaxed ${subColor}`}>
          {subheading}
        </p>
      ) : null}
    </div>
  );
}

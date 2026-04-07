"use client";

const certifications = [
  { name: "Halal", abbr: "HALAL" },
  { name: "RoHS", abbr: "RoHS" },
  { name: "Gold Standard", abbr: "GOLD" },
  { name: "TUV", abbr: "TUV" },
  { name: "ISO", abbr: "ISO" },
  { name: "CE", abbr: "CE" },
];

export default function CertificationsSection() {
  return (
    <section className="bg-navy-primary py-12 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-muted text-sm uppercase tracking-wider">
            Certified & Trusted
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-navy-secondary/50 border border-gold/20 rounded-xl hover:border-gold/40 transition-all"
            >
              <span className="text-gold font-bold text-lg md:text-xl group-hover:scale-110 transition-transform">
                {cert.abbr}
              </span>
              <span className="text-muted text-[10px] mt-1">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

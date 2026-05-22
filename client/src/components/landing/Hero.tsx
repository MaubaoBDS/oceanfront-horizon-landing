import { ChevronDown, Phone } from "lucide-react";
import { CONTACT, IMAGES, PROJECT, STATS } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  const scrollToOverview = () => {
    document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Phối cảnh tổng thể AnhNguyen OceanFront Horizon Nha Trang"
          className="w-full h-full object-cover scale-105 motion-safe:animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/50 to-navy-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />
      </div>

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.12) translate(-1.5%, -1%); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 container pb-16 md:pb-24 pt-32 md:pt-40 w-full">
        <div className="max-w-4xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gold-500/10 border border-gold-400/40 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
            </span>
            <span className="text-xs font-medium tracking-[0.28em] uppercase text-gold-300">
              {PROJECT.status}
            </span>
          </div>

          {/* Eyebrow */}
          <p className="text-gold-300/90 text-sm md:text-base font-medium tracking-[0.32em] uppercase mb-4">
            AnhNguyen
          </p>

          {/* Heading */}
          <h1 className="heading-serif text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-3 text-balance">
            OceanFront
            <span className="block italic font-light text-gold-300/95 text-4xl md:text-6xl lg:text-7xl mt-1">
              Horizon
            </span>
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-white/85 text-xl md:text-2xl lg:text-3xl mb-3 text-balance">
            {PROJECT.tagline}
          </p>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mb-10 text-balance">
            {PROJECT.subTagline} – mặt tiền đường Trần Phú, view trọn vịnh biển đẹp nhất thế giới.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 max-w-3xl">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border-l-2 border-gold-500/60 pl-4 py-1"
              >
                <div className="font-serif text-3xl md:text-4xl text-white font-semibold">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-white/65 uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={`tel:${CONTACT.phone}`}
              onClick={() => fbContact("phone")}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md btn-gold"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay {CONTACT.phoneFormatted}
            </a>
            <button
              onClick={onOpenForm}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md border border-white/30 text-white hover:border-gold-400 hover:bg-white/5 backdrop-blur-sm transition-all duration-200 font-medium"
            >
              Nhận tư vấn miễn phí
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToOverview}
        aria-label="Cuộn xuống"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-gold-300 transition-colors animate-bounce"
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </section>
  );
}

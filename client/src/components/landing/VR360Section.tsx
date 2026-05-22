import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { IMAGES, PROJECT } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

export default function VR360Section() {
  const [loaded, setLoaded] = useState(false);
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="vr360" className="section-pad bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <img
          src={IMAGES.overviewNightFireworks}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
        />
      </div>

      <div className="container relative">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-10">
          <p className="eyebrow text-gold-400">Trải nghiệm 360°</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-white text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            VR360
            <span className="italic font-light text-gold-300"> Tour Thực Tế Ảo</span>
          </h2>
          <p className="text-white/75 text-lg leading-relaxed text-balance">
            Khám phá toàn cảnh dự án OceanFront Horizon ngay tại nhà. Tham quan từng góc
            tiện ích, view biển và mặt bằng căn hộ qua công nghệ thực tế ảo 360°.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto rounded-sm overflow-hidden ring-1 ring-gold-500/20 shadow-2xl shadow-navy-950/50">
          {/* Aspect ratio wrapper */}
          <div className="relative aspect-video bg-navy-900">
            {!loaded && (
              <button
                onClick={() => setLoaded(true)}
                className="absolute inset-0 group flex flex-col items-center justify-center gap-4 text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, oklch(0.12 0.03 252 / 0.85), oklch(0.21 0.05 250 / 0.6)), url(${IMAGES.conceptAerial})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-500 flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xl shadow-gold-500/50">
                  <Play className="w-9 h-9 md:w-10 md:h-10 text-navy-900 fill-navy-900 ml-1" />
                </span>
                <p className="font-serif text-2xl md:text-3xl">Bắt đầu tham quan 360°</p>
                <p className="text-white/70 text-sm">Nhấn để khởi động trải nghiệm</p>
              </button>
            )}
            {loaded && (
              <iframe
                src={PROJECT.vr360}
                title="OceanFront Horizon VR360 Tour"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; fullscreen; gyroscope; magnetometer; vr; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={PROJECT.vr360}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 text-sm transition-colors"
          >
            Mở tour trong tab mới
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

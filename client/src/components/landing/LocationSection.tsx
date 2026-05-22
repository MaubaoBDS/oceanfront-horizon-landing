import { MapPin, Navigation } from "lucide-react";
import { IMAGES, INFRASTRUCTURE, PROJECT } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

export default function LocationSection() {
  const headRef = useReveal<HTMLDivElement>();
  const mapRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section id="location" className="relative section-pad navy-grad overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, oklch(0.69 0.12 82) 0, transparent 40%), radial-gradient(circle at 75% 75%, oklch(0.69 0.12 82) 0, transparent 40%)",
          }}
        />
      </div>

      <div className="container relative">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow text-gold-400">Vị trí chiến lược</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-white text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            Tâm Điểm
            <span className="italic font-light text-gold-300"> Mặt Biển </span>
            Trần Phú
          </h2>
          <p className="text-white/75 text-lg leading-relaxed text-balance">
            Tọa lạc đường Trần Phú – con đường danh giá bậc nhất Nha Trang, đối diện
            Cảng Cầu Đá – Vinpearl Land, kết nối tức thì mọi tiện ích du lịch và đô thị.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Map image */}
          <div ref={mapRef} className="reveal relative">
            <div className="relative rounded-sm overflow-hidden ring-1 ring-gold-500/30 shadow-2xl shadow-navy-950/50 aspect-[4/3]">
              <img
                src={IMAGES.locationMap}
                alt="Bản đồ vị trí AnhNguyen OceanFront Horizon trên đường Trần Phú Nha Trang"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur text-white text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                Đường Trần Phú, Nha Trang
              </div>
            </div>
          </div>

          {/* Infrastructure list */}
          <div ref={listRef} className="reveal">
            <h3 className="heading-serif text-2xl md:text-3xl text-white mb-2">
              Kết nối hạ tầng
            </h3>
            <p className="text-gold-300/80 text-sm uppercase tracking-[0.28em] mb-6">
              Vị trí kim cương
            </p>
            <ul className="space-y-px">
              {INFRASTRUCTURE.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 py-3.5 border-b border-white/10 group hover:border-gold-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Navigation className="w-4 h-4 text-gold-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-white truncate">{item.name}</span>
                  </div>
                  <span className="text-gold-300 text-sm font-medium whitespace-nowrap">
                    {item.distance}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 bg-navy-800/40 border border-gold-500/20 rounded-sm backdrop-blur-sm">
              <p className="text-white/70 text-xs uppercase tracking-[0.28em] mb-1">
                Địa chỉ dự án
              </p>
              <p className="text-white text-base md:text-lg leading-relaxed">
                {PROJECT.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

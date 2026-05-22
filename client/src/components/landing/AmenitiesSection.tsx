import {
  Droplets,
  Dumbbell,
  ShieldCheck,
  Trees,
  Utensils,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { AMENITIES, IMAGES } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  droplets: Droplets,
  trees: Trees,
  dumbbell: Dumbbell,
  utensils: Utensils,
  "shield-check": ShieldCheck,
};

export default function AmenitiesSection() {
  const headRef = useReveal<HTMLDivElement>();
  const featureARef = useReveal<HTMLDivElement>();
  const featureBRef = useReveal<HTMLDivElement>();

  return (
    <section id="amenities" className="section-pad bg-cream">
      <div className="container">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow">Tiện ích đẳng cấp</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-navy-900 text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            Sống Trọn Vẹn
            <span className="italic font-light text-gold-700"> Mỗi Ngày</span>
          </h2>
          <p className="text-navy-700/80 text-lg leading-relaxed text-balance">
            Hệ thống tiện ích nội khu kỷ lục – nâng tầm trải nghiệm sống chuẩn resort 5 sao
            ngay tại trung tâm vịnh biển Nha Trang.
          </p>
        </div>

        {/* Feature highlights - 2 large cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div ref={featureARef} className="reveal relative group rounded-sm overflow-hidden aspect-[4/3] md:aspect-[5/4] shadow-xl shadow-navy-900/15">
            <img
              src={IMAGES.skyGalaxyPool}
              alt="Sky Galaxy Pool – Bể bơi galaxy 102m dài nhất Việt Nam"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 text-white">
              <p className="eyebrow text-gold-300 mb-2">Tiện ích kỷ lục</p>
              <h3 className="heading-serif text-3xl md:text-4xl mb-2">
                Sky Galaxy Pool
              </h3>
              <p className="text-white/85 text-base md:text-lg max-w-md">
                Bể bơi galaxy trên cao dài nhất Việt Nam – 102m view trọn vịnh Nha Trang
              </p>
            </div>
          </div>

          <div ref={featureBRef} className="reveal relative group rounded-sm overflow-hidden aspect-[4/3] md:aspect-[5/4] shadow-xl shadow-navy-900/15">
            <img
              src={IMAGES.interiorLivingroom}
              alt="Nội thất căn hộ OceanFront Horizon view biển"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 text-white">
              <p className="eyebrow text-gold-300 mb-2">Bàn giao cao cấp</p>
              <h3 className="heading-serif text-3xl md:text-4xl mb-2">
                Full Nội Thất
              </h3>
              <p className="text-white/85 text-base md:text-lg max-w-md">
                Căn hộ bàn giao 100% nội thất cao cấp, view biển trọn vẹn
              </p>
            </div>
          </div>
        </div>

        {/* Amenities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AMENITIES.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Waves;
            return <AmenityCard key={i} icon={Icon} title={a.title} desc={a.desc} delay={i * 50} />;
          })}
        </div>
      </div>
    </section>
  );
}

function AmenityCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal flex gap-4 items-start p-5 bg-white rounded-sm border border-navy-100 hover:border-gold-400 hover:shadow-lg hover:shadow-navy-900/5 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="shrink-0 w-11 h-11 rounded-sm bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gold-700" />
      </div>
      <div>
        <h4 className="font-serif text-lg text-navy-900 font-semibold mb-1">{title}</h4>
        <p className="text-navy-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

import {
  Building2,
  FileCheck,
  Mountain,
  Sun,
  TrendingUp,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { HIGHLIGHTS, IMAGES, PROJECT } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  "file-check": FileCheck,
  mountain: Mountain,
  "building-2": Building2,
  sun: Sun,
  "trending-up": TrendingUp,
};

const infoRows: Array<[string, string]> = [
  ["Tên dự án", PROJECT.name],
  ["Chủ đầu tư", PROJECT.developer],
  ["Đơn vị quản lý/vận hành", PROJECT.operator],
  ["Tổng đại lý phân phối", PROJECT.distributor],
  ["Vị trí", PROJECT.location],
  ["Tổng diện tích đất", PROJECT.totalArea],
  ["Quy mô", PROJECT.floors],
  ["Số lượng căn hộ", PROJECT.totalUnits],
  ["Cơ cấu sản phẩm", PROJECT.productTypes],
  ["Diện tích linh hoạt", PROJECT.apartmentArea],
  ["Pháp lý", PROJECT.legal],
  ["Bàn giao", PROJECT.handover],
];

export default function OverviewSection() {
  const headRef = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();
  const tableRef = useReveal<HTMLDivElement>();

  return (
    <section id="overview" className="section-pad bg-cream">
      <div className="container">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow">Tổng quan dự án</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-navy-900 text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            <span className="block">AnhNguyen</span>
            <span className="italic font-light text-gold-700">OceanFront Horizon</span>
          </h2>
          <p className="text-navy-700/80 text-lg md:text-xl leading-relaxed text-balance">
            Bộ sưu tập 415 căn hộ Art Apartments đầu tiên tại trung tâm TP. Nha Trang –
            kiến tạo chuẩn mực sống mới trên cung đường mặt biển Trần Phú.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Image */}
          <div ref={imgRef} className="reveal relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-navy-900/20 aspect-[4/5]">
              <img
                src={IMAGES.heroAlt}
                alt="Phối cảnh OceanFront Horizon mặt biển Trần Phú Nha Trang"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <p className="font-serif italic text-2xl md:text-3xl mb-1 text-gold-300">
                  Sở hữu lâu dài
                </p>
                <p className="text-white/80 text-sm">
                  Khan hiếm trên cung đường mặt biển Trần Phú
                </p>
              </div>
            </div>
            {/* Decorative gold frame */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-500 hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold-500 hidden md:block" />
          </div>

          {/* Info table */}
          <div ref={tableRef} className="reveal">
            <div className="bg-white rounded-sm border border-navy-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 navy-grad text-white">
                <h3 className="heading-serif text-2xl">Thông tin dự án</h3>
              </div>
              <dl className="divide-y divide-navy-100">
                {infoRows.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-4 px-6 py-3.5 hover:bg-cream transition-colors"
                  >
                    <dt className="text-sm text-navy-500 font-medium">{k}</dt>
                    <dd className="text-sm md:text-base text-navy-900 font-medium">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Highlights grid */}
        <div className="mt-16 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = iconMap[h.icon] ?? Waves;
            return (
              <HighlightCard key={i} icon={Icon} title={h.title} desc={h.desc} delay={i * 60} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
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
      className="reveal group relative bg-white border border-navy-100 hover:border-gold-400 rounded-sm p-7 transition-all duration-300 hover:shadow-xl hover:shadow-navy-900/10 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 left-0 w-12 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500" />
      <div className="w-12 h-12 mb-5 rounded-sm bg-navy-50 group-hover:bg-gold-100 flex items-center justify-center transition-colors duration-300">
        <Icon className="w-6 h-6 text-navy-700 group-hover:text-gold-700 transition-colors" />
      </div>
      <h3 className="heading-serif text-xl text-navy-900 mb-2">{title}</h3>
      <p className="text-navy-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

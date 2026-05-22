import { IMAGES } from "@/lib/constants";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const FLOORPLANS = [
  {
    id: "tang5-10",
    label: "Tầng 5 – 10",
    sublabel: "Mặt bằng căn hộ điển hình",
    src: IMAGES.floorplanTang510,
    alt: "Mặt bằng căn hộ điển hình tầng 5-10 – AnhNguyen OceanFront Horizon",
  },
];

const LEGEND = [
  { color: "bg-[#4A9FD4]", label: "Studio", count: "38 – 45 m²" },
  { color: "bg-[#7ECFC8]", label: "1 Phòng ngủ (1BR)", count: "42 – 46 m²" },
  { color: "bg-[#D4A96A]", label: "2 Phòng ngủ (2BR)", count: "47 – 72 m²" },
];

export default function FloorplanSection() {
  const sectionRef = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const current = FLOORPLANS[active];

  return (
    <section id="floorplan" className="py-20 md:py-28 bg-[#F8F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          ref={sectionRef}
          className="text-center mb-12 reveal-block"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#C9A961] font-semibold mb-3">
            Mặt bằng dự án
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#0A1F3A] mb-4">
            Thiết Kế{" "}
            <span className="italic text-[#C9A961]">Tinh Tế</span>
          </h2>
          <p className="text-[#4A5568] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Bố cục căn hộ được tối ưu hóa để tối đa hóa tầm nhìn ra vịnh biển Nha Trang,
            đón ánh sáng tự nhiên và thông gió xuyên suốt.
          </p>
        </div>

        {/* Tab selector (nếu sau này có nhiều tầng) */}
        {FLOORPLANS.length > 1 && (
          <div className="flex justify-center gap-3 mb-8">
            {FLOORPLANS.map((fp, i) => (
              <button
                key={fp.id}
                onClick={() => setActive(i)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === i
                    ? "bg-[#0A1F3A] text-white shadow-md"
                    : "bg-white text-[#0A1F3A] border border-[#0A1F3A]/20 hover:border-[#C9A961] hover:text-[#C9A961]"
                }`}
              >
                {fp.label}
              </button>
            ))}
          </div>
        )}

        {/* Floorplan image card */}
        <div
          ref={imgRef}
          className="reveal-block"
          style={{ transitionDelay: "150ms" }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-semibold text-[#0A1F3A] text-base">
                  {current.label}
                </h3>
                <p className="text-xs text-[#718096]">{current.sublabel}</p>
              </div>
              <button
                onClick={() => setZoomed(true)}
                className="flex items-center gap-2 text-xs font-medium text-[#C9A961] hover:text-[#0A1F3A] transition-colors duration-200 border border-[#C9A961]/40 hover:border-[#0A1F3A]/40 rounded-full px-4 py-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Phóng to
              </button>
            </div>

            {/* Image */}
            <div
              className="relative cursor-zoom-in bg-gray-50"
              onClick={() => setZoomed(true)}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="w-full h-auto object-contain max-h-[70vh]"
                loading="lazy"
              />
            </div>

            {/* Legend */}
            <div className="px-6 py-5 border-t border-gray-100">
              <p className="text-xs text-[#718096] uppercase tracking-widest font-medium mb-3">
                Phân loại căn hộ
              </p>
              <div className="flex flex-wrap gap-4">
                {LEGEND.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-sm flex-shrink-0 ${item.color}`}
                    />
                    <span className="text-sm text-[#2D3748] font-medium">
                      {item.label}
                    </span>
                    <span className="text-xs text-[#718096]">
                      ({item.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA dưới */}
        <div
          ref={ctaRef}
          className="text-center mt-10 reveal-block"
          style={{ transitionDelay: "250ms" }}
        >
          <p className="text-[#4A5568] mb-4 text-sm">
            Cần tư vấn chi tiết về loại căn phù hợp với nhu cầu của bạn?
          </p>
          <a
            href="tel:0933235444"
            className="inline-flex items-center gap-2 bg-[#0A1F3A] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#C9A961] transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
            </svg>
            Gọi ngay 0933.235.444
          </a>
        </div>
      </div>

      {/* Lightbox zoom */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setZoomed(false)}
            aria-label="Đóng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs">
            Nhấn bên ngoài hoặc Esc để đóng
          </p>
        </div>
      )}
    </section>
  );
}

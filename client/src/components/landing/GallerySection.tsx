import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GALLERY } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headRef = useReveal<HTMLDivElement>();

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? 0 : (i + 1) % GALLERY.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length,
      ),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  return (
    <section id="gallery" className="section-pad bg-cream">
      <div className="container">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-12">
          <p className="eyebrow">Thư viện hình ảnh</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-navy-900 text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            Hình Ảnh
            <span className="italic font-light text-gold-700"> Dự Án</span>
          </h2>
          <p className="text-navy-700/80 text-lg leading-relaxed text-balance">
            14 góc nhìn toàn diện từ phối cảnh tổng thể, tiện ích đến nội thất căn hộ
            thực tế.
          </p>
        </div>

        {/* Asymmetric grid: first 2 large, rest in standard grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          {GALLERY.map((g, idx) => {
            const isLargeA = idx === 0; // hero
            const isLargeB = idx === 3; // sky pool
            const span =
              isLargeA
                ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"
                : isLargeB
                ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"
                : "";
            return (
              <GalleryThumb
                key={idx}
                src={g.src}
                alt={g.alt}
                spanClass={span}
                onClick={() => setOpenIndex(idx)}
                index={idx}
              />
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Đóng"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Ảnh trước"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Ảnh tiếp theo"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={GALLERY[openIndex].src}
              alt={GALLERY[openIndex].alt}
              className="max-w-full max-h-[78vh] object-contain rounded-sm shadow-2xl"
            />
            <figcaption className="mt-4 text-white/85 text-center text-sm md:text-base">
              {GALLERY[openIndex].alt}
              <span className="ml-3 text-gold-300/70">
                {openIndex + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function GalleryThumb({
  src,
  alt,
  spanClass,
  onClick,
  index,
}: {
  src: string;
  alt: string;
  spanClass: string;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-sm bg-navy-100 ${spanClass}`}
      aria-label={`Xem ảnh ${index + 1}: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/55 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-gold-500 text-navy-900 text-sm font-medium">
          <Maximize2 className="w-4 h-4" />
          Xem ảnh
        </span>
      </div>
    </button>
  );
}

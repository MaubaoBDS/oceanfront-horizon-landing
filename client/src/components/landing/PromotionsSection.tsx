import { Banknote, Gift, Phone, Wallet, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { CONTACT, PROMOTIONS } from "@/lib/constants";
import { fbContact, fbViewContent } from "@/lib/fbEvents";
import { useReveal } from "@/hooks/useReveal";

const iconMap: Record<string, LucideIcon> = {
  wallet: Wallet,
  banknote: Banknote,
  gift: Gift,
};

interface Props {
  onOpenForm: () => void;
}

export default function PromotionsSection({ onOpenForm }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const tracked = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !tracked.current) {
            fbViewContent("Promotions Section");
            tracked.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="promotions" ref={sectionRef} className="section-pad bg-white">
      <div className="container">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow">Chính sách ưu đãi</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-navy-900 text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            Ưu Đãi
            <span className="italic font-light text-gold-700"> Đặc Quyền</span>
          </h2>
          <p className="text-navy-700/80 text-lg leading-relaxed text-balance">
            Chính sách thanh toán linh hoạt, hỗ trợ tài chính tối đa – đồng hành cùng
            khách hàng trên hành trình sở hữu căn hộ mặt biển.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROMOTIONS.map((p, i) => {
            const Icon = iconMap[p.icon] ?? Gift;
            return (
              <PromoCard
                key={i}
                icon={Icon}
                title={p.title}
                desc={p.description}
                index={i + 1}
                delay={i * 80}
              />
            );
          })}
        </div>

        {/* CTA strip */}
        <div ref={ctaRef} className="reveal mt-14 relative overflow-hidden rounded-sm">
          <div
            className="px-8 py-10 md:px-14 md:py-12 navy-grad relative"
            style={{
              backgroundImage:
                "linear-gradient(135deg, oklch(0.12 0.03 252) 0%, oklch(0.21 0.05 250) 100%)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
              <div className="text-center md:text-left">
                <p className="eyebrow text-gold-400 mb-2">Liên hệ ngay</p>
                <h3 className="heading-serif text-white text-2xl md:text-3xl lg:text-4xl">
                  Nhận bảng giá &amp; chính sách mới nhất
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={onOpenForm}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md btn-gold whitespace-nowrap"
                >
                  Nhận bảng giá ngay
                </button>
                <a
                  href={`tel:${CONTACT.phone}`}
                  onClick={() => fbContact("phone")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-white/30 text-white hover:border-gold-400 hover:bg-white/5 transition-all whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoCard({
  icon: Icon,
  title,
  desc,
  index,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
  delay: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal relative bg-cream border border-navy-100 hover:border-gold-400 rounded-sm p-7 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-navy-900/10 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="absolute top-6 right-7 font-serif text-5xl md:text-6xl text-gold-200/70 group-hover:text-gold-300 transition-colors leading-none">
        0{index}
      </span>
      <div className="w-14 h-14 mb-6 rounded-sm bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-500/30">
        <Icon className="w-7 h-7 text-navy-900" />
      </div>
      <h3 className="heading-serif text-2xl text-navy-900 mb-3">{title}</h3>
      <p className="text-navy-600 leading-relaxed">{desc}</p>
    </div>
  );
}

import { Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";
import { useReveal } from "@/hooks/useReveal";
import LeadForm from "./LeadForm";

export default function ContactSection() {
  const headRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const infoRef = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container">
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow">Liên hệ tư vấn</p>
          <div className="gold-divider"></div>
          <h2 className="heading-serif text-navy-900 text-4xl md:text-5xl lg:text-6xl mt-3 mb-4 text-balance">
            Đăng Ký
            <span className="italic font-light text-gold-700"> Nhận Tư Vấn</span>
          </h2>
          <p className="text-navy-700/80 text-lg leading-relaxed text-balance">
            Để lại thông tin – đội ngũ tư vấn MSH Group sẽ liên hệ trong vòng 5 phút,
            cung cấp bảng giá chi tiết và chính sách ưu đãi mới nhất.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 max-w-6xl mx-auto items-start">
          {/* Form */}
          <div
            ref={formRef}
            className="reveal bg-cream border border-navy-100 rounded-sm p-6 md:p-8 shadow-md"
          >
            <h3 className="heading-serif text-2xl md:text-3xl text-navy-900 mb-2">
              Form đăng ký
            </h3>
            <p className="text-navy-600 text-sm mb-6">
              Tất cả các trường bắt buộc đánh dấu *
            </p>
            <LeadForm source="contact-section" />
          </div>

          {/* Contact info */}
          <div ref={infoRef} className="reveal">
            <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-sm p-7 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <p className="eyebrow text-gold-400 mb-3">Tư vấn trực tiếp</p>
                <h3 className="heading-serif text-3xl md:text-4xl mb-2">
                  {CONTACT.name}
                </h3>
                <p className="text-gold-300/90 text-sm mb-1">
                  {CONTACT.title} · {CONTACT.company}
                </p>
                <p className="text-white/60 text-sm mb-7">{CONTACT.experience}</p>

                <div className="space-y-3">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    onClick={() => fbContact("phone")}
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-sm border border-white/10 hover:border-gold-500/40 transition-all group"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-sm bg-gold-500 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-navy-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                        Hotline
                      </p>
                      <p className="text-lg font-semibold text-white group-hover:text-gold-300 transition-colors">
                        {CONTACT.phoneFormatted}
                      </p>
                    </div>
                  </a>

                  <a
                    href={CONTACT.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => fbContact("zalo")}
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-sm border border-white/10 hover:border-gold-500/40 transition-all group"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-sm bg-[#0068FF] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                        Zalo
                      </p>
                      <p className="text-base font-medium text-white group-hover:text-gold-300 transition-colors">
                        Tư vấn nhanh qua Zalo
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${CONTACT.email}`}
                    onClick={() => fbContact("email")}
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-sm border border-white/10 hover:border-gold-500/40 transition-all group"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-sm bg-white/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gold-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                        Email
                      </p>
                      <p className="text-sm font-medium text-white group-hover:text-gold-300 transition-colors break-all">
                        {CONTACT.email}
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-7 pt-6 border-t border-white/10">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-400 mb-1.5">
                    Cam kết
                  </p>
                  <p className="text-white/85 text-sm leading-relaxed">
                    Phản hồi trong vòng <strong className="text-gold-300">5 phút</strong>.
                    Tư vấn miễn phí, bảo mật thông tin tuyệt đối.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

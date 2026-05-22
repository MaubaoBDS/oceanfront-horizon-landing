import { ArrowLeft, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { CONTACT, IMAGES } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";

export default function ThankYou() {
  const [location] = useLocation();
  const [name, setName] = useState("");
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setName(params.get("name") || "Quý khách");
  }, [location]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden p-4 py-10">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroAlt}
          alt=""
          className="w-full h-full object-cover opacity-15"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/95 to-cream" />
      </div>

      <div className="relative max-w-2xl w-full text-center bg-white rounded-sm shadow-2xl shadow-navy-900/10 border border-navy-100 p-8 md:p-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" strokeWidth={2} />
        </div>

        <p className="eyebrow mb-3">Đăng ký thành công</p>
        <div className="gold-divider"></div>

        <h1 className="heading-serif text-navy-900 text-4xl md:text-5xl mt-4 mb-3 text-balance">
          Cảm ơn{" "}
          <span className="italic text-gold-700">{name}</span>!
        </h1>

        <p className="text-navy-700 text-lg leading-relaxed mb-2 text-balance">
          Chúng tôi đã nhận được thông tin của bạn.
        </p>
        <p className="text-navy-600 mb-8 text-balance">
          <strong className="text-navy-900">{CONTACT.name}</strong> sẽ liên hệ trực
          tiếp với bạn trong vòng <strong className="text-gold-700">5 phút</strong> để
          tư vấn chi tiết về dự án.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          <a
            href={`tel:${CONTACT.phone}`}
            onClick={() => fbContact("phone")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm btn-gold text-sm"
          >
            <Phone className="w-4 h-4" />
            Gọi ngay {CONTACT.phoneFormatted}
          </a>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fbContact("zalo")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#0068FF] hover:bg-[#0052cc] text-white text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat Zalo
          </a>
        </div>

        <div className="pt-6 border-t border-navy-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-gold-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
            {countdown > 0 && (
              <span className="text-navy-400">(tự động sau {countdown}s)</span>
            )}
          </Link>
        </div>

        {countdown <= 0 && <AutoRedirect />}
      </div>
    </div>
  );
}

function AutoRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/");
  }, [setLocation]);
  return null;
}

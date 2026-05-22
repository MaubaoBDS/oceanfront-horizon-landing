import { MessageCircle, MessageSquare, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";

interface Props {
  onOpenForm: () => void;
}

export default function FloatingCTA({ onOpenForm }: Props) {
  return (
    <div className="fixed right-3 md:right-5 bottom-3 md:bottom-5 z-40 flex flex-col gap-3">
      {/* Zalo */}
      <a
        href={CONTACT.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        title="Chat Zalo"
        onClick={() => fbContact("zalo")}
        className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0068FF] hover:bg-[#0052cc] shadow-xl shadow-[#0068FF]/35 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0068FF] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0068FF] ring-2 ring-white" />
        </span>
        <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-navy-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat Zalo
        </span>
      </a>

      {/* Form CTA */}
      <button
        onClick={onOpenForm}
        aria-label="Đăng ký tư vấn"
        title="Đăng ký tư vấn"
        className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 hover:brightness-110 shadow-xl shadow-gold-500/35 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-navy-900" />
        <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-navy-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Đăng ký tư vấn
        </span>
      </button>

      {/* Phone */}
      <a
        href={`tel:${CONTACT.phone}`}
        onClick={() => fbContact("phone")}
        aria-label="Gọi ngay"
        title="Gọi ngay"
        className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/35 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50 pointer-events-none" />
        <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-navy-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Gọi ngay {CONTACT.phoneFormatted}
        </span>
      </a>
    </div>
  );
}

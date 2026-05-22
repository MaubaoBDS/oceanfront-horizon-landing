import { X } from "lucide-react";
import { useEffect } from "react";
import LeadForm from "./LeadForm";

interface Props {
  open: boolean;
  onClose: () => void;
  source?: string;
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
}

export default function LeadFormDialog({
  open,
  onClose,
  source = "popup",
  title = "Nhận tư vấn miễn phí",
  subtitle = "Để lại thông tin – chúng tôi sẽ liên hệ bạn trong vòng 5 phút",
  badgeLabel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-cream rounded-sm shadow-2xl border border-navy-100 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-300"
      >
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white hover:bg-navy-50 flex items-center justify-center text-navy-700 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pt-7 pb-5 navy-grad text-white text-center rounded-t-sm">
          {badgeLabel && (
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500 text-navy-900 text-[11px] font-semibold uppercase tracking-wider mb-3">
              {badgeLabel}
            </span>
          )}
          <h3 className="heading-serif text-2xl md:text-3xl mb-1.5">{title}</h3>
          <p className="text-white/75 text-sm">{subtitle}</p>
        </div>

        <div className="p-6">
          <LeadForm source={source} compact onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}

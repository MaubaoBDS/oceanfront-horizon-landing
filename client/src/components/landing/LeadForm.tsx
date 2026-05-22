import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { FORM_OPTIONS } from "@/lib/constants";
import { fbLead } from "@/lib/fbEvents";

interface Props {
  source?: string;
  defaultInterest?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export default function LeadForm({ source = "website", defaultInterest, compact = false, onSuccess }: Props) {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(defaultInterest ?? "");
  const [budget, setBudget] = useState("");
  const [note, setNote] = useState("");

  const submit = trpc.contact.submitLead.useMutation({
    onSuccess: () => {
      fbLead({ content_name: `Lead Form - ${source}` });
      toast.success("Cảm ơn bạn! Chúng tôi sẽ liên hệ ngay trong 5 phút.");
      onSuccess?.();
      setLocation(`/thank-you?name=${encodeURIComponent(name)}`);
    },
    onError: (err) => {
      toast.error(err.message ?? "Có lỗi xảy ra, vui lòng thử lại.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    submit.mutate({
      name: name.trim(),
      phone: phone.trim(),
      interest: interest || null,
      budget: budget || null,
      note: note.trim() || null,
      source,
    });
  };

  const inputCls =
    "w-full px-4 py-3 bg-white border border-navy-200 rounded-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 text-navy-900 placeholder:text-navy-400 text-sm transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-navy-500 mb-1.5 block">
          Họ và tên *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập họ và tên của bạn"
          required
          className={inputCls}
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-navy-500 mb-1.5 block">
          Số điện thoại *
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          required
          inputMode="tel"
          className={inputCls}
        />
      </div>

      <div className={compact ? "" : "grid sm:grid-cols-2 gap-3.5"}>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-navy-500 mb-1.5 block">
            Nội dung quan tâm
          </label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={inputCls}
          >
            <option value="">— Chọn nội dung —</option>
            {FORM_OPTIONS.interests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-navy-500 mb-1.5 block">
            Ngân sách dự kiến
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={inputCls}
          >
            <option value="">— Chọn ngân sách —</option>
            {FORM_OPTIONS.budgets.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-navy-500 mb-1.5 block">
            Ghi chú thêm
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Yêu cầu hoặc câu hỏi của bạn..."
            className={`${inputCls} resize-none`}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={submit.isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm btn-gold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submit.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Gửi thông tin đăng ký
          </>
        )}
      </button>

      <p className="text-xs text-navy-500 text-center pt-1">
        Thông tin của bạn được bảo mật tuyệt đối. Cam kết không spam.
      </p>
    </form>
  );
}

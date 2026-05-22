import { useEffect, useState } from "react";
import LeadFormDialog from "./LeadFormDialog";

const STORAGE_KEY = "ofh-exit-intent-shown";

/**
 * Exit-intent popup
 * - Hiện 1 lần/session khi:
 *   + Desktop: chuột di chuyển ra khỏi đầu trang (clientY <= 0)
 *   + Mobile: cuộn lên nhanh sau khi đã cuộn xuống đủ sâu
 * - Đã từng đóng/submit thì không hiện lại trong session
 */
export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    let lastScroll = 0;
    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && armed) trigger();
    };

    const onScroll = () => {
      const y = window.scrollY;
      // Arm when user has explored the page
      if (!armed && y > 800) armed = true;
      // Mobile: detect fast upward scroll
      if (armed && lastScroll - y > 120 && y < 400) trigger();
      lastScroll = y;
    };

    // Backup: trigger after 45 seconds if not armed yet
    const fallback = window.setTimeout(() => {
      if (!triggered) trigger();
    }, 45000);

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <LeadFormDialog
      open={open}
      onClose={() => setOpen(false)}
      source="exit-intent"
      title="Khoan đã!"
      subtitle="Đừng bỏ lỡ cơ hội sở hữu căn hộ mặt biển Trần Phú với ưu đãi đặc quyền"
      badgeLabel="Ưu đãi giới hạn"
    />
  );
}

/**
 * Facebook Pixel Custom Events Helper
 * Pixel ID được khai báo trong client/index.html
 *
 * Chỉ chạy phía client. Sử dụng tại các điểm conversion:
 *  - fbLead()        : Khi submit form thành công (ContactSection, FloatingCTA, ExitIntent)
 *  - fbContact()     : Khi nhấn Gọi/Zalo (Header, Hero, Footer, FloatingCTA)
 *  - fbViewContent() : Khi cuộn đến section Ưu đãi (PromotionsSection)
 */

declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  try {
    window.fbq("track", event, params);
  } catch (err) {
    console.warn("[FB Pixel] track failed:", err);
  }
}

export function fbLead(params?: { content_name?: string; value?: number; currency?: string }) {
  track("Lead", {
    content_name: params?.content_name ?? "OceanFront Horizon Lead Form",
    value: params?.value ?? 0,
    currency: params?.currency ?? "VND",
  });
}

export function fbContact(method: "phone" | "zalo" | "email" = "phone") {
  track("Contact", { method });
}

export function fbViewContent(contentName = "Promotions Section") {
  track("ViewContent", { content_name: contentName });
}

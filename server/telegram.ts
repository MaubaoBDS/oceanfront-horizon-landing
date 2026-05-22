/**
 * Telegram Bot helper - Gửi thông báo lead mới đến chat của chủ dự án
 * Bot: AnhNguyen OceanFront Horizon Lead Notifier
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export interface LeadNotification {
  id: number;
  name: string;
  phone: string;
  interest?: string | null;
  budget?: string | null;
  note?: string | null;
  source?: string | null;
  createdAt: Date;
}

const interestLabels: Record<string, string> = {
  "bang-gia": "Nhận bảng giá",
  "tham-quan": "Đặt lịch tham quan",
  "dau-tu": "Tư vấn đầu tư",
  "uu-dai": "Chính sách ưu đãi",
  "khac": "Nội dung khác",
};

const budgetLabels: Record<string, string> = {
  "duoi-2-ty": "Dưới 2 tỷ",
  "2-3-ty": "2 - 3 tỷ",
  "3-4-ty": "3 - 4 tỷ",
  "4-5-ty": "4 - 5 tỷ",
  "tren-5-ty": "Trên 5 tỷ",
};

function formatVietnamTime(date: Date): string {
  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function sendLeadNotification(lead: LeadNotification): Promise<boolean> {
  const interest = lead.interest ? (interestLabels[lead.interest] ?? lead.interest) : "Chưa chọn";
  const budget = lead.budget ? (budgetLabels[lead.budget] ?? lead.budget) : "Chưa chọn";
  const time = formatVietnamTime(lead.createdAt);

  const message = `🌊 <b>LEAD MỚI - OCEANFRONT HORIZON</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Họ tên:</b> ${escapeHtml(lead.name)}
📞 <b>SĐT:</b> <code>${escapeHtml(lead.phone)}</code>
🎯 <b>Quan tâm:</b> ${escapeHtml(interest)}
💰 <b>Ngân sách:</b> ${escapeHtml(budget)}${lead.note ? `\n📝 <b>Ghi chú:</b> ${escapeHtml(lead.note)}` : ""}
🌐 <b>Nguồn:</b> ${escapeHtml(lead.source || "website")}
🕐 <b>Thời gian:</b> ${time}
━━━━━━━━━━━━━━━━━━━━
🔗 <a href="tel:${lead.phone}">Gọi ngay</a> | ID: #${lead.id}`;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env var; skipping notification");
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[Telegram] Failed to send message:", response.status, errText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Telegram] Error sending notification:", error);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

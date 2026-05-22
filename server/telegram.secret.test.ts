/**
 * Lightweight test xác minh TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID hợp lệ
 * Gọi Telegram API /getMe (không gửi tin nhắn thật) để verify token
 * Kèm getChat để verify chat ID có thể truy cập
 */
import { describe, expect, it } from "vitest";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

describe("Telegram Bot credentials", () => {
  it("env vars must be set", () => {
    expect(BOT_TOKEN).toBeTruthy();
    expect(CHAT_ID).toBeTruthy();
  });

  it("TELEGRAM_BOT_TOKEN must be valid (Telegram API /getMe returns ok)", async () => {
    if (!BOT_TOKEN) return;
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
    const data = (await res.json()) as { ok: boolean; result?: { username?: string } };
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.result?.username).toBeTruthy();
  }, 15000);

  it("TELEGRAM_CHAT_ID must be reachable (Telegram API /getChat returns ok)", async () => {
    if (!BOT_TOKEN || !CHAT_ID) return;
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${CHAT_ID}`,
    );
    const data = (await res.json()) as { ok: boolean; description?: string };
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
  }, 15000);
});

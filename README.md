# AnhNguyen OceanFront Horizon – Landing Page

> Landing page chính thức của dự án **AnhNguyen OceanFront Horizon · Nha Trang**, do **MSH Group** phân phối. Trang được xây dựng trên nền tảng [Manus Webdev](https://manus.im) với stack **React 19 + Tailwind 4 + tRPC 11 + MySQL (Drizzle ORM) + Express**.

## Production

- Domain chính: https://www.anhnguyenhorizonnhatrang.com
- Domain Manus mặc định: https://oceanfront-agtd4awy.manus.space
- Hotline: **0933.235.444** (Mậu Bảo – Giám đốc Dự án MSH Group)
- VR360 Tour: https://tav.vn/oceanfront/

> Tài liệu bàn giao chi tiết (kiến trúc, lead capture, Telegram, Facebook Pixel, quy trình mở rộng) nằm tại **[HANDOVER.md](./HANDOVER.md)**. Đọc file đó trước khi bắt đầu chỉnh sửa.

## Yêu cầu môi trường

- Node.js **22+**
- pnpm **10+** (`npm install -g pnpm`)
- MySQL **8.x** hoặc TiDB tương đương
- Tài khoản Telegram Bot (để nhận thông báo lead) – tuỳ chọn khi dev

## Cài đặt nhanh

```bash
pnpm install
cp .env.example .env       # nếu chưa có, xem mục biến môi trường trong HANDOVER.md
pnpm drizzle-kit migrate   # tạo bảng users, leads
pnpm dev                   # http://localhost:3000
```

## Lệnh thường dùng

| Lệnh | Mô tả |
| --- | --- |
| `pnpm dev` | Chạy dev server (Vite + Express + tsx watch) |
| `pnpm build` | Build frontend (Vite) và bundle backend (esbuild) ra `dist/` |
| `pnpm start` | Chạy bản production từ `dist/` |
| `pnpm test` | Chạy toàn bộ Vitest (hiện 13/13 pass) |
| `pnpm check` | Kiểm tra TypeScript |
| `pnpm drizzle-kit generate` | Sinh migration SQL từ thay đổi `drizzle/schema.ts` |

## Cấu trúc thư mục

| Thư mục | Vai trò |
| --- | --- |
| `client/src/pages/` | `Home`, `ThankYou` (`/cam-on`), `AdminLeads` (`/admin/leads`), `NotFound` |
| `client/src/components/landing/` | 13 component giao diện theo từng section (Header, Hero, …) |
| `client/src/lib/constants.ts` | **Toàn bộ nội dung dự án** – sửa nội dung ở đây |
| `client/src/lib/fbEvents.ts` | Helper Facebook Pixel (`fbLead`, `fbContact`, `fbViewContent`) |
| `client/src/index.css` | Token màu/font/animation |
| `client/index.html` | SEO meta, Open Graph, Twitter Card, FB Pixel script |
| `drizzle/schema.ts` | Schema bảng `users`, `leads` |
| `server/routers.ts` | tRPC: `contact.submitLead`, `contact.getLeads`, `contact.updateLeadStatus` |
| `server/db.ts` | Drizzle helpers cho CRUD |
| `server/telegram.ts` | Gửi thông báo lead qua Telegram Bot API |
| `server/*.test.ts` | 13 unit tests (logout, contact, telegram credentials) |

Các thư mục `server/_core/`, `patches/`, `client/src/_core/` là **framework Manus**, hạn chế sửa khi chưa hiểu rõ.

## Quy trình thêm tính năng

1. Cập nhật schema tại `drizzle/schema.ts` → `pnpm drizzle-kit generate` → apply migration.
2. Bổ sung query helper trong `server/db.ts`.
3. Bổ sung procedure trong `server/routers.ts` (chọn `publicProcedure` / `protectedProcedure` / `adminProcedure`).
4. Gọi từ UI bằng `trpc.<feature>.useQuery` hoặc `trpc.<feature>.useMutation`.
5. Viết test trong `server/*.test.ts` và chạy `pnpm test`.

## Sửa nội dung dự án (không cần code)

Mọi text, số liệu, ảnh, tiện ích, ưu đãi, kết nối hạ tầng đều khai báo tập trung tại `client/src/lib/constants.ts`. Đổi giá trị ở đây là trang tự cập nhật mà không cần đụng component.

## Liên hệ

- Chủ dự án: **Mậu Bảo** – `0933.235.444` – `maubao19982@gmail.com`
- Tài liệu bàn giao: [HANDOVER.md](./HANDOVER.md)
- Trợ giúp Manus Webdev: https://help.manus.im

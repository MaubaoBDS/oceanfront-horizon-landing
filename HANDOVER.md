# AnhNguyen OceanFront Horizon – Landing Page Handover

> Tài liệu bàn giao dự án landing page **AnhNguyen OceanFront Horizon · Nha Trang** – căn hộ mặt biển Trần Phú do **MSH Group** phân phối. Trang được xây dựng trên nền tảng **Manus Webdev** (React 19 + Tailwind 4 + tRPC 11 + MySQL).

---

## 1. Tổng quan dự án

Trang đích (landing page) được thiết kế theo định hướng **elegant – sang trọng – tinh tế**, phối màu chủ đạo *navy blue + gold + cream*, lấy cảm hứng từ phong cách của trang Hà Sơn Tower mà chủ đầu tư yêu thích. Toàn bộ giao diện được tối ưu cho thiết bị di động và máy tính, sử dụng font *Playfair Display* cho tiêu đề và *Inter* cho nội dung.

Trang có cấu trúc một-trang (single-page) với mười khu vực nội dung chính, thêm hai trang phụ là `Cảm ơn` (sau khi gửi form) và `Quản trị Lead` dành riêng cho admin. Mọi lead đều được lưu đồng thời vào cơ sở dữ liệu MySQL và gửi thông báo realtime tới chat Telegram của đội ngũ phân phối.

| Thông tin | Giá trị |
| --- | --- |
| Domain production | https://www.anhnguyenhorizonnhatrang.com |
| Domain Manus mặc định | https://oceanfront-agtd4awy.manus.space |
| Dev preview | https://3000-i7b2i2cea8qtc0qq40ha0-d91e0cfd.us2.manus.computer |
| Project path (sandbox) | `/home/ubuntu/oceanfront-horizon-landing` |
| Stack | React 19, Tailwind 4, tRPC 11, MySQL (Drizzle ORM), Express |
| Hotline hiển thị | 0933.235.444 (Mậu Bảo – Giám đốc Dự án MSH Group) |
| Telegram Chat ID | 5454158215 |
| VR360 Tour | https://tav.vn/oceanfront/ |
| Trang admin CRM | `/admin/leads` (yêu cầu role = admin) |
| Trang cảm ơn | `/cam-on` |

## 2. Cấu trúc trang đích

Trang chính `/` gồm các khu vực nội dung sau, theo đúng thứ tự cuộn: **Header sticky** với logo "OH" và điều hướng smooth-scroll; **Hero** với ảnh flycam, tagline *"Nơi Chân Trời Gặp Gỡ Đại Dương"* và bốn chỉ số nổi bật (415 căn / 38–72 m² / 10 tầng / Sở hữu lâu dài); **Tổng quan** trình bày bảng thông số dự án kèm sáu điểm nổi bật; **Vị trí** với bản đồ và tám điểm kết nối hạ tầng; **Tiện ích** giới thiệu hai feature lớn (Sky Galaxy Pool & Full Nội thất) cùng sáu tiện ích phụ; **Ưu đãi** liệt kê ba chính sách thanh toán linh hoạt; **VR360** với khu vực click-to-load iframe để tiết kiệm băng thông; **Hình ảnh** là lightbox 14 ảnh có điều hướng bàn phím (Esc, ←, →); **Liên hệ** đặt form lead bên trái và thông tin tư vấn viên bên phải; cuối cùng là **Footer** với thông tin liên hệ, pháp lý và navigation.

Ngoài ra trang còn tích hợp **Floating CTA** ba nút (Zalo, mở form, gọi) cố định góc phải dưới, **Exit-intent popup** kích hoạt khi chuột rê ra khỏi top viewport, **LeadFormDialog** dạng modal mở từ nhiều CTA trong các section, và **reveal-on-scroll animation** cho mọi khối nội dung chính (IntersectionObserver tự viết tại `client/src/hooks/useReveal.ts`).

## 3. Lead Capture & CRM

Form đăng ký gồm năm trường: **Họ tên** (bắt buộc, ≥ 2 ký tự), **Số điện thoại** (bắt buộc, regex Việt Nam), **Nội dung quan tâm** (chọn), **Ngân sách** (chọn), **Ghi chú thêm**. Form được dùng chung cho ba điểm chạm: Contact section, LeadFormDialog, ExitIntentPopup, đảm bảo mọi lead được xử lý qua cùng một pipeline.

Khi khách bấm gửi, hệ thống thực thi đồng thời ba hành động ở backend (procedure `contact.submitLead` tại `server/routers.ts`): **Insert** vào bảng `leads` của MySQL qua hàm `insertLead` (`server/db.ts`); **Gửi Telegram** thông báo tới chat MSH Group qua `sendLeadNotification` (`server/telegram.ts`) với HTML formatting bao gồm tên, số điện thoại (clickable), nội dung quan tâm, ngân sách, ghi chú và mã lead; và **Trả về** ID lead cho frontend để chuyển hướng sang `/cam-on` và bắn các sự kiện Facebook Pixel (`Lead`, `Contact`).

CRM nội bộ tại `/admin/leads` cho phép admin xem danh sách lead, lọc theo trạng thái (`new` → `contacted` → `qualified` → `converted` → `lost`), cập nhật trạng thái và ghi chú nội bộ. Truy cập được bảo vệ ở **cả frontend (route guard)** và **backend (`adminProcedure`)** – thành viên thường (`role = "user"`) sẽ nhận lỗi `FORBIDDEN` khi gọi `getLeads` hoặc `updateLeadStatus`. Để phân quyền admin, đăng nhập một lần để tài khoản được tạo trong bảng `users`, sau đó vào *Management UI → Database* và set `role = 'admin'` cho user đó.

## 4. Tích hợp Telegram & Facebook Pixel

Telegram Bot Token và Chat ID được lưu an toàn trong **biến môi trường** (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). File `server/telegram.ts` không còn fallback hardcode; nếu thiếu env, hệ thống chỉ ghi log cảnh báo và bỏ qua bước notify mà không làm hỏng flow lưu DB. Khi cần đổi bot hoặc chuyển chat ID, vào *Settings → Secrets* trong Manus Webdev.

Facebook Pixel hiện đặt placeholder `PIXEL_ID_HERE` trong `client/index.html` (script khởi tạo + noscript fallback). Sau khi có Pixel ID thật từ Business Manager, chỉ cần thay chuỗi `PIXEL_ID_HERE` (xuất hiện hai lần: `fbq('init', ...)` và URL ảnh tracking trong `<noscript>`). Helper `client/src/lib/fbEvents.ts` cung cấp các hàm tiện lợi `fbLead()`, `fbContact()`, `fbViewContent()` đã được gọi đúng chỗ trong các section.

## 5. Quản lý ảnh & Asset

14 ảnh dự án đã được upload lên CDN của Manus Webdev và được tham chiếu qua đường dẫn dạng `/manus-storage/<key>_<hash>.<ext>`. Toàn bộ key ảnh được tập trung tại `client/src/lib/constants.ts` (export `IMAGES`, `GALLERY`). Khi cần thêm ảnh mới, dùng lệnh `manus-upload-file --webdev <đường dẫn ảnh>` rồi cập nhật key vào `IMAGES` hoặc `GALLERY` tương ứng. Tuyệt đối không lưu ảnh trực tiếp trong `client/public/` vì sẽ gây lỗi deploy timeout.

## 6. SEO & Hiệu năng

File `client/index.html` đã khai báo đầy đủ `<title>`, `meta description`, **Open Graph** (og:title / og:description / og:image / og:locale / og:site_name / og:type) và **Twitter Card** (`summary_large_image`). Ảnh share mặc định là `hero-bird-view`. Trang sử dụng `loading="lazy"` cho ảnh ngoài viewport, font preload, và clip-path nhẹ để tránh layout shift.

Bộ kiểm thử Vitest (`pnpm test`) hiện có **13/13 tests pass**: `server/auth.logout.test.ts` (1 test) kiểm tra logout xóa cookie; `server/contact.test.ts` (9 tests) kiểm tra validation form, role-based access và format tin nhắn Telegram; `server/telegram.secret.test.ts` (3 tests) gọi trực tiếp Telegram API để xác nhận Bot Token và Chat ID còn hợp lệ.

## 7. Bàn giao mã nguồn qua GitHub

Để bàn giao toàn bộ mã nguồn cho đối tác phát triển, **chủ dự án (Mậu Bảo)** thực hiện theo trình tự sau ngay trên giao diện Manus:

**Bước 1 – Mở Management UI**: Bấm vào nút biểu tượng panel ở header chatbox (hoặc bấm vào card dự án), sau đó vào *Settings → GitHub*.

**Bước 2 – Kết nối tài khoản GitHub**: Bấm *Connect GitHub* và uỷ quyền cho Manus. Sau khi kết nối, danh sách Owner sẽ hiện ra (cá nhân và các tổ chức bạn có quyền tạo repo).

**Bước 3 – Tạo repo mới**: Chọn Owner (ví dụ `MaubaoBDS`), nhập tên repo (gợi ý `anhnguyen-oceanfront-horizon-landing`), chọn *Public* hoặc *Private*, sau đó bấm *Export to GitHub*. Manus sẽ tự động commit và push toàn bộ code (loại trừ `node_modules`, `.env`, `.manus-logs`) lên repo vừa tạo.

**Bước 4 – Thêm đối tác làm collaborator**: Vào repo trên GitHub → *Settings → Collaborators → Add people*, nhập username/email của đối tác để cấp quyền chỉnh sửa.

**Bước 5 – Gửi đối tác**: Cung cấp cho đối tác URL repo và đường dẫn file `HANDOVER.md` (ở root repo). Họ có thể clone về máy và chạy theo phần *Phát triển local* bên dưới.

## 8. Phát triển local (dành cho đối tác)

Đối tác cần chuẩn bị **Node.js 22+** và **pnpm 10+**. Khi tách khỏi môi trường Manus, đối tác sẽ phải tự dựng MySQL và cung cấp các biến môi trường tương đương. Quy trình chuẩn như sau:

```bash
git clone <repo-url>
cd anhnguyen-oceanfront-horizon-landing
pnpm install
cp .env.example .env   # nếu chưa có, xem mục Biến môi trường bên dưới
pnpm drizzle-kit migrate   # tạo bảng users, leads
pnpm dev   # chạy dev server tại http://localhost:3000
pnpm test  # chạy 13 bài test
pnpm build # build production
pnpm start # chạy bản build production
```

Các script chính được khai báo trong `package.json`: `dev` chạy `tsx watch server/_core/index.ts`; `build` build frontend Vite và bundle backend qua esbuild; `start` chạy bản build; `test` chạy Vitest; `check` chạy `tsc --noEmit`.

### Biến môi trường tối thiểu

Khi chạy ngoài Manus, đối tác cần khai báo các biến sau trong `.env`:

| Biến | Mục đích |
| --- | --- |
| `DATABASE_URL` | Chuỗi kết nối MySQL/TiDB (ví dụ `mysql://user:pass@host:3306/oceanfront`) |
| `JWT_SECRET` | Chuỗi ngẫu nhiên để ký session cookie |
| `TELEGRAM_BOT_TOKEN` | Token bot Telegram nhận thông báo lead |
| `TELEGRAM_CHAT_ID` | Chat ID (`5454158215` đang dùng) |
| `VITE_APP_TITLE` | Tiêu đề trang hiển thị (tùy chọn override) |
| `VITE_APP_ID` / `OAUTH_SERVER_URL` / `VITE_OAUTH_PORTAL_URL` | Chỉ cần nếu giữ luồng OAuth của Manus; có thể thay bằng auth tự dựng |

Các biến `BUILT_IN_FORGE_*`, `VITE_FRONTEND_FORGE_*` là dịch vụ nội bộ của Manus (LLM, storage proxy, notification…). Nếu đối tác chuyển sang hạ tầng khác, cần thay thế phần `server/_core/*` tương ứng (Manus đã cô lập sẵn vào folder này để dễ thay).

## 9. Cấu trúc thư mục cốt lõi

Phần code cần sửa nằm trong các thư mục có dấu mũi tên dưới đây – các phần khác (`server/_core`, tooling, patches) là framework của Manus, hạn chế chỉnh sửa.

```
client/
  src/
    pages/                    ← Home, ThankYou, AdminLeads, NotFound
    components/landing/       ← Header, Hero, OverviewSection, LocationSection,
                                AmenitiesSection, PromotionsSection, VR360Section,
                                GallerySection, ContactSection, Footer,
                                FloatingCTA, ExitIntentPopup, LeadForm, LeadFormDialog
    components/ui/            ← shadcn/ui (button, dialog, input, …)
    hooks/useReveal.ts        ← IntersectionObserver cho animation
    lib/constants.ts          ← TOÀN BỘ nội dung dự án (sửa nội dung ở đây)
    lib/fbEvents.ts           ← Helper Facebook Pixel
    index.css                 ← Tokens màu, font, animation reveal
  index.html                  ← Meta SEO, OG, Twitter, FB Pixel
drizzle/
  schema.ts                   ← Bảng users, leads
  migrations/                 ← SQL migrations đã apply
server/
  routers.ts                  ← tRPC: contact.submitLead, contact.getLeads, contact.updateLeadStatus
  db.ts                       ← Drizzle helpers: upsertUser, insertLead, getLeads, updateLeadStatus
  telegram.ts                 ← Gửi thông báo Telegram
  contact.test.ts             ← 9 unit tests
  telegram.secret.test.ts     ← 3 tests credentials Telegram
  auth.logout.test.ts         ← 1 test logout
shared/
  const.ts, types.ts          ← Hằng số dùng chung
HANDOVER.md                   ← Tài liệu bạn đang đọc
README.md                     ← Onboarding nhanh cho developer
todo.md                       ← Lịch sử feature đã build
```

## 10. Quy trình mở rộng & vận hành

Khi cần **sửa nội dung tĩnh** (mô tả, bảng thông số, số căn, danh sách tiện ích, ưu đãi, kết nối hạ tầng), chỉ cần sửa `client/src/lib/constants.ts` – không phải đụng vào component. Khi cần **đổi màu sắc / typography**, chỉnh `client/src/index.css` (đã dùng CSS variables theo token Tailwind 4). Khi cần **thêm hoặc bớt section**, chỉnh `client/src/pages/Home.tsx`.

Khi cần **thêm trường vào form lead**, thực hiện ba thay đổi đồng bộ: cập nhật schema tại `drizzle/schema.ts`, chạy `pnpm drizzle-kit generate` để sinh migration, áp dụng migration; mở rộng Zod schema và logic trong `contact.submitLead` (`server/routers.ts`); thêm input UI trong `client/src/components/landing/LeadForm.tsx`. Sau đó viết thêm test trong `server/contact.test.ts` và chạy `pnpm test`.

Khi cần **deploy bản mới** trên hạ tầng Manus, tạo checkpoint mới rồi bấm *Publish* ở header. Tên miền custom `www.anhnguyenhorizonnhatrang.com` và domain mặc định `oceanfront-agtd4awy.manus.space` đã được gắn sẵn. Mọi yêu cầu mở rộng (trang chi tiết loại căn, máy tính lãi vay, blog tin tức, chatbot AI tư vấn) đều có thể bổ sung dễ dàng nhờ kiến trúc tRPC + Drizzle hiện tại.

## 11. Liên hệ bàn giao

Mọi vấn đề về **nội dung dự án** liên hệ chủ dự án Mậu Bảo (`0933.235.444`, `maubao19982@gmail.com`). Mọi vấn đề về **hạ tầng Manus** (publish, domain, secrets, database UI) tham khảo trực tiếp tại https://help.manus.im. Mọi vấn đề về **mã nguồn** sau bàn giao do đối tác phát triển tiếp nhận và xử lý dựa trên kiến trúc đã mô tả trong tài liệu này.

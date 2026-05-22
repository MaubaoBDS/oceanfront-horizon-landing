# AnhNguyen OceanFront Horizon – Landing Page Handover

> Tài liệu bàn giao dự án landing page **AnhNguyen OceanFront Horizon · Nha Trang** – căn hộ mặt biển Trần Phú do **MSH Group** phân phối. Trang được xây dựng trên nền tảng **Manus Webdev** (React 19 + Tailwind 4 + tRPC 11 + MySQL).

---

## 1. Tổng quan dự án

Trang đích (landing page) được thiết kế theo định hướng **elegant – sang trọng – tinh tế**, phối màu chủ đạo *navy blue + gold + cream*, lấy cảm hứng từ phong cách của trang Hà Sơn Tower mà chủ đầu tư yêu thích. Toàn bộ giao diện được tối ưu cho thiết bị di động và máy tính, sử dụng font *Playfair Display* cho tiêu đề và *Inter* cho nội dung.

Trang có cấu trúc một-trang (single-page) với mười khu vực nội dung chính, thêm hai trang phụ là `Cảm ơn` (sau khi gửi form) và `Quản trị Lead` dành riêng cho admin. Mọi lead đều được lưu đồng thời vào cơ sở dữ liệu MySQL và gửi thông báo realtime tới chat Telegram của đội ngũ phân phối.

| Thông tin | Giá trị |
| --- | --- |
| Đường dẫn dev | https://3000-i7b2i2cea8qtc0qq40ha0-d91e0cfd.us2.manus.computer |
| Dev port | 3000 |
| Project path | `/home/ubuntu/oceanfront-horizon-landing` |
| Stack | React 19, Tailwind 4, tRPC 11, MySQL (Drizzle ORM), Express |
| Hotline hiển thị | 0933.235.444 (Mậu Bảo – Giám đốc Dự án MSH Group) |
| Telegram Chat ID | 5454158215 |
| VR360 Tour | https://tav.vn/oceanfront/ |

## 2. Cấu trúc trang đích

Trang chính `/` gồm các khu vực nội dung sau, theo đúng thứ tự cuộn:

1. **Header sticky** – Logo "OH" + tên dự án, điều hướng nội bộ (smooth scroll), nút hotline.
2. **Hero** – Ảnh nền tổng thể từ flycam, tagline *"Nơi Chân Trời Gặp Gỡ Đại Dương"*, bốn chỉ số nổi bật (415 căn / 38–72 m² / 10 tầng / Sở hữu lâu dài), hai CTA gọi và mở form.
3. **Tổng quan** – Bảng thông số dự án + sáu điểm nổi bật (mặt tiền vịnh biển, sở hữu lâu dài, tọa sơn nghinh hải, kỷ lục tiện ích, 300 ngày nắng, tiềm năng sinh lời).
4. **Vị trí** – Bản đồ vị trí + tám điểm kết nối hạ tầng (Vinpearl Land, Bệnh viện Quốc tế, sân bay Cam Ranh, Cảng Cầu Đá, …).
5. **Tiện ích** – Hai feature lớn (Sky Galaxy Pool & Full Nội thất) + sáu tiện ích phụ.
6. **Ưu đãi** – Ba chính sách thanh toán linh hoạt + dải CTA đặt giữa.
7. **VR360** – Khu vực click-to-load iframe `https://tav.vn/oceanfront/` (giúp tiết kiệm băng thông trang chủ).
8. **Hình ảnh** – Lightbox 14 ảnh với điều hướng bàn phím (Esc, ←, →).
9. **Liên hệ** – Form lead chính (cột trái) + thông tin tư vấn viên (cột phải).
10. **Footer** – Thông tin liên hệ, pháp lý, navigation.

Ngoài ra trang còn tích hợp:

- **Floating CTA** (Zalo, Form, Phone) cố định góc phải dưới.
- **Exit-intent popup** kích hoạt khi chuột rê ra khỏi top viewport.
- **LeadFormDialog** (modal) được mở từ Floating CTA, các nút "Nhận tư vấn miễn phí", "Nhận bảng giá ngay" trong các section.
- **Reveal-on-scroll animation** cho mọi khối nội dung chính (sử dụng IntersectionObserver tự viết tại `client/src/hooks/useReveal.ts`).

## 3. Lead Capture & CRM

Form đăng ký gồm năm trường: **Họ tên** (bắt buộc, ≥ 2 ký tự), **Số điện thoại** (bắt buộc, regex Việt Nam), **Nội dung quan tâm** (chọn), **Ngân sách** (chọn), **Ghi chú thêm**. Form được dùng chung cho ba điểm chạm: Contact section, LeadFormDialog, ExitIntentPopup, đảm bảo mọi lead được xử lý qua cùng một pipeline.

Khi khách bấm gửi, hệ thống thực thi đồng thời ba hành động ở backend (procedure `contact.submitLead` tại `server/routers.ts`):

1. **Insert** vào bảng `leads` của MySQL qua hàm `insertLead` (`server/db.ts`).
2. **Gửi Telegram** thông báo tới chat của MSH Group qua `sendLeadNotification` (`server/telegram.ts`). Nội dung tin nhắn dùng HTML formatting, có ghi rõ tên, số điện thoại (clickable), nội dung quan tâm, ngân sách, ghi chú và mã lead.
3. **Trả về** ID lead cho frontend để chuyển hướng sang `/cam-on` (Thank You page) và bắn các sự kiện Facebook Pixel (`Lead`, `Contact`).

CRM nội bộ tại `/admin/leads` cho phép admin xem danh sách lead, lọc theo trạng thái (`new` → `contacted` → `qualified` → `converted` → `lost`), cập nhật trạng thái và ghi chú nội bộ. Truy cập được bảo vệ ở **cả frontend (route guard)** và **backend (`adminProcedure`)** – thành viên thường (`role = "user"`) sẽ nhận lỗi `FORBIDDEN` khi gọi `getLeads` hoặc `updateLeadStatus`.

## 4. Tích hợp Telegram & Facebook Pixel

Telegram Bot Token và Chat ID được lưu an toàn trong **biến môi trường** (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). File `server/telegram.ts` không còn fallback hardcode; nếu thiếu env, hệ thống chỉ ghi log cảnh báo và bỏ qua bước notify mà không làm hỏng flow lưu DB. Khi cần đổi bot hoặc chuyển chat ID, vào *Settings → Secrets* trong Manus Webdev hoặc gọi lại `webdev_request_secrets`.

Facebook Pixel hiện đặt placeholder `PIXEL_ID_HERE` trong `client/index.html` (script khởi tạo + noscript fallback). Sau khi có Pixel ID thật từ Business Manager, chỉ cần thay chuỗi `PIXEL_ID_HERE` (xuất hiện hai lần: `fbq('init', ...)` và URL ảnh tracking trong `<noscript>`). Helper `client/src/lib/fbEvents.ts` cung cấp các hàm tiện lợi `fbLead()`, `fbContact()`, `fbViewContent()` đã được gọi đúng chỗ trong các section.

## 5. Quản lý ảnh & Asset

14 ảnh dự án đã được upload lên CDN của Manus Webdev và được tham chiếu qua đường dẫn dạng `/manus-storage/<key>_<hash>.<ext>`. Toàn bộ key ảnh được tập trung tại `client/src/lib/constants.ts` (export `IMAGES`, `GALLERY`). Khi cần thêm ảnh mới, dùng lệnh:

```bash
manus-upload-file --webdev /home/ubuntu/webdev-static-assets/oceanfront-horizon/<file>
```

Sau đó cập nhật key vào `IMAGES` hoặc `GALLERY` tương ứng – không lưu ảnh trong `client/public/` để tránh lỗi deploy timeout.

## 6. SEO & Hiệu năng

File `client/index.html` đã khai báo đầy đủ `<title>`, `meta description`, **Open Graph** (og:title / og:description / og:image / og:locale / og:site_name / og:type) và **Twitter Card** (`summary_large_image`). Ảnh share mặc định là `hero-bird-view`. Trang sử dụng `loading="lazy"` cho ảnh ngoài viewport, font preload, và clip-path nhẹ để tránh layout shift.

Bộ kiểm thử Vitest (`pnpm test`) hiện có **13/13 tests pass**, bao gồm:

| File | Số tests | Mục đích |
| --- | --- | --- |
| `server/auth.logout.test.ts` | 1 | Logout xóa cookie |
| `server/contact.test.ts` | 9 | Validation form, role-based access (admin), telegram message format |
| `server/telegram.secret.test.ts` | 3 | Bot token và Chat ID còn hợp lệ trên Telegram API |

## 7. Vận hành & Bảo trì

Để chỉnh nội dung dự án (mô tả, bảng thông số, số căn, danh sách tiện ích, ưu đãi, kết nối hạ tầng), chỉ cần sửa file `client/src/lib/constants.ts` – không cần đụng vào component. Để đổi màu sắc / typography, chỉnh `client/src/index.css` (đã dùng CSS variables theo token Tailwind 4). Để thêm/bớt section, chỉnh `client/src/pages/Home.tsx`.

Khi muốn xuất bản, làm theo các bước:

1. Vào *Settings → Secrets* và đặt giá trị thật cho `VITE_APP_TITLE` (nếu muốn override), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (đã set sẵn).
2. Thay `PIXEL_ID_HERE` trong `client/index.html` bằng Facebook Pixel ID thật.
3. Bấm nút **Publish** ở góc phải header Webdev (cần tạo checkpoint trước).
4. Sau khi publish, vào *Settings → Domains* để gắn tên miền tùy chỉnh nếu cần.

Mọi yêu cầu mở rộng (thêm trang chi tiết căn hộ, tính lãi vay, blog tin tức, AI tư vấn) đều có thể bổ sung dễ dàng nhờ kiến trúc tRPC + Drizzle hiện tại. Khi mở rộng, nhớ thêm test Vitest tương ứng và lưu checkpoint trước mỗi thay đổi rủi ro để có thể rollback an toàn.

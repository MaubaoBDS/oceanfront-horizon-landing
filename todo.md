# AnhNguyen OceanFront Horizon Landing Page - TODO

## Phase 1: Database & Foundation
- [x] Định nghĩa schema bảng `leads` trong drizzle/schema.ts (thêm role admin vào users)
- [x] Generate migration và apply qua webdev_execute_sql
- [x] Tạo db helpers cho leads (insertLead, getLeads, updateLeadStatus)
- [x] Upload 14 ảnh dự án lên CDN qua manus-upload-file --webdev
- [x] Tạo constants.ts với tất cả thông tin dự án (CONTACT, IMAGES, PROJECT, SEO, HIGHLIGHTS, PROMOTIONS, INFRASTRUCTURE, AMENITIES, GALLERY, NAV_ITEMS, FORM_OPTIONS)

## Phase 2: Server-side & Integrations
- [x] Tạo server/telegram.ts với Bot Token + Chat ID 5454158215 (đã chuyển sang env vars)
- [x] Tạo tRPC procedures: contact.submitLead, contact.getLeads, contact.updateLeadStatus (protected)
- [x] Tạo adminProcedure cho role-based access control
- [x] Tạo client/src/lib/fbEvents.ts (fbLead, fbContact, fbViewContent)
- [x] Cấu hình SEO meta tags + Facebook Pixel placeholder trong client/index.html

## Phase 3: UI Components - Landing Page Sections
- [x] Thiết kế theme elegant (navy + gold + cream) trong index.css
- [x] Header.tsx - Logo, nav menu, hotline, CTA button (sticky + smooth scroll)
- [x] Hero.tsx - Ảnh hero, tagline, 4 stats, CTA buttons
- [x] OverviewSection.tsx - 6 highlights + bảng thông số dự án + 2 ảnh
- [x] LocationSection.tsx - Vị trí + 8 điểm kết nối hạ tầng + map
- [x] AmenitiesSection.tsx - 6 tiện ích + 2 ảnh feature lớn
- [x] PromotionsSection.tsx - 3 ưu đãi + ViewContent tracking
- [x] VR360Section.tsx - iframe https://tav.vn/oceanfront/ với click-to-load
- [x] GallerySection.tsx - Lightbox 14 ảnh với keyboard navigation
- [x] ContactSection.tsx - Form lead chính + thông tin liên hệ
- [x] Footer.tsx - Thông tin liên hệ, pháp lý, navigation

## Phase 4: Conversion Features
- [x] FloatingCTA.tsx - Nút Zalo + Form + Gọi ngay cố định
- [x] ExitIntentPopup.tsx - Popup khi rê chuột thoát top viewport
- [x] LeadFormDialog.tsx - Modal popup chứa form lead
- [x] ThankYou page tại /cam-on
- [x] AdminLeads page tại /admin/leads với role guard (admin only)
- [x] Reveal-on-scroll animation cho tất cả sections

## Phase 5: Quality & Deployment
- [x] Vitest tests cho contact router (10/10 tests pass)
- [x] Kiểm tra TypeScript: không lỗi
- [x] Test giao diện toàn bộ sections (browser scroll review)
- [x] Tối ưu SEO meta tags (title, description, og:image, twitter:card)
- [x] Tạo HANDOVER.md
- [x] Save checkpoint

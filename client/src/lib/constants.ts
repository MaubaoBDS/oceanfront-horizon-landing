// AnhNguyen OceanFront Horizon - Constants & Data
// FILE DUY NHẤT cần sửa khi thay đổi nội dung dự án

export const CONTACT = {
  name: "Mậu Bảo",
  title: "Giám Đốc Dự Án",
  company: "MSH Group",
  phone: "0933235444",
  phoneFormatted: "0933.235.444",
  email: "maubao19982@gmail.com",
  zalo: "https://zalo.me/0933235444",
  experience: "10+ năm kinh nghiệm tư vấn BĐS",
} as const;

export const IMAGES = {
  // 14 ảnh đã upload lên CDN
  hero: "/manus-storage/hero-bird-view_f897d21f.jpg",
  heroAlt: "/manus-storage/hero-overview-day_83c187f9.jpg",
  bannerTranPhu: "/manus-storage/banner-trantphu_41eedf7d.jpg",
  overviewAerial: "/manus-storage/overview-aerial_604b213b.jpg",
  overviewNightFireworks: "/manus-storage/overview-night-fireworks_bb0d9444.jpg",
  conceptAerial: "/manus-storage/concept-aerial_3c8708ff.webp",
  conceptLocation: "/manus-storage/concept-location_5ece31b1.webp",
  horizonApartments: "/manus-storage/horizon-apartments_611114cf.webp",
  interiorLivingroom: "/manus-storage/interior-livingroom_f0694bbc.jpg",
  skyGalaxyPool: "/manus-storage/sky-galaxy-pool_0124ac42.jpg",
  poolNightView: "/manus-storage/pool-night-view_242459bf.jpg",
  infinityPoolNight: "/manus-storage/infinity-pool-night_720f502a.jpg",
  locationMap: "/manus-storage/location-tranphu-map_26f1e9f0.jpg",
  actualProgress: "/manus-storage/actual-progress_93bfb583.jpg",
} as const;

export const PROJECT = {
  name: "AnhNguyen OceanFront Horizon",
  shortName: "OceanFront Horizon",
  developer: "Công ty TNHH Anh Nguyễn",
  operator: "PMC",
  distributor: "MSH Group – Tổng Đại Lý Phân Phối",
  location: "Đường Trần Phú, phường Vĩnh Nguyên, TP. Nha Trang, Khánh Hòa",
  totalArea: "4.825,7 m²",
  floors: "1 tầng hầm – 10 tầng nổi",
  totalUnits: "415 căn hộ",
  productTypes: "Studio | 1 Phòng ngủ | 2 Phòng ngủ",
  apartmentArea: "38 – 72 m²",
  legal: "Sở hữu lâu dài – Sổ hồng vĩnh viễn",
  handover: "Bàn giao full nội thất cao cấp",
  tagline: "Nơi Chân Trời Gặp Gỡ Đại Dương",
  subTagline: "Căn hộ nghỉ dưỡng sở hữu lâu dài mặt tiền vịnh Nha Trang",
  status: "Đang mở bán",
  vr360: "https://tav.vn/oceanfront/",
  website: "https://anhnguyenhorizon.mshgroup.vn/",
} as const;

export const SEO = {
  title: "AnhNguyen OceanFront Horizon – Căn Hộ Mặt Biển Trần Phú Nha Trang | MSH Group",
  description:
    "AnhNguyen OceanFront Horizon – 415 căn hộ sở hữu lâu dài mặt tiền vịnh Nha Trang. Diện tích 38–72m², bàn giao full nội thất cao cấp. Tổng đại lý phân phối MSH Group: 0933.235.444",
  keywords:
    "AnhNguyen OceanFront Horizon, căn hộ Nha Trang, condotel Trần Phú, MSH Group, sở hữu lâu dài, căn hộ mặt biển",
  ogImage: "/manus-storage/hero-bird-view_f897d21f.jpg",
} as const;

export const HIGHLIGHTS = [
  {
    icon: "waves",
    title: "Mặt tiền vịnh biển",
    desc: "Tọa lạc đường Trần Phú – trục huyết mạch đắt giá nhất Nha Trang, view trọn vịnh biển đẹp nhất thế giới",
  },
  {
    icon: "file-check",
    title: "Sở hữu lâu dài",
    desc: "Sổ hồng vĩnh viễn – lợi thế khan hiếm trên cung đường mặt biển Trần Phú",
  },
  {
    icon: "mountain",
    title: "Tọa Sơn – Nghinh Hải",
    desc: "Tựa lưng núi đá Cảnh Long, mặt tiền hướng trọn vịnh Nha Trang – phong thủy hội tụ vượng khí",
  },
  {
    icon: "building-2",
    title: "Kỷ lục tiện ích",
    desc: "Sky Galaxy Pool 102m dài nhất Việt Nam, Infinity Cascade cao nhất Nha Trang, Vertical Forest độc đáo",
  },
  {
    icon: "sun",
    title: "300 ngày nắng/năm",
    desc: "Khí hậu lý tưởng quanh năm, vịnh biển trong ngọc, điểm lặn biển đẹp hàng đầu thế giới",
  },
  {
    icon: "trending-up",
    title: "Tiềm năng sinh lời",
    desc: "Khánh Hòa đón 16,4 triệu lượt khách 2025, du lịch biển đảo bùng nổ, tỷ suất cho thuê hấp dẫn",
  },
] as const;

export const PROMOTIONS = [
  {
    title: "Thanh toán linh hoạt",
    description:
      "Chỉ cần 30% ký hợp đồng, tiến độ thanh toán chia nhiều đợt theo tiến độ thi công, giảm áp lực tài chính tối đa",
    icon: "wallet",
  },
  {
    title: "Hỗ trợ vay ngân hàng 70%",
    description:
      "Ngân hàng hỗ trợ vay tối đa 70% giá trị căn hộ, lãi suất ưu đãi, thủ tục nhanh chóng",
    icon: "banknote",
  },
  {
    title: "Bàn giao full nội thất",
    description:
      "Căn hộ bàn giao hoàn thiện 100% nội thất cao cấp, sẵn sàng cho thuê ngay – không tốn thêm chi phí hoàn thiện",
    icon: "gift",
  },
] as const;

export const INFRASTRUCTURE = [
  { name: "Vinpearl Land", distance: "1 phút", status: "Hoạt động" },
  { name: "Bệnh viện Quốc tế", distance: "3 phút", status: "Hoạt động" },
  { name: "Trung tâm TP. Nha Trang", distance: "5 phút", status: "Hoạt động" },
  { name: "Sân bay Cam Ranh", distance: "30 phút", status: "Hoạt động" },
  { name: "Hòn Tre – Hòn Mun", distance: "Đối diện", status: "Hoạt động" },
  { name: "Cảng Cầu Đá", distance: "Đối diện", status: "Hoạt động" },
  { name: "Đường Trần Phú", distance: "Mặt tiền", status: "Hoạt động" },
  { name: "Phố đêm Nha Trang", distance: "5 phút", status: "Hoạt động" },
] as const;

export const AMENITIES = [
  {
    icon: "waves",
    title: "Sky Galaxy Pool 102m",
    desc: "Bể bơi galaxy trên cao dài nhất Việt Nam, view trọn vịnh biển",
  },
  {
    icon: "droplets",
    title: "Infinity Cascade",
    desc: "Thác nước tràn cao nhất Nha Trang, kiến trúc độc bản",
  },
  {
    icon: "trees",
    title: "Vertical Forest",
    desc: "Rừng sinh thái thẳng đứng độc đáo nhất Nha Trang, không khí trong lành",
  },
  {
    icon: "dumbbell",
    title: "Gym & Spa Resort",
    desc: "Phòng tập hiện đại, spa thư giãn chuẩn 5 sao",
  },
  {
    icon: "utensils",
    title: "Sky Bar & Restaurant",
    desc: "Nhà hàng, bar trên cao view biển 360 độ",
  },
  {
    icon: "shield-check",
    title: "An ninh 24/7",
    desc: "Camera giám sát toàn diện, bảo vệ chuyên nghiệp, thang máy tốc độ cao",
  },
] as const;

export const STATS = [
  { value: "415", label: "Căn hộ", unit: "" },
  { value: "38-72", label: "m² / căn", unit: "" },
  { value: "10", label: "Tầng nổi", unit: "" },
  { value: "Lâu dài", label: "Sở hữu", unit: "" },
] as const;

export const GALLERY = [
  { src: IMAGES.hero, alt: "Phối cảnh tổng thể AnhNguyen OceanFront Horizon nhìn từ trên cao" },
  { src: IMAGES.heroAlt, alt: "Toàn cảnh dự án OceanFront Horizon ban ngày" },
  { src: IMAGES.overviewNightFireworks, alt: "OceanFront Horizon về đêm với pháo hoa lung linh" },
  { src: IMAGES.skyGalaxyPool, alt: "Sky Galaxy Pool 102m dài nhất Việt Nam" },
  { src: IMAGES.infinityPoolNight, alt: "Bể bơi vô cực đêm Sky Galaxy Pool" },
  { src: IMAGES.poolNightView, alt: "Bể bơi tầng cao view vịnh Nha Trang" },
  { src: IMAGES.conceptAerial, alt: "Phối cảnh tổng thể OceanFront Horizon từ flycam" },
  { src: IMAGES.conceptLocation, alt: "Vị trí dự án trên trục đường Trần Phú" },
  { src: IMAGES.horizonApartments, alt: "Tổ hợp căn hộ Horizon nhìn từ vịnh" },
  { src: IMAGES.overviewAerial, alt: "Toàn cảnh dự án ngày bên vịnh Nha Trang" },
  { src: IMAGES.bannerTranPhu, alt: "Đường Trần Phú – con đường danh giá bậc nhất Nha Trang" },
  { src: IMAGES.interiorLivingroom, alt: "Nội thất phòng khách căn hộ view biển" },
  { src: IMAGES.locationMap, alt: "Bản đồ vị trí dự án và tiện ích xung quanh" },
  { src: IMAGES.actualProgress, alt: "Tiến độ thực tế dự án tháng 5/2026" },
] as const;

export const NAV_ITEMS = [
  { label: "Tổng quan", href: "#overview" },
  { label: "Vị trí", href: "#location" },
  { label: "Tiện ích", href: "#amenities" },
  { label: "Ưu đãi", href: "#promotions" },
  { label: "VR360", href: "#vr360" },
  { label: "Hình ảnh", href: "#gallery" },
  { label: "Liên hệ", href: "#contact" },
] as const;

export const FORM_OPTIONS = {
  interests: [
    { value: "bang-gia", label: "Nhận bảng giá" },
    { value: "tham-quan", label: "Đặt lịch tham quan" },
    { value: "dau-tu", label: "Tư vấn đầu tư" },
    { value: "uu-dai", label: "Chính sách ưu đãi" },
    { value: "khac", label: "Nội dung khác" },
  ],
  budgets: [
    { value: "duoi-2-ty", label: "Dưới 2 tỷ" },
    { value: "2-3-ty", label: "2 - 3 tỷ" },
    { value: "3-4-ty", label: "3 - 4 tỷ" },
    { value: "4-5-ty", label: "4 - 5 tỷ" },
    { value: "tren-5-ty", label: "Trên 5 tỷ" },
  ],
} as const;

export const LEAD_STATUS = {
  new: { label: "Mới", color: "bg-blue-100 text-blue-700" },
  in_progress: { label: "Đang xử lý", color: "bg-amber-100 text-amber-700" },
  contacted: { label: "Đã liên hệ", color: "bg-purple-100 text-purple-700" },
  closed: { label: "Chốt", color: "bg-emerald-100 text-emerald-700" },
  not_interested: { label: "Không tiềm năng", color: "bg-stone-100 text-stone-700" },
} as const;

export type LeadStatus = keyof typeof LEAD_STATUS;

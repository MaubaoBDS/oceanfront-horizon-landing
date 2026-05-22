import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV_ITEMS, PROJECT } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="container py-14 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-serif font-bold text-navy-900 text-xl">
                OH
              </div>
              <div>
                <p className="font-serif text-lg font-semibold leading-tight">
                  AnhNguyen OceanFront
                </p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-gold-300/90">
                  Horizon · Nha Trang
                </p>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5">
              Bộ sưu tập 415 căn hộ Art Apartments mặt biển Trần Phú, Nha Trang. Sở hữu
              lâu dài – bàn giao full nội thất cao cấp.
            </p>
            <p className="text-xs text-white/50 leading-relaxed">
              <strong className="text-gold-300">{PROJECT.distributor}</strong>
              <br />
              Công ty Cổ phần Tập đoàn My Second Home
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-serif text-lg mb-5 text-gold-300">Khám phá</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-white/70 hover:text-gold-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-5 text-gold-300">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-white/75 leading-relaxed">{PROJECT.location}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  onClick={() => fbContact("phone")}
                  className="flex items-center gap-3 text-sm text-white/75 hover:text-gold-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  {CONTACT.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  onClick={() => fbContact("email")}
                  className="flex items-center gap-3 text-sm text-white/75 hover:text-gold-300 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/45 leading-relaxed max-w-3xl mx-auto">
            © {new Date().getFullYear()} {PROJECT.name}. Lưu ý: Hình ảnh, sơ đồ, bố trí
            chỉ mang tính minh họa. Thông tin chính thức được căn cứ trên hợp đồng mua
            bán và các tài liệu được ký kết chính thức với khách hàng.
          </p>
        </div>
      </div>
    </footer>
  );
}

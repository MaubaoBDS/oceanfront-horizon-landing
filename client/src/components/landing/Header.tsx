import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { CONTACT, NAV_ITEMS } from "@/lib/constants";
import { fbContact } from "@/lib/fbEvents";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-navy-950/70 to-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "oklch(0.12 0.03 252 / 0.95)" : undefined,
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 text-white"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-serif font-bold text-navy-900 text-lg shrink-0">
              OH
            </div>
            <div className="hidden sm:block leading-tight whitespace-nowrap">
              <div className="font-serif text-base md:text-lg font-semibold tracking-tight">
                AnhNguyen OceanFront
              </div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-gold-300/90">
                Horizon · Nha Trang
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium text-white/85 hover:text-gold-300 transition-colors duration-200 relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-6" />
              </button>
            ))}
          </nav>

          {/* Phone CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${CONTACT.phone}`}
              onClick={() => fbContact("phone")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-md btn-gold text-sm"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phoneFormatted}
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="xl:hidden p-2 text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden pb-4 border-t border-white/10 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-2 py-3 text-white/90 border-b border-white/5 hover:text-gold-300"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={() => fbContact("phone")}
                className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md btn-gold text-sm"
              >
                <Phone className="w-4 h-4" />
                {CONTACT.phoneFormatted}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

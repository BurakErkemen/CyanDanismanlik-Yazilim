import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { buttonClass, cn } from "@/components/ui";

const links = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/kosgeb", label: "KOSGEB" },
  { to: "/yazilim", label: "Yazılım" },
  { to: "/e-ticaret", label: "E-Ticaret" },
  { to: "/blog", label: "Blog" },
  { to: "/ekip", label: "Ekibimiz" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative text-sm font-medium transition-colors duration-200 hover:text-white",
      "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-brand-light after:transition-all after:duration-300",
      isActive ? "text-white after:w-full" : "text-gray-400 after:w-0 hover:after:w-full",
    );

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-bg/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Cyan Danışmanlık" className="h-16 w-auto md:h-20" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="tel:+905537763169" className={buttonClass("primary", "sm")}>
            İletişim
          </a>
        </div>

        <button
          className="text-gray-300 transition hover:text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-white/5 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="tel:+905537763169"
            onClick={() => setMenuOpen(false)}
            className={cn(buttonClass("primary", "sm"), "mt-2")}
          >
            Hemen Ara
          </a>
        </div>
      </div>
    </nav>
  );
}

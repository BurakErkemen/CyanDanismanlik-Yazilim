import { Link } from "react-router-dom";

const services = [
  { to: "/kosgeb", label: "KOSGEB Danışmanlık" },
  { to: "/yazilim", label: "Yazılım Geliştirme" },
  { to: "/e-ticaret", label: "E-Ticaret & Sosyal Medya" },
];

const company = [
  { to: "/ekip", label: "Ekibimiz" },
  { to: "/blog", label: "Blog" },
  { to: "/#iletisim", label: "İletişim" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      {/* top glow line */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logo.png" alt="Cyan Danışmanlık" className="mb-4 h-24 w-auto" />
            <p className="text-sm leading-relaxed text-gray-500">
              KOSGEB, yazılım ve dijital dönüşümde işletmenizin güvenilir çözüm ortağı.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Hizmetler</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {services.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="transition hover:text-brand-light">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Kurumsal</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="transition hover:text-brand-light">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">İletişim</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>47. Sokak, 17A — İskenderun / Hatay</li>
              <li>
                <a href="tel:+905537763169" className="transition hover:text-brand-light">
                  +90 (553) 776 31 69
                </a>
              </li>
              <li>
                <a href="mailto:info@cyandanismanlik.com" className="transition hover:text-brand-light">
                  info@cyandanismanlik.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Cyan Danışmanlık. Tüm hakları saklıdır.</p>
          <p>İskenderun / Hatay · Pzt–Cuma 09:00–18:00</p>
        </div>
      </div>
    </footer>
  );
}

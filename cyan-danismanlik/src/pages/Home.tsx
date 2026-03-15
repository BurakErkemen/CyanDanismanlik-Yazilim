import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveContact } from "../lib/contactService";
import { Timestamp } from "firebase/firestore";
import { getHomeSettings, getActiveTestimonials, type HomeSettings, type Testimonial } from "../lib/settingsService";
import SEO from "../components/SEO";

export default function Home() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [s, t] = await Promise.all([getHomeSettings(), getActiveTestimonials()]);
      setSettings(s);
      setTestimonials(t);
    }
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await saveContact({
        name,
        email,
        message,
        date: Timestamp.now(),
        read: false,
      });
    } catch (err) {
      console.error("Firestore kayıt hatası:", err);
    }
    try {
      const response = await fetch("https://formspree.io/f/xaqpbzad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Form gönderme hatası:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>
      <SEO
        title="Cyan Danışmanlık | KOSGEB Danışmanlık Hizmetleri"
        description="KOSGEB danışmanlığında profesyonel çözümler. Başvuru dosyası hazırlama, iş planı, destek takibi ve yazılım hizmetleri."
        url="https://cyandanismanlik.com"
      />

      {/* Hero */}
      <section className="py-24 px-4" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#06b6d4" }}>
            Profesyonel Danışmanlık
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {settings.hero.title}
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {settings.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/kosgeb"
              className="font-semibold px-8 py-3 rounded-lg transition text-black"
              style={{ backgroundColor: "#06b6d4" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
            >
              Hizmetlerimizi Keşfet
            </Link>
            <a
              href="#iletisim"
              className="border font-semibold px-8 py-3 rounded-lg transition text-white hover:bg-white/10"
              style={{ borderColor: "#06b6d4", color: "#06b6d4" }}
            >
              Ücretsiz Danışmanlık Al
            </a>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-12 px-4 border-y border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {settings.stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold" style={{ color: "#06b6d4" }}>{stat.value}</p>
              <p className="text-gray-400 mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-16 px-4" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-3">Hizmetlerimiz</h2>
          <p className="text-center text-gray-400 mb-12">İşletmeniz için kapsamlı danışmanlık çözümleri</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {settings.services.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition group"
                style={{ backgroundColor: "#111111" }}
              >
                <div className="w-8 h-0.5 mb-4 transition-all group-hover:w-12" style={{ backgroundColor: "#06b6d4" }} />
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Hakkımızda</h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">{settings.about}</p>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Müşteri Yorumları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-xl p-6 border border-white/10" style={{ backgroundColor: "#111111" }}>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* İletişim */}
      <section id="iletisim" className="py-16 px-4 border-t border-white/10">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-10">İletişim</h2>
          <div className="rounded-xl p-8 space-y-3 text-gray-400 text-sm mb-6 border border-white/10" style={{ backgroundColor: "#111111" }}>
            <p>📍 47. Sokak, 17A — İskenderun / Hatay</p>
            <p>📞 +90 (553) 776 31 69</p>
            <p>✉️ info@cyandanismanlik.com</p>
            <p>🕐 Pzt–Cuma: 09:00–18:00 / Cmt: 10:00–14:00</p>
          </div>

          {submitted ? (
            <div className="rounded-xl p-8 border border-white/10 text-center" style={{ backgroundColor: "#111111" }}>
              <p className="text-2xl mb-2">✓</p>
              <p className="text-white font-semibold mb-1">Mesajınız iletildi!</p>
              <p className="text-gray-400 text-sm">En kısa sürede size dönüş yapacağız.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-xl p-8 space-y-4 border border-white/10" style={{ backgroundColor: "#111111" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız"
                required
                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
                style={{ backgroundColor: "#1a1a1a" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta"
                required
                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
                style={{ backgroundColor: "#1a1a1a" }}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınız"
                rows={4}
                required
                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
                style={{ backgroundColor: "#1a1a1a" }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50"
                style={{ backgroundColor: "#06b6d4" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
              >
                {submitting ? "Gönderiliyor..." : "Gönder"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
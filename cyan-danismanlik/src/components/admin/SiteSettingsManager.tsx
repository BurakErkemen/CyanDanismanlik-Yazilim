import { useState, useEffect } from "react";
import {
  type HomeSettings,
  type Testimonial,
  getHomeSettings,
  saveHomeSettings,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/settingsService";

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "stats" | "services" | "about" | "testimonials">("hero");
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, "id">>({ name: "", company: "", text: "", order: 0, active: true });

  useEffect(() => {
    async function fetch() {
      const [s, t] = await Promise.all([getHomeSettings(), getTestimonials()]);
      setSettings(s);
      setTestimonials(t);
      setLoading(false);
    }
    fetch();
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      await saveHomeSettings(settings);
      alert("Kaydedildi!");
    } catch (err) {
      alert("Kayıt hatası.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleAddTestimonial() {
    if (!newTestimonial.name || !newTestimonial.text) { alert("İsim ve yorum zorunludur."); return; }
    await createTestimonial(newTestimonial);
    const data = await getTestimonials();
    setTestimonials(data);
    setNewTestimonial({ name: "", company: "", text: "", order: 0, active: true });
  }

  async function handleDeleteTestimonial(id: string) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await deleteTestimonial(id);
    setTestimonials(await getTestimonials());
  }

  async function handleToggleTestimonial(t: Testimonial) {
    if (!t.id) return;
    await updateTestimonial(t.id, { active: !t.active });
    setTestimonials(await getTestimonials());
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500";
  const inputStyle = { backgroundColor: "#1a1a1a" };

  if (loading || !settings) return <p className="text-gray-400">Yükleniyor...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Site Ayarları</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm disabled:opacity-50"
          style={{ backgroundColor: "#06b6d4" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* Alt sekmeler */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10">
        {[
          { key: "hero", label: "Hero" },
          { key: "stats", label: "İstatistikler" },
          { key: "services", label: "Hizmetler" },
          { key: "about", label: "Hakkımızda" },
          { key: "testimonials", label: "Yorumlar" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key as typeof activeSection)}
            className="px-4 py-2 text-sm font-medium transition border-b-2 -mb-px"
            style={{
              borderColor: activeSection === s.key ? "#06b6d4" : "transparent",
              color: activeSection === s.key ? "#06b6d4" : "#9ca3af",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Hero */}
      {activeSection === "hero" && (
        <div className="space-y-4 rounded-xl p-6 border border-white/10" style={{ backgroundColor: "#111111" }}>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Başlık</label>
            <input
              type="text"
              value={settings.hero.title}
              onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Alt Başlık</label>
            <textarea
              value={settings.hero.subtitle}
              onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })}
              rows={3}
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>
      )}

      {/* İstatistikler */}
      {activeSection === "stats" && (
        <div className="space-y-3">
          {settings.stats.map((stat, i) => (
            <div key={i} className="rounded-xl p-4 border border-white/10 grid grid-cols-2 gap-4" style={{ backgroundColor: "#111111" }}>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Değer</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const updated = settings.stats.map((s, idx) => idx === i ? { ...s, value: e.target.value } : s);
                    setSettings({ ...settings, stats: updated });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Etiket</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const updated = settings.stats.map((s, idx) => idx === i ? { ...s, label: e.target.value } : s);
                    setSettings({ ...settings, stats: updated });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hizmetler */}
      {activeSection === "services" && (
        <div className="space-y-3">
          {settings.services.map((service, i) => (
            <div key={i} className="rounded-xl p-4 border border-white/10 space-y-3" style={{ backgroundColor: "#111111" }}>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Başlık</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    const updated = settings.services.map((s, idx) => idx === i ? { ...s, title: e.target.value } : s);
                    setSettings({ ...settings, services: updated });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Açıklama</label>
                <input
                  type="text"
                  value={service.desc}
                  onChange={(e) => {
                    const updated = settings.services.map((s, idx) => idx === i ? { ...s, desc: e.target.value } : s);
                    setSettings({ ...settings, services: updated });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Link</label>
                <input
                  type="text"
                  value={service.link}
                  onChange={(e) => {
                    const updated = settings.services.map((s, idx) => idx === i ? { ...s, link: e.target.value } : s);
                    setSettings({ ...settings, services: updated });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hakkımızda */}
      {activeSection === "about" && (
        <div className="rounded-xl p-6 border border-white/10" style={{ backgroundColor: "#111111" }}>
          <label className="text-sm text-gray-400 mb-1 block">Hakkımızda Metni</label>
          <textarea
            value={settings.about}
            onChange={(e) => setSettings({ ...settings, about: e.target.value })}
            rows={6}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      )}

      {/* Testimonials */}
      {activeSection === "testimonials" && (
        <div className="space-y-4">
          {/* Yeni yorum ekle */}
          <div className="rounded-xl p-6 border border-white/10 space-y-3" style={{ backgroundColor: "#111111" }}>
            <h3 className="text-white font-semibold mb-2">Yeni Yorum Ekle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">İsim</label>
                <input type="text" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} placeholder="Ahmet Yılmaz" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Şirket</label>
                <input type="text" value={newTestimonial.company} onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })} placeholder="ABC Ltd." className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Yorum</label>
              <textarea value={newTestimonial.text} onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })} rows={3} placeholder="Harika bir hizmet aldık..." className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Sıralama</label>
              <input type="number" value={newTestimonial.order} onChange={(e) => setNewTestimonial({ ...newTestimonial, order: Number(e.target.value) })} className={inputClass} style={inputStyle} />
            </div>
            <button
              onClick={handleAddTestimonial}
              className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm"
              style={{ backgroundColor: "#06b6d4" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
            >
              Ekle
            </button>
          </div>

          {/* Mevcut yorumlar */}
          <div className="space-y-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-xl p-5 border border-white/10 flex justify-between items-start gap-4" style={{ backgroundColor: "#111111" }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium">{t.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: t.active ? "#06b6d420" : "#06b6d420", color: t.active ? "#06b6d4" : "#9ca3af" } as React.CSSProperties}>
                      {t.active ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{t.company}</p>
                  <p className="text-gray-300 text-sm">{t.text}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleToggleTestimonial(t)} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">
                    {t.active ? "Pasife Al" : "Aktif Et"}
                  </button>
                  <button onClick={() => t.id && handleDeleteTestimonial(t.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition">
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
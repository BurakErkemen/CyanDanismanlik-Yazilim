import { useState, useEffect } from "react";
import {
  type Popup,
  getAllPopups,
  createPopup,
  updatePopup,
  deletePopup,
} from "../lib/popupService";
import { uploadImage } from "../lib/cloudinaryService";

export default function PopupManager() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "edit">("list");
  const [editPopup, setEditPopup] = useState<Popup | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const emptyPopup: Popup = {
    title: "",
    message: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    active: false,
    showOnLoad: true,
  };

  useEffect(() => { fetchPopups(); }, []);

  async function fetchPopups() {
    setLoading(true);
    const data = await getAllPopups();
    setPopups(data);
    setLoading(false);
  }

  function handleNew() {
    setEditPopup({ ...emptyPopup });
    setImageFile(null);
    setImagePreview("");
    setView("edit");
  }

  function handleEdit(popup: Popup) {
    setEditPopup({ ...popup });
    setImagePreview(popup.image || "");
    setImageFile(null);
    setView("edit");
  }

  function handleCancel() {
    setEditPopup(null);
    setView("list");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!editPopup) return;
    if (!editPopup.title || !editPopup.message) {
      alert("Başlık ve mesaj zorunludur.");
      return;
    }
    setSaving(true);
    try {
      let image = editPopup.image || "";
      if (imageFile) image = await uploadImage(imageFile);

      const popupData: Omit<Popup, "id"> = {
        title: editPopup.title,
        message: editPopup.message,
        image,
        buttonText: editPopup.buttonText,
        buttonLink: editPopup.buttonLink,
        active: editPopup.active,
        showOnLoad: editPopup.showOnLoad,
      };

      if (editPopup.id) {
        await updatePopup(editPopup.id, popupData);
      } else {
        await createPopup(popupData);
      }
      await fetchPopups();
      handleCancel();
    } catch (err) {
      alert("Kayıt sırasında hata oluştu.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu popup'ı silmek istediğinize emin misiniz?")) return;
    await deletePopup(id);
    await fetchPopups();
  }

  async function handleToggleActive(popup: Popup) {
    if (!popup.id) return;
    await updatePopup(popup.id, { active: !popup.active });
    await fetchPopups();
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500";
  const inputStyle = { backgroundColor: "#1a1a1a" };

  if (view === "edit" && editPopup) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {editPopup.id ? "Popup Düzenle" : "Yeni Popup"}
          </h2>
          <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition">
            Geri Dön
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={{ backgroundColor: "#111111" }}>
            <h3 className="text-white font-semibold">İçerik</h3>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Başlık</label>
              <input type="text" value={editPopup.title} onChange={(e) => setEditPopup({ ...editPopup, title: e.target.value })} placeholder="Kampanya başlığı" className={inputClass} style={inputStyle} />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Mesaj</label>
              <textarea value={editPopup.message} onChange={(e) => setEditPopup({ ...editPopup, message: e.target.value })} placeholder="Duyuru veya kampanya metni..." rows={4} className={inputClass} style={inputStyle} />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Görsel</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:text-black file:cursor-pointer" />
              {imagePreview && (
                <img src={imagePreview} alt="Önizleme" className="mt-3 w-full h-40 object-cover rounded-lg border border-white/10" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Buton Metni</label>
                <input type="text" value={editPopup.buttonText} onChange={(e) => setEditPopup({ ...editPopup, buttonText: e.target.value })} placeholder="Hemen Başvur" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Buton Linki</label>
                <input type="text" value={editPopup.buttonLink} onChange={(e) => setEditPopup({ ...editPopup, buttonLink: e.target.value })} placeholder="/kosgeb veya https://..." className={inputClass} style={inputStyle} />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6 border border-white/10 space-y-3" style={{ backgroundColor: "#111111" }}>
            <h3 className="text-white font-semibold">Ayarlar</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={editPopup.active} onChange={(e) => setEditPopup({ ...editPopup, active: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
              <span className="text-sm text-gray-400">Aktif (sitede göster)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={editPopup.showOnLoad} onChange={(e) => setEditPopup({ ...editPopup, showOnLoad: e.target.checked })} className="w-4 h-4 accent-cyan-500" />
              <span className="text-sm text-gray-400">Sayfa açılınca otomatik göster</span>
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50"
            style={{ backgroundColor: "#06b6d4" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Popup Yönetimi</h2>
        <button onClick={handleNew} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}>
          + Yeni Popup
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : popups.length === 0 ? (
        <div className="rounded-xl p-12 border border-white/10 text-center" style={{ backgroundColor: "#111111" }}>
          <p className="text-gray-400 mb-4">Henüz popup eklenmedi.</p>
          <button onClick={handleNew} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }}>İlk Popup'ı Ekle</button>
        </div>
      ) : (
        <div className="space-y-3">
          {popups.map((popup) => (
            <div key={popup.id} className="rounded-xl p-5 border border-white/10 flex justify-between items-center gap-4" style={{ backgroundColor: "#111111" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{popup.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0" style={{ backgroundColor: popup.active ? "#06b6d420" : "#ffffff10", color: popup.active ? "#06b6d4" : "#9ca3af" }}>
                    {popup.active ? "Aktif" : "Pasif"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate">{popup.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => handleToggleActive(popup)} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">
                  {popup.active ? "Pasife Al" : "Aktif Et"}
                </button>
                <button onClick={() => handleEdit(popup)} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">Düzenle</button>
                <button onClick={() => popup.id && handleDelete(popup.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
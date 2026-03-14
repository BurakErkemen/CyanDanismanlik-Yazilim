import { useState, useEffect } from "react";
import {
  type TeamMember,
  type Education,
  type Experience,
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../lib/teamService";
import { uploadImage } from "../lib/cloudinaryService";

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "edit">("list");
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [specialtyInput, setSpecialtyInput] = useState("");

  const emptyMember: TeamMember = {
    name: "", title: "", photo: "", specialties: [],
    linkedin: "", email: "", phone: "", order: 0,
    bio: "", education: [], experience: [],
  };

  const emptyEducation: Education = { school: "", degree: "", year: "" };
  const emptyExperience: Experience = { company: "", role: "", startYear: "", endYear: "", desc: "" };

  useEffect(() => { fetchMembers(); }, []);

  async function fetchMembers() {
    setLoading(true);
    const data = await getTeamMembers();
    setMembers(data);
    setLoading(false);
  }

  function handleNew() {
    setEditMember({ ...emptyMember });
    setImageFile(null);
    setImagePreview("");
    setSpecialtyInput("");
    setView("edit");
  }

  function handleEdit(member: TeamMember) {
    setEditMember({ ...member });
    setImagePreview(member.photo || "");
    setImageFile(null);
    setSpecialtyInput("");
    setView("edit");
  }

  function handleCancel() {
    setEditMember(null);
    setView("list");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function addSpecialty() {
    if (!editMember || !specialtyInput.trim()) return;
    setEditMember({ ...editMember, specialties: [...editMember.specialties, specialtyInput.trim()] });
    setSpecialtyInput("");
  }

  function removeSpecialty(i: number) {
    if (!editMember) return;
    setEditMember({ ...editMember, specialties: editMember.specialties.filter((_, idx) => idx !== i) });
  }

  function addEducation() {
    if (!editMember) return;
    setEditMember({ ...editMember, education: [...editMember.education, { ...emptyEducation }] });
  }

  function updateEducation(i: number, field: keyof Education, value: string) {
    if (!editMember) return;
    const updated = editMember.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e);
    setEditMember({ ...editMember, education: updated });
  }

  function removeEducation(i: number) {
    if (!editMember) return;
    setEditMember({ ...editMember, education: editMember.education.filter((_, idx) => idx !== i) });
  }

  function addExperience() {
    if (!editMember) return;
    setEditMember({ ...editMember, experience: [...editMember.experience, { ...emptyExperience }] });
  }

  function updateExperience(i: number, field: keyof Experience, value: string) {
    if (!editMember) return;
    const updated = editMember.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e);
    setEditMember({ ...editMember, experience: updated });
  }

  function removeExperience(i: number) {
    if (!editMember) return;
    setEditMember({ ...editMember, experience: editMember.experience.filter((_, idx) => idx !== i) });
  }

  async function handleSave() {
    if (!editMember) return;
    if (!editMember.name || !editMember.title) { alert("İsim ve unvan zorunludur."); return; }
    setSaving(true);
    try {
      let photo = editMember.photo || "";
      if (imageFile) photo = await uploadImage(imageFile);

      const memberData: Omit<TeamMember, "id"> = {
        name: editMember.name, title: editMember.title, photo,
        specialties: editMember.specialties, linkedin: editMember.linkedin,
        email: editMember.email, phone: editMember.phone, order: editMember.order,
        bio: editMember.bio, education: editMember.education, experience: editMember.experience,
      };

      if (editMember.id) {
        await updateTeamMember(editMember.id, memberData);
      } else {
        await createTeamMember(memberData);
      }
      await fetchMembers();
      handleCancel();
    } catch (err) {
      alert("Kayıt sırasında hata oluştu.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu ekip üyesini silmek istediğinize emin misiniz?")) return;
    await deleteTeamMember(id);
    await fetchMembers();
  }

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500";
  const inputStyle = { backgroundColor: "#1a1a1a" };

  if (view === "edit" && editMember) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {editMember.id ? "Üyeyi Düzenle" : "Yeni Ekip Üyesi"}
          </h2>
          <button onClick={handleCancel} className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition">
            Geri Dön
          </button>
        </div>

        <div className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={{ backgroundColor: "#111111" }}>
            <h3 className="text-white font-semibold">Temel Bilgiler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">İsim Soyisim</label>
                <input type="text" value={editMember.name} onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} placeholder="Ad Soyad" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Unvan</label>
                <input type="text" value={editMember.title} onChange={(e) => setEditMember({ ...editMember, title: e.target.value })} placeholder="KOSGEB Danışmanı" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">E-posta</label>
                <input type="email" value={editMember.email} onChange={(e) => setEditMember({ ...editMember, email: e.target.value })} placeholder="ad@cyandanismanlik.com" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Telefon</label>
                <input type="tel" value={editMember.phone} onChange={(e) => setEditMember({ ...editMember, phone: e.target.value })} placeholder="+90 (5xx) xxx xx xx" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">LinkedIn URL</label>
                <input type="url" value={editMember.linkedin} onChange={(e) => setEditMember({ ...editMember, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Sıralama</label>
                <input type="number" value={editMember.order} onChange={(e) => setEditMember({ ...editMember, order: Number(e.target.value) })} className={inputClass} style={inputStyle} />
              </div>
            </div>

            {/* Fotoğraf */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Fotoğraf</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:text-black file:cursor-pointer" />
              {imagePreview && (
                <img src={imagePreview} alt="Önizleme" className="mt-3 h-32 w-32 object-cover rounded-full border border-white/10" />
              )}
            </div>

            {/* Uzmanlık */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Uzmanlık Alanları</label>
              <div className="flex gap-2 mb-2">
                <input type="text" value={specialtyInput} onChange={(e) => setSpecialtyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSpecialty()} placeholder="KOSGEB Başvuruları" className={`flex-1 ${inputClass}`} style={inputStyle} />
                <button onClick={addSpecialty} className="px-4 py-3 rounded-lg text-sm font-medium text-black" style={{ backgroundColor: "#06b6d4" }}>Ekle</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editMember.specialties.map((s, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/10" style={{ backgroundColor: "#1a1a1a", color: "#06b6d4" }}>
                    {s}
                    <button onClick={() => removeSpecialty(i)} className="text-gray-500 hover:text-red-400 ml-1">✕</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Biyografi */}
          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={{ backgroundColor: "#111111" }}>
            <h3 className="text-white font-semibold">Hakkımda / Biyografi</h3>
            <textarea
              value={editMember.bio}
              onChange={(e) => setEditMember({ ...editMember, bio: e.target.value })}
              placeholder="Kısa biyografi..."
              rows={4}
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Eğitim */}
          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={{ backgroundColor: "#111111" }}>
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Eğitim Bilgileri</h3>
              <button onClick={addEducation} className="text-xs px-3 py-1.5 rounded-lg text-black font-medium" style={{ backgroundColor: "#06b6d4" }}>+ Ekle</button>
            </div>
            {editMember.education.map((edu, i) => (
              <div key={i} className="rounded-lg p-4 border border-white/10 space-y-3" style={{ backgroundColor: "#1a1a1a" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Okul</label>
                    <input type="text" value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} placeholder="Üniversite adı" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Bölüm / Derece</label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="İşletme Lisans" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Yıl</label>
                    <input type="text" value={edu.year} onChange={(e) => updateEducation(i, "year", e.target.value)} placeholder="2018" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                </div>
                <button onClick={() => removeEducation(i)} className="text-xs text-red-400 hover:text-red-300">Sil</button>
              </div>
            ))}
          </div>

          {/* Deneyim */}
          <div className="rounded-xl p-6 border border-white/10 space-y-4" style={{ backgroundColor: "#111111" }}>
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Deneyim Geçmişi</h3>
              <button onClick={addExperience} className="text-xs px-3 py-1.5 rounded-lg text-black font-medium" style={{ backgroundColor: "#06b6d4" }}>+ Ekle</button>
            </div>
            {editMember.experience.map((exp, i) => (
              <div key={i} className="rounded-lg p-4 border border-white/10 space-y-3" style={{ backgroundColor: "#1a1a1a" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Şirket</label>
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Şirket adı" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Pozisyon</label>
                    <input type="text" value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Danışman" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Başlangıç Yılı</label>
                    <input type="text" value={exp.startYear} onChange={(e) => updateExperience(i, "startYear", e.target.value)} placeholder="2020" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Bitiş Yılı</label>
                    <input type="text" value={exp.endYear} onChange={(e) => updateExperience(i, "endYear", e.target.value)} placeholder="Devam ediyor" className={inputClass} style={{ backgroundColor: "#111111" }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Açıklama</label>
                  <textarea value={exp.desc} onChange={(e) => updateExperience(i, "desc", e.target.value)} placeholder="Görev tanımı..." rows={2} className={inputClass} style={{ backgroundColor: "#111111" }} />
                </div>
                <button onClick={() => removeExperience(i)} className="text-xs text-red-400 hover:text-red-300">Sil</button>
              </div>
            ))}
          </div>

          {/* Kaydet */}
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
        <h2 className="text-xl font-bold text-white">Ekip Üyeleri</h2>
        <button onClick={handleNew} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}>
          + Yeni Üye
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : members.length === 0 ? (
        <div className="rounded-xl p-12 border border-white/10 text-center" style={{ backgroundColor: "#111111" }}>
          <p className="text-gray-400 mb-4">Henüz ekip üyesi eklenmedi.</p>
          <button onClick={handleNew} className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm" style={{ backgroundColor: "#06b6d4" }}>İlk Üyeyi Ekle</button>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="rounded-xl p-5 border border-white/10 flex justify-between items-center gap-4" style={{ backgroundColor: "#111111" }}>
              <div className="flex items-center gap-4">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border border-white/10" style={{ backgroundColor: "#1a1a1a", color: "#06b6d4" }}>
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  <p className="text-gray-400 text-sm">{member.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(member)} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition">Düzenle</button>
                <button onClick={() => member.id && handleDelete(member.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTeamMemberById, type TeamMember } from "../lib/teamService";

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      if (!id) return;
      const data = await getTeamMemberById(id);
      setMember(data);
      setLoading(false);
    }
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-white text-xl font-bold">Kişi bulunamadı.</p>
        <Link to="/ekip" className="text-sm font-medium px-5 py-2 rounded-lg text-black" style={{ backgroundColor: "#06b6d4" }}>
          Ekibe Dön
        </Link>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Geri Dön */}
        <Link to="/ekip" className="text-sm text-gray-400 hover:text-white transition inline-flex items-center gap-2 mb-8">
          ← Ekibe Dön
        </Link>

        {/* Profil */}
        <div className="rounded-xl border border-white/10 overflow-hidden mb-6" style={{ backgroundColor: "#111111" }}>
          <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full object-cover border-2 shrink-0" style={{ borderColor: "#06b6d4" }} />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold border-2 shrink-0" style={{ borderColor: "#06b6d4", color: "#06b6d4", backgroundColor: "#1a1a1a" }}>
                {member.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-1">{member.name}</h1>
              <p className="text-lg mb-4" style={{ color: "#06b6d4" }}>{member.title}</p>

              {/* Uzmanlık */}
              {member.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.specialties.map((s, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-300" style={{ backgroundColor: "#1a1a1a" }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* İletişim */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="hover:text-white transition">✉️ {member.email}</a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="hover:text-white transition">📞 {member.phone}</a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" style={{ color: "#06b6d4" }}>LinkedIn →</a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biyografi */}
        {member.bio && (
          <div className="rounded-xl border border-white/10 p-8 mb-6" style={{ backgroundColor: "#111111" }}>
            <h2 className="text-xl font-bold text-white mb-4">Hakkımda</h2>
            <p className="text-gray-400 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Deneyim */}
        {member.experience.length > 0 && (
          <div className="rounded-xl border border-white/10 p-8 mb-6" style={{ backgroundColor: "#111111" }}>
            <h2 className="text-xl font-bold text-white mb-6">Deneyim</h2>
            <div className="space-y-6">
              {member.experience.map((exp, i) => (
                <div key={i} className="border-l-2 pl-4" style={{ borderColor: "#06b6d4" }}>
                  <p className="text-white font-semibold">{exp.role}</p>
                  <p className="text-sm mb-1" style={{ color: "#06b6d4" }}>{exp.company}</p>
                  <p className="text-xs text-gray-500 mb-2">
                    {exp.startYear} — {exp.endYear || "Devam ediyor"}
                  </p>
                  {exp.desc && <p className="text-gray-400 text-sm">{exp.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eğitim */}
        {member.education.length > 0 && (
          <div className="rounded-xl border border-white/10 p-8" style={{ backgroundColor: "#111111" }}>
            <h2 className="text-xl font-bold text-white mb-6">Eğitim</h2>
            <div className="space-y-4">
              {member.education.map((edu, i) => (
                <div key={i} className="border-l-2 pl-4" style={{ borderColor: "#06b6d4" }}>
                  <p className="text-white font-semibold">{edu.degree}</p>
                  <p className="text-sm" style={{ color: "#06b6d4" }}>{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
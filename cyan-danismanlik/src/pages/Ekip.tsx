import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTeamMembers, type TeamMember } from "../lib/teamService";
import SEO from "../components/SEO";

export default function Ekip() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const data = await getTeamMembers();
      setMembers(data);
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>
      <SEO
        title="Ekibimiz"
        description="Cyan Danışmanlık deneyimli danışman ekibi. KOSGEB ve yazılım alanında uzman kadromuzla tanışın."
        url="https://cyandanismanlik.com/ekip"
      />
      {/* Hero */}
      <section className="py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#06b6d4" }}>
            Kadromuz
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Ekibimiz</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Deneyimli danışman ekibimizle işletmenizin yanındayız.
          </p>
        </div>
      </section>

      {/* Ekip */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Yükleniyor...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Ekip bilgisi henüz eklenmedi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <Link
                  key={member.id}
                  to={`/ekip/${member.id}`}
                  className="rounded-xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition block"
                  style={{ backgroundColor: "#111111" }}
                >
                  {/* Fotoğraf */}
                  <div className="h-56 flex items-center justify-center" style={{ backgroundColor: "#1a1a1a" }}>
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold border-2"
                        style={{ borderColor: "#06b6d4", color: "#06b6d4" }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Bilgiler */}
                  <div className="p-6">
                    <h2 className="text-white font-bold text-lg">{member.name}</h2>
                    <p className="text-sm mt-1 mb-4" style={{ color: "#06b6d4" }}>
                      {member.title}
                    </p>

                    {/* Uzmanlık */}
                    {member.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.specialties.map((s: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full border border-white/10 text-gray-300"
                            style={{ backgroundColor: "#1a1a1a" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* İletişim */}
                    <div className="space-y-2 text-sm text-gray-400 border-t border-white/10 pt-4">
                      {member.email && (
                        <p className="flex items-center gap-2">✉️ {member.email}</p>
                      )}
                      {member.phone && (
                        <p className="flex items-center gap-2">📞 {member.phone}</p>
                      )}
                      {member.linkedin && (
                        <p className="flex items-center gap-2" style={{ color: "#06b6d4" }}>
                          LinkedIn →
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
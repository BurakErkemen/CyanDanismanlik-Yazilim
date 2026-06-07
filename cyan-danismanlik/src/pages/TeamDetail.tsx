import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTeamMemberById, type TeamMember } from "@/lib/teamService";
import { Container, Card, Badge, PageLoader, buttonClass } from "@/components/ui";

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      if (!id) return;
      try {
        const data = await getTeamMemberById(id);
        setMember(data);
      } catch (err) {
        console.error("Kişi yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [id]);

  if (loading) return <PageLoader />;

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-white">Kişi bulunamadı.</p>
        <Link to="/ekip" className={buttonClass("primary", "sm")}>
          Ekibe Dön
        </Link>
      </div>
    );
  }

  return (
    <main>
      <Container width="wide" className="py-12">
        <Link
          to="/ekip"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-light"
        >
          ← Ekibe Dön
        </Link>

        {/* Profile */}
        <Card className="mb-6 overflow-hidden">
          <div className="flex flex-col items-start gap-8 p-8 md:flex-row">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="h-32 w-32 shrink-0 rounded-full border-2 border-brand object-cover shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)]"
              />
            ) : (
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-inset/60 text-5xl font-bold text-brand-light shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)]">
                {member.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h1 className="mb-1 text-3xl font-bold text-white">{member.name}</h1>
              <p className="mb-4 text-lg text-brand-light">{member.title}</p>

              {member.specialties.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {member.specialties.map((s, i) => (
                    <Badge key={i}>{s}</Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="transition hover:text-brand-light">
                    ✉️ {member.email}
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="transition hover:text-brand-light">
                    📞 {member.phone}
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-light transition hover:text-brand"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Bio */}
        {member.bio && (
          <Card className="mb-6 p-8">
            <h2 className="mb-4 text-xl font-bold text-white">Hakkımda</h2>
            <p className="leading-relaxed text-gray-400">{member.bio}</p>
          </Card>
        )}

        {/* Experience */}
        {member.experience.length > 0 && (
          <Card className="mb-6 p-8">
            <h2 className="mb-6 text-xl font-bold text-white">Deneyim</h2>
            <div className="space-y-6">
              {member.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-brand pl-4">
                  <p className="font-semibold text-white">{exp.role}</p>
                  <p className="mb-1 text-sm text-brand-light">{exp.company}</p>
                  <p className="mb-2 text-xs text-gray-500">
                    {exp.startYear} — {exp.endYear || "Devam ediyor"}
                  </p>
                  {exp.desc && <p className="text-sm text-gray-400">{exp.desc}</p>}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Education */}
        {member.education.length > 0 && (
          <Card className="p-8">
            <h2 className="mb-6 text-xl font-bold text-white">Eğitim</h2>
            <div className="space-y-4">
              {member.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-brand pl-4">
                  <p className="font-semibold text-white">{edu.degree}</p>
                  <p className="text-sm text-brand-light">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Container>
    </main>
  );
}

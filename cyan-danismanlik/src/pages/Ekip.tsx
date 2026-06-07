import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTeamMembers, type TeamMember } from "@/lib/teamService";
import SEO from "@/components/seo/SEO";
import PageHero from "@/components/site/PageHero";
import { Section, Card, Badge, SkeletonCard } from "@/components/ui";

export default function Ekip() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await getTeamMembers();
        setMembers(data);
      } catch (err) {
        console.error("Ekip bilgisi yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  return (
    <main>
      <SEO
        title="Ekibimiz"
        description="Cyan Danışmanlık deneyimli danışman ekibi. KOSGEB ve yazılım alanında uzman kadromuzla tanışın."
        url="https://cyandanismanlik.com/ekip"
      />

      <PageHero
        eyebrow="Kadromuz"
        title="Ekibimiz"
        subtitle="Deneyimli danışman ekibimizle işletmenizin yanındayız."
      />

      <Section>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : members.length === 0 ? (
          <p className="py-20 text-center text-gray-400">Ekip bilgisi henüz eklenmedi.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Link key={member.id} to={`/ekip/${member.id}`} className="group block">
                <Card interactive className="h-full overflow-hidden">
                  <div className="flex h-56 items-center justify-center overflow-hidden bg-inset/60">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-brand text-4xl font-bold text-brand-light shadow-[0_0_30px_-6px_rgba(34,211,238,0.5)]">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-lg font-bold text-white">{member.name}</h2>
                    <p className="mb-4 mt-1 text-sm text-brand-light">{member.title}</p>

                    {member.specialties.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {member.specialties.map((s: string, i: number) => (
                          <Badge key={i}>{s}</Badge>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-gray-400">
                      {member.email && <p className="flex items-center gap-2">✉️ {member.email}</p>}
                      {member.phone && <p className="flex items-center gap-2">📞 {member.phone}</p>}
                      {member.linkedin && <p className="text-brand-light">LinkedIn →</p>}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}

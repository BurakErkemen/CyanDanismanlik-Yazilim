import SEO from "@/components/seo/SEO";
import PageHero from "@/components/site/PageHero";
import CallToAction from "@/components/site/CallToAction";
import { Section, SectionHeading, Card, CardAccent } from "@/components/ui";

const services = [
  {
    title: "Web Uygulama Geliştirme",
    desc: "React, Next.js ve modern teknolojilerle hızlı, ölçeklenebilir web uygulamaları geliştiriyoruz.",
  },
  {
    title: "Mobil Uygulama",
    desc: "iOS ve Android için React Native ile cross-platform mobil uygulamalar üretiyoruz.",
  },
  {
    title: "API & Backend Geliştirme",
    desc: ".NET ve Node.js ile güvenli, yüksek performanslı backend sistemleri kuruyoruz.",
  },
  {
    title: "Yazılım Danışmanlığı",
    desc: "Mevcut sisteminizi analiz ediyor, teknik borç ve mimari sorunlar için çözümler sunuyoruz.",
  },
  {
    title: "Veritabanı Tasarımı",
    desc: "SQL ve NoSQL veritabanlarında optimum yapı tasarımı ve performans iyileştirmesi yapıyoruz.",
  },
  {
    title: "KOSGEB Yazılım Projeleri",
    desc: "KOSGEB AR-GE ve inovasyon destekleri kapsamında yazılım projesi hazırlama ve geliştirme.",
  },
];

const technologies = ["React", "Node.js", "TypeScript", ".NET", "Python", "Firebase", "MsSQL", "MySQL"];

export default function Yazilim() {
  return (
    <main>
      <SEO
        title="Yazılım Geliştirme"
        description="Web ve mobil uygulama geliştirme, yazılım danışmanlığı ve KOSGEB yazılım projeleri. React, .NET ve modern teknolojilerle çözümler."
        url="https://cyandanismanlik.com/yazilim"
      />

      <PageHero
        eyebrow="Yazılım Hizmetleri"
        title="Yazılım Geliştirme"
        subtitle="İşletmenizin ihtiyaçlarına özel web, masaüstü ve mobil uygulamalar geliştiriyor, dijital dönüşüm sürecinizde yanınızda oluyoruz."
      />

      <Section>
        <SectionHeading eyebrow="Ne Yapıyoruz" title="Neler Yapıyoruz?" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((item) => (
            <Card key={item.title} interactive className="p-6">
              <CardAccent className="mb-5" />
              <h3 className="mb-2 text-base font-semibold text-white transition group-hover:text-brand-light">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section divider>
        <SectionHeading eyebrow="Teknoloji" title="Kullandığımız Teknolojiler" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="glass ring-hover rounded-xl px-4 py-4 text-center text-sm font-medium text-gray-300 hover:text-white"
            >
              {tech}
            </div>
          ))}
        </div>
      </Section>

      <CallToAction
        title="Projenizi Hayata Geçirelim"
        subtitle="Yazılım ihtiyaçlarınız için ücretsiz keşif görüşmesi yapın."
      />
    </main>
  );
}

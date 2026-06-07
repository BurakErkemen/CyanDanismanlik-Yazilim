import SEO from "@/components/seo/SEO";
import PageHero from "@/components/site/PageHero";
import CallToAction from "@/components/site/CallToAction";
import { Section, SectionHeading, Card, CardAccent } from "@/components/ui";

const services = [
  {
    title: "KOSGEB Başvuru Danışmanlığı",
    desc: "KOSGEB destekleri için başvuru dosyası hazırlama, proje yazımı ve başvuru süreci yönetimi.",
  },
  {
    title: "İş Planı Hazırlama",
    desc: "KOSGEB uyumlu, detaylı iş planı ve finansal projeksiyonların hazırlanması.",
  },
  {
    title: "Destek Takibi",
    desc: "KOSGEB desteği onay sonrası süreç takibi, hibe kullanımı ve raporlama danışmanlığı.",
  },
  {
    title: "AR-GE ve İnovasyon",
    desc: "Yenilikçi projeler için araştırma, geliştirme ve inovasyon desteklerine başvuru yönetimi.",
  },
];

const programs = [
  {
    title: "Girişimcilik Destek Programı",
    items: ["Yeni Girişimci Desteği", "İş Geliştirme Merkezi Desteği", "Girişimcilik Eğitim Desteği"],
  },
  {
    title: "AR-GE ve İnovasyon Programı",
    items: ["AR-GE ve İnovasyon Desteği", "Prototip Geliştirme Desteği", "Teknoloji Transfer Ofisi Desteği"],
  },
  {
    title: "İşletme Geliştirme Programı",
    items: ["Genel Destek Programı", "Özel Destek Programı", "KOBİ Proje Desteği"],
  },
];

export default function Kosgeb() {
  return (
    <main>
      <SEO
        title="KOSGEB Danışmanlığı"
        description="KOSGEB başvuru danışmanlığı, iş planı hazırlama ve destek takibi hizmetleri. Profesyonel KOSGEB danışmanları ile başarı oranınızı artırın."
        url="https://cyandanismanlik.com/kosgeb"
      />

      <PageHero
        eyebrow="Danışmanlık Hizmetleri"
        title="KOSGEB Danışmanlığı"
        subtitle="KOBİ'lerin KOSGEB desteklerinden en etkili şekilde yararlanması için profesyonel danışmanlık hizmeti sunuyoruz."
      />

      <Section>
        <SectionHeading eyebrow="Hizmetler" title="Hizmetlerimiz" />
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
        <SectionHeading eyebrow="Programlar" title="Destek Programları" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <Card key={program.title} className="p-6">
              <h3 className="mb-4 text-base font-semibold text-white">{program.title}</h3>
              <ul className="space-y-2.5">
                {program.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-0.5 text-brand-light">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <CallToAction
        title="Ücretsiz Danışmanlık Alın"
        subtitle="KOSGEB başvurunuz için hemen iletişime geçin, size özel çözümler üretelim."
      />
    </main>
  );
}

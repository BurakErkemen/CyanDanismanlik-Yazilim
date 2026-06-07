import SEO from "@/components/seo/SEO";
import PageHero from "@/components/site/PageHero";
import CallToAction from "@/components/site/CallToAction";
import { Section, SectionHeading, Card, CardAccent } from "@/components/ui";

const services = [
  {
    title: "E-Ticaret Site Kurulumu",
    desc: "Shopify, WooCommerce veya özel geliştirme ile profesyonel e-ticaret mağazası kuruyoruz.",
  },
  {
    title: "Sosyal Medya Yönetimi",
    desc: "Instagram, Facebook, LinkedIn ve diğer platformlarda düzenli içerik üretimi ve yönetimi.",
  },
  {
    title: "Dijital Reklam",
    desc: "Google Ads, Meta Ads ile hedef kitlenize ulaşan reklam kampanyaları oluşturuyoruz.",
  },
  {
    title: "SEO & İçerik",
    desc: "Arama motorlarında üst sıralara çıkmak için teknik SEO ve içerik stratejisi geliştiriyoruz.",
  },
  {
    title: "Marka Kimliği",
    desc: "Logo, renk paleti ve görsel dil oluşturarak tutarlı bir marka kimliği yaratıyoruz.",
  },
  {
    title: "Analiz & Raporlama",
    desc: "Kampanya performansını düzenli olarak analiz ediyor, iyileştirme önerileri sunuyoruz.",
  },
];

const steps = [
  { step: "01", title: "Analiz", desc: "İşletmenizi ve hedef kitlenizi analiz ediyoruz." },
  { step: "02", title: "Strateji", desc: "Size özel dijital strateji hazırlıyoruz." },
  { step: "03", title: "Uygulama", desc: "Stratejiyi hayata geçiriyor, içerik üretiyoruz." },
  { step: "04", title: "Ölçüm", desc: "Sonuçları ölçüyor, sürekli iyileştiriyoruz." },
];

export default function ETicaret() {
  return (
    <main>
      <SEO
        title="E-Ticaret ve Sosyal Medya Danışmanlığı"
        description="E-ticaret kurulumu, sosyal medya yönetimi, dijital reklam ve SEO hizmetleri. Dijital varlığınızı güçlendirin."
        url="https://cyandanismanlik.com/e-ticaret"
      />

      <PageHero
        eyebrow="Dijital Büyüme"
        title="E-Ticaret & Sosyal Medya"
        subtitle="Dijital varlığınızı güçlendirin, online satışlarınızı artırın ve sosyal medyada markanızı büyütün."
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
        <SectionHeading eyebrow="Süreç" title="Nasıl Çalışıyoruz?" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((item) => (
            <Card key={item.step} className="p-6 text-center">
              <p className="mb-3 text-3xl font-bold text-gradient">{item.step}</p>
              <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CallToAction
        title="Dijital Büyümenize Başlayalım"
        subtitle="E-ticaret ve sosyal medya danışmanlığı için hemen iletişime geçin."
      />
    </main>
  );
}

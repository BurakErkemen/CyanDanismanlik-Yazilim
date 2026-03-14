import SEO from "../components/SEO";

export default function Kosgeb() {
  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>
      <SEO
        title="KOSGEB Danışmanlığı"
        description="KOSGEB başvuru danışmanlığı, iş planı hazırlama ve destek takibi hizmetleri. Profesyonel KOSGEB danışmanları ile başarı oranınızı artırın."
        url="https://cyandanismanlik.com/kosgeb"
      />
      {/* Hero */}
      <section className="py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#06b6d4" }}>
            Danışmanlık Hizmetleri
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            KOSGEB Danışmanlığı
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            KOBİ'lerin KOSGEB desteklerinden en etkili şekilde yararlanması
            için profesyonel danışmanlık hizmeti sunuyoruz.
          </p>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition group"
                style={{ backgroundColor: "#111111" }}
              >
                <div className="w-8 h-0.5 mb-4 transition-all group-hover:w-12" style={{ backgroundColor: "#06b6d4" }} />
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destek Programları */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Destek Programları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Girişimcilik Destek Programı",
                items: [
                  "Yeni Girişimci Desteği",
                  "İş Geliştirme Merkezi Desteği",
                  "Girişimcilik Eğitim Desteği",
                ],
              },
              {
                title: "AR-GE ve İnovasyon Programı",
                items: [
                  "AR-GE ve İnovasyon Desteği",
                  "Prototip Geliştirme Desteği",
                  "Teknoloji Transfer Ofisi Desteği",
                ],
              },
              {
                title: "İşletme Geliştirme Programı",
                items: [
                  "Genel Destek Programı",
                  "Özel Destek Programı",
                  "KOBİ Proje Desteği",
                ],
              },
            ].map((program) => (
              <div
                key={program.title}
                className="rounded-xl p-6 border border-white/10"
                style={{ backgroundColor: "#111111" }}
              >
                <h3 className="text-base font-semibold text-white mb-4">
                  {program.title}
                </h3>
                <ul className="space-y-2">
                  {program.items.map((item) => (
                    <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
                      <span style={{ color: "#06b6d4" }} className="mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ücretsiz Danışmanlık Alın
          </h2>
          <p className="text-gray-400 mb-8">
            KOSGEB başvurunuz için hemen iletişime geçin, size özel çözümler üretelim.
          </p>
          <a
            href="tel:+905537763169"
            className="font-semibold px-8 py-3 rounded-lg transition text-black inline-block"
            style={{ backgroundColor: "#06b6d4" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0891b2")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#06b6d4")}
          >
            Hemen Ara: +90 (553) 776 31 69
          </a>
        </div>
      </section>
    </main>
  );
}
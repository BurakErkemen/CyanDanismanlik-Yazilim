import SEO from "../components/SEO";

export default function ETicaret() {
  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>

      <SEO
        title="E-Ticaret ve Sosyal Medya Danışmanlığı"
        description="E-ticaret kurulumu, sosyal medya yönetimi, dijital reklam ve SEO hizmetleri. Dijital varlığınızı güçlendirin."
        url="https://cyandanismanlik.com/e-ticaret"
      />
      {/* Hero */}
      <section className="py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#06b6d4" }}>
            Dijital Büyüme
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            E-Ticaret & Sosyal Medya
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dijital varlığınızı güçlendirin, online satışlarınızı artırın ve
            sosyal medyada markanızı büyütün.
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition group"
                style={{ backgroundColor: "#111111" }}
              >
                <div
                  className="w-8 h-0.5 mb-4 transition-all group-hover:w-12"
                  style={{ backgroundColor: "#06b6d4" }}
                />
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Nasıl Çalışıyoruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Analiz", desc: "İşletmenizi ve hedef kitlenizi analiz ediyoruz." },
              { step: "02", title: "Strateji", desc: "Size özel dijital strateji hazırlıyoruz." },
              { step: "03", title: "Uygulama", desc: "Stratejiyi hayata geçiriyor, içerik üretiyoruz." },
              { step: "04", title: "Ölçüm", desc: "Sonuçları ölçüyor, sürekli iyileştiriyoruz." },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-6 border border-white/10 text-center"
                style={{ backgroundColor: "#111111" }}
              >
                <p className="text-3xl font-bold mb-3" style={{ color: "#06b6d4" }}>
                  {item.step}
                </p>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Dijital Büyümenize Başlayalım
          </h2>
          <p className="text-gray-400 mb-8">
            E-ticaret ve sosyal medya danışmanlığı için hemen iletişime geçin.
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
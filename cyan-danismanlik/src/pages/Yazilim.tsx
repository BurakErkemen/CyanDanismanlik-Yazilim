import SEO from "../components/SEO";

export default function Yazilim() {
  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>      
    <SEO
      title="Yazılım Geliştirme"
      description="Web ve mobil uygulama geliştirme, yazılım danışmanlığı ve KOSGEB yazılım projeleri. React, .NET ve modern teknolojilerle çözümler."
      url="https://cyandanismanlik.com/yazilim"
    />
    
      {/* Hero */}
      <section className="py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium mb-4 tracking-widest uppercase" style={{ color: "#06b6d4" }}>
            Yazılım Hizmetleri
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Yazılım Geliştirme
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            İşletmenizin ihtiyaçlarına özel web, masaüstü ve mobil uygulamalar geliştiriyor,
            dijital dönüşüm sürecinizde yanınızda oluyoruz.
          </p>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Neler Yapıyoruz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
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

      {/* Teknolojiler */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Kullandığımız Teknolojiler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React", "Node.js", "TypeScript", ".NET",
              "Python", "Firebase", "MsSQL", "MySQL",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-xl p-4 border border-white/10 text-center text-sm font-medium text-gray-300 hover:border-cyan-500/50 hover:text-white transition"
                style={{ backgroundColor: "#111111" }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Projenizi Hayata Geçirelim
          </h2>
          <p className="text-gray-400 mb-8">
            Yazılım ihtiyaçlarınız için ücretsiz keşif görüşmesi yapın.
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
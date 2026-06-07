import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { saveContact } from "@/lib/contactService";
import {
  getHomeSettings,
  getActiveTestimonials,
  defaultSettings,
  type Testimonial,
} from "@/lib/settingsService";
import SEO from "@/components/seo/SEO";
import heroImg from "@/assets/hero.png";
import {
  Section,
  Container,
  Card,
  CardAccent,
  Button,
  Input,
  Textarea,
  Eyebrow,
  SectionHeading,
  buttonClass,
} from "@/components/ui";

export default function Home() {
  // Render default content instantly; hydrate from Firestore when it arrives.
  const [settings, setSettings] = useState(defaultSettings);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [s, t] = await Promise.all([getHomeSettings(), getActiveTestimonials()]);
        setSettings(s);
        setTestimonials(t);
      } catch (err) {
        console.error("Anasayfa içeriği yüklenemedi:", err);
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await saveContact({
        name,
        email,
        message,
        date: Timestamp.now(),
        read: false,
      });
    } catch (err) {
      console.error("Firestore kayıt hatası:", err);
    }
    try {
      const response = await fetch("https://formspree.io/f/xaqpbzad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Form gönderme hatası:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <SEO
        title="Cyan Danışmanlık | KOSGEB Danışmanlık Hizmetleri"
        description="KOSGEB danışmanlığında profesyonel çözümler. Başvuru dosyası hazırlama, iş planı, destek takibi ve yazılım hizmetleri."
        url="https://cyandanismanlik.com"
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-28">
        <Container width="wide" className="px-0">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up text-center lg:text-left">
              <div className="mb-5 flex justify-center lg:justify-start">
                <Eyebrow>Profesyonel Danışmanlık</Eyebrow>
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="text-gradient">{settings.hero.title}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-400 lg:mx-0">
                {settings.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link to="/kosgeb" className={buttonClass("primary", "lg")}>
                  Hizmetlerimizi Keşfet
                </Link>
                <a href="#iletisim" className={buttonClass("outline", "lg")}>
                  Ücretsiz Danışmanlık Al
                </a>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-full bg-brand/20 opacity-40 blur-3xl" />
              <img
                src={heroImg}
                alt=""
                className="animate-float relative w-full max-w-lg drop-shadow-[0_30px_60px_rgba(34,211,238,0.25)]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section width="wide" className="py-12 sm:py-12">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {settings.stats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl px-4 py-6 text-center"
            >
              <p className="text-3xl font-bold text-gradient sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-xs text-gray-400 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section divider>
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title="İşletmeniz için kapsamlı çözümler"
          subtitle="KOSGEB, yazılım ve dijital büyüme alanlarında uçtan uca danışmanlık."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {settings.services.map((item, i) => (
            <Link key={i} to={item.link} className="group">
              <Card interactive className="h-full p-6">
                <CardAccent className="mb-5" />
                <h3 className="mb-2 text-base font-semibold text-white transition group-hover:text-brand-light">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section divider width="narrow">
        <div className="text-center">
          <SectionHeading eyebrow="Hakkımızda" title="Biz Kimiz?" className="mb-6" />
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-400">{settings.about}</p>
        </div>
      </Section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section divider>
          <SectionHeading eyebrow="Referanslar" title="Müşteri Yorumları" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6">
                <p className="mb-4 text-3xl leading-none text-brand/40">“</p>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">{t.text}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Contact */}
      <Section divider id="iletisim" width="narrow">
        <SectionHeading eyebrow="İletişim" title="Bize Ulaşın" />

        <div className="grid gap-6 md:grid-cols-5">
          <Card className="space-y-4 p-6 text-sm text-gray-400 md:col-span-2">
            <p className="flex items-start gap-3">
              <span className="text-brand-light">📍</span> 47. Sokak, 17A — İskenderun / Hatay
            </p>
            <p className="flex items-start gap-3">
              <span className="text-brand-light">📞</span> +90 (553) 776 31 69
            </p>
            <p className="flex items-start gap-3">
              <span className="text-brand-light">✉️</span> info@cyandanismanlik.com
            </p>
            <p className="flex items-start gap-3">
              <span className="text-brand-light">🕐</span> Pzt–Cuma: 09:00–18:00 / Cmt: 10:00–14:00
            </p>
          </Card>

          <div className="md:col-span-3">
            {submitted ? (
              <Card className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-2xl text-brand-light">
                  ✓
                </div>
                <p className="mb-1 font-semibold text-white">Mesajınız iletildi!</p>
                <p className="text-sm text-gray-400">En kısa sürede size dönüş yapacağız.</p>
              </Card>
            ) : (
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız"
                    required
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta"
                    required
                  />
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınız"
                    rows={4}
                    required
                  />
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Gönderiliyor..." : "Gönder"}
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

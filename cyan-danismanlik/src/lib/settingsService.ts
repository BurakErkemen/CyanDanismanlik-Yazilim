import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export interface HeroSettings {
  title: string;
  subtitle: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  link: string;
}

export interface HomeSettings {
  hero: HeroSettings;
  stats: StatItem[];
  about: string;
  services: ServiceItem[];
}

export interface Testimonial {
  id?: string;
  name: string;
  company: string;
  text: string;
  order: number;
  active: boolean;
}

const defaultSettings: HomeSettings = {
  hero: {
    title: "KOSGEB Desteğinde Profesyonel Çözümler",
    subtitle: "Cyan Danışmanlık olarak işletmenizi KOSGEB desteklerinden en verimli şekilde yararlandırıyor, büyüme yolculuğunuzda yanınızdayız.",
  },
  stats: [
    { value: "100+", label: "Mutlu Müşteri" },
    { value: "95%", label: "Başarı Oranı" },
    { value: "7+", label: "Yıllık Deneyim" },
  ],
  about: "Cyan Danışmanlık olarak KOBİ'lerin KOSGEB desteklerinden en etkili şekilde faydalanmalarını sağlamak amacıyla kurulduk. Deneyimli danışman ekibimizle işletmenizin ihtiyaçlarına özel çözümler üretiyoruz.",
  services: [
    { title: "KOSGEB Danışmanlığı", desc: "Başvuru dosyası hazırlama, proje yazımı ve süreç yönetimi.", link: "/kosgeb" },
    { title: "Yazılım", desc: "Web ve mobil uygulama geliştirme, yazılım mimarisi tasarımı.", link: "/yazilim" },
    { title: "E-Ticaret & Sosyal Medya", desc: "Dijital varlığınızı güçlendirin, satışlarınızı artırın.", link: "/e-ticaret" },
  ],
};

export async function getHomeSettings(): Promise<HomeSettings> {
  const snap = await getDoc(doc(db, "site_settings", "home"));
  if (!snap.exists()) return defaultSettings;
  return { ...defaultSettings, ...snap.data() } as HomeSettings;
}

export async function saveHomeSettings(settings: HomeSettings): Promise<void> {
  await setDoc(doc(db, "site_settings", "home"), settings);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
}

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const all = await getTestimonials();
  return all.filter((t) => t.active);
}

export async function createTestimonial(t: Omit<Testimonial, "id">): Promise<void> {
  await addDoc(collection(db, "testimonials"), t);
}

export async function updateTestimonial(id: string, t: Partial<Testimonial>): Promise<void> {
  await updateDoc(doc(db, "testimonials", id), t);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, "testimonials", id));
}
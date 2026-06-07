# 💎 Cyan Danışmanlık & Yazılım Management Platform

Bu proje; KOSGEB danışmanlığı, yazılım ve e-ticaret hizmetleri sunan bir işletmenin tüm operasyonel süreçlerini (CMS, CRM ve Muhasebe) tek bir merkezden yönetmek için geliştirilmiş kurumsal bir SaaS platformudur.

### 🏗️ Teknik Mimari ve "Neden?"
- **React 19 & Vite 8:** En güncel React ekosistemi ile maksimum performans.
- **TypeScript:** Karmaşık veri yapıları (Cari hesaplar, teklifler) için katı tip güvenliği.
- **Firebase Stack:** - **Firestore:** Real-time veri senkronizasyonu.
  - **Auth + Custom Claims:** Rol tabanlı erişim kontrolü (RBAC) ile güvenli admin paneli.
  - **App Check:** reCAPTCHA v3 entegrasyonu ile bot saldırılarına karşı tam koruma.
- **Cloudinary:** Görsel varlıkların dinamik optimizasyonu ve CDN üzerinden hızlı sunumu.
- **Tailwind CSS v4:** Modern, "Cyan & Dark" konseptli responsive UI.

### 💼 İş Odaklı Modüller (Business Intelligence)
Proje, standart bir kurumsal sitenin çok ötesinde özellikler barındırır:
- **📊 Muhasebe & Finans:** Gelir/gider takibi, müşteri cari kayıtları ve dinamik teklif (quote) oluşturma sistemi.
- **✍️ Gelişmiş CMS:** Markdown destekli blog editörü ve Cloudinary entegreli medya kütüphanesi.
- **👥 İK ve Ekip Yönetimi:** Detaylı personel biyografileri ve uzmanlık alanları yönetimi.
- **📈 Pazarlama Araçları:** Admin panelinden kontrol edilebilen dinamik popup ve kampanya yönetim sistemi.
- **📧 CRM:** Gelen kutusu mantığında çalışan, okundu/okunmadı takibi yapılabilen iletişim formu yönetimi.

### 🔒 Güvenlik Katmanı
- **reCAPTCHA v3 & Firebase App Check:** Form suistimallerini %99 oranında engeller.
- **Serverless Security Rules:** Veritabanı seviyesinde yetkilendirme (Sadece admin mali verilere erişebilir).
- **SEO & Social Share:** `react-helmet-async` ile dinamik meta yönetimi ve Schema.org yapılandırılmış veri desteği.

### 🛠️ Geliştirici Notları
```bash
# Projeyi ayağa kaldırmak için
git clone [https://github.com/BurakErkemen/CyanDanismanlik-Yazilim.git](https://github.com/BurakErkemen/CyanDanismanlik-Yazilim.git)
cd CyanDanismanlik-Yazilim/cyan-danismanlik
npm install --legacy-peer-deps
npm run dev

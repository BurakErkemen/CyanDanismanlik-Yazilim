# Cyan Danışmanlık — Web Projesi

> KOSGEB danışmanlığı, yazılım ve e-ticaret hizmetleri sunan kurumsal web sitesi. React + TypeScript + Firebase altyapısıyla geliştirilmiştir.

---

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 19, TypeScript, Vite 8 |
| Stil | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Veritabanı | Firebase Firestore |
| Auth | Firebase Authentication |
| Güvenlik | Firebase App Check + reCAPTCHA v3 |
| Görsel | Cloudinary (unsigned upload) |
| Form | Formspree |
| Blog Editör | @uiw/react-md-editor |
| Deploy | Hostinger Shared Hosting |

---

## Özellikler

### Genel Site
- Siyah / Cyan renk teması
- Responsive tasarım (mobil uyumlu)
- SEO optimizasyonu (react-helmet-async, Open Graph, Schema.org)
- Sitemap ve robots.txt
- Sayfa bazlı meta title & description

### Sayfalar
| Route | Sayfa |
|-------|-------|
| `/` | Ana Sayfa (dinamik içerik) |
| `/kosgeb` | KOSGEB Danışmanlığı |
| `/yazilim` | Yazılım Hizmetleri |
| `/e-ticaret` | E-Ticaret & Sosyal Medya |
| `/blog` | Blog Listesi |
| `/blog/:slug` | Blog Detay |
| `/ekip` | Ekip Üyeleri |
| `/ekip/:id` | Ekip Üyesi Detay |
| `/admin` | Admin Giriş |
| `/admin/dashboard` | Admin Panel |

### Admin Panel
- Firebase Auth + Custom Claims ile korumalı rol tabanlı erişim
- **Blog Yönetimi** — Markdown editör, Cloudinary görsel yükleme, yayın durumu
- **Ekip Yönetimi** — Fotoğraf, uzmanlık alanları, biyografi, eğitim, deneyim
- **Mesajlar** — İletişim formu gelen kutusu, okundu/okunmadı takibi
- **Popup Yönetimi** — Duyuru/kampanya popup'ı, aktif/pasif kontrolü
- **Site Ayarları** — Hero, istatistikler, hizmet kartları, hakkımızda, müşteri yorumları
- **Muhasebe** — Gelir/gider kaydı, müşteri/cari takibi, teklif oluşturma, özet dashboard

---

## Kurulum

### Gereksinimler
- Node.js v20+
- npm v10+

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/BurakErkemen/CyanDanismanlik-Yazilim.git
cd CyanDanismanlik-Yazilim/cyan-danismanlik

# Bağımlılıkları kur
npm install --legacy-peer-deps

# .env dosyasını oluştur
cp .env.example .env
# .env içindeki değerleri doldur

# Geliştirme sunucusunu başlat
npm run dev
```

### .env Yapılandırması

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

---

## Firebase Yapılandırması

### Firestore Koleksiyonları

| Koleksiyon | Açıklama | Erişim |
|------------|----------|--------|
| `blog_posts` | Blog yazıları | Herkese açık okuma, admin yazma |
| `team_members` | Ekip üyeleri | Herkese açık okuma, admin yazma |
| `contacts` | İletişim mesajları | Herkese açık oluşturma, admin okuma |
| `popups` | Duyuru popup'ları | Herkese açık okuma, admin yazma |
| `site_settings` | Site içerik ayarları | Herkese açık okuma, admin yazma |
| `testimonials` | Müşteri yorumları | Herkese açık okuma, admin yazma |
| `transactions` | Gelir/gider kayıtları | Sadece admin |
| `customers` | Müşteri/cari kayıtları | Sadece admin |
| `quotes` | Teklifler | Sadece admin |

### Gerekli Firebase Servisleri
- Firestore Database
- Authentication (Email/Password)
- App Check (reCAPTCHA v3)

### Admin Yetkisi Verme

```bash
cd D:\Github\CyanDanismanlik-Yazılım
node set-admin.js  # UID'yi dosya içinde güncelle
```

---

## Deploy

### Production Build

```bash
npm run build
```

### Hostinger'a Deploy

1. `dist/` klasörünün içeriğini Hostinger `public_html/` klasörüne yükle
2. `.htaccess` dosyasının yüklendiğinden emin ol (React Router için gerekli)

### .htaccess

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

---

## Güvenlik

- Firebase Custom Claims ile rol tabanlı admin erişimi
- Firestore Security Rules ile koleksiyon bazlı erişim kontrolü
- Firebase App Check + reCAPTCHA v3 ile bot koruması
- Cloudinary unsigned preset ile format ve boyut kısıtlaması
- `.env` dosyası `.gitignore` ile repo dışında tutuluyor
- `serviceAccount.json` asla repo'ya eklenmemeli

---

## Proje Yapısı

```
cyan-danismanlik/
├── public/
│   ├── logo.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .htaccess
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SEO.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── PopupDisplay.tsx
│   │   ├── BlogManager.tsx
│   │   ├── TeamManager.tsx
│   │   ├── MessagesManager.tsx
│   │   ├── PopupManager.tsx
│   │   ├── SiteSettingsManager.tsx
│   │   └── AccountingManager.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── blogService.ts
│   │   ├── teamService.ts
│   │   ├── contactService.ts
│   │   ├── popupService.ts
│   │   ├── settingsService.ts
│   │   ├── accountingService.ts
│   │   └── cloudinaryService.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Kosgeb.tsx
│   │   ├── Yazilim.tsx
│   │   ├── ETicaret.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── Ekip.tsx
│   │   ├── TeamDetail.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── .gitignore
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Lisans

Bu proje özel kullanım içindir. Tüm hakları saklıdır © 2026 Cyan Danışmanlık.

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const SITE_NAME = "Cyan Danışmanlık";
const DEFAULT_TITLE = "Cyan Danışmanlık | KOSGEB Danışmanlık Hizmetleri";
const DEFAULT_DESC = "KOSGEB danışmanlığında profesyonel çözümler. Başvuru dosyası hazırlama, iş planı, destek takibi ve yazılım hizmetleri.";
const DEFAULT_URL = "https://cyandanismanlik.com";
const DEFAULT_IMAGE = "https://cyandanismanlik.com/logo.png";

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  url = DEFAULT_URL,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOProps) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Temel */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Genel */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content={SITE_NAME} />
    </Helmet>
  );
}